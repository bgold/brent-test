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
  // no end time → assume 2h so calendars don't get a zero-length block
  const endOf = (e) => e.end || new Date(new Date(e.date).getTime() + 2 * 36e5).toISOString();
  const gcal = (e) => {
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: `${e.name} — ${W.couple.first} & ${W.couple.second}`,
      dates: `${icsDate(e.date)}/${icsDate(endOf(e))}`,
      location: [e.venue, e.address].filter(Boolean).join(", "),
      details: e.note || "",
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  };
  const ics = (e) => {
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//wedding//EN", "BEGIN:VEVENT",
      `UID:${icsDate(e.date)}-${e.name.replace(/\W/g, "")}@wedding`,
      `DTSTAMP:${icsDate(Date.now())}`, `DTSTART:${icsDate(e.date)}`, `DTEND:${icsDate(endOf(e))}`,
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
  const eventHtml = (e) => {
    const timed = !dayOnly(e.date);
    const map = e.mapQuery || [e.venue, e.address].filter(Boolean).join(" ");
    const links = [
      e.mapQuery || e.address ? `<a target="_blank" rel="noopener" href="https://maps.google.com/?q=${encodeURIComponent(map)}">Map</a>` : "",
      timed ? `<a target="_blank" rel="noopener" href="${gcal(e)}">Google Cal</a>` : "",
      timed ? `<a download="${esc(e.name)}.ics" href="${ics(e)}">iCal</a>` : "",
    ].filter(Boolean);
    return `
      <article class="event">
        <div class="event-time">${timed ? tm(e.date) : ""}</div>
        <div class="event-main">
          <h4>${esc(e.name)}</h4>
          <p class="venue">${[e.venue, e.address].filter(Boolean).map(esc).join(" · ")}</p>
          ${e.note ? `<p class="note">${esc(e.note)}</p>` : ""}
          ${e.attire ? `<p class="attire">${esc(e.attire)}</p>` : ""}
          ${links.length ? `<p class="links">${links.join("")}</p>` : ""}
        </div>
      </article>`;
  };
  // group by local calendar day of the start time (en-CA formats as YYYY-MM-DD)
  const dayKey = (e) => dayOnly(e.date) ? e.date : new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(new Date(e.date));
  const days = [];
  W.events.forEach((e) => {
    const k = dayKey(e);
    const d = days.find((x) => x.k === k) || days[days.push({ k, events: [] }) - 1];
    d.events.push(e);
  });
  const dayFmt = (k, o) => fmt(`${k}T12:00:00Z`, { timeZone: "UTC", ...o });
  $("#events").innerHTML = days.map((d, i) => {
    const img = W.dayImages?.[d.k];
    return `
    <section class="day${i % 2 ? " flip" : ""}${img ? "" : " no-img"}">
      ${img ? `<div class="day-img"><img src="${esc(img)}" alt="" loading="lazy"></div>` : ""}
      <div class="day-body">
        <p class="day-date">${dayFmt(d.k, { month: "long", day: "numeric" })}</p>
        <h3 class="day-name">${dayFmt(d.k, { weekday: "long" })}</h3>
        ${d.events.map(eventHtml).join("")}
      </div>
    </section>`;
  }).join("");

  // ── where to stay ──
  const S = window.STAY;
  if (!S?.hotels?.length) hide("stay");
  else {
    const usd = (n) => "$" + Math.round(n).toLocaleString("en-US");
    const thb = (n) => "฿" + Math.round(n).toLocaleString("en-US");
    const span = (a, b) => `${fmt(a + "T12:00:00Z", { timeZone: "UTC", month: "short", day: "numeric" })}–${fmt(b + "T12:00:00Z", { timeZone: "UTC", day: "numeric" })}`;
    const roomHtml = (r) => {
      const price = (r.usd ?? r.thb / S.fx) * (1 + (S.fee || 0));
      const meta = [r.size && `${r.size} m²`, r.bed, r.guests && `sleeps ${r.guests}`].filter(Boolean).map(esc).join(" · ");
      // only show agoda when it actually makes our price look good
      const ag = r.agoda && r.agoda.nonRefundable > price ? r.agoda : null;
      return `
        <div class="room">
          ${r.image ? `<img src="${esc(r.image)}" alt="" loading="lazy">` : `<div class="room-ph" aria-hidden="true"></div>`}
          <h4>${esc(r.name)}</h4>
          ${meta ? `<p class="room-meta">${meta}</p>` : ""}
          <p class="room-price"><strong>${usd(price)}</strong> / night${r.thb ? ` <span>(${thb(price * S.fx)})</span>` : ""}</p>
          ${r.checkIn ? `<p class="room-nights">${span(r.checkIn, r.checkOut)} · ${r.count} in our block</p>` : ""}
          ${ag ? `<p class="room-compare">On Agoda: ${usd(ag.nonRefundable)} non-refundable${ag.refundable ? ` · ${usd(ag.refundable)} flexible` : ""}</p>` : ""}
          ${r.url ? `<a class="room-link" target="_blank" rel="noopener" href="${esc(r.url)}">Room details</a>` : ""}
        </div>`;
    };
    $("#stay-intro").textContent = S.intro;
    $("#stay-how").innerHTML = S.howItWorks.map((s) => `<li>${esc(s)}</li>`).join("");
    $("#hotels").innerHTML = S.hotels.map((h) => `
      <article class="hotel${h.image ? "" : " no-img"}">
        <div class="hotel-head">
          ${h.image ? `<img class="hotel-img" src="${esc(h.image)}" alt="${esc(h.name)}" loading="lazy">` : ""}
          <div class="hotel-info">
            <p class="hotel-tag">${esc(h.tag)}</p>
            <h3>${esc(h.name)}</h3>
            <p class="hotel-loc">${esc(h.location)}</p>
            <p class="hotel-blurb">${esc(h.blurb)}</p>
            <dl class="hotel-notes">
              <div><dt>Best for</dt><dd>${esc(h.bestFor)}</dd></div>
              <div><dt>Worth knowing</dt><dd>${esc(h.worthKnowing)}</dd></div>
            </dl>
            <p class="links">
              ${h.url ? `<a target="_blank" rel="noopener" href="${esc(h.url)}">Hotel website</a>` : ""}
              ${h.address ? `<a target="_blank" rel="noopener" href="https://maps.google.com/?q=${encodeURIComponent(h.name + " " + h.address)}">Map</a>` : ""}
            </p>
          </div>
        </div>
        <div class="rooms">${h.rooms.map(roomHtml).join("")}</div>
      </article>`).join("");
    $("#stay").insertAdjacentHTML("beforeend", `<p class="stay-fine">Prices are per room per night, including taxes and fees. Agoda prices for the same dates as of ${esc(S.agodaCheckedAt)}.</p>`);
  }

  // ── travel ──
  $("#travel-items").innerHTML = W.travel.items.map((t) => `
    <div class="card">
      ${t.image ? `<img src="${esc(t.image)}" alt="" loading="lazy">` : ""}
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
