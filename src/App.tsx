import React, { useState } from 'react';
import { ScreenType, VoucherCategory, RedemptionRecord, LanguageOption } from './types';
import { GovernmentHeader } from './components/GovernmentHeader';
import { ScreenLanding } from './components/ScreenLanding';
import { ScreenAmountEntry } from './components/ScreenAmountEntry';
import { ScreenQrDisplay } from './components/ScreenQrDisplay';
import { InfoModal } from './components/InfoModal';
import { ShareModal } from './components/ShareModal';
import { HistoryModal } from './components/HistoryModal';
import { WhereToUseModal } from './components/WhereToUseModal';
import { MobileFrame } from './components/MobileFrame';

export default function App() {
  // Navigation & Voucher State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [selectedCategory, setSelectedCategory] = useState<VoucherCategory>('sg60');
  const [sg60Balance, setSg60Balance] = useState<number>(317);
  const [supermarketBalance, setSupermarketBalance] = useState<number>(300);
  const [amountStr, setAmountStr] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>('en');

  // History State
  const [historyRecords, setHistoryRecords] = useState<RedemptionRecord[]>([
    {
      id: 'rec-init-1',
      category: 'sg60',
      amount: 8.5,
      merchantName: 'Chong Pang Market & Food Centre',
      timestamp: new Date(Date.now() - 86400000 * 2),
      code: 'SG60-8832',
    },
  ]);

  // Modal States
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isWhereToUseOpen, setIsWhereToUseOpen] = useState(false);

  // Handlers
  const handleOpenCategory = (cat: VoucherCategory) => {
    setSelectedCategory(cat);
    setAmountStr(''); // Reset amount entry
    setCurrentScreen('amount');
  };

  const handleGenerateQr = () => {
    setCurrentScreen('qr');
  };

  const handleCompleteRedemption = (merchantName: string) => {
    const numericAmount = parseFloat(amountStr) || 0;

    if (selectedCategory === 'sg60') {
      setSg60Balance((prev) => Math.max(0, prev - numericAmount));
    } else {
      setSupermarketBalance((prev) => Math.max(0, prev - numericAmount));
    }

    const newRecord: RedemptionRecord = {
      id: 'rec-' + Date.now(),
      category: selectedCategory,
      amount: numericAmount,
      merchantName,
      timestamp: new Date(),
      code: `SG60-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setHistoryRecords((prev) => [newRecord, ...prev]);
    setCurrentScreen('landing');
  };

  const handleResetBalances = () => {
    setSg60Balance(317);
    setSupermarketBalance(300);
    setHistoryRecords([]);
    setIsHistoryOpen(false);
  };

  const currentBalance =
    selectedCategory === 'sg60' ? sg60Balance : supermarketBalance;

  return (
    <MobileFrame>
      {/* Top Banner (Always present across all screens) */}
      <GovernmentHeader />

      {/* Screen 1: Landing Page */}
      {currentScreen === 'landing' && (
        <ScreenLanding
          sg60Balance={sg60Balance}
          supermarketBalance={supermarketBalance}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          onOpenCategory={handleOpenCategory}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
          onOpenInfo={() => setIsInfoOpen(true)}
          onOpenWhereToUse={() => setIsWhereToUseOpen(true)}
        />
      )}

      {/* Screen 2: Amount Entry */}
      {currentScreen === 'amount' && (
        <ScreenAmountEntry
          category={selectedCategory}
          balance={currentBalance}
          amountStr={amountStr}
          onAmountChange={setAmountStr}
          onBack={() => setCurrentScreen('landing')}
          onGenerateQr={handleGenerateQr}
          onOpenWhereToUse={() => setIsWhereToUseOpen(true)}
        />
      )}

      {/* Screen 3: QR Display */}
      {currentScreen === 'qr' && (
        <ScreenQrDisplay
          category={selectedCategory}
          amount={parseFloat(amountStr) || 0}
          onBack={() => setCurrentScreen('amount')}
          onCompleteRedemption={handleCompleteRedemption}
        />
      )}

      {/* Modals */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        records={historyRecords}
        onResetBalances={handleResetBalances}
      />
      <WhereToUseModal
        isOpen={isWhereToUseOpen}
        onClose={() => setIsWhereToUseOpen(false)}
      />
    </MobileFrame>
  );
}
