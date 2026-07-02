import asyncHandler from '../utils/asyncHandler.js';

export const registerUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'Registracija korisnika - ruta radi',
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'Prijava korisnika - ruta radi',
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  res.json({
    message: 'Profil korisnika - ruta radi',
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.json({
    message: 'Izmena profila korisnika - ruta radi',
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  res.json({
    message: 'Lista korisnika - ruta radi',
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  res.json({
    message: `Brisanje korisnika ${req.params.id} - ruta radi`,
  });
});