import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(true);

  return (
    <div className="min-h-screen bg-slate-200 text-slate-800 flex flex-col items-center justify-center p-0 md:p-6 font-sans">
      {/* VIEWPORT MODE TOGGLE BAR */}
      <div className="hidden md:flex items-center gap-3 mb-4 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-full border border-slate-300 shadow-xs text-xs font-bold text-slate-700">
        <span className="text-slate-500">Preview Mode:</span>
        <button
          onClick={() => setIsMobileView(true)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            isMobileView
              ? 'bg-[#0F1F4A] text-white shadow-xs'
              : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Device (390px)</span>
        </button>
        <button
          onClick={() => setIsMobileView(false)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            !isMobileView
              ? 'bg-[#0F1F4A] text-white shadow-xs'
              : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
      </div>

      {/* CONTAINER WRAPPER */}
      <div
        className={
          isMobileView
            ? 'w-full max-w-[390px] h-[844px] bg-slate-50 rounded-none md:rounded-[44px] shadow-2xl border-0 md:border-[8px] border-slate-900 overflow-hidden flex flex-col relative transition-all duration-300'
            : 'w-full max-w-md min-h-screen md:min-h-[800px] bg-slate-50 rounded-none md:rounded-2xl shadow-xl border-0 md:border border-slate-300 overflow-hidden flex flex-col relative transition-all duration-300'
        }
      >
        {/* SIMULATED MOBILE STATUS BAR (Visible when in mobile frame mode) */}
        {isMobileView && (
          <div className="bg-[#0F1F4A] text-white px-6 pt-2 pb-1 flex items-center justify-between text-[10px] font-bold shrink-0 select-none">
            <span>9:41</span>
            {/* Dynamic Island / Notch Mock */}
            <div className="w-20 h-3.5 bg-black rounded-full mx-auto hidden md:block" />
            <div className="flex items-center gap-1.5 text-white/90">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {/* APPLICATION BODY */}
        <div className="flex-1 overflow-y-auto flex flex-col relative select-text cursor-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
