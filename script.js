// Header animation

const header = document.getElementById("mainHeader");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  console.log("scrollY:", window.scrollY); // ✅ Debugging line

  // 🔹 Change header background after scrolling 50px
  if (window.scrollY > 50) {
    header.classList.remove("bg-transparent");
    header.classList.add("bg-black", "shadow-lg");
  } else {
    header.classList.add("bg-transparent");
    header.classList.remove("bg-black", "shadow-lg");
  }

  // 🔹 Scroll direction check
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    header.style.transform = "translateY(-120%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollY = window.scrollY;
});

// Hero 1
const section = document.getElementById("hero");
const video = document.getElementById("heroVideo");
const gamingTexts = document.querySelectorAll(".gamingText");

window.addEventListener("scroll", () => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  // How far you've scrolled
  let progress = (scrollY - sectionTop) / sectionHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  // Top corners
  const topLeftX = 0 + (20 - 0) * progress;
  const topRightX = 100 - (100 - 65) * progress;

  // Bottom corners
  const bottomLeftY = 100 - (100 - 90) * progress;
  const bottomRightY = 100 - (100 - 75) * progress;

  // video shape
  video.style.clipPath = `polygon(
    ${topLeftX}% 0%,        
    ${topRightX}% 0%,       
    100% ${bottomRightY}%,  
    0% ${bottomLeftY}%      
  )`;

  // text color change based on scroll
  gamingTexts.forEach((gamingText) => {
    gamingText.style.color = progress >= 0.5 ? "black" : "#053F03";
  });
});

// SLIDING TEXT
const scrollAnimatedTexts = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.remove("opacity-0", "translate-x-10");
        el.classList.add("opacity-100", "translate-x-0");
      } else {
        el.classList.remove("opacity-100", "translate-x-0");
        el.classList.add("opacity-0", "translate-x-10");
      }
    });
  },
  { threshold: 0.2 }
);

scrollAnimatedTexts.forEach((el) => observer.observe(el));

// Expanding Image

const zoomImage = document.getElementById("zoomImage");
const parent = zoomImage.parentElement;
const zoomSection = document.getElementById("zoomSection");
const nextSection = zoomSection.nextElementSibling;

window.addEventListener("scroll", () => {
  const parentRect = parent.getBoundingClientRect();
  const nextSectionRect = nextSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const imgStartWidth = zoomImage.offsetWidth;
  const imgStartHeight = zoomImage.offsetHeight;

  // Use a single scale factor to preserve aspect ratio
  const targetScale = Math.min(
    viewportWidth / imgStartWidth,
    viewportHeight / imgStartHeight
  );

  const scrollRange = nextSectionRect.top > 0 ? nextSectionRect.top : 1;
  const currentScroll = Math.abs(parentRect.top);

  let scrollProgress = Math.min(currentScroll / scrollRange, 1);
  if (parentRect.top > 0) scrollProgress = 0;
  if (nextSectionRect.top <= 0) scrollProgress = 1;

  const scale = 1 + (targetScale - 1) * scrollProgress;
  zoomImage.style.transform = `scale(${scale})`;
});

//Light On BUtton
const buttons = document.querySelectorAll(".glow-button");

buttons.forEach((button) => {
  const glow = button.querySelector(".glow-effect");

  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(180, 150, 255, 0.4), transparent 40%)`;
  });

  button.addEventListener("mouseleave", () => {
    glow.style.background = "transparent";
  });
});

// Bouncing Buttons
const bottons = document.querySelectorAll(".bounce-btn");

bottons.forEach((botton) => {
  const text = botton.querySelector(".bounce-text");

  botton.addEventListener("mouseenter", () => {
    text.classList.remove("bounce-out");
    void text.offsetWidth; // force reflow
    text.classList.add("bounce-in");
  });

  botton.addEventListener("mouseleave", () => {
    text.classList.remove("bounce-in");
    void text.offsetWidth;
    text.classList.add("bounce-out");
  });

  text.addEventListener("animationend", (e) => {
    if (e.animationName === "bounceOut") {
      // Reset position and opacity after bounce-out so it's visible again
      text.classList.remove("bounce-out");
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";
    }
  });
});

// Video Auto-Play

document.addEventListener("DOMContentLoaded", () => {
  const videos = Array.from(document.querySelectorAll("video")).filter((v) =>
    v.hasAttribute("autoplay")
  ); // only those with autoplay

  function ensureAttrs(v) {
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    if (!v.hasAttribute("preload")) v.setAttribute("preload", "auto");
    v.muted = true;
    v.playsInline = true;
  }

  function tryPlay(v) {
    const start = () => {
      const p = v.play();
      if (p && p.catch) {
        p.catch((err) => {
          console.debug(
            "Autoplay prevented:",
            v.id || v.currentSrc || v.src,
            err
          );
          // fallback: play on first gesture
          ["click", "touchend", "keydown"].forEach((evt) =>
            document.addEventListener(evt, () => v.play(), { once: true })
          );
        });
      }
    };
    if (v.readyState >= 2) {
      start();
    } else {
      v.addEventListener("canplay", start, { once: true });
    }
  }

  videos.forEach((v) => {
    ensureAttrs(v);
    tryPlay(v);
  });
});

/* color codes: 
#053F03
#73CF70
#FFFFFF
#00000
 */
