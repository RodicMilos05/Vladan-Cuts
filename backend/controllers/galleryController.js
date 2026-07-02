import asyncHandler from '../utils/asyncHandler.js';

export const getGalleryItems = asyncHandler(async (req, res) => {
  res.json({
    message: 'Galerija radova - ruta radi',
  });
});

export const getGalleryItemById = asyncHandler(async (req, res) => {
  res.json({
    message: `Detalji galerije ${req.params.id} - ruta radi`,
  });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  res.json({
    message: 'Dodavanje rada u galeriju - ruta radi',
  });
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  res.json({
    message: `Izmena rada ${req.params.id} - ruta radi`,
  });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  res.json({
    message: `Brisanje rada ${req.params.id} - ruta radi`,
  });
});