export type ScreenType = 'landing' | 'amount' | 'qr';

export type VoucherCategory = 'sg60' | 'supermarket';

export interface VoucherState {
  sg60Balance: number;
  supermarketBalance: number;
  selectedCategory: VoucherCategory;
  currentAmountStr: string;
}

export interface RedemptionRecord {
  id: string;
  category: VoucherCategory;
  amount: number;
  merchantName: string;
  timestamp: Date;
  code: string;
}

export type LanguageOption = 'en' | 'zh' | 'ms' | 'ta';
