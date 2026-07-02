import express from 'express';
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';

const router = express.Router();

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.get('/my', getMyAppointments);

router.route('/:id')
  .delete(deleteAppointment);

router.put('/:id/status', updateAppointmentStatus);

export default router;