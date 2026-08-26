import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Unlock,
  Shield,
  Plus,
  Trash2,
  Edit3,
  Check,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  FolderKanban,
  UserCheck,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileCode2,
  Clock,
  Building,
  Briefcase,
  Monitor,
  Image as ImageIcon
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { ProjectItem, DesignerProfile, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { DESIGNER_PROFILE } from '../data/designerData';

const ADMIN_PASSWORD = '0542';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
  designerProfile: DesignerProfile;
  setDesignerProfile: React.Dispatch<React.SetStateAction<DesignerProfile>>;
  isEng: boolean;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  setProjects,
  designerProfile,
  setDesignerProfile,
  isEng
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'backup'>('projects');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Project Editor State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);

  // Clear inputs on close
  useEffect(() => {
    if (!isOpen) {
      setPasswordError(false);
      setEditingProject(null);
      setIsCreatingNewProject(false);
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
      showToast('관리자 인증에 성공했습니다. (Access Granted)');
    } else {
      setPasswordError(true);
      showToast('비밀번호가 올바르지 않습니다. (0542 입력)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    showToast('관리자 세션이 종료되었습니다.');
  };

  // Move Project
  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;
    // update order numbers
    newProjects.forEach((p, idx) => {
      p.number = idx + 1;
    });
    setProjects(newProjects);
    showToast('프로젝트 순서가 변경되었습니다.');
  };

  // Delete Project
  const deleteProject = (id: string) => {
    if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
      const updated = projects.filter((p) => p.id !== id);
      updated.forEach((p, idx) => {
        p.number = idx + 1;
      });
      setProjects(updated);
      showToast('프로젝트가 삭제되었습니다.');
    }
  };

  // Save / Update Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isCreatingNewProject) {
      const newP: ProjectItem = {
        ...editingProject,
        id: editingProject.id || `proj-${Date.now()}`,
        number: projects.length + 1
      };
      setProjects([...projects, newP]);
      showToast('새 프로젝트가 등록되었습니다.');
    } else {
      setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
      showToast('프로젝트 수정 사항이 저장되었습니다.');
    }
    setEditingProject(null);
    setIsCreatingNewProject(false);
  };

  // Start new project
  const handleStartNewProject = () => {
    const blankProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      number: projects.length + 1,
      title: 'New Game UI Design',
      titleKo: '신규 게임 UI 디자인 프로젝트',
      subtitle: 'Game Interface & UX System',
      subtitleKo: '게임 인터페이스 및 UX 아키텍처',
      category: 'mobile-rpg',
      categoryName: 'Mobile RPG',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      detailImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
      summary: '사용자 중심의 몰입감 높은 인터페이스 구조 설계 및 컴포넌트 모듈화 시스템.',
      intent: '모바일 환경에서 조작 편의성을 극대화하고 직관적인 전투 피드백을 전달.',
      problemSolution: {
        problem: '복잡한 조작 체계와 잦은 화면 전환으로 인한 유저 피로도 누적.',
        solution: '단축바 통합과 직관적인 팝업 레이아웃으로 탭 뎁스를 2단계 이하로 압축.'
      },
      specs: {
        contribution: '100% (기획/디자인/프로토타이핑)',
        duration: '2개월',
        tools: ['Photoshop', 'Illustrator', 'Unity UGUI'],
        platform: 'Mobile (iOS / Android)',
        genre: 'Mobile RPG',
        role: 'Lead UI/UX Designer'
      },
      tags: ['Mobile RPG', 'HUD', 'Design System', 'Photoshop'],
      colors: [
        { name: 'Primary Core', hex: '#6366F1', usage: '주요 버튼 및 활성 상태' },
        { name: 'Surface Dark', hex: '#0A0A0C', usage: '베이스 프레임 및 배경' }
      ],
      screens: [
        {
          title: 'Main Lobby & Navigation',
          description: '핵심 콘텐츠 진입 동선을 단축한 로비 레이아웃',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
        },
        {
          title: 'Inventory & Equipment Management',
          description: '아이템 정보 가독성 극대화 및 원터치 장착 시스템',
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80'
        },
        {
          title: 'Battle HUD & Skill Cooldowns',
          description: '시인성 높은 쿨다운 피드백 및 타격감 전달 UI',
          image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
        }
      ]
    };
    setEditingProject(blankProject);
    setIsCreatingNewProject(true);
  };

  // JSON Export & Import
  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      projects,
      designerProfile
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('전체 포트폴리오 데이터가 JSON 파일로 다운로드되었습니다.');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed.projects && Array.isArray(parsed.projects)) {
          setProjects(parsed.projects);
        }
        if (parsed.designerProfile) {
          setDesignerProfile(parsed.designerProfile);
        }
        showToast('JSON 백업 파일로부터 데이터가 성공적으로 복원되었습니다.');
      } catch (err) {
        alert('유효하지 않은 백업 JSON 파일입니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = () => {
    if (
      window.confirm(
        '모든 프로젝트 및 프로필 데이터를 최초 기본값으로 초기화하시겠습니까? (이 작업은 되돌릴 수 없습니다.)'
      )
    ) {
      setProjects(PROJECTS_DATA);
      setDesignerProfile(DESIGNER_PROFILE);
      localStorage.removeItem('nexus_portfolio_projects');
      localStorage.removeItem('nexus_designer_profile');
      showToast('모든 데이터가 기본 샘플값으로 초기화되었습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-[1000px] my-6 bg-[#0a0a0c] text-white rounded-xl border border-[#222] shadow-2xl overflow-hidden font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#222] bg-[#0e0e11]">
            <div className="flex items-center gap-3">
              <span
                className={`p-2 rounded border ${
                  isAuthenticated
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/25'
                }`}
              >
                {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono uppercase">
                  <span>{isEng ? 'Portfolio CMS Admin Portal' : '포트폴리오 관리자 콘솔'}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                      isAuthenticated
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                        : 'bg-[#111] text-[#888] border-[#222]'
                    }`}
                  >
                    {isAuthenticated ? 'AUTHORIZED' : 'AUTH REQUIRED'}
                  </span>
                </h3>
                <p className="text-xs text-[#888] font-mono">
                  {isAuthenticated
                    ? '프로젝트 등록/수정, 프로필/이력 관리, 데이터 백업을 총괄합니다.'
                    : '비밀번호를 입력하여 관리자 보안 콘솔에 로그인하세요.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded bg-[#18181b] hover:bg-[#222] text-xs text-[#888] hover:text-white border border-[#27272a] transition flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>로그아웃</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] transition"
                title="Close (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#111] border-b border-[#6366f1]/40 px-6 py-2.5 text-xs text-[#a5b4fc] font-mono flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#6366f1]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}

          {/* AUTHENTICATION VIEW */}
          {!isAuthenticated ? (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center font-mono">
              <div className="w-14 h-14 rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center mb-4 text-[#6366f1] shadow-inner">
                <KeyRound className="w-7 h-7" />
              </div>

              <h4 className="text-lg font-bold text-white mb-1">
                {isEng ? 'Enter Admin Password' : '관리자 보안 인증'}
              </h4>
              <p className="text-xs text-[#888] max-w-sm mb-6">
                {isEng
                  ? 'Please authenticate using the master admin access PIN to manage portfolio content.'
                  : '포트폴리오 프로젝트 편집 및 데이터 관리를 위해 관리자 암호를 입력하세요.'}
              </p>

              <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호 입력..."
                    value={passwordInput ?? ''}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    autoFocus
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-lg bg-[#111] border text-center text-lg tracking-[0.3em] font-mono text-white placeholder:tracking-normal placeholder:text-xs placeholder:text-[#555] focus:outline-none transition ${
                      passwordError
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#222] focus:border-[#6366f1]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {passwordError && (
                  <p className="text-xs text-red-400 font-mono flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>비밀번호가 일치하지 않습니다.</span>
                  </p>
                )}

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'OK'].map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        if (key === 'C') {
                          setPasswordInput('');
                          setPasswordError(false);
                        } else if (key === 'OK') {
                          handleLogin();
                        } else {
                          setPasswordInput((prev) => (prev.length < 8 ? prev + key : prev));
                        }
                      }}
                      className={`py-2.5 rounded font-mono text-sm font-semibold transition border ${
                        key === 'OK'
                          ? 'bg-[#6366f1] hover:bg-[#5558e6] text-white border-[#6366f1]'
                          : key === 'C'
                          ? 'bg-[#18181b] hover:bg-[#222] text-[#888] border-[#222]'
                          : 'bg-[#111] hover:bg-[#18181b] text-white border-[#222]'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#6366f1] hover:bg-[#5558e6] text-white text-xs font-bold font-mono uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#6366f1]/20"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{isEng ? 'Authenticate & Enter' : '관리자 콘솔 접속'}</span>
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN DASHBOARD CONSOLE */
            <div className="grid grid-cols-1 md:grid-cols-4 min-h-[550px]">
              {/* Left Admin Navigation */}
              <div className="p-4 border-b md:border-b-0 md:border-r border-[#222] bg-[#070709] space-y-1.5 font-mono">
                {[
                  {
                    id: 'projects',
                    labelKo: '프로젝트 관리',
                    labelEn: 'Projects Manager',
                    icon: FolderKanban,
                    badge: projects.length
                  },
                  {
                    id: 'profile',
                    labelKo: '프로필 & 경력 관리',
                    labelEn: 'Profile & Career',
                    icon: UserCheck
                  },
                  {
                    id: 'backup',
                    labelKo: '데이터 백업 & 복원',
                    labelEn: 'Data & Backup',
                    icon: FileCode2
                  }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setEditingProject(null);
                        setIsCreatingNewProject(false);
                      }}
                      className={`w-full text-left px-3.5 py-3 rounded text-xs transition flex items-center justify-between ${
                        isActive
                          ? 'bg-[#6366f1]/15 text-[#6366f1] border border-[#6366f1]/40 font-bold'
                          : 'text-[#888] hover:text-zinc-200 hover:bg-[#111] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{isEng ? tab.labelEn : tab.labelKo}</span>
                      </div>
                      {tab.badge !== undefined && tab.badge > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#6366f1] text-white font-mono">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="mt-8 pt-4 border-t border-[#1a1a1a] text-[11px] text-[#666] hidden md:block">
                  <span className="text-[#555] block mb-1 uppercase font-bold text-[10px]">CMS STATS</span>
                  <div className="flex justify-between text-zinc-300">
                    <span>Total Projects:</span>
                    <span className="text-[#6366f1] font-bold">{projects.length} Items</span>
                  </div>
                </div>
              </div>

              {/* Right Admin Panel */}
              <div className="md:col-span-3 p-6 max-h-[600px] overflow-y-auto space-y-6">
                {/* 1. PROJECTS MANAGER TAB */}
                {activeTab === 'projects' && (
                  <div>
                    {!editingProject ? (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#222]">
                          <div>
                            <h4 className="text-sm font-bold text-white font-mono uppercase">
                              {isEng ? 'Portfolio Showcase Items' : '등록된 프로젝트 목록'}
                            </h4>
                            <p className="text-xs text-[#777]">
                              순서 변경, 세부 스펙 수정 및 신규 프로젝트를 추가할 수 있습니다.
                            </p>
                          </div>
                          <button
                            onClick={handleStartNewProject}
                            className="px-3.5 py-2 rounded bg-[#6366f1] hover:bg-[#5558e6] text-white text-xs font-bold font-mono transition flex items-center gap-1.5 shadow-md shadow-[#6366f1]/20 self-start sm:self-auto"
                          >
                            <Plus className="w-4 h-4" />
                            <span>새 프로젝트 등록</span>
                          </button>
                        </div>

                        {/* Projects Table / Card List */}
                        <div className="space-y-2.5">
                          {projects.map((proj, idx) => (
                            <div
                              key={proj.id}
                              className="p-3.5 rounded-lg bg-[#111] border border-[#222] hover:border-[#333] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs font-bold text-[#555] w-6">
                                  #{String(idx + 1).padStart(2, '0')}
                                </span>
                                <img
                                  src={proj.thumbnail}
                                  alt={proj.title}
                                  className="w-14 h-10 object-cover rounded bg-[#18181b] border border-[#222]"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-xs font-bold text-white">{proj.title}</h5>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181b] text-[#6366f1] border border-[#27272a]">
                                      {proj.categoryName}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#777] line-clamp-1 mt-0.5">
                                    {proj.subtitleKo || proj.subtitle}
                                  </p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-1.5 self-end sm:self-auto font-mono">
                                <button
                                  onClick={() => moveProject(idx, 'up')}
                                  disabled={idx === 0}
                                  className="p-1.5 rounded bg-[#18181b] hover:bg-[#222] disabled:opacity-30 text-[#888] hover:text-white border border-[#27272a] transition"
                                  title="위로 이동"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => moveProject(idx, 'down')}
                                  disabled={idx === projects.length - 1}
                                  className="p-1.5 rounded bg-[#18181b] hover:bg-[#222] disabled:opacity-30 text-[#888] hover:text-white border border-[#27272a] transition"
                                  title="아래로 이동"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingProject({ ...proj });
                                    setIsCreatingNewProject(false);
                                  }}
                                  className="px-2.5 py-1.5 rounded bg-[#18181b] hover:bg-[#222] text-[#6366f1] hover:text-[#a5b4fc] border border-[#27272a] text-xs font-semibold transition flex items-center gap-1"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>편집</span>
                                </button>
                                <button
                                  onClick={() => deleteProject(proj.id)}
                                  className="p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 transition"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* PROJECT EDITOR FORM */
                      <form onSubmit={handleSaveProject} className="space-y-4 font-mono">
                        <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-[#6366f1]" />
                            <span>
                              {isCreatingNewProject ? '신규 프로젝트 추가' : `프로젝트 편집: ${editingProject.title}`}
                            </span>
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(null);
                              setIsCreatingNewProject(false);
                            }}
                            className="text-xs text-[#888] hover:text-white"
                          >
                            목록으로 돌아가기
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-[#888] block mb-1">영문 타이틀 (English Title)</label>
                            <input
                              type="text"
                              value={editingProject.title ?? ''}
                              onChange={(e) =>
                                setEditingProject({ ...editingProject, title: e.target.value })
                              }
                              required
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                            />
                          </div>
                          <div>
                            <label className="text-[#888] block mb-1">한글 타이틀 (Korean Title)</label>
                            <input
                              type="text"
                              value={editingProject.titleKo ?? ''}
                              onChange={(e) =>
                                setEditingProject({ ...editingProject, titleKo: e.target.value })
                              }
                              required
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-[#888] block mb-1">카테고리 (Category)</label>
                            <select
                              value={editingProject.category ?? 'mobile-rpg'}
                              onChange={(e) => {
                                const cat = e.target.value as ProjectCategory;
                                const map: Record<string, string> = {
                                  'mobile-rpg': 'Mobile RPG',
                                  'pc-mmorpg': 'PC MMORPG',
                                  'casual-gui': 'Casual GUI',
                                  'scifi-fps': 'Sci-Fi FPS',
                                  subculture: 'Subculture',
                                  'icon-kit': 'Icon Kit'
                                };
                                setEditingProject({
                                  ...editingProject,
                                  category: cat,
                                  categoryName: map[cat] || cat
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                            >
                              <option value="mobile-rpg">Mobile RPG</option>
                              <option value="pc-mmorpg">PC MMORPG</option>
                              <option value="casual-gui">Casual GUI</option>
                              <option value="scifi-fps">Sci-Fi FPS</option>
                              <option value="subculture">Subculture Anime</option>
                              <option value="icon-kit">Icon & System Kit</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[#888] block mb-1">장르 & 역할 (Genre / Role)</label>
                            <input
                              type="text"
                              value={editingProject.specs?.genre ?? ''}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  specs: { ...(editingProject.specs || {}), genre: e.target.value } as any
                                })
                              }
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                            />
                          </div>
                        </div>

                        {/* Project Card Thumbnail (Computer upload or URL) */}
                        <div className="p-3.5 rounded-lg bg-[#0e0e12] border border-[#222]">
                          <ImageUploader
                            label="프로젝트 메인 썸네일 (Thumbnail Image)"
                            sublabel="포트폴리오 메인 5:7 카드 그리드에 노출되는 대표 썸네일 이미지입니다."
                            value={editingProject.thumbnail ?? ''}
                            onChange={(imgVal) =>
                              setEditingProject({ ...editingProject, thumbnail: imgVal })
                            }
                            aspectRatio="5:7"
                          />
                        </div>

                        {/* Project Detail Modal Banner Image */}
                        <div className="p-3.5 rounded-lg bg-[#0e0e12] border border-[#222]">
                          <ImageUploader
                            label="상세 모달 고화질 배너 (Detail Banner Artwork)"
                            sublabel="프로젝트 클릭 시 열리는 상세 케이스 스터디 상단 배너 이미지입니다."
                            value={editingProject.detailImage ?? editingProject.thumbnail ?? ''}
                            onChange={(imgVal) =>
                              setEditingProject({ ...editingProject, detailImage: imgVal })
                            }
                            aspectRatio="16:9"
                          />
                        </div>

                        <div className="text-xs">
                          <label className="text-[#888] block mb-1">프로젝트 핵심 요약 (Summary)</label>
                          <textarea
                            rows={2}
                            value={editingProject.summary ?? ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, summary: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1] resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-[#888] block mb-1">문제 정의 (UX Problem)</label>
                            <textarea
                              rows={2}
                              value={editingProject.problemSolution?.problem ?? ''}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  problemSolution: {
                                    ...(editingProject.problemSolution || {}),
                                    problem: e.target.value
                                  } as any
                                })
                              }
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1] resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[#888] block mb-1">디자인 솔루션 (UI Solution)</label>
                            <textarea
                              rows={2}
                              value={editingProject.problemSolution?.solution ?? ''}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  problemSolution: {
                                    ...(editingProject.problemSolution || {}),
                                    solution: e.target.value
                                  } as any
                                })
                              }
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1] resize-none"
                            />
                          </div>
                        </div>

                        {/* Specs grid */}
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <label className="text-[#888] block mb-1">기여도</label>
                            <input
                              type="text"
                              value={editingProject.specs?.contribution ?? ''}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  specs: { ...(editingProject.specs || {}), contribution: e.target.value } as any
                                })
                              }
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                            />
                          </div>
                          <div>
                            <label className="text-[#888] block mb-1">제작 기간</label>
                            <input
                              type="text"
                              value={editingProject.specs?.duration ?? ''}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  specs: { ...(editingProject.specs || {}), duration: e.target.value } as any
                                })
                              }
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                            />
                          </div>
                          <div>
                            <label className="text-[#888] block mb-1">플랫폼</label>
                            <input
                              type="text"
                              value={editingProject.specs?.platform ?? ''}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  specs: { ...(editingProject.specs || {}), platform: e.target.value } as any
                                })
                              }
                              className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                            />
                          </div>
                        </div>

                        {/* Screen Gallery Image Manager (Add/Delete/Reorder) */}
                        <div className="space-y-4 pt-4 border-t border-[#222]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1f1f25] gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                                  <Monitor className="w-4 h-4 text-[#6366f1]" />
                                  <span>상세페이지 [화면 구성 & 갤러리] SCREEN 이미지 관리</span>
                                </h5>
                                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#6366f1]/20 text-[#a5b4fc] border border-[#6366f1]/30">
                                  총 {editingProject.screens?.length || 0}개
                                </span>
                              </div>
                              <p className="text-[11px] text-[#777] mt-1">
                                프로젝트 상세페이지 내에 순서대로 나열되는 세부 인게임/UI 스크린샷 이미지를 추가, 삭제, 순서 변경합니다.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const currScreens = editingProject.screens || [];
                                const nextNum = currScreens.length + 1;
                                const newScreen = {
                                  title: `Screen 0${nextNum}`,
                                  description: '',
                                  image: editingProject.thumbnail || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
                                };
                                setEditingProject({
                                  ...editingProject,
                                  screens: [...currScreens, newScreen]
                                });
                              }}
                              className="px-3 py-1.5 rounded bg-[#6366f1]/15 hover:bg-[#6366f1]/30 text-[#818cf8] hover:text-white border border-[#6366f1]/40 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                            >
                              <Plus className="w-4 h-4" />
                              <span>SCREEN 추가 (+1)</span>
                            </button>
                          </div>

                          {(!editingProject.screens || editingProject.screens.length === 0) ? (
                            <div className="p-8 rounded-lg bg-[#0e0e12] border border-dashed border-[#2b2b36] text-center space-y-3">
                              <ImageIcon className="w-8 h-8 text-[#555] mx-auto" />
                              <p className="text-xs text-[#888]">
                                등록된 상세페이지 스크린샷 이미지가 없습니다.
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  const newScreen = {
                                    title: 'Screen 01',
                                    description: '',
                                    image: editingProject.thumbnail || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
                                  };
                                  setEditingProject({
                                    ...editingProject,
                                    screens: [newScreen]
                                  });
                                }}
                                className="px-4 py-2 rounded bg-[#6366f1] hover:bg-[#5558e6] text-white text-xs font-bold transition inline-flex items-center gap-1.5"
                              >
                                <Plus className="w-4 h-4" />
                                <span>첫 번째 SCREEN 추가하기</span>
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {editingProject.screens.map((screen, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 rounded-lg bg-[#0e0e12] border border-[#222] space-y-3 transition hover:border-[#333]"
                                >
                                  <div className="flex items-center justify-between pb-2 border-b border-[#1c1c22]">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#6366f1]/20 text-[#818cf8] border border-[#6366f1]/30">
                                        SCREEN 0{idx + 1}
                                      </span>
                                      <span className="text-xs text-zinc-400 font-mono">
                                        순서: {idx + 1}번째 노출
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                      {/* Move Up */}
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => {
                                          if (idx === 0) return;
                                          const nextScreens = [...editingProject.screens];
                                          const temp = nextScreens[idx - 1];
                                          nextScreens[idx - 1] = nextScreens[idx];
                                          nextScreens[idx] = temp;
                                          setEditingProject({
                                            ...editingProject,
                                            screens: nextScreens
                                          });
                                        }}
                                        className={`p-1.5 rounded border text-xs transition flex items-center justify-center ${
                                          idx === 0
                                            ? 'opacity-30 cursor-not-allowed bg-[#18181b] border-[#27272a] text-[#666]'
                                            : 'bg-[#18181b] hover:bg-[#27272a] text-zinc-300 border-[#27272a]'
                                        }`}
                                        title="위로 이동"
                                      >
                                        <ArrowUp className="w-3.5 h-3.5" />
                                      </button>

                                      {/* Move Down */}
                                      <button
                                        type="button"
                                        disabled={idx === editingProject.screens.length - 1}
                                        onClick={() => {
                                          if (idx === editingProject.screens.length - 1) return;
                                          const nextScreens = [...editingProject.screens];
                                          const temp = nextScreens[idx + 1];
                                          nextScreens[idx + 1] = nextScreens[idx];
                                          nextScreens[idx] = temp;
                                          setEditingProject({
                                            ...editingProject,
                                            screens: nextScreens
                                          });
                                        }}
                                        className={`p-1.5 rounded border text-xs transition flex items-center justify-center ${
                                          idx === editingProject.screens.length - 1
                                            ? 'opacity-30 cursor-not-allowed bg-[#18181b] border-[#27272a] text-[#666]'
                                            : 'bg-[#18181b] hover:bg-[#27272a] text-zinc-300 border-[#27272a]'
                                        }`}
                                        title="아래로 이동"
                                      >
                                        <ArrowDown className="w-3.5 h-3.5" />
                                      </button>

                                      {/* Delete Screen */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updatedScreens = editingProject.screens.filter((_, sIdx) => sIdx !== idx);
                                          setEditingProject({
                                            ...editingProject,
                                            screens: updatedScreens
                                          });
                                        }}
                                        className="p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs transition flex items-center gap-1 px-2.5 ml-1"
                                        title="SCREEN 삭제"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                        <span>SCREEN 삭제</span>
                                      </button>
                                    </div>
                                  </div>

                                  {/* Screen Image Uploader */}
                                  <ImageUploader
                                    label={`SCREEN 0${idx + 1} 인게임 스크린샷 이미지`}
                                    sublabel="PC 이미지 파일 업로드(Drag & Drop) 또는 외부 고화질 이미지 URL을 입력할 수 있습니다."
                                    value={screen.image ?? ''}
                                    onChange={(imgVal) => {
                                      const updatedScreens = [...editingProject.screens];
                                      updatedScreens[idx] = { ...updatedScreens[idx], image: imgVal };
                                      setEditingProject({ ...editingProject, screens: updatedScreens });
                                    }}
                                    aspectRatio="16:9"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-[#222]">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(null);
                              setIsCreatingNewProject(false);
                            }}
                            className="px-4 py-2 rounded bg-[#111] hover:bg-[#1a1a1a] text-[#888] hover:text-white border border-[#222] text-xs font-semibold transition"
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded bg-[#6366f1] hover:bg-[#5558e6] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-[#6366f1]/20 uppercase"
                          >
                            <Check className="w-4 h-4" />
                            <span>저장 및 적용</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* 2. PROFILE & CAREER TAB */}
                {activeTab === 'profile' && (
                  <div className="space-y-6 font-mono">
                    <div className="pb-3 border-b border-[#222]">
                      <h4 className="text-sm font-bold text-white uppercase">디자이너 기본 프로필 & 연락처</h4>
                      <p className="text-xs text-[#777]">사이트 헤더, 모달 및 포트폴리오 전반에 노출되는 프로필 정보입니다.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-[#888] block mb-1">디자이너 성명</label>
                        <input
                          type="text"
                          value={designerProfile.name ?? ''}
                          onChange={(e) =>
                            setDesignerProfile({ ...designerProfile, name: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                        />
                      </div>
                      <div>
                        <label className="text-[#888] block mb-1">직함 / 포지션</label>
                        <input
                          type="text"
                          value={designerProfile.role ?? ''}
                          onChange={(e) =>
                            setDesignerProfile({ ...designerProfile, role: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                        />
                      </div>
                      <div>
                        <label className="text-[#888] block mb-1">연차 (경력 년수)</label>
                        <input
                          type="number"
                          value={designerProfile.experienceYears ?? 0}
                          onChange={(e) =>
                            setDesignerProfile({
                              ...designerProfile,
                              experienceYears: Number(e.target.value) || 0
                            })
                          }
                          className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[#888] block mb-1">공식 이메일</label>
                        <input
                          type="email"
                          value={designerProfile.email ?? ''}
                          onChange={(e) =>
                            setDesignerProfile({ ...designerProfile, email: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                        />
                      </div>
                      <div>
                        <label className="text-[#888] block mb-1">거주 지역</label>
                        <input
                          type="text"
                          value={designerProfile.location ?? ''}
                          onChange={(e) =>
                            setDesignerProfile({ ...designerProfile, location: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                        />
                      </div>
                    </div>

                    <div className="text-xs">
                      <label className="text-[#888] block mb-1">헤더 메인 슬로건 (Tagline)</label>
                      <input
                        type="text"
                        value={designerProfile.tagline ?? ''}
                        onChange={(e) =>
                          setDesignerProfile({ ...designerProfile, tagline: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
                      />
                    </div>

                    <div className="text-xs">
                      <label className="text-[#888] block mb-1">디자인 철학 & 소개글 (Bio)</label>
                      <textarea
                        rows={3}
                        value={designerProfile.bio ?? ''}
                        onChange={(e) =>
                          setDesignerProfile({ ...designerProfile, bio: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1] resize-none"
                      />
                    </div>

                    {/* Work Experience Preview */}
                    <div className="pt-3 border-t border-[#222]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#6366f1]" />
                          <span>주요 경력 목록 ({designerProfile.workExperience.length}개사)</span>
                        </span>
                      </div>
                      <div className="space-y-2">
                        {designerProfile.workExperience.map((work, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded bg-[#111] border border-[#222] flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-white">{work.company}</span>
                              <span className="text-[#6366f1] ml-2">({work.role})</span>
                              <span className="text-[#555] block text-[11px] mt-0.5">{work.period}</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a]">
                              {work.highlights.length}개 하이라이트
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-3 border-t border-[#222]">
                      <button
                        onClick={() => showToast('프로필 정보가 저장되었습니다.')}
                        className="px-5 py-2 rounded bg-[#6366f1] hover:bg-[#5558e6] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-[#6366f1]/20 uppercase"
                      >
                        <Check className="w-4 h-4" />
                        <span>프로필 변경사항 저장</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. BACKUP & SYSTEM TAB */}
                {activeTab === 'backup' && (
                  <div className="space-y-6 font-mono">
                    <div className="pb-3 border-b border-[#222]">
                      <h4 className="text-sm font-bold text-white uppercase">데이터 백업, 가져오기 및 초기화</h4>
                      <p className="text-xs text-[#777]">
                        사이트의 전체 프로젝트 데이터와 프로필을 JSON 파일로 백업하거나 복원할 수 있습니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* JSON Export */}
                      <div className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-3">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-[#6366f1]" />
                          <h5 className="text-xs font-bold text-white">JSON 전체 백업 내보내기</h5>
                        </div>
                        <p className="text-[11px] text-[#777]">
                          현재 등록된 모든 프로젝트({projects.length}개) 및 프로필 정보를 단일 JSON으로 다운로드합니다.
                        </p>
                        <button
                          onClick={handleExportData}
                          className="w-full py-2.5 rounded bg-[#18181b] hover:bg-[#202024] text-white text-xs font-bold border border-[#27272a] transition flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>포트폴리오 JSON 다운로드</span>
                        </button>
                      </div>

                      {/* JSON Import */}
                      <div className="p-4 rounded-lg bg-[#111] border border-[#222] space-y-3">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-emerald-400" />
                          <h5 className="text-xs font-bold text-white">JSON 백업 파일 가져오기</h5>
                        </div>
                        <p className="text-[11px] text-[#777]">
                          이전에 저장한 JSON 백업 파일을 업로드하여 프로젝트 목록과 프로필을 복원합니다.
                        </p>
                        <label className="w-full py-2.5 rounded bg-[#18181b] hover:bg-[#202024] text-white text-xs font-bold border border-[#27272a] transition flex items-center justify-center gap-1.5 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>백업 파일 선택 및 복원</span>
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImportData}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Reset to Factory Defaults */}
                    <div className="p-4 rounded-lg bg-red-950/20 border border-red-900/40 space-y-3">
                      <div className="flex items-center gap-2 text-red-400">
                        <RotateCcw className="w-4 h-4" />
                        <h5 className="text-xs font-bold">기본 샘플 데이터로 복원</h5>
                      </div>
                      <p className="text-[11px] text-[#888]">
                        로컬 스토리지에 저장된 모든 커스텀 변경 사항을 지우고 포트폴리오 최초 기본 상태로 되돌립니다.
                      </p>
                      <button
                        onClick={handleResetToDefaults}
                        className="px-4 py-2 rounded bg-red-900/40 hover:bg-red-900/70 text-red-300 text-xs font-semibold border border-red-700/50 transition flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>전체 데이터 공장 초기화</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="px-6 py-3.5 bg-[#070709] border-t border-[#222] flex items-center justify-between font-mono text-xs text-[#666]">
            <span>NEXUS PORTFOLIO CMS v2.4</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Encrypted Session Storage Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
