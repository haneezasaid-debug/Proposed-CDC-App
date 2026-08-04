import React from 'react';
import { HelpCircle, ExternalLink, ShieldAlert, Store, Clock } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-base text-[#0F1F4A]">
            <HelpCircle className="w-5 h-5 text-teal-600" />
            <span>SG60 Vouchers Info & Help</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold px-2 py-1 text-xl leading-none rounded-lg hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-teal-900">Validity Period</p>
              <p className="text-teal-800 mt-0.5">
                All SG60 Vouchers are valid for use from 2025 through <strong>31 December 2026</strong>.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
            <Store className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">Where can I spend them?</p>
              <p className="text-amber-800 mt-0.5">
                • <strong>SG60 Vouchers:</strong> Accepted at participating hawkers and heartland merchants (look for the SG60/CDC decal).
                <br />
                • <strong>SG60 Supermarket Vouchers:</strong> Accepted at major participating supermarket chains across Singapore.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#0F1F4A]">Frequently Asked Questions</h4>

            <div className="border border-gray-200 rounded-xl p-3 space-y-1">
              <p className="font-semibold text-gray-900">How do I spend vouchers?</p>
              <p className="text-gray-600">
                Select your voucher, enter the exact amount requested by the merchant, tap 'Generate QR', and present the QR code for scanning.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-3 space-y-1">
              <p className="font-semibold text-gray-900">Can I share my vouchers with household members?</p>
              <p className="text-gray-600">
                Yes! Tap 'Share vouchers' to generate a unique household link via SMS or WhatsApp.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="text-[#991b1b]">
              <strong>Scam Warning:</strong> Government officials will NEVER request your Singpass password or SMS OTP to claim SG60 Vouchers.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 bg-[#0F1F4A] text-white font-bold text-xs rounded-xl hover:bg-[#1a2e63] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
