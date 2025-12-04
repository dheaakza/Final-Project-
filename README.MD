# 📝 TO DO LIST / PENGINGAT TUGAS

## 👥 Kelompok 5 - Anggota Tim
- **Dhea Anjam Akza Rosya** (701230040)
- **Julia Herwanda** (701230064)
- **Angela Portuna** (701230003)

---

## 📖 Deskripsi Singkat Aplikasi

**TO DO LIST / Pengingat Tugas** adalah aplikasi manajemen tugas berbasis web dan mobile yang dirancang untuk membantu pengguna dalam mengatur, mencatat, dan mengingat berbagai aktivitas atau tugas sehari-hari. Aplikasi ini berfungsi sebagai asisten pribadi digital yang mempermudah pengelolaan waktu dan prioritas pekerjaan dengan fitur lengkap seperti pengingat otomatis, journaling, dan dashboard interaktif.

---

## 🎯 Tujuan Sistem & Permasalahan yang Diselesaikan

### Permasalahan:
- Kesulitan mengingat deadline tugas dan aktivitas penting
- Tidak terorganisirnya daftar pekerjaan harian
- Kurangnya sistem pengingat yang efektif
- Sulitnya melacak progress penyelesaian tugas

### Solusi:
Aplikasi ini menyediakan sistem manajemen tugas yang komprehensif dengan fitur:
- ✅ Manajemen tugas (Tambah, Edit, Hapus)
- 🔔 Sistem reminder otomatis (notifikasi 2 hari sebelum deadline)
- ✓ Checklist status penyelesaian tugas
- 🔍 Pencarian tugas berdasarkan kata kunci
- 📔 Journaling untuk catatan harian/traveling
- 📊 Dashboard untuk monitoring progress tugas

---

## 🛠️ Teknologi yang Digunakan

### Frontend:
- **HTML5** - Struktur halaman
- **CSS3** - Styling dan layout
- **JavaScript** - Interaktivitas aplikasi
- **React Native / Flutter** (untuk versi mobile)

### Backend:
- **Firebase Cloud Functions** - Serverless backend
- **Firebase Cloud Firestore** - NoSQL Database
- **Firebase Authentication** - Sistem login/register

### Arsitektur:
- **3-Tier Architecture** (Presentation, Application Logic, Data Layer)

### Tools & Deployment:
- **Git & GitHub** - Version control
- **Firebase Hosting** - Deployment web
- **Android Studio** - Build APK (untuk versi mobile)

---

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat:
- Node.js (versi 14 atau lebih baru)
- NPM atau Yarn
- Firebase CLI (untuk deployment)
- Git

### 1️⃣ Instalasi
```bash
# Clone repository
git clone https://github.com/username/todolist-app.git

# Masuk ke direktori project
cd todolist-app

# Install dependencies
npm install
```

### 2️⃣ Konfigurasi

1. Buat project Firebase di [Firebase Console](https://console.firebase.google.com/)
2. Copy file konfigurasi Firebase ke `.env`:
```bash
# Buat file .env di root project
touch .env
```

3. Isi file `.env` dengan kredensial Firebase:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3️⃣ Menjalankan Aplikasi
```bash
# Development mode
npm start

# Build untuk production
npm run build

# Deploy ke Firebase Hosting
firebase deploy
```

Aplikasi akan berjalan di: `http://localhost:3000`

---

## 🔐 Akun Demo

Untuk testing aplikasi, gunakan akun berikut:

**Username:** `demo@todolist.com`  
**Password:** `Demo123`

---

## 🔗 Link Deployment & Demo

- **🌐 Link Aplikasi Web:** [https://todolist-app.web.app](https://todolist-app.web.app)
- **📱 Download APK:** [Download APK v1.0](https://drive.google.com/file/d/xxx)
- **🎥 Video Demo:** [Tonton di YouTube](https://youtube.com/watch?v=xxx)

---

## 📸 Screenshot Aplikasi

### Halaman Login
![Login Page](screenshots/login.png)

### Dashboard Utama
![Dashboard](screenshots/dashboard.png)

### Halaman Tambah Tugas
![Add Task](screenshots/add-task.png)

### Halaman Journaling
![Journaling](screenshots/journaling.png)

---

## 📋 Fitur Aplikasi

| No | Fitur | Deskripsi | Status |
|----|-------|-----------|--------|
| 1 | **Login & Register** | Autentikasi pengguna | ✅ Selesai |
| 2 | **Tambah Tugas** | Membuat tugas baru dengan judul, deskripsi, deadline | ✅ Selesai |
| 3 | **Edit Tugas** | Memperbarui informasi tugas | ✅ Selesai |
| 4 | **Hapus Tugas** | Menghapus tugas yang tidak diperlukan | ✅ Selesai |
| 5 | **Checklist Tugas** | Menandai tugas selesai/belum selesai | ✅ Selesai |
| 6 | **Reminder** | Notifikasi 2 hari sebelum deadline | ✅ Selesai |
| 7 | **Pencarian Tugas** | Mencari tugas berdasarkan kata kunci | ✅ Selesai |
| 8 | **Journaling** | Membuat catatan harian/traveling | ✅ Selesai |
| 9 | **Dashboard** | Monitoring progress tugas | ✅ Selesai |

---

## 📝 Catatan Tambahan

### ⚠️ Keterbatasan Sistem:
- Aplikasi versi mobile saat ini hanya tersedia untuk platform **Android**
- Dukungan untuk **iOS** akan dipertimbangkan pada fase pengembangan selanjutnya
- Fitur kolaborasi multi-user belum tersedia di versi saat ini
- Notifikasi reminder memerlukan koneksi internet aktif

### 🔧 Fitur dalam Pengembangan:
- [ ] Sinkronisasi multi-device
- [ ] Integrasi kalender Google
- [ ] Mode offline penuh
- [ ] Tema dark mode
- [ ] Export data ke PDF/Excel

### 💡 Petunjuk Penggunaan:
1. **Mengatur Prioritas:** Gunakan label warna untuk membedakan tingkat prioritas tugas (Merah: Tinggi, Kuning: Sedang, Hijau: Rendah)
2. **Reminder:** Pastikan notifikasi browser/mobile telah diaktifkan untuk menerima pengingat
3. **Journaling:** Fitur journaling ideal untuk mencatat rencana traveling atau refleksi harian
4. **Dashboard:** Pantau progress melalui progress bar di dashboard utama

---

## 🎓 Informasi Tugas Akademik

Project ini dibuat untuk memenuhi tugas **Final Project Mata Kuliah Rekayasa Perangkat Lunak**.

**Dosen Pengampu:** Dila Nurlaila, M.Kom  
**Program Studi:** Sistem Informasi  
**Fakultas:** Sains dan Teknologi  
**Universitas:** Universitas Islam Negeri Sulthan Thaha Saifuddin Jambi  
**Tahun Akademik:** 2024/2025

---

## 📚 Referensi & Dokumentasi

- [Software Requirement Specification (SRS) - Full Document](docs/SRS_Kelompok5.pdf)
- [User Acceptance Testing (UAT) Report](docs/UAT_Report.pdf)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)

---

## 📞 Kontak & Support

Untuk pertanyaan, bug report, atau saran pengembangan:

- **Email:** kelompok5.si@example.com
- **GitHub Issues:** [Create Issue](https://github.com/username/todolist-app/issues)

---

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik. © 2025 Kelompok 5 - Sistem Informasi UIN STS Jambi

---

**⭐ Jika project ini bermanfaat, jangan lupa beri star di repository ini!**
```

---

## 🎨 Catatan Penggunaan README:

1. **Ganti placeholder** seperti:
   - `username/todolist-app.git` dengan URL repository yang sebenarnya
   - Link deployment, APK, dan video demo dengan link yang valid
   - Path screenshot dengan lokasi file screenshot yang sebenarnya

2. **Tambahkan folder screenshots** di repository dengan struktur:
```
   screenshots/
   ├── login.png
   ├── dashboard.png
   ├── add-task.png
   └── journaling.png
```

3. **Buat folder docs** untuk menyimpan dokumen pendukung:
```
   docs/
   ├── SRS_Kelompok5.pdf
   └── UAT_Report.pdf