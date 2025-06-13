"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, User, Menu, Dock } from "lucide-react"; // Asegúrate de tener estos íconos instalados
// import { Button } from "react-day-picker";

import React, { useState, useEffect } from "react";

type SectionName = "inicio" | "servicios" | "vehiculos" | "nosotros" | "contacto";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionName>("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNavClick(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(sectionId as SectionName);
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionName[] = [
        "inicio",
        "servicios",
        "vehiculos",
        "nosotros",
        "contacto",
      ];
      let currentSection: SectionName = "inicio";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur-lg supports-[backdrop-filter]:bg-black/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {" "}
            <Link
              href="#inicio"
              className="flex items-center"
              onClick={() => handleNavClick("inicio")}
            >
              {" "}
              {/* Logo - Usando el nuevo logo.jpg */}{" "}
              <div className="relative h-12 w-12 mr-2">
                <Image
                  src="/logo.jpg"
                  alt="ISR Performance Mendoza Logo"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                ISR
              </span>
              <span className="mx-2 font-bold text-white">|</span>
              <span className="text-2xl font-bold text-white">
                Performance
              </span>
              <span className="ml-1 text-sm text-zinc-400">Mendoza</span>
            </Link>
          </div>{" "}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "servicios", label: "Servicios" },

              { id: "vehiculos", label: "Trabajos" },
              { id: "nosotros", label: "Nosotros" },
              { id: "contacto", label: "Contacto" },
            ].map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative group",
                  activeSection === item.id
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id as SectionName);
                }}
              >
                {item.label}
                {activeSection === item.id ? (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                ) : (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                )}
              </Link>
            ))}
          </nav>{" "}
          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 mr-2">
              <a
                href="https://wa.me/5492615123456"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-green-500 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-blue-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            
            <Link
              className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-200 px-4 py-2 rounded"
              href="/turnos"
              type="button"
            >
              <Dock className="h-4 w-4" />
              <span>Turnos</span>
            </Link>

            <Link
              className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-200 px-4 py-2 rounded"
              href="/admin"
              type="button"
            >
              <User className="h-4 w-4" />
              <span>Admin</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors duration-200 rounded-full p-2"
              onClick={() => setIsMenuOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menú</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
