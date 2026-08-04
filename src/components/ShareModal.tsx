import React, { useState } from 'react';
import { Share2, Copy, Check, QrCode } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareLink = "https://vouchers.gov.sg/sg60/claim?id=sg60-household-8832-72";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-base text-[#0F1F4A]">
            <Share2 className="w-5 h-5 text-teal-600" />
            <span>Share SG60 Vouchers</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold px-2 py-1 text-xl leading-none rounded-lg hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          Share this voucher link with members of your registered household so they can also redeem SG60 Vouchers from their own phones.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Household Voucher Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 font-mono w-full outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 bg-[#0F1F4A] hover:bg-[#1a2e63] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Copy Link
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
