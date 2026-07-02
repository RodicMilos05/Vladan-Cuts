import express from 'express';
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getAppointments)
  .post(protect, createAppointment);

router.get('/my', protect, getMyAppointments);

router.put('/:id/status', protect, admin, updateAppointmentStatus);

router.route('/:id')
  .delete(protect, deleteAppointment);

export default router;