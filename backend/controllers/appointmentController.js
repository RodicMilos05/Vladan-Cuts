import asyncHandler from '../utils/asyncHandler.js';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';

const allowedStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const createAppointment = asyncHandler(async (req, res) => {
  const { serviceId, service, date, time, note } = req.body;

  const selectedServiceId = serviceId || service;

  if (!selectedServiceId || !date || !time) {
    res.status(400);
    throw new Error('Usluga, datum i vreme su obavezni.');
  }

  if (date < getTodayDate()) {
    res.status(400);
    throw new Error('Ne možete zakazati termin u prošlosti.');
  }

  const serviceExists = await Service.findById(selectedServiceId);

  if (!serviceExists) {
    res.status(404);
    throw new Error('Izabrana usluga nije pronađena.');
  }

  if (!serviceExists.isActive) {
    res.status(400);
    throw new Error('Izabrana usluga trenutno nije aktivna.');
  }

  const appointmentExists = await Appointment.findOne({
    date,
    time,
    status: { $ne: 'cancelled' },
  });

  if (appointmentExists) {
    res.status(400);
    throw new Error('Izabrani termin je već zauzet.');
  }

  const appointment = await Appointment.create({
    user: req.user._id,
    service: selectedServiceId,
    date,
    time,
    note: note || '',
    status: 'pending',
  });

  const populatedAppointment = await Appointment.findById(appointment._id)
    .populate('user', 'name email phone')
    .populate('service', 'name price duration');

  res.status(201).json(populatedAppointment);
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate('service', 'name price duration')
    .sort({ date: 1, time: 1 });

  res.json(appointments);
});

export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
    .populate('user', 'name email phone')
    .populate('service', 'name price duration')
    .sort({ date: 1, time: 1 });

  res.json(appointments);
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error('Status termina je obavezan.');
  }

  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error('Neispravan status termina.');
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Termin nije pronađen.');
  }

  appointment.status = status;

  const updatedAppointment = await appointment.save();

  const populatedAppointment = await Appointment.findById(updatedAppointment._id)
    .populate('user', 'name email phone')
    .populate('service', 'name price duration');

  res.json(populatedAppointment);
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Termin nije pronađen.');
  }

  const isOwner = appointment.user.toString() === req.user._id.toString();

  if (!isOwner && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Možete otkazati samo svoj termin.');
  }

  if (appointment.status === 'completed') {
    res.status(400);
    throw new Error('Završen termin ne može biti otkazan.');
  }

  appointment.status = 'cancelled';

  const updatedAppointment = await appointment.save();

  res.json({
    message: 'Termin je uspešno otkazan.',
    appointment: updatedAppointment,
  });
});