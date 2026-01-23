interface N8nChatbotRequest {
  message: string
  conversationHistory?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

export async function callN8nChatbot(
  userMessage: string,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  // @ts-ignore - Vite 환경 변수
  const webhookPath = import.meta.env.VITE_N8N_WEBHOOK_URL

  if (!webhookPath) {
    throw new Error('N8N Webhook URL이 설정되지 않았습니다.')
  }

  // 프록시를 사용하는 경우 상대 경로, 직접 호출하는 경우 절대 URL
  const webhookUrl = webhookPath.startsWith('http') 
    ? webhookPath 
    : `${window.location.origin}${webhookPath.startsWith('/') ? webhookPath : '/' + webhookPath}`

  const requestBody: N8nChatbotRequest = {
    message: userMessage,
    conversationHistory: conversationHistory || []
  }

  try {
    console.log('N8N 요청 시작:', { webhookUrl, userMessage })
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    console.log('N8N 응답 상태:', response.status, response.statusText)
    console.log('N8N 응답 헤더:', {
      'content-type': response.headers.get('content-type'),
      'content-length': response.headers.get('content-length')
    })

    // 응답 본문을 텍스트로 먼저 읽기 (상태 코드와 관계없이)
    let responseText: string
    try {
      responseText = await response.text()
      console.log('N8N 원본 응답 텍스트 (길이:', responseText.length, '):', responseText.substring(0, 500))
    } catch (textError) {
      console.error('응답 텍스트 읽기 실패:', textError)
      throw new Error('응답을 읽을 수 없습니다.')
    }

    // 빈 응답 체크 (HTTP 상태 체크 전에 먼저 확인)
    if (!responseText || responseText.trim() === '') {
      console.warn('N8N에서 빈 응답을 받았습니다.')
      throw new Error('빈 응답을 받았습니다.')
    }

    // JSON 파싱 시도 (에러 메시지 확인용)
    let parsedData: any = null
    try {
      parsedData = JSON.parse(responseText.trim())
    } catch {
      // JSON이 아니면 계속 진행
    }

    // Gemini API 할당량 초과 오류 확인 (응답 텍스트와 파싱된 데이터 모두 확인)
    const hasQuotaError = responseText.includes('quota') || 
                          responseText.includes('Quota exceeded') ||
                          responseText.includes('429') ||
                          responseText.includes('too many requests') ||
                          responseText.includes('exceeded your current quota') ||
                          (parsedData && (
                            parsedData.message?.includes('quota') || 
                            parsedData.message?.includes('Quota exceeded') ||
                            parsedData.message?.includes('429')
                          ))
    
    if (hasQuotaError) {
      console.warn('Gemini API 할당량 초과 감지')
      throw new Error('Gemini API 할당량이 초과되었습니다. 로컬 챗봇으로 전환합니다.')
    }

    // HTTP 오류 상태 체크
    if (!response.ok) {
      console.error('N8N HTTP 오류:', response.status, responseText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${responseText.substring(0, 200)}`)
    }

    // 순수 텍스트인지 확인 (JSON이 아닌 경우)
    const trimmedText = responseText.trim()
    
    // JSON으로 시작하지 않으면 순수 텍스트로 처리
    if (!trimmedText.startsWith('{') && !trimmedText.startsWith('[') && !trimmedText.startsWith('"')) {
      console.log('N8N 응답이 순수 텍스트입니다.')
      return trimmedText
    }

    // JSON 파싱 시도
    let data: any
    try {
      data = JSON.parse(trimmedText)
      console.log('N8N 파싱된 JSON 데이터:', data)
    } catch (parseError) {
      // JSON 파싱 실패 시 순수 텍스트로 처리
      console.log('N8N 응답 JSON 파싱 실패, 텍스트로 처리합니다.')
      return trimmedText
    }

    // n8n에서 반환하는 다양한 응답 형식에 대응
    if (typeof data === 'string') {
      return data
    }

    // 다양한 필드명 확인 (더 포괄적으로)
    const possibleFields = [
      data.text,
      data.response,
      data.message,
      data.output,
      data.content,
      data.body,
      data.result,
      data.data?.text,
      data.data?.response,
      data.data?.message,
      data.data?.content,
      data.json?.text,
      data.json?.response,
      data.json?.message,
      data.json?.content,
      // 배열인 경우 첫 번째 요소 확인
      Array.isArray(data) ? data[0] : null,
      Array.isArray(data) && typeof data[0] === 'object' ? data[0].text || data[0].response : null
    ]

    for (const field of possibleFields) {
      if (field && typeof field === 'string' && field.trim() !== '') {
        console.log('N8N 응답 필드 발견:', field.substring(0, 100))
        return field.trim()
      }
    }

    // 모든 필드가 없으면 전체 객체를 문자열로 변환 (디버깅용)
    console.warn('N8N 응답에서 텍스트 필드를 찾을 수 없습니다. 전체 데이터:', JSON.stringify(data, null, 2))
    const fallbackText = JSON.stringify(data, null, 2)
    return fallbackText || '응답을 받을 수 없습니다.'
  } catch (error) {
    console.error('N8N API 호출 오류 상세:', error)
    if (error instanceof Error) {
      console.error('에러 메시지:', error.message)
      console.error('에러 스택:', error.stack)
    }
    // 네트워크 오류인지 확인
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('네트워크 오류 또는 CORS 문제일 수 있습니다.')
    }
    throw error
  }
}
