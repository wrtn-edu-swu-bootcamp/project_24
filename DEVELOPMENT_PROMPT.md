# 건강 체크 앱 - 랜딩 페이지 종합 개발 프롬프트

## 프로젝트 개요

건강 체크 앱의 랜딩 페이지를 개발합니다. 병원에 가기 애매하게 아프거나 병원을 가기 전에 간단하게 자기 몸을 진단할 수 있는 서비스를 소개하는 랜딩 페이지입니다.

**핵심 가치 제안:**
- 빠른 자가 진단: 증상 입력만으로 긴급도 판단 및 권장사항 제공
- 실시간 병원 정보: 당장 진료 가능한 가까운 병원/응급실 찾기
- 응급실 뺑뺑이 방지: 진료 가능 여부와 대기 시간 확인으로 불필요한 이동 방지
- 건강 기록 관리: 증상 패턴 추적 및 병원 방문 전 증상 요약 제공

---

## 기술 스택

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: CSS3 (모바일 우선 반응형)
- **Package Manager**: npm

---

## 프로젝트 구조

```
src/
├── components/
│   ├── LandingPage.tsx
│   ├── LandingPage.css
│   ├── SymptomChecker.tsx
│   ├── HospitalFinder.tsx
│   └── HealthRecord.tsx
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

---

## 색상 팔레트

```css
/* Primary Colors */
--primary: #667eea;
--primary-dark: #5568d3;
--secondary: #764ba2;

/* Semantic Colors */
--accent-emergency: #ef4444;
--success: #10b981;
--warning: #f59e0b;

/* Neutral Colors */
--text-primary: #333333;
--text-secondary: #666666;
--text-tertiary: #999999;
--bg-white: #ffffff;
--bg-gray: #f9fafb;
--border: #e5e7eb;
--border-light: #f3f4f6;

/* Gradient */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## 타이포그래피 시스템

### 모바일 (360px 기준)
- **H1**: 32px (2rem), Bold (700), line-height: 1.2
- **H2**: 28px (1.75rem), Bold (700), line-height: 1.3
- **H3**: 22px (1.375rem), Semi-bold (600), line-height: 1.4
- **H4**: 18px (1.125rem), Semi-bold (600), line-height: 1.5
- **Body Large**: 18px (1.125rem), Regular (400), line-height: 1.6
- **Body Regular**: 16px (1rem), Regular (400), line-height: 1.6
- **Body Small**: 14px (0.875rem), Regular (400), line-height: 1.5

### 데스크톱 (968px 이상)
- **H1**: 56px (3.5rem)
- **H2**: 40px (2.5rem)
- **H3**: 24px (1.5rem)
- **H4**: 19.2px (1.2rem)

---

## 반응형 브레이크포인트

```css
/* 모바일 */
@media (min-width: 360px) { /* 기본 스타일 */ }

/* 태블릿 */
@media (min-width: 768px) { /* 태블릿 스타일 */ }

/* 데스크톱 */
@media (min-width: 968px) { /* 데스크톱 스타일 */ }
```

---

## 간격 시스템 (4px 단위)

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px
- 4XL: 96px

---

## 구현해야 할 섹션

### 1. Hero 섹션

**목적**: 첫 화면에서 서비스의 핵심 가치를 즉시 전달

**모바일 (360px) 레이아웃:**
```css
.hero-section {
  width: 100%;
  min-height: 80vh;
  padding: 32px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  position: relative;
}
```

**요소:**
- **H1**: "병원 가기 전, 먼저 체크하세요"
  - font-size: 32px, font-weight: 700, margin-bottom: 16px
- **서브 헤드라인**: "증상 체크부터 가까운 병원 찾기까지, 건강 관리를 한 번에"
  - font-size: 16px, margin-bottom: 32px, color: rgba(255, 255, 255, 0.95)
- **Primary CTA 버튼**: "증상 체크 시작하기"
  - width: 100%, padding: 16px 32px, font-size: 18px, background: #ffffff, color: #667eea
  - border-radius: 8px, min-height: 52px
  - onClick: navigate('/check')
- **Secondary CTA 버튼**: "병원 찾기"
  - width: 100%, padding: 16px 32px, background: transparent, border: 2px solid #ffffff
  - onClick: navigate('/hospitals')
- **안내 문구**: "회원가입 없이 바로 사용할 수 있습니다"
  - font-size: 14px, color: rgba(255, 255, 255, 0.8), margin-top: 16px
- **히어로 카드** (시각적 요소)
  - max-width: 280px, background: rgba(255, 255, 255, 0.15), backdrop-filter: blur(10px)
  - border-radius: 20px, padding: 32px, margin-top: 32px
  - 내부: Stethoscope 아이콘 (64px), "빠른 자가 진단" 텍스트

**데스크톱 (968px 이상):**
- min-height: 90vh
- display: grid, grid-template-columns: 1fr 1fr, gap: 64px
- text-align: left
- H1: 56px
- 서브 헤드라인: 24px
- 버튼 그룹: flex-direction: row, width: auto

---

### 2. 문제 정의 섹션

**목적**: 사용자의 페인 포인트를 공감하고 해결책 제시

**모바일 (360px) 레이아웃:**
```css
.problem-section {
  width: 100%;
  padding: 64px 16px;
  background: #f9fafb;
}
```

**요소:**
- **H2**: "이런 고민 있으신가요?"
  - font-size: 28px, font-weight: 700, text-align: center, margin-bottom: 32px
- **문제 카드 그리드**: flex-direction: column, gap: 16px

**문제 카드 (3개):**
1. **응급실 뺑뺑이**
   - 아이콘: AlertCircle (32px, #667eea)
   - 제목: "응급실 뺑뺑이" (20px, Semi-bold)
   - 설명: "응급실에 갔는데 진료가 안 되는 경우가 많아요" (16px, #666666)
   - 통계 배지: "응급실 방문자의 30%가 진료 불가 경험"
     - background: #fef3c7, color: #92400e, padding: 8px 16px, border-radius: 6px

2. **증상 판단 어려움**
   - 아이콘: Activity (32px)
   - 제목: "증상 판단 어려움"
   - 설명: "병원 가기 전 증상이 심각한지 판단이 어려워요"

3. **병원 찾기 어려움**
   - 아이콘: MapPin (32px)
   - 제목: "병원 찾기 어려움"
   - 설명: "당장 진료 가능한 가까운 병원을 찾기 어려워요"

**카드 스타일:**
```css
.problem-card {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.2s ease;
}

.problem-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

**태블릿 (768px):** grid-template-columns: repeat(2, 1fr), gap: 24px
**데스크톱 (968px):** padding: 96px 32px, H2: 40px, grid-template-columns: repeat(3, 1fr), gap: 32px, 카드 padding: 32px

---

### 3. 주요 기능 소개 섹션

**목적**: 앱의 핵심 기능 3가지를 시각적으로 소개

**모바일 (360px) 레이아웃:**
```css
.features-section {
  width: 100%;
  padding: 64px 16px;
  background: #ffffff;
}
```

**요소:**
- **H2**: "주요 기능"
  - font-size: 28px, text-align: center, margin-bottom: 32px
- **기능 카드 그리드**: flex-direction: column, gap: 24px

**기능 카드 (3개):**

1. **빠른 자가 진단**
   - 아이콘 래퍼: 64px × 64px, gradient 배경, border-radius: 16px
   - 아이콘: Stethoscope (32px, white)
   - 제목: "빠른 자가 진단" (22px, Semi-bold)
   - 설명: "증상 입력만으로 긴급도 판단 및 권장사항 제공" (16px, #666666)
   - 기능 리스트:
     - "12가지 일반 증상 선택"
     - "심각도 및 지속 시간 입력"
     - "AI 기반 긴급도 분석"
     - "병원 방문 필요성 판단"
   - CTA 버튼: "증상 체크하기" → navigate('/check')

2. **실시간 병원 정보**
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

3. **건강 기록 관리**
   - 아이콘: FileText
   - 제목: "건강 기록 관리"
   - 설명: "과거 증상 체크 기록을 저장하고 패턴 분석"
   - 기능 리스트:
     - "증상 체크 기록 자동 저장"
     - "기록 상세 정보 확인"
     - "증상 패턴 추적"
     - "병원 방문 전 증상 요약"
   - CTA 버튼: "건강 기록 보기" → navigate('/records')

**카드 스타일:**
```css
.feature-card {
  width: 100%;
  background: #f9fafb;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}
```

**리스트 아이템 스타일:**
```css
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.feature-list li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  font-size: 16px;
  color: #555555;
  line-height: 1.6;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 700;
  font-size: 18px;
}
```

**CTA 버튼 스타일:**
```css
.feature-cta {
  width: 100%;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #667eea;
  color: #ffffff;
  border: none;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.feature-cta:hover {
  background: #5568d3;
}
```

**태블릿 (768px):** grid-template-columns: repeat(2, 1fr), gap: 32px, 아이콘 래퍼: 80px
**데스크톱 (968px):** padding: 96px 32px, H2: 40px, grid-template-columns: repeat(3, 1fr), gap: 40px, 카드 padding: 40px

---

### 4. 사용 시나리오 섹션

**목적**: 실제 사용 사례를 통해 서비스 이해도 향상

**모바일 (360px) 레이아웃:**
```css
.use-cases-section {
  width: 100%;
  padding: 64px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}
```

**요소:**
- **H2**: "이렇게 사용하세요"
  - font-size: 28px, color: #ffffff, text-align: center, margin-bottom: 32px
- **시나리오 리스트**: flex-direction: column, gap: 16px

**시나리오 아이템 (3개):**

1. **밤에 갑자기 복통이...**
   - 번호: "01" (36px, Bold, opacity: 0.5)
   - 제목: "밤에 갑자기 복통이..." (20px, Semi-bold)
   - 설명: "증상 체크로 긴급도를 확인하고, 가까운 응급실을 찾아 진료 가능 여부를 확인한 후 방문하세요." (16px, rgba(255, 255, 255, 0.9))

2. **감기인지 독감인지 모르겠어요**
   - 번호: "02"
   - 제목: "감기인지 독감인지 모르겠어요"
   - 설명: "증상을 입력하면 가능한 원인을 확인하고, 병원 방문이 필요한지 판단할 수 있어요."

3. **응급실 뺑뺑이를 피하고 싶어요**
   - 번호: "03"
   - 제목: "응급실 뺑뺑이를 피하고 싶어요"
   - 설명: "병원 찾기에서 진료 가능 여부와 대기 시간을 확인하고, 가장 가까운 병원을 선택하세요."

**아이템 스타일:**
```css
.use-case-item {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

**태블릿 (768px):** flex-direction: row, gap: 24px, 번호: 48px, min-width: 60px
**데스크톱 (968px):** padding: 96px 32px, H2: 40px, gap: 32px, 아이템 padding: 32px, 번호: 48px, min-width: 80px

---

### 5. 신뢰성 및 안전성 섹션

**목적**: 의료 정보 제공의 신뢰성과 안전성 강조

**모바일 (360px) 레이아웃:**
```css
.trust-section {
  width: 100%;
  padding: 64px 16px;
  background: #f9fafb;
}
```

**요소:**
- **아이콘**: Shield (48px, #667eea), margin: 0 auto 16px
- **H2**: "안전하고 신뢰할 수 있는 서비스"
  - font-size: 24px, text-align: center, margin-bottom: 24px
- **신뢰 포인트 리스트**: flex-direction: column, gap: 16px

**신뢰 포인트 (3개):**

1. **의료 진단이 아닙니다**
   - 아이콘: CheckCircle (24px, #10b981)
   - 제목: "의료 진단이 아닙니다" (18px, Semi-bold)
   - 설명: "본 앱은 의료 진단을 제공하지 않으며, 단순히 정보 제공 및 증상 체크만 수행합니다." (16px, #666666)

2. **응급 상황 안내**
   - 아이콘: CheckCircle (24px, #10b981)
   - 제목: "응급 상황 안내"
   - 설명: "응급 상황 시 즉시 119에 연락하거나 응급실을 방문하세요."

3. **데이터 보안**
   - 아이콘: CheckCircle (24px, #10b981)
   - 제목: "데이터 보안"
   - 설명: "개인 건강 정보는 로컬에만 저장되며, 외부로 전송되지 않습니다."

**포인트 스타일:**
```css
.trust-point {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
```

**태블릿 (768px):** flex-direction: row, gap: 16px, padding: 24px
**데스크톱 (968px):** padding: 96px 32px, max-width: 800px, margin: 0 auto, H2: 32px, gap: 24px

---

### 6. 최종 CTA 섹션

**목적**: 사용자를 앱 내부로 최종 유도

**모바일 (360px) 레이아웃:**
```css
.final-cta-section {
  width: 100%;
  padding: 64px 16px;
  background: #ffffff;
}
```

**요소:**
- **아이콘**: Heart (48px, #667eea), margin: 0 auto 16px
- **H2**: "지금 바로 시작하세요"
  - font-size: 28px, text-align: center, margin-bottom: 12px
- **설명**: "회원가입 없이 바로 사용할 수 있습니다"
  - font-size: 18px, color: #666666, margin-bottom: 32px
- **버튼 그룹**: flex-direction: column, gap: 12px, width: 100%

**버튼:**
- **Primary CTA**: "증상 체크 시작하기"
  - width: 100%, padding: 16px 32px, font-size: 18px, background: #667eea
  - min-height: 52px, onClick: navigate('/check')
- **Secondary CTA**: "병원 찾기"
  - width: 100%, padding: 16px 32px, background: transparent, border: 2px solid #667eea
  - onClick: navigate('/hospitals')

**태블릿 (768px):** flex-direction: row, justify-content: center, max-width: 600px, 버튼: flex: 1, max-width: 280px
**데스크톱 (968px):** padding: 96px 32px, max-width: 600px, margin: 0 auto, H2: 40px, 설명: 19.2px, 버튼: padding: 20px 40px, font-size: 19.2px

---

## 공통 컴포넌트 스타일

### 섹션 컨테이너
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

### 섹션 제목
```css
.section-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
  color: #333333;
}

@media (min-width: 968px) {
  .section-title {
    font-size: 40px;
    margin-bottom: 48px;
  }
}
```

---

## 버튼 스타일 시스템

### Primary Button (Large)
```css
.btn-primary-large {
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
  cursor: pointer;
}

.btn-primary-large:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (min-width: 968px) {
  .btn-primary-large {
    width: auto;
    padding: 20px 40px;
    font-size: 19.2px;
  }
}
```

### Secondary Button (Large)
```css
.btn-secondary-large {
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
  cursor: pointer;
}

.btn-secondary-large:hover {
  background: rgba(102, 126, 234, 0.1);
}

@media (min-width: 968px) {
  .btn-secondary-large {
    width: auto;
    padding: 20px 40px;
    font-size: 19.2px;
  }
}
```

---

## 애니메이션 및 전환

### 기본 전환
```css
* {
  transition: all 0.2s ease;
}
```

### 페이드인 애니메이션
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

---

## 접근성 요구사항

1. **포커스 스타일**
```css
button:focus,
a:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

2. **ARIA 레이블**: 모든 아이콘 버튼에 `aria-label` 추가
3. **시맨틱 HTML**: `<section>`, `<header>`, `<nav>`, `<main>`, `<footer>` 사용
4. **색상 대비**: 최소 4.5:1 (WCAG AA)

---

## 구현 체크리스트

### 필수 구현
- [ ] Hero 섹션 완전 구현 (모바일/데스크톱)
- [ ] 문제 정의 섹션 완전 구현
- [ ] 주요 기능 소개 섹션 완전 구현
- [ ] 사용 시나리오 섹션 완전 구현
- [ ] 신뢰성/안전성 섹션 완전 구현
- [ ] 최종 CTA 섹션 완전 구현
- [ ] 반응형 디자인 (360px, 768px, 968px)
- [ ] 모든 CTA 버튼 라우팅 연결
- [ ] 호버 효과 및 전환 애니메이션
- [ ] 색상 팔레트 적용
- [ ] 타이포그래피 시스템 적용
- [ ] 간격 시스템 적용

### 선택 구현
- [ ] 스크롤 애니메이션 (Intersection Observer)
- [ ] 스무스 스크롤
- [ ] 이미지 lazy loading

---

## 라우팅 구조

```tsx
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/check" element={<SymptomChecker />} />
  <Route path="/hospitals" element={<HospitalFinder />} />
  <Route path="/records" element={<HealthRecord />} />
</Routes>
```

---

## 개발 가이드라인

1. **모바일 우선**: 모든 스타일은 모바일(360px) 기준으로 작성하고, 미디어 쿼리로 확장
2. **유연한 단위**: rem과 px을 적절히 혼용 (폰트 크기는 rem, 간격은 px 또는 rem)
3. **성능**: transition과 transform 사용 (reflow 최소화)
4. **접근성**: 키보드 네비게이션과 스크린 리더 지원 필수
5. **일관성**: 색상, 타이포그래피, 간격 시스템을 일관되게 적용

---

## 시작하기

1. React + TypeScript + Vite 프로젝트 생성
2. React Router 설치 및 설정
3. Lucide React 설치
4. 위의 명세에 따라 각 섹션 구현
5. 반응형 브레이크포인트 적용
6. 테스트 및 최적화

---

## 참고사항

- 모든 수치는 정확히 준수
- 호버 효과는 필수
- 모바일에서 버튼은 100% 너비
- 데스크톱에서 버튼은 자동 너비
- 카드 호버 시 transform과 box-shadow 변경
- 모든 인터랙티브 요소에 transition 적용
