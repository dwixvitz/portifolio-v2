(() => {
  const $ = s => document.querySelector(s);
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; };
  const url = (v, base = "") => !v ? "" : /^(https?:|mailto:)/.test(v) ? v : base + v.replace(/^@/, "");
  const root = document.documentElement;

  /* tema */
  let tema; try { tema = localStorage.getItem("tema"); } catch {}
  tema = tema || (matchMedia("(prefers-color-scheme: light)").matches ? "terang" : "gelap");
  root.dataset.tema = tema;
  $("#tema").onclick = () => {
    tema = root.dataset.tema === "terang" ? "gelap" : "terang";
    root.dataset.tema = tema;
    try { localStorage.setItem("tema", tema); } catch {}
  };

  /* isi halaman dari data/profile.json */
  function tampil(p) {
    document.title = `${p.nama} — ${p.peran}`;
    $("#sapaan").textContent = p.sapaan || "";
    $("#nama").textContent = p.nama;
    $("#peran").textContent = p.peran;
    $("#tagline").textContent = p.tagline;
    $("#tentang-teks").textContent = p.tentang;
    $("#lokasi").textContent = p.lokasi || "";
    $("#footer").textContent = `© ${new Date().getFullYear()} ${p.nama}`;

    const av = $("#avatar");
    if (p.foto) { const i = el("img"); i.src = p.foto; i.alt = `Foto ${p.nama}`; av.append(i); }
    else av.textContent = p.nama.split(" ").map(k => k[0]).slice(0, 2).join("").toUpperCase();

    if (p.cv) { const a = el("a", "btn glass", "Unduh CV"); a.href = url(p.cv); a.target = "_blank"; a.rel = "noopener"; $("#cta").append(a); }
    (p.statistik || []).forEach(s => { const d = el("div"); d.append(el("b", "", s.angka), el("span", "", s.label)); $("#stat").append(d); });
    (p.keahlian || []).forEach(k => $("#keahlian").append(el("span", "chip", k)));

    (p.proyek || []).forEach(x => {
      const k = el("article", "proj glass");
      k.append(el("h3", "", x.judul), el("p", "", x.deskripsi), el("small", "", (x.tag || []).join(", ")));
      if (x.link) { const a = el("a", "btn glass", "Buka proyek"); a.href = url(x.link); a.target = "_blank"; a.rel = "noopener"; k.append(a); }
      $("#daftar-proyek").append(k);
    });

    const kt = p.kontak || {};
    const em = $("#email"); em.textContent = kt.email || ""; em.href = kt.email ? "mailto:" + kt.email : "#";
    const sosial = { github: ["GitHub", "https://github.com/"], linkedin: ["LinkedIn", "https://linkedin.com/in/"], instagram: ["Instagram", "https://instagram.com/"] };
    Object.entries(sosial).forEach(([k, [nama, base]]) => {
      if (!kt[k]) return;
      const a = el("a", "btn glass", nama); a.href = url(kt[k], base); a.target = "_blank"; a.rel = "noopener"; $("#sosial").append(a);
    });
  }

  fetch("data/profile.json").then(r => r.json()).then(tampil).catch(() => {
    $("#nama").textContent = "Data belum bisa dimuat";
    $("#tagline").textContent = "Buka lewat server lokal dengan perintah: python manage.py preview";
  });

  /* kilau kaca mengikuti kursor + latar bergeser halus */
  document.addEventListener("pointermove", e => {
    const g = e.target.closest && e.target.closest(".glass");
    if (g) { const b = g.getBoundingClientRect(); g.style.setProperty("--mx", e.clientX - b.left + "px"); g.style.setProperty("--my", e.clientY - b.top + "px"); }
    root.style.setProperty("--px", (e.clientX / innerWidth - .5).toFixed(3));
    root.style.setProperty("--py", (e.clientY / innerHeight - .5).toFixed(3));
  });

  /* menu aktif saat scroll */
  const links = [...document.querySelectorAll(".nav a")];
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting &&
    links.forEach(a => a.classList.toggle("on", a.hash === "#" + e.target.id))), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section").forEach(s => io.observe(s));
})();
