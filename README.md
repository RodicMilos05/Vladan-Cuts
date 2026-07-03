# Vladan Cuts

Vladan Cuts je web aplikacija za frizerski/barbershop salon. Aplikacija omogućava pregled usluga, galerije radova, komentara korisnika i online zakazivanje termina.

Projekat je rađen kao studentski projekat iz predmeta Veb orijentisane tehnologije i sistemi.

---

## Opis projekta

Cilj projekta je izrada funkcionalne web aplikacije koja omogućava korisnicima da se registruju, prijave, pregledaju usluge salona i zakažu termin online. Administrator ima poseban deo aplikacije kroz koji može da upravlja korisnicima, uslugama, terminima, galerijom i komentarima.

Aplikacija koristi frontend, backend i bazu podataka. Frontend je izrađen u React-u, backend u Node.js/Express okruženju, dok se za bazu koristi MongoDB preko Mongoose biblioteke.

---

## Korisničke uloge

Aplikacija ima tri tipa korisnika:

- gost
- registrovani korisnik
- administrator

### Gost korisnik

Gost korisnik može da:

- pregleda početnu stranicu
- pregleda usluge
- pregleda galeriju
- pregleda komentare korisnika
- ode na stranicu za prijavu
- ode na stranicu za registraciju

Gost korisnik ne može da zakazuje termine, ostavlja komentare, menja profil ili pristupa admin panelu.

### Registrovani korisnik

Registrovani korisnik može da:

- prijavi se na sistem
- zakaže termin
- pregleda svoje termine
- otkaže svoj termin
- izmeni podatke profila
- promeni lozinku
- ostavi komentar i ocenu
- odjavi se

### Administrator

Administrator može da:

- pristupi admin panelu
- pregleda statistiku aplikacije
- pregleda registrovane korisnike
- obriše običnog korisnika
- pregleda sve termine
- promeni status termina
- dodaje, menja, aktivira, deaktivira i briše usluge
- dodaje, menja, aktivira, deaktivira i briše stavke galerije
- pregleda i briše komentare korisnika

---

## Funkcionalnosti aplikacije

### Javne funkcionalnosti

- prikaz početne stranice
- prikaz usluga
- prikaz galerije radova
- prikaz komentara korisnika
- registracija korisnika
- prijava korisnika

### Korisničke funkcionalnosti

- zakazivanje termina
- pregled sopstvenih termina
- otkazivanje termina
- pregled i izmena profila
- promena lozinke
- dodavanje komentara i ocene

### Administratorske funkcionalnosti

- admin dashboard
- pregled korisnika
- brisanje običnih korisnika
- pregled svih termina
- promena statusa termina
- CRUD operacije nad uslugama
- CRUD operacije nad galerijom
- pregled i brisanje komentara

---

## Tehnologije

### Frontend

- React
- Vite
- React Router
- React Bootstrap
- React Router Bootstrap
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- dotenv
- cors
- nodemon

---

## Struktura projekta

```txt
Vladan Cuts/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── galleryController.js
│   │   ├── reviewController.js
│   │   ├── serviceController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── GalleryItem.js
│   │   ├── Review.js
│   │   ├── Service.js
│   │   └── User.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── galleryRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   └── generateToken.js
│   ├── server.js
│   ├── seeder.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── screens/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── documentation/
├── README.md
└── .gitignore
```

---

## Pokretanje projekta

Za pokretanje projekta potrebno je imati instaliran Node.js i npm. Baza podataka se koristi preko MongoDB Atlas servisa.

Projekat se pokreće iz dva odvojena terminala:

- jedan terminal za backend
- jedan terminal za frontend

---

## Backend podešavanje

Ući u backend folder:

```bash
cd backend
```

Instalirati backend pakete:

```bash
npm install
```

Napraviti `.env` fajl na osnovu `.env.example` fajla.

Primer `.env` fajla:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Pokrenuti backend server:

```bash
npm run dev
```

Backend radi na adresi:

```txt
http://localhost:5000
```

---

## Frontend podešavanje

Ući u frontend folder:

```bash
cd frontend
```

Instalirati frontend pakete:

```bash
npm install
```

Pokrenuti frontend aplikaciju:

```bash
npm run dev
```

Frontend radi na adresi:

```txt
http://localhost:5173
```

---

## Početni podaci

Početni podaci za aplikaciju definisani su u fajlu:

```txt
backend/seeder.js
```

U tom fajlu su definisani:

- admin korisnik
- test korisnik
- početne usluge
- početne stavke galerije
- početni komentari
- početni termini

Komande za ubacivanje i brisanje početnih podataka definisane su u fajlu:

```txt
backend/package.json
```

u delu `scripts`.

Za ubacivanje početnih podataka u bazu koristi se komanda:

```bash
npm run data:import
```

Za brisanje podataka iz baze koristi se komanda:

```bash
npm run data:destroy
```

Napomena: komanda `npm run data:import` briše postojeće podatke iz kolekcija i zatim ubacuje početne podatke iz `seeder.js` fajla.

---

## Test nalozi

### Admin nalog

```txt
Email: admin@vladancuts.com
Lozinka: 123456
```

### Običan korisnik

```txt
Email: korisnik@test.com
Lozinka: 123456
```

---

## API rute

### Korisnici

```txt
POST   /api/users/register
POST   /api/users/login
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users
DELETE /api/users/:id
```

### Usluge

```txt
GET    /api/services
GET    /api/services/:id
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```

### Termini

```txt
POST   /api/appointments
GET    /api/appointments/my
GET    /api/appointments
PUT    /api/appointments/:id/status
DELETE /api/appointments/:id
```

### Galerija

```txt
GET    /api/gallery
GET    /api/gallery/:id
POST   /api/gallery
PUT    /api/gallery/:id
DELETE /api/gallery/:id
```

### Komentari

```txt
GET    /api/reviews
POST   /api/reviews
DELETE /api/reviews/:id
```

---

## Baza podataka

Aplikacija koristi MongoDB bazu podataka.

Glavne kolekcije u bazi su:

```txt
users
services
appointments
galleryitems
reviews
```

### User model

Model korisnika sadrži:

- ime i prezime
- email
- lozinku
- telefon
- informaciju da li je korisnik administrator

Lozinka se ne čuva kao običan tekst, već se hash-uje pomoću `bcryptjs` biblioteke.

### Service model

Model usluge sadrži:

- naziv usluge
- opis
- cenu
- trajanje
- status aktivnosti

### Appointment model

Model termina sadrži:

- korisnika
- uslugu
- datum
- vreme
- status termina
- napomenu

Status termina može biti:

```txt
pending
confirmed
cancelled
completed
```

### GalleryItem model

Model galerije sadrži:

- naslov
- URL slike
- opis
- kategoriju
- status aktivnosti

### Review model

Model komentara sadrži:

- korisnika
- ocenu
- komentar

---

## Autentikacija i autorizacija

Aplikacija koristi JWT token za autentikaciju korisnika.

Kada se korisnik prijavi, backend vraća token. Frontend čuva podatke korisnika u `localStorage` i šalje token backendu kroz Authorization header:

```txt
Authorization: Bearer TOKEN
```

Backend koristi middleware funkcije:

- `protect`
- `admin`

`protect` proverava da li je korisnik prijavljen.

`admin` proverava da li korisnik ima administratorska prava.

Frontend koristi komponente:

- `ProtectedRoute`
- `AdminRoute`

`ProtectedRoute` štiti stranice kojima može pristupiti samo prijavljen korisnik.

`AdminRoute` štiti admin stranice kojima može pristupiti samo administrator.

---

## Frontend rute

Javne rute:

```txt
/
 /usluge
 /galerija
 /komentari
 /prijava
 /registracija
```

Zaštićene korisničke rute:

```txt
/zakazivanje
/moji-termini
/profil
```

Zaštićene admin rute:

```txt
/admin
/admin/korisnici
/admin/usluge
/admin/termini
/admin/galerija
/admin/komentari
```

---

## Provera aplikacije

Za proveru aplikacije potrebno je pokrenuti backend i frontend.

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Aplikacija se otvara na adresi:

```txt
http://localhost:5173
```

Backend API radi na adresi:

```txt
http://localhost:5000
```

---

## Provera kao gost

Gost korisnik treba da može da:

- otvori početnu stranicu
- pregleda usluge
- pregleda galeriju
- pregleda komentare
- ode na prijavu
- ode na registraciju

Gost korisnik ne treba da može da pristupi:

- stranici za zakazivanje
- stranici moji termini
- stranici profila
- admin panelu

---

## Provera kao registrovani korisnik

Prijaviti se kao običan korisnik:

```txt
Email: korisnik@test.com
Lozinka: 123456
```

Registrovani korisnik treba da može da:

- zakaže termin
- vidi svoj termin u sekciji Moji termini
- otkaže svoj termin
- izmeni profil
- promeni lozinku
- ostavi komentar i ocenu
- odjavi se

Promene treba proveriti i u MongoDB Atlas bazi.

---

## Provera kao administrator

Prijaviti se kao admin korisnik:

```txt
Email: admin@vladancuts.com
Lozinka: 123456
```

Administrator treba da može da:

- otvori admin dashboard
- pregleda korisnike
- obriše običnog korisnika
- pregleda sve termine
- promeni status termina
- doda novu uslugu
- izmeni postojeću uslugu
- aktivira i deaktivira uslugu
- obriše uslugu
- doda novu stavku galerije
- izmeni postojeću stavku galerije
- aktivira i deaktivira stavku galerije
- obriše stavku galerije
- pregleda komentare
- obriše komentar

---

## Provera baze

Promene napravljene u aplikaciji treba da budu vidljive u MongoDB Atlas bazi.

Primeri:

- novi korisnik se pojavljuje u kolekciji `users`
- novi termin se pojavljuje u kolekciji `appointments`
- promena statusa termina se vidi u kolekciji `appointments`
- nova usluga se pojavljuje u kolekciji `services`
- nova stavka galerije se pojavljuje u kolekciji `galleryitems`
- novi komentar se pojavljuje u kolekciji `reviews`

---

## Build provera

Pre finalne predaje može se proveriti da li se frontend uspešno build-uje:

```bash
cd frontend
npm run build
```

Ako komanda prođe bez grešaka, frontend deo aplikacije je tehnički ispravan za build.

---

## Git i verzionisanje

Projekat je verzionisan pomoću Git-a i postavljen na GitHub repozitorijum.

Tokom izrade projekta korišćeni su zasebni commit-i za veće funkcionalne celine, na primer:

- početno podešavanje projekta
- dodavanje frontend strukture
- dodavanje backend strukture
- povezivanje MongoDB baze
- dodavanje modela
- dodavanje autentikacije
- dodavanje API ruta
- povezivanje frontenda sa backendom
- dodavanje admin panela
- završno sređivanje dizajna
- dodavanje dokumentacije

---

## Napomene

`.env` fajl se ne šalje na GitHub jer sadrži privatne podatke kao što su MongoDB connection string i JWT secret.

Na GitHub se šalje samo `.env.example`, koji služi kao primer potrebnih promenljivih.

U projektu se za slike u galeriji koriste URL linkovi, bez upload-a lokalnih fajlova.

Aplikacija se pokreće lokalno, ali koristi online MongoDB Atlas bazu.