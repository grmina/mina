import React, { ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught runtime error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('nexus_portfolio_projects');
      localStorage.removeItem('nexus_designer_profile');
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-mono">
          <div className="max-w-md w-full p-8 rounded-xl bg-[#0e0e11] border border-[#26262b] shadow-2xl text-center space-y-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-white">화면 로드 중 오류가 발생했습니다</h2>
              <p className="text-xs text-[#888] leading-relaxed">
                포트폴리오 데이터를 안전하게 다시 불러옵니다. 초기화 버튼을 눌러주세요.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>데이터 새로고침 및 복구</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
