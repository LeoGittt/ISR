'use client';

import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
  vehicle: string;
  comments?: string;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const sortedAppointments = [...appointments].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Próximos Turnos Registrados</h2>
      <div className="max-w-4xl mx-auto">
        <ul className="space-y-4">
          {sortedAppointments.map((appt) => (
            <li key={appt.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(parseISO(appt.date), "EEEE, d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                  <p className="font-bold text-2xl text-gray-900 dark:text-white">{appt.service}</p>
                  <p className="font-semibold text-gray-700 dark:text-gray-200 mt-1">{appt.vehicle}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-extrabold text-3xl text-blue-600 dark:text-blue-400">{appt.time}</p>
                </div>
              </div>
              {appt.comments && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap"><strong>Comentarios:</strong> {appt.comments}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

