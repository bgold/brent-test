(() => {
  const W = window.WEDDING;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tz = W.timezone;
  const fmt = (d, o) => new Intl.DateTimeFormat("en-US", { timeZone: tz, ...o }).format(new Date(d));

  // ── simple bindings ──
  const binds = {
    monogram: W.couple.monogram,
    first: W.couple.first,
    second: W.couple.second,
    tagline: W.tagline,
    location: W.location,
    dateLong: W.dateDisplay || fmt(W.date, { month: "long", day: "numeric", year: "numeric" }),
    dateShort: fmt(W.date, { month: "2-digit", day: "2-digit", year: "numeric" }).replace(/\//g, " · "),
    introEyebrow: W.intro.eyebrow,
    introHeading: W.intro.heading,
    travelIntro: W.travel.intro,
    registryIntro: W.registry.intro,
  };
  document.querySelectorAll("[data-bind]").forEach((el) => (el.textContent = binds[el.dataset.bind] ?? ""));
  document.title = `${W.couple.first} & ${W.couple.second} · ${binds.dateLong}`;

  // ── hero photo ──
  if (W.heroImage) {
    $(".hero").classList.add("has-photo");
    $(".hero-bg").style.backgroundImage = `url("${W.heroImage}")`;
  }

  // ── countdown ──
  const cd = $("#countdown");
  const target = new Date(W.date).getTime();
  const tick = () => {
    const ms = target - Date.now();
    if (ms <= 0) { cd.innerHTML = `<div><strong>Just married</strong></div>`; return; }
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    cd.innerHTML = [[d, "Days"], [h, "Hours"], [m, "Minutes"], [s, "Seconds"]]
      .map(([n, l]) => `<div><strong>${String(n).padStart(2, "0")}</strong><small>${l}</small></div>`).join("");
  };
  tick(); setInterval(tick, 1000);

  // ── empty sections hide themselves (and their nav link) ──
  const hide = (id) => { $("#" + id).hidden = true; $(`.nav-links a[href="#${id}"]`)?.parentElement.remove(); };
  if (!W.intro?.paragraphs?.length) hide("story");
  if (!W.events?.length) hide("schedule");
  if (!W.travel?.items?.length) hide("travel");
  if (!W.registry?.links?.length) hide("registry");
  if (!W.faqs?.length) hide("faq");

  // ── intro ──
  $("#story-text").innerHTML = (W.intro.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#story-photos").innerHTML = (W.intro.photos || []).map((src) => `<img src="${esc(src)}" alt="" loading="lazy">`).join("");

  // ── events + add-to-calendar ──
  const icsDate = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const gcal = (e) => {
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: `${e.name} — ${W.couple.first} & ${W.couple.second}`,
      dates: `${icsDate(e.date)}/${icsDate(e.end || e.date)}`,
      location: [e.venue, e.address].filter(Boolean).join(", "),
      details: e.note || "",
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  };
  const ics = (e) => {
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//wedding//EN", "BEGIN:VEVENT",
      `UID:${icsDate(e.date)}-${e.name.replace(/\W/g, "")}@wedding`,
      `DTSTAMP:${icsDate(Date.now())}`, `DTSTART:${icsDate(e.date)}`, `DTEND:${icsDate(e.end || e.date)}`,
      `SUMMARY:${e.name} — ${W.couple.first} & ${W.couple.second}`,
      `LOCATION:${[e.venue, e.address].filter(Boolean).join(", ").replace(/,/g, "\\,")}`,
      `DESCRIPTION:${(e.note || "").replace(/,/g, "\\,")}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(body);
  };
  // a bare "YYYY-MM-DD" means the time isn't set yet: show the day only, at noon local so tz can't shift it
  const dayOnly = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
  const tm = (d) => fmt(d, { hour: "numeric", minute: "2-digit" });
  $("#events").innerHTML = W.events.map((e) => {
    const timed = !dayOnly(e.date);
    const when = timed ? e.date : `${e.date}T12:00:00Z`;
    const map = e.mapQuery || [e.venue, e.address].filter(Boolean).join(" ");
    return `
    <article class="event">
      <span class="when">${fmt(when, timed ? { weekday: "long", month: "long", day: "numeric" } : { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" })}</span>
      <h3>${esc(e.name)}</h3>
      ${timed ? `<span class="time">${tm(e.date)}${e.end ? " – " + tm(e.end) : ""}</span>` : ""}
      <span class="venue">${esc(e.venue)}</span>
      ${e.address ? `<address>${esc(e.address)}</address>` : ""}
      ${e.attire ? `<span class="attire">${esc(e.attire)}</span>` : ""}
      ${e.note ? `<p class="note">${esc(e.note)}</p>` : ""}
      <div class="actions">
        ${e.mapQuery || e.address ? `<a class="btn btn-sm" target="_blank" rel="noopener" href="https://maps.google.com/?q=${encodeURIComponent(map)}">Map</a>` : ""}
        ${timed ? `<a class="btn btn-sm" target="_blank" rel="noopener" href="${gcal(e)}">Google Cal</a>
        <a class="btn btn-sm" download="${esc(e.name)}.ics" href="${ics(e)}">iCal</a>` : ""}
      </div>
    </article>`;
  }).join("");

  // ── travel ──
  $("#travel-items").innerHTML = W.travel.items.map((t) => `
    <div class="card">
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.body)}</p>
      ${t.link ? `<a class="link" target="_blank" rel="noopener" href="${esc(t.link)}">${esc(t.linkLabel || "Learn more")}</a>` : ""}
    </div>`).join("");

  // ── gallery ──
  if (W.gallery?.length) {
    const g = $("#gallery");
    g.hidden = false;
    g.innerHTML = W.gallery.map((src) => `<img src="${esc(src)}" alt="" loading="lazy">`).join("");
  }

  // ── registry ──
  $("#registry-links").innerHTML = W.registry.links
    .map((r) => `<a class="btn" target="_blank" rel="noopener" href="${esc(r.url)}">${esc(r.label)}</a>`).join("");

  // ── faq ──
  $("#faqs").innerHTML = W.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");

  // ── rsvp ──
  const form = $("#rsvp-form");
  if (!W.rsvp.open) {
    form.hidden = true;
    $("#rsvp-lede").textContent = W.rsvp.closedNote;
    $(".nav-cta").textContent = $(".hero .btn").textContent = "Reply";
  } else {
    $("#rsvp-lede").textContent = W.rsvp.deadline ? `Please respond by ${W.rsvp.deadline}.` : "";
  }
  const status = $("#form-status");
  const extra = $(".if-attending");
  $("#r-meal").innerHTML = W.rsvp.mealOptions.map((m) => `<option>${esc(m)}</option>`).join("");
  form.addEventListener("change", (ev) => {
    if (ev.target.name === "attending") extra.classList.toggle("off", ev.target.value === "no");
    ev.target.closest(".field")?.classList.remove("invalid");
  });
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    let ok = true;
    ["name", "email"].forEach((n) => {
      const el = form.elements[n];
      const bad = !el.value.trim() || (n === "email" && !el.checkValidity());
      el.closest(".field").classList.toggle("invalid", bad);
      ok &&= !bad;
    });
    if (!form.elements.attending.value) { $(".choice").classList.add("invalid"); ok = false; }
    if (!ok) { status.textContent = "Just a couple more details…"; return; }

    const data = Object.fromEntries(new FormData(form));
    if (data.attending === "no") ["guests", "meal", "dietary", "song"].forEach((k) => delete data[k]);

    if (!W.rsvp.formEndpoint) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
      location.href = `mailto:${W.rsvp.email}?subject=${encodeURIComponent("RSVP — " + data.name)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Opening your email app…";
      return;
    }
    status.textContent = "Sending…";
    try {
      const res = await fetch(W.rsvp.formEndpoint, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      extra.classList.remove("off");
      status.textContent = data.attending === "yes" ? "Yay! We can't wait to celebrate with you." : "We'll miss you — thank you for letting us know.";
    } catch {
      status.textContent = `Something went wrong. Please email us at ${W.rsvp.email}.`;
    }
  });

  // ── nav ──
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  const toggle = $(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); document.body.style.overflow = "";
  }));

  // ── reveal ──
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
