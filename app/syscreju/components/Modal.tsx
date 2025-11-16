'use client';

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay sutil sin blur pesado */}
      <div
        className="absolute inset-0 bg-black/5 transition-opacity duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white/98 backdrop-blur-md rounded-3xl border border-[#e8e0f0] shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col transform transition-all duration-200 scale-100`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e0f0]">
          <h2 className="text-2xl font-bold text-[#2d2d2d]">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#777] hover:bg-[#f5f3f8] transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-[#e8e0f0] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

