import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
      <nav className="flex flex-col gap-2">
        <Link href="/admin/empleados" className="hover:text-gray-300">Empleados</Link>
        <Link href="/admin/insumos" className="hover:text-gray-300">Insumos</Link>
        <Link href="/admin/stock" className="hover:text-gray-300">Stock</Link>
        <Link href="/admin/ventas" className="hover:text-gray-300">Ventas</Link>
      </nav>
    </aside>
  );
}
