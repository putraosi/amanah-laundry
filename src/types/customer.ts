export type LaundryStatus = 
  | 'antrian' 
  | 'cuci' 
  | 'setrika' 
  | 'ready' 
  | 'selesai';

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
