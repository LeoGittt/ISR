'use client';

import { useState } from 'react';
import { AddStockItemForm } from '@/components/admin/AddStockItemForm';
import { EditStockItemForm } from '@/components/admin/EditStockItemForm';

interface StockItem {
  id: number;
  name: string;
  quantity: number;
  location: string;
}

const initialStock: StockItem[] = [
  { id: 1, name: 'Neumático 205/55 R16', quantity: 40, location: 'Almacén A' },
  { id: 2, name: 'Batería 12V 60Ah', quantity: 25, location: 'Almacén B' },
  { id: 3, name: 'Amortiguador Delantero', quantity: 30, location: 'Almacén A' },
  { id: 4, name: 'Kit de Embrague', quantity: 15, location: 'Almacén C' },
  { id: 5, name: 'Faro Delantero Derecho', quantity: 20, location: 'Almacén B' },
  { id: 6, name: 'Radiador', quantity: 10, location: 'Almacén A' },
  { id: 7, name: 'Alternador', quantity: 18, location: 'Almacén C' },
];

export default function StockPage() {
  const [stock, setStock] = useState<StockItem[]>(initialStock);
  const [isAddStockItemFormOpen, setIsAddStockItemFormOpen] = useState(false);
  const [isEditStockItemFormOpen, setIsEditStockItemFormOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<StockItem | null>(null);

  const handleAddStockItem = (newItem: Omit<StockItem, 'id'>) => {
    setStock([...stock, { ...newItem, id: Date.now() }]);
    setIsAddStockItemFormOpen(false);
  };

  const handleDeleteStockItem = (id: number) => {
    setStock(stock.filter(item => item.id !== id));
  };

  const handleEditStockItem = (updatedItem: StockItem) => {
    setStock(stock.map(item => item.id === updatedItem.id ? updatedItem : item));
    setIsEditStockItemFormOpen(false);
  };

  const openEditForm = (item: StockItem) => {
    setSelectedStockItem(item);
    setIsEditStockItemFormOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Stock</h1>
        <button onClick={() => setIsAddStockItemFormOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Producto
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Ubicación</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b text-center">{item.name}</td>
                <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
                <td className="py-2 px-4 border-b text-center">{item.location}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => openEditForm(item)} className="text-blue-500 hover:underline mr-2">Editar</button>
                  <button onClick={() => handleDeleteStockItem(item.id)} className="text-red-500 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddStockItemForm open={isAddStockItemFormOpen} onOpenChange={setIsAddStockItemFormOpen} onAddStockItem={handleAddStockItem} />
      <EditStockItemForm open={isEditStockItemFormOpen} onOpenChange={setIsEditStockItemFormOpen} item={selectedStockItem} onEditStockItem={handleEditStockItem} />
    </div>
  );
}
