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

  // Calculate scale factors
  const scaleX = viewportWidth / imgStartWidth;
  const scaleY = parent.offsetHeight / imgStartHeight;
  let maxScale = Math.max(scaleX, scaleY);

  // ✅ Force fill width for laptops
  if (viewportWidth > viewportHeight) {
    maxScale = scaleX;
  }

  // ✅ Soft cap to avoid insane zooms on ultra-wide screens
  if (maxScale > 4) maxScale = 4;

  // Smooth scroll
  const maxScroll = (parent.offsetHeight - viewportHeight) * 2;
  const scrolled = Math.min(Math.abs(parentRect.top), maxScroll);
  const progress = scrolled / maxScroll;

  const scale = 1 + (maxScale - 1) * progress;

  if (parentRect.top <= 0 && nextSectionRect.top > 0) {
    zoomImage.style.transform = `scale(${scale})`;
  } else if (parentRect.top > 0) {
    zoomImage.style.transform = "scale(1)";
  } else if (nextSectionRect.top <= 0) {
    zoomImage.style.transform = `scale(${maxScale})`;
  }
});
