'use client';

import { useState } from 'react';
import { AddInsumoForm } from '@/components/admin/AddInsumoForm';
import { EditInsumoForm } from '@/components/admin/EditInsumoForm';

interface Insumo {
  id: number;
  name: string;
  quantity: number;
  supplier: string;
}

const initialInsumos: Insumo[] = [
  { id: 1, name: 'Aceite de Motor 5W-30', quantity: 50, supplier: 'Proveedor A' },
  { id: 2, name: 'Filtro de Aire', quantity: 120, supplier: 'Proveedor B' },
  { id: 3, name: 'Pastillas de Freno', quantity: 80, supplier: 'Proveedor A' },
  { id: 4, name: 'Líquido de Frenos DOT 4', quantity: 30, supplier: 'Proveedor C' },
  { id: 5, name: 'Bujías de Iridio', quantity: 200, supplier: 'Proveedor B' },
  { id: 6, name: 'Correa de Distribución', quantity: 25, supplier: 'Proveedor D' },
  { id: 7, name: 'Amortiguadores Delanteros', quantity: 40, supplier: 'Proveedor C' },
];

export default function InsumosPage() {
  const [insumos, setInsumos] = useState<Insumo[]>(initialInsumos);
  const [isAddInsumoFormOpen, setIsAddInsumoFormOpen] = useState(false);
  const [isEditInsumoFormOpen, setIsEditInsumoFormOpen] = useState(false);
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);

  const handleAddInsumo = (newInsumo: Omit<Insumo, 'id'>) => {
    setInsumos([...insumos, { ...newInsumo, id: Date.now() }]);
    setIsAddInsumoFormOpen(false);
  };

  const handleDeleteInsumo = (id: number) => {
    setInsumos(insumos.filter(insumo => insumo.id !== id));
  };

  const handleEditInsumo = (updatedInsumo: Insumo) => {
    setInsumos(insumos.map(insumo => insumo.id === updatedInsumo.id ? updatedInsumo : insumo));
    setIsEditInsumoFormOpen(false);
  };

  const openEditForm = (insumo: Insumo) => {
    setSelectedInsumo(insumo);
    setIsEditInsumoFormOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Insumos</h1>
        <button onClick={() => setIsAddInsumoFormOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Insumo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Proveedor</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo) => (
              <tr key={insumo.id}>
                <td className="py-2 px-4 border-b text-center">{insumo.name}</td>
                <td className="py-2 px-4 border-b text-center">{insumo.quantity}</td>
                <td className="py-2 px-4 border-b text-center">{insumo.supplier}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => openEditForm(insumo)} className="text-blue-500 hover:underline mr-2">Editar</button>
                  <button onClick={() => handleDeleteInsumo(insumo.id)} className="text-red-500 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddInsumoForm open={isAddInsumoFormOpen} onOpenChange={setIsAddInsumoFormOpen} onAddInsumo={handleAddInsumo} />
      <EditInsumoForm open={isEditInsumoFormOpen} onOpenChange={setIsEditInsumoFormOpen} insumo={selectedInsumo} onEditInsumo={handleEditInsumo} />
    </div>
  );
}
