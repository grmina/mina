import React from 'react';
import { Gamepad2, FileText, Lock } from 'lucide-react';
import { DesignerProfile } from '../types';

interface HeaderProps {
  onOpenAbout: () => void;
  onOpenAdmin: () => void;
  isEng: boolean;
  setIsEng: (val: boolean) => void;
  designerProfile: DesignerProfile;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAbout,
  onOpenAdmin,
  isEng,
  setIsEng,
  designerProfile
}) => {
  return (
    <header className="mb-10 pt-2 border-b border-[#222] pb-8" id="portfolio-header">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* Left: Designer Name & Identity */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/25 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {isEng ? 'Available for projects' : '프로젝트 수주 & 이직 오픈'}
            </span>
            <span className="text-[11px] text-[#555] font-mono uppercase tracking-widest">{designerProfile.location}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter leading-none text-white uppercase">
            {designerProfile.name || 'Grmina'}
          </h1>

          <p className="text-[#6366f1] text-xs sm:text-sm font-bold tracking-[0.2em] mt-3 uppercase flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-[#6366f1]" />
            {isEng ? 'Lead Game UI & UX Designer' : designerProfile.role}
          </p>

          <p className="text-xs sm:text-sm text-[#888] max-w-2xl mt-2 leading-relaxed font-['Arial',sans-serif]">
            {isEng
              ? 'Translating game worlds into intuitive visual languages and engineering high-retention player experiences for Mobile, PC, and Console.'
              : designerProfile.tagline}
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4 text-[11px] font-mono text-[#888]">
            <span className="px-2.5 py-1 rounded bg-[#111] border border-[#222] text-zinc-300">
              Photoshop
            </span>
            <span className="px-2.5 py-1 rounded bg-[#111] border border-[#222] text-zinc-300">
              Illustrator
            </span>
            <span className="px-2.5 py-1 rounded bg-[#111] border border-[#222] text-zinc-300">
              Unity UGUI
            </span>
            <span className="px-2.5 py-1 rounded bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#6366f1]">
              {designerProfile.experienceYears}+ Years Exp
            </span>
          </div>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsEng(!isEng)}
            className="px-3 py-2 rounded text-xs font-mono font-semibold bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] transition"
            id="lang-toggle-btn"
            title="Toggle Language"
          >
            {isEng ? 'KR 한국어' : 'EN English'}
          </button>
          <button
            onClick={onOpenAbout}
            className="px-3.5 py-2 rounded text-xs font-medium bg-[#111] hover:bg-[#1a1a1a] text-zinc-200 border border-[#222] hover:border-[#333] flex items-center gap-1.5 transition"
            id="header-about-btn"
          >
            <FileText className="w-3.5 h-3.5 text-[#6366f1]" />
            {isEng ? 'About' : '소개'}
          </button>
          <button
            onClick={onOpenAdmin}
            className="px-3.5 py-2 rounded text-xs font-medium bg-[#18181b] hover:bg-[#27272a] text-amber-400 hover:text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition shadow-sm"
            id="header-admin-btn"
            title="관리자 콘솔"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono font-bold">{isEng ? 'Admin' : '관리자'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

