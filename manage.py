"""Alat bantu portofolio.

  python manage.py isi       isi biodata lewat tanya-jawab (tanpa buka script)
  python manage.py preview   lihat situs di http://localhost:8000
"""
import functools, http.server, json, socketserver, sys, webbrowser
from pathlib import Path

ROOT = Path(__file__).parent
DATA = ROOT / "data" / "profile.json"


def tanya(label, lama=""):
    jawab = input(f"{label}" + (f" [{lama}]" if lama else "") + ": ").strip()
    return jawab or lama


def isi():
    p = json.loads(DATA.read_text(encoding="utf-8"))
    print("Isi biodata. Tekan Enter untuk mempertahankan nilai lama.\n")
    for kunci, label in [
        ("nama", "Nama lengkap"), ("peran", "Profesi"), ("tagline", "Kalimat singkat tentang kamu"),
        ("lokasi", "Lokasi"), ("foto", "Path foto, mis. assets/foto.jpg"),
        ("tentang", "Cerita singkat tentang kamu"), ("cv", "Link CV (opsional)"),
    ]:
        p[kunci] = tanya(label, p.get(kunci, ""))
    skill = tanya("Keahlian (pisahkan dengan koma)", ", ".join(p["keahlian"]))
    p["keahlian"] = [s.strip() for s in skill.split(",") if s.strip()]
    for k in ("email", "github", "linkedin", "instagram"):
        p["kontak"][k] = tanya(f"Kontak {k}", p["kontak"].get(k, ""))
    if input("\nGanti daftar proyek? (y/N): ").lower() == "y":
        proyek = []
        while True:
            judul = input("Judul proyek (kosongkan jika selesai): ").strip()
            if not judul:
                break
            proyek.append({
                "judul": judul,
                "deskripsi": input("  Deskripsi: ").strip(),
                "tag": [t.strip() for t in input("  Teknologi (koma): ").split(",") if t.strip()],
                "link": input("  Link: ").strip(),
            })
        if proyek:
            p["proyek"] = proyek
    DATA.write_text(json.dumps(p, ensure_ascii=False, indent=2), encoding="utf-8")
    print("\nTersimpan di data/profile.json")


def preview(port=8000):
    socketserver.TCPServer.allow_reuse_address = True
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
    with socketserver.TCPServer(("", port), handler) as server:
        print(f"Pratinjau di http://localhost:{port} (Ctrl+C untuk berhenti)")
        webbrowser.open(f"http://localhost:{port}")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nSelesai.")


if __name__ == "__main__":
    perintah = sys.argv[1] if len(sys.argv) > 1 else ""
    {"isi": isi, "preview": preview}.get(perintah, lambda: print(__doc__))()
