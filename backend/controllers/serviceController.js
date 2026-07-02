import asyncHandler from '../utils/asyncHandler.js';

export const getServices = asyncHandler(async (req, res) => {
  res.json({
    message: 'Lista usluga - ruta radi',
  });
});

export const getServiceById = asyncHandler(async (req, res) => {
  res.json({
    message: `Detalji usluge ${req.params.id} - ruta radi`,
  });
});

export const createService = asyncHandler(async (req, res) => {
  res.json({
    message: 'Kreiranje usluge - ruta radi',
  });
});

export const updateService = asyncHandler(async (req, res) => {
  res.json({
    message: `Izmena usluge ${req.params.id} - ruta radi`,
  });
});

export const deleteService = asyncHandler(async (req, res) => {
  res.json({
    message: `Brisanje usluge ${req.params.id} - ruta radi`,
  });
});