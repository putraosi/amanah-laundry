import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { ServiceProps } from "@/types/service";

interface AddServiceDialogProps {
  onAddService: (Service: Omit<ServiceProps, "id" | "createdAt">) => void;
}

export const AddServiceDialog = ({ onAddService }: AddServiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ServiceProps>({
    name: "",
    quantity: "",
    price: "",
    type: 2,
    show: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.quantity || !formData.price) {
      toast.error("Mohon isi semua field yang wajib");
      return;
    }

    onAddService(formData);
    setFormData({
      name: "",
      quantity: "",
      price: "",
      type: 2,
      show: true,
    });
    setOpen(false);
    toast.success("Service berhasil ditambahkan!");
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
            <Label htmlFor="name">Nama*</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Jumlah *</Label>
            <Input
              id="quantity"
              type="tel"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Harga *</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
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
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Tambah Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
