import {
  Key,
  Home,
  Car,
  Building,
  Shield,
  Wrench,
  KeySquare,
  RotateCcw,
  ShieldIcon,
  ShieldBan,
  ShieldX,
  ShieldCheck,
  
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "./ui/card";
import { PHONE } from "../constantas/string";

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: "Kunci Rumah",
      description: "Duplikat kunci rumah dengan berbagai jenis dan model",
      price: "Mulai 20K",
      color: "yellow",
    },
    {
      icon: KeySquare,
      title: "Kunci Motor",
      description: "Duplikat kunci kendaraan dengan teknologi terkini",
      price: "Mulai 35K",
      color: "red",
    },
    {
      icon: Car,
      title: "Kunci Mobil",
      description: "Duplikat kunci kendaraan dengan teknologi terkini",
      price: "Mulai 50K",
      color: "yellow",
    },
     {
      icon: RotateCcw,
      title: "Kunci Immobilizer",
      description: "Duplikat kunci kendaraan dengan teknologi terkini",
      price: "Mulai 350K",
      color: "red",
    },
    {
      icon: Building,
      title: "Kunci Kantor",
      description: "Solusi kunci untuk gedung perkantoran dan komersial",
      price: "Mulai 25K",
      color: "yellow",
    },
    {
      icon: Shield,
      title: "Kunci Anti Maling",
      description: "Kunci keamanan tinggi dengan sistem anti pembobolan",
      price: "Mulai 100K",
      color: "red",
    },
    {
      icon: Wrench,
      title: "Service Kunci",
      description: "Perbaikan dan perawatan semua jenis kunci",
      price: "Mulai 20K",
      color: "yellow",
    },
    {
      icon: Key,
      title: "Kunci Master",
      description: "Pembuatan sistem master key untuk multiple access",
      price: "Mulai 150K",
      color: "red",
    },
    {
      icon: ShieldCheck,
      title: "Brankas",
      description: "Solusi kunci untuk brankas",
      price: "Mulai 200K",
      color: "yellow",
    },
  ];

  const handleServiceClick = (serviceTitle: string) => {
    const phone = PHONE.slice(1).replace(/\-/g, "");
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan layanan ${serviceTitle}. Bisa minta info lebih lanjut?`
    );
    window.open(`https://wa.me/62${phone}?text=${message}`, "_blank");
  };

  const handleConsultationClick = () => {
    const phone = PHONE.slice(1).replace(/\-/g, "");
    const message = encodeURIComponent(
      "Halo, saya ingin konsultasi gratis tentang kebutuhan kunci saya"
    );
    window.open(`https://wa.me/62${phone}?text=${message}`, "_blank");
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Layanan
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              {" "}
              Kami
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berbagai layanan duplikat kunci profesional dengan kualitas terbaik
            dan harga terjangkau
          </p>
        </div>

        {/* Interactive Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-0 bg-white"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fade-in-up 0.6s ease-out forwards",
              }}
              onClick={() => handleServiceClick(service.title)}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 ${
                    service.color === "yellow"
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      : "bg-gradient-to-br from-red-400 to-red-600"
                  }`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div
                  className={`inline-block px-4 py-2 rounded-full text-white font-semibold mb-4 ${
                    service.color === "yellow"
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                      : "bg-gradient-to-r from-red-500 to-red-600"
                  }`}
                >
                  {service.price}
                </div>

                <Button
                  className="w-full mt-2 bg-white border-2 border-gray-300 text-gray-700 hover:border-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-300"
                  variant="outline"
                >
                  Pesan Sekarang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Butuh Layanan Khusus?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Konsultasikan kebutuhan kunci Anda dengan ahli kami
            </p>
            <Button
              className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleConsultationClick}
            >
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
