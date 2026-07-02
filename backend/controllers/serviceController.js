import asyncHandler from '../utils/asyncHandler.js';
import Service from '../models/Service.js';

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({}).sort({ createdAt: -1 });

  res.json(services);
});

export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Usluga nije pronađena.');
  }

  res.json(service);
});

export const createService = asyncHandler(async (req, res) => {
  const { name, description, price, duration, isActive } = req.body;

  if (!name || !description || price === undefined || duration === undefined) {
    res.status(400);
    throw new Error('Naziv, opis, cena i trajanje su obavezni.');
  }

  if (Number(price) < 0) {
    res.status(400);
    throw new Error('Cena ne može biti negativna.');
  }

  if (Number(duration) < 1) {
    res.status(400);
    throw new Error('Trajanje mora biti najmanje 1 minut.');
  }

  const service = await Service.create({
    name,
    description,
    price: Number(price),
    duration: Number(duration),
    isActive: isActive === undefined ? true : isActive,
  });

  res.status(201).json(service);
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Usluga nije pronađena.');
  }

  const { name, description, price, duration, isActive } = req.body;

  if (price !== undefined && Number(price) < 0) {
    res.status(400);
    throw new Error('Cena ne može biti negativna.');
  }

  if (duration !== undefined && Number(duration) < 1) {
    res.status(400);
    throw new Error('Trajanje mora biti najmanje 1 minut.');
  }

  service.name = name || service.name;
  service.description = description || service.description;
  service.price = price === undefined ? service.price : Number(price);
  service.duration = duration === undefined ? service.duration : Number(duration);
  service.isActive = isActive === undefined ? service.isActive : isActive;

  const updatedService = await service.save();

  res.json(updatedService);
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Usluga nije pronađena.');
  }

  await service.deleteOne();

  res.json({
    message: 'Usluga je uspešno obrisana.',
  });
});