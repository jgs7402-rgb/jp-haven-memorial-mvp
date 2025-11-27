import type { Region } from '@/src/lib/cemeteries';

// 납골당/현대식 장지 느낌의 스톡 이미지 (Unsplash - 안정적 공개 URL)
export const jangjiImages: string[] = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
];

export function getJangjiImages(id: number): { main: string; extras: string[] } {
  const base = jangjiImages;
  const main = base[(id - 1) % base.length];
  const extras: string[] = [];

  for (let i = 1; i <= 3; i += 1) {
    const idx = (id - 1 + i) % base.length;
    extras.push(base[idx]);
  }

  return { main, extras };
}

const regionImageMap: Record<Region, string> = {
  Bắc: jangjiImages[0],
  Trung: jangjiImages[1],
  Nam: jangjiImages[2],
};

export function getRegionHeroImage(region: Region): string {
  return regionImageMap[region];
}
