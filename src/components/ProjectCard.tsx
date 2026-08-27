import React from 'react';
import { ProjectItem } from '../types';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
  isEng: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  isEng
}) => {
  return (
    <motion.article
      id={`project-card-${project.number}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative flex flex-col bg-[#111] border border-[#222] hover:border-[#6366f1]/60 rounded-lg overflow-hidden cursor-pointer shadow-lg shadow-black/50 transition-all duration-200"
    >
      {/* Top 5:7 Image Wrapper with Exact Aspect Ratio Constraint */}
      <div className="relative w-full aspect-[5/7] overflow-hidden bg-[#0d0d0f] border-b border-[#222]">
        <img
          src={project.thumbnail}
          alt={project.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-top block transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 opacity-80 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Project Number & Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider bg-black/80 backdrop-blur-md text-white border border-[#333]">
            0{project.number}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#6366f1]/15 backdrop-blur-md text-[#6366f1] border border-[#6366f1]/30">
            {project.categoryName}
          </span>
        </div>

        {/* Quick View Tag (Appears on Hover) */}
        <div className="absolute bottom-3 right-3 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#6366f1] text-white flex items-center gap-1 shadow-lg font-mono">
            <Eye className="w-3.5 h-3.5" />
            {isEng ? 'VIEW' : '상세보기'}
          </span>
        </div>

        {/* Interactive Indicator */}
        {project.interactiveType && (
          <div className="absolute top-3 right-3 z-10">
            <span className="p-1 rounded bg-black/80 backdrop-blur-sm text-amber-400 border border-amber-500/30 flex items-center justify-center shadow" title="Interactive UI Demo Available">
              <Sparkles className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>

      {/* Project Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-[#111]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base sm:text-lg font-medium tracking-tight text-white group-hover:text-[#6366f1] transition-colors line-clamp-1">
              {isEng ? project.title : project.titleKo}
            </h2>
            <ArrowUpRight className="w-4 h-4 text-[#555] group-hover:text-[#6366f1] transition-colors shrink-0 mt-0.5" />
          </div>

          <div className="flex justify-between items-center mt-1.5">
            <p className="text-xs text-[#555] uppercase tracking-widest line-clamp-1">
              {isEng ? project.subtitle : project.subtitleKo}
            </p>
            <span className="text-[10px] bg-[#6366f1]/10 text-[#6366f1] px-2 py-0.5 rounded font-mono border border-[#6366f1]/20 shrink-0 ml-2">
              {project.specs?.duration || '2025'}
            </span>
          </div>
        </div>

        {/* Tags footer */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#1a1a1a]">
          {(project.tags || []).slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-1.5 py-0.5 rounded bg-[#18181b] text-[#777] font-mono border border-[#222]"
            >
              #{tag}
            </span>
          ))}
          {(project.tags?.length || 0) > 3 && (
            <span className="text-[10px] text-[#555] font-mono">
              +{(project.tags?.length || 0) - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};
