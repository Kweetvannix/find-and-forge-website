import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from "@/components/ui/theme-provider"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/medical-trends", label: "Medical Trends" },
    { href: "/ai-news", label: "AI News" },
    { href: "/medical-chatbot", label: "Medical Chatbot" },
    { href: "/faq", label: "FAQ" },
    { href: "/subscription", label: "Subscription" },
  ];

  const profileMenuItems = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Healthily.ai
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center space-x-2">
            {profileMenuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {theme === "light" ? <Moon className="h-5 w-5 text-gray-700" /> : <Sun className="h-5 w-5 text-gray-700" />}
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-gray-50 py-2 md:hidden">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {profileMenuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 py-2"
            >
              {theme === "light" ? <Moon className="h-5 w-5 text-gray-700" /> : <Sun className="h-5 w-5 text-gray-700" />}
              <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
