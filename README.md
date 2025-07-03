# Blog API with JWT Authentication

RESTful API sederhana untuk mengelola blog post dan user authentication menggunakan **Node.js**, **Express**, **Sequelize**, dan **MySQL**.

---

## Fitur

- Register dan Login user
- Enkripsi password dengan bcrypt
- Autentikasi JWT
- CRUD post oleh user yang sudah login
- Proteksi post hanya bisa diubah atau dihapus oleh author
- Unit test dengan Jest & Supertest

---

## Teknologi

- Node.js
- Express
- Sequelize ORM
- MySQL (XAMPP / MariaDB)
- BcryptJS
- JSON Web Token (JWT)
- Jest + Supertest

---

## Cara Menjalankan Project

### 1. **Clone repository**
```bash
git clone https://github.com/hafidztif23/blog-case-typescript
cd blog-case-typescript
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Buat file .env**
File .env disimpan di root
```env
JWT_SECRET=super_secret_key
```

Bisa juga ditambahkan config database, contoh:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blogdb
```

### 4. Konfigurasi database
Buat database di MySQL
```sql
CREATE DATABASE blogdb;
```

### 5. Run server
```bash
npm run dev
```
