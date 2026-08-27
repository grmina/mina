import { DesignerProfile } from '../types';

export const DESIGNER_PROFILE: DesignerProfile = {
  name: 'Grmina',
  role: 'Game UI / UX Designer',
  tagline: '게임의 세계관을 시각적 언어로 번역하고, 유저에게 몰입감 높은 플레이 경험을 설계합니다.',
  bio: '13년 차 게임 UI/UX 디자이너로서 모바일 수집형 RPG, PC MMORPG, 캐주얼 서바이벌 등 다양한 장르의 상용화 프로젝트를 경험했습니다. 단순한 그래픽 작업을 넘어 유저 행동 데이터를 기반으로 정보 구조(IA)를 설계하고, Unity UGUI 및 언리얼 UMG 파이프라인을 직접 연동하여 최적화된 인터페이스를 완성합니다.',
  email: 'grmina@nm-fc.com',
  location: 'Seoul, Republic of Korea',
  experienceYears: 13,
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  skills: [
    {
      category: 'UI/UX Design',
      items: [
        { name: 'Wireframing & IA Architecture', level: 95, highlight: true },
        { name: 'Game HUD & Diegetic Interface', level: 92, highlight: true },
        { name: 'Design System & Component Library', level: 90, highlight: true },
        { name: 'Motion Graphics & UI Feedback', level: 85 }
      ]
    },
    {
      category: 'Tools & Software',
      items: [
        { name: 'Adobe Photoshop', level: 95, highlight: true },
        { name: 'Adobe Illustrator', level: 90, highlight: true },
        { name: 'Clip Studio Paint', level: 80 }
      ]
    },
    {
      category: 'Game Engine & Implementation',
      items: [
        { name: 'Unity UGUI & Canvas Optimization', level: 88, highlight: true },
        { name: 'Atlas Packing & Draw Call Reduction', level: 85 },
        { name: 'Unreal Engine 5 (UMG)', level: 72 },
        { name: 'Git & Version Control', level: 80 }
      ]
    }
  ],
  workExperience: [
    {
      period: '2022.03 - 현재',
      company: 'NEXUS GAMES Studio',
      role: 'Senior Game UI/UX Designer',
      description: '글로벌 런칭 모바일 수집형 RPG 및 신작 PC 크로스플랫폼 MMORPG의 UI/UX 총괄 디자인 리드.',
      highlights: [
        '전투 HUD 리뉴얼로 레이드 중 화면 가림 영역 35% 감소',
        'UI 에셋 to Unity 연동 가이드라인 구축으로 아트-클라이언트 개발 속도 40% 단축',
        '글로벌 다국어(영어/일본어/중국어/독일어) 텍스트 오버플로우 대응 자동화 컴포넌트 설계'
      ]
    },
    {
      period: '2020.01 - 2022.02',
      company: 'PIXELCRAFT Entertainment',
      role: 'Game GUI Designer',
      description: '캐주얼 로그라이크 및 모바일 퍼즐 게임 3종의 인터페이스, 아이콘, 이펙트 모션 제작.',
      highlights: [
        '레벨업 스킬 선택 모달 및 가챠 연출 제작으로 상점 D30 재방문율 18% 상승',
        '200종 이상의 2D 장비/스킬 아이콘 세트 제작 및 스프라이트 아틀라스 경량화'
      ]
    }
  ]
};
