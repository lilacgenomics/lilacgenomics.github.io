/* ============================================================
   LILAC GENOMICS — main.js
   Reads everything from products.js. You shouldn't need to edit
   this file to add templates or change links.
   ============================================================ */

(function () {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Pages inside /products/ reach back up one level for assets */
  const DEPTH = document.body.dataset.depth === "1" ? "../" : "";
  const path = (p) => (p && !/^https?:/.test(p) ? DEPTH + p : p);

  const check =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12.5 9.5 18 20 6"/></svg>';

  /* ---------- image fallback: never show a broken frame ---------- */
  function guard(img) {
    img.addEventListener("error", function () {
      img.style.background = "linear-gradient(160deg,#efe4fb 0%,#ddccf4 55%,#f6eefd 100%)";
      img.removeAttribute("src");
      img.alt = "Preview coming soon";
    }, { once: true });
  }

  /* ---------- header ---------- */
  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $("#primary-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && window.innerWidth <= 720) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  /* ---------- brand details pulled from SITE ---------- */
  function initSiteBits() {
    $$("[data-site]").forEach((el) => {
      const key = el.dataset.site;
      const val = SITE[key];
      if (!val) return;
      if (el.tagName === "A") {
        el.href = key === "email" ? "mailto:" + val : val;
        if (!el.textContent.trim()) el.textContent = val;
      } else {
        el.textContent = val;
      }
    });
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- shop grid (home page) ---------- */
  function initShop() {
    const grid = $("#shop-grid");
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map((p) => `
      <article class="card">
        ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
        <a class="card__media" href="${path(p.page)}" aria-label="${p.name}">
          <img src="${path(p.cover)}" alt="${p.name} preview" loading="lazy">
        </a>
        <div class="card__body">
          <h3>${p.name}</h3>
          <p class="card__sub">${p.subtitle || ""}</p>
          <p class="card__blurb">${p.blurb || ""}</p>
          <div class="card__foot">
            <span class="price">${p.price}${p.compareAt ? `<s>${p.compareAt}</s>` : ""}</span>
            <a class="card__link" href="${path(p.page)}">See inside</a>
          </div>
        </div>
      </article>`).join("");

    $$("img", grid).forEach(guard);
  }

  /* ---------- carousel slides, built from the first template ---------- */
  function buildSlides() {
    const track = $("#preview-track");
    if (!track) return;
    const product = PRODUCTS[0];
    if (!product || !product.pages) return;

    track.innerHTML = product.pages.map((g) => `
      <div class="slide">
        <button class="slide__btn" type="button" data-full="${path(g.src)}" data-caption="${g.title}">
          <span class="desktop">
            <span class="desktop__screen"><img src="${path(g.src)}" alt="${g.title} — ${g.note || ""}" loading="lazy"></span>
            <span class="desktop__stand"></span>
            <span class="desktop__base"></span>
          </span>
          <span class="slide__title">${g.title}</span>
          <span class="slide__note">${g.note || ""}</span>
        </button>
      </div>`).join("");

    $$("img", track).forEach(guard);
  }

  /* ---------- carousel behaviour ---------- */
  function initCarousel(root) {
    const viewport = $(".carousel__viewport", root);
    const track = $(".carousel__track", root);
    const prev = $(".carousel__btn--prev", root);
    const next = $(".carousel__btn--next", root);
    const dots = $(".carousel__dots", root);
    if (!viewport || !track || !track.children.length) return;

    const slides = Array.from(track.children);

    if (dots) {
      dots.innerHTML = slides
        .map((_, i) => `<button type="button" aria-label="Go to screen ${i + 1}"></button>`)
        .join("");
    }

    const step = () => {
      const s = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 16;
      return s + gap;
    };

    function nearest() {
      const mid = viewport.scrollLeft + viewport.clientWidth / 2;
      let best = 0, dist = Infinity;
      slides.forEach((s, i) => {
        const c = s.offsetLeft + s.offsetWidth / 2;
        const d = Math.abs(c - mid);
        if (d < dist) { dist = d; best = i; }
      });
      return best;
    }

    function sync() {
      const max = viewport.scrollWidth - viewport.clientWidth - 2;
      if (prev) prev.disabled = viewport.scrollLeft <= 2;
      if (next) next.disabled = viewport.scrollLeft >= max;
      if (dots) {
        const active = nearest();
        Array.from(dots.children).forEach((d, i) =>
          d.setAttribute("aria-current", String(i === active))
        );
      }
    }

    const go = (dir) => viewport.scrollBy({ left: dir * step(), behavior: "smooth" });
    if (prev) prev.addEventListener("click", () => go(-1));
    if (next) next.addEventListener("click", () => go(1));

    if (dots) {
      dots.addEventListener("click", (e) => {
        const i = Array.from(dots.children).indexOf(e.target);
        if (i < 0) return;
        const s = slides[i];
        viewport.scrollTo({
          left: s.offsetLeft - (viewport.clientWidth - s.offsetWidth) / 2,
          behavior: "smooth"
        });
      });
    }

    viewport.addEventListener("scroll", () => {
      window.clearTimeout(viewport._t);
      viewport._t = window.setTimeout(sync, 90);
    }, { passive: true });

    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { go(1); e.preventDefault(); }
      if (e.key === "ArrowLeft")  { go(-1); e.preventDefault(); }
    });

    /* click-and-drag on desktop */
    let down = false, startX = 0, startLeft = 0, moved = 0;
    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = 0;
      startX = e.clientX; startLeft = viewport.scrollLeft;
      viewport.style.cursor = "grabbing";
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.abs(dx);
      viewport.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      viewport.style.cursor = "";
      viewport._drag = moved > 6;
      window.setTimeout(() => { viewport._drag = false; }, 60);
    });

    window.addEventListener("resize", sync);
    sync();
  }

  /* ---------- lightbox ---------- */
  function initLightbox() {
    const box = $("#lightbox");
    if (!box) return;
    const img = $("img", box);
    let lastFocus = null;

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-full]");
      if (!btn) return;
      const vp = btn.closest(".carousel__viewport");
      if (vp && vp._drag) return;              // ignore clicks that were drags
      lastFocus = btn;
      img.src = btn.dataset.full;
      img.alt = btn.dataset.caption || "Preview";
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      $(".lightbox__close", box).focus();
    });

    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    box.addEventListener("click", (e) => {
      if (e.target === box || e.target.closest(".lightbox__close")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && box.classList.contains("is-open")) close();
    });
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    const host = $("#faq");
    if (!host || typeof FAQ === "undefined") return;
    host.innerHTML = FAQ.map((f) => `
      <details>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`).join("");
  }

  /* ---------- product page gallery ---------- */
  function initGallery() {
    const main = $("#gallery-main");
    const thumbs = $("#gallery-thumbs");
    if (!main || !thumbs) return;
    const items = $$("button", thumbs);
    const mainImg = $("img", main);
    items.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        mainImg.src = btn.dataset.src;
        mainImg.alt = btn.dataset.caption || "";
        main.dataset.full = btn.dataset.src;
        items.forEach((b, j) => b.setAttribute("aria-current", String(i === j)));
      });
    });
    if (items[0]) items[0].setAttribute("aria-current", "true");
    $$("img", document).forEach(guard);
  }

  /* ---------- buy buttons (Gumroad) ---------- */
  function initBuy() {
    $$("[data-buy]").forEach((el) => {
      const id = el.dataset.buy;
      const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
      if (!product) return;
      el.href = product.gumroad;
      el.classList.add("gumroad-button");          // opens Gumroad's overlay checkout
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.addEventListener("click", () => track("buy_click", product.id));
    });
  }

  /* ---------- share links ---------- */
  function initShare() {
    $$("[data-share='pinterest']").forEach((el) => {
      const url = encodeURIComponent(location.href);
      const media = encodeURIComponent(
        new URL($("#gallery-main img")?.src || path("assets/img/og-image.jpg"), location.href).href
      );
      const desc = encodeURIComponent(document.title);
      el.href = `https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`;
      el.target = "_blank";
      el.rel = "noopener";
    });

    $$("[data-share='copy']").forEach((el) => {
      el.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(location.href);
          const old = el.textContent;
          el.textContent = "Link copied";
          setTimeout(() => (el.textContent = old), 1800);
        } catch {
          window.prompt("Copy this link", location.href);
        }
      });
    });
  }

  /* ---------- email capture (Formspree / Getform / ConvertKit) ---------- */
  function initNotify() {
    const form = $("#notify-form");
    if (!form) return;
    const msg = $("#notify-msg");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!email) return;

      if (!SITE.newsletterEndpoint) {
        msg.textContent = "Email sign-up isn't connected yet — add your endpoint in products.js.";
        return;
      }
      msg.textContent = "Sending…";
      try {
        const res = await fetch(SITE.newsletterEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, source: SITE.url })
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        msg.textContent = "You're on the list. New templates land in your inbox first.";
        track("signup", "ok");
      } catch (err) {
        msg.textContent = "That didn't go through. Try again, or email " + SITE.email + ".";
      }
    });
  }

  /* ---------- tiny analytics hook ---------- */
  function track(event, label) {
    if (typeof gtag === "function") gtag("event", event, { label });
    if (window.plausible) window.plausible(event, { props: { label } });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initSiteBits();
    initShop();
    buildSlides();
    $$(".carousel").forEach(initCarousel);
    initLightbox();
    initFaq();
    initGallery();
    initBuy();
    initShare();
    initNotify();
    $$("#buybox-list li").forEach((li) => {
      if (!li.querySelector("svg")) li.insertAdjacentHTML("afterbegin", check);
    });
  });
})();
