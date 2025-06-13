'use client';

import { useState, useEffect } from 'react';
import { format, addDays, isSameDay, parseISO, startOfDay, endOfDay, isAfter } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { UpcomingAppointments } from '@/components/turnos/UpcomingAppointments';
import { 
  Loader2, CheckCircle, Clock, Calendar as CalendarIcon, 
  Car, Wrench, ChevronRight, AlertCircle, 
  Phone, Mail, MapPin, User, X, Edit2
} from 'lucide-react';

// Mock data for existing appointments
const existingAppointments = [
  {
    id: 1,
    date: addDays(new Date(), 2).toISOString(),
    time: '10:00',
    service: 'Cambio de Aceite Premium',
    vehicle: 'Ford Focus 2018',
    comments: 'Usar aceite sintético 5W-30',
    status: 'confirmed',
    customer: {
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '11 1234-5678'
    },
    serviceDetails: {
      duration: '1 hora',
      price: 4500,
      mechanic: 'Juan Pérez',
      category: 'Mantenimiento'
    }
  },
  {
    id: 2,
    date: addDays(new Date(), 2).toISOString(),
    time: '14:00',
    service: 'Revisión Completa de Frenos',
    vehicle: 'Chevrolet Onix 2020',
    comments: 'El cliente reporta ruido al frenar',
    status: 'confirmed',
    customer: {
      name: 'María Gómez',
      email: 'maria.gomez@email.com',
      phone: '11 2345-6789'
    },
    serviceDetails: {
      duration: '2 horas',
      price: 6200,
      mechanic: 'Carlos Gómez',
      category: 'Frenos'
    }
  },
  {
    id: 3,
    date: addDays(new Date(), 5).toISOString(),
    time: '11:00',
    service: 'Alineación y Balanceo Premium',
    vehicle: 'Volkswagen Gol 2019',
    comments: 'El volante vibra a más de 80 km/h',
    status: 'pending',
    customer: {
      name: 'Pedro Ruiz',
      email: 'pedro.ruiz@email.com',
      phone: '11 3456-7890'
    },
    serviceDetails: {
      duration: '1.5 horas',
      price: 3800,
      mechanic: 'Alejandro Ruiz',
      category: 'Suspensión'
    }
  },
  {
    id: 4,
    date: addDays(new Date(), -3).toISOString(),
    time: '09:00',
    service: 'Diagnóstico Computarizado',
    vehicle: 'Toyota Corolla 2021',
    comments: 'Check engine light is on',
    status: 'completed',
    customer: {
      name: 'Lucía Martínez',
      email: 'lucia.martinez@email.com',
      phone: '11 4567-8901'
    },
    serviceDetails: {
      duration: '0.5 horas',
      price: 2500,
      mechanic: 'Luis Martínez',
      category: 'Diagnóstico'
    }
  },
  {
    id: 5,
    date: addDays(new Date(), 7).toISOString(),
    time: '15:00',
    service: 'Lavado Premium + Encerado',
    vehicle: 'BMW Serie 3 2022',
    comments: 'Limpieza interior completa requerida',
    status: 'confirmed',
    customer: {
      name: 'Sofía López',
      email: 'sofia.lopez@email.com',
      phone: '11 5678-9012'
    },
    serviceDetails: {
      duration: '3 horas',
      price: 8500,
      mechanic: 'Estética Automotriz',
      category: 'Limpieza'
    }
  },
];

const availableTimeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

const availableServices = [
  { 
    name: 'Cambio de Aceite Premium', 
    duration: '1 hora', 
    price: 4500,
    icon: <Wrench className="w-5 h-5" />,
    category: 'Mantenimiento',
    description: 'Incluye aceite sintético y filtro nuevo'
  },
  { 
    name: 'Revisión Completa de Frenos', 
    duration: '2 horas', 
    price: 6200,
    icon: <Car className="w-5 h-5" />,
    category: 'Frenos',
    description: 'Incluye diagnóstico de discos, pastillas y líquido'
  },
  { 
    name: 'Alineación y Balanceo Premium', 
    duration: '1.5 horas', 
    price: 3800,
    icon: <Wrench className="w-5 h-5" />,
    category: 'Suspensión',
    description: 'Alineación computarizada y balanceo de neumáticos'
  },
  { 
    name: 'Diagnóstico Computarizado', 
    duration: '0.5 horas', 
    price: 2500,
    icon: <Wrench className="w-5 h-5" />,
    category: 'Diagnóstico',
    description: 'Escaneo completo de sistemas del vehículo'
  },
  { 
    name: 'Servicio de Aire Acondicionado', 
    duration: '2 horas', 
    price: 5200,
    icon: <Wrench className="w-5 h-5" />,
    category: 'Climatización',
    description: 'Limpieza y recarga de gas refrigerante'
  },
  { 
    name: 'Lavado Premium + Encerado', 
    duration: '3 horas', 
    price: 8500,
    icon: <Car className="w-5 h-5" />,
    category: 'Estética',
    description: 'Lavado exterior e interior con encerado profesional'
  },
];

const vehicleMakes = [
  'Audi', 'BMW', 'Chevrolet', 'Fiat', 'Ford', 
  'Honda', 'Hyundai', 'Jeep', 'Kia', 'Mazda',
  'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Peugeot',
  'Renault', 'Subaru', 'Toyota', 'Volkswagen', 'Volvo', 'Otro'
];

const mechanics = [
  { id: 1, name: 'Juan Pérez', specialty: 'Mantenimiento', rating: 4.8 },
  { id: 2, name: 'Carlos Gómez', specialty: 'Frenos', rating: 4.9 },
  { id: 3, name: 'Alejandro Ruiz', specialty: 'Suspensión', rating: 4.7 },
  { id: 4, name: 'Luis Martínez', specialty: 'Diagnóstico', rating: 4.9 },
  { id: 5, name: 'Estética Team', specialty: 'Limpieza', rating: 4.5 }
];

export default function TurnosPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState(existingAppointments);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTab, setSelectedTab] = useState('book');
  const [selectedService, setSelectedService] = useState<typeof availableServices[0] | null>(null);
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form fields
  const [service, setService] = useState(availableServices[0].name);
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [comments, setComments] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const bookedSlotsForSelectedDate = appointments
    .filter(appt => date && isSameDay(parseISO(appt.date), date))
    .map(appt => appt.time);

  const handleBooking = () => {
    if (!date || !selectedTime || !service || !vehicleMake || !vehicleModel || !email || !phone || !name) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const selectedServiceData = availableServices.find(s => s.name === service);
      
      const newAppointment = {
        id: Date.now(),
        date: date.toISOString(),
        time: selectedTime,
        service,
        vehicle: `${vehicleMake} ${vehicleModel}`,
        comments,
        status: 'pending',
        customer: { name, email, phone },
        serviceDetails: selectedServiceData ? {
          duration: selectedServiceData.duration,
          price: selectedServiceData.price,
          category: selectedServiceData.category,
          mechanic: mechanics.find(m => m.specialty === selectedServiceData.category)?.name || 'Por asignar'
        } : {
          duration: '',
          price: 0,
          category: '',
          mechanic: 'Por asignar'
        }
      };

      setAppointments([...appointments, newAppointment]);
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSelectedTime(null);
        setService(availableServices[0].name);
        setVehicleMake('');
        setVehicleModel('');
        setComments('');
        setEmail('');
        setPhone('');
        setName('');
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  const upcomingAppointments = appointments
    .filter(appt => isAfter(parseISO(appt.date), new Date()))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  const pastAppointments = appointments
    .filter(appt => !isAfter(parseISO(appt.date), new Date()))
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());

  const filteredAppointments = (selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments)
    .filter(appt => 
      appt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appt.customer?.name && appt.customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getServiceByName = (name: string) => availableServices.find(s => s.name === name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AutoService</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Sistema de Gestión de Turnos</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Phone className="inline mr-2" size={18} />
              Contacto
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md">
              <User className="inline mr-2" size={18} />
              Mi Cuenta
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 mb-12 text-white shadow-xl">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Programá tu servicio con facilidad</h2>
            <p className="text-xl mb-6 opacity-90">Nuestros expertos están listos para atender tu vehículo con la mejor calidad.</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setSelectedTab('book')}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center shadow-lg"
              >
                Reservar Ahora <ChevronRight className="ml-2" />
              </button>
              <button className="px-6 py-3 bg-white bg-opacity-20 rounded-lg font-medium hover:bg-opacity-30 transition-all border border-white border-opacity-30">
                Ver Servicios
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedTab('book')}
              className={`flex-1 py-5 px-6 text-center font-medium transition-colors ${selectedTab === 'book' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <CalendarIcon className="inline-block mr-2" size={18} />
              Reservar Turno
            </button>
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`flex-1 py-5 px-6 text-center font-medium transition-colors ${selectedTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <Clock className="inline-block mr-2" size={18} />
              Próximos ({upcomingAppointments.length})
            </button>
            <button
              onClick={() => setSelectedTab('history')}
              className={`flex-1 py-5 px-6 text-center font-medium transition-colors ${selectedTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <CheckCircle className="inline-block mr-2" size={18} />
              Historial ({pastAppointments.length})
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              {selectedTab === 'book' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Calendar & Time Selection */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                          <CalendarIcon className="mr-2 text-blue-500" size={20} />
                          Seleccione Fecha
                        </h2>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-xl border-none shadow-sm"
                          locale={es}
                          disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1)) || day.getDay() === 0 || day.getDay() === 6}
                          modifiers={{
                            hasAppointments: appointments.map(appt => parseISO(appt.date))
                          }}
                          modifiersStyles={{
                            hasAppointments: { 
                              border: '2px solid #3b82f6',
                              borderRadius: '6px'
                            }
                          }}
                        />
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                          <Clock className="mr-2 text-blue-500" size={20} />
                          Horarios Disponibles
                        </h2>
                        {date ? (
                          <div className="grid grid-cols-2 gap-3 w-full">
                            {availableTimeSlots.map(time => {
                              const isBooked = bookedSlotsForSelectedDate.includes(time);
                              return (
                                <motion.button
                                  key={time}
                                  whileHover={{ scale: isBooked ? 1 : 1.03 }}
                                  whileTap={{ scale: isBooked ? 1 : 0.98 }}
                                  disabled={isBooked}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 px-4 rounded-xl font-medium transition-all w-full flex items-center justify-center ${
                                    isBooked
                                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                                      : selectedTime === time
                                      ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md'
                                      : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                                  }`}
                                >
                                  {time}
                                  {isBooked && <span className="ml-2 text-xs">(ocupado)</span>}
                                </motion.button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg text-center">
                            <p className="text-gray-500 dark:text-gray-300">Seleccione una fecha primero</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Service Selection */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Wrench className="mr-2 text-blue-500" size={20} />
                        Nuestros Servicios
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {availableServices.map(service => (
                          <motion.div
                            key={service.name}
                            whileHover={{ y: -3 }}
                            onClick={() => {
                              setSelectedService(service);
                              setShowServiceDetail(true);
                              setService(service.name);
                            }}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              service.name === selectedService?.name 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                                {service.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{service.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{service.duration} • ${service.price}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking Form */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <User className="mr-2 text-blue-500" size={20} />
                      Complete sus Datos
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Servicio Seleccionado</label>
                        <div className="mt-1 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          {selectedService ? (
                            <div>
                              <p className="font-medium">{selectedService.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedService.duration} • ${selectedService.price}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400">Seleccione un servicio</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          placeholder="Juan Pérez"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          placeholder="juan@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          placeholder="11 2345-6789"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marca del Vehículo</label>
                        <select
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                          <option value="">Seleccione una marca</option>
                          {vehicleMakes.map(make => (
                            <option key={make} value={make}>{make}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Modelo y Año</label>
                        <input
                          type="text"
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          placeholder="Focus 2018"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comentarios Adicionales</label>
                        <textarea
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          rows={3}
                          placeholder="Especificaciones especiales o detalles del problema..."
                        ></textarea>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBooking}
                      disabled={!date || !selectedTime || !vehicleMake || !vehicleModel || !email || !phone || !name || isLoading || isSuccess}
                      className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        isLoading || isSuccess
                          ? 'bg-green-500 text-white'
                          : !date || !selectedTime || !vehicleMake || !vehicleModel || !email || !phone || !name
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                          : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-md'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Procesando...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="mr-2" size={18} />
                          ¡Turno Confirmado!
                        </>
                      ) : (
                        'Confirmar Turno'
                      )}
                    </motion.button>
                    
                    {isSuccess && date && selectedTime && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-sm"
                      >
                        <p className="font-medium">Reserva confirmada para el {format(date, 'PPP', { locale: es })} a las {selectedTime}.</p>
                        <p className="mt-1">Hemos enviado los detalles a {email}.</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {(selectedTab === 'upcoming' || selectedTab === 'history') && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                      {selectedTab === 'upcoming' ? 'Próximos Turnos' : 'Historial de Turnos'}
                    </h2>
                    <div className="relative w-64">
                      <input
                        type="text"
                        placeholder="Buscar turnos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                      <div className="absolute right-3 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments.map(appointment => {
                        const serviceData = getServiceByName(appointment.service);
                        return (
                          <motion.div
                            key={appointment.id}
                            whileHover={{ y: -2 }}
                            onClick={() => setSelectedAppointment(appointment)}
                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center mb-2">
                                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                                    {serviceData?.icon || <Wrench className="w-5 h-5" />}
                                  </div>
                                  <h3 className="font-medium text-lg">{appointment.service}</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 ml-11">{appointment.vehicle}</p>
                                <div className="ml-11 mt-2 flex flex-wrap gap-4">
                                  <p className="text-sm">
                                    <span className="font-medium">Fecha:</span> {format(parseISO(appointment.date), 'PPP', { locale: es })} a las {appointment.time}
                                  </p>
                                  {appointment.serviceDetails?.price && (
                                    <p className="text-sm">
                                      <span className="font-medium">Precio:</span> ${appointment.serviceDetails.price}
                                    </p>
                                  )}
                                  {appointment.serviceDetails?.mechanic && (
                                    <p className="text-sm">
                                      <span className="font-medium">Mecánico:</span> {appointment.serviceDetails.mechanic}
                                    </p>
                                  )}
                                </div>
                                {appointment.comments && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-11">
                                    <span className="font-medium">Notas:</span> {appointment.comments}
                                  </p>
                                )}
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                appointment.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                  : appointment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {appointment.status === 'confirmed' ? 'Confirmado' : appointment.status === 'pending' ? 'Pendiente' : 'Completado'}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="text-gray-400 dark:text-gray-500" size={40} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        No se encontraron turnos
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {selectedTab === 'upcoming' 
                          ? 'No tienes turnos programados.' 
                          : 'No hay turnos anteriores registrados.'}
                      </p>
                      {selectedTab === 'upcoming' && (
                        <button
                          onClick={() => setSelectedTab('book')}
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Reservar un turno
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {showServiceDetail && selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowServiceDetail(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{selectedService.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{selectedService.category}</p>
                    </div>
                    <button 
                      onClick={() => setShowServiceDetail(false)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <X className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                      {selectedService.icon}
                    </div>
                    <div>
                      <p className="font-medium">Duración: {selectedService.duration}</p>
                      <p className="font-medium">Precio: ${selectedService.price}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Descripción del servicio</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedService.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Mecánicos disponibles</h4>
                    <div className="space-y-3">
                      {mechanics
                        .filter(m => m.specialty === selectedService.category || selectedService.category === 'Limpieza')
                        .map(mechanic => (
                          <div key={mechanic.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex items-center justify-center">
                              <User className="text-gray-500 dark:text-gray-400" size={18} />
                            </div>
                            <div>
                              <p className="font-medium">{mechanic.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Especialista en {mechanic.specialty} • ⭐ {mechanic.rating}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setService(selectedService.name);
                      setShowServiceDetail(false);
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Seleccionar este servicio
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Appointment Detail Modal */}
        <AnimatePresence>
          {selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedAppointment(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{selectedAppointment.service}</h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        {format(parseISO(selectedAppointment.date), 'PPP', { locale: es })} a las {selectedAppointment.time}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedAppointment(null)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <X className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Car className="mr-2 text-blue-500" size={18} />
                        Vehículo
                      </h4>
                      <p>{selectedAppointment.vehicle}</p>
                    </div>
                    
                    {selectedAppointment.customer && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <User className="mr-2 text-blue-500" size={18} />
                          Cliente
                        </h4>
                        <p className="mb-1">{selectedAppointment.customer.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAppointment.customer.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAppointment.customer.phone}</p>
                      </div>
                    )}
                    
                    {selectedAppointment.serviceDetails && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Wrench className="mr-2 text-blue-500" size={18} />
                          Detalles del Servicio
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Duración</p>
                            <p>{selectedAppointment.serviceDetails.duration}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Precio</p>
                            <p>${selectedAppointment.serviceDetails.price}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Categoría</p>
                            <p>{selectedAppointment.serviceDetails.category}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Mecánico</p>
                            <p>{selectedAppointment.serviceDetails.mechanic}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedAppointment.comments && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Edit2 className="mr-2 text-blue-500" size={18} />
                          Comentarios
                        </h4>
                        <p>{selectedAppointment.comments}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    {isAfter(parseISO(selectedAppointment.date), new Date()) && (
                      <>
                        <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                          Reagendar
                        </button>
                        <button className="flex-1 py-2 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-800/30 dark:text-red-400 rounded-lg font-medium transition-colors">
                          Cancelar
                        </button>
                      </>
                    )}
                    {!isAfter(parseISO(selectedAppointment.date), new Date()) && (
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        Volver a programar este servicio
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="mr-2 text-blue-500" size={20} />
                Nuestro Taller
              </h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  [Mapa del taller]
                </div>
              </div>
              <p className="font-medium">AutoService Premium</p>
              <p className="text-gray-600 dark:text-gray-400">Av. Siempreviva 742, Buenos Aires</p>
              <p className="text-gray-600 dark:text-gray-400">Lunes a Viernes: 8:00 - 18:00</p>
              <p className="text-gray-600 dark:text-gray-400">Sábados: 9:00 - 13:00</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Phone className="mr-2 text-blue-500" size={20} />
                Contacto
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-gray-600 dark:text-gray-400">11 2345-6789</p>
                    <p className="text-gray-600 dark:text-gray-400">WhatsApp: 11 9876-5432</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">contacto@autoservice.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Redes Sociales</p>
                    <p className="text-gray-600 dark:text-gray-400">@autoservice.oficial</p>
                    <p className="text-gray-600 dark:text-gray-400">/autoservice-premium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AutoService</h3>
              <p className="text-gray-400">Servicio profesional de mantenimiento y reparación vehicular con más de 15 años de experiencia.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                {availableServices.slice(0, 4).map(service => (
                  <li key={service.name} className="hover:text-white transition-colors">
                    <a href="#">{service.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors"><a href="#">Inicio</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Turnos</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Servicios</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suscríbete</h3>
              <p className="text-gray-400 mb-4">Recibe promociones y consejos para el cuidado de tu vehículo.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="px-4 py-2 rounded-l-lg w-full text-gray-900 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AutoService Premium. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}