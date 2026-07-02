import express from 'express';
import {
  createReview,
  deleteReview,
  getReviews,
} from '../controllers/reviewController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(protect, createReview);

router.route('/:id')
  .delete(protect, admin, deleteReview);

export default router;