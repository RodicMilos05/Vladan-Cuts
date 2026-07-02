import express from 'express';
import {
  deleteUser,
  getUserProfile,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.route('/')
  .get(getUsers);

router.route('/:id')
  .delete(deleteUser);

export default router;