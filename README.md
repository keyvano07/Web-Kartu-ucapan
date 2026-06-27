# 🌸 Web Greeting Card Generator (Generator Kartu Ucapan Interaktif)

Aplikasi web modern berbasis **React + TypeScript + Vite** untuk membuat, mengkustomisasi, dan mengunduh kartu ucapan berkualitas tinggi secara real-time dengan tema estetis dan animasi dinamis.

---

## ✨ Fitur Utama

*   **✍️ Live Editor Panel (Kustomisasi Real-Time)**:
    *   Ubah label atas, judul utama, subjudul, ucapan miring, pesan hangat, hingga label pengirim secara instan.
    *   **Sistem Tag Pengirim Dinamis**: Tambahkan banyak nama pengirim sekaligus. Hapus tag nama dengan satu klik mudah.
*   **🎨 4 Tema Estetis Pilihan**:
    *   🌸 **Pink Rose**: Sentuhan romantis nan lembut.
    *   💜 **Royal Purple**: Kesan mewah dan elegan.
    *   💚 **Emerald Sage**: Nuansa alam organik yang menenangkan.
    *   💙 **Ocean Breeze**: Tampilan modern, segar, dan profesional.
*   **📄 Ekspor PDF Resolusi Tinggi**:
    *   Dilengkapi dengan teknologi **`html2canvas-pro`** untuk merender struktur HTML + SVG menjadi canvas gambar tajam beresolusi tinggi (`scale: 3`).
    *   Secara otomatis menghitung aspek rasio kartu untuk diekspor ke dokumen **`jsPDF`** tanpa menyisakan margin kosong atau border hitam.
*   **🎉 Animasi & Umpan Balik Interaktif**:
    *   Efek transisi halus menggunakan **Framer Motion** untuk pergeseran tema dan interaksi kontrol.
    *   Perayaan semburan confetti warna-warni setelah berkas PDF selesai diunduh.
*   **🔄 Tombol Reset Cepat**: Kembalikan semua teks dan warna kartu ucapan ke pengaturan bawaan awal dengan sekali klik.

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan teknologi mutakhir untuk memastikan performa yang cepat dan pengalaman pengguna yang premium:

*   **Framework Utama**: [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/) (Ekstra cepat & ringan)
*   **Styling & Animasi**: 
    *   [Tailwind CSS v4](https://tailwindcss.com/) (Utilitas modern & efisien)
    *   [Framer Motion](https://www.framer.com/motion/) (Animasi transisi antarmuka)
    *   [Lucide React](https://lucide.dev/) (Paket ikon modern berkualitas)
*   **Mesin Ekspor PDF**:
    *   [html2canvas-pro](https://github.com/eKoopmans/html2canvas) (Mendukung rendering modern CSS seperti warna `oklch`)
    *   [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html) (Pembuat dokumen PDF sisi klien)
    *   [canvas-confetti](https://github.com/catdad/canvas-confetti) (Efek selebrasi confetti)

---

## 🚀 Panduan Memulai (Menjalankan Lokal)

Pastikan Anda telah memasang [Node.js](https://nodejs.org/) di sistem Anda sebelum melanjutkan langkah di bawah ini.

### 1. Klon Repositori
```bash
git clone git@github.com:keyvano07/Web-Kartu-ucapan.git
cd Web-Kartu-ucapan
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka browser Anda dan akses tautan lokal yang tertera di terminal (biasanya **`http://localhost:5173/`** atau **`http://localhost:5174/`**).

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build yang teroptimasi akan berada di dalam direktori `dist/` dan siap disebarluaskan.

---

## 📁 Struktur Direktori Proyek

```text
Web-Kartu-ucapan/
├── dist/                  # Output build produksi siap pakai
├── src/
│   ├── app/
│   │   ├── App.tsx        # Halaman Editor & Preview utama (State & Logic)
│   │   └── components/    # Komponen visual (Button, Input, Form)
│   ├── styles/
│   │   ├── theme.css      # Variabel warna custom tema
│   │   └── index.css      # Konfigurasi styling global Tailwind
│   └── main.tsx           # Entrypoint aplikasi
├── index.html             # Template HTML utama & import Google Fonts
├── package.json           # Dependensi pustaka
└── vite.config.ts         # Konfigurasi bundler Vite
```

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan personal dan pembelajaran. Bebas digunakan, dimodifikasi, dan didistribusikan kembali.