'use client';

import { useState } from 'react';
import { 
  Users, Wrench, Package, Calendar, Clock, 
  DollarSign, BarChart2, Settings, LogOut,
  ChevronDown, ChevronRight, CheckCircle, 
  AlertCircle, XCircle, Search, Plus, 
  Edit, Trash2, Filter, Download, 
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const employees = [
  { id: 1, name: 'Juan Pérez', role: 'Mecánico', email: 'juan@taller.com', phone: '11 2345-6789', status: 'active', lastLogin: '2023-06-15T10:30:00' },
  { id: 2, name: 'Carlos Gómez', role: 'Mecánico', email: 'carlos@taller.com', phone: '11 3456-7890', status: 'active', lastLogin: '2023-06-14T15:45:00' },
  { id: 3, name: 'María López', role: 'Recepcionista', email: 'maria@taller.com', phone: '11 4567-8901', status: 'active', lastLogin: '2023-06-15T09:15:00' },
  { id: 4, name: 'Luis Martínez', role: 'Administrativo', email: 'luis@taller.com', phone: '11 5678-9012', status: 'inactive', lastLogin: '2023-05-20T14:20:00' },
];

const inventory = [
  { id: 1, name: 'Aceite Sintético 5W-30', category: 'Lubricantes', stock: 42, minStock: 10, price: 4500, supplier: 'YPF' },
  { id: 2, name: 'Filtro de Aire', category: 'Filtros', stock: 18, minStock: 5, price: 3200, supplier: 'Mann-Filter' },
  { id: 3, name: 'Pastillas de Freno Delanteras', category: 'Frenos', stock: 8, minStock: 4, price: 12500, supplier: 'Brembo' },
  { id: 4, name: 'Bujías NGK', category: 'Encendido', stock: 24, minStock: 12, price: 3800, supplier: 'NGK' },
  { id: 5, name: 'Líquido de Frenos DOT4', category: 'Fluidos', stock: 5, minStock: 3, price: 2800, supplier: 'Castrol' },
];

const appointments = [
  { id: 1, customer: 'Martín García', vehicle: 'Ford Focus 2018', service: 'Cambio de Aceite', date: '2023-06-16', time: '10:00', status: 'confirmed', assignedTo: 'Juan Pérez' },
  { id: 2, customer: 'Ana Rodríguez', vehicle: 'Volkswagen Gol 2019', service: 'Revisión de Frenos', date: '2023-06-16', time: '14:00', status: 'confirmed', assignedTo: 'Carlos Gómez' },
  { id: 3, customer: 'Pedro Sánchez', vehicle: 'Toyota Corolla 2021', service: 'Alineación y Balanceo', date: '2023-06-17', time: '11:00', status: 'pending', assignedTo: '' },
  { id: 4, customer: 'Lucía Fernández', vehicle: 'Chevrolet Onix 2020', service: 'Diagnóstico Computarizado', date: '2023-06-17', time: '16:00', status: 'cancelled', assignedTo: '' },
];

const financialData = {
  monthlyRevenue: 285000,
  monthlyExpenses: 187000,
  outstandingInvoices: 3,
  mostSoldService: 'Cambio de Aceite',
  revenueGrowth: 12.5,
};

// Available services mock data
const availableServices = [
  {
    name: 'Cambio de Aceite',
    category: 'Mantenimiento',
    price: 4500,
    duration: '1 hora',
    description: 'Cambio de aceite y filtro para motor.',
    icon: <Wrench size={20} />,
  },
  {
    name: 'Revisión de Frenos',
    category: 'Frenos',
    price: 6500,
    duration: '1.5 horas',
    description: 'Inspección y ajuste del sistema de frenos.',
    icon: <Package size={20} />,
  },
  {
    name: 'Diagnóstico Computarizado',
    category: 'Diagnóstico',
    price: 8000,
    duration: '2 horas',
    description: 'Chequeo electrónico completo del vehículo.',
    icon: <BarChart2 size={20} />,
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Available time slots for appointments
  const availableTimeSlots: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = appointments.filter(app => 
    app.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (type: string) => {
    setModalType(type);
    setSelectedItem(null);
    setShowAddModal(true);
  };

  const handleEditItem = (item: any, type: string) => {
    setModalType(type);
    setSelectedItem(item);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">TallerAdmin Pro</h1>
          <p className="text-xs text-gray-500">Panel de administración</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <BarChart2 size={18} />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('employees')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'employees' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Users size={18} />
            <span>Empleados</span>
            <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{employees.length}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'inventory' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Package size={18} />
            <span>Inventario</span>
            <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {inventory.filter(i => i.stock < i.minStock).length}
            </span>
          </button>
          
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'appointments' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Calendar size={18} />
            <span>Turnos</span>
            <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {appointments.filter(a => a.status === 'pending').length}
            </span>
          </button>
          
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Wrench size={18} />
            <span>Servicios</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('finance')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'finance' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <DollarSign size={18} />
            <span>Finanzas</span>
          </button>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Settings size={18} />
              <span>Configuración</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 rounded-lg hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-blue-600">TallerAdmin</h1>
        <div className="w-6"></div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 shadow-xl"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">TallerAdmin Pro</h1>
              <button onClick={() => setShowMobileMenu(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <XCircle size={20} />
              </button>
            </div>
            
            <nav className="p-4 space-y-1">
              <button 
                onClick={() => { setActiveTab('dashboard'); setShowMobileMenu(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <BarChart2 size={18} />
                <span>Dashboard</span>
              </button>
              
              {/* Repeat for other menu items */}
              <button 
                onClick={() => { setActiveTab('employees'); setShowMobileMenu(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'employees' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Users size={18} />
                <span>Empleados</span>
              </button>
              
              {/* Add other mobile menu items similarly */}
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={18} />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'employees' && 'Gestión de Empleados'}
              {activeTab === 'inventory' && 'Gestión de Inventario'}
              {activeTab === 'appointments' && 'Gestión de Turnos'}
              {activeTab === 'services' && 'Servicios'}
              {activeTab === 'finance' && 'Finanzas'}
              {activeTab === 'settings' && 'Configuración'}
            </h1>
            <p className="text-gray-600">
              {activeTab === 'dashboard' && 'Resumen general del taller'}
              {activeTab === 'employees' && 'Administra el personal del taller'}
              {activeTab === 'inventory' && 'Control de insumos y repuestos'}
              {activeTab === 'appointments' && 'Programación de servicios'}
              {activeTab === 'services' && 'Catálogo de servicios ofrecidos'}
              {activeTab === 'finance' && 'Información financiera'}
              {activeTab === 'settings' && 'Configuración del sistema'}
            </p>
          </div>
          
          {(activeTab === 'employees' || activeTab === 'inventory' || activeTab === 'appointments') && (
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button 
                onClick={() => handleAddItem(activeTab)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span className="hidden md:inline">
                  {activeTab === 'employees' && 'Nuevo empleado'}
                  {activeTab === 'inventory' && 'Nuevo ítem'}
                  {activeTab === 'appointments' && 'Nuevo turno'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Turnos hoy</p>
                    <h3 className="text-2xl font-bold mt-1">4</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <Calendar size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">2 confirmados, 1 pendiente</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Ingresos mensuales</p>
                    <h3 className="text-2xl font-bold mt-1">${financialData.monthlyRevenue.toLocaleString()}</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 text-green-600">
                    <DollarSign size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">{financialData.revenueGrowth}% vs mes anterior</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Ítems bajos en stock</p>
                    <h3 className="text-2xl font-bold mt-1">{inventory.filter(i => i.stock < i.minStock).length}</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                    <Package size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">Necesitan reposición</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Empleados activos</p>
                    <h3 className="text-2xl font-bold mt-1">{employees.filter(e => e.status === 'active').length}</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                    <Users size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">{employees.length} en total</p>
              </motion.div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Turnos recientes</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver todos</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.vehicle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date} {app.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            app.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status === 'confirmed' ? 'Confirmado' : 
                             app.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Ítems bajos en stock</h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver inventario</button>
                </div>
                
                <div className="space-y-4">
                  {inventory
                    .filter(item => item.stock < item.minStock)
                    .map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-600">Stock: {item.stock}</p>
                          <p className="text-sm text-gray-500">Mínimo: {item.minStock}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Recent Employees Activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Actividad de empleados</h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver todos</button>
                </div>
                
                <div className="space-y-4">
                  {employees
                    .sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime())
                    .slice(0, 4)
                    .map(emp => (
                      <div key={emp.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {emp.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{emp.name}</h3>
                          <p className="text-sm text-gray-500">{emp.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{new Date(emp.lastLogin).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(emp.lastLogin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employees Management */}
        {activeTab === 'employees' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último acceso</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {emp.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                            <div className="text-sm text-gray-500">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          emp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {emp.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(emp.lastLogin).toLocaleDateString()} {new Date(emp.lastLogin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditItem(emp, 'employees')}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredEmployees.length}</span> de <span className="font-medium">{employees.length}</span> empleados
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Management */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ítem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className={`hover:bg-gray-50 ${item.stock < item.minStock ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 mr-3">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full ${
                                  item.stock/item.minStock > 2 ? 'bg-green-500' : 
                                  item.stock/item.minStock > 1 ? 'bg-yellow-500' : 'bg-red-500'
                                }" 
                                style={{ width: `${Math.min(100, (item.stock/(item.minStock*2)) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm ${
                            item.stock < item.minStock ? 'text-red-600 font-medium' : 'text-gray-500'
                          }">
                            {item.stock}/{item.minStock}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditItem(item, 'inventory')}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredInventory.length}</span> de <span className="font-medium">{inventory.length}</span> ítems
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Management */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignado a</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.vehicle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date} {app.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.assignedTo || 'Sin asignar'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          app.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {app.status === 'confirmed' ? 'Confirmado' : 
                           app.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditItem(app, 'appointments')}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredAppointments.length}</span> de <span className="font-medium">{appointments.length}</span> turnos
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Finance Management */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Resumen Financiero</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500">Ingresos este mes</p>
                    <p className="text-2xl font-bold text-green-600">${financialData.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gastos este mes</p>
                    <p className="text-2xl font-bold text-red-600">${financialData.monthlyExpenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Beneficio neto</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${(financialData.monthlyRevenue - financialData.monthlyExpenses).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Facturación Pendiente</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500">Facturas pendientes</p>
                    <p className="text-2xl font-bold text-yellow-600">{financialData.outstandingInvoices}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Servicio más solicitado</p>
                    <p className="text-xl font-medium">{financialData.mostSoldService}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Crecimiento mensual</p>
                    <p className={`text-xl font-medium ${
                      financialData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {financialData.revenueGrowth >= 0 ? '+' : ''}{financialData.revenueGrowth}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Gastos por Categoría</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-gray-400">[Gráfico de gastos por categoría]</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Historial de Facturación</h3>
                <div className="flex space-x-3">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                    <Filter size={16} className="mr-2" />
                    Filtros
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                    <Download size={16} className="mr-2" />
                    Exportar
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factura #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicios</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FAC-00{i}23</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Cliente {i}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-{10+i}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {i === 1 && 'Cambio de Aceite, Rotación de Cubiertas'}
                          {i === 2 && 'Diagnóstico Computarizado'}
                          {i === 3 && 'Alineación y Balanceo'}
                          {i === 4 && 'Revisión Completa de Frenos'}
                          {i === 5 && 'Lavado Premium + Encerado'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          ${(i * 4500).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            i < 4 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {i < 4 ? 'Pagado' : 'Pendiente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Services Management */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableServices.map(service => (
                <motion.div 
                  key={service.name}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                      {service.icon}
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      ${service.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{service.duration}</span>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-100 text-gray-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddItem('services')}
                className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Plus className="text-gray-400 mb-2" size={24} />
                <p className="font-medium text-gray-600">Agregar nuevo servicio</p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Configuración del Sistema</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Información del Taller</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Taller</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      value="AutoService Premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      value="Av. Siempreviva 742, Buenos Aires"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      value="11 2345-6789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      value="contacto@autoservice.com"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Horario de Atención</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Días Laborales</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Lunes a Viernes</option>
                      <option>Lunes a Sábado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
                    <div className="flex space-x-3">
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>08:00</option>
                        <option>09:00</option>
                      </select>
                      <span className="flex items-center">a</span>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>18:00</option>
                        <option>19:00</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Configuración de Turnos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duración de Turnos</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>30 minutos</option>
                      <option>1 hora</option>
                      <option>1.5 horas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Máximo de turnos por día</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      value="12"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {selectedItem ? 'Editar' : 'Agregar'} {modalType === 'employees' && 'empleado'}
                    {modalType === 'inventory' && 'ítem'} {modalType === 'appointments' && 'turno'}
                    {modalType === 'services' && 'servicio'}
                  </h2>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {modalType === 'employees' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Mecánico</option>
                          <option>Recepcionista</option>
                          <option>Administrativo</option>
                          <option>Gerente</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.email || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input 
                          type="tel" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.phone || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="active">Activo</option>
                          <option value="inactive">Inactivo</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {modalType === 'inventory' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Ítem</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Lubricantes</option>
                          <option>Filtros</option>
                          <option>Frenos</option>
                          <option>Encendido</option>
                          <option>Fluidos</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
                        <input 
                          type="number" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.stock || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                        <input 
                          type="number" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.minStock || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                        <input 
                          type="number" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.price || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.supplier || ''}
                        />
                      </div>
                    </>
                  )}
                  
                  {modalType === 'appointments' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.customer || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.vehicle || ''}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                          <input 
                            type="date" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            defaultValue={selectedItem?.date || ''}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {availableTimeSlots.map((time: string) => (
                              <option key={time} selected={time === selectedItem?.time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          {availableServices.map(service => (
                            <option key={service.name} selected={service.name === selectedItem?.service}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Asignado a</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Sin asignar</option>
                          {employees.map(emp => (
                            <option key={emp.id} selected={emp.name === selectedItem?.assignedTo}>
                              {emp.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="confirmed" selected={selectedItem?.status === 'confirmed'}>Confirmado</option>
                          <option value="pending" selected={selectedItem?.status === 'pending'}>Pendiente</option>
                          <option value="cancelled" selected={selectedItem?.status === 'cancelled'}>Cancelado</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios</label>
                        <textarea 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          rows={3}
                          defaultValue={selectedItem?.comments || ''}
                        ></textarea>
                      </div>
                    </>
                  )}
                  
                  {modalType === 'services' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Servicio</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Mantenimiento</option>
                          <option>Frenos</option>
                          <option>Suspensión</option>
                          <option>Diagnóstico</option>
                          <option>Climatización</option>
                          <option>Estética</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>0.5 horas</option>
                          <option>1 hora</option>
                          <option>1.5 horas</option>
                          <option>2 horas</option>
                          <option>3 horas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                        <input 
                          type="number" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          defaultValue={selectedItem?.price || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          rows={3}
                          defaultValue={selectedItem?.description || ''}
                        ></textarea>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    {selectedItem ? 'Guardar Cambios' : 'Agregar'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}