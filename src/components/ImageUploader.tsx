import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Trash2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  sublabel?: string;
  value?: string;
  onChange: (dataUrlOrUrl: string) => void;
  aspectRatio?: '5:7' | '4:3' | '16:9' | '1:1';
}

/**
 * Reads an uploaded image file preserving original bytes and dimensions.
 */
export const optimizeAndReadFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('이미지 파일(PNG, JPG, WebP, GIF 등)만 업로드할 수 있습니다.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  sublabel,
  value = '',
  onChange,
  aspectRatio = '4:3'
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessInfo(null);
    try {
      const dataUrl = await optimizeAndReadFile(file);
      onChange(dataUrl);
      const sizeKb = Math.round(file.size / 1024);
      setSuccessInfo(`'${file.name}' 업로드 완료 (${sizeKb}KB)`);
    } catch (err: any) {
      setErrorMessage(err.message || '이미지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const safeValue = value ?? '';

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-white font-bold block">{label}</label>
          {sublabel && <p className="text-[11px] text-[#777]">{sublabel}</p>}
        </div>
        <div className="flex items-center gap-1 bg-[#111] p-0.5 rounded border border-[#222]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-[#6366f1] text-white'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>내 컴퓨터에서 업로드</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-[#6366f1] text-white'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>웹 URL 입력</span>
          </button>
        </div>
      </div>

      {/* Upload mode */}
      {mode === 'upload' ? (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Drag & drop upload box */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[110px] ${
              isDragging
                ? 'border-[#6366f1] bg-[#6366f1]/10'
                : 'border-[#27272a] hover:border-[#6366f1]/50 bg-[#111]/80 hover:bg-[#151518]'
            }`}
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-[#6366f1]">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-xs">이미지 최적화 처리 중...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-[#1c1c22] border border-[#2e2e38] flex items-center justify-center text-[#6366f1] mb-2 shadow-inner">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs text-zinc-200 font-semibold">
                  클릭하여 컴퓨터에서 이미지 파일 선택 또는 드래그 앤 드롭
                </p>
                <p className="text-[10px] text-[#666] mt-1">
                  지원 형식: PNG, JPG, JPEG, WebP, GIF (자동 캔버스 최적화 지원)
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        /* URL Input mode */
        <div className="space-y-1">
          <input
            type="text"
            placeholder="https://images.unsplash.com/photo-..."
            value={safeValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#111] border border-[#222] text-white focus:outline-none focus:border-[#6366f1]"
          />
        </div>
      )}

      {/* Status Messages */}
      {errorMessage && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errorMessage}</span>
        </p>
      )}
      {successInfo && (
        <p className="text-[11px] text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{successInfo}</span>
        </p>
      )}

      {/* Preview Card */}
      {safeValue && (
        <div className="p-2.5 rounded-lg bg-[#0e0e12] border border-[#222] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-15 rounded overflow-hidden border border-[#333] bg-black shrink-0">
              <img
                src={safeValue}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = '0.3';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white">현재 설정된 이미지</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  {safeValue.startsWith('data:') ? '내 컴퓨터 이미지 (Base64)' : '웹 URL 이미지'}
                </span>
              </div>
              <p className="text-[10px] text-[#666] max-w-[280px] sm:max-w-md truncate mt-0.5 font-mono">
                {safeValue.startsWith('data:') ? `Data URL Image (${Math.round(safeValue.length / 1024)}KB)` : safeValue}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2 py-1 rounded bg-[#18181b] hover:bg-[#222] text-[#6366f1] hover:text-[#a5b4fc] border border-[#27272a] text-[10px] font-semibold transition flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>교체</span>
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 text-[10px] transition"
              title="이미지 제거"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
