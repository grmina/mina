import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-1',
    number: 1,
    title: 'Project 1: Chronicle Saga',
    titleKo: '프로젝트 1: 크로니클 사가',
    subtitle: 'Mobile RPG UI Renewal & Design System',
    subtitleKo: '모바일 RPG UI 리뉴얼 & 디자인 시스템 구축',
    category: 'mobile-rpg',
    categoryName: '모바일 RPG UI 리뉴얼',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop',
    summary: '출시 3년 차 모바일 수집형 RPG의 노후화된 UI/UX 전면 개편. 정보 계층 구조를 단순화하고 모바일 한 손 조작성을 대폭 개선한 프로젝트입니다.',
    intent: '수많은 시스템이 추가되며 누적된 뎁스(Depth) 문제를 해소하고, 골드/보석 재화 흐름과 영웅 장비 육성 동선을 3터치 이내로 단축하여 사용자 피로도를 낮추는 것을 최우선 목표로 하였습니다.',
    problemSolution: {
      problem: '기존 장비 강화 시 5단계 이상의 화면 전환이 필요하여 유저 이탈률이 높았으며, 폰트 가독성과 아이콘 일관성이 부족했습니다.',
      solution: '슬라이드 인(Slide-in) 퀵 드로어와 탭 일원화를 적용해 장비 비교 및 원클릭 일괄 강화를 구현, UX 동선을 60% 단축하고 D1 잔존율 개선에 기여했습니다.'
    },
    specs: {
      contribution: 'UI 디자인 100%, UX 플로우 90%, Unity UGUI 프리팹 연동 70%',
      duration: '3.5개월 (2024.03 - 2024.06)',
      tools: ['Photoshop', 'Illustrator', 'Unity UGUI'],
      platform: 'iOS / Android Mobile',
      genre: '수집형 판타지 RPG',
      role: 'Lead UI/UX Designer'
    },
    tags: ['Mobile RPG', 'UI Redesign', 'Design System', 'Unity UGUI', 'Photoshop'],
    colors: [
      { name: 'Primary Gold', hex: '#E5B869', usage: '핵심 CTA 버튼, 최고등급 테두리, 재화 강조' },
      { name: 'Deep Midnight', hex: '#141724', usage: '메인 팝업 및 인벤토리 배경 베이스' },
      { name: 'Arcane Purple', hex: '#7C3AED', usage: '신화/전설급 아이템 등급 강조' },
      { name: 'Alert Crimson', hex: '#EF4444', usage: '체력 게이지, 전투 위험 알림' }
    ],
    interactiveType: 'equipment',
    screens: [
      {
        title: '영웅 장비 인벤토리 및 스탯 비교 모달',
        description: '장착 전후 스탯 변화량(전투력 +1,240)을 직관적인 컬러 하이라이트로 표기하여 장비 선택 피로도 감소',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '전투 스테이지 진입 및 덱 편성 UI',
        description: '속성 상성 가이드와 리더 스킬 시너지를 한눈에 확인할 수 있는 드래그 앤 드롭 덱 편성 뷰',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '신화 등급 장비 초월 연출 화면',
        description: '강화 성공 시의 화려한 파티클 FX와 어우러지는 다이나믹 리워드 팝업 레이아웃',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'project-2',
    number: 2,
    title: 'Project 2: Astellia Odyssey',
    titleKo: '프로젝트 2: 아스텔리아 오디세이',
    subtitle: 'PC MMORPG HUD & System Windows',
    subtitleKo: 'PC MMORPG HUD 및 시스템 창 디자인',
    category: 'pc-mmorpg',
    categoryName: 'PC MMORPG HUD 및 시스템 창',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
    summary: '4K/QHD 고해상도 모니터 환경에 최적화된 하이엔드 PC MMORPG HUD 및 시스템 인터페이스. 클래식 판타지 감성과 모던 미니멀리즘의 조화.',
    intent: '레이드 및 대규모 공성전 중 화면 시야를 가리지 않으면서도 필수 스킬 쿨타임, 파티원 버프/디버프, 타겟 체력바를 정확히 식별할 수 있는 컴팩트 HUD 프레임워크를 개발했습니다.',
    problemSolution: {
      problem: '기존 PC MMORPG의 고질적인 UI 오버헤드(화면 40% 이상 가림)와 복잡한 단축키 설정으로 신규 유저 진입 장벽이 심화됨.',
      solution: '모듈형 위젯 시스템(UI Edit Mode)을 구축하여 플레이어가 각 HUD 요소를 드래그하여 배치 및 크기 조절할 수 있도록 설계했습니다.'
    },
    specs: {
      contribution: 'HUD 시스템 기획 80%, UI 그래픽 에셋 100%, 텍스처 아틀라스 최적화',
      duration: '4개월 (2024.07 - 2024.11)',
      tools: ['Photoshop', 'Illustrator', 'Unity UGUI', 'Unreal Engine 5 UMG'],
      platform: 'PC (Steam / Windows)',
      genre: '대규모 오픈월드 MMORPG',
      role: 'Senior Game UI Designer'
    },
    tags: ['PC MMORPG', 'HUD Design', 'Widget System', '4K Support', 'Texture Atlas'],
    colors: [
      { name: 'Bronze Filigree', hex: '#C59B27', usage: '금속 장식 테두리, 룬 문양 프레임' },
      { name: 'Dark Slate BG', hex: '#161922', usage: '투명도 85% HUD 배경 플레이트' },
      { name: 'Mana Azure', hex: '#0EA5E9', usage: 'MP 게이지, 쿨타임 스피너, 마법 버프' },
      { name: 'Raid Orange', hex: '#F97316', usage: '보스 광폭화 타이머, 타겟 어그로 경고' }
    ],
    interactiveType: 'hud',
    screens: [
      {
        title: '메인 인게임 HUD (전투 모드)',
        description: '스킬 퀵슬롯 24개 배치, 콤보 연계기 팝업, 레이드 보스 게이지바 최적화 레이아웃',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '길드 공성전 전술 맵 & 파티 프레임',
        description: '20인 공격대 체력 실시간 모니터링 및 상태이상(CC기) 시인성을 극대화한 컴팩트 그리드',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '캐릭터 스킬 트리 & 각성 룬 시스템',
        description: '선형적 노드 연결 구조로 스킬 빌드 커스터마이징의 재미를 시각화한 대형 인터페이스',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'project-3',
    number: 3,
    title: 'Project 3: Dungeon Survivors',
    titleKo: '프로젝트 3: 던전 서바이버즈',
    subtitle: 'Casual Rogue-lite Survival Game GUI',
    subtitleKo: '캐주얼 서바이벌 게임 GUI 및 레벨업 선택창',
    category: 'casual-gui',
    categoryName: '캐주얼 서바이벌 게임 GUI',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop',
    summary: '빠른 템포의 캐주얼 로그라이트 서바이벌 게임 GUI. 귀엽고 볼드한 벡터 그래픽 스타일과 손맛이 느껴지는 팝업 애니메이션 설계.',
    intent: '1초 단위로 몰려드는 몬스터 속에서 레벨업 카드 선택 시 직관적인 시인성을 제공하고, 기분 좋은 햅틱/사운드 피드백과 결합되는 통통 튀는 모션감을 구현했습니다.',
    problemSolution: {
      problem: '작은 모바일 화면에서 아이콘과 텍스트 정보가 과밀하여 3지선다 스킬 선택 시 유저가 텍스트를 읽다 템포가 끊김.',
      solution: '스킬 유형별(공격/유틸/패시브) 직관적인 컬러 코딩과 대형 3D풍 벡터 엠블럼을 적용해 0.5초 안에 판단 가능하도록 리디자인.'
    },
    specs: {
      contribution: 'GUI 전체 비주얼 100%, 스프라이트 애니메이션 90%, 사운드 FX 연출 큐',
      duration: '2.5개월 (2024.01 - 2024.03)',
      tools: ['Photoshop', 'Illustrator', 'Unity UGUI'],
      platform: 'Mobile (iOS / Android), Nintendo Switch',
      genre: '캐주얼 로그라이트 서바이벌',
      role: 'Sole GUI & Motion Designer'
    },
    tags: ['Casual GUI', 'Rogue-lite', 'Juicy UI', 'Card Selection', 'Vector Graphic'],
    colors: [
      { name: 'Juicy Yellow', hex: '#FACC15', usage: '레벨업 카드 테두리, 경험치 젬 하이라이트' },
      { name: 'Vibrant Emerald', hex: '#10B981', usage: 'HP 회복 아이템 및 패시브 버프 카드' },
      { name: 'Candy Purple', hex: '#A855F7', usage: '마법 스킬 및 희귀 무기 배경' },
      { name: 'Chunky Brown', hex: '#3B2D26', usage: '카툰풍 2중 아웃라인 및 버튼 베이스' }
    ],
    interactiveType: 'upgrade',
    screens: [
      {
        title: '레벨업 3단 스킬 선택 카드 모달',
        description: '스킬 진화 트리 미리보기와 DPS 상승 수치가 실시간 반영되는 팝업 UI',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '인게임 서바이벌 HUD & 처치 카운터',
        description: '타이머, 킬 카운트, 보유 스킬 6종 인디케이터가 상단에 정리된 깔끔한 전투 HUD',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '보물상자 룰렛 & 결과 정산 화면',
        description: '5단 럭키 룰렛 오픈 연출과 골드 획득 카운팅 애니메이션이 적용된 리워드 화면',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'project-4',
    number: 4,
    title: 'Project 4: Neo Vanguard 2088',
    titleKo: '프로젝트 4: 네오 뱅가드 2088',
    subtitle: 'Sci-Fi FPS Crosshair Lab & Hologram Lobby',
    subtitleKo: 'SF FPS 크로스헤어 & 홀로그램 로비 UI 콘셉트',
    category: 'scifi-fps',
    categoryName: 'SF FPS Crosshair & 로비 UI',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1400&auto=format&fit=crop',
    summary: '사이버펑크 및 근미래 SF 밀리터리 세계관 기반의 FPS 전술 HUD. 동적 조준점(Dynamic Crosshair) 시스템과 3D 디제틱(Diegetic) 로비 UI.',
    intent: '전술적 긴장감과 조준 정확도를 극대화하는 미니멀 홀로그래픽 그리드를 설계하고, 반동 및 이동 상태에 따라 실시간 팽창/수축하는 다이나믹 조준선 피드백을 구축했습니다.',
    problemSolution: {
      problem: '화려한 SF 배경 그래픽에서 밝은 배경(네온 불빛 등)을 마주했을 때 HUD 조준점이 묻혀 시인성을 잃는 현상.',
      solution: '어댑티브 콘트라스트(Adaptive Invert & Black Rim) 셰이더와 4단계 커스텀 레티클 컬러 프리셋을 도입해 어떠한 광원에서도 100% 조준선 식별력 확보.'
    },
    specs: {
      contribution: 'SF HUD 콘셉트 아트 100%, 크로스헤어 인터랙션 100%, 3D 건스미스 UI 80%',
      duration: '3개월 (2024.08 - 2024.10)',
      tools: ['Photoshop', 'Illustrator', 'Cinema 4D'],
      platform: 'PC / Console (PlayStation 5, Xbox)',
      genre: '택티컬 사이버펑크 FPS',
      role: 'Lead UI/UX Concept Designer'
    },
    tags: ['Sci-Fi FPS', 'Hologram UI', 'Dynamic Crosshair', 'Gunsmith', 'Diegetic UI'],
    colors: [
      { name: 'Cyber Cyan', hex: '#06B6D4', usage: '기본 탄약 잔여량, 레이더 스캐너, 아군 태그' },
      { name: 'Neon Amber', hex: '#F59E0B', usage: '열상 스코프, 헤드샷 히트마커, 수류탄 경고' },
      { name: 'Matrix Black', hex: '#0B0F19', usage: '반투명 매트릭스 헥사곤 글래스 패널' },
      { name: 'Target Crimson', hex: '#F43F5E', usage: '적군 락온, 치명타 데미지 인디케이터' }
    ],
    interactiveType: 'crosshair',
    screens: [
      {
        title: '택티컬 전투 HUD & 홀로그램 탄창 카운터',
        description: '시선 중앙 집중형 원형 탄창 게이지와 360도 미니멀 위협 감지 레이더',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '3D 무기 개조 (Gunsmith) 인터페이스',
        description: '총기 파츠(총열/조준경/개머리판) 부착에 따른 반동 제어 그래프 실시간 비교 뷰',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '오퍼레이터 로비 및 매치메이킹 대기실',
        description: '유리 질감 블러와 타이포그래피 격자 레이아웃이 돋보이는 메인 메뉴 시스템',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'project-5',
    number: 5,
    title: 'Project 5: Stardust Memoria',
    titleKo: '프로젝트 5: 스타더스트 메모리아',
    subtitle: 'Anime Subculture Gacha & Shop UI',
    subtitleKo: '서브컬처 수집형 RPG 상점 및 소환 UI',
    category: 'subculture',
    categoryName: '서브컬처 수집형 RPG 상점 UI',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1400&auto=format&fit=crop',
    summary: '서브컬처 팬덤을 타겟으로 한 감각적이고 세련된 플랫 글래스모피즘 가챠 & 상점 인터페이스. 캐릭터 일러스트의 매력을 극대화하는 레이아웃.',
    intent: '캐릭터 일러스트의 실루엣과 모션 연출을 가리지 않는 미니멀 엣지 프레임을 설계하고, 패키지 상품 구매 및 가챠 연출에서 결제 전환율(ARPU)을 높이는 직관적 UI를 구현했습니다.',
    problemSolution: {
      problem: '상점 내 수많은 패키지와 재화 탭 간 이동 시 로딩 지연 및 복잡한 구성으로 프로모션 상품 도달률 저하.',
      solution: '좌측 버티컬 플로팅 탭 네비게이션과 배너 인터랙션, 추천 상품 스마트 하이라이트 배지를 적용해 상점 매출 지표 22% 상승.'
    },
    specs: {
      contribution: '상점/가챠 UI 기획 및 비주얼 100%, 배너 디자인 100%, 폰트 페어링',
      duration: '3개월 (2024.04 - 2024.07)',
      tools: ['Photoshop', 'Illustrator', 'Clip Studio', 'Unity'],
      platform: 'Mobile (iOS / Android), PC Client',
      genre: '서브컬처 어반 판타지 RPG',
      role: 'Main UI/UX Designer'
    },
    tags: ['Subculture', 'Gacha UI', 'Shop Layout', 'Glassmorphism', 'UI Kit'],
    colors: [
      { name: 'Cosmic Magenta', hex: '#EC4899', usage: '한정 픽업 소환 버튼, SSR 캐릭터 뱃지' },
      { name: 'Stardust Indigo', hex: '#6366F1', usage: '메인 테마 프레임, 서브 내비게이션' },
      { name: 'Crystal Frost', hex: '#E0E7FF', usage: '폰트 하이라이트 및 크리스탈 재화 테두리' },
      { name: 'Void Velvet', hex: '#18181B', usage: '상점 상품 진열대 배경 플레이트' }
    ],
    interactiveType: 'gacha',
    screens: [
      {
        title: '한정 캐릭터 픽업 가챠 (소환) 메인 뷰',
        description: '천장 카운터(80회 확정) 게이지와 1회/10회 연속 소환 원클릭 버튼 레이아웃',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '월간 패키지 및 마일리지 교환소 상점',
        description: '남은 구매 가능 횟수, 할인율 태그, 구성품 툴팁 팝업이 유기적으로 연결된 그리드',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '10연속 소환 SSR 획득 연출 결과 화면',
        description: '카드 뒤집기 애니메이션과 중복 획득 시 조각 변환 시스템을 명확히 안내하는 피날레 뷰',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'project-6',
    number: 6,
    title: 'Project 6: Relic of Shadows',
    titleKo: '프로젝트 6: 렐릭 오브 섀도우',
    subtitle: 'Dark Fantasy UI Icon & Graphic Asset Kit',
    subtitleKo: '다크 판타지 UI 아이콘 세트 & 에셋 키트',
    category: 'icon-kit',
    categoryName: '다크 판타지 UI 아이콘 세트',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1400&auto=format&fit=crop',
    summary: '다크 판타지 및 소울라이크 장르를 위한 120여 종의 핸드 페인팅 UI 아이콘 & 인터페이스 프레임 에셋 키트. 질감 표현의 극한.',
    intent: '오래된 양피지, 부식된 황동, 마법 크리스탈, 피 묻은 검 등 중세 다크 판타지의 거친 질감을 2D 디지털 페인팅으로 세밀히 묘사하여 게임 내 몰입감을 고조시켰습니다.',
    problemSolution: {
      problem: '고해상도 디테일 아이콘이 모바일 64x64px 등 작은 해상도로 축소 시 뭉개져 실루엣 구분이 어려워지는 문제.',
      solution: '핵심 실루엣의 명도 대비를 강조하고 외곽선 베벨 셰이딩을 단계별로 최적화하여 초소형 섬네일에서도 한눈에 식별되도록 제작.'
    },
    specs: {
      contribution: '아이콘 120종 원화/렌더링 100%, UI 프레임 슬라이스 및 아틀라스 패킹 100%',
      duration: '2개월 (2024.11 - 2024.12)',
      tools: ['Photoshop', 'Blender 3D (Base Blockout)', 'Illustrator', 'TexturePacker'],
      platform: 'Cross-Platform (PC, Console, Mobile)',
      genre: '다크 판타지 액션 / 소울라이크',
      role: 'UI Graphic & Asset Artist'
    },
    tags: ['Dark Fantasy', 'Icon Kit', 'Hand-Painted', 'Soulslike', 'Game Assets'],
    colors: [
      { name: 'Ancient Gold', hex: '#D4AF37', usage: '고대 유물 프레임, 전설 무기 광택' },
      { name: 'Blood Ruby', hex: '#991B1B', usage: '생명력 포션, 저주받은 마석 아이콘' },
      { name: 'Soul Cyan', hex: '#22D3EE', usage: '마나 엘릭서, 영혼 파편, 결계 룬' },
      { name: 'Obsidian Black', hex: '#18181B', usage: '배경 베이스 타일, 금속 프레임 섀도우' }
    ],
    interactiveType: 'icons',
    screens: [
      {
        title: '포션, 무기, 방어구, 마법 스크롤 아이콘 세트',
        description: '512x512px 원본 해상도로 제작되어 4K UI부터 모바일 아이콘까지 완벽 대응',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '장비 등급별(일반-고급-희귀-영웅-전설-신화) 프레임 키트',
        description: '9-Slice 스케일링이 가능한 모듈형 인벤토리 슬롯 및 팝업 보더 에셋',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: '스킬 버프/디버프 상태이상 인디케이터 40종',
        description: '출혈, 화상, 빙결, 침묵 등 직관적인 메타포로 설계된 전투 인디케이터',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  }
];
