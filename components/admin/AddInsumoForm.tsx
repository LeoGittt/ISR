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

interface InsumoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddInsumo: (insumo: { name: string; quantity: number; supplier: string }) => void;
}

export function AddInsumoForm({ open, onOpenChange, onAddInsumo }: InsumoFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [supplier, setSupplier] = useState('');

  const handleSubmit = () => {
    onAddInsumo({ name, quantity, supplier });
    // Clear fields
    setName('');
    setQuantity(0);
    setSupplier('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Insumo</DialogTitle>
          <DialogDescription>
            Completa los datos del nuevo insumo. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" placeholder="Aceite de Motor" className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Cantidad
            </Label>
            <Input id="quantity" type="number" className="col-span-3" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplier" className="text-right">
              Proveedor
            </Label>
            <Input id="supplier" placeholder="Proveedor A" className="col-span-3" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
