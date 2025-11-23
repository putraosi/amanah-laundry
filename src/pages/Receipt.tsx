import * as htmlToImage from "html-to-image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { dayNames, monthNames } from "@/utils/array";

interface ServiceItem {
  name: string;
  quantity: number;
  price: number;
  type: number;
}

const Receipt = () => {
  const receiptRef = useRef(null);

  const [customerName, setCustomerName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [notes, setNotes] = useState("");
  const [services, setServices] = useState<ServiceItem[]>([
    { name: "Setrika Reguler", quantity: 0, price: 5000, type: 2 },
    { name: "Setrika Express", quantity: 0, price: 6000, type: 2 },
    { name: "Setrika Express", quantity: 0, price: 7000, type: 2 },
    { name: "Cuci Lipat", quantity: 0, price: 5000, type: 1 },
    { name: "Cuci Reguler", quantity: 0, price: 7000, type: 1 },
    { name: "Cuci Express", quantity: 0, price: 9000, type: 1 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState(0);
  const [checked, setChecked] = useState(false);

  const generateReceiptId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const getCurrentDate = () => {
    const now = new Date();

    const dayName = dayNames[now.getDay()];
    const day = String(now.getDate()).padStart(2, "0");
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  };

  const calculateSubtotal = () => {
    return services.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - discount;
  };

  const calculateChange = () => {
    return payment - calculateTotal();
  };

  const updateServiceQuantity = (index: number, delta: number) => {
    const newServices = [...services];
    newServices[index].quantity = Math.max(
      0,
      newServices[index].quantity + delta
    );
    setServices(newServices);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("id-ID");
  };
  
  const onReset = () => {
    const reset = services.map((item) => ({
      ...item,
      quantity: 0,
    }));

    setServices(reset);
  };

  const shareToWhatsApp = async () => {
    const node = receiptRef.current;

    if (!node) return alert("Receipt tidak ditemukan!");

    try {
      // convert to blob
      const dataUrl = await htmlToImage.toPng(node);
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      const file = new File([blob], "receipt.png", { type: "image/png" });
      // const text = "Halo, ini struk pesanan Anda.";
      const text = `Bismillah,
Mohon maaf mengganggu waktu istirahatnya.

Alhamdulillah, setrikaannya sudah selesai.
InsyaAllah, *besok pagi* di antar.

Terimakasih banyak🙏😊`;

      // ---- MOBILE SHARE (Android / iOS) ----
      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            text: text,
            title: "Kirim Struk",
          });
          return;
        } catch (err) {
          console.warn("Share failed, fallback to WA Web", err);
        }
      }

      // ---- WHATSAPP WEB fallback ----
      const msg = "Halo, ini struk pesanan Anda.";
      const phone = ""; // optional: nomor tujuan

      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);

      // download image (karena tidak bisa attach di web)
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "receipt.png";
      a.click();
    } catch (error) {
      console.error(error);
      alert("Gagal membuat gambar!");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Buat Kwitansi
          </h1>
          <p className="text-muted-foreground">
            Buat dan bagikan kwitansi laundry via WhatsApp
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Section */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between ">
                  <Label>Layanan</Label>
                  <button onClick={onReset} className="text-red-400 text-sm">
                    Reset
                  </button>
                </div>
                {services.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-sm font-medium">{service.name}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateServiceQuantity(index, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={service.quantity}
                        onChange={(e) => {
                          const newServices = [...services];
                          newServices[index].quantity = Math.max(
                            0,
                            parseFloat(e.target.value) || 0
                          );
                          setServices(newServices);
                        }}
                        className="text-center"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateServiceQuantity(index, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm whitespace-nowrap">
                        x Rp {formatCurrency(service.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="discount">Diskon (Rp)</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={checked}
                  onClick={() => setChecked((prev) => !prev)}
                />
                <label className="text-sm">Diskon 5%</label>
              </div>

              <Button onClick={shareToWhatsApp} className="w-full" size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Bagikan via WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card ref={receiptRef}>
            <CardContent className="pt-6">
              <div className="bg-card p-6 rounded-lg border-2 border-dashed border-border font-mono text-sm">
                <div className="w-full items-center justify-center flex">
                  <span className="font-semibold text-base">
                    Amanah Laundry Cibogo
                  </span>
                </div>

                <div className="border-t border-dashed border-border my-2"></div>
                <div className="flex justify-between mb-2">
                  <span>Tanggal</span>
                  <span>{getCurrentDate()}</span>
                </div>
                <div className="border-t border-dashed border-border my-2"></div>

                <div className="space-y-3 my-4">
                  {services.map((service, index) =>
                    service.quantity > 0 ? (
                      <div key={index}>
                        <div className="font-bold">{service.name}</div>
                        <div className="flex justify-between">
                          <span>
                            {service.quantity.toFixed(1)} x{" "}
                            {formatCurrency(service.price)}
                          </span>
                          <span>
                            {formatCurrency(service.quantity * service.price)}
                          </span>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
                <div className="border-t border-dashed border-border my-2"></div>

                <div className="space-y-1 mt-4">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diskon</span>
                    <span>{formatCurrency(discount)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
