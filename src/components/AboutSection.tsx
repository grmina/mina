import React from 'react';
import { DesignerProfile } from '../types';
import { X, Briefcase, Award, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutSectionProps {
  isOpen: boolean;
  onClose: () => void;
  isEng: boolean;
  designerProfile: DesignerProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  isOpen,
  onClose,
  isEng,
  designerProfile
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0a0a0c] text-white rounded-xl border border-[#222] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#222] mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/25">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {isEng ? 'Designer Profile & Career' : '디자이너 소개 & 경력 사항'}
                </h3>
                <p className="text-xs text-[#888] font-mono mt-0.5">
                  {designerProfile.name} · {designerProfile.role} ({designerProfile.experienceYears}+ Years)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Philosophy / Bio */}
          <div className="mb-6 p-4 rounded-lg bg-[#111] border border-[#222]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6366f1] mb-2 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              {isEng ? 'Game UI/UX Philosophy' : '게임 UI/UX 디자인 철학'}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {designerProfile.bio}
            </p>
          </div>

          {/* Skills Breakdown */}
          <div className="mb-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              {isEng ? 'Core Competencies & Toolsets' : '보유 역량 & 전문 툴'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(designerProfile.skills || []).map((group, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#111] border border-[#222] space-y-2.5">
                  <h5 className="text-xs font-bold text-[#6366f1] pb-1 border-b border-[#222] font-mono">
                    {group.category}
                  </h5>
                  <div className="space-y-2">
                    {(group.items || []).map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className={`${skill.highlight ? 'text-zinc-200 font-medium' : 'text-[#888]'}`}>
                            {skill.name}
                          </span>
                          <span className="font-mono text-[#555]">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#0d0d0f] rounded overflow-hidden border border-[#222]">
                          <div
                            className={`h-full ${
                              skill.highlight ? 'bg-[#6366f1]' : 'bg-[#444]'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              {isEng ? 'Work Experience' : '주요 경력 사항'}
            </h4>

            <div className="space-y-3">
              {(designerProfile.workExperience || []).map((exp, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{exp.company}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#18181b] text-[#6366f1] border border-[#222] font-mono">
                        {exp.role}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#666]">{exp.period}</span>
                  </div>

                  <p className="text-xs text-[#888]">{exp.description}</p>

                  <div className="space-y-1 pt-1">
                    {(exp.highlights || []).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#222] flex items-center justify-between gap-3">
            <span className="text-xs text-[#666] font-mono">
              {designerProfile.location}
            </span>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded bg-[#111] hover:bg-[#1a1a1a] text-zinc-300 hover:text-white border border-[#222] font-semibold text-xs transition font-mono"
            >
              {isEng ? 'Close' : '닫기'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

