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

window.addEventListener("scroll", () => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  // Calculate how far you've scrolled through the section (0 to 1)
  let progress = (scrollY - sectionTop) / sectionHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  //Top corners
  const topLeftX = 0 + (10 - 0) * progress;
  const topRightX = 100 - (100 - 90) * progress;
  //Bottom corners
  const bottomLeftY = 100 - (100 - 90) * progress;
  const bottomRightY = 100 - (100 - 75) * progress;

  video.style.clipPath = `polygon(
    ${topLeftX}% 0%,        /* top-left */
    ${topRightX}% 0%,       /* top-right */
    100% ${bottomRightY}%,  /* bottom-right */
    0% ${bottomLeftY}%      /* bottom-left */
  )`;
});
