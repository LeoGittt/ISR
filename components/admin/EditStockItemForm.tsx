'use client';

import { useState, useEffect } from 'react';
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

interface StockItem {
  id: number;
  name: string;
  quantity: number;
  location: string;
}

interface EditStockItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: StockItem | null;
  onEditStockItem: (item: StockItem) => void;
}

export function EditStockItemForm({ open, onOpenChange, item, onEditStockItem }: EditStockItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setLocation(item.location);
    }
  }, [item]);

  const handleSubmit = () => {
    if (item) {
      onEditStockItem({ ...item, name, quantity, location });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Producto del Stock</DialogTitle>
          <DialogDescription>
            Actualiza los datos del producto. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Producto
            </Label>
            <Input id="name" className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
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
            <Input id="location" className="col-span-3" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
