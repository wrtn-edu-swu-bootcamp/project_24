import { useNavigate } from 'react-router-dom'
import { 
  Stethoscope, 
  MapPin, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Shield,
  ArrowRight,
  Heart,
  Activity
} from 'lucide-react'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="hero-notice">
            <p>⚠️ 본 앱은 의료 진단을 제공하지 않으며, 정보 제공 및 증상 체크만 수행합니다. 응급 상황 시 즉시 119에 연락하세요.</p>
          </div>
          <h1 id="hero-title" className="hero-title">
            병원 가기 전,<br />
            먼저 체크하세요
          </h1>
          <p className="hero-subtitle">
            증상 체크부터 가까운 병원 찾기까지,<br />
            건강을 기록하며 관리해보세요.
          </p>
          <div className="hero-cta">
            <button 
              className="cta-primary"
              onClick={() => navigate('/check')}
              aria-label="증상 체크 시작하기"
            >
              증상 체크 시작하기
              <ArrowRight size={20} aria-hidden="true" />
            </button>
            <button 
              className="cta-secondary"
              onClick={() => navigate('/hospitals')}
              aria-label="병원 찾기"
            >
              병원 찾기
            </button>
            <p className="hero-note">회원가입 없이 바로 사용할 수 있습니다</p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <Stethoscope size={64} />
            <p>빠른 자가 진단</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section" aria-labelledby="problem-title">
        <div className="section-container">
          <h2 id="problem-title" className="section-title">이런 고민 있으신가요?</h2>
          <div className="problem-grid">
            <div className="problem-card">
              <AlertCircle size={32} className="problem-icon" />
              <h3>응급실 뺑뺑이</h3>
              <p>응급실에 갔는데 진료가 안 되는 경우가 많아요</p>
              <div className="problem-stat">응급실 방문자의 30%가 진료 불가 경험</div>
            </div>
            <div className="problem-card">
              <Activity size={32} className="problem-icon" />
              <h3>증상 판단 어려움</h3>
              <p>병원 가기 전 증상이 심각한지 판단이 어려워요</p>
            </div>
            <div className="problem-card">
              <MapPin size={32} className="problem-icon" />
              <h3>병원 찾기 어려움</h3>
              <p>당장 진료 가능한 가까운 병원을 찾기 어려워요</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-labelledby="features-title">
        <div className="section-container">
          <h2 id="features-title" className="section-title">주요 기능</h2>
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Stethoscope size={48} className="feature-icon" />
              </div>
              <h3>빠른 자가 진단</h3>
              <p className="feature-description">
                증상 입력만으로 긴급도 판단 및 권장사항 제공
              </p>
              <ul className="feature-list">
                <li>12가지 일반 증상 선택</li>
                <li>심각도 및 지속 시간 입력</li>
                <li>AI 기반 긴급도 분석</li>
                <li>병원 방문 필요성 판단</li>
              </ul>
              <button 
                className="feature-cta"
                onClick={() => navigate('/check')}
                aria-label="증상 체크하기"
              >
                증상 체크하기
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MapPin size={48} className="feature-icon" />
              </div>
              <h3>실시간 병원 정보</h3>
              <p className="feature-description">
                당장 진료 가능한 가까운 병원과 응급실 찾기
              </p>
              <ul className="feature-list">
                <li>실시간 진료 가능 여부 확인</li>
                <li>예상 대기 시간 표시</li>
                <li>거리순 정렬</li>
                <li>병원 유형별 필터링</li>
                <li>길찾기 및 전화 연결</li>
              </ul>
              <button 
                className="feature-cta"
                onClick={() => navigate('/hospitals')}
                aria-label="병원 찾기"
              >
                병원 찾기
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FileText size={48} className="feature-icon" />
              </div>
              <h3>건강 기록 관리</h3>
              <p className="feature-description">
                과거 증상 체크 기록을 저장하고 패턴 분석
              </p>
              <ul className="feature-list">
                <li>증상 체크 기록 자동 저장</li>
                <li>기록 상세 정보 확인</li>
                <li>증상 패턴 추적</li>
                <li>병원 방문 전 증상 요약</li>
              </ul>
              <button 
                className="feature-cta"
                onClick={() => navigate('/records')}
                aria-label="건강 기록 보기"
              >
                건강 기록 보기
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section" aria-labelledby="use-cases-title">
        <div className="section-container">
          <h2 id="use-cases-title" className="section-title">이렇게 사용하세요</h2>
          <div className="use-cases-list">
            <div className="use-case-item">
              <div className="use-case-number">01</div>
              <div className="use-case-content">
                <h3>밤에 갑자기 복통이...</h3>
                <p>증상 체크로 긴급도를 확인하고, 가까운 응급실을 찾아 진료 가능 여부를 확인한 후 방문하세요.</p>
              </div>
            </div>
            <div className="use-case-item">
              <div className="use-case-number">02</div>
              <div className="use-case-content">
                <h3>감기인지 독감인지 모르겠어요</h3>
                <p>증상을 입력하면 가능한 원인을 확인하고, 병원 방문이 필요한지 판단할 수 있어요.</p>
              </div>
            </div>
            <div className="use-case-item">
              <div className="use-case-number">03</div>
              <div className="use-case-content">
                <h3>응급실 뺑뺑이를 피하고 싶어요</h3>
                <p>병원 찾기에서 진료 가능 여부와 대기 시간을 확인하고, 가장 가까운 병원을 선택하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="section-container">
          <div className="trust-content">
            <Shield size={48} className="trust-icon" />
            <h2>안전하고 신뢰할 수 있는 서비스</h2>
            <div className="trust-points">
              <div className="trust-point">
                <CheckCircle size={24} />
                <div>
                  <h4>의료 진단이 아닙니다</h4>
                  <p>본 앱은 의료 진단을 제공하지 않으며, 단순히 정보 제공 및 증상 체크만 수행합니다.</p>
                </div>
              </div>
              <div className="trust-point">
                <CheckCircle size={24} />
                <div>
                  <h4>응급 상황 안내</h4>
                  <p>응급 상황 시 즉시 119에 연락하거나 응급실을 방문하세요.</p>
                </div>
              </div>
              <div className="trust-point">
                <CheckCircle size={24} />
                <div>
                  <h4>데이터 보안</h4>
                  <p>개인 건강 정보는 로컬에만 저장되며, 외부로 전송되지 않습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section" aria-labelledby="final-cta-title">
        <div className="section-container">
          <div className="final-cta-content">
            <Heart size={48} className="cta-icon" aria-hidden="true" />
            <h2 id="final-cta-title">지금 바로 시작하세요</h2>
            <p>회원가입 없이 바로 사용할 수 있습니다</p>
            <div className="final-cta-buttons">
              <button 
                className="cta-primary large"
                onClick={() => navigate('/check')}
                aria-label="증상 체크 시작하기"
              >
                증상 체크 시작하기
                <ArrowRight size={20} aria-hidden="true" />
              </button>
              <button 
                className="cta-secondary large"
                onClick={() => navigate('/hospitals')}
                aria-label="병원 찾기"
              >
                병원 찾기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
