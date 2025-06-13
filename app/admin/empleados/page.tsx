'use client';

import { useState } from 'react';
import { AddEmployeeForm } from '@/components/admin/AddEmployeeForm';
import { EditEmployeeForm } from '@/components/admin/EditEmployeeForm';

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    role: 'Mecánico',
    email: 'juan.perez@example.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'Ana Gómez',
    role: 'Administrativa',
    email: 'ana.gomez@example.com',
    phone: '098-765-4321',
  },
  {
    id: 3,
    name: 'Carlos Sánchez',
    role: 'Jefe de Taller',
    email: 'carlos.sanchez@example.com',
    phone: '555-123-4567',
  },
  {
    id: 4,
    name: 'Laura Fernández',
    role: 'Recepcionista',
    email: 'laura.fernandez@example.com',
    phone: '555-987-6543',
  },
  {
    id: 5,
    name: 'Miguel Torres',
    role: 'Mecánico',
    email: 'miguel.torres@example.com',
    phone: '555-456-7890',
  },
];

export default function EmpleadosPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isAddEmployeeFormOpen, setIsAddEmployeeFormOpen] = useState(false);
  const [isEditEmployeeFormOpen, setIsEditEmployeeFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setIsAddEmployeeFormOpen(false);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(employee => employee.id === updatedEmployee.id ? updatedEmployee : employee));
    setIsEditEmployeeFormOpen(false);
  };

  const openEditForm = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditEmployeeFormOpen(true);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Empleados</h1>
        <button onClick={() => setIsAddEmployeeFormOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Empleado
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Rol</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Teléfono</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4 border-b text-center">{employee.name}</td>
                <td className="py-2 px-4 border-b text-center">{employee.role}</td>
                <td className="py-2 px-4 border-b text-center">{employee.email}</td>
                <td className="py-2 px-4 border-b text-center">{employee.phone}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => openEditForm(employee)} className="text-blue-500 hover:underline mr-2">Editar</button>
                  <button onClick={() => handleDeleteEmployee(employee.id)} className="text-red-500 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEmployeeForm open={isAddEmployeeFormOpen} onOpenChange={setIsAddEmployeeFormOpen} onAddEmployee={handleAddEmployee} />
      <EditEmployeeForm open={isEditEmployeeFormOpen} onOpenChange={setIsEditEmployeeFormOpen} employee={selectedEmployee} onEditEmployee={handleEditEmployee} />
    </div>
  );
}
