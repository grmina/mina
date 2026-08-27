import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../types';
import { X, ChevronLeft, ChevronRight, Layers, Palette, Monitor, LayoutGrid, Rows3, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isEng: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  isEng
}) => {
  const [activeTab, setActiveTab] = useState<'screens' | 'system' | 'specs'>('screens');
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onPrev, onNext]);

  // Reset tab when project changes
  useEffect(() => {
    setActiveTab('screens');
  }, [project?.id]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        id="modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6"
      >
        <motion.div
          id="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-[920px] my-6 sm:my-10 bg-[#0a0a0c] text-white rounded-xl border border-[#222] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Project Stepper & Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#222] bg-[#0e0e11]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#6366f1]/10 text-[#6366f1] font-mono text-xs font-bold border border-[#6366f1]/25">
                CASE STUDY 0{project.number}
              </span>
              <span className="text-xs text-[#666] font-mono hidden sm:inline uppercase">
                {project.specs?.genre || ''} · {project.specs?.platform || ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Previous / Next Buttons */}
              <button
                onClick={onPrev}
                className="p-1.5 rounded bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] transition"
                title="Previous Project (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                className="p-1.5 rounded bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] transition"
                title="Next Project (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="close-btn ml-2 p-1.5 rounded bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] transition"
                title="Close Modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Top Project Thumbnail Hero Banner */}
          <div className="relative w-full aspect-[16/7] sm:aspect-[21/8] overflow-hidden bg-[#0d0d0f] border-b border-[#222]">
            <img
              id="modal-thumbnail-image"
              src={project.thumbnail}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/30" />
            <div className="absolute bottom-3 left-6 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-[11px] font-bold font-mono tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/10">
                0{project.number}
              </span>
              <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#6366f1]/90 text-white font-medium shadow-sm">
                {project.categoryName}
              </span>
            </div>
          </div>

          {/* Modal Header Body */}
          <div className="p-6 sm:p-8">
            <div className="mb-4">
              <div id="modal-category" className="category text-[#6366f1] text-[0.85rem] font-bold uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
                <span>{project.categoryName}</span>
                <span className="text-[#444]">•</span>
                <span className="text-[#888] font-normal text-xs">{project.specs?.role || ''}</span>
              </div>

              <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {isEng ? project.title : project.titleKo}
              </h2>

              <p className="text-[#888] text-sm sm:text-base leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Quick Specs Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-[#111] border border-[#222] mb-6 text-xs font-mono">
              <div>
                <span className="text-[#555] block mb-0.5 font-medium">{isEng ? 'CONTRIBUTION' : '기여도'}</span>
                <span className="font-semibold text-zinc-200">{project.specs?.contribution || '-'}</span>
              </div>
              <div>
                <span className="text-[#555] block mb-0.5 font-medium">{isEng ? 'DURATION' : '제작 기간'}</span>
                <span className="font-semibold text-zinc-200">{project.specs?.duration || '-'}</span>
              </div>
              <div>
                <span className="text-[#555] block mb-0.5 font-medium">{isEng ? 'PLATFORM' : '플랫폼'}</span>
                <span className="font-semibold text-zinc-200">{project.specs?.platform || '-'}</span>
              </div>
              <div>
                <span className="text-[#555] block mb-0.5 font-medium">{isEng ? 'TOOLS' : '사용 툴'}</span>
                <span className="font-semibold text-[#6366f1]">{(project.specs?.tools || []).join(', ') || '-'}</span>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="flex items-center gap-2 border-b border-[#222] pb-3 mb-6 overflow-x-auto scrollbar-none">
              {[
                { id: 'screens', label: isEng ? 'Screen Flow & Gallery' : '화면 구성 & 갤러리', icon: Monitor },
                { id: 'system', label: isEng ? 'Color & Design System' : '컬러 & 디자인 시스템', icon: Palette },
                { id: 'specs', label: isEng ? 'Tools & Specifications' : '상세 스펙 & 기여도', icon: Layers }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#6366f1]/15 text-[#6366f1] border border-[#6366f1]/50 font-semibold'
                        : 'bg-[#111] text-[#888] hover:text-zinc-200 hover:bg-[#18181b] border border-[#222]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Screens Gallery (Single Large vs Multi Grid View) */}
            {activeTab === 'screens' && (
              <div className="space-y-5">
                {/* Gallery Toolbar: View Mode Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#222] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#888] font-mono">
                      {isEng ? 'SCREEN GALLERY' : '화면 목록'}:
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30 font-bold">
                      {project.screens?.length || 1} {isEng ? 'Screens' : '개 화면'}
                    </span>
                  </div>

                  {/* Alignment / View Mode Buttons */}
                  <div className="flex items-center gap-1 bg-[#111] p-1 rounded-lg border border-[#222] self-start sm:self-auto">
                    <button
                      onClick={() => setViewMode('single')}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                        viewMode === 'single'
                          ? 'bg-[#6366f1] text-white shadow-sm font-semibold'
                          : 'text-[#888] hover:text-zinc-200 hover:bg-[#18181b]'
                      }`}
                      title="1열 크게 보기 (현재 모드)"
                    >
                      <Rows3 className="w-3.5 h-3.5" />
                      <span>{isEng ? 'Single View' : '1열 크게 보기'}</span>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                        viewMode === 'grid'
                          ? 'bg-[#6366f1] text-white shadow-sm font-semibold'
                          : 'text-[#888] hover:text-zinc-200 hover:bg-[#18181b]'
                      }`}
                      title="그리드 작게 여러 개 보기"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>{isEng ? 'Grid View' : '작게 여러 개 보기'}</span>
                    </button>
                  </div>
                </div>

                {/* (1) Single View Mode (Large full-width stacked view) */}
                {viewMode === 'single' && (
                  <div className="space-y-6">
                    {(!project.screens || project.screens.length === 0) ? (
                      <div className="relative w-full rounded-lg overflow-hidden bg-[#0d0d0f] border border-[#222]">
                        <img
                          src={project.thumbnail}
                          alt={project.titleKo}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block object-contain"
                        />
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[11px] text-zinc-200 font-mono shadow-sm">
                          MAIN SCREEN
                        </div>
                      </div>
                    ) : (
                      project.screens.map((screen, idx) => (
                        <div key={idx} className="relative w-full rounded-lg overflow-hidden bg-[#0d0d0f] border border-[#222]">
                          <img
                            src={screen.image}
                            alt={`Screen 0${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto block object-contain"
                          />
                          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[11px] text-zinc-200 font-mono shadow-sm">
                            SCREEN 0{idx + 1}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* (2) Grid View Mode (Multi-card compact grid) */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(!project.screens || project.screens.length === 0) ? (
                      <div
                        onClick={() => setLightboxImage({ src: project.thumbnail, title: 'MAIN SCREEN' })}
                        className="group relative rounded-lg overflow-hidden bg-[#0d0d0f] border border-[#222] hover:border-[#6366f1]/60 transition cursor-pointer flex flex-col"
                      >
                        <div className="w-full bg-black/40 overflow-hidden flex items-center justify-center">
                          <img
                            src={project.thumbnail}
                            alt={project.titleKo}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto max-h-64 object-contain group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="p-2.5 bg-[#111] border-t border-[#1f1f23] flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-zinc-300">
                            MAIN SCREEN
                          </span>
                          <span className="text-[10px] font-mono text-[#6366f1] flex items-center gap-1 group-hover:underline">
                            <ZoomIn className="w-3 h-3" />
                            {isEng ? 'Zoom' : '확대'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      project.screens.map((screen, idx) => (
                        <div
                          key={idx}
                          onClick={() => setLightboxImage({ src: screen.image, title: `SCREEN 0${idx + 1}` })}
                          className="group relative rounded-lg overflow-hidden bg-[#0d0d0f] border border-[#222] hover:border-[#6366f1]/60 transition cursor-pointer flex flex-col"
                        >
                          <div className="w-full bg-black/40 overflow-hidden flex items-center justify-center min-h-[140px]">
                            <img
                              src={screen.image}
                              alt={`Screen 0${idx + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-auto max-h-64 object-contain group-hover:scale-105 transition duration-300"
                            />
                          </div>
                          <div className="p-2.5 bg-[#111] border-t border-[#1f1f23] flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-zinc-300">
                              SCREEN 0{idx + 1}
                            </span>
                            <span className="text-[10px] font-mono text-[#6366f1] flex items-center gap-1 group-hover:underline">
                              <ZoomIn className="w-3 h-3" />
                              {isEng ? 'Zoom' : '확대보기'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Design System Colors */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <p className="text-xs text-[#888]">
                  {isEng
                    ? 'Key color palettes, contrast ratios, and visual hierarchy guidelines used across the project UI.'
                    : '게임 내 정보 가독성, 등급별 차별화 및 CTA 유도를 위해 정의된 핵심 UI 컬러 팔레트입니다.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(project.colors || []).map((color, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#111] border border-[#222] flex items-start gap-4"
                    >
                      <div
                        className="w-12 h-12 rounded border border-white/20 shadow-md shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-white">{color.name}</h5>
                          <span className="text-[11px] font-mono text-[#888] bg-[#18181b] border border-[#222] px-2 py-0.5 rounded">
                            {color.hex}
                          </span>
                        </div>
                        <p className="text-xs text-[#888] mt-1.5 leading-relaxed">
                          {color.usage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Typography Guidelines */}
                <div className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-3">
                  <h4 className="text-xs font-bold text-[#888] uppercase tracking-wider font-mono">
                    Typography & Layout Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded bg-[#0d0d0f] border border-[#222]">
                      <span className="text-[#555] block text-[10px] font-mono">Headings / Title</span>
                      <span className="font-bold text-white">Pretendard Bold (24-32px)</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#0d0d0f] border border-[#222]">
                      <span className="text-[#555] block text-[10px] font-mono">Body / Spec</span>
                      <span className="font-medium text-zinc-300">Pretendard SemiBold (14-16px)</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#0d0d0f] border border-[#222]">
                      <span className="text-[#555] block text-[10px] font-mono">Numbers / Damage</span>
                      <span className="font-mono font-bold text-amber-400">JetBrains Mono / Rajdhani</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Specs & Roles */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="p-5 rounded-lg bg-[#111] border border-[#222] space-y-4 text-xs sm:text-sm font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#222] gap-1">
                    <span className="text-[#666]">담당 역할 (Role)</span>
                    <span className="font-semibold text-white">{project.specs?.role || '-'}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#222] gap-1">
                    <span className="text-[#666]">작업 기여도 (Contribution)</span>
                    <span className="font-semibold text-[#6366f1]">{project.specs?.contribution || '-'}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#222] gap-1">
                    <span className="text-[#666]">제작 기간 (Duration)</span>
                    <span className="font-semibold text-white">{project.specs?.duration || '-'}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#222] gap-1">
                    <span className="text-[#666]">타겟 플랫폼 & 엔진</span>
                    <span className="font-semibold text-white">{project.specs?.platform || '-'}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[#666]">활용 소프트웨어 (Tools)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.specs?.tools || []).map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#18181b] text-[#6366f1] text-xs font-mono border border-[#222]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Bar */}
          <div className="px-6 py-4 bg-[#0a0a0c] border-t border-[#222] flex items-center justify-between text-xs text-[#666] font-mono">
            <span>
              {project.titleKo} ({project.number} / 6)
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-[#111] hover:bg-[#1a1a1a] text-zinc-300 hover:text-white border border-[#222] transition"
            >
              닫기 (Close)
            </button>
          </div>
        </motion.div>

        {/* Lightbox / Zoom Overlay */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[90vh] bg-[#0c0c0e] border border-[#333] rounded-xl overflow-hidden shadow-2xl flex flex-col"
              >
                <div className="px-4 py-3 bg-[#111] border-b border-[#222] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#6366f1]/20 text-[#818cf8] text-[10px]">
                      {lightboxImage.title}
                    </span>
                    <span>{project.titleKo}</span>
                  </span>
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="p-1 rounded bg-[#18181b] hover:bg-[#252528] text-zinc-300 hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center max-h-[calc(90vh-60px)]">
                  <img
                    src={lightboxImage.src}
                    alt={lightboxImage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[80vh] object-contain rounded"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
