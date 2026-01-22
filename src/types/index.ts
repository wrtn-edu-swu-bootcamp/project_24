export interface Symptom {
  id: string
  name: string
  category: string
  severity: number // 1-10
  duration: number // hours
  notes?: string
}

export interface SymptomCheckResult {
  urgency: 'emergency' | 'high' | 'medium' | 'low'
  urgencyScore: number
  possibleCauses: string[]
  recommendations: string[]
  shouldVisitHospital: boolean
  hospitalType?: 'emergency' | 'general' | 'clinic'
}

export interface Hospital {
  id: string
  name: string
  type: 'emergency' | 'general' | 'clinic'
  address: string
  phone: string
  distance: number // km
  isAvailable: boolean
  waitTime?: number // minutes
  latitude: number
  longitude: number
}

export interface HealthRecord {
  id: string
  date: string
  symptoms: Symptom[]
  result: SymptomCheckResult
  notes?: string
}
