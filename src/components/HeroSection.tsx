import { Clock, Key, Shield, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { PHONE } from '../constantas/string';

const HeroSection = () => {
  const handleOrderClick = () => {
    const phone = PHONE.slice(1).replace(/\-/g, "");
    const message = encodeURIComponent(
      "Halo, saya ingin memesan layanan duplikat kunci"
    );
    window.open(`https://wa.me/62${phone}?text=${message}`, "_blank");
  };

  const handlePriceClick = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 flex items-center overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-400 rounded-full opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-12 h-12 bg-red-400 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 z-50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Duplikat Kunci
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
                  Cepat & Tepat
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Solusi terpercaya untuk semua kebutuhan duplikat kunci Anda.
                Dengan teknologi modern dan pengalaman bertahun-tahun.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">5 Menit</p>
                  <p className="text-sm text-gray-600">Proses Cepat</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="bg-red-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">99.99%</p>
                  <p className="text-sm text-gray-600">Presisi</p>
                </div>
              </div>
            </div>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
                onClick={handleOrderClick}
              >
                Pesan Sekarang
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:border-yellow-500 hover:text-yellow-600 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                onClick={handlePriceClick}
              >
                Lihat Harga
              </Button>
            </div>

            {/* Trust indicators */}
            {/* <div className="flex items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-600">4.9/5 Rating</span>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold text-yellow-600">1000+</span>{" "}
                Pelanggan Puas
              </div>
            </div> */}
          </div>

          {/* Right Content - Visual */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              {/* Main key illustration */}
              <div className="bg-gradient-to-br from-yellow-400 to-red-500 w-80 h-80 rounded-full flex items-center justify-center shadow-2xl animate-float">
                {/* <Key className="h-32 w-32 text-white" /> */}
                <img src='/logo-xl.png' alt="logo" className="h-80 w-80 rounded-full" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-full shadow-lg animate-bounce-slow">
                <Shield className="h-8 w-8 text-green-500" />
              </div>

              <div
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-full shadow-lg animate-bounce-slow"
                style={{ animationDelay: "1s" }}
              >
                <Clock className="h-8 w-8 text-blue-500" />
              </div>

              <div
                className="absolute top-1/2 -left-12 bg-white p-3 rounded-full shadow-lg animate-bounce-slow"
                style={{ animationDelay: "2s" }}
              >
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
