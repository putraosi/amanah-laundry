import { Award, Clock, MapPin, Shield, Users, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import { PHONE } from "../constantas/string";

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Proses Cepat",
      description: "Duplikat kunci dalam hitungan menit dengan presisi tinggi",
    },
    {
      icon: Shield,
      title: "Kualitas Terjamin",
      description: "Menggunakan material berkualitas dengan garansi kepuasan",
    },
    {
      icon: Award,
      title: "Berpengalaman",
      description: "Lebih dari 10 tahun melayani duplikat kunci di Tangerang",
    },
    {
      icon: Users,
      title: "Tim Profesional",
      description: "Teknisi berpengalaman dan terlatih khusus bidang kunci",
    },
    {
      icon: Wrench,
      title: "Peralatan Modern",
      description: "Menggunakan mesin cutting-edge untuk hasil sempurna",
    },
    {
      icon: MapPin,
      title: "Lokasi Strategis",
      description: "Mudah dijangkau dengan tempat parkir yang luas",
    },
  ];

  const handleFeatureClick = (featureTitle: string) => {
    const phone = PHONE.slice(1).replace(/\-/g, "");
    const message = encodeURIComponent(
      `Halo, saya ingin tahu lebih lanjut tentang ${featureTitle} di Home Key`
    );
    window.open(`https://wa.me/62${phone}?text=${message}`, "_blank");
  };

  const handleContactClick = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Mengapa Pilih
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              {" "}
              Home Key?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan layanan terbaik dengan kualitas yang
            tidak pernah mengecewakan
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl hover:bg-gradient-to-br hover:from-yellow-50 hover:to-red-50 transition-all duration-500 hover:shadow-xl cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fade-in-up 0.6s ease-out forwards",
              }}
              onClick={() => handleFeatureClick(feature.title)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-yellow-400 to-red-500 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-500 w-16 h-16 rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                <Button
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-yellow-600 hover:text-red-600"
                  size="sm"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Stats Section */}
        {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              number: "1000+",
              label: "Pelanggan Puas",
              action: "testimonials",
            },
            { number: "10+", label: "Tahun Pengalaman", action: "about" },
            { number: "50+", label: "Jenis Kunci", action: "services" },
            { number: "24/7", label: "Layanan Darurat", action: "emergency" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={handleContactClick}
            >
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium group-hover:text-yellow-600 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleContactClick}
          >
            Hubungi Kami Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
