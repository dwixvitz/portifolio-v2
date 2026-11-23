# Portofolio

Situs portofolio statis dengan tampilan liquid glass. Semua isi diambil dari `data/profile.json`, jadi kamu tidak perlu menyentuh HTML, CSS, atau JavaScript.

## Mengisi biodata
Pilih salah satu:
- `python manage.py isi` — jawab pertanyaan satu per satu, file tersimpan otomatis.
- Edit `data/profile.json` langsung di editor teks atau di GitHub.

Taruh foto di folder `assets/`, lalu tulis path-nya, misalnya `assets/foto.jpg`.

## Melihat hasil di komputer
`python manage.py preview` lalu buka http://localhost:8000

## Deploy ke GitHub Pages
1. Buat repository baru, lalu unggah seluruh isi folder ini ke branch `main`.
2. Buka **Settings → Pages**, pada **Source** pilih **GitHub Actions**.
3. Setiap `git push`, situs diperbarui otomatis. Alamatnya `https://username.github.io/nama-repo/`.

## Struktur
- `index.html` — kerangka halaman
- `css/style.css` — tampilan, warna, dan efek kaca (warna ada di bagian `:root`)
- `js/main.js` — memuat data, mode terang/gelap, efek interaktif
- `data/profile.json` — biodata
- `manage.py` — alat bantu pengisian dan pratinjau
- `.github/workflows/deploy.yml` — deploy otomatis
