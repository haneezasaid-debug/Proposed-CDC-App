import React from 'react';
import { ArrowLeft, Store, ShoppingBag, Delete, AlertCircle, MessageSquare } from 'lucide-react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { VoucherCategory } from '../types';
import { DisqusErrorBoundary } from './DisqusErrorBoundary';

interface ScreenAmountEntryProps {
  category: VoucherCategory;
  balance: number;
  amountStr: string;
  onAmountChange: (newStr: string) => void;
  onBack: () => void;
  onGenerateQr: () => void;
  onOpenWhereToUse: () => void;
  article?: {
    url: string;
    id: string;
    title: string;
  };
}

export const ScreenAmountEntry: React.FC<ScreenAmountEntryProps> = ({
  category,
  balance,
  amountStr,
  onAmountChange,
  onBack,
  onGenerateQr,
  onOpenWhereToUse,
  article: customArticle,
}) => {
  const numValue = parseFloat(amountStr) || 0;

  // Validation rules
  let errorMessage = '';
  let isValid = false;

  if (amountStr.length > 0) {
    if (numValue <= 0) {
      errorMessage = 'Please enter an amount greater than $0';
    } else if (numValue > balance) {
      errorMessage = `Amount exceeds available balance of $${balance.toFixed(2)}`;
    } else {
      isValid = true;
    }
  }

  // Keypad click handlers
  const handleKeyTap = (key: string) => {
    if (key === 'backspace') {
      onAmountChange(amountStr.slice(0, -1));
      return;
    }

    if (key === '.') {
      if (amountStr.includes('.')) return; // Only one decimal point allowed
      if (amountStr === '') {
        onAmountChange('0.');
        return;
      }
      onAmountChange(amountStr + '.');
      return;
    }

    // Key is '0' - '9'
    if (amountStr.includes('.')) {
      const parts = amountStr.split('.');
      if (parts[1] && parts[1].length >= 2) {
        return; // Max 2 decimal places allowed
      }
    }

    if (amountStr === '0') {
      onAmountChange(key);
    } else {
      onAmountChange(amountStr + key);
    }
  };

  const handleQuickAdd = (addVal: number) => {
    const nextVal = (numValue + addVal).toFixed(2);
    // Format nicely (e.g. remove trailing .00 if whole number)
    const formatted = parseFloat(nextVal).toString();
    onAmountChange(formatted);
  };

  const categoryTitle =
    category === 'sg60' ? 'SG60 Vouchers' : 'SG60 Supermarket Vouchers';

  const article = customArticle || {
    url: typeof window !== 'undefined' ? window.location.href : 'https://proposed-cdc-app.vercel.app/screen-2',
    id: `screen-2-${category}`,
    title: `${categoryTitle} - Amount Entry`,
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 animate-in fade-in duration-200">
      {/* HEADER: TEAL TO NAVY GRADIENT */}
      <div className="bg-gradient-to-r from-[#137d80] via-[#0d4f5b] to-[#0F1F4A] text-white px-4 pt-3 pb-3.5 shadow-md relative">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-teal-100 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={onOpenWhereToUse}
            className="text-[11px] font-bold bg-white/15 hover:bg-white/25 border border-white/25 px-2.5 py-0.5 rounded-full text-white transition-colors cursor-pointer"
          >
            Where to use?
          </button>
        </div>

        <div className="flex items-center gap-2">
          {category === 'sg60' ? (
            <div className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0">
              <Store className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          )}
          <h1 className="text-lg font-black tracking-tight text-white">
            {categoryTitle}
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-2 flex flex-col justify-start space-y-2 max-w-md mx-auto w-full pb-6">
        {/* WHITE BALANCE CARD */}
        <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Available Balance
            </span>
            <div className="text-lg font-black text-[#0F1F4A] leading-none">
              ${balance.toFixed(2)}
            </div>
          </div>
          <div>
            <span className="text-[9px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full">
              Valid till Dec 2026
            </span>
          </div>
        </div>

        {/* INPUT FIELD CARD */}
        <div className="bg-white rounded-lg p-2 shadow-xs border border-slate-200/80 space-y-1">
          <label className="block text-[12px] font-bold text-emerald-700">
            Amount to redeem
          </label>

          <div
            className={`flex items-center bg-slate-50 border rounded-lg px-2 py-1 transition-colors ${
              errorMessage
                ? 'border-red-400 bg-red-50/30'
                : isValid
                ? 'border-teal-600 bg-white'
                : 'border-slate-300 bg-slate-50'
            }`}
          >
            <span className="text-base font-black text-slate-500 mr-1">$</span>
            <div className="flex-1 text-base font-black text-[#0F1F4A] min-h-[22px] flex items-center">
              {amountStr ? (
                <span>{amountStr}</span>
              ) : (
                <span className="text-slate-300 font-normal text-xs">
                  Enter amount
                </span>
              )}
              <span className="w-0.5 h-4 bg-teal-600 ml-0.5 animate-pulse shrink-0" />
            </div>

            {amountStr.length > 0 && (
              <button
                onClick={() => onAmountChange('')}
                className="text-[9px] font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 bg-slate-200/70 hover:bg-slate-200 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="flex items-center gap-1 text-[10px] text-red-600 font-semibold animate-in fade-in">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-1 pt-0.5">
            <span className="text-[9px] font-bold text-slate-400 shrink-0">Quick:</span>
            {[2, 5, 10, 20].map((preset) => (
              <button
                key={preset}
                onClick={() => handleQuickAdd(preset)}
                className="text-[9px] font-bold bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 transition-colors cursor-pointer"
              >
                +${preset}
              </button>
            ))}
          </div>
        </div>

        {/* GENERATE QR PRIMARY BUTTON (DIRECTLY BELOW AMOUNT TO REDEEM SECTION) */}
        <button
          onClick={onGenerateQr}
          disabled={!isValid}
          className={`w-full py-2 px-3 rounded-full font-black text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer select-none ${
            isValid
              ? 'bg-teal-600 hover:bg-teal-500 active:scale-[0.99] text-white'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70'
          }`}
        >
          <span>Generate QR</span>
        </button>

        {/* ON-SCREEN NUMERIC KEYPAD */}
        <div className="grid grid-cols-3 gap-1 pt-0.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map(
            (key) => (
              <button
                key={key}
                onClick={() => handleKeyTap(key)}
                className="h-9 bg-white hover:bg-slate-100 active:bg-teal-50 active:scale-[0.97] text-[#0F1F4A] font-black text-sm rounded-md border border-slate-200/90 shadow-2xs flex items-center justify-center transition-all cursor-pointer select-none"
              >
                {key === 'backspace' ? (
                  <Delete className="w-4 h-4 text-slate-600" />
                ) : (
                  <span>{key}</span>
                )}
              </button>
            )
          )}
        </div>

        {/* DISQUS FORUM SECTION AT THE BOTTOM OF SCREEN-2 */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 bg-white rounded-xl p-3 shadow-xs select-text pointer-events-auto cursor-auto relative z-10">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
              <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
              <span>Disqus Comments & Discussion</span>
            </div>
            <div className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              <DisqusErrorBoundary fallback={<span>Comments</span>}>
                <CommentCount
                  shortname="https-proposed-cdc-app-vercel-app"
                  config={{
                    url: article.url,
                    identifier: article.id,
                    title: article.title,
                  }}
                >
                  Comments
                </CommentCount>
              </DisqusErrorBoundary>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mb-2">
            Note: To see comments in your Disqus Admin panel, write and submit your comment directly inside the Disqus box below.
          </p>

          {/* DISQUS EMBED SECTION */}
          <div className="min-h-[220px] select-text pointer-events-auto cursor-auto relative z-10">
            <DisqusErrorBoundary>
              <DiscussionEmbed
                shortname="https-proposed-cdc-app-vercel-app"
                config={{
                  url: article.url,
                  identifier: article.id,
                  title: article.title,
                  language: 'zh_TW',
                }}
              />
            </DisqusErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

