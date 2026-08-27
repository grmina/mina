import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { AboutSection } from './components/AboutSection';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { PROJECTS_DATA } from './data/projectsData';
import { DESIGNER_PROFILE } from './data/designerData';
import { ProjectCategory, ProjectItem, DesignerProfile } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isEng, setIsEng] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    return PROJECTS_DATA;
  });

  // Designer Profile State
  const [designerProfile, setDesignerProfile] = useState<DesignerProfile>(() => {
    return DESIGNER_PROFILE;
  });

  // Sync projects to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('nexus_portfolio_projects', JSON.stringify(projects));
    } catch (e) {
      // Ignore
    }
  }, [projects]);

  // Sync designerProfile to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('nexus_designer_profile', JSON.stringify(designerProfile));
    } catch (e) {
      // Ignore
    }
  }, [designerProfile]);

  // Keyboard shortcut listener ('F9' or 'Ctrl+Shift+A' for Admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'F9' || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, projects]);

  // Counts for categories
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      all: projects.length,
      'mobile-rpg': 0,
      'pc-mmorpg': 0,
      'casual-gui': 0,
      'scifi-fps': 0,
      subculture: 0,
      'icon-kit': 0
    };

    projects.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });

    return counts;
  }, [projects]);

  // Modal navigation (Prev / Next project)
  const handlePrevProject = () => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveProject(projects[prevIndex]);
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#6366f1] selection:text-white px-4 sm:px-8 lg:px-12 py-8 sm:py-12 transition-colors duration-300 text-sm">
      <div className="max-w-[1180px] mx-auto flex flex-col min-h-[calc(100vh-6rem)]">
        {/* 1. 상단 이름 및 정보 (Header) */}
        <Header
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isEng={isEng}
          setIsEng={setIsEng}
          designerProfile={designerProfile}
        />

        {/* Category Filter Navigation */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={categoryCounts}
          isEng={isEng}
        />

        {/* 2. 프로젝트 그리드 배치 (4x3 Aspect Ratio Project Grid) */}
        <ProjectGrid
          projects={filteredProjects}
          onOpenProject={(project) => setActiveProject(project)}
          isEng={isEng}
        />

        {/* Footer */}
        <Footer
          isEng={isEng}
          designerProfile={designerProfile}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 3. 클릭 시 열리는 상세 모달 (Case Study Modal) */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          isEng={isEng}
        />

        {/* About & Skills Modal */}
        <AboutSection
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
          isEng={isEng}
          designerProfile={designerProfile}
        />

        {/* 4. 포트폴리오 관리자 콘솔 */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          projects={projects}
          setProjects={setProjects}
          designerProfile={designerProfile}
          setDesignerProfile={setDesignerProfile}
          isEng={isEng}
        />
      </div>
    </div>
  );
}

