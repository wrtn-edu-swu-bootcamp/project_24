import { Hospital } from '../types'

// 샘플 병원 데이터 (실제로는 공공데이터포털 API를 사용해야 함)
export const sampleHospitals: Hospital[] = [
  {
    id: '1',
    name: '서울대학교병원 응급실',
    type: 'emergency',
    address: '서울특별시 종로구 대학로 101',
    phone: '02-2072-2114',
    distance: 2.5,
    isAvailable: true,
    waitTime: 15,
    latitude: 37.5665,
    longitude: 126.9780
  },
  {
    id: '2',
    name: '세브란스병원 응급실',
    type: 'emergency',
    address: '서울특별시 서대문구 연세로 50-1',
    phone: '02-2228-5800',
    distance: 3.2,
    isAvailable: true,
    waitTime: 25,
    latitude: 37.5625,
    longitude: 126.9370
  },
  {
    id: '3',
    name: '강남성심병원',
    type: 'general',
    address: '서울특별시 강남구 봉은사로 201',
    phone: '02-3429-0200',
    distance: 1.8,
    isAvailable: true,
    waitTime: 30,
    latitude: 37.4979,
    longitude: 127.0276
  },
  {
    id: '4',
    name: '삼성서울병원',
    type: 'general',
    address: '서울특별시 강남구 일원로 81',
    phone: '02-3410-2114',
    distance: 4.1,
    isAvailable: false,
    waitTime: 60,
    latitude: 37.4881,
    longitude: 127.0856
  },
  {
    id: '5',
    name: '강남구 보건소',
    type: 'clinic',
    address: '서울특별시 강남구 선릉로 668',
    phone: '02-3423-5555',
    distance: 0.8,
    isAvailable: true,
    waitTime: 10,
    latitude: 37.5172,
    longitude: 127.0473
  },
  {
    id: '6',
    name: '서울아산병원 응급실',
    type: 'emergency',
    address: '서울특별시 송파구 올림픽로43길 88',
    phone: '02-3010-3114',
    distance: 5.3,
    isAvailable: true,
    waitTime: 20,
    latitude: 37.5265,
    longitude: 127.1107
  }
]

// 사용자 위치 (실제로는 Geolocation API 사용)
export const userLocation = {
  latitude: 37.4979,
  longitude: 127.0276
}

export function getNearbyHospitals(
  type?: 'emergency' | 'general' | 'clinic',
  maxDistance: number = 10
): Hospital[] {
  let filtered = sampleHospitals.filter(h => h.distance <= maxDistance)
  
  if (type) {
    filtered = filtered.filter(h => h.type === type)
  }
  
  // 거리순 정렬
  return filtered.sort((a, b) => a.distance - b.distance)
}

export function getAvailableHospitals(
  type?: 'emergency' | 'general' | 'clinic'
): Hospital[] {
  let filtered = sampleHospitals.filter(h => h.isAvailable)
  
  if (type) {
    filtered = filtered.filter(h => h.type === type)
  }
  
  // 대기시간 순 정렬
  return filtered.sort((a, b) => (a.waitTime || 999) - (b.waitTime || 999))
}
