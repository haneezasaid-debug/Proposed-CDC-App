import React from 'react';
import { Sg60Logo } from './Sg60Logo';
import {
  Clock,
  Building2,
  Share2,
  HelpCircle,
  History,
  ChevronRight,
  Globe,
  ShoppingBag,
  Store,
  ChevronDown,
} from 'lucide-react';
import { LanguageOption, VoucherCategory } from '../types';

interface ScreenLandingProps {
  sg60Balance: number;
  supermarketBalance: number;
  selectedLanguage: LanguageOption;
  onSelectLanguage: (lang: LanguageOption) => void;
  onOpenCategory: (category: VoucherCategory) => void;
  onOpenHistory: () => void;
  onOpenShare: () => void;
  onOpenInfo: () => void;
  onOpenWhereToUse: () => void;
}

export const ScreenLanding: React.FC<ScreenLandingProps> = ({
  sg60Balance,
  supermarketBalance,
  selectedLanguage,
  onSelectLanguage,
  onOpenCategory,
  onOpenHistory,
  onOpenShare,
  onOpenInfo,
  onOpenWhereToUse,
}) => {
  return (
    <div className="flex flex-col min-h-full bg-slate-50 text-slate-800 animate-in fade-in duration-200">
      {/* NAVY BLUE HEADER SECTION */}
      <div className="bg-[#0F1F4A] text-white px-4 pt-3.5 pb-4 relative shadow-md">
        {/* Top bar with Logo & Language dropdown */}
        <div className="flex items-center justify-between mb-3">
          <Sg60Logo size="sm" textColor="text-white" />

          {/* Language Selector Dropdown */}
          <div className="relative group">
            <select
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as LanguageOption)}
              className="appearance-none bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold px-2.5 py-1 pr-6 rounded-full border border-white/20 cursor-pointer outline-none transition-colors"
            >
              <option value="en" className="bg-[#0F1F4A] text-white">English</option>
              <option value="zh" className="bg-[#0F1F4A] text-white">华语 (Chinese)</option>
              <option value="ms" className="bg-[#0F1F4A] text-white">Bahasa Melayu</option>
              <option value="ta" className="bg-[#0F1F4A] text-white">தமிழ் (Tamil)</option>
            </select>
            <ChevronDown className="w-3 h-3 text-white/80 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-0.5 mb-3">
          <h1 className="text-xl font-black tracking-tight text-white">
            SG60 Vouchers
          </h1>
          <p className="text-[11px] text-blue-100 font-medium">
            Can be used wherever CDC Vouchers are accepted
          </p>
        </div>

        {/* Details Row: Expiry + Address */}
        <div className="space-y-1 text-xs text-blue-100/90 mb-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <span className="font-semibold text-white">Use by 31 Dec 2026</span>
          </div>
          <button
            onClick={onOpenWhereToUse}
            className="flex items-center gap-2 text-left hover:text-white transition-colors cursor-pointer w-full"
          >
            <Building2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <span className="underline decoration-white/40 underline-offset-2">
              Canberra Road, Singapore
            </span>
          </button>
        </div>

        {/* Two Pill Buttons Side-by-Side */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onOpenShare}
            className="py-2 px-2.5 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer border border-teal-400/30"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>↗ Share vouchers</span>
          </button>

          <button
            onClick={onOpenInfo}
            className="py-2 px-2.5 bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1 transition-all cursor-pointer border border-white/20"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-200" />
            <span>? Info & help</span>
          </button>
        </div>
      </div>

      {/* BELOW NAVY SECTION - WHITE BACKGROUND CONTENT */}
      <div className="flex-1 bg-slate-50 px-4 pt-3.5 pb-4 space-y-2.5">
        {/* Row: TAP TO USE label & History Link */}
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
            TAP TO USE
          </span>
          <button
            onClick={onOpenHistory}
            className="text-xs font-bold text-[#0F1F4A] hover:text-teal-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-teal-600" />
            <span>↻ History</span>
          </button>
        </div>

        {/* VOUCHER CARD 1: SG60 Vouchers ($317) */}
        <button
          onClick={() => onOpenCategory('sg60')}
          className="w-full bg-white hover:bg-slate-50/80 active:scale-[0.99] border border-slate-200/90 rounded-xl p-3 flex items-center justify-between shadow-xs transition-all cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            {/* Teal Icon Badge */}
            <div className="w-10 h-10 rounded-lg bg-[#138A8E] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5" />
            </div>

            <div>
              <div className="font-extrabold text-xs text-slate-900 group-hover:text-teal-700 transition-colors">
                SG60 Vouchers
              </div>
              <div className="text-lg font-black text-[#0F1F4A]">
                ${sg60Balance.toFixed(0)}
              </div>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-teal-50 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* VOUCHER CARD 2: SG60 Supermarket Vouchers ($300) */}
        <button
          onClick={() => onOpenCategory('supermarket')}
          className="w-full bg-white hover:bg-slate-50/80 active:scale-[0.99] border border-slate-200/90 rounded-xl p-3 flex items-center justify-between shadow-xs transition-all cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3">
            {/* Yellow Icon Badge */}
            <div className="w-10 h-10 rounded-lg bg-[#EAB308] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>

            <div>
              <div className="font-extrabold text-xs text-slate-900 group-hover:text-amber-700 transition-colors">
                SG60 Supermarket Vouchers
              </div>
              <div className="text-lg font-black text-[#0F1F4A]">
                ${supermarketBalance.toFixed(0)}
              </div>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-amber-50 flex items-center justify-center text-slate-400 group-hover:text-amber-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto py-2.5 text-center text-[10px] font-bold text-slate-400 border-t border-slate-200/60 bg-slate-100/60 select-none tracking-wider">
        <span>BUILT BY </span>
        <span className="font-mono text-slate-500">( )</span>
        <span> OPEN GOVERNMENT PRODUCTS</span>
      </footer>
    </div>
  );
};
