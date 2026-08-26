import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';
import { DesignerProfile } from '../types';

interface FooterProps {
  isEng: boolean;
  designerProfile: DesignerProfile;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ designerProfile, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 pt-8 pb-12 border-t border-[#222] text-[#555] text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <p className="text-[10px] text-[#444] uppercase tracking-[0.3em] font-mono">
          PORTFOLIO &copy; 2026 · {designerProfile.name}
        </p>
        <button
          onClick={onOpenAdmin}
          className="text-[10px] text-amber-500/70 hover:text-amber-400 font-mono flex items-center gap-1 transition px-1.5 py-0.5 rounded bg-amber-950/20 border border-amber-900/30"
          title="관리자 콘솔"
        >
          <Lock className="w-2.5 h-2.5" />
          <span>ADMIN CMS</span>
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={scrollToTop}
          className="p-1.5 px-3 rounded bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] transition flex items-center gap-1.5 font-mono text-[11px]"
          title="Scroll to Top"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#6366f1]" />
          <span>TOP</span>
        </button>
      </div>
    </footer>
  );
};

