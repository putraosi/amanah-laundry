import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ServiceProps } from '@/types/service';
import { useState } from 'react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { REGEX_NUMBER_DECIMAL } from '@/utils/regex';
import { formatCurrency } from '@/utils/formatter';

interface AddServiceDialogProps {
  onAddService: (Service: Omit<ServiceProps, 'id' | 'createdAt'>) => void;
}

export const AddServiceDialog = ({ onAddService }: AddServiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ServiceProps>({
    style: 'secondary',
    name: '',
    quantity: '',
    price: '',
    type: 0,
    show: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.quantity || !formData.price) {
      toast.error('Mohon isi semua field yang wajib');
      return;
    }

    onAddService(formData);
    setFormData({
      name: '',
      quantity: '',
      price: '',
      type: 2,
      show: true,
    });
    setOpen(false);
    toast.success('Service berhasil ditambahkan!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">Tambah</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Tambah Service Baru</DialogTitle>
          <DialogDescription>Masukkan informasi Service</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>

            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jaket"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Jumlah *</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={formData.quantity}
              onChange={(e) => {
                const newValue = e.target.value.replace(REGEX_NUMBER_DECIMAL, '');
                setFormData({ ...formData, quantity: newValue });
              }}
              placeholder="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Harga *</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={formatCurrency(Number(formData.price || 0))}
              onChange={(e) => {
                const newValue = e.target.value
                  .replace(/\./g, '')
                  .replace(REGEX_NUMBER_DECIMAL, '');
                setFormData({ ...formData, price: newValue });
              }}
              placeholder="0"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Batal
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Tambah Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
