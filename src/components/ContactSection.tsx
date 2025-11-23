import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { LOCATION, PHONE } from "../constantas/string";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
const phone = PHONE.slice(1).replace(/\-/g, "");

const ContactSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Halo Home Key, saya ingin bertanya tentang layanan duplikat kunci"
    );
    window.open(`https://wa.me/62${phone}?text=${message}`, "_blank");
  };

  const handlePhoneClick = () => {
    window.open(`tel:0${phone}`, "_self");
  };

  const handleEmergencyClick = () => {
    const message = encodeURIComponent(
      "DARURAT! Saya butuh bantuan layanan kunci darurat sekarang!"
    );
    window.open(`https://wa.me/62${phone}?text=${message}`, "_blank");
  };

  const handleLocationClick = () => {
    window.open(`https://maps.app.goo.gl/ZEoKVHYhbzRnugQ78`, "_blank");
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Hubungi
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              {" "}
              Kami
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Siap melayani Anda kapan saja. Hubungi kami untuk konsultasi gratis
            atau pemesanan langsung
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Interactive Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Card
                className="hover:shadow-lg transition-all duration-300 border-0 cursor-pointer"
                onClick={handlePhoneClick}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-red-500 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Telepon</h3>
                      <p className="text-gray-600">{PHONE}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-all duration-300 border-0 cursor-pointer"
                onClick={handleLocationClick}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-red-400 to-yellow-500 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Alamat</h3>
                      <p className="text-gray-600">
                        {LOCATION}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-red-500 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Jam Operasional
                      </h3>
                      <p className="text-gray-600">
                        Senin - Minggu: 08:00 - 20:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Quick Action Buttons */}
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp: {PHONE}
              </Button>

              <Button
                variant="outline"
                className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                onClick={handlePhoneClick}
              >
                <Phone className="mr-2 h-5 w-5" />
                Telepon Langsung
              </Button>
            </div>
          </div>

          {/* Interactive Map and Emergency Service */}
          <div className="space-y-6">
            <Card
              className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={handleLocationClick}
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-yellow-400 to-red-500 h-64 rounded-lg flex items-center justify-center text-white hover:from-yellow-500 hover:to-red-600 transition-all duration-300">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 animate-bounce-slow" />
                    <h3 className="text-2xl font-bold">Lokasi Strategis</h3>
                    <p className="text-yellow-100">
                      Mudah dijangkau dari berbagai arah
                    </p>
                    <p className="text-sm text-yellow-200 mt-2">
                      Klik untuk buka di Maps
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Emergency Service Card */}
            <Card
              className="border-0 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 cursor-pointer"
              onClick={handleEmergencyClick}
            >
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Layanan Darurat 24 Jam
                </h3>
                <p className="text-red-100 mb-6">
                  Terkunci di luar rumah? Kunci patah? Hubungi kami kapan saja!
                </p>
                <Button className="bg-white text-red-600 hover:bg-yellow-50 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Panggil Sekarang
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
