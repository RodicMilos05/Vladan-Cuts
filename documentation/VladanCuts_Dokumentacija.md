# Vladan Cuts - Dokumentacija projekta

## 1. Uvod

Vladan Cuts je veb aplikacija namenjena frizeru koji želi da svojim klijentima omogući jednostavnije zakazivanje termina putem interneta.

Aplikacija omogućava posetiocima da pregledaju osnovne informacije o frizeru, usluge, galeriju prethodnih radova i komentare korisnika. Registrovani korisnici mogu da zakažu termin, pregledaju svoje termine i ostave komentar. Administrator ima dodatna prava za upravljanje korisnicima, uslugama, terminima, galerijom i komentarima.

Cilj projekta je razvoj funkcionalne full-stack veb aplikacije koja koristi frontend, backend i bazu podataka.

---

## 2. Opis problema

Kod mnogih frizera zakazivanje se i dalje obavlja preko telefona, poruka ili društvenih mreža. Takav način zakazivanja može biti nepregledan jer frizer mora ručno da pamti slobodne i zauzete termine.

Problem koji aplikacija rešava je organizacija zakazivanja termina i prikaz osnovnih informacija o uslugama na jednom mestu.

Aplikacija omogućava:
- jednostavan pregled usluga,
- pregled galerije radova,
- registraciju i prijavu korisnika,
- zakazivanje termina,
- pregled korisničkih termina,
- administratorsko upravljanje podacima.

---

## 3. Ciljne grupe korisnika

Aplikacija ima tri glavne grupe korisnika:

### Gost

Gost je korisnik koji nije prijavljen na sistem.

Gost može da:
- pregleda početnu stranicu,
- pregleda usluge,
- pregleda galeriju radova,
- pregleda komentare,
- pristupi stranicama za registraciju i prijavu.

Gost ne može da zakaže termin i ne može da pristupi korisničkim ili administratorskim funkcijama.

### Registrovani korisnik

Registrovani korisnik je korisnik koji ima nalog i prijavljen je na sistem.

Registrovani korisnik može da:
- zakaže termin,
- pregleda svoje termine,
- otkaže svoj termin,
- izmeni osnovne podatke profila,
- ostavi komentar i ocenu.

### Administrator

Administrator je korisnik sa posebnim pravima.

Administrator može da:
- pregleda sve korisnike,
- pregleda sve termine,
- menja status termina,
- dodaje, menja i briše usluge,
- dodaje, menja i briše stavke iz galerije,
- briše komentare korisnika.

---

## 4. Tehnološki stek

Za izradu aplikacije koristi se MERN pristup.

### Frontend

Frontend deo aplikacije izrađuje se pomoću:
- React
- Bootstrap
- React Bootstrap
- React Router DOM
- Axios

React se koristi za pravljenje korisničkog interfejsa pomoću komponenti. Bootstrap i React Bootstrap koriste se za brže i lepše stilizovanje aplikacije. React Router DOM omogućava navigaciju između stranica. Axios se koristi za komunikaciju sa backend API rutama.

### Backend

Backend deo aplikacije izrađuje se pomoću:
- Node.js
- Express.js

Node.js omogućava izvršavanje JavaScript koda na serveru. Express.js se koristi za kreiranje servera i API ruta preko kojih frontend komunicira sa bazom podataka.

### Baza podataka

Za bazu podataka koristi se:
- MongoDB
- Mongoose

MongoDB je NoSQL baza podataka. Mongoose se koristi za definisanje modela podataka i komunikaciju između backend aplikacije i MongoDB baze.

### Autentikacija

Za autentikaciju korisnika koristi se:
- JWT
- bcryptjs

bcryptjs se koristi za šifrovanje lozinki pre čuvanja u bazi. JWT token se koristi za proveru da li je korisnik prijavljen i koju ulogu ima.

---

## 5. Arhitektura sistema

Aplikacija se sastoji iz tri glavna dela:

1. Frontend aplikacija
2. Backend API
3. MongoDB baza podataka

Tok komunikacije:

1. Korisnik koristi aplikaciju u browseru.
2. React frontend šalje zahtev backendu.
3. Express backend prima zahtev.
4. Backend komunicira sa MongoDB bazom preko Mongoose modela.
5. Backend vraća odgovor frontendu.
6. Frontend prikazuje podatke korisniku.

Primer:

Kada korisnik zakaže termin:
1. Korisnik popunjava formu za zakazivanje.
2. Frontend šalje podatke na backend rutu za kreiranje termina.
3. Backend proverava da li je korisnik prijavljen.
4. Backend proverava da li je termin slobodan.
5. Backend upisuje termin u MongoDB bazu.
6. Korisniku se prikazuje poruka da je termin uspešno zakazan.

---

## 6. Plan modela baze podataka

Aplikacija koristi sledeće modele:

### User

Model User predstavlja korisnika aplikacije.

Polja:
- name
- email
- password
- phone
- isAdmin

### Service

Model Service predstavlja frizersku uslugu.

Polja:
- name
- description
- price
- duration
- isActive

### Appointment

Model Appointment predstavlja zakazan termin.

Polja:
- user
- service
- date
- time
- status
- note

Status termina može biti:
- pending
- confirmed
- cancelled
- completed

### GalleryItem

Model GalleryItem predstavlja stavku u galeriji radova.

Polja:
- title
- imageUrl
- description
- category

### Review

Model Review predstavlja komentar i ocenu korisnika.

Polja:
- user
- rating
- comment

---

## 7. Plan stranica

Aplikacija će imati sledeće stranice:

### Javne stranice

- Početna strana
- Usluge
- Galerija
- Komentari
- Login
- Registracija

### Korisničke stranice

- Zakazivanje termina
- Moji termini
- Profil korisnika

### Administratorske stranice

- Admin dashboard
- Upravljanje korisnicima
- Upravljanje uslugama
- Upravljanje terminima
- Upravljanje galerijom
- Upravljanje komentarima

---

## 8. Plan API ruta

### Korisnici

- POST /api/users/register
- POST /api/users/login
- GET /api/users/profile
- PUT /api/users/profile
- GET /api/users
- DELETE /api/users/:id

### Usluge

- GET /api/services
- GET /api/services/:id
- POST /api/services
- PUT /api/services/:id
- DELETE /api/services/:id

### Termini

- POST /api/appointments
- GET /api/appointments/my
- GET /api/appointments
- PUT /api/appointments/:id/status
- DELETE /api/appointments/:id

### Galerija

- GET /api/gallery
- GET /api/gallery/:id
- POST /api/gallery
- PUT /api/gallery/:id
- DELETE /api/gallery/:id

### Komentari

- GET /api/reviews
- POST /api/reviews
- DELETE /api/reviews/:id

---

## 9. Plan razvoja aplikacije

Razvoj aplikacije biće podeljen u nekoliko faza:

1. Inicijalno podešavanje projekta
2. Definisanje koncepta i dokumentacije
3. Podešavanje backend strukture
4. Povezivanje sa bazom podataka
5. Kreiranje modela baze
6. Kreiranje autentikacije
7. Kreiranje API ruta
8. Kreiranje frontend stranica
9. Povezivanje frontenda i backenda
10. Izrada admin panela
11. Testiranje aplikacije
12. Završna dokumentacija

---

## 10. Moguća unapređenja

Aplikacija se u budućnosti može unaprediti dodavanjem:
- email potvrde zakazanog termina,
- SMS obaveštenja,
- online plaćanja,
- upload sistema za slike,
- kalendarskog prikaza termina,
- mogućnosti da administrator definiše radno vreme,
- mogućnosti da korisnik bira konkretnog frizera ako salon ima više zaposlenih.

---

## 11. Zaključak

Vladan Cuts aplikacija predstavlja jednostavno rešenje za online zakazivanje frizerskih termina. Projekat obuhvata javni deo aplikacije, korisnički deo, administratorski panel, rad sa bazom podataka, autentikaciju i osnovne CRUD operacije.

Aplikacija je razvijena kao full-stack veb aplikacija korišćenjem React-a, Node.js-a, Express-a, MongoDB-a i Mongoose-a.