import { JangjiSection } from '@/components/public/JangjiSection';

// Mock 데이터 타입 정의
export type Cemetery = {
  id: number;
  region: 'Bắc' | 'Trung' | 'Nam';
  name: string;
  type: string; // 납골당, 공원묘지, 수목원, 사찰, 기타
  address: string;
  mainImage: string;
  images: string[];
  pros: string;
  cons: string;
};

// Mock 데이터
const cemeteries: Cemetery[] = [
  // 북부 (Bắc) - 6개 샘플
  {
    id: 1,
    region: 'Bắc',
    name: 'Nghĩa trang Văn Điển',
    type: '공원묘지',
    address: 'Hà Nội',
    mainImage: '/images/cemetery-1.jpg',
    images: ['/images/cemetery-1-1.jpg', '/images/cemetery-1-2.jpg', '/images/cemetery-1-3.jpg'],
    pros: '접근성 좋음, 관리 잘됨',
    cons: '가격이 다소 높음',
  },
  {
    id: 2,
    region: 'Bắc',
    name: 'Nghĩa trang Mai Dịch',
    type: '납골당',
    address: 'Hà Nội',
    mainImage: '/images/cemetery-2.jpg',
    images: ['/images/cemetery-2-1.jpg', '/images/cemetery-2-2.jpg'],
    pros: '현대적 시설',
    cons: '공간 제한적',
  },
  {
    id: 3,
    region: 'Bắc',
    name: 'Nghĩa trang Yên Kỳ',
    type: '수목원',
    address: 'Hà Nội',
    mainImage: '/images/cemetery-3.jpg',
    images: ['/images/cemetery-3-1.jpg', '/images/cemetery-3-2.jpg', '/images/cemetery-3-3.jpg', '/images/cemetery-3-4.jpg'],
    pros: '자연 친화적',
    cons: '교통 불편',
  },
  {
    id: 4,
    region: 'Bắc',
    name: 'Nghĩa trang Hạ Đình',
    type: '공원묘지',
    address: 'Hà Nội',
    mainImage: '/images/cemetery-4.jpg',
    images: ['/images/cemetery-4-1.jpg', '/images/cemetery-4-2.jpg', '/images/cemetery-4-3.jpg'],
    pros: '넓은 부지',
    cons: '도심에서 멀음',
  },
  {
    id: 5,
    region: 'Bắc',
    name: 'Nghĩa trang Thanh Trì',
    type: '사찰',
    address: 'Hà Nội',
    mainImage: '/images/cemetery-5.jpg',
    images: ['/images/cemetery-5-1.jpg', '/images/cemetery-5-2.jpg'],
    pros: '종교적 분위기',
    cons: '시설 구식',
  },
  {
    id: 6,
    region: 'Bắc',
    name: 'Nghĩa trang Đông Anh',
    type: '기타',
    address: 'Hà Nội',
    mainImage: '/images/cemetery-6.jpg',
    images: ['/images/cemetery-6-1.jpg', '/images/cemetery-6-2.jpg', '/images/cemetery-6-3.jpg'],
    pros: '저렴한 가격',
    cons: '접근성 낮음',
  },
  // 중부 (Trung) - 6개 샘플
  {
    id: 7,
    region: 'Trung',
    name: 'Nghĩa trang Đà Nẵng',
    type: '공원묘지',
    address: 'Đà Nẵng',
    mainImage: '/images/cemetery-7.jpg',
    images: ['/images/cemetery-7-1.jpg', '/images/cemetery-7-2.jpg', '/images/cemetery-7-3.jpg'],
    pros: '해안가 근접',
    cons: '습도 높음',
  },
  {
    id: 8,
    region: 'Trung',
    name: 'Nghĩa trang Huế',
    type: '납골당',
    address: 'Huế',
    mainImage: '/images/cemetery-8.jpg',
    images: ['/images/cemetery-8-1.jpg', '/images/cemetery-8-2.jpg'],
    pros: '역사적 가치',
    cons: '공간 협소',
  },
  {
    id: 9,
    region: 'Trung',
    name: 'Nghĩa trang Quy Nhơn',
    type: '수목원',
    address: 'Quy Nhơn',
    mainImage: '/images/cemetery-9.jpg',
    images: ['/images/cemetery-9-1.jpg', '/images/cemetery-9-2.jpg', '/images/cemetery-9-3.jpg'],
    pros: '자연 경관 우수',
    cons: '교통 불편',
  },
  {
    id: 10,
    region: 'Trung',
    name: 'Nghĩa trang Nha Trang',
    type: '공원묘지',
    address: 'Nha Trang',
    mainImage: '/images/cemetery-10.jpg',
    images: ['/images/cemetery-10-1.jpg', '/images/cemetery-10-2.jpg'],
    pros: '관광지 근접',
    cons: '가격 높음',
  },
  {
    id: 11,
    region: 'Trung',
    name: 'Nghĩa trang Quảng Ngãi',
    type: '사찰',
    address: 'Quảng Ngãi',
    mainImage: '/images/cemetery-11.jpg',
    images: ['/images/cemetery-11-1.jpg', '/images/cemetery-11-2.jpg', '/images/cemetery-11-3.jpg'],
    pros: '평화로운 분위기',
    cons: '시설 개선 필요',
  },
  {
    id: 12,
    region: 'Trung',
    name: 'Nghĩa trang Phan Thiết',
    type: '기타',
    address: 'Phan Thiết',
    mainImage: '/images/cemetery-12.jpg',
    images: ['/images/cemetery-12-1.jpg', '/images/cemetery-12-2.jpg'],
    pros: '저렴한 가격',
    cons: '접근성 낮음',
  },
  // 남부 (Nam) - 6개 샘플
  {
    id: 13,
    region: 'Nam',
    name: 'Nghĩa trang Bình Dương',
    type: '공원묘지',
    address: 'Bình Dương',
    mainImage: '/images/cemetery-13.jpg',
    images: ['/images/cemetery-13-1.jpg', '/images/cemetery-13-2.jpg', '/images/cemetery-13-3.jpg'],
    pros: '넓은 부지, 관리 우수',
    cons: '도심에서 다소 멀음',
  },
  {
    id: 14,
    region: 'Nam',
    name: 'Nghĩa trang TP.HCM',
    type: '납골당',
    address: 'TP.HCM',
    mainImage: '/images/cemetery-14.jpg',
    images: ['/images/cemetery-14-1.jpg', '/images/cemetery-14-2.jpg'],
    pros: '도심 접근성 우수',
    cons: '공간 제한적',
  },
  {
    id: 15,
    region: 'Nam',
    name: 'Nghĩa trang Cần Thơ',
    type: '수목원',
    address: 'Cần Thơ',
    mainImage: '/images/cemetery-15.jpg',
    images: ['/images/cemetery-15-1.jpg', '/images/cemetery-15-2.jpg', '/images/cemetery-15-3.jpg', '/images/cemetery-15-4.jpg'],
    pros: '자연 친화적 환경',
    cons: '교통 불편',
  },
  {
    id: 16,
    region: 'Nam',
    name: 'Nghĩa trang Đồng Nai',
    type: '공원묘지',
    address: 'Đồng Nai',
    mainImage: '/images/cemetery-16.jpg',
    images: ['/images/cemetery-16-1.jpg', '/images/cemetery-16-2.jpg'],
    pros: '저렴한 가격',
    cons: '시설 개선 필요',
  },
  {
    id: 17,
    region: 'Nam',
    name: 'Nghĩa trang Vũng Tàu',
    type: '사찰',
    address: 'Vũng Tàu',
    mainImage: '/images/cemetery-17.jpg',
    images: ['/images/cemetery-17-1.jpg', '/images/cemetery-17-2.jpg', '/images/cemetery-17-3.jpg'],
    pros: '해안가 근접, 종교적 분위기',
    cons: '습도 높음',
  },
  {
    id: 18,
    region: 'Nam',
    name: 'Nghĩa trang Long An',
    type: '기타',
    address: 'Long An',
    mainImage: '/images/cemetery-18.jpg',
    images: ['/images/cemetery-18-1.jpg', '/images/cemetery-18-2.jpg'],
    pros: '넓은 부지',
    cons: '접근성 낮음',
  },
];

export default function JangjiPage() {
  return <JangjiSection cemeteries={cemeteries} />;
}

