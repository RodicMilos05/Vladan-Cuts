import express from 'express';
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItemById,
  getGalleryItems,
  updateGalleryItem,
} from '../controllers/galleryController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGalleryItems)
  .post(protect, admin, createGalleryItem);

router.route('/:id')
  .get(getGalleryItemById)
  .put(protect, admin, updateGalleryItem)
  .delete(protect, admin, deleteGalleryItem);

export default router;