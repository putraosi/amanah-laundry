import { ImgLogo2 } from "@/assets";
import { AddServiceDialog } from "@/components/AddCustomerDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DISCOUNT_TYPES, type DiscountType } from "@/types/customer";
import type { ServiceProps } from "@/types/service";
import { dayNames, monthNames } from "@/utils/array";
import { formatCurrency } from "@/utils/formatter";
import { REGEX_NUMBER_DECIMAL } from "@/utils/regex";
import { Select } from "@radix-ui/react-select";
import * as htmlToImage from "html-to-image";
import { Minus, Plus, Share2 } from "lucide-react";
import { useRef, useState } from "react";

const DEFAULT_SERVICES = [
  { name: "Setrika Reguler", quantity: 0, price: 5000, type: 2, show: true },
  { name: "Setrika Express", quantity: 0, price: 6000, type: 2, show: true },
  { name: "Cuci Lipat", quantity: 0, price: 6000, type: 1, show: false },
  { name: "Cuci Reguler", quantity: 0, price: 7000, type: 1, show: true },
  { name: "Cuci Express", quantity: 0, price: 9000, type: 1, show: true },
  { name: "Cuci Kilat", quantity: 0, price: 13000, type: 1, show: false },
  { name: "Dryer", quantity: 0, price: 2500, type: 0, show: false },
  {
    name: "Bedcover",
    quantity: 0,
    price: 25000,
    type: 0,
    show: false,
    showInput: true,
  },
  {
    name: "Selimut",
    quantity: 0,
    price: 10000,
    type: 0,
    show: false,
    showInput: true,
  },
  {
    name: "Sprei",
    quantity: 0,
    price: 12000,
    type: 0,
    show: false,
    showInput: true,
  },
  {
    name: "Karpet (p x l)",
    quantity: 0,
    price: 10000,
    type: 0,
    show: false,
    showInput: true,
  },
  {
    name: "Plastik Gantung",
    quantity: 0,
    price: 3000,
    type: 0,
    show: false,
    showInput: true,
  },
  { name: "Ongkir", quantity: 0, price: 2000, type: 0, show: false },
];

const Receipt = () => {
  const receiptRef = useRef(null);

  const [services, setServices] = useState<ServiceProps[]>(DEFAULT_SERVICES);
  const [isShowAll, setIsShowAll] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [discountType, setDiscountType] = useState<DiscountType>("flat");

  const calculateSubtotal = () => {
    return services.reduce(
      (sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0),
      0,
    );
  };

  const updateServiceQuantity = (index: number, delta: number) => {
    const newServices = [...services];
    newServices[index].quantity = Math.max(
      0,
      Number(newServices[index].quantity || 0) + delta,
    );
    setServices(newServices);
  };

  const onReset = () => {
    const reset = DEFAULT_SERVICES.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setServices(reset);
    setRemainingBalance("0");
    setDiscount("0")
    setDiscountType("flat")
    setIsShowAll(false)
  };

  const onValidation = () => {
    const hasValue = services.some((item) => Number(item.quantity || 0) > 0);

    if (!hasValue) {
      alert("Must be input one");
      return;
    }

    share();
  };

  const share = async () => {
    const node = receiptRef.current;

    if (!node) return alert("Receipt tidak ditemukan!");

    try {
      // convert to blob
      const dataUrl = await htmlToImage.toPng(node);
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      const file = new File([blob], `${generateReceiptId()}.png`, {
        type: "image/png",
      });
      const text = `Bismillah,
Mohon maaf mengganggu waktu istirahatnya.

Alhamdulillah, pesanannya sudah selesai.
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
      a.download = `${generateReceiptId()}.png`;
      a.click();
    } catch (error) {
      console.error(error);
      alert("Gagal membuat gambar!");
    }
  };

  const getSpecialDiscount = () => {
    let disc: number = 0;

    if (services?.length) {
      // const totalQty = filtered.reduce(
      //   (sum, item) => sum + Number(item.quantity || 0),
      //   0,
      // );

      // if (totalQty >= 10) {
      const totalPrice = services.reduce(
        (sum, item) =>
          sum + Number(item.quantity || 0) * Number(item.price || 0),
        0,
      );

      disc =
        discountType === "percentage"
          ? (totalPrice * Number(discount || 0)) / 100
          : Number(discount || 0);
      // }
    }

    return disc;
  };

  const handleAddCustomer = (data: Omit<ServiceProps, "id" | "createdAt">) => {
    const newService: ServiceProps = {
      ...data,
    };
    setServices([...services, newService]);
  };

  const specialDiscount = getSpecialDiscount();
  const totalDiscount = roundUpToThousand(specialDiscount);

  // ====== CALCULATION ======
  const subtotal = services.reduce(
    (sum, s) => sum + Number(s.quantity) * Number(s.price),
    0,
  );

  const weight = services.reduce(
    (sum, s) => (s.type === 1 || s.type === 2 ? sum + Number(s.quantity) : sum),
    0,
  );

  const rounded = getLastThreeDigits(subtotal);
  const isUnder3kg =
    weight > 0 && weight < 3 && rounded > 0 && subtotal < 21000;
  const total: number = isUnder3kg
    ? subtotal + 1000 - rounded
    : subtotal - rounded;

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
                <div className="flex justify-between items-center">
                  <Label>Layanan</Label>
                  <div className="flex items-center gap-4">
                    <AddServiceDialog onAddService={handleAddCustomer} />

                    <button onClick={onReset} className="text-red-400 text-sm">
                      Reset
                    </button>
                  </div>
                </div>
                {services.map((service, index) => {
                  if (!isShowAll && !service?.show) return null;
                  return (
                    <div key={index} className="space-y-2">
                      <p className="text-sm font-medium">{service.name}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateServiceQuantity(index, -1)}
                          className="aspect-square"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={service.quantity}
                          onChange={(e) => {
                            const newServices = [...services];
                            newServices[index].quantity =
                              e.target.value.replace(REGEX_NUMBER_DECIMAL, "");
                            setServices(newServices);
                          }}
                          className="text-center flex-1"
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateServiceQuantity(index, 1)}
                          className="aspect-square"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        {service?.showInput ? (
                          <div className="w-1/3 flex items-center gap-1 text-sm">
                            <span>x</span>
                            <Input
                              type="text"
                              inputMode="numeric"
                              value={formatCurrency(Number(service.price || 0))}
                              onChange={(e) => {
                                const newServices = [...services];
                                newServices[index].price = e.target.value
                                  .replace(/\./g, "")
                                  .replace(REGEX_NUMBER_DECIMAL, "");
                                setServices(newServices);
                              }}
                              className="flex-1"
                            />
                          </div>
                        ) : (
                          <span className="w-1/3 text-sm whitespace-nowrap">
                            x Rp {formatCurrency(Number(service.price || 0))}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {isShowAll && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Diskon</p>
                    <div className="flex gap-4">
                      <Input
                        type="number"
                        inputMode="numeric"
                        value={formatCurrency(Number(discount || 0))}
                        onChange={(e) => {
                          const newValue = e.target.value
                            .replace(/\./g, "")
                            .replace(REGEX_NUMBER_DECIMAL, "");
                          setDiscount(newValue);
                        }}
                        className="text-center flex-1"
                      />

                      <div className="w-1/3">
                        <Select
                          value={discountType}
                          onValueChange={(value) =>
                            setDiscountType(value as DiscountType)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(DISCOUNT_TYPES).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Sisa Saldo</p>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={formatCurrency(Number(remainingBalance || 0))}
                      onChange={(e) =>
                        setRemainingBalance(
                          e?.target?.value
                            .replace(/\./g, "")
                            .replace(REGEX_NUMBER_DECIMAL, ""),
                        )
                      }
                      className="text-center flex-1"
                    />
                  </div>
                </>
              )}

              <div
                onClick={() => setIsShowAll((prev) => !prev)}
                className="flex item-center gap-2 cursor-pointer"
              >
                <Checkbox checked={isShowAll} />
                <Label className="cursor-pointer">Show All</Label>
              </div>

              <Button onClick={onValidation} className="w-full" size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Bagikan via WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card ref={receiptRef} className="p-1">
            <CardContent className="p-1">
              <div className="bg-card p-2 rounded-lg border-2 border-dashed border-border font-mono text-sm">
                <div className="w-full items-center justify-center flex">
                  <img src={ImgLogo2} alt="logo" className="w-auto h-8" />
                </div>

                <div className="border-t border-dashed border-border my-2"></div>
                <div className="flex justify-between mb-2">
                  <span>Tanggal</span>
                  <span>{getCurrentDate()}</span>
                </div>
                <div className="border-t border-dashed border-border my-2"></div>

                <div className="space-y-3 my-4">
                  {services.map((service, index) =>
                    Number(service.quantity) > 0 ? (
                      <div key={index}>
                        <div className="font-bold">{service.name}</div>
                        <div className="flex justify-between">
                          <span>
                            {Number(service.quantity).toFixed(1)} x{" "}
                            {formatCurrency(Number(service.price || 0))}
                          </span>
                          <span>
                            {formatCurrency(
                              Number(service.quantity) *
                                Number(service.price || 0),
                            )}
                          </span>
                        </div>
                      </div>
                    ) : null,
                  )}
                </div>
                <div className="border-t border-dashed border-border my-2"></div>

                <div className="space-y-1 mt-4">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Diskon{" "}
                      {specialDiscount && discountType === "percentage"
                        ? `${Number(discount)}%`
                        : ""}
                    </span>
                    <span>
                      {formatCurrency(
                        totalDiscount + (isUnder3kg ? 0 : rounded),
                      )}
                    </span>
                  </div>

                  {isUnder3kg && (
                    <div className="flex justify-between">
                      <span>{"Pembulatan <3kg"}</span>
                      <span>{formatCurrency(1000 - rounded)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total - totalDiscount)}</span>
                  </div>

                  {Number(remainingBalance || 0) > 0 && (
                    <div className="flex justify-between">
                      <span>Sisa Saldo</span>
                      <span>
                        {formatCurrency(Number(remainingBalance || 0) - total)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            {specialDiscount > 0 && (
              <p className="px-1 pb-1 text-[10px] text-black/50 italic">
                *Selamat! Anda mendapat diskon {discount}%.
              </p>
            )}
          </Card>
        </div>
      </div>

      <Button
        onClick={onValidation}
        size="icon"
        className="
    fixed
    top-4
    right-4
    md:hidden
    aspect-square
    rounded-full
  "
      >
        <Share2 className="w-2 h-auto" />
      </Button>
    </div>
  );
};

export default Receipt;

const roundUpToThousand = (num: number) => {
  return Math.ceil(num / 1000) * 1000;
};

const getLastThreeDigits = (num: number) => num % 1000;

const generateReceiptId = () => {
  return Math.random().toString(36).substring(2, 8);
};

const getCurrentDate = () => {
  const now = new Date();

  const dayName = dayNames[now.getDay()];
  const day = String(now.getDate()).padStart(2, "0");
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

