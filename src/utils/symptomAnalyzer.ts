import { Symptom, SymptomCheckResult } from '../types'

const EMERGENCY_SYMPTOMS = [
  '심한 가슴 통증',
  '의식 잃음',
  '심한 호흡 곤란',
  '심한 출혈',
  '심한 복통',
  '갑작스러운 시야 손실',
  '심한 두통',
  '발작',
  '화상',
  '골절',
  '심한 화상'
]

const HIGH_URGENCY_SYMPTOMS = [
  '고열',
  '지속적인 구토',
  '심한 어지러움',
  '호흡 곤란',
  '복통',
  '염좌',
  '골절 의심'
]

export function analyzeSymptoms(symptoms: Symptom[]): SymptomCheckResult {
  if (symptoms.length === 0) {
    return {
      urgency: 'low',
      urgencyScore: 0,
      possibleCauses: [],
      recommendations: ['증상을 선택해주세요.'],
      shouldVisitHospital: false
    }
  }

  let urgencyScore = 0
  const possibleCauses: string[] = []
  const recommendations: string[] = []

  // 증상별 점수 계산
  symptoms.forEach(symptom => {
    const severityWeight = symptom.severity / 10

    // 응급 증상 체크
    if (EMERGENCY_SYMPTOMS.some(es => symptom.name.includes(es))) {
      urgencyScore += 50 * severityWeight
      if (symptom.severity >= 8) {
        recommendations.push('🚨 즉시 응급실을 방문하거나 119에 연락하세요!')
      }
    }
    // 높은 긴급도 증상
    else if (HIGH_URGENCY_SYMPTOMS.some(hus => symptom.name.includes(hus))) {
      urgencyScore += 30 * severityWeight
    }
    // 외상 관련 증상 (화상, 염좌, 골절)
    else if (symptom.name.includes('화상') || symptom.name.includes('골절') || symptom.name.includes('염좌')) {
      if (symptom.name.includes('골절')) {
        urgencyScore += 45 * severityWeight
      } else if (symptom.name.includes('화상')) {
        urgencyScore += 40 * severityWeight
      } else if (symptom.name.includes('염좌')) {
        urgencyScore += 25 * severityWeight
      }
    }
    // 일반 증상
    else {
      urgencyScore += 10 * severityWeight
    }

    // 지속 시간에 따른 가중치
    if (symptom.duration > 48) {
      urgencyScore += 10
      recommendations.push(`${symptom.name}이(가) 48시간 이상 지속되고 있습니다.`)
    }
  })

  // 가능한 원인 추정 (간단한 규칙 기반)
  if (symptoms.some(s => s.name.includes('두통'))) {
    possibleCauses.push('긴장성 두통', '편두통', '감기/독감')
  }
  if (symptoms.some(s => s.name.includes('복통'))) {
    possibleCauses.push('소화불량', '식중독', '위염', '장염')
  }
  if (symptoms.some(s => s.name.includes('발열'))) {
    possibleCauses.push('감기', '독감', '세균 감염')
  }
  if (symptoms.some(s => s.name.includes('기침'))) {
    possibleCauses.push('감기', '기관지염', '알레르기')
  }
  if (symptoms.some(s => s.name.includes('화상'))) {
    possibleCauses.push('열 화상', '화학 화상', '전기 화상', '일광 화상')
    // 화상은 심각도에 따라 응급 상황일 수 있음
    const burnSymptom = symptoms.find(s => s.name.includes('화상'))
    if (burnSymptom) {
      if (burnSymptom.severity >= 7) {
        recommendations.unshift('🚨 심한 화상은 즉시 응급실을 방문하세요!')
      } else {
        recommendations.push('화상 부위를 차갑고 깨끗한 물로 10-20분간 식히세요.')
        recommendations.push('화상 부위를 깨끗한 거즈로 덮고 감염을 예방하세요.')
      }
    }
  }
  if (symptoms.some(s => s.name.includes('염좌'))) {
    possibleCauses.push('인대 손상', '염좌', '발목 염좌')
    const sprainSymptom = symptoms.find(s => s.name.includes('염좌'))
    if (sprainSymptom) {
      recommendations.push('RICE 요법 적용: 휴식(Rest), 얼음(Ice), 압박(Compression), 거상(Elevation)')
      recommendations.push('발목을 움직이지 말고 부목이나 붕대로 고정하세요.')
      if (sprainSymptom.severity >= 7) {
        recommendations.unshift('심한 발목 손상은 정형외과 방문이 필요할 수 있습니다.')
      }
    }
  }
  if (symptoms.some(s => s.name.includes('골절 의심'))) {
    possibleCauses.push('골절', '골절 의심', '뼈 손상')
    const fractureSymptom = symptoms.find(s => s.name.includes('골절 의심'))
    if (fractureSymptom) {
      recommendations.unshift('🚨 골절이 의심됩니다. 즉시 정형외과나 응급실을 방문하세요!')
      recommendations.push('해당 부위를 움직이지 말고 부목으로 고정하세요.')
      recommendations.push('부종이 있으면 얼음찜질을 하되, 직접 피부에 대지 마세요.')
    }
  }

  // 긴급도 판단
  let urgency: SymptomCheckResult['urgency']
  let shouldVisitHospital = false
  let hospitalType: 'emergency' | 'general' | 'clinic' | undefined

  if (urgencyScore >= 50) {
    urgency = 'emergency'
    shouldVisitHospital = true
    hospitalType = 'emergency'
    recommendations.unshift('🚨 응급실을 즉시 방문하세요!')
  } else if (urgencyScore >= 30) {
    urgency = 'high'
    shouldVisitHospital = true
    hospitalType = 'general'
    recommendations.unshift('병원 방문을 권장합니다.')
  } else if (urgencyScore >= 15) {
    urgency = 'medium'
    shouldVisitHospital = urgencyScore >= 20
    hospitalType = shouldVisitHospital ? 'clinic' : undefined
    if (shouldVisitHospital) {
      recommendations.unshift('가까운 병원이나 클리닉 방문을 고려해보세요.')
    } else {
      recommendations.unshift('증상을 관찰하고 필요시 병원을 방문하세요.')
    }
  } else {
    urgency = 'low'
    shouldVisitHospital = false
    recommendations.unshift('자가 관리로 충분할 수 있습니다.')
  }

  // 일반적인 권장사항 추가
  if (!shouldVisitHospital) {
    recommendations.push('충분한 휴식과 수분 섭취를 권장합니다.')
    recommendations.push('증상이 악화되거나 2-3일 이상 지속되면 병원을 방문하세요.')
  }

  return {
    urgency,
    urgencyScore: Math.min(urgencyScore, 100),
    possibleCauses: possibleCauses.length > 0 ? possibleCauses : ['정확한 진단을 위해 병원 방문이 필요합니다.'],
    recommendations,
    shouldVisitHospital,
    hospitalType
  }
}
