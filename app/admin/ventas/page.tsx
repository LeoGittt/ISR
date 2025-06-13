'use client';

import { useState } from 'react';
import { AddVentaForm } from '@/components/admin/AddVentaForm';

interface Venta {
  id: number;
  date: string;
  customer: string;
  total: number;
  paymentMethod: string;
}

const initialVentas: Venta[] = [
  { id: 1, date: '2024-06-13', customer: 'Cliente Frecuente', total: 150.75, paymentMethod: 'Tarjeta de Crédito' },
  { id: 2, date: '2024-06-12', customer: 'Cliente Ocasional', total: 80.00, paymentMethod: 'Efectivo' },
  { id: 3, date: '2024-06-11', customer: 'Cliente Nuevo', total: 220.50, paymentMethod: 'Transferencia' },
  { id: 4, date: '2024-06-10', customer: 'Empresa XYZ', total: 550.00, paymentMethod: 'Transferencia' },
  { id: 5, date: '2024-06-09', customer: 'Cliente Frecuente', total: 125.20, paymentMethod: 'Tarjeta de Débito' },
  { id: 6, date: '2024-06-08', customer: 'Cliente Nuevo', total: 310.90, paymentMethod: 'Tarjeta de Crédito' },
  { id: 7, date: '2024-06-07', customer: 'Cliente Ocasional', total: 95.50, paymentMethod: 'Efectivo' },
];

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>(initialVentas);
  const [isAddVentaFormOpen, setIsAddVentaFormOpen] = useState(false);

  const handleAddVenta = (newVenta: Omit<Venta, 'id'>) => {
    setVentas([...ventas, { ...newVenta, id: Date.now() }]);
    setIsAddVentaFormOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Ventas</h1>
        <button onClick={() => setIsAddVentaFormOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Registrar Venta
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Cliente</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Método de Pago</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td className="py-2 px-4 border-b text-center">{venta.date}</td>
                <td className="py-2 px-4 border-b text-center">{venta.customer}</td>
                <td className="py-2 px-4 border-b text-center">${venta.total.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-center">{venta.paymentMethod}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="text-blue-500 hover:underline">Ver Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddVentaForm open={isAddVentaFormOpen} onOpenChange={setIsAddVentaFormOpen} onAddVenta={handleAddVenta} />
    </div>
  );
}
