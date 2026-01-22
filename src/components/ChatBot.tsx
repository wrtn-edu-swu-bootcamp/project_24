import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, X, Check, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { Symptom, SymptomCheckResult } from '../types'
import { analyzeSymptoms } from '../utils/symptomAnalyzer'
import { callN8nChatbot } from '../utils/n8nApi'
import './ChatBot.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  formData?: {
    symptoms: string[]
    showForm: boolean
  }
  analysisResult?: SymptomCheckResult
}

interface SymptomFormData {
  name: string
  severity: number
  duration: number
  category: string
}

interface ChatBotProps {
  onClose: () => void
  onAnalyze?: (symptoms: Symptom[]) => void
  onNavigate?: (path: string, state?: any) => void
}

export default function ChatBot({ onClose, onAnalyze, onNavigate }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 건강 상담 챗봇입니다. 어떤 증상이 있으신가요? 자세히 설명해주시면 더 정확한 조언을 드릴 수 있습니다.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeFormData, setActiveFormData] = useState<{ [messageId: string]: SymptomFormData[] }>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    const symptoms: string[] = []

    // 증상 키워드 감지 (더 포괄적으로)
    const symptomKeywords: { [key: string]: string[] } = {
      '두통': ['두통', '머리 아픔', '머리가 아파', '두뇌', '머리', '두통이', '머리 아픈'],
      '발열': ['열', '발열', '체온', '고열', '미열', '열이 나', '열이 있어', '뜨거워'],
      '복통': ['배 아픔', '복통', '배가 아파', '속이 아파', '배', '복부', '배 아픈'],
      '기침': ['기침', '콜록', '기침이 나', '기침이 있어', '기침해'],
      '어지러움': ['어지러움', '어지러워', '현기증', '빙빙 도는', '어지러', '현기'],
      '메스꺼움': ['메스꺼움', '토할 것 같', '구역질', '토', '구토', '메스'],
      '호흡 곤란': ['숨이 차', '호흡', '숨쉬기', '가쁜', '숨', '호흡이', '숨이'],
      '가슴 통증': ['가슴', '흉통', '가슴이 아파', '가슴 아픔', '흉부'],
      '근육통': ['근육', '몸살', '뼈마디', '관절', '근육이 아파'],
      '인후통': ['목', '인후', '목이 아파', '삼키기', '목 아픔', '인후통'],
      '피로감': ['피로', '힘들', '지침', '무기력', '피곤', '쉽게 지쳐'],
      '설사': ['설사', '배탈', '소화', '설사가', '변'],
      '화상': ['화상', '데인', '데었', '뜨거운', '화끈', '타', '탔', '화끈거려', '데인 것', '데었어', '화상 입었'],
      '염좌': ['염좌', '발목', '삐었', '삐었어', '삐어', '삐어진', '발목 삐었', '발목 삐어', '발목 삐었어', '발목 삐어진', '삐끗', '삐끗했', '삐끗했어', '삐끗한', '삐끗했어요', '발목 삐끗', '발목 삐끗했'],
      '골절 의심': ['골절', '뼈', '부러', '부러진', '부러졌', '부러졌어', '뼈 부러', '뼈 부러진', '뼈 부러졌', '골절 의심', '뼈가', '뼈가 부러', '골절인 것 같', '골절 같']
    }

    // 감지된 증상 추출
    Object.keys(symptomKeywords).forEach(symptom => {
      if (symptomKeywords[symptom].some(keyword => lowerMessage.includes(keyword))) {
        if (!symptoms.includes(symptom)) {
          symptoms.push(symptom)
        }
      }
    })

    // 응급 상황 키워드
    const emergencyKeywords = ['심한', '심하게', '극심한', '참을 수 없', '응급', '119', '구급차', '위급', '생명']
    const isEmergency = emergencyKeywords.some(keyword => lowerMessage.includes(keyword))

    // 응답 생성
    if (isEmergency) {
      return `🚨 응급 상황으로 보입니다. 즉시 119에 연락하거나 가까운 응급실을 방문하세요. 생명이 위급한 상황일 수 있습니다.

현재 감지된 증상: ${symptoms.length > 0 ? symptoms.join(', ') : '설명하신 증상'}

**즉시 조치:**
• 119에 전화하거나 가까운 응급실 방문
• 혼자 있지 말고 주변 사람에게 도움 요청
• 가능하면 증상과 병력 정보를 준비

응급실을 찾으시겠습니까?`
    }

    if (symptoms.length > 0) {
      const symptomList = symptoms.join(', ')
      // 외상 관련 증상이면 특별 안내
      const hasTrauma = symptoms.some(s => ['화상', '염좌', '골절 의심'].includes(s))
      if (hasTrauma) {
        return `설명해주신 증상 "${symptomList}"을 감지했습니다. 외상 관련 증상이므로 즉시 응급 처치가 필요할 수 있습니다. 더 정확한 분석을 위해 아래 폼을 작성해주세요.`
      }
      return `설명해주신 증상 "${symptomList}"을 감지했습니다. 더 정확한 분석을 위해 아래 폼을 작성해주세요.`
    }

    // 일반적인 응답
    if (lowerMessage.includes('안녕') || lowerMessage.includes('하이') || lowerMessage.includes('반가')) {
      return '안녕하세요! 건강 상담을 도와드리겠습니다. 어떤 증상이 있으신지 자세히 설명해주세요. 예를 들어 "머리가 아프고 열이 나요"처럼 구체적으로 말씀해주시면 더 정확한 조언을 드릴 수 있습니다.'
    }

    if (lowerMessage.includes('감사') || lowerMessage.includes('고마')) {
      return '천만에요! 건강하시길 바랍니다. 추가로 궁금한 점이 있으시면 언제든 말씀해주세요.'
    }

    if (lowerMessage.includes('분석') || lowerMessage.includes('체크') || lowerMessage.includes('진단')) {
      return `증상을 분석해드리기 위해 더 구체적인 정보가 필요합니다. 다음 정보를 알려주시면 도움이 됩니다:

• 어떤 증상이 있으신가요? (예: 두통, 발열, 복통 등)
• 증상의 심각도는 어느 정도인가요? (1-10점)
• 증상이 시작된 시기는 언제인가요?
• 다른 동반 증상이 있으신가요?

자세히 설명해주시면 더 정확한 조언을 드릴 수 있습니다.`
    }

    return `말씀해주신 내용을 바탕으로 다음과 같이 조언드립니다:

**일반적인 권장사항:**
• 충분한 휴식과 수분 섭취
• 증상이 악화되거나 지속되면 병원 방문
• 응급 상황 시 즉시 119에 연락

**더 정확한 분석을 위해:**
증상을 구체적으로 설명해주시면 더 정확한 조언을 드릴 수 있습니다. 예를 들어:
• "머리가 아프고 열이 나요"
• "배가 아프고 메스꺼워요"
• "기침이 심하고 숨이 차요"
• "손에 뜨거운 물을 데었어요" (화상)
• "발목을 삐끗했어요" (염좌)
• "팔이 부러진 것 같아요" (골절 의심)

어떤 증상이 있으신가요?`
  }

  const getPossibleCauses = (symptoms: string[]): string => {
    const causes: string[] = []
    
    if (symptoms.includes('두통')) {
      causes.push('• 긴장성 두통, 편두통, 감기/독감')
    }
    if (symptoms.includes('발열')) {
      causes.push('• 감기, 독감, 세균 감염')
    }
    if (symptoms.includes('복통')) {
      causes.push('• 소화불량, 식중독, 위염, 장염')
    }
    if (symptoms.includes('기침')) {
      causes.push('• 감기, 기관지염, 알레르기')
    }
    
    return causes.length > 0 ? causes.join('\n') : '• 정확한 진단을 위해 병원 방문이 필요합니다.'
  }

  const getRecommendations = (symptoms: string[], message: string): string => {
    const recommendations: string[] = []
    
    if (symptoms.includes('발열')) {
      recommendations.push('• 충분한 수분 섭취와 휴식')
      recommendations.push('• 체온을 정기적으로 확인')
    }
    if (symptoms.includes('복통')) {
      recommendations.push('• 가벼운 음식 섭취')
      recommendations.push('• 자극적인 음식 피하기')
    }
    if (symptoms.includes('기침')) {
      recommendations.push('• 따뜻한 물 자주 마시기')
      recommendations.push('• 실내 습도 유지')
    }
    
    if (recommendations.length === 0) {
      recommendations.push('• 충분한 휴식과 수분 섭취')
      recommendations.push('• 증상이 악화되면 병원 방문')
    }
    
    return recommendations.join('\n')
  }

  const getSymptomCategory = (symptomName: string): string => {
    const categoryMap: { [key: string]: string } = {
      '두통': '신경계',
      '발열': '전신',
      '복통': '소화계',
      '기침': '호흡계',
      '어지러움': '신경계',
      '메스꺼움': '소화계',
      '호흡 곤란': '호흡계',
      '가슴 통증': '순환계',
      '근육통': '근골격계',
      '인후통': '호흡계',
      '피로감': '전신',
      '설사': '소화계',
      '화상': '외상',
      '염좌': '외상',
      '골절 의심': '외상'
    }
    return categoryMap[symptomName] || '기타'
  }

  const extractSymptoms = (message: string): string[] => {
    const symptoms: string[] = []
    const lowerMessage = message.toLowerCase()
    // generateAIResponse와 동일한 키워드 사용
    const symptomKeywords: { [key: string]: string[] } = {
      '두통': ['두통', '머리 아픔', '머리가 아파', '두뇌', '머리', '두통이', '머리 아픈'],
      '발열': ['열', '발열', '체온', '고열', '미열', '열이 나', '열이 있어', '뜨거워'],
      '복통': ['배 아픔', '복통', '배가 아파', '속이 아파', '배', '복부', '배 아픈'],
      '기침': ['기침', '콜록', '기침이 나', '기침이 있어', '기침해'],
      '어지러움': ['어지러움', '어지러워', '현기증', '빙빙 도는', '어지러', '현기'],
      '메스꺼움': ['메스꺼움', '토할 것 같', '구역질', '토', '구토', '메스'],
      '호흡 곤란': ['숨이 차', '호흡', '숨쉬기', '가쁜', '숨', '호흡이', '숨이'],
      '가슴 통증': ['가슴', '흉통', '가슴이 아파', '가슴 아픔', '흉부'],
      '근육통': ['근육', '몸살', '뼈마디', '관절', '근육이 아파'],
      '인후통': ['목', '인후', '목이 아파', '삼키기', '목 아픔', '인후통'],
      '피로감': ['피로', '힘들', '지침', '무기력', '피곤', '쉽게 지쳐'],
      '설사': ['설사', '배탈', '소화', '설사가', '변'],
      '화상': ['화상', '데인', '데었', '뜨거운', '화끈', '타', '탔', '화끈거려', '데인 것', '데었어', '화상 입었', '데었어요', '데었습니다', '데인 곳'],
      '염좌': ['염좌', '발목', '삐었', '삐었어', '삐어', '삐어진', '발목 삐었', '발목 삐어', '발목 삐었어', '발목 삐어진', '삐끗', '삐끗했', '삐끗했어', '삐끗한', '삐끗했어요', '발목 삐끗', '발목 삐끗했'],
      '골절 의심': ['골절', '뼈', '부러', '부러진', '부러졌', '부러졌어', '뼈 부러', '뼈 부러진', '뼈 부러졌', '골절 의심', '뼈가', '뼈가 부러', '골절인 것 같', '골절 같', '뼈가 부러진', '뼈가 부러졌', '부러진 것 같', '골절 같아', '골절인 것 같아']
    }

    Object.keys(symptomKeywords).forEach(symptom => {
      if (symptomKeywords[symptom].some(keyword => lowerMessage.includes(keyword))) {
        if (!symptoms.includes(symptom)) {
          symptoms.push(symptom)
        }
      }
    })

    return symptoms
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return '#ef4444'
      case 'high': return '#f59e0b'
      case 'medium': return '#3b82f6'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertCircle size={24} />
      case 'high': return <AlertTriangle size={24} />
      case 'medium': return <Info size={24} />
      case 'low': return <CheckCircle size={24} />
      default: return <Info size={24} />
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = input.trim()
    setInput('')
    setIsTyping(true)

    // 대화 기록 준비 (최근 5개 메시지만 전송)
    const recentMessages = messages.slice(-5).map(msg => ({
      role: msg.role,
      content: msg.content
    }))
    recentMessages.push({ role: 'user', content: userInput })

    try {
      // n8n을 통해 Gemini API 호출
      const aiResponseText = await callN8nChatbot(userInput, recentMessages)
      
      const detectedSymptoms = extractSymptoms(userInput)
      const lowerInput = userInput.toLowerCase()
      
      // 응급 상황 키워드 확인
      const emergencyKeywords = ['심한', '심하게', '극심한', '참을 수 없', '응급', '119', '구급차', '위급', '생명']
      const isEmergency = emergencyKeywords.some(keyword => lowerInput.includes(keyword))
      
      const messageId = (Date.now() + 1).toString()
      const aiResponse: Message = {
        id: messageId,
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date(),
        // 응급 상황이 아니고 증상이 감지되었을 때만 폼 표시
        formData: !isEmergency && detectedSymptoms.length > 0 ? {
          symptoms: detectedSymptoms,
          showForm: true
        } : undefined
      }
      
      setMessages(prev => [...prev, aiResponse])
      
      // 폼 데이터 초기화 (응급 상황이 아니고 증상이 감지되었을 때만)
      if (!isEmergency && detectedSymptoms.length > 0) {
        const initialFormData: SymptomFormData[] = detectedSymptoms.map(symptom => ({
          name: symptom,
          severity: 5,
          duration: 1,
          category: getSymptomCategory(symptom)
        }))
        
        // 약간의 지연을 두어 메시지가 먼저 렌더링되도록 함
        setTimeout(() => {
          setActiveFormData(prev => ({
            ...prev,
            [messageId]: initialFormData
          }))
        }, 100)
      }
    } catch (error) {
      // n8n API 호출 실패 시 기존 로직 사용 (폴백)
      console.error('N8N API 호출 실패, 기존 로직 사용:', error)
      
      const detectedSymptoms = extractSymptoms(userInput)
      const lowerInput = userInput.toLowerCase()
      
      // 응급 상황 키워드 확인
      const emergencyKeywords = ['심한', '심하게', '극심한', '참을 수 없', '응급', '119', '구급차', '위급', '생명']
      const isEmergency = emergencyKeywords.some(keyword => lowerInput.includes(keyword))
      
      const responseContent = generateAIResponse(userInput)
      
      const messageId = (Date.now() + 1).toString()
      const aiResponse: Message = {
        id: messageId,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        // 응급 상황이 아니고 증상이 감지되었을 때만 폼 표시
        formData: !isEmergency && detectedSymptoms.length > 0 ? {
          symptoms: detectedSymptoms,
          showForm: true
        } : undefined
      }
      
      setMessages(prev => [...prev, aiResponse])
      
      // 폼 데이터 초기화 (응급 상황이 아니고 증상이 감지되었을 때만)
      if (!isEmergency && detectedSymptoms.length > 0) {
        const initialFormData: SymptomFormData[] = detectedSymptoms.map(symptom => ({
          name: symptom,
          severity: 5,
          duration: 1,
          category: getSymptomCategory(symptom)
        }))
        
        // 약간의 지연을 두어 메시지가 먼저 렌더링되도록 함
        setTimeout(() => {
          setActiveFormData(prev => ({
            ...prev,
            [messageId]: initialFormData
          }))
        }, 100)
      }
    } finally {
      setIsTyping(false)
    }
  }

  const handleFormSubmit = (messageId: string) => {
    const formData = activeFormData[messageId]
    if (!formData || formData.length === 0) return

    const symptoms: Symptom[] = formData.map((data, index) => ({
      id: `${messageId}-${index}-${Date.now()}`,
      name: data.name,
      category: data.category,
      severity: data.severity,
      duration: data.duration
    }))

    // 증상 분석 실행
    const analysisResult = analyzeSymptoms(symptoms)

    // 사용자 메시지로 제출 내용 표시
    const submitMessage: Message = {
      id: `${messageId}-submit-${Date.now()}`,
      role: 'user',
      content: `증상 정보를 제출했습니다: ${formData.map(d => `${d.name} (심각도: ${d.severity}, 지속시간: ${d.duration}시간)`).join(', ')}`,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, submitMessage])

    // 분석 결과 메시지 (카드 형태)
    setTimeout(() => {
      const analysisMessage: Message = {
        id: `${messageId}-analysis-${Date.now()}`,
        role: 'assistant',
        content: '증상 분석 결과',
        timestamp: new Date(),
        analysisResult: analysisResult
      }
      setMessages(prev => [...prev, analysisMessage])
    }, 500)

    // 부모 컴포넌트에 증상 전달
    if (onAnalyze) {
      onAnalyze(symptoms)
    }

    // 폼 숨기기
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, formData: { ...msg.formData!, showForm: false } }
        : msg
    ))
  }

  const updateFormData = (messageId: string, index: number, field: keyof SymptomFormData, value: any) => {
    setActiveFormData(prev => {
      const current = prev[messageId] || []
      const updated = [...current]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, [messageId]: updated }
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <Bot size={24} />
          <h3>AI 건강 상담</h3>
        </div>
        <button className="chatbot-close" onClick={onClose} aria-label="챗봇 닫기">
          <X size={20} />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-avatar">
              {message.role === 'user' ? (
                <User size={20} />
              ) : (
                <Bot size={20} />
              )}
            </div>
            <div className="message-content">
              {!message.analysisResult && <div className="message-text">{message.content}</div>}
              {message.analysisResult && (
                <div className="chatbot-result-card" style={{ borderColor: getUrgencyColor(message.analysisResult.urgency) }}>
                  <div className="chatbot-result-header" style={{ color: getUrgencyColor(message.analysisResult.urgency) }}>
                    {getUrgencyIcon(message.analysisResult.urgency)}
                    <h3>
                      {message.analysisResult.urgency === 'emergency' && '🚨 응급 상황'}
                      {message.analysisResult.urgency === 'high' && '⚠️ 높은 긴급도'}
                      {message.analysisResult.urgency === 'medium' && 'ℹ️ 보통 긴급도'}
                      {message.analysisResult.urgency === 'low' && '✅ 낮은 긴급도'}
                    </h3>
                    <div className="chatbot-urgency-score">긴급도 점수: {message.analysisResult.urgencyScore}/100</div>
                  </div>

                  <div className="chatbot-result-section">
                    <h4>가능한 원인</h4>
                    <ul>
                      {message.analysisResult.possibleCauses.map((cause, idx) => (
                        <li key={idx}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="chatbot-result-section">
                    <h4>권장사항</h4>
                    <ul>
                      {message.analysisResult.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  {message.analysisResult.shouldVisitHospital && (
                    <div className="chatbot-hospital-action">
                      <button
                        className="chatbot-find-hospital-btn"
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('/hospitals', { hospitalType: message.analysisResult?.hospitalType })
                          }
                          onClose()
                        }}
                      >
                        {message.analysisResult.hospitalType === 'emergency' ? '🚨 응급실 찾기' : '🏥 병원 찾기'}
                      </button>
                    </div>
                  )}
                  <div className="chatbot-result-time">
                    {message.timestamp.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              )}
              {message.formData?.showForm && message.formData.symptoms && message.formData.symptoms.length > 0 && (
                <div className="symptom-form">
                  {(() => {
                    // activeFormData가 아직 설정되지 않았으면 formData.symptoms를 사용하여 폼 생성
                    const formData = activeFormData[message.id] || message.formData.symptoms.map(symptom => ({
                      name: symptom,
                      severity: 5,
                      duration: 1,
                      category: getSymptomCategory(symptom)
                    }))
                    
                    // activeFormData가 없으면 설정
                    if (!activeFormData[message.id] && message.formData.symptoms.length > 0) {
                      setTimeout(() => {
                        setActiveFormData(prev => {
                          if (!prev[message.id]) {
                            return {
                              ...prev,
                              [message.id]: formData
                            }
                          }
                          return prev
                        })
                      }, 0)
                    }
                    
                    return formData.map((formItem, index) => (
                      <div key={`${message.id}-${index}`} className="form-item">
                        <div className="form-item-header">
                          <h4>{formItem.name}</h4>
                          <span className="form-category">{formItem.category}</span>
                        </div>
                        <div className="form-controls">
                          <div className="form-control-group">
                            <label>심각도 (1-10)</label>
                            <div className="slider-container">
                              <input
                                type="range"
                                min="1"
                                max="10"
                                value={formItem.severity}
                                onChange={(e) => updateFormData(message.id, index, 'severity', parseInt(e.target.value))}
                                className="severity-slider"
                              />
                              <span className="severity-value">{formItem.severity}</span>
                            </div>
                          </div>
                          <div className="form-control-group">
                            <label>지속 시간 (시간)</label>
                            <input
                              type="number"
                              min="0.5"
                              max="168"
                              step="0.5"
                              value={formItem.duration}
                              onChange={(e) => updateFormData(message.id, index, 'duration', parseFloat(e.target.value) || 0.5)}
                              className="duration-input"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  })()}
                  <button
                    className="form-submit-btn"
                    onClick={() => handleFormSubmit(message.id)}
                  >
                    <Check size={18} />
                    증상 정보 제출하기
                  </button>
                </div>
              )}
              {!message.analysisResult && (
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message assistant">
            <div className="message-avatar">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="증상을 자세히 설명해주세요..."
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          aria-label="메시지 전송"
        >
          <Send size={20} />
        </button>
      </div>

      <div className="chatbot-disclaimer">
        <p>⚠️ 본 챗봇은 의료 진단을 제공하지 않습니다. 응급 상황 시 즉시 119에 연락하세요.</p>
      </div>
    </div>
  )
}
