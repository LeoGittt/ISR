'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StockItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStockItem: (item: { name: string; quantity: number; location: string }) => void;
}

export function AddStockItemForm({ open, onOpenChange, onAddStockItem }: StockItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    onAddStockItem({ name, quantity, location });
    // Clear fields
    setName('');
    setQuantity(0);
    setLocation('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Producto al Stock</DialogTitle>
          <DialogDescription>
            Completa los datos del nuevo producto. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Producto
            </Label>
            <Input id="name" placeholder="Neumático 205/55 R16" className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Cantidad
            </Label>
            <Input id="quantity" type="number" className="col-span-3" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Ubicación
            </Label>
            <Input id="location" placeholder="Almacén A" className="col-span-3" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
