interface N8nChatbotRequest {
  message: string
  conversationHistory?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

interface N8nChatbotResponse {
  text?: string
  response?: string
}

export async function callN8nChatbot(
  userMessage: string,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error('N8N Webhook URL이 설정되지 않았습니다.')
  }

  const requestBody: N8nChatbotRequest = {
    message: userMessage,
    conversationHistory: conversationHistory || []
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 응답이 텍스트인지 JSON인지 확인
    const contentType = response.headers.get('content-type')
    let data: any

    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      // 텍스트 응답인 경우
      const text = await response.text()
      // JSON처럼 보이면 파싱 시도
      try {
        data = JSON.parse(text)
      } catch {
        // 순수 텍스트인 경우
        return text || '응답을 받을 수 없습니다.'
      }
    }

    // 디버깅을 위한 로그
    console.log('N8N 응답 데이터:', data)

    // n8n에서 반환하는 다양한 응답 형식에 대응
    if (typeof data === 'string') {
      return data
    }

    // 다양한 필드명 확인
    return data.text || 
           data.response || 
           data.message || 
           data.output || 
           data.content ||
           (data.data && (data.data.text || data.data.response)) ||
           JSON.stringify(data) ||
           '응답을 받을 수 없습니다.'
  } catch (error) {
    console.error('N8N API 호출 오류:', error)
    throw error
  }
}
