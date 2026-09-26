const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
  header.classList.toggle("scrolled", window.scrollY > 30);
}, {passive:true});

if (cursorGlow) {
  window.addEventListener("pointermove", e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }, {passive:true});
}

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded","false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const heroBg = document.querySelector(".hero-bg");
window.addEventListener("scroll", () => {
  if (window.innerWidth > 680 && heroBg) {
    heroBg.style.transform = `scale(1.03) translateY(${Math.min(window.scrollY * .06, 35)}px)`;
  }
}, {passive:true});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.classList.remove("menu-open");
  lightboxImage.src = "";
};
document.querySelectorAll(".gallery-card").forEach(card => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.full;
    lightboxImage.alt = card.querySelector("img").alt;
    lightboxCaption.textContent = card.dataset.caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.classList.add("menu-open");
  });
});
document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
