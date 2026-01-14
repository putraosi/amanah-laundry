import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceProps } from "@/types/service";
import { useState } from "react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface AddServiceDialogProps {
  onAddService: (Service: Omit<ServiceProps, "id" | "createdAt">) => void;
}

export const AddServiceDialog = ({ onAddService }: AddServiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ServiceProps>({
    style: "secondary",
    name: "",
    quantity: "",
    price: "",
    type: 0,
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
            <Label htmlFor="name">Jenis</Label>

            <RadioGroup
              defaultValue={String(formData?.type)}
              onValueChange={(value) =>
                setFormData({ ...formData, type: Number(value) })
              }
              className="flex flex-row gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Cuci</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Setrika</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="0" />
                <Label htmlFor="0">Lainnya</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Jaket"
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
