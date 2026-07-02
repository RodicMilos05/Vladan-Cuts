import asyncHandler from '../utils/asyncHandler.js';
import GalleryItem from '../models/GalleryItem.js';

export const getGalleryItems = asyncHandler(async (req, res) => {
  const galleryItems = await GalleryItem.find({}).sort({ createdAt: -1 });

  res.json(galleryItems);
});

export const getGalleryItemById = asyncHandler(async (req, res) => {
  const galleryItem = await GalleryItem.findById(req.params.id);

  if (!galleryItem) {
    res.status(404);
    throw new Error('Stavka galerije nije pronađena.');
  }

  res.json(galleryItem);
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const { title, imageUrl, description, category, isActive } = req.body;

  if (!title || !imageUrl || !description || !category) {
    res.status(400);
    throw new Error('Naslov, slika, opis i kategorija su obavezni.');
  }

  const galleryItem = await GalleryItem.create({
    title,
    imageUrl,
    description,
    category,
    isActive: isActive === undefined ? true : isActive,
  });

  res.status(201).json(galleryItem);
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const galleryItem = await GalleryItem.findById(req.params.id);

  if (!galleryItem) {
    res.status(404);
    throw new Error('Stavka galerije nije pronađena.');
  }

  const { title, imageUrl, description, category, isActive } = req.body;

  galleryItem.title = title || galleryItem.title;
  galleryItem.imageUrl = imageUrl || galleryItem.imageUrl;
  galleryItem.description = description || galleryItem.description;
  galleryItem.category = category || galleryItem.category;
  galleryItem.isActive = isActive === undefined ? galleryItem.isActive : isActive;

  const updatedGalleryItem = await galleryItem.save();

  res.json(updatedGalleryItem);
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const galleryItem = await GalleryItem.findById(req.params.id);

  if (!galleryItem) {
    res.status(404);
    throw new Error('Stavka galerije nije pronađena.');
  }

  await galleryItem.deleteOne();

  res.json({
    message: 'Stavka galerije je uspešno obrisana.',
  });
});