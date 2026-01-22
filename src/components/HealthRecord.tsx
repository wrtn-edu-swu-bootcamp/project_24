import { useState, useEffect } from 'react'
import { HealthRecord as HealthRecordType } from '../types'
import { Calendar, Trash2, Eye } from 'lucide-react'
import './HealthRecord.css'

export default function HealthRecord() {
  const [records, setRecords] = useState<HealthRecordType[]>([])
  const [selectedRecord, setSelectedRecord] = useState<HealthRecordType | null>(null)

  useEffect(() => {
    // 로컬 스토리지에서 기록 불러오기
    const saved = localStorage.getItem('healthRecords')
    if (saved) {
      setRecords(JSON.parse(saved))
    }
  }, [])

  const deleteRecord = (id: string) => {
    if (window.confirm('이 기록을 삭제하시겠습니까?')) {
      const updated = records.filter(r => r.id !== id)
      setRecords(updated)
      localStorage.setItem('healthRecords', JSON.stringify(updated))
      if (selectedRecord?.id === id) {
        setSelectedRecord(null)
      }
    }
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

  return (
    <div className="health-record">
      <div className="record-header">
        <h2>건강 기록</h2>
        <p>과거 증상 체크 기록을 확인하고 관리할 수 있습니다.</p>
      </div>

      {records.length === 0 ? (
        <div className="empty-state">
          <Calendar size={64} />
          <h3>기록이 없습니다</h3>
          <p>증상 체크 페이지에서 증상을 분석하면 여기에 기록됩니다.</p>
        </div>
      ) : (
        <div className="record-content">
          <div className="record-list">
            <h3>기록 목록</h3>
            {records.map(record => (
              <div key={record.id} className="record-wrapper">
                <div
                  className={`record-item ${selectedRecord?.id === record.id ? 'active' : ''}`}
                  style={{ borderLeftColor: getUrgencyColor(record.result.urgency) }}
                >
                  <div className="record-item-header">
                    <div>
                      <div className="record-date">
                        {new Date(record.date).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="record-symptoms">
                        {record.symptoms.map(s => s.name).join(', ')}
                      </div>
                    </div>
                    <div className="record-actions">
                      <button
                        className="view-btn"
                        onClick={() => {
                          if (selectedRecord?.id === record.id) {
                            setSelectedRecord(null)
                          } else {
                            setSelectedRecord(record)
                          }
                        }}
                      >
                        <Eye size={18} />
                        보기
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteRecord(record.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="record-summary">
                    <span
                      className="urgency-badge"
                      style={{ backgroundColor: getUrgencyColor(record.result.urgency) }}
                    >
                      {record.result.urgency === 'emergency' && '🚨 응급'}
                      {record.result.urgency === 'high' && '⚠️ 높음'}
                      {record.result.urgency === 'medium' && 'ℹ️ 보통'}
                      {record.result.urgency === 'low' && '✅ 낮음'}
                    </span>
                    <span className="urgency-score">
                      긴급도: {record.result.urgencyScore}/100
                    </span>
                  </div>
                </div>
                {selectedRecord?.id === record.id && (
                  <div className="record-detail-inline">
                    <div className="detail-header">
                      <h3>기록 상세</h3>
                      <button
                        className="close-btn"
                        onClick={() => setSelectedRecord(null)}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="detail-content">
                      <div className="detail-section">
                        <h4>날짜</h4>
                        <p>
                          {new Date(selectedRecord.date).toLocaleString('ko-KR')}
                        </p>
                      </div>
                      <div className="detail-section">
                        <h4>증상</h4>
                        <ul>
                          {selectedRecord.symptoms.map((symptom, idx) => (
                            <li key={idx}>
                              <strong>{symptom.name}</strong> - 심각도: {symptom.severity}/10, 
                              지속시간: {symptom.duration}시간
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="detail-section">
                        <h4>분석 결과</h4>
                        <div className="result-info">
                          <div className="result-item">
                            <span>긴급도:</span>
                            <span
                              style={{ color: getUrgencyColor(selectedRecord.result.urgency) }}
                            >
                              {selectedRecord.result.urgencyScore}/100
                            </span>
                          </div>
                          <div className="result-item">
                            <span>병원 방문 필요:</span>
                            <span>
                              {selectedRecord.result.shouldVisitHospital ? '예' : '아니오'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="detail-section">
                        <h4>가능한 원인</h4>
                        <ul>
                          {selectedRecord.result.possibleCauses.map((cause, idx) => (
                            <li key={idx}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="detail-section">
                        <h4>권장사항</h4>
                        <ul>
                          {selectedRecord.result.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      {selectedRecord.notes && (
                        <div className="detail-section">
                          <h4>메모</h4>
                          <p>{selectedRecord.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedRecord && (
            <div className="record-detail-desktop">
              <div className="detail-header">
                <h3>기록 상세</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedRecord(null)}
                >
                  ✕
                </button>
              </div>
              <div className="detail-content">
                <div className="detail-section">
                  <h4>날짜</h4>
                  <p>
                    {new Date(selectedRecord.date).toLocaleString('ko-KR')}
                  </p>
                </div>
                <div className="detail-section">
                  <h4>증상</h4>
                  <ul>
                    {selectedRecord.symptoms.map((symptom, idx) => (
                      <li key={idx}>
                        <strong>{symptom.name}</strong> - 심각도: {symptom.severity}/10, 
                        지속시간: {symptom.duration}시간
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="detail-section">
                  <h4>분석 결과</h4>
                  <div className="result-info">
                    <div className="result-item">
                      <span>긴급도:</span>
                      <span
                        style={{ color: getUrgencyColor(selectedRecord.result.urgency) }}
                      >
                        {selectedRecord.result.urgencyScore}/100
                      </span>
                    </div>
                    <div className="result-item">
                      <span>병원 방문 필요:</span>
                      <span>
                        {selectedRecord.result.shouldVisitHospital ? '예' : '아니오'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="detail-section">
                  <h4>가능한 원인</h4>
                  <ul>
                    {selectedRecord.result.possibleCauses.map((cause, idx) => (
                      <li key={idx}>{cause}</li>
                    ))}
                  </ul>
                </div>
                <div className="detail-section">
                  <h4>권장사항</h4>
                  <ul>
                    {selectedRecord.result.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
                {selectedRecord.notes && (
                  <div className="detail-section">
                    <h4>메모</h4>
                    <p>{selectedRecord.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
