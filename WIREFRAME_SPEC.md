# 건강 체크 앱 - 랜딩 페이지 UI/UX 와이어프레임 명세서

## 문서 개요
본 문서는 모바일 우선(360px 기준) 디자인을 기반으로 한 상세 UI/UX 와이어프레임 명세서입니다. 개발자가 바로 코딩할 수 있도록 구체적인 수치를 제공합니다.

---

## 디자인 원칙

### 모바일 우선 (Mobile First)
- **기준 너비**: 360px (최소 모바일 화면)
- **브레이크포인트**:
  - 모바일: 360px ~ 767px
  - 태블릿: 768px ~ 967px
  - 데스크톱: 968px 이상

### 기본 설정
- **폰트 패밀리**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
- **기본 폰트 크기**: 16px (1rem)
- **기본 줄 간격**: 1.5
- **기본 색상**: #333333 (텍스트)

---

## 색상 팔레트 (Color Palette)

### Primary Colors
- **Primary**: `#667eea` (보라색 계열)
- **Primary Dark**: `#5568d3` (호버 상태)
- **Secondary**: `#764ba2` (진한 보라색)

### Semantic Colors
- **Accent (Emergency)**: `#ef4444` (빨간색)
- **Success**: `#10b981` (초록색)
- **Warning**: `#f59e0b` (주황색)

### Neutral Colors
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Text Tertiary**: `#999999`
- **Background White**: `#ffffff`
- **Background Gray**: `#f9fafb`
- **Border**: `#e5e7eb`
- **Border Light**: `#f3f4f6`

### Gradient
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

---

## 타이포그래피 (Typography)

### 모바일 (360px 기준)

#### Headings
- **H1**: 
  - Font Size: `32px` (2rem)
  - Font Weight: `700` (Bold)
  - Line Height: `1.2`
  - Letter Spacing: `-0.02em`

- **H2**: 
  - Font Size: `28px` (1.75rem)
  - Font Weight: `700` (Bold)
  - Line Height: `1.3`
  - Letter Spacing: `-0.01em`

- **H3**: 
  - Font Size: `22px` (1.375rem)
  - Font Weight: `600` (Semi-bold)
  - Line Height: `1.4`

- **H4**: 
  - Font Size: `18px` (1.125rem)
  - Font Weight: `600` (Semi-bold)
  - Line Height: `1.5`

#### Body Text
- **Large**: 
  - Font Size: `18px` (1.125rem)
  - Font Weight: `400` (Regular)
  - Line Height: `1.6`

- **Regular**: 
  - Font Size: `16px` (1rem)
  - Font Weight: `400` (Regular)
  - Line Height: `1.6`

- **Small**: 
  - Font Size: `14px` (0.875rem)
  - Font Weight: `400` (Regular)
  - Line Height: `1.5`

- **XSmall**: 
  - Font Size: `12px` (0.75rem)
  - Font Weight: `400` (Regular)
  - Line Height: `1.4`

### 데스크톱 (968px 이상)
- **H1**: `56px` (3.5rem)
- **H2**: `40px` (2.5rem)
- **H3**: `24px` (1.5rem)
- **H4**: `19.2px` (1.2rem)

---

## 간격 시스템 (Spacing System)

### 기본 단위: 4px (0.25rem)

- **XS**: `4px` (0.25rem)
- **SM**: `8px` (0.5rem)
- **MD**: `16px` (1rem)
- **LG**: `24px` (1.5rem)
- **XL**: `32px` (2rem)
- **2XL**: `48px` (3rem)
- **3XL**: `64px` (4rem)
- **4XL**: `96px` (6rem)

### 섹션 간격
- **모바일**: `64px` (4rem) 상하
- **데스크톱**: `96px` (6rem) 상하

---

## 버튼 스타일 (Button Styles)

### Primary Button (Large)
```css
/* 모바일 (360px) */
padding: 16px 32px;        /* 상하 16px, 좌우 32px */
font-size: 18px;            /* 1.125rem */
font-weight: 600;           /* Semi-bold */
border-radius: 8px;
background: #667eea;
color: #ffffff;
border: none;
width: 100%;                /* 모바일: 전체 너비 */
min-height: 52px;
transition: all 0.2s ease;

/* 호버 상태 */
background: #5568d3;
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

/* 데스크톱 */
width: auto;                 /* 데스크톱: 자동 너비 */
padding: 20px 40px;         /* 상하 20px, 좌우 40px */
font-size: 19.2px;          /* 1.2rem */
```

### Primary Button (Medium)
```css
/* 모바일 */
padding: 12px 24px;
font-size: 16px;            /* 1rem */
font-weight: 600;
border-radius: 8px;
background: #667eea;
color: #ffffff;
border: none;
min-height: 44px;
width: 100%;
```

### Secondary Button (Large)
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

/* 호버 상태 */
background: rgba(102, 126, 234, 0.1);
```

### Secondary Button (Medium)
```css
/* 모바일 */
padding: 12px 24px;
font-size: 16px;
font-weight: 600;
border-radius: 8px;
background: transparent;
color: #667eea;
border: 2px solid #667eea;
width: 100%;
min-height: 44px;
```

### Icon Button
```css
/* 아이콘과 텍스트 간격 */
gap: 8px;                   /* 0.5rem */
display: flex;
align-items: center;
justify-content: center;
```

---

## 카드 스타일 (Card Styles)

### 기본 카드
```css
/* 모바일 */
background: #ffffff;
border-radius: 12px;
padding: 24px;              /* 1.5rem */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
border: 1px solid #f3f4f6;
transition: all 0.2s ease;

/* 호버 상태 */
transform: translateY(-4px);
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
```

### 기능 카드 (Feature Card)
```css
/* 모바일 */
background: #f9fafb;
border-radius: 16px;
padding: 32px;              /* 2rem */
border: 2px solid transparent;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
margin-bottom: 24px;        /* 카드 간 간격 */

/* 호버 상태 */
border-color: #667eea;
transform: translateY(-4px);
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
```

### 문제 카드 (Problem Card)
```css
/* 모바일 */
background: #ffffff;
border-radius: 12px;
padding: 24px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
text-align: center;
margin-bottom: 16px;
```

---

## 섹션별 상세 와이어프레임

---

## 1. Hero 섹션 (Hero Section)

### 모바일 (360px)

#### 컨테이너
```css
width: 100%;
min-height: 80vh;
padding: 32px 16px;         /* 상하 32px, 좌우 16px */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
color: #ffffff;
```

#### 메인 헤드라인 (H1)
```css
font-size: 32px;            /* 2rem */
font-weight: 700;
line-height: 1.2;
color: #ffffff;
margin-bottom: 16px;        /* 하단 여백 */
max-width: 100%;
```

#### 서브 헤드라인 (P)
```css
font-size: 16px;            /* 1rem */
font-weight: 400;
line-height: 1.6;
color: rgba(255, 255, 255, 0.95);
margin-bottom: 32px;        /* 하단 여백 */
max-width: 100%;
```

#### 버튼 그룹
```css
display: flex;
flex-direction: column;
gap: 12px;                  /* 버튼 간 간격 */
width: 100%;
max-width: 100%;
margin-bottom: 16px;
```

#### Primary CTA 버튼
```css
width: 100%;
padding: 16px 32px;
font-size: 18px;
font-weight: 600;
border-radius: 8px;
background: #ffffff;
color: #667eea;
border: none;
min-height: 52px;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
```

#### Secondary CTA 버튼
```css
width: 100%;
padding: 16px 32px;
font-size: 18px;
font-weight: 600;
border-radius: 8px;
background: transparent;
color: #ffffff;
border: 2px solid #ffffff;
min-height: 52px;
```

#### 안내 문구
```css
font-size: 14px;            /* 0.875rem */
color: rgba(255, 255, 255, 0.8);
margin-top: 16px;
```

#### 히어로 카드 (시각적 요소)
```css
width: 100%;
max-width: 280px;
margin-top: 32px;
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(10px);
border-radius: 20px;
padding: 32px;
text-align: center;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

#### 히어로 카드 아이콘
```css
width: 64px;
height: 64px;
margin: 0 auto 16px;
color: #ffffff;
```

#### 히어로 카드 텍스트
```css
font-size: 18px;            /* 1.125rem */
font-weight: 600;
color: #ffffff;
```

### 데스크톱 (968px 이상)
```css
/* 컨테이너 */
min-height: 90vh;
padding: 64px 32px;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 64px;
align-items: center;
text-align: left;           /* 왼쪽 정렬 */

/* 헤드라인 */
font-size: 56px;            /* 3.5rem */

/* 서브 헤드라인 */
font-size: 24px;            /* 1.5rem */

/* 버튼 그룹 */
flex-direction: row;
width: auto;

/* 버튼 */
width: auto;
```

---

## 2. 문제 정의 섹션 (Problem Section)

### 모바일 (360px)

#### 섹션 컨테이너
```css
width: 100%;
padding: 64px 16px;         /* 상하 64px, 좌우 16px */
background: #f9fafb;
```

#### 섹션 헤더
```css
text-align: center;
margin-bottom: 32px;
```

#### 제목 (H2)
```css
font-size: 28px;            /* 1.75rem */
font-weight: 700;
color: #333333;
margin-bottom: 32px;
```

#### 문제 카드 그리드
```css
display: flex;
flex-direction: column;
gap: 16px;                  /* 카드 간 간격 */
```

#### 문제 카드
```css
width: 100%;
background: #ffffff;
border-radius: 12px;
padding: 24px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
text-align: center;
```

#### 카드 아이콘
```css
width: 32px;
height: 32px;
margin: 0 auto 16px;
color: #667eea;
```

#### 카드 제목 (H3)
```css
font-size: 20px;            /* 1.25rem */
font-weight: 600;
color: #333333;
margin-bottom: 12px;
```

#### 카드 설명 (P)
```css
font-size: 16px;
color: #666666;
line-height: 1.6;
margin-bottom: 16px;
```

#### 통계 배지 (첫 번째 카드만)
```css
display: inline-block;
background: #fef3c7;
color: #92400e;
padding: 8px 16px;
border-radius: 6px;
font-size: 14px;
font-weight: 600;
margin-top: 8px;
```

### 태블릿 (768px)
```css
/* 카드 그리드 */
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 24px;
```

### 데스크톱 (968px 이상)
```css
/* 섹션 패딩 */
padding: 96px 32px;

/* 제목 */
font-size: 40px;            /* 2.5rem */
margin-bottom: 48px;

/* 카드 그리드 */
grid-template-columns: repeat(3, 1fr);
gap: 32px;

/* 카드 패딩 */
padding: 32px;
```

---

## 3. 주요 기능 소개 섹션 (Features Section)

### 모바일 (360px)

#### 섹션 컨테이너
```css
width: 100%;
padding: 64px 16px;
background: #ffffff;
```

#### 섹션 헤더
```css
text-align: center;
margin-bottom: 32px;
```

#### 제목 (H2)
```css
font-size: 28px;
font-weight: 700;
color: #333333;
margin-bottom: 32px;
```

#### 기능 카드 그리드
```css
display: flex;
flex-direction: column;
gap: 24px;
```

#### 기능 카드
```css
width: 100%;
background: #f9fafb;
border-radius: 16px;
padding: 32px;
border: 2px solid transparent;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
```

#### 아이콘 래퍼
```css
width: 64px;                /* 모바일: 작게 */
height: 64px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
border-radius: 16px;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
```

#### 아이콘
```css
width: 32px;                /* 모바일: 작게 */
height: 32px;
color: #ffffff;
```

#### 카드 제목 (H3)
```css
font-size: 22px;            /* 1.375rem */
font-weight: 600;
color: #333333;
margin-bottom: 12px;
```

#### 카드 설명 (P)
```css
font-size: 16px;
color: #666666;
line-height: 1.6;
margin-bottom: 20px;
```

#### 기능 리스트 (UL)
```css
list-style: none;
padding: 0;
margin: 0 0 24px 0;
```

#### 리스트 아이템 (LI)
```css
padding: 8px 0;
padding-left: 24px;
position: relative;
font-size: 16px;
color: #555555;
line-height: 1.6;
```

#### 체크마크 (::before)
```css
content: '✓';
position: absolute;
left: 0;
color: #10b981;
font-weight: 700;
font-size: 18px;
```

#### CTA 버튼
```css
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
```

### 태블릿 (768px)
```css
/* 카드 그리드 */
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 32px;

/* 아이콘 래퍼 */
width: 80px;
height: 80px;

/* 아이콘 */
width: 48px;
height: 48px;
```

### 데스크톱 (968px 이상)
```css
/* 섹션 패딩 */
padding: 96px 32px;

/* 제목 */
font-size: 40px;
margin-bottom: 48px;

/* 카드 그리드 */
grid-template-columns: repeat(3, 1fr);
gap: 40px;

/* 카드 패딩 */
padding: 40px;
```

---

## 4. 사용 시나리오 섹션 (Use Cases Section)

### 모바일 (360px)

#### 섹션 컨테이너
```css
width: 100%;
padding: 64px 16px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: #ffffff;
```

#### 섹션 헤더
```css
text-align: center;
margin-bottom: 32px;
```

#### 제목 (H2)
```css
font-size: 28px;
font-weight: 700;
color: #ffffff;
margin-bottom: 32px;
```

#### 시나리오 리스트
```css
display: flex;
flex-direction: column;
gap: 16px;
```

#### 시나리오 아이템
```css
width: 100%;
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border-radius: 12px;
padding: 24px;
display: flex;
flex-direction: column;
gap: 16px;
```

#### 번호
```css
font-size: 36px;            /* 모바일: 작게 */
font-weight: 700;
opacity: 0.5;
color: #ffffff;
line-height: 1;
```

#### 콘텐츠 영역
```css
flex: 1;
```

#### 아이템 제목 (H3)
```css
font-size: 20px;            /* 1.25rem */
font-weight: 600;
color: #ffffff;
margin-bottom: 8px;
```

#### 아이템 설명 (P)
```css
font-size: 16px;
color: rgba(255, 255, 255, 0.9);
line-height: 1.6;
```

### 태블릿 (768px)
```css
/* 시나리오 아이템 */
flex-direction: row;
gap: 24px;
align-items: flex-start;

/* 번호 */
font-size: 48px;
min-width: 60px;
```

### 데스크톱 (968px 이상)
```css
/* 섹션 패딩 */
padding: 96px 32px;

/* 제목 */
font-size: 40px;
margin-bottom: 48px;

/* 시나리오 리스트 */
gap: 32px;

/* 시나리오 아이템 */
padding: 32px;
gap: 24px;

/* 번호 */
font-size: 48px;
min-width: 80px;
```

---

## 5. 신뢰성 및 안전성 섹션 (Trust Section)

### 모바일 (360px)

#### 섹션 컨테이너
```css
width: 100%;
padding: 64px 16px;
background: #f9fafb;
```

#### 섹션 헤더
```css
text-align: center;
margin-bottom: 32px;
```

#### 아이콘
```css
width: 48px;
height: 48px;
margin: 0 auto 16px;
color: #667eea;
```

#### 제목 (H2)
```css
font-size: 24px;            /* 1.5rem */
font-weight: 700;
color: #333333;
margin-bottom: 24px;
```

#### 신뢰 포인트 리스트
```css
display: flex;
flex-direction: column;
gap: 16px;
max-width: 100%;
```

#### 신뢰 포인트
```css
width: 100%;
background: #ffffff;
border-radius: 12px;
padding: 20px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
display: flex;
flex-direction: column;     /* 모바일: 세로 배치 */
gap: 12px;
align-items: flex-start;
```

#### 포인트 아이콘
```css
width: 24px;
height: 24px;
color: #10b981;
flex-shrink: 0;
```

#### 포인트 콘텐츠
```css
flex: 1;
```

#### 포인트 제목 (H4)
```css
font-size: 18px;            /* 1.125rem */
font-weight: 600;
color: #333333;
margin-bottom: 8px;
```

#### 포인트 설명 (P)
```css
font-size: 16px;
color: #666666;
line-height: 1.6;
```

### 태블릿 (768px)
```css
/* 신뢰 포인트 */
flex-direction: row;
gap: 16px;
align-items: flex-start;
padding: 24px;
```

### 데스크톱 (968px 이상)
```css
/* 섹션 패딩 */
padding: 96px 32px;

/* 섹션 헤더 */
max-width: 800px;
margin: 0 auto 32px;

/* 제목 */
font-size: 32px;            /* 2rem */
margin-bottom: 32px;

/* 신뢰 포인트 리스트 */
max-width: 800px;
margin: 0 auto;
gap: 24px;

/* 신뢰 포인트 */
padding: 24px;
```

---

## 6. 최종 CTA 섹션 (Final CTA Section)

### 모바일 (360px)

#### 섹션 컨테이너
```css
width: 100%;
padding: 64px 16px;
background: #ffffff;
```

#### 섹션 콘텐츠
```css
text-align: center;
max-width: 100%;
```

#### 아이콘
```css
width: 48px;
height: 48px;
margin: 0 auto 16px;
color: #667eea;
```

#### 제목 (H2)
```css
font-size: 28px;            /* 1.75rem */
font-weight: 700;
color: #333333;
margin-bottom: 12px;
```

#### 설명 (P)
```css
font-size: 18px;            /* 1.125rem */
color: #666666;
margin-bottom: 32px;
line-height: 1.6;
```

#### 버튼 그룹
```css
display: flex;
flex-direction: column;
gap: 12px;
width: 100%;
max-width: 100%;
```

#### Primary CTA 버튼 (Large)
```css
width: 100%;
padding: 16px 32px;
font-size: 18px;
font-weight: 600;
border-radius: 8px;
background: #667eea;
color: #ffffff;
border: none;
min-height: 52px;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
```

#### Secondary CTA 버튼 (Large)
```css
width: 100%;
padding: 16px 32px;
font-size: 18px;
font-weight: 600;
border-radius: 8px;
background: transparent;
color: #667eea;
border: 2px solid #667eea;
min-height: 52px;
```

### 태블릿 (768px)
```css
/* 버튼 그룹 */
flex-direction: row;
justify-content: center;
width: auto;
max-width: 600px;
margin: 0 auto;

/* 버튼 */
width: auto;
flex: 1;
max-width: 280px;
```

### 데스크톱 (968px 이상)
```css
/* 섹션 패딩 */
padding: 96px 32px;

/* 섹션 콘텐츠 */
max-width: 600px;
margin: 0 auto;

/* 제목 */
font-size: 40px;            /* 2.5rem */
margin-bottom: 16px;

/* 설명 */
font-size: 19.2px;          /* 1.2rem */
margin-bottom: 40px;

/* 버튼 그룹 */
gap: 16px;

/* 버튼 */
padding: 20px 40px;
font-size: 19.2px;          /* 1.2rem */
```

---

## 공통 컴포넌트

### 섹션 컨테이너 (Section Container)
```css
/* 모바일 */
width: 100%;
max-width: 100%;
padding: 64px 16px;
margin: 0 auto;

/* 데스크톱 */
max-width: 1200px;
padding: 96px 32px;
```

### 섹션 제목 (Section Title)
```css
/* 모바일 */
font-size: 28px;            /* 1.75rem */
font-weight: 700;
text-align: center;
margin-bottom: 32px;
color: #333333;

/* 데스크톱 */
font-size: 40px;            /* 2.5rem */
margin-bottom: 48px;
```

---

## 반응형 브레이크포인트

### 모바일
```css
@media (min-width: 360px) {
  /* 최소 모바일 너비 */
}
```

### 태블릿
```css
@media (min-width: 768px) {
  /* 태블릿 스타일 */
}
```

### 데스크톱
```css
@media (min-width: 968px) {
  /* 데스크톱 스타일 */
}
```

---

## 레이아웃 그리드 시스템

### 모바일 (360px)
- **컬럼 수**: 1
- **간격**: 16px
- **패딩**: 좌우 16px

### 태블릿 (768px)
- **컬럼 수**: 2
- **간격**: 24px
- **패딩**: 좌우 32px

### 데스크톱 (968px 이상)
- **컬럼 수**: 3 (또는 필요에 따라)
- **간격**: 32px ~ 40px
- **패딩**: 좌우 32px
- **최대 너비**: 1200px

---

## 애니메이션 및 전환

### 기본 전환
```css
transition: all 0.2s ease;
```

### 호버 효과
```css
/* 카드 호버 */
transform: translateY(-4px);
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
transition: all 0.2s ease;
```

### 버튼 호버
```css
/* Primary 버튼 */
background: #5568d3;
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
transition: all 0.2s ease;
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

animation: fadeIn 0.6s ease-out;
```

---

## 접근성 (Accessibility)

### 포커스 스타일
```css
/* 버튼 포커스 */
outline: 2px solid #667eea;
outline-offset: 2px;
```

### ARIA 레이블
- 모든 아이콘 버튼에 `aria-label` 추가
- 섹션에 `aria-labelledby` 사용

### 색상 대비
- 텍스트와 배경: 최소 4.5:1 (WCAG AA)
- Primary 버튼: 4.5:1 이상

---

## 개발 체크리스트

### 필수 구현
- [ ] 모바일 360px 기준 레이아웃 완성
- [ ] 모든 버튼 스타일 구현
- [ ] 모든 카드 스타일 구현
- [ ] 반응형 브레이크포인트 적용
- [ ] 호버 효과 구현
- [ ] 색상 팔레트 적용
- [ ] 타이포그래피 시스템 적용
- [ ] 간격 시스템 적용

### 선택 구현
- [ ] 스크롤 애니메이션
- [ ] 페이드인 효과
- [ ] 스무스 스크롤
- [ ] 이미지 lazy loading

---

## 참고 사항

1. **모바일 우선**: 모든 스타일은 모바일(360px) 기준으로 작성하고, 미디어 쿼리로 확장
2. **유연한 단위**: rem과 px을 적절히 혼용 (폰트 크기는 rem, 간격은 px 또는 rem)
3. **성능**: transition과 transform 사용 (reflow 최소화)
4. **접근성**: 키보드 네비게이션과 스크린 리더 지원 필수

---

## 문서 버전
- **버전**: 1.0
- **작성일**: 2024
- **기준 너비**: 360px (모바일 우선)
