import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hospital } from '../types'
import { getNearbyHospitals, getAvailableHospitals } from '../utils/hospitalData'
import { MapPin, Phone, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import './HospitalFinder.css'

export default function HospitalFinder() {
  const location = useLocation()
  const hospitalType = location.state?.hospitalType as 'emergency' | 'general' | 'clinic' | undefined
  
  const [filterType, setFilterType] = useState<'all' | 'emergency' | 'general' | 'clinic'>(
    hospitalType || 'all'
  )
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)
  const [hospitals, setHospitals] = useState<Hospital[]>([])

  useEffect(() => {
    updateHospitals()
  }, [filterType, showAvailableOnly])

  const updateHospitals = () => {
    let filtered: Hospital[]
    
    if (showAvailableOnly) {
      filtered = getAvailableHospitals(
        filterType === 'all' ? undefined : filterType
      )
    } else {
      filtered = getNearbyHospitals(
        filterType === 'all' ? undefined : filterType
      )
    }
    
    setHospitals(filtered)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'emergency': return '응급실'
      case 'general': return '종합병원'
      case 'clinic': return '클리닉'
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return '#ef4444'
      case 'general': return '#3b82f6'
      case 'clinic': return '#10b981'
      default: return '#6b7280'
    }
  }

  const handleCall = (phone: string) => {
    if (window.confirm(`${phone}로 전화하시겠습니까?`)) {
      window.location.href = `tel:${phone}`
    }
  }

  return (
    <div className="hospital-finder">
      <div className="finder-header">
        <h2>병원 찾기</h2>
        <p>가까운 병원과 응급실을 찾아보세요. 실시간 진료 가능 여부를 확인할 수 있습니다.</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>병원 유형</label>
          <div className="filter-buttons">
            <button
              className={filterType === 'all' ? 'active' : ''}
              onClick={() => setFilterType('all')}
            >
              전체
            </button>
            <button
              className={filterType === 'emergency' ? 'active' : ''}
              onClick={() => setFilterType('emergency')}
            >
              응급실
            </button>
            <button
              className={filterType === 'general' ? 'active' : ''}
              onClick={() => setFilterType('general')}
            >
              종합병원
            </button>
            <button
              className={filterType === 'clinic' ? 'active' : ''}
              onClick={() => setFilterType('clinic')}
            >
              클리닉
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
            />
            진료 가능한 병원만 보기
          </label>
        </div>
      </div>

      <div className="hospital-list">
        {hospitals.length === 0 ? (
          <div className="no-results">
            <p>조건에 맞는 병원이 없습니다.</p>
          </div>
        ) : (
          hospitals.map(hospital => (
            <div key={hospital.id} className="hospital-card">
              <div className="hospital-header">
                <div className="hospital-name-section">
                  <h3>{hospital.name}</h3>
                  <span
                    className="hospital-type"
                    style={{ backgroundColor: getTypeColor(hospital.type) }}
                  >
                    {getTypeLabel(hospital.type)}
                  </span>
                </div>
                <div className="hospital-status">
                  {hospital.isAvailable ? (
                    <div className="status available">
                      <CheckCircle size={20} />
                      <span>진료 가능</span>
                    </div>
                  ) : (
                    <div className="status unavailable">
                      <XCircle size={20} />
                      <span>진료 불가</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="hospital-info">
                <div className="info-item">
                  <MapPin size={18} />
                  <span>{hospital.address}</span>
                </div>
                <div className="info-item">
                  <Phone size={18} />
                  <button
                    className="phone-link"
                    onClick={() => handleCall(hospital.phone)}
                  >
                    {hospital.phone}
                  </button>
                </div>
                <div className="info-item">
                  <Clock size={18} />
                  <span>
                    {hospital.isAvailable
                      ? `예상 대기시간: ${hospital.waitTime}분`
                      : '현재 진료 불가'}
                  </span>
                </div>
                <div className="info-item distance">
                  <span>📍 거리: {hospital.distance.toFixed(1)}km</span>
                </div>
              </div>

              {hospital.isAvailable && (
                <div className="hospital-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => {
                      // 실제로는 지도 앱으로 연결하거나 길찾기 기능
                      const mapUrl = `https://map.naver.com/search/${encodeURIComponent(hospital.address)}`
                      window.open(mapUrl, '_blank')
                    }}
                  >
                    길찾기
                  </button>
                  <button
                    className="action-btn secondary"
                    onClick={() => handleCall(hospital.phone)}
                  >
                    전화하기
                  </button>
                </div>
              )}

              {!hospital.isAvailable && (
                <div className="unavailable-notice">
                  <AlertCircle size={18} />
                  <span>현재 진료가 불가능합니다. 전화로 확인 후 방문하세요.</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="emergency-notice">
        <AlertCircle size={24} />
        <div>
          <strong>응급 상황이신가요?</strong>
          <p>생명이 위급한 상황이라면 즉시 119에 연락하세요.</p>
        </div>
      </div>
    </div>
  )
}
