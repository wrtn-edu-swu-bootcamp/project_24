# 건강 체크 앱 - 랜딩 페이지 종합 PRD

## 문서 정보
- **문서명**: 건강 체크 앱 랜딩 페이지 종합 PRD
- **버전**: 2.0
- **작성일**: 2024
- **최종 수정일**: 2024
- **작성자**: Product Team
- **승인자**: [승인자명]

---

## 1. 프로젝트 개요

### 1.1 제품명
**건강 체크 (Health Check)** - 자가 진단 및 병원 찾기 앱

### 1.2 제품 비전
병원에 가기 애매하게 아프거나 병원을 가기 전에 간단하게 자기 몸을 진단할 수 있는 서비스로, 응급실 뺑뺑이를 방지하고 적절한 의료 서비스를 받을 수 있도록 돕습니다.

### 1.3 핵심 가치 제안 (Value Proposition)
1. **빠른 자가 진단**: 증상 입력만으로 긴급도 판단 및 권장사항 제공
2. **실시간 병원 정보**: 당장 진료 가능한 가까운 병원/응급실 찾기
3. **응급실 뺑뺑이 방지**: 진료 가능 여부와 대기 시간 확인으로 불필요한 이동 방지
4. **건강 기록 관리**: 증상 패턴 추적 및 병원 방문 전 증상 요약 제공

### 1.4 프로젝트 범위
- **포함**: 랜딩 페이지 개발 (6개 섹션)
- **제외**: 백엔드 API 개발, 실제 병원 데이터 연동 (Phase 2), 사용자 인증 시스템

---

## 2. 타겟 사용자 및 시장 분석

### 2.1 주요 타겟
- **1차 타겟**: 20-50대 성인, 건강에 관심이 많고 스마트폰을 적극 활용하는 사용자
- **2차 타겟**: 만성 질환자, 자녀를 둔 부모, 독거 노인

### 2.2 사용자 페르소나

**페르소나 1: "김민수, 35세, 직장인"**
- 평소 건강에 관심이 많지만 병원 가는 것을 부담스러워함
- 증상이 있을 때 인터넷에서 검색해보는 습관
- 응급실을 가야 할지 일반 병원을 가야 할지 판단이 어려움
- 시간이 없어서 병원을 가기 전에 미리 확인하고 싶음
- **사용 목적**: 증상 심각도 판단, 가까운 병원 찾기

**페르소나 2: "이영희, 42세, 주부"**
- 자녀의 건강 상태를 걱정함
- 응급실 뺑뺑이 경험이 있어 불필요한 이동을 피하고 싶음
- **사용 목적**: 자녀 증상 체크, 진료 가능한 병원 확인

### 2.3 시장 기회
- 응급실 방문자의 30%가 진료 불가 경험
- 건강 정보 검색 증가 추세
- 모바일 헬스케어 시장 성장

---

## 3. 제품 목표 및 성공 지표

### 3.1 비즈니스 목표
1. **서비스 이해도 향상**: 앱의 핵심 기능과 가치를 명확히 전달
2. **사용자 신뢰 구축**: 의료 정보 제공의 신뢰성과 안전성 강조
3. **사용자 유도**: 증상 체크 또는 병원 찾기 기능으로 자연스럽게 유도
4. **브랜드 인지도**: 건강 관리의 첫 번째 선택지로 인식

### 3.2 성공 지표 (KPI)

#### 정량적 지표
- **랜딩 페이지 방문자 수**: 월 10,000명 이상 (목표)
- **증상 체크 기능 사용 전환율**: 30% 이상
- **병원 찾기 기능 사용 전환율**: 20% 이상
- **평균 세션 시간**: 2분 이상
- **이탈률**: 50% 이하
- **재방문율**: 25% 이상
- **모바일 사용자 비율**: 70% 이상

#### 정성적 지표
- 사용자가 서비스의 핵심 가치를 이해함
- 신뢰감 있는 서비스로 인식
- 직관적인 사용자 경험
- 사용자 만족도: 4.0/5.0 이상

---

## 4. 기술 스택 및 아키텍처

### 4.1 기술 스택

#### Frontend
- **Framework**: React 18.2.0
- **Language**: TypeScript 5.2.2
- **Build Tool**: Vite 5.0.8
- **Routing**: React Router v6.20.0
- **Icons**: Lucide React 0.294.0
- **Styling**: CSS3 (모바일 우선 반응형)

#### 개발 도구
- **Package Manager**: npm
- **Linter**: ESLint 8.55.0
- **Type Checking**: TypeScript Compiler

### 4.2 프로젝트 구조
```
src/
├── components/
│   ├── LandingPage.tsx          # 랜딩 페이지 메인 컴포넌트
│   ├── LandingPage.css          # 랜딩 페이지 스타일
│   ├── SymptomChecker.tsx       # 증상 체크 컴포넌트
│   ├── SymptomChecker.css
│   ├── HospitalFinder.tsx       # 병원 찾기 컴포넌트
│   ├── HospitalFinder.css
│   ├── HealthRecord.tsx          # 건강 기록 컴포넌트
│   └── HealthRecord.css
├── types/
│   └── index.ts                 # TypeScript 타입 정의
├── utils/
│   ├── symptomAnalyzer.ts       # 증상 분석 로직
│   └── hospitalData.ts          # 병원 데이터 유틸리티
├── App.tsx                      # 메인 앱 컴포넌트
├── App.css                      # 앱 전역 스타일
├── main.tsx                     # 진입점
└── index.css                    # 전역 CSS 리셋
```

### 4.3 라우팅 구조
```tsx
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/check" element={<SymptomChecker />} />
  <Route path="/hospitals" element={<HospitalFinder />} />
  <Route path="/records" element={<HealthRecord />} />
</Routes>
```

---

## 5. 디자인 시스템

### 5.1 색상 팔레트

#### Primary Colors
- **Primary**: `#667eea` (보라색 계열 - 신뢰감)
- **Primary Dark**: `#5568d3` (호버 상태)
- **Secondary**: `#764ba2` (진한 보라색)

#### Semantic Colors
- **Accent (Emergency)**: `#ef4444` (빨간색 - 응급 상황)
- **Success**: `#10b981` (초록색 - 안전)
- **Warning**: `#f59e0b` (주황색 - 경고)

#### Neutral Colors
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Text Tertiary**: `#999999`
- **Background White**: `#ffffff`
- **Background Gray**: `#f9fafb`
- **Border**: `#e5e7eb`
- **Border Light**: `#f3f4f6`

#### Gradient
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### 5.2 타이포그래피 시스템

#### 모바일 (360px 기준)
- **H1**: 32px (2rem), Bold (700), line-height: 1.2, letter-spacing: -0.02em
- **H2**: 28px (1.75rem), Bold (700), line-height: 1.3, letter-spacing: -0.01em
- **H3**: 22px (1.375rem), Semi-bold (600), line-height: 1.4
- **H4**: 18px (1.125rem), Semi-bold (600), line-height: 1.5
- **Body Large**: 18px (1.125rem), Regular (400), line-height: 1.6
- **Body Regular**: 16px (1rem), Regular (400), line-height: 1.6
- **Body Small**: 14px (0.875rem), Regular (400), line-height: 1.5
- **Body XSmall**: 12px (0.75rem), Regular (400), line-height: 1.4

#### 데스크톱 (968px 이상)
- **H1**: 56px (3.5rem)
- **H2**: 40px (2.5rem)
- **H3**: 24px (1.5rem)
- **H4**: 19.2px (1.2rem)

#### 폰트 패밀리
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### 5.3 간격 시스템 (4px 단위)
- **XS**: 4px (0.25rem)
- **SM**: 8px (0.5rem)
- **MD**: 16px (1rem)
- **LG**: 24px (1.5rem)
- **XL**: 32px (2rem)
- **2XL**: 48px (3rem)
- **3XL**: 64px (4rem)
- **4XL**: 96px (6rem)

**섹션 간격:**
- 모바일: 64px (4rem) 상하
- 데스크톱: 96px (6rem) 상하

### 5.4 반응형 브레이크포인트
- **모바일**: 360px ~ 767px (기본 스타일)
- **태블릿**: 768px ~ 967px
- **데스크톱**: 968px 이상

---

## 6. 기능 명세

### 6.1 Hero 섹션

#### 6.1.1 목적
첫 화면에서 서비스의 핵심 가치를 즉시 전달하고, 사용자의 관심을 끌어 주요 액션으로 유도

#### 6.1.2 기능 요구사항
- [x] 메인 헤드라인 표시
- [x] 서브 헤드라인 표시
- [x] Primary CTA 버튼 (증상 체크 시작하기)
- [x] Secondary CTA 버튼 (병원 찾기)
- [x] 안내 문구 표시
- [x] 히어로 카드 (시각적 요소)
- [x] 반응형 레이아웃 (모바일/데스크톱)

#### 6.1.3 UI/UX 명세

**모바일 (360px):**
- 컨테이너: width: 100%, min-height: 80vh, padding: 32px 16px
- 배경: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- 레이아웃: flex-direction: column, text-align: center
- H1: font-size: 32px, font-weight: 700, margin-bottom: 16px
- 서브 헤드라인: font-size: 16px, margin-bottom: 32px, color: rgba(255, 255, 255, 0.95)
- 버튼 그룹: flex-direction: column, gap: 12px, width: 100%
- Primary 버튼: width: 100%, padding: 16px 32px, font-size: 18px, background: #ffffff, color: #667eea
- Secondary 버튼: width: 100%, padding: 16px 32px, background: transparent, border: 2px solid #ffffff
- 히어로 카드: max-width: 280px, background: rgba(255, 255, 255, 0.15), backdrop-filter: blur(10px), border-radius: 20px, padding: 32px

**데스크톱 (968px 이상):**
- min-height: 90vh, padding: 64px 32px
- 레이아웃: display: grid, grid-template-columns: 1fr 1fr, gap: 64px, text-align: left
- H1: font-size: 56px
- 서브 헤드라인: font-size: 24px
- 버튼 그룹: flex-direction: row, width: auto

#### 6.1.4 인터랙션
- Primary 버튼 클릭 → `/check` 경로로 이동
- Secondary 버튼 클릭 → `/hospitals` 경로로 이동
- 버튼 호버 효과: transform: translateY(-2px), box-shadow 변경

---

### 6.2 문제 정의 섹션

#### 6.2.1 목적
사용자의 페인 포인트를 공감하고 해결책 제시하여 서비스의 필요성을 강조

#### 6.2.2 기능 요구사항
- [x] 섹션 제목 표시
- [x] 문제 카드 3개 표시
- [x] 각 카드에 아이콘, 제목, 설명 포함
- [x] 첫 번째 카드에 통계 배지 표시
- [x] 카드 호버 효과
- [x] 반응형 그리드 레이아웃

#### 6.2.3 UI/UX 명세

**모바일 (360px):**
- 섹션 컨테이너: width: 100%, padding: 64px 16px, background: #f9fafb
- 제목 (H2): font-size: 28px, text-align: center, margin-bottom: 32px
- 카드 그리드: flex-direction: column, gap: 16px
- 카드: width: 100%, background: #ffffff, border-radius: 12px, padding: 24px, box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
- 카드 아이콘: 32px, color: #667eea, margin: 0 auto 16px
- 카드 제목: font-size: 20px, font-weight: 600, margin-bottom: 12px
- 카드 설명: font-size: 16px, color: #666666, line-height: 1.6
- 통계 배지: background: #fef3c7, color: #92400e, padding: 8px 16px, border-radius: 6px, font-size: 14px

**태블릿 (768px):**
- 카드 그리드: display: grid, grid-template-columns: repeat(2, 1fr), gap: 24px

**데스크톱 (968px 이상):**
- padding: 96px 32px
- 제목: font-size: 40px, margin-bottom: 48px
- 카드 그리드: grid-template-columns: repeat(3, 1fr), gap: 32px
- 카드 padding: 32px

#### 6.2.4 콘텐츠

**카드 1: 응급실 뺑뺑이**
- 아이콘: AlertCircle
- 제목: "응급실 뺑뺑이"
- 설명: "응급실에 갔는데 진료가 안 되는 경우가 많아요"
- 통계 배지: "응급실 방문자의 30%가 진료 불가 경험"

**카드 2: 증상 판단 어려움**
- 아이콘: Activity
- 제목: "증상 판단 어려움"
- 설명: "병원 가기 전 증상이 심각한지 판단이 어려워요"

**카드 3: 병원 찾기 어려움**
- 아이콘: MapPin
- 제목: "병원 찾기 어려움"
- 설명: "당장 진료 가능한 가까운 병원을 찾기 어려워요"

---

### 6.3 주요 기능 소개 섹션

#### 6.3.1 목적
앱의 핵심 기능 3가지를 시각적으로 소개하여 각 기능의 가치와 특징을 명확히 전달

#### 6.3.2 기능 요구사항
- [x] 섹션 제목 표시
- [x] 기능 카드 3개 표시
- [x] 각 카드에 아이콘 래퍼, 제목, 설명, 기능 리스트, CTA 버튼 포함
- [x] 카드 호버 효과
- [x] 반응형 그리드 레이아웃

#### 6.3.3 UI/UX 명세

**모바일 (360px):**
- 섹션 컨테이너: width: 100%, padding: 64px 16px, background: #ffffff
- 제목 (H2): font-size: 28px, text-align: center, margin-bottom: 32px
- 카드 그리드: flex-direction: column, gap: 24px
- 카드: width: 100%, background: #f9fafb, border-radius: 16px, padding: 32px, border: 2px solid transparent
- 아이콘 래퍼: 64px × 64px, gradient 배경, border-radius: 16px
- 아이콘: 32px, color: #ffffff
- 카드 제목: font-size: 22px, font-weight: 600, margin-bottom: 12px
- 카드 설명: font-size: 16px, color: #666666, margin-bottom: 20px
- 기능 리스트: list-style: none, padding-left: 24px
- 리스트 아이템: padding: 8px 0, position: relative
- 체크마크 (::before): content: '✓', position: absolute, left: 0, color: #10b981, font-size: 18px
- CTA 버튼: width: 100%, padding: 12px 24px, font-size: 16px, background: #667eea, color: #ffffff

**태블릿 (768px):**
- 카드 그리드: grid-template-columns: repeat(2, 1fr), gap: 32px
- 아이콘 래퍼: 80px × 80px
- 아이콘: 48px

**데스크톱 (968px 이상):**
- padding: 96px 32px
- 제목: font-size: 40px, margin-bottom: 48px
- 카드 그리드: grid-template-columns: repeat(3, 1fr), gap: 40px
- 카드 padding: 40px

#### 6.3.4 콘텐츠

**카드 1: 빠른 자가 진단**
- 아이콘: Stethoscope
- 제목: "빠른 자가 진단"
- 설명: "증상 입력만으로 긴급도 판단 및 권장사항 제공"
- 기능 리스트:
  - "12가지 일반 증상 선택"
  - "심각도 및 지속 시간 입력"
  - "AI 기반 긴급도 분석"
  - "병원 방문 필요성 판단"
- CTA 버튼: "증상 체크하기" → navigate('/check')

**카드 2: 실시간 병원 정보**
- 아이콘: MapPin
- 제목: "실시간 병원 정보"
- 설명: "당장 진료 가능한 가까운 병원과 응급실 찾기"
- 기능 리스트:
  - "실시간 진료 가능 여부 확인"
  - "예상 대기 시간 표시"
  - "거리순 정렬"
  - "병원 유형별 필터링"
  - "길찾기 및 전화 연결"
- CTA 버튼: "병원 찾기" → navigate('/hospitals')

**카드 3: 건강 기록 관리**
- 아이콘: FileText
- 제목: "건강 기록 관리"
- 설명: "과거 증상 체크 기록을 저장하고 패턴 분석"
- 기능 리스트:
  - "증상 체크 기록 자동 저장"
  - "기록 상세 정보 확인"
  - "증상 패턴 추적"
  - "병원 방문 전 증상 요약"
- CTA 버튼: "건강 기록 보기" → navigate('/records')

---

### 6.4 사용 시나리오 섹션

#### 6.4.1 목적
실제 사용 사례를 통해 서비스 이해도 향상 및 구체적인 사용 흐름 제시

#### 6.4.2 기능 요구사항
- [x] 섹션 제목 표시
- [x] 시나리오 아이템 3개 표시
- [x] 각 아이템에 번호, 제목, 설명 포함
- [x] 반응형 레이아웃

#### 6.4.3 UI/UX 명세

**모바일 (360px):**
- 섹션 컨테이너: width: 100%, padding: 64px 16px, background: gradient
- 제목 (H2): font-size: 28px, color: #ffffff, text-align: center, margin-bottom: 32px
- 시나리오 리스트: flex-direction: column, gap: 16px
- 시나리오 아이템: width: 100%, background: rgba(255, 255, 255, 0.1), backdrop-filter: blur(10px), border-radius: 12px, padding: 24px, flex-direction: column, gap: 16px
- 번호: font-size: 36px, font-weight: 700, opacity: 0.5, color: #ffffff
- 아이템 제목: font-size: 20px, font-weight: 600, color: #ffffff, margin-bottom: 8px
- 아이템 설명: font-size: 16px, color: rgba(255, 255, 255, 0.9), line-height: 1.6

**태블릿 (768px):**
- 시나리오 아이템: flex-direction: row, gap: 24px
- 번호: font-size: 48px, min-width: 60px

**데스크톱 (968px 이상):**
- padding: 96px 32px
- 제목: font-size: 40px, margin-bottom: 48px
- 시나리오 리스트: gap: 32px
- 시나리오 아이템: padding: 32px, gap: 24px
- 번호: font-size: 48px, min-width: 80px

#### 6.4.4 콘텐츠

**시나리오 1: 밤에 갑자기 복통이...**
- 번호: "01"
- 제목: "밤에 갑자기 복통이..."
- 설명: "증상 체크로 긴급도를 확인하고, 가까운 응급실을 찾아 진료 가능 여부를 확인한 후 방문하세요."

**시나리오 2: 감기인지 독감인지 모르겠어요**
- 번호: "02"
- 제목: "감기인지 독감인지 모르겠어요"
- 설명: "증상을 입력하면 가능한 원인을 확인하고, 병원 방문이 필요한지 판단할 수 있어요."

**시나리오 3: 응급실 뺑뺑이를 피하고 싶어요**
- 번호: "03"
- 제목: "응급실 뺑뺑이를 피하고 싶어요"
- 설명: "병원 찾기에서 진료 가능 여부와 대기 시간을 확인하고, 가장 가까운 병원을 선택하세요."

---

### 6.5 신뢰성 및 안전성 섹션

#### 6.5.1 목적
의료 정보 제공의 신뢰성과 안전성 강조, 면책 조항 및 데이터 보안 안내

#### 6.5.2 기능 요구사항
- [x] 섹션 헤더 (아이콘 + 제목)
- [x] 신뢰 포인트 3개 표시
- [x] 각 포인트에 아이콘, 제목, 설명 포함
- [x] 반응형 레이아웃

#### 6.5.3 UI/UX 명세

**모바일 (360px):**
- 섹션 컨테이너: width: 100%, padding: 64px 16px, background: #f9fafb
- 아이콘: Shield, 48px, color: #667eea, margin: 0 auto 16px
- 제목 (H2): font-size: 24px, font-weight: 700, text-align: center, margin-bottom: 24px
- 신뢰 포인트 리스트: flex-direction: column, gap: 16px
- 신뢰 포인트: width: 100%, background: #ffffff, border-radius: 12px, padding: 20px, flex-direction: column, gap: 12px
- 포인트 아이콘: CheckCircle, 24px, color: #10b981
- 포인트 제목: font-size: 18px, font-weight: 600, margin-bottom: 8px
- 포인트 설명: font-size: 16px, color: #666666, line-height: 1.6

**태블릿 (768px):**
- 신뢰 포인트: flex-direction: row, gap: 16px, padding: 24px

**데스크톱 (968px 이상):**
- padding: 96px 32px
- 섹션 헤더: max-width: 800px, margin: 0 auto 32px
- 제목: font-size: 32px, margin-bottom: 32px
- 신뢰 포인트 리스트: max-width: 800px, margin: 0 auto, gap: 24px
- 신뢰 포인트: padding: 24px

#### 6.5.4 콘텐츠

**포인트 1: 의료 진단이 아닙니다**
- 아이콘: CheckCircle
- 제목: "의료 진단이 아닙니다"
- 설명: "본 앱은 의료 진단을 제공하지 않으며, 단순히 정보 제공 및 증상 체크만 수행합니다."

**포인트 2: 응급 상황 안내**
- 아이콘: CheckCircle
- 제목: "응급 상황 안내"
- 설명: "응급 상황 시 즉시 119에 연락하거나 응급실을 방문하세요."

**포인트 3: 데이터 보안**
- 아이콘: CheckCircle
- 제목: "데이터 보안"
- 설명: "개인 건강 정보는 로컬에만 저장되며, 외부로 전송되지 않습니다."

---

### 6.6 최종 CTA 섹션

#### 6.6.1 목적
사용자를 앱 내부로 최종 유도 및 강력한 액션 호출

#### 6.6.2 기능 요구사항
- [x] 섹션 헤더 (아이콘 + 제목 + 설명)
- [x] Primary CTA 버튼 (Large)
- [x] Secondary CTA 버튼 (Large)
- [x] 반응형 레이아웃

#### 6.6.3 UI/UX 명세

**모바일 (360px):**
- 섹션 컨테이너: width: 100%, padding: 64px 16px, background: #ffffff
- 섹션 콘텐츠: text-align: center, max-width: 100%
- 아이콘: Heart, 48px, color: #667eea, margin: 0 auto 16px
- 제목 (H2): font-size: 28px, font-weight: 700, margin-bottom: 12px
- 설명: font-size: 18px, color: #666666, margin-bottom: 32px
- 버튼 그룹: flex-direction: column, gap: 12px, width: 100%
- Primary 버튼: width: 100%, padding: 16px 32px, font-size: 18px, background: #667eea, min-height: 52px
- Secondary 버튼: width: 100%, padding: 16px 32px, font-size: 18px, border: 2px solid #667eea, min-height: 52px

**태블릿 (768px):**
- 버튼 그룹: flex-direction: row, justify-content: center, max-width: 600px, margin: 0 auto
- 버튼: width: auto, flex: 1, max-width: 280px

**데스크톱 (968px 이상):**
- padding: 96px 32px
- 섹션 콘텐츠: max-width: 600px, margin: 0 auto
- 제목: font-size: 40px, margin-bottom: 16px
- 설명: font-size: 19.2px, margin-bottom: 40px
- 버튼 그룹: gap: 16px
- 버튼: padding: 20px 40px, font-size: 19.2px

#### 6.6.4 인터랙션
- Primary 버튼 클릭 → `/check` 경로로 이동
- Secondary 버튼 클릭 → `/hospitals` 경로로 이동

---

## 7. 공통 컴포넌트 및 스타일 시스템

### 7.1 버튼 스타일 시스템

#### Primary Button (Large)
```css
/* 모바일 */
padding: 16px 32px;
font-size: 18px;
font-weight: 600;
border-radius: 8px;
background: #667eea;
color: #ffffff;
border: none;
width: 100%;
min-height: 52px;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
transition: all 0.2s ease;

/* 호버 */
background: #5568d3;
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

/* 데스크톱 */
width: auto;
padding: 20px 40px;
font-size: 19.2px;
```

#### Secondary Button (Large)
```css
/* 모바일 */
padding: 16px 32px;
font-size: 18px;
font-weight: 600;
border-radius: 8px;
background: transparent;
color: #667eea;
border: 2px solid #667eea;
width: 100%;
min-height: 52px;
transition: all 0.2s ease;

/* 호버 */
background: rgba(102, 126, 234, 0.1);

/* 데스크톱 */
width: auto;
padding: 20px 40px;
font-size: 19.2px;
```

### 7.2 카드 스타일 시스템

#### 기본 카드
```css
background: #ffffff;
border-radius: 12px;
padding: 24px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
border: 1px solid #f3f4f6;
transition: all 0.2s ease;
```

#### 기능 카드
```css
background: #f9fafb;
border-radius: 16px;
padding: 32px;
border: 2px solid transparent;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
transition: all 0.2s ease;

/* 호버 */
transform: translateY(-4px);
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
border-color: #667eea;
```

### 7.3 섹션 컨테이너
```css
.section-container {
  width: 100%;
  max-width: 100%;
  padding: 64px 16px;
  margin: 0 auto;
}

@media (min-width: 968px) {
  .section-container {
    max-width: 1200px;
    padding: 96px 32px;
  }
}
```

---

## 8. 성능 요구사항

### 8.1 로딩 성능
- **초기 로딩 시간**: 3초 이내
- **First Contentful Paint (FCP)**: 1.5초 이내
- **Largest Contentful Paint (LCP)**: 2.5초 이내
- **Time to Interactive (TTI)**: 3.5초 이내

### 8.2 최적화 전략
- **코드 스플리팅**: 라우트별 분리
- **이미지 최적화**: WebP 형식, lazy loading
- **폰트 최적화**: font-display: swap
- **CSS 최적화**: Critical CSS 인라인, 나머지 지연 로딩
- **번들 크기**: 초기 번들 200KB 이하

### 8.3 성능 지표
- **Lighthouse Performance Score**: 90점 이상
- **Core Web Vitals**: 모두 "Good" 등급
- **모바일 페이지 속도**: 3초 이내

---

## 9. 접근성 요구사항

### 9.1 WCAG 준수
- **레벨**: WCAG 2.1 AA
- **색상 대비**: 최소 4.5:1 (텍스트와 배경)
- **키보드 네비게이션**: 모든 인터랙티브 요소 접근 가능
- **스크린 리더 지원**: 적절한 ARIA 레이블 및 시맨틱 HTML

### 9.2 구현 요구사항
- **포커스 스타일**: outline: 2px solid #667eea, outline-offset: 2px
- **ARIA 레이블**: 모든 아이콘 버튼에 `aria-label` 추가
- **시맨틱 HTML**: `<section>`, `<header>`, `<nav>`, `<main>`, `<footer>` 사용
- **대체 텍스트**: 모든 이미지에 alt 텍스트 제공

---

## 10. 브라우저 호환성

### 10.1 지원 브라우저
- **Chrome**: 최신 2개 버전
- **Firefox**: 최신 2개 버전
- **Safari**: 최신 2개 버전
- **Edge**: 최신 2개 버전

### 10.2 모바일 브라우저
- **iOS Safari**: iOS 14 이상
- **Chrome Mobile**: 최신 버전
- **Samsung Internet**: 최신 버전

---

## 11. 개발 일정 및 우선순위

### 11.1 Phase 1 (MVP) - 필수 기능
**기간**: 2주

1. **Week 1**
   - 프로젝트 설정 및 기본 구조
   - Hero 섹션 구현
   - 문제 정의 섹션 구현
   - 주요 기능 소개 섹션 구현

2. **Week 2**
   - 사용 시나리오 섹션 구현
   - 신뢰성/안전성 섹션 구현
   - 최종 CTA 섹션 구현
   - 반응형 디자인 적용
   - 테스트 및 버그 수정

### 11.2 Phase 2 - 개선 및 최적화
**기간**: 1주

- 성능 최적화
- 접근성 개선
- 브라우저 호환성 테스트
- 사용자 테스트 및 피드백 반영

### 11.3 Phase 3 - 선택 기능
**기간**: 1주 (선택)

- 스크롤 애니메이션
- FAQ 섹션
- 사용자 후기 섹션
- A/B 테스팅 준비

---

## 12. 테스트 계획

### 12.1 기능 테스트
- [ ] 모든 섹션 렌더링 확인
- [ ] 모든 CTA 버튼 라우팅 확인
- [ ] 반응형 레이아웃 확인 (360px, 768px, 968px)
- [ ] 호버 효과 확인
- [ ] 키보드 네비게이션 확인

### 12.2 성능 테스트
- [ ] Lighthouse 성능 점수 확인
- [ ] Core Web Vitals 측정
- [ ] 번들 크기 확인
- [ ] 로딩 시간 측정

### 12.3 접근성 테스트
- [ ] 스크린 리더 테스트
- [ ] 키보드 네비게이션 테스트
- [ ] 색상 대비 확인
- [ ] ARIA 레이블 확인

### 12.4 브라우저 호환성 테스트
- [ ] Chrome 테스트
- [ ] Firefox 테스트
- [ ] Safari 테스트
- [ ] Edge 테스트
- [ ] 모바일 브라우저 테스트

### 12.5 사용자 테스트
- [ ] 사용성 테스트 (5-10명)
- [ ] A/B 테스트 (선택)
- [ ] 피드백 수집 및 반영

---

## 13. 리스크 관리

### 13.1 기술적 리스크
- **리스크**: 브라우저 호환성 이슈
- **대응**: 폴리필 사용, 점진적 향상 적용

- **리스크**: 성능 저하
- **대응**: 코드 스플리팅, 이미지 최적화, 성능 모니터링

### 13.2 비즈니스 리스크
- **리스크**: 낮은 전환율
- **대응**: A/B 테스팅, 사용자 피드백 수집 및 개선

- **리스크**: 법적 이슈 (의료 정보 제공)
- **대응**: 명확한 면책 조항, 법률 자문

---

## 14. 성공 기준

### 14.1 정량적 기준
- **랜딩 페이지 → 증상 체크 전환율**: 30% 이상
- **랜딩 페이지 → 병원 찾기 전환율**: 20% 이상
- **평균 세션 시간**: 2분 이상
- **이탈률**: 50% 이하
- **재방문율**: 25% 이상
- **Lighthouse Performance Score**: 90점 이상

### 14.2 정성적 기준
- 사용자가 서비스의 핵심 가치를 이해함
- 신뢰감 있는 서비스로 인식
- 직관적인 사용자 경험
- 사용자 만족도: 4.0/5.0 이상

---

## 15. 향후 개선 사항

### 15.1 Phase 2 개선
1. 실제 병원 데이터 API 연동 (공공데이터포털)
2. GPS 기반 위치 서비스
3. 지도 통합 (네이버 지도/카카오맵)
4. 실시간 병원 진료 가능 여부 API 연동

### 15.2 Phase 3 개선
1. A/B 테스팅을 통한 최적화
2. 다국어 지원 (영어, 중국어 등)
3. 소셜 미디어 공유 기능
4. 블로그/건강 정보 콘텐츠 연동
5. 모바일 앱 다운로드 링크 (향후 앱 출시 시)
6. FAQ 섹션 추가
7. 사용자 후기/리뷰 섹션 추가

---

## 16. 법적 및 규제 요구사항

### 16.1 면책 조항
- 본 앱은 의료 진단을 제공하지 않으며, 단순히 정보 제공 및 증상 체크만 수행합니다.
- 모든 콘텐츠에 명확한 면책 조항 표시 필수

### 16.2 개인정보 보호
- 개인 건강 정보는 로컬에만 저장되며, 외부로 전송되지 않습니다.
- 개인정보 처리방침 페이지 제공

### 16.3 응급 상황 안내
- 응급 상황 시 즉시 119에 연락하거나 응급실을 방문하도록 명확히 안내

---

## 17. 유지보수 계획

### 17.1 정기 업데이트
- **주기**: 월 1회
- **내용**: 버그 수정, 성능 개선, 사용자 피드백 반영

### 17.2 모니터링
- **성능 모니터링**: Google Analytics, Lighthouse CI
- **에러 모니터링**: Sentry 또는 유사 도구
- **사용자 피드백**: 설문조사, 사용자 인터뷰

---

## 18. 참고 문서

- [상세 기능 명세서](./DETAILED_SPEC.md)
- [UI/UX 와이어프레임 명세서](./WIREFRAME_SPEC.md)
- [종합 개발 프롬프트](./DEVELOPMENT_PROMPT.md)
- 기존 앱 기능 명세서
- 사용자 인터뷰 결과 (향후)
- 경쟁사 분석 (향후)

---

## 문서 승인

- **작성자**: [이름]
- **검토자**: [이름]
- **승인자**: [이름]
- **승인일**: [날짜]

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2024 | 초기 PRD 작성 | - |
| 2.0 | 2024 | 종합 개발 프롬프트 반영, 상세 명세 추가 | - |
