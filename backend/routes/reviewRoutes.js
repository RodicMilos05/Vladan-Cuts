import express from 'express';
import {
  createReview,
  deleteReview,
  getReviews,
} from '../controllers/reviewController.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(createReview);

router.route('/:id')
  .delete(deleteReview);

export default router;