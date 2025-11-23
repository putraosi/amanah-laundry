import { Clock, Key, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { LOCATION, PHONE } from "../constantas/string";
import { Button } from "./ui/button";
import { scrollToSection } from "../helper/handler";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactClick = () => {
    const phone = PHONE.slice(1).replace(/\-/g, "");
    window.open(`https://wa.me/62${phone}`, "_blank");
  };

  const handleTo = (name: string) => {
    scrollToSection(name);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-l from-yellow-500 to-red-500 text-white shadow-lg">
      {/* Top Info Bar */}
      <div className="bg-red-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center text-sm">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => window.open("tel:081234567890")}
                className="flex items-center gap-1 hover:text-yellow-200 transition-colors cursor-pointer"
              >
                <Phone size={14} />
                <span>{PHONE}</span>
              </button>
              <div className="flex items-center gap-1 hidden lg:flex">
                <MapPin size={14} />
                <span>{LOCATION}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <div className="flex flex-row gap-1">
                <span className="hidden sm:flex">Buka Setiap Hari:</span>
                <span>08:00 - 20:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleTo("home")}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-white rounded-full animate-bounce-slow">
              {/* <Key className="h-8 w-8 text-yellow-500" /> */}
              <img src='/logo-xl.png' alt="logo" className="h-12 w-12 rounded-full" />
            </div>
            <div className="items-start flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold">Home Key</h1>
              <p className="text-yellow-100">Duplikat Kunci Profesional</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-black100">
            <button
              onClick={() => {
                handleTo("home");
              }}
              className="hover:font-bold transition-colors"
            >
              Beranda
            </button>
            <button
              onClick={() => handleTo("services")}
              className="hover:font-bold transition-colors"
            >
              Layanan
            </button>
            <button
              onClick={() => handleTo("features")}
              className="hover:font-bold transition-colors"
            >
              Tentang
            </button>
            <button
              onClick={() => handleTo("contact")}
              className="hover:font-bold transition-colors"
            >
              Kontak
            </button>
            <Button
              variant="secondary"
              className="bg-white text-red-600 hover:bg-yellow-100"
              onClick={handleContactClick}
            >
              Hubungi Sekarang
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-yellow-300">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleTo("home")}
                className="text-left hover:text-yellow-200 transition-colors"
              >
                Beranda
              </button>
              <button
                onClick={() => handleTo("services")}
                className="text-left hover:text-yellow-200 transition-colors"
              >
                Layanan
              </button>
              <button
                onClick={() => handleTo("features")}
                className="text-left hover:text-yellow-200 transition-colors"
              >
                Tentang
              </button>
              <button
                onClick={() => handleTo("contact")}
                className="text-left hover:text-yellow-200 transition-colors"
              >
                Kontak
              </button>
              <Button
                variant="secondary"
                className="bg-white text-red-600 hover:bg-yellow-100 w-full"
                onClick={handleContactClick}
              >
                Hubungi Sekarang
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
