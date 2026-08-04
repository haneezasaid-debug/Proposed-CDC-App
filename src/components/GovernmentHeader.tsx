import React, { useState } from 'react';
import { SingaporeLionCrest } from './Sg60Logo';
import { ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react';

export const GovernmentHeader: React.FC = () => {
  const [showIdentifyModal, setShowIdentifyModal] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#f0f2f5] text-[#333333] text-[11px] px-3.5 py-1.5 flex items-center justify-between border-b border-gray-200 select-none">
        <div className="flex items-center gap-1.5 font-medium text-gray-700">
          <SingaporeLionCrest className="w-3.5 h-3.5 shrink-0" />
          <span>A Singapore Government Agency Website</span>
        </div>
        <button
          onClick={() => setShowIdentifyModal(true)}
          className="text-[#0052cc] hover:underline flex items-center gap-0.5 font-medium cursor-pointer"
        >
          <span>How to identify</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Identify Modal */}
      {showIdentifyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowIdentifyModal(false)}
        >
          <div
            className="bg-white rounded-xl max-w-sm w-full p-5 text-gray-800 shadow-xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0F1F4A]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>How to identify official website</span>
              </div>
              <button
                onClick={() => setShowIdentifyModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold px-1 text-lg"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-gray-600">
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#0F1F4A] shrink-0">1.</span>
                <p>
                  <strong className="text-gray-800">Official domain ends in .gov.sg</strong>
                  <br />
                  Official Singapore government websites use the .gov.sg domain.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#0F1F4A] shrink-0">2.</span>
                <p>
                  <strong className="text-gray-800">Secure connection</strong>
                  <br />
                  Look for a lock icon or https:// protocol in your browser location bar.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowIdentifyModal(false)}
              className="mt-4 w-full py-2 bg-[#0F1F4A] text-white font-medium text-xs rounded-lg hover:bg-[#1a2e63] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
