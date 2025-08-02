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
const gamingText = document.getElementById("gamingText"); // ✅ grab the text

window.addEventListener("scroll", () => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  // Calculate how far you've scrolled through the section (0 to 1)
  let progress = (scrollY - sectionTop) / sectionHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  // Top corners
  const topLeftX = 0 + (20 - 0) * progress;
  const topRightX = 100 - (100 - 65) * progress;

  // Bottom corners
  const bottomLeftY = 100 - (100 - 90) * progress;
  const bottomRightY = 100 - (100 - 75) * progress;

  // ✅ Update video shape
  video.style.clipPath = `polygon(
    ${topLeftX}% 0%,        
    ${topRightX}% 0%,       
    100% ${bottomRightY}%,  
    0% ${bottomLeftY}%      
  )`;

  // ✅ Switch text color once video section is halfway scrolled
  if (progress >= 0.5) {
    gamingText.style.color = "black";
  } else {
    gamingText.style.color = "white";
  }
});

// Discover text
const discoverText = document.getElementById("discoverText");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        discoverText.classList.remove("opacity-0", "translate-x-10");
        discoverText.classList.add("opacity-100", "translate-x-0");
      } else {
        discoverText.classList.remove("opacity-100", "translate-x-0");
        discoverText.classList.add("opacity-0", "translate-x-10");
      }
    });
  },
  { threshold: 0.2 }
);
observer.observe(discoverText);

// Expanding Image

const isMobile = window.matchMedia("(max-width: 640px)").matches;
const zoomImage = document.getElementById("zoomImage");
const parent = zoomImage.parentElement;

window.addEventListener("scroll", () => {
  const parentRect = parent.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  if (parentRect.top <= 0 && parentRect.bottom >= viewportHeight) {
    const stuckScroll = Math.abs(parentRect.top);
    const imgStartWidth = zoomImage.offsetWidth;
    const imgStartHeight = zoomImage.offsetHeight;

    const maxScrollForZoom = parent.offsetHeight - viewportHeight;
    let progress = Math.min(stuckScroll / maxScrollForZoom, 1);

    if (isMobile) {
      const scaleX = viewportWidth / imgStartWidth;
      const scale = 1 + (scaleX - 1) * progress;
      zoomImage.style.transform = `scaleX(${scale}) scaleY(1)`;
    } else {
      const scaleToFit = Math.max(
        viewportWidth / imgStartWidth,
        viewportHeight / imgStartHeight
      );
      const scale = 1 + (scaleToFit - 1) * progress;
      zoomImage.style.transform = `scale(${scale})`;
    }
  } else if (parentRect.top > 0) {
    zoomImage.style.transform = isMobile ? "scaleX(1) scaleY(1)" : "scale(1)";
  } else if (parentRect.bottom < viewportHeight) {
    if (isMobile) {
      const scaleX = viewportWidth / zoomImage.offsetWidth;
      zoomImage.style.transform = `scaleX(${scaleX}) scaleY(1)`;
    } else {
      const scaleToFit = Math.max(
        viewportWidth / zoomImage.offsetWidth,
        viewportHeight / zoomImage.offsetHeight
      );
      zoomImage.style.transform = `scale(${scaleToFit})`;
    }
  }
});
