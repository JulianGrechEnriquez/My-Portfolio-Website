/* =========================
   2D SLIDER
========================= */
let currentIndex2D = 0;

function getVisibleCards() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    if (w <= 1200) return 3;
    return 4;
}

function changeSlide2D(direction) {
    const totalSlides = document.querySelectorAll(".slide2d").length;
    const visibleCards = getVisibleCards();
    currentIndex2D += direction;

    if (currentIndex2D < 0) {
        currentIndex2D = totalSlides - visibleCards;
    }

    if (currentIndex2D > totalSlides - visibleCards) {
        currentIndex2D = 0;
    }

    updateSlider2D();
}

function updateSlider2D() {
    const slides = document.querySelector(".slides2d");
    const visibleCards = getVisibleCards();
    const movePercentage = 100 / visibleCards;

    slides.style.transform = `translateX(-${currentIndex2D * movePercentage}%)`;
}

/* 🔥 This is the important part */
window.addEventListener("resize", updateSlider2D);

/* =========================
   3D SLIDER
========================= */

let currentIndex3D = 0;

function changeSlide3D(direction) {
    const slides = document.querySelector(".slides3d");
    const totalSlides = document.querySelectorAll(".slide3d").length;

    currentIndex3D += direction;

    if (currentIndex3D < 0) {
        currentIndex3D = 0;
    }

    if (currentIndex3D > totalSlides - 2) {
        currentIndex3D = totalSlides - 2;
    }

    slides.style.transform = `translateX(-${currentIndex3D * 50}%)`;
}