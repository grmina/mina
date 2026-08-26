import React from 'react';
import { ProjectCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  counts: Record<ProjectCategory, number>;
  isEng: boolean;
}

const CATEGORIES: { id: ProjectCategory; labelKo: string; labelEn: string }[] = [
  { id: 'all', labelKo: '전체 프로젝트', labelEn: 'All Projects' },
  { id: 'mobile-rpg', labelKo: '모바일 RPG', labelEn: 'Mobile RPG' },
  { id: 'pc-mmorpg', labelKo: 'PC MMORPG', labelEn: 'PC MMORPG' },
  { id: 'casual-gui', labelKo: '캐주얼 GUI', labelEn: 'Casual GUI' },
  { id: 'scifi-fps', labelKo: 'SF / FPS HUD', labelEn: 'Sci-Fi FPS' },
  { id: 'subculture', labelKo: '서브컬처 RPG', labelEn: 'Subculture Anime' },
  { id: 'icon-kit', labelKo: '아이콘 & 에셋', labelEn: 'Icon & Asset Kit' }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
  isEng
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none" id="category-filter-nav">
      <div className="flex items-center gap-1.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`filter-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#6366f1]/15 text-[#6366f1] border border-[#6366f1]/50 font-semibold'
                  : 'bg-[#111] text-[#888] hover:text-zinc-200 hover:bg-[#18181b] border border-[#222]'
              }`}
            >
              <span>{isEng ? cat.labelEn : cat.labelKo}</span>
              <span
                className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-[#6366f1]/25 text-[#6366f1]' : 'bg-[#1a1a1a] text-[#555]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-[11px] text-[#555] font-mono uppercase tracking-wider hidden sm:inline whitespace-nowrap">
        {isEng ? '6 Projects' : '6개 프로젝트'}
      </span>
    </div>
  );
};
