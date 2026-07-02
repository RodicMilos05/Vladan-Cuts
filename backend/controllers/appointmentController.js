import asyncHandler from '../utils/asyncHandler.js';

export const createAppointment = asyncHandler(async (req, res) => {
  res.json({
    message: 'Zakazivanje termina - ruta radi',
  });
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  res.json({
    message: 'Moji termini - ruta radi',
  });
});

export const getAppointments = asyncHandler(async (req, res) => {
  res.json({
    message: 'Svi termini za admina - ruta radi',
  });
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  res.json({
    message: `Promena statusa termina ${req.params.id} - ruta radi`,
  });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  res.json({
    message: `Otkazivanje termina ${req.params.id} - ruta radi`,
  });
});