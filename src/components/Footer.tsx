import { Key, Phone, MapPin, Mail, Heart } from "lucide-react";
import { LOCATION, PHONE } from "../constantas/string";
import { scrollToSection } from "../helper/handler";
const phone = PHONE.slice(1).replace(/\-/g, "");

const Footer = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Halo Home Key, saya ingin bertanya tentang layanan duplikat kunci"
    );
    window.open(`https://wa.me/62${phone}?text=${message}`, "_blank");
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-2 rounded-full">
                <Key className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Home Key</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Solusi terpercaya untuk semua kebutuhan duplikat kunci Anda.
              Melayani dengan profesional sejak 2012.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-yellow-400">
              Layanan Kami
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Duplikat Kunci Rumah
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Kunci Motor & Mobil
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Kunci Kantor
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Service & Perbaikan
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Kunci Anti Maling
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Master Key System
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-red-400">Info Penting</h4>
            <ul className="space-y-2 text-gray-400">
              <li
                onClick={() => scrollToSection("home")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Tentang Kami
              </li>
              <li
                onClick={() => scrollToSection("features")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Daftar Harga
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Garansi
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-yellow-400">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span>{PHONE}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                <span>{LOCATION}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <p className="text-sm text-gray-400 mb-3">Ikuti Kami:</p>
              <div className="flex gap-3">
                <div
                  onClick={handleWhatsAppClick}
                  className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors"
                >
                  <span className="text-xs font-bold">WA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center">
              © 2025 Home Key. Semua hak dilindungi undang-undang.
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Dibuat dengan</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>di Tangerang</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
