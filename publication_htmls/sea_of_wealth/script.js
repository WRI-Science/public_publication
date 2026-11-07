(() => {
  const previewSection = new URLSearchParams(window.location.search).get("preview-section");
  if (previewSection) window.addEventListener("load", () => setTimeout(() => document.getElementById(previewSection)?.scrollIntoView(), 250));
  const content = window.SEA_OF_WEALTH || { retailers: [], secondaryRetailers: [], events: [], press: [], praise: [] };
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const currentPage = document.body.dataset.page;
  document.querySelector(`[data-nav-page="${currentPage}"]`)?.setAttribute("aria-current", "page");
  // the phone site's tab bar and Preorder button (mobile.css)
  document.querySelectorAll(`[data-m-page="${currentPage}"]`).forEach((el) => el.setAttribute("aria-current", "page"));

  const renderRetailers = () => {
    const container = document.querySelector("[data-retailers]");
    if (!container) return;
    container.innerHTML = content.retailers.map((item, index) =>
      `<a class="retailer-button ${index === 0 ? "featured" : ""}" href="${item.url}" target="_blank" rel="noreferrer"><span><strong>${item.region}</strong>${item.label}${item.note ? `<small>${item.note}</small>` : ""}</span><span aria-hidden="true">↗</span></a>`
    ).join("");
    const secondary = document.querySelector("[data-secondary-retailers]");
    if (secondary) secondary.innerHTML = `Also available via ${content.secondaryRetailers.map((item) => `<a href="${item.url}" target="_blank" rel="noreferrer">${item.label}</a>`).join(", ")}.`;
  };

  const renderEvents = () => {
    const container = document.querySelector("[data-events]");
    if (!container) return;
    const formatEventDate = (date) => new Intl.DateTimeFormat("en-US", {
      month: "long", day: "numeric"
    }).format(new Date(`${date}T12:00:00`));
    const rows = [...content.events].sort((a, b) => a.date.localeCompare(b.date)).map((event) => {
      const eventName = event.event || event.note || event.venue || "Event details to come";
      const location = event.location || event.city || event.venue || "Location to come";
      const rsvp = event.url
        ? `<a class="event-rsvp" href="${event.url}" target="_blank" rel="noreferrer">RSVP <span aria-hidden="true">↗</span></a>`
        : `<span class="event-rsvp-pending">RSVP</span>`;
      return `<tr><td data-label="Date"><time datetime="${event.date}">${formatEventDate(event.date)}</time></td><td data-label="Event">${eventName}</td><td data-label="Location">${location}</td><td data-label="RSVP">${rsvp}</td></tr>`;
    }).join("");

    container.innerHTML = `
      <div class="event-table-wrap reveal">
        <table class="event-table">
          <thead><tr><th scope="col">Date</th><th scope="col">Event</th><th scope="col">Location</th><th scope="col">RSVP</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  };

  const renderPress = () => {
    const praise = document.querySelector("[data-praise]");
    if (praise) praise.innerHTML = content.praise.map((item) => `
      <article class="praise-card reveal">
        <blockquote>“${item.quote}”</blockquote>
        <p>—${item.attribution}</p>
      </article>`).join("");
    const container = document.querySelector("[data-press]");
    if (!container) return;
    if (!content.press.length) {
      container.removeAttribute("data-snap");   // placeholders stack on a phone; real coverage swipes
      container.innerHTML = `<div class="press-placeholder reveal"><span>Conversations</span><p>Interviews, podcasts, and media coverage will appear here as they are published.</p></div>`;
      return;
    }
    container.innerHTML = content.press.map((item) => `
      <a class="press-card reveal" href="${item.url}" target="_blank" rel="noreferrer">
        <span>${item.type} · ${formatDate(item.date)}</span><h3>${item.title}</h3><p>${item.outlet}</p><b aria-hidden="true">Read ↗</b>
      </a>`).join("");
  };

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
    document.body.classList.remove("nav-open");
  }));

  const creditToggle = document.querySelector("[data-credit-toggle]");
  const credits = document.querySelector("[data-credits]");
  creditToggle?.addEventListener("click", () => {
    const open = creditToggle.getAttribute("aria-expanded") === "true";
    creditToggle.setAttribute("aria-expanded", String(!open));
    credits.hidden = open;
  });

  const onScroll = () => header?.classList.toggle("scrolled", document.body.classList.contains("inner-page") || window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  renderRetailers();
  renderEvents();
  renderPress();
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // phone swipe rows ([data-snap], mobile.css): one dot per card under the row, the one in view lit
  const addDots = (row) => {
    const cards = Array.from(row.children);
    if (cards.length < 2) return;
    const dots = document.createElement("div");
    dots.className = "m-dots";
    dots.setAttribute("aria-hidden", "true");
    cards.forEach(() => dots.appendChild(document.createElement("span")));
    row.after(dots);
    const paint = () => {
      const step = cards[1].offsetLeft - cards[0].offsetLeft || 1;
      const at = Math.min(cards.length - 1, Math.round(row.scrollLeft / step));
      dots.querySelectorAll("span").forEach((dot, i) => dot.classList.toggle("on", i === at));
    };
    row.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
  };
  document.querySelectorAll("[data-snap]").forEach(addDots);

  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    reveals.forEach((el) => observer.observe(el));
  }
})();
