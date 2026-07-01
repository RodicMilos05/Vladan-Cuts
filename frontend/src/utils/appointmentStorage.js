const STORAGE_KEY = 'vladanCutsAppointments';

export const getStoredAppointments = () => {
  const appointmentsFromStorage = localStorage.getItem(STORAGE_KEY);

  if (!appointmentsFromStorage) {
    return [];
  }

  try {
    return JSON.parse(appointmentsFromStorage);
  } catch (error) {
    console.error('Greška prilikom čitanja termina iz localStorage:', error);
    return [];
  }
};

export const saveStoredAppointment = (appointment) => {
  const appointments = getStoredAppointments();

  const updatedAppointments = [appointment, ...appointments];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));

  return updatedAppointments;
};

export const cancelStoredAppointment = (appointmentId) => {
  const appointments = getStoredAppointments();

  const updatedAppointments = appointments.map((appointment) => {
    if (appointment.id === appointmentId) {
      return {
        ...appointment,
        status: 'cancelled',
      };
    }

    return appointment;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));

  return updatedAppointments;
};

export const isAppointmentTaken = (date, time) => {
  const appointments = getStoredAppointments();

  return appointments.some((appointment) => {
    return (
      appointment.date === date &&
      appointment.time === time &&
      appointment.status !== 'cancelled'
    );
  });
};