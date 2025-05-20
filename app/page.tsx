"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Star,
  PenToolIcon as Tool,
  Shield,
  Car,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  ArrowUp,
  MessageSquare,
  DollarSign,
  Repeat,
  Tag,
  Search,
  CheckCircle2,
  Sparkle,
  CheckCircle,
  Settings,
  Sparkles,
  BadgeCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionName>("inicio");
  // Definir tipo para las secciones válidas
  type SectionName =
    | "inicio"
    | "servicios"
    | "vehiculos"
    | "nosotros"
    | "contacto";
  // Usar Record para permitir indexación con string
  const sectionRefs: Record<
    SectionName,
    React.RefObject<HTMLDivElement | null>
  > = {
    inicio: useRef(null),
    servicios: useRef(null),
    vehiculos: useRef(null),
    nosotros: useRef(null),
    contacto: useRef(null),
  };

  // Handle scroll events and section detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      // Determine active section
      const scrollPosition = window.scrollY + 100;
      for (const section in sectionRefs) {
        const element = sectionRefs[section as SectionName].current;
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section as SectionName);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleNavClick = (section: SectionName) => {
    setIsMenuOpen(false);
    setActiveSection(section);

    // Smooth scroll to section
    const element = sectionRefs[section].current;
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Account for header height
        behavior: "smooth",
      });
    }
  };

  // Featured cars data
  const featuredCars = [
    {
      id: 1,
      name: "Mercedes-Benz AMG GT",
      year: "2023",
      mileage: "10,000 km",
      price: "$85,000",
      image: "/mercedes-amg.jpg",
      condition: "usado",
      featured: true,
      financing: true,
    },
    {
      id: 2,
      name: "BMW M4 Competition",
      year: "2023",
      mileage: "15,000 km",
      price: "$75,000",
      image: "/bmw-m4.jpg",
      condition: "usado",
      featured: true,
      financing: true,
    },
    {
      id: 3,
      name: "Audi RS7 Sportback",
      year: "2022",
      mileage: "20,000 km",
      price: "$95,000",
      image: "/audi-rs7.jpg",
      condition: "consignacion",
      featured: true,
      financing: true,
    },
    {
      id: 4,
      name: "Toyota Corolla Cross",
      year: "2024",
      mileage: "0 km",
      price: "$45,000",
      image: "/toyota-corolla.jpg",
      condition: "0km",
      featured: false,
      financing: true,
    },
    {
      id: 5,
      name: "Volkswagen Taos",
      year: "2024",
      mileage: "0 km",
      price: "$42,000",
      image: "/vw-taos.jpg",
      condition: "0km",
      featured: false,
      financing: true,
    },
    {
      id: 6,
      name: "Ford Ranger Limited",
      year: "2023",
      mileage: "5,000 km",
      price: "$55,000",
      image: "/ford-ranger.jpg",
      condition: "consignacion",
      featured: false,
      financing: true,
    },
  ];

  // Filter cars based on active tab
  const filteredCars =
    activeTab === "todos"
      ? featuredCars
      : featuredCars.filter((car) => car.condition === activeTab);
  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title:
        "Potencia tu <span class='text-red-500'>experiencia</span> al volante",
      subtitle:
        "Descubre cómo nuestro servicio de chipeo profesional puede transformar el rendimiento de tu vehículo",
      image: "/4.jpg",
      cta: "Conocer Servicios",
    },
    {
      id: 2,
      title:
        "Sistemas de <span class='text-red-500'>Escape</span> de Alto Rendimiento",
      subtitle:
        "Mejora el sonido y potencia de tu vehículo con nuestras soluciones personalizadas",
      image: "/1.jpg",
      cta: "Ver Opciones",
    },
    {
      id: 3,
      title:
        "Reprogramaciones con <span class='text-red-500'>tecnología</span> avanzada",
      subtitle:
        "Optimiza el rendimiento de tu motor con nuestro servicio especializado de reprogramación",
      image: "/3.jpg",
      cta: "Solicitar Diagnóstico",
    },
  ];
  // Services data
  const services = [
    {
      title: "Chipeo",
      description:
        "Reprogramación electrónica profesional para camionetas y vehículos, mejorando la potencia, torque y rendimiento de combustible",
      icon: <Sparkles className="h-10 w-10 text-red-500" />,
      features: [
        "Mayor potencia y torque",
        "Mejor rendimiento de combustible",
        "Personalizado por vehículo",
      ],
    },
    {
      title: "Escapes",
      description:
        "Instalación y personalización de sistemas de escape de alta performance que mejoran el sonido y potencia de tu vehículo",
      icon: <Settings className="h-10 w-10 text-red-500" />,
      features: [
        "Escapes deportivos",
        "Sistemas completos",
        "Personalización de sonido",
      ],
    },
    {
      title: "Reprogramaciones",
      description:
        "Servicio especializado de reprogramación de centralitas para optimizar el rendimiento y eficiencia de tu vehículo",
      icon: <BadgeCheck className="h-10 w-10 text-red-500" />,
      features: [
        "Diagnóstico profesional",
        "Ajustes personalizados",
        "Mapeo avanzado de ECU",
      ],
    },
  ];
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Juan Pérez",
      role: "Cliente Chipeo",
      content:
        "Increíble el cambio en mi camioneta después del chipeo. Aumentó la potencia notablemente y mejoró el consumo de combustible. El equipo de ISR Performance Mendoza es extremadamente profesional.",
      rating: 5,
    },
    {
      id: 2,
      name: "María González",
      role: "Cliente Sistema de Escape",
      content:
        "Mi auto tiene un sonido espectacular gracias al nuevo sistema de escape. Trabajo impecable y atención personalizada. Totalmente recomendable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      role: "Cliente Reprogramación",
      content:
        "La reprogramación transformó por completo el rendimiento de mi vehículo. Ahora responde mucho mejor y es más eficiente. Gran trabajo técnico y excelente asesoramiento.",
      rating: 5,
    },
  ];

  // Get condition badge
  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "0km":
        return <Badge className="bg-green-500 hover:bg-green-600">0KM</Badge>;
      case "usado":
        return <Badge className="bg-blue-500 hover:bg-blue-600">USADO</Badge>;
      case "consignacion":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">
            CONSIGNACIÓN
          </Badge>
        );
      default:
        return null;
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
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

              <Button
                variant="default"
                className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-200"
                onClick={() => handleNavClick("contacto")}
              >
                <Phone className="h-4 w-4" />
                <span>Contactar</span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors duration-200 rounded-full"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-transform duration-300 transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {" "}
        <div className="container h-full flex flex-col py-8">
          {" "}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src="/logo.jpg"
                  alt="ISR Performance Mendoza Logo"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>              <div className="flex items-center">
                <span className="text-2xl font-bold text-white bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  ISR
                </span>
                <span className="mx-2 font-bold text-white">|</span>
                <span className="text-2xl font-bold text-white">
                  Performance
                </span>
                <span className="ml-1 text-sm text-zinc-400">Mendoza</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-zinc-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>{" "}
          <nav className="flex flex-col gap-6 text-center">
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
                  "text-xl font-medium py-3",
                  activeSection === item.id
                    ? "text-red-500"
                    : "text-zinc-200 hover:text-red-500"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id as SectionName);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Buscar por marca, modelo o año..."
                className="w-full bg-zinc-800 border-zinc-700 text-white pl-10 h-12 focus:border-red-500"
              />
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg"
              onClick={() => {
                handleNavClick("contacto");
                setIsMenuOpen(false);
              }}
            >
              Contactar
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="inicio"
          ref={sectionRefs.inicio}
          className="relative bg-black text-gray-200 border-b border-zinc-800 overflow-hidden"
        >
          {/* Background with depth effect */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
            <Image
              src={heroSlides[activeSlide].image}
              alt="Vehículo con modificaciones de ISR Performance Mendoza"
              fill
              className="object-cover object-center transition-opacity duration-1000"
              quality={100}
              priority
            />
          </div>

          {/* Main content */}
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="min-h-[80vh] flex flex-col justify-center py-24">
              <div className="max-w-2xl mx-auto lg:mx-0">
                {/* Premium badge */}
                <div className="inline-flex items-center rounded-full border border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/10 px-4 py-1.5 text-sm text-red-400 mb-6">
                  <Sparkle className="h-4 w-4 mr-2" />
                  <span>Experiencia Premium</span>
                </div>

                {/* Main title */}
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight sm:leading-tight md:leading-tight mb-4"
                  dangerouslySetInnerHTML={{
                    __html: heroSlides[activeSlide].title,
                  }}
                />

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-zinc-300 mb-8 max-w-lg">
                  {heroSlides[activeSlide].subtitle}
                </p>

                {/* Button group */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {" "}
                  <Button
                    className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                    onClick={() =>
                      window.open(
                        "https://www.deruedas.com.ar/bus.asp?codusr=202783",
                        "_blank"
                      )
                    }
                  >
                    <Car className="h-5 w-5 mr-2" />
                    {heroSlides[activeSlide].cta}
                  </Button>
                  <Button
                    className="flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 hover:border-zinc-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
                    onClick={() => handleNavClick("contacto")}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Contactar ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Slider indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "bg-red-500" : "bg-zinc-600"
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Bottom section (desktop only) */}
          <div className="hidden lg:block absolute bottom-8 left-0 right-0 z-10">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-500">
                  ISR Performance Mendoza · Taller Especializado
                </div>{" "}
                <div className="flex items-center gap-4">
                  <a
                    onClick={() =>
                      alert(
                        "Próximamente disponible - Perfil de Instagram en desarrollo"
                      )
                    }
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    onClick={() =>
                      alert(
                        "Próximamente disponible - Perfil de Facebook en desarrollo"
                      )
                    }
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section
          id="servicios"
          ref={sectionRefs.servicios}
          className="py-24 bg-black relative overflow-hidden border-t border-zinc-800"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-500 to-transparent"></div>
          </div>

          <div className="container relative z-10 px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-20">
              <span className="inline-flex items-center rounded-full border border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/10 px-4 py-1.5 text-sm text-red-400 mb-6">
                <Settings className="h-4 w-4 mr-2" />
                Soluciones Integrales
              </span>{" "}
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-4">
                Nuestros <span className="text-red-500">Servicios</span>
              </h2>
              <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed">
                Ofrecemos servicios especializados para maximizar el rendimiento
                y personalización de tu vehículo con tecnología de punta
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-red-500/30 hover:bg-zinc-900/80 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon */}
                  <div className="mb-6 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 p-4 w-16 h-16 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/40 transition-colors duration-300">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-zinc-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Work Process */}
            <div className="mt-32">
              <div className="text-center mb-20">
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Nuestro <span className="text-red-500">Proceso</span>
                </h3>
                <p className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
                  Un enfoque estructurado para garantizar la mejor experiencia
                  en cada paso
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Connection line */}
                <div className="hidden lg:block absolute top-[60px] left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>{" "}
                {[
                  {
                    step: "01",
                    title: "Diagnóstico",
                    description:
                      "Evaluamos tu vehículo mediante análisis computarizado para identificar las oportunidades de mejora",
                    icon: <MessageSquare className="h-6 w-6 text-red-500" />,
                  },
                  {
                    step: "02",
                    title: "Personalización",
                    description:
                      "Diseñamos un plan de modificación específico para tu vehículo según tus objetivos de rendimiento",
                    icon: <Search className="h-6 w-6 text-red-500" />,
                  },
                  {
                    step: "03",
                    title: "Implementación",
                    description:
                      "Aplicamos las modificaciones utilizando equipamiento especializado y técnicas avanzadas",
                    icon: <Settings className="h-6 w-6 text-red-500" />,
                  },
                  {
                    step: "04",
                    title: "Validación",
                    description:
                      "Realizamos pruebas exhaustivas para confirmar las mejoras de rendimiento y ajustar si es necesario",
                    icon: <CheckCircle className="h-6 w-6 text-red-500" />,
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:bg-zinc-900/80 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Step number */}
                      <div className="w-20 h-20 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center mb-6 group-hover:border-red-500/50 transition-colors duration-300">
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                          {step.step}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        {step.icon}
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors duration-200">
                        {step.title}
                      </h4>
                      <p className="text-zinc-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>{" "}
        {/* Featured Cars Section */}
        <section
          id="vehiculos"
          ref={sectionRefs.vehiculos}
          className="py-24 bg-zinc-950 relative overflow-hidden border-t border-zinc-800"
        >
          {/* Decorative background effect */}
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')]"></div>
          </div>

          <div className="container relative z-10 px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16">
              <span className="inline-flex items-center rounded-full border border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/10 px-4 py-1.5 text-sm text-red-400 mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                Vehículos Premium
              </span>{" "}
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Galería de <span className="text-red-500">Trabajos</span>
              </h2>
              <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed mb-12">
                Explora nuestra galería con los mejores trabajos realizados en
                chipeo, sistemas de escape y reprogramaciones para diversos
                vehículos
              </p>
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 w-full max-w-4xl">
                  {[
                    {
                      title: "Chipeo de Vehículos",
                      description:
                        "Mejoras de rendimiento y optimización de potencia para distintos tipos de vehículos",
                      icon: <BadgeCheck className="h-10 w-10 text-green-500" />,
                      color: "from-green-600 to-green-500",
                    },
                    {
                      title: "Sistemas de Escape",
                      description:
                        "Instalaciones personalizadas para mejorar el sonido y rendimiento del vehículo",
                      icon: <Award className="h-10 w-10 text-blue-500" />,
                      color: "from-blue-600 to-blue-500",
                    },
                    {
                      title: "Reprogramaciones",
                      description:
                        "Modificaciones específicas en la ECU para optimizar la potencia y eficiencia",
                      icon: <Repeat className="h-10 w-10 text-purple-500" />,
                      color: "from-purple-600 to-purple-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-red-500/30 hover:bg-zinc-900/80 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="mb-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 p-3 w-14 h-14 flex items-center justify-center border border-red-500/20">
                        {item.icon}
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}{" "}
                </div>

                <Link
                  href="https://www.deruedas.com.ar/bus.asp?codusr=202783"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium px-10 py-6 rounded-xl shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                  >
                    Ver Catálogo Completo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>{" "}
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Galería de Trabajos Realizados */}
        <section className="py-24 bg-zinc-900 relative overflow-hidden border-t border-zinc-800">
          <div className="container relative z-10 px-4 sm:px-6">
            {" "}
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full border border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/10 px-4 py-1.5 text-sm text-red-400 mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>+50 Proyectos Completados</span>
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Nuestros <span className="text-red-500">Mejores Trabajos</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed mb-12">
                Mira algunos de nuestros proyectos más destacados y descubre lo
                que podemos hacer por tu vehículo
              </p>
              <div className="flex justify-center gap-4 mb-12">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-zinc-400">Chipeo</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="text-zinc-400">Escapes</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span className="text-zinc-400">Reprogramaciones</span>
                </span>
              </div>
            </div>
            {/* Galería */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  image: "/1.jpg",
                  title: "BMW Serie 3",
                  description:
                    "Chipeo profesional para mayor potencia y rendimiento",
                },
                {
                  id: 2,
                  image: "/2.jpg",
                  title: "Audi RS5",
                  description: "Sistema de escape deportivo personalizado",
                },
                {
                  id: 3,
                  image: "/3.jpg",
                  title: "Mercedes AMG",
                  description: "Reprogramación y optimización de ECU",
                },
                {
                  id: 4,
                  image: "/4.jpg",
                  title: "Ford Raptor",
                  description: "Chipeo específico para camionetas 4x4",
                },
                {
                  id: 5,
                  image: "/5.jpg",
                  title: "Volkswagen Golf GTI",
                  description: "Sistema de escape de alto rendimiento",
                },
                {
                  id: 6,
                  image: "/6.jpg",
                  title: "Toyota Hilux",
                  description: "Optimización de potencia y consumo",
                },
                {
                  id: 7,
                  image: "/7.jpg",
                  title: "Audi S3",
                  description: "Paquete completo: chipeo + escape deportivo",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden border border-zinc-800 aspect-video hover:border-red-500/30 transition-all duration-300"
                >
                  {" "}
                  <Image
                    src={item.image}
                    alt={`${item.title} - ISR Performance Mendoza`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-110"
                  />
                  {/* Overlay siempre visible con gradiente en la parte inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                    {/* Badge para tipo de servicio */}
                    <div className="absolute top-4 right-4">
                      {item.description.includes("Chipeo") ? (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          Chipeo
                        </span>
                      ) : item.description.includes("escape") ? (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          Escape
                        </span>
                      ) : (
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          Reprogramación
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
                      {item.title}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                    </h3>
                    <p className="text-zinc-300 text-sm">{item.description}</p>
                  </div>{" "}
                  {/* Overlay adicional al hacer hover con botón */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Botón Ver Más */}
            <div className="flex justify-center mt-12">
              <Button
                size="lg"
                className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-8 py-6"
                onClick={() => alert("Próximamente más proyectos disponibles")}
              >
                Ver más trabajos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section
          id="nosotros"
          ref={sectionRefs.nosotros}
          className="py-24 bg-black relative overflow-hidden"
        >
          <div className="container relative z-10 px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-red-500 z-10" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-red-500 z-10" />{" "}
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src="/3.jpg"
                    alt="Trabajo destacado - Mercedes AMG - ISR Performance Mendoza"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <div className="absolute bottom-8 left-8">
                      <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full mb-2 inline-block">
                        Trabajo Destacado
                      </span>
                      <h4 className="text-xl text-white font-bold mt-2">
                        Mercedes AMG
                      </h4>
                      <p className="text-zinc-300 text-sm">
                        Reprogramación y optimización profesional
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-500 mb-4">
                  Nuestra Historia
                </div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Sobre ISR Performance Mendoza
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Con más de 8 años de experiencia en el sector de modificación
                  y mejora de vehículos, nos hemos consolidado como uno de los
                  talleres más innovadores y confiables de Mendoza,
                  especializados en{" "}
                  <span className="text-red-500 font-semibold">
                    chipeo de camionetas, sistemas de escape de alto rendimiento
                    y reprogramaciones profesionales
                  </span>
                  .
                </p>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  Nuestro compromiso es ofrecer servicios de la más alta calidad
                  técnica, utilizando tecnología de punta y garantizando mejoras
                  reales y medibles en el rendimiento de tu vehículo.
                </p>{" "}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-500/10 p-3 text-red-500">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold hover:text-red-500 transition-colors duration-200">
                        Tecnología Avanzada
                      </h3>
                      <p className="mt-2 text-zinc-400">
                        Equipamiento y software de última generación
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-500/10 p-3 text-red-500">
                      <Tool className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold hover:text-red-500 transition-colors duration-200">
                        Técnicos Certificados
                      </h3>
                      <p className="mt-2 text-zinc-400">
                        Personal altamente especializado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}{" "}
        <section className="py-24 bg-gradient-to-r from-black via-zinc-900 to-black relative overflow-hidden">
          <div className="container relative z-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                ¿Listo para mejorar el rendimiento de tu vehículo?
              </h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                Visita nuestro taller y descubre cómo podemos transformar tu
                experiencia de conducción con nuestros servicios especializados
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-base px-8 h-14 rounded-md"
                  onClick={() => handleNavClick("contacto")}
                >
                  Agendar diagnóstico
                </Button>{" "}
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white bg-red-600 border-zinc-700 hover:bg-zinc-300 text-base px-8 h-14 rounded-md"
                  onClick={() =>
                    window.open(
                      "https://www.deruedas.com.ar/bus.asp?codusr=202783",
                      "_blank"
                    )
                  }
                >
                  Ver catálogo
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Cards Section */}
        <section
          id="contacto"
          ref={sectionRefs.contacto}
          className="py-16 bg-black border-t border-zinc-800"
        >
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-400 mb-4">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contacto Directo
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Contáctanos directamente
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Elige el método que prefieras para comunicarte con nosotros
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* WhatsApp Card */}
              <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-green-500/30 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors duration-300">
                    <svg
                      className="h-8 w-8 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    WhatsApp
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Chatea con nosotros directamente
                  </p>{" "}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() =>
                      alert(
                        "Próximamente disponible - Número de contacto en proceso"
                      )
                    }
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Enviar mensaje</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>
              {/* Email Card */}
              <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-red-500/30 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors duration-300">
                    <svg
                      className="h-8 w-8 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Correo Electrónico
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Envíanos un email con tus consultas
                  </p>{" "}
                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                    onClick={() =>
                      alert("Próximamente disponible - Correo en proceso")
                    }
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Enviar email</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>
              {/* Instagram Card */}
              <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-pink-500/30 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-colors duration-300">
                    <Instagram className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Instagram
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Síguenos y envíanos un DM
                  </p>{" "}
                  <Button
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400"
                    onClick={() =>
                      alert(
                        "Próximamente disponible - Perfil de Instagram en proceso"
                      )
                    }
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Ir a Instagram</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>{" "}
                </div>
              </div>{" "}
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Envíanos un <span className="text-red-500">Mensaje</span>
              </h3>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Completa el formulario y te responderemos a la brevedad
              </p>
            </div>

            <div className="max-w-3xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className="text-sm font-medium text-zinc-400"
                    >
                      Nombre completo
                    </label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      className="bg-zinc-800 border-zinc-700 text-white focus:border-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-zinc-400"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      className="bg-zinc-800 border-zinc-700 text-white focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="telefono"
                    className="text-sm font-medium text-zinc-400"
                  >
                    Teléfono
                  </label>
                  <Input
                    id="telefono"
                    placeholder="Tu número de teléfono"
                    className="bg-zinc-800 border-zinc-700 text-white focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="mensaje"
                    className="text-sm font-medium text-zinc-400"
                  >
                    Mensaje
                  </label>
                  <Textarea
                    id="mensaje"
                    placeholder="¿En qué podemos ayudarte?"
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[120px] focus:border-red-500"
                  />
                </div>

                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 py-6 font-medium"
                  onClick={() =>
                    alert(
                      "Formulario enviado correctamente. Te contactaremos pronto."
                    )
                  }
                >
                  Enviar mensaje
                </Button>
              </form>
            </div>
          </div>

          {/* Mapa Interactivo */}
          <div className="mt-16 rounded-xl overflow-hidden border border-zinc-800">
            <div className="relative h-[400px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107159.75282885498!2d-68.9080542!3d-32.8894587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e093ec45179bf%3A0x205a78f6d20efa3a!2sMendoza%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1652979298452!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación ISR Performance Mendoza"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 py-16 border-t border-zinc-900">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {" "}
            <div className="space-y-6">
              {" "}
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 mr-2">
                  <Image
                    src="/logo.jpg"
                    alt="ISR Performance Mendoza Logo"
                    fill
                    className="object-contain"
                    quality={100}
                  />
                </div>                <div className="flex items-center">
                  <span className="text-2xl font-bold text-white bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    ISR
                  </span>
                  <span className="mx-2 font-bold text-white">|</span>
                  <span className="text-2xl font-bold text-white">
                    Performance
                  </span>
                  <span className="ml-1 text-sm text-zinc-400">Mendoza</span>
                </div>
              </div>
              <p className="text-zinc-400">
                Especialistas en chipeo, sistemas de escape y reprogramaciones
                para potenciar el rendimiento de tu vehículo.
              </p>{" "}
              <div className="flex gap-4">
                <a
                  onClick={() =>
                    alert(
                      "Próximamente disponible - Perfil de Facebook en desarrollo"
                    )
                  }
                  className="text-zinc-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  onClick={() =>
                    alert(
                      "Próximamente disponible - Perfil de Instagram en desarrollo"
                    )
                  }
                  className="text-zinc-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  onClick={() =>
                    alert(
                      "Próximamente disponible - Perfil de Twitter en desarrollo"
                    )
                  }
                  className="text-zinc-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">
                Enlaces rápidos
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#inicio"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("inicio")}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#servicios"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("servicios")}
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="#vehiculos"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("vehiculos")}
                  >
                    Trabajos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#nosotros"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("nosotros")}
                  >
                    Nosotros
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              {" "}
              <h3 className="text-lg font-bold mb-6 text-white">Servicios</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#servicios"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("servicios")}
                  >
                    Chipeo
                  </Link>
                </li>
                <li>
                  <Link
                    href="#servicios"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("servicios")}
                  >
                    Sistemas de Escape
                  </Link>
                </li>
                <li>
                  <Link
                    href="#servicios"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("servicios")}
                  >
                    Reprogramaciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="#servicios"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleNavClick("servicios")}
                  >
                    Diagnóstico
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span className="text-zinc-400">
                    Av. San Martín 1234, Mendoza
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="text-zinc-400">+54 264 123 4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className="text-zinc-400">Lun - Sáb: 9:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-500">
            <p>
              © {new Date().getFullYear()} ISR Performance Mendoza. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
          aria-label="Contactar"
          onClick={() => handleNavClick("contacto")}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      {/* Scroll to Top Button */}
      <div
        className={cn(
          "fixed bottom-6 left-6 z-40 transition-all duration-300",
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 shadow-lg"
          aria-label="Volver arriba"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
