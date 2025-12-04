import { AddCustomerDialog } from "@/components/AddCustomerDialog";
import { CustomerCard } from "@/components/CustomerCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Customer, LaundryStatus } from "@/types/customer";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Transaction = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Budi Santoso",
      phone: "08123456789",
      items: "2 kemeja, 3 celana",
      status: "cuci",
      createdAt: new Date(2024, 11, 1, 10, 30),
      notes: "Pakai pewangi extra",
    },
    {
      id: "2",
      name: "Siti Aminah",
      phone: "08198765432",
      items: "1 sprei, 4 handuk",
      status: "setrika",
      createdAt: new Date(2024, 11, 2, 14, 15),
    },
    {
      id: "3",
      name: "Ahmad Rizki",
      phone: "08567891234",
      items: "5 kaos, 2 jaket",
      status: "ready",
      createdAt: new Date(2024, 11, 2, 9, 0),
      notes: "Segera diambil",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("semua");

  const handleAddCustomer = (
    customerData: Omit<Customer, "id" | "createdAt">
  ) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setCustomers([newCustomer, ...customers]);
  };

  const handleStatusChange = (customerId: string, newStatus: LaundryStatus) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: newStatus }
          : customer
      )
    );
    toast.success("Status berhasil diupdate!");
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesStatus =
      filterStatus === "semua" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    semua: customers.length,
    antrian: customers.filter((c) => c.status === "antrian").length,
    cuci: customers.filter((c) => c.status === "cuci").length,
    setrika: customers.filter((c) => c.status === "setrika").length,
    ready: customers.filter((c) => c.status === "ready").length,
    selesai: customers.filter((c) => c.status === "selesai").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary" />
                Amanah Laundry
              </h1>
              <p className="text-muted-foreground mt-1">
                Kelola customer laundry dengan mudah
              </p>
            </div>
            <AddCustomerDialog onAddCustomer={handleAddCustomer} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau nomor telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border"
            />
          </div>
        </div>

        {/* Status Tabs */}
        <Tabs
          value={filterStatus}
          onValueChange={setFilterStatus}
          className="mb-8"
        >
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-muted">
            <TabsTrigger value="semua" className="gap-2">
              Semua <span className="text-xs">({statusCounts.semua})</span>
            </TabsTrigger>
            <TabsTrigger value="antrian" className="gap-2">
              Antrian <span className="text-xs">({statusCounts.antrian})</span>
            </TabsTrigger>
            <TabsTrigger value="cuci" className="gap-2">
              Cuci <span className="text-xs">({statusCounts.cuci})</span>
            </TabsTrigger>
            <TabsTrigger value="setrika" className="gap-2">
              Setrika <span className="text-xs">({statusCounts.setrika})</span>
            </TabsTrigger>
            <TabsTrigger value="ready" className="gap-2">
              Ready <span className="text-xs">({statusCounts.ready})</span>
            </TabsTrigger>
            <TabsTrigger value="selesai" className="gap-2">
              Selesai <span className="text-xs">({statusCounts.selesai})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filterStatus} className="mt-6">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🧺</div>
                <p className="text-xl text-muted-foreground">
                  {searchQuery
                    ? "Tidak ada customer yang cocok"
                    : "Belum ada customer"}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Transaction;
