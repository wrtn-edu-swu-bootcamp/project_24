import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SymptomChecker from './components/SymptomChecker'
import HospitalFinder from './components/HospitalFinder'
import HealthRecord from './components/HealthRecord'
import './App.css'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">🏥 건강 체크</h1>
        </Link>
        <div className="nav-links">
          <button 
            className={`nav-button ${location.pathname === '/check' ? 'active' : ''}`}
            onClick={() => navigate('/check')}
            aria-label="증상 체크"
          >
            증상 체크
          </button>
          <button 
            className={`nav-button ${location.pathname === '/hospitals' ? 'active' : ''}`}
            onClick={() => navigate('/hospitals')}
            aria-label="병원 찾기"
          >
            병원 찾기
          </button>
          <button 
            className={`nav-button ${location.pathname === '/records' ? 'active' : ''}`}
            onClick={() => navigate('/records')}
            aria-label="건강 기록"
          >
            건강 기록
          </button>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/check" element={<SymptomChecker />} />
            <Route path="/hospitals" element={<HospitalFinder />} />
            <Route path="/records" element={<HealthRecord />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>⚠️ 본 앱은 의료 진단을 제공하지 않습니다. 응급 상황 시 즉시 119에 연락하세요.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
