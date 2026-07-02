import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import connectDB from './config/db.js';

import User from './models/User.js';
import Service from './models/Service.js';
import Appointment from './models/Appointment.js';
import GalleryItem from './models/GalleryItem.js';
import Review from './models/Review.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin Korisnik',
    email: 'admin@vladancuts.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '0600000000',
    isAdmin: true,
  },
  {
    name: 'Test Korisnik',
    email: 'korisnik@test.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '0601234567',
    isAdmin: false,
  },
];

const services = [
  {
    name: 'Muško šišanje',
    description: 'Klasično ili moderno muško šišanje prema želji klijenta.',
    price: 800,
    duration: 30,
    isActive: true,
  },
  {
    name: 'Fade šišanje',
    description: 'Precizno fade šišanje sa postepenim prelazom.',
    price: 1000,
    duration: 40,
    isActive: true,
  },
  {
    name: 'Šišanje + brada',
    description: 'Kompletna usluga šišanja i sređivanja brade.',
    price: 1300,
    duration: 50,
    isActive: true,
  },
  {
    name: 'Sređivanje brade',
    description: 'Oblikovanje, skraćivanje i sređivanje brade.',
    price: 600,
    duration: 20,
    isActive: true,
  },
];

const galleryItems = [
  {
    title: 'Classic fade',
    category: 'Fade',
    imageUrl:
      'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?auto=format&fit=crop&w=900&q=80',
    description: 'Moderan fade stil sa čistim prelazom.',
    isActive: true,
  },
  {
    title: 'Short crop',
    category: 'Short hair',
    imageUrl:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    description: 'Kratka frizura za svakodnevni moderan izgled.',
    isActive: true,
  },
  {
    title: 'Beard trim',
    category: 'Brada',
    imageUrl:
      'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80',
    description: 'Precizno oblikovanje i sređivanje brade.',
    isActive: true,
  },
  {
    title: 'Modern haircut',
    category: 'Modern',
    imageUrl:
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
    description: 'Savremeno muško šišanje prilagođeno obliku lica.',
    isActive: true,
  },
];

const importData = async () => {
  try {
    await Appointment.deleteMany();
    await Review.deleteMany();
    await GalleryItem.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0];
    const regularUser = createdUsers[1];

    const createdServices = await Service.insertMany(services);
    const createdGalleryItems = await GalleryItem.insertMany(galleryItems);

    const reviews = [
      {
        user: regularUser._id,
        rating: 5,
        comment: 'Odlično šišanje, sve brzo i profesionalno. Preporuka!',
      },
      {
        user: regularUser._id,
        rating: 5,
        comment: 'Fade urađen baš kako sam tražio. Sigurno dolazim opet.',
      },
      {
        user: adminUser._id,
        rating: 4,
        comment: 'Dobra usluga, prijatan ambijent i lako zakazivanje.',
      },
    ];

    await Review.insertMany(reviews);

    const appointments = [
      {
        user: regularUser._id,
        service: createdServices[0]._id,
        date: '2026-07-05',
        time: '10:00',
        status: 'pending',
        note: 'Test termin iz seed podataka.',
      },
      {
        user: regularUser._id,
        service: createdServices[2]._id,
        date: '2026-07-06',
        time: '15:00',
        status: 'confirmed',
        note: 'Šišanje i sređivanje brade.',
      },
    ];

    await Appointment.insertMany(appointments);

    console.log('Podaci su uspešno ubačeni u bazu.');
    console.log(`Korisnici: ${createdUsers.length}`);
    console.log(`Usluge: ${createdServices.length}`);
    console.log(`Galerija: ${createdGalleryItems.length}`);

    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error(`Greška prilikom ubacivanja podataka: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Appointment.deleteMany();
    await Review.deleteMany();
    await GalleryItem.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();

    console.log('Podaci su uspešno obrisani iz baze.');

    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error(`Greška prilikom brisanja podataka: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}