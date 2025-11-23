import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Clock, Truck, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">Laundry Profesional</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Layanan Laundry
            <br />
            <span className="text-primary">Cepat & Bersih</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nikmati layanan laundry berkualitas dengan sistem kwitansi digital yang mudah dibagikan via WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/receipt">
                <FileText className="mr-2 h-5 w-5" />
                Buat Kwitansi
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <a href="#services">Lihat Layanan</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Layanan Kami</h2>
            <p className="text-muted-foreground text-lg">Pilihan layanan yang sesuai dengan kebutuhan Anda</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Reguler (2-3 Hari)</CardTitle>
                <CardDescription>Layanan lengkap cuci dan setrika</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">Rp 7.000</div>
                <p className="text-sm text-muted-foreground">per kilogram</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    Cuci bersih maksimal
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    Setrika rapi
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    Wangi segar
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Express (24 Jam)</CardTitle>
                <CardDescription>Layanan cepat untuk kebutuhan mendesak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">Rp 9.000</div>
                <p className="text-sm text-muted-foreground">per kilogram</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                    Selesai 24 jam
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                    Prioritas tertinggi
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                    Kualitas terjamin
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Antar Jemput</CardTitle>
                <CardDescription>Layanan ongkir untuk kenyamanan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">Rp 2.000</div>
                <p className="text-sm text-muted-foreground">per perjalanan (&gt;2 km)</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    Jemput di lokasi
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    Antar ke rumah
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    Tepat waktu
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Buat Kwitansi Digital Sekarang
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Sistem kwitansi modern yang bisa langsung dibagikan ke pelanggan via WhatsApp
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/receipt">
              <FileText className="mr-2 h-5 w-5" />
              Mulai Buat Kwitansi
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Laundry Service. Layanan terbaik untuk pakaian bersih Anda.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
