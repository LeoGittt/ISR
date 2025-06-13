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

interface VentaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddVenta: (venta: { date: string; customer: string; total: number; paymentMethod: string }) => void;
}

export function AddVentaForm({ open, onOpenChange, onAddVenta }: VentaFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = () => {
    onAddVenta({ date, customer, total, paymentMethod });
    // Clear fields
    setCustomer('');
    setTotal(0);
    setPaymentMethod('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Venta</DialogTitle>
          <DialogDescription>
            Completa los datos de la nueva venta. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Fecha
            </Label>
            <Input id="date" type="date" className="col-span-3" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customer" className="text-right">
              Cliente
            </Label>
            <Input id="customer" placeholder="Nombre del cliente" className="col-span-3" value={customer} onChange={(e) => setCustomer(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="total" className="text-right">
              Total
            </Label>
            <Input id="total" type="number" className="col-span-3" value={total} onChange={(e) => setTotal(parseFloat(e.target.value))} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentMethod" className="text-right">
              Método de Pago
            </Label>
            <Input id="paymentMethod" placeholder="Efectivo, Tarjeta, etc." className="col-span-3" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
