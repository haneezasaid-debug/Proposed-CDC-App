import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, RefreshCw, Store } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { VoucherCategory } from '../types';

interface ScreenQrDisplayProps {
  category: VoucherCategory;
  amount: number;
  onBack: () => void;
  onCompleteRedemption: (merchantName: string) => void;
}

export const ScreenQrDisplay: React.FC<ScreenQrDisplayProps> = ({
  category,
  amount,
  onBack,
  onCompleteRedemption,
}) => {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(300); // 5 minutes timer
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  // Generate unique code string on mount
  useEffect(() => {
    const code = `SG60-${category.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}-${amount.toFixed(2)}`;
    setQrCodeData(code);
  }, [category, amount]);

  // Countdown timer
  useEffect(() => {
    if (timeLeftSeconds <= 0 || isRedeemed) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeftSeconds, isRedeemed]);

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSimulateScan = () => {
    setIsRedeemed(true);
  };

  const handleDone = () => {
    const defaultMerchants = [
      'Canberra Hawker Centre #01-12',
      'NTUC FairPrice Canberra Plaza',
      'Kopitiam @ Canberra',
      'Sheng Siong Supermarket',
    ];
    const randomMerchant =
      defaultMerchants[Math.floor(Math.random() * defaultMerchants.length)];

    onCompleteRedemption(randomMerchant);
  };

  const categoryTitle =
    category === 'sg60' ? 'SG60 Vouchers' : 'SG60 Supermarket Vouchers';

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
        </div>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-black tracking-tight text-white">
            {categoryTitle}
          </h1>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 p-3 flex flex-col justify-between max-w-md mx-auto w-full">
        {/* WHITE ROUNDED QR CARD */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/90 space-y-3 text-center relative overflow-hidden">
          {/* TOP ROW: SHOW TO SHOP (Left) & DOLLAR AMOUNT (Right) */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Show to shop
            </span>
            <div className="text-2xl font-black text-[#0F1F4A]">
              ${amount.toFixed(2)}
            </div>
          </div>

          {/* QR CODE DISPLAY OR SUCCESS STATE */}
          {!isRedeemed ? (
            <div className="space-y-2.5 py-1">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 inline-block mx-auto relative shadow-inner">
                {/* QR CODE SVG */}
                <div className="relative p-1.5 bg-white rounded-lg shadow-xs">
                  <QRCodeSVG
                    value={qrCodeData || 'SG60-VOUCHER'}
                    size={170}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%23d32f2f"/><text x="50" y="42" font-size="28" font-weight="900" text-anchor="middle" fill="white">SG</text><text x="50" y="74" font-size="34" font-weight="900" text-anchor="middle" fill="white">60</text></svg>',
                      x: undefined,
                      y: undefined,
                      height: 36,
                      width: 36,
                      excavate: true,
                    }}
                  />
                </div>
              </div>

              {/* TIMER COUNTDOWN */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-100 rounded-full py-1 px-3 w-fit mx-auto border border-slate-200/80">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>QR expires in: <strong className="font-mono text-slate-900">{formattedTime}</strong></span>
              </div>

              <p className="text-[11px] font-bold text-slate-500">
                Use by 31 Dec 2026
              </p>
            </div>
          ) : (
            /* REDEMPTION SUCCESS STATE */
            <div className="py-4 space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Redemption Successful!
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  You have spent <strong className="text-slate-900">${amount.toFixed(2)}</strong> from your {categoryTitle}.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-800 font-medium">
                Verified by merchant scanner
              </div>
            </div>
          )}

          {/* SIMULATE MERCHANT SCAN BUTTON (DEMO AID) */}
          {!isRedeemed ? (
            <button
              onClick={handleSimulateScan}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-bold text-xs rounded-full shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Store className="w-4 h-4" />
              <span>Simulate Merchant Scan</span>
            </button>
          ) : (
            <button
              onClick={handleDone}
              className="w-full py-2.5 bg-[#0F1F4A] hover:bg-[#1a2e63] active:scale-[0.98] text-white font-black text-xs rounded-full shadow-md transition-all cursor-pointer"
            >
              Done & Return to Home
            </button>
          )}
        </div>

        {/* FOOTER */}
        <footer className="py-2.5 text-center text-[10px] font-bold text-slate-400 select-none tracking-wider">
          <span>BUILT BY </span>
          <span className="font-mono text-slate-500">( )</span>
          <span> OPEN GOVERNMENT PRODUCTS</span>
        </footer>
      </div>
    </div>
  );
};
