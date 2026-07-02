import asyncHandler from '../utils/asyncHandler.js';

export const getReviews = asyncHandler(async (req, res) => {
  res.json({
    message: 'Lista komentara - ruta radi',
  });
});

export const createReview = asyncHandler(async (req, res) => {
  res.json({
    message: 'Dodavanje komentara - ruta radi',
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  res.json({
    message: `Brisanje komentara ${req.params.id} - ruta radi`,
  });
});