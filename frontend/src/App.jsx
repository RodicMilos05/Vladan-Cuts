import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import GalleryScreen from './screens/GalleryScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BookingScreen from './screens/BookingScreen';
import MyAppointmentsScreen from './screens/MyAppointmentsScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotFoundScreen from './screens/NotFoundScreen';

import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminUsersScreen from './screens/admin/AdminUsersScreen';
import AdminServicesScreen from './screens/admin/AdminServicesScreen';
import AdminAppointmentsScreen from './screens/admin/AdminAppointmentsScreen';
import AdminGalleryScreen from './screens/admin/AdminGalleryScreen';
import AdminReviewsScreen from './screens/admin/AdminReviewsScreen';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/usluge" element={<ServicesScreen />} />
            <Route path="/galerija" element={<GalleryScreen />} />
            <Route path="/komentari" element={<ReviewsScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/registracija" element={<RegisterScreen />} />
            <Route path="/zakazivanje" element={<BookingScreen />} />
            <Route path="/moji-termini" element={<MyAppointmentsScreen />} />
            <Route path="/profil" element={<ProfileScreen />} />

            <Route path="/admin" element={<AdminDashboardScreen />} />
            <Route path="/admin/korisnici" element={<AdminUsersScreen />} />
            <Route path="/admin/usluge" element={<AdminServicesScreen />} />
            <Route path="/admin/termini" element={<AdminAppointmentsScreen />} />
            <Route path="/admin/galerija" element={<AdminGalleryScreen />} />
            <Route path="/admin/komentari" element={<AdminReviewsScreen />} />

            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;