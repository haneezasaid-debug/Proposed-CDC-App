import React from 'react';
import { History, RotateCcw, ArrowDownRight, Tag } from 'lucide-react';
import { RedemptionRecord } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: RedemptionRecord[];
  onResetBalances: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onResetBalances,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
          <div className="flex items-center gap-2 font-bold text-base text-[#0F1F4A]">
            <History className="w-5 h-5 text-teal-600" />
            <span>Redemption History</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold px-2 py-1 text-xl leading-none rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 my-2">
          {records.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-xs">
              <Tag className="w-8 h-8 mx-auto mb-2 opacity-40 text-gray-400" />
              <p className="font-medium text-gray-500">No voucher redemptions yet</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Redeemed SG60 Vouchers will appear here.
              </p>
            </div>
          ) : (
            records.map((rec) => (
              <div
                key={rec.id}
                className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    <ArrowDownRight className="w-4 h-4 text-teal-700" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-gray-900">
                      {rec.merchantName}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1.5">
                      <span className="capitalize font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/60">
                        {rec.category === 'sg60' ? 'SG60 Voucher' : 'Supermarket'}
                      </span>
                      <span>
                        {new Date(rec.timestamp).toLocaleDateString('en-SG', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-black text-sm text-[#0F1F4A]">
                    -${rec.amount.toFixed(2)}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 font-semibold">
                    {rec.code}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
          <button
            onClick={onResetBalances}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Reset balance to $317 and clear history"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Reset Demo Balances</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#0F1F4A] hover:bg-[#1a2e63] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
