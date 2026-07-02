import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/Review.js';

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  res.json(reviews);
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400);
    throw new Error('Ocena i komentar su obavezni.');
  }

  if (Number(rating) < 1 || Number(rating) > 5) {
    res.status(400);
    throw new Error('Ocena mora biti između 1 i 5.');
  }

  const review = await Review.create({
    user: req.user._id,
    rating: Number(rating),
    comment,
  });

  const populatedReview = await Review.findById(review._id).populate(
    'user',
    'name'
  );

  res.status(201).json(populatedReview);
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Komentar nije pronađen.');
  }

  await review.deleteOne();

  res.json({
    message: 'Komentar je uspešno obrisan.',
  });
});