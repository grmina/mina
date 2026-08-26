import React from 'react';
import { ProjectItem } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
  isEng: boolean;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onOpenProject,
  isEng
}) => {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center text-[#666] bg-[#111] rounded border border-[#222]">
        <p className="text-sm font-medium text-[#888]">선택된 카테고리의 프로젝트가 없습니다.</p>
        <p className="text-xs text-[#555] mt-1 font-mono">상단 필터에서 '전체 프로젝트'를 선택해 주세요.</p>
      </div>
    );
  }

  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 flex-grow"
      id="main-project-grid"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onOpenProject(project)}
          isEng={isEng}
        />
      ))}
    </main>
  );
};
