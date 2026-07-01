const PROFILE_KEY = 'vladanCutsProfile';

const defaultProfile = {
  name: 'Test Korisnik',
  email: 'korisnik@test.com',
  phone: '0601234567',
};

export const getStoredProfile = () => {
  const profileFromStorage = localStorage.getItem(PROFILE_KEY);

  if (!profileFromStorage) {
    return defaultProfile;
  }

  try {
    return JSON.parse(profileFromStorage);
  } catch (error) {
    console.error('Greška prilikom čitanja profila:', error);
    return defaultProfile;
  }
};

export const saveStoredProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
};