import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import beeIcon from 'figma:asset/ef25d03c2c8bc14e1c4ca571ab905dc20b4bec5f.png';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Pricing", id: "pricing" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" }
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 text-xl sm:text-2xl font-bold transition-colors group"
            >
              <img src={beeIcon} alt="RankBee" className="w-8 h-8 sm:w-12 sm:h-12" />
              <span className="text-gray-900 group-hover:text-primary transition-colors">
                Rank<span className="text-primary-light">Bee</span>
              </span>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => handleNavClick("demo")}
              variant="outline"
              className="border-cta text-cta hover:bg-cta/10"
            >
              Book Demo
            </Button>
            <Button
              className="bg-cta hover:bg-cta/90 text-cta-foreground"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <Button
                  onClick={() => handleNavClick("demo")}
                  variant="outline"
                  className="w-full border-cta text-cta hover:bg-cta/10"
                >
                  Book Demo
                </Button>
                <Button
                  onClick={() => handleNavClick("home")}
                  className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}