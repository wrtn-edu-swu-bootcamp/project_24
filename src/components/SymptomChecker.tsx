import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Symptom, SymptomCheckResult, HealthRecord } from '../types'
import { analyzeSymptoms } from '../utils/symptomAnalyzer'
import { AlertCircle, CheckCircle, AlertTriangle, Info, MessageCircle } from 'lucide-react'
import ChatBot from './ChatBot'
import './SymptomChecker.css'

const COMMON_SYMPTOMS = [
  { name: '두통', category: '신경계' },
  { name: '발열', category: '전신' },
  { name: '복통', category: '소화계' },
  { name: '기침', category: '호흡계' },
  { name: '어지러움', category: '신경계' },
  { name: '메스꺼움', category: '소화계' },
  { name: '호흡 곤란', category: '호흡계' },
  { name: '가슴 통증', category: '순환계' },
  { name: '근육통', category: '근골격계' },
  { name: '인후통', category: '호흡계' },
  { name: '피로감', category: '전신' },
  { name: '설사', category: '소화계' },
  { name: '화상', category: '외상' },
  { name: '염좌', category: '외상' },
  { name: '골절 의심', category: '외상' }
]

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [result, setResult] = useState<SymptomCheckResult | null>(null)
  const [showChatBot, setShowChatBot] = useState(false)
  const navigate = useNavigate()

  const handleSymptomSelect = (symptomName: string, category: string) => {
    const existingIndex = symptoms.findIndex(s => s.name === symptomName)
    
    if (existingIndex >= 0) {
      // 이미 선택된 증상 제거
      setSymptoms(symptoms.filter((_, i) => i !== existingIndex))
    } else {
      // 새 증상 추가
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        name: symptomName,
        category,
        severity: 5,
        duration: 1
      }
      setSymptoms([...symptoms, newSymptom])
    }
  }

  const updateSymptom = (id: string, field: keyof Symptom, value: any) => {
    setSymptoms(symptoms.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const handleAnalyze = () => {
    if (symptoms.length === 0) {
      alert('최소 하나의 증상을 선택해주세요.')
      return
    }
    const analysisResult = analyzeSymptoms(symptoms)
    setResult(analysisResult)
    
    // 건강 기록에 저장
    const record: HealthRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      symptoms: [...symptoms],
      result: analysisResult
    }
    
    const existingRecords = localStorage.getItem('healthRecords')
    const records: HealthRecord[] = existingRecords ? JSON.parse(existingRecords) : []
    records.unshift(record) // 최신 기록을 맨 앞에 추가
    localStorage.setItem('healthRecords', JSON.stringify(records))
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

  return (
    <div className="symptom-checker">
      <div className="checker-header">
        <h2>증상 체크</h2>
        <p>현재 느끼는 증상을 선택하고 심각도와 지속 시간을 입력하세요.</p>
      </div>

      <div className="symptom-selection">
        <h3>증상 선택</h3>
        <div className="symptom-grid">
          {COMMON_SYMPTOMS.map(symptom => {
            const isSelected = symptoms.some(s => s.name === symptom.name)
            return (
              <button
                key={symptom.name}
                className={`symptom-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSymptomSelect(symptom.name, symptom.category)}
              >
                {symptom.name}
              </button>
            )
          })}
          <button
            className="symptom-btn other-symptom"
            onClick={() => setShowChatBot(true)}
          >
            <MessageCircle size={18} />
            기타 증상 (AI 상담)
          </button>
        </div>
      </div>

      {symptoms.length > 0 && (
        <div className="symptom-details">
          <h3>증상 상세 정보</h3>
          {symptoms.map(symptom => (
            <div key={symptom.id} className="symptom-detail-card">
              <div className="symptom-name">{symptom.name}</div>
              <div className="symptom-controls">
                <div className="control-group">
                  <label>심각도 (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={symptom.severity}
                    onChange={(e) => updateSymptom(symptom.id, 'severity', parseInt(e.target.value))}
                  />
                  <span className="severity-value">{symptom.severity}</span>
                </div>
                <div className="control-group">
                  <label>지속 시간 (시간)</label>
                  <input
                    type="number"
                    min="0.5"
                    max="168"
                    step="0.5"
                    value={symptom.duration}
                    onChange={(e) => updateSymptom(symptom.id, 'duration', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => setSymptoms(symptoms.filter(s => s.id !== symptom.id))}
              >
                제거
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="analyze-btn" onClick={handleAnalyze} disabled={symptoms.length === 0}>
        진단 분석하기
      </button>

      {result && (
        <div className="result-card" style={{ borderColor: getUrgencyColor(result.urgency) }}>
          <div className="result-header" style={{ color: getUrgencyColor(result.urgency) }}>
            {getUrgencyIcon(result.urgency)}
            <h3>
              {result.urgency === 'emergency' && '🚨 응급 상황'}
              {result.urgency === 'high' && '⚠️ 높은 긴급도'}
              {result.urgency === 'medium' && 'ℹ️ 보통 긴급도'}
              {result.urgency === 'low' && '✅ 낮은 긴급도'}
            </h3>
            <div className="urgency-score">긴급도 점수: {result.urgencyScore}/100</div>
          </div>

          <div className="result-section">
            <h4>가능한 원인</h4>
            <ul>
              {result.possibleCauses.map((cause, idx) => (
                <li key={idx}>{cause}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h4>권장사항</h4>
            <ul>
              {result.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>

          {result.shouldVisitHospital && (
            <div className="hospital-action">
              <button
                className="find-hospital-btn"
                onClick={() => navigate('/hospitals', { state: { hospitalType: result.hospitalType } })}
              >
                {result.hospitalType === 'emergency' ? '🚨 응급실 찾기' : '🏥 병원 찾기'}
              </button>
            </div>
          )}
        </div>
      )}

      {showChatBot && (
        <ChatBot
          onClose={() => setShowChatBot(false)}
          onNavigate={(path, state) => navigate(path, state)}
          onAnalyze={(chatSymptoms) => {
            // 챗봇에서 입력한 증상을 자동으로 추가
            chatSymptoms.forEach(chatSymptom => {
              if (!symptoms.some(s => s.name === chatSymptom.name)) {
                setSymptoms(prev => [...prev, chatSymptom])
              } else {
                // 이미 있는 증상이면 업데이트
                setSymptoms(prev => prev.map(s => 
                  s.name === chatSymptom.name ? chatSymptom : s
                ))
              }
            })
            // 챗봇 닫기
            setShowChatBot(false)
            // 자동으로 분석 실행
            if (chatSymptoms.length > 0) {
              const allSymptoms = [...symptoms, ...chatSymptoms].filter((s, i, arr) => 
                arr.findIndex(ss => ss.name === s.name) === i
              )
              const analysisResult = analyzeSymptoms(allSymptoms)
              setResult(analysisResult)
              
              // 건강 기록에 저장
              const record: HealthRecord = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                symptoms: allSymptoms,
                result: analysisResult
              }
              
              const existingRecords = localStorage.getItem('healthRecords')
              const records: HealthRecord[] = existingRecords ? JSON.parse(existingRecords) : []
              records.unshift(record)
              localStorage.setItem('healthRecords', JSON.stringify(records))
            }
          }}
        />
      )}
    </div>
  )
}
