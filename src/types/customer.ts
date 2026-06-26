export type LaundryStatus = 'antrian' | 'cuci' | 'setrika' | 'ready' | 'selesai';

export type DiscountType = 'percentage' | 'flat';

export type InterChoiceType = 'this_morning' | 'tomorrow' | 'afternoon' | 'evening' | 'night';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  items: string;
  status: LaundryStatus;
  createdAt: Date;
  notes?: string;
}

export const STATUS_LABELS: Record<LaundryStatus, string> = {
  antrian: 'Antrian',
  cuci: 'Sedang Cuci',
  setrika: 'Sedang Setrika',
  ready: 'Ready',
  selesai: 'Selesai',
};

export const STATUS_COLORS: Record<LaundryStatus, string> = {
  antrian: 'status-queue',
  cuci: 'status-washing',
  setrika: 'status-ironing',
  ready: 'status-ready',
  selesai: 'status-completed',
};

export const DISCOUNT_TYPES: Record<DiscountType, string> = {
  percentage: 'Persen',
  flat: 'Nominal',
};

export const INTER_CHOICE_TYPES: Record<InterChoiceType, string> = {
  this_morning: 'Pagi Ini',
  tomorrow: 'Besok Pagi',
  afternoon: 'Nanti Siang',
  evening: 'Nanti Sore',
  night: 'Nanti Malam',
};
