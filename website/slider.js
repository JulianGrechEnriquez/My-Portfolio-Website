/* =========================
   2D SLIDER
========================= */

import { client } from './sanity.js';



const query = `*[_type == "game"]{
  title,
  slug,
  description,
  type,
  link,
  controls,
  "imageUrl": image.asset->url
}`


client.fetch(query).then(games => {
  const container2D = document.querySelector('.slides2d')
  const container3D = document.querySelector('.slides3d')

  const getControlIcon = (control) => {
    if (control === 'keyboard') return 'images/gameCards/keyboard-and-mouse.png'
    if (control === 'controller') return 'images/gameCards/controller.png'
    if (control === 'mobile') return 'images/gameCards/mobileIPhone.png'
  }

  games.forEach(game => {
    const card = document.createElement('article')
    card.classList.add('card')

    if (game.type === '2d') card.classList.add('slide2d')
    if (game.type === '3d') card.classList.add('slide3d')

    const controlsHTML = game.controls
      ?.map(c => `<img src="${getControlIcon(c)}" />`)
      .join('') || ''

    card.innerHTML = `
      <img class="card-img" src="${game.imageUrl}" />
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <div class="footercard">
        <div class="controlltype">
          ${controlsHTML}
        </div>
      </div>
    `

    if (game.link) {
      card.onclick = () => {
  window.location.href = `game.html?slug=${game.slug.current}`
}
    }

    if (game.type === '2d') container2D.appendChild(card)
    if (game.type === '3d') container3D.appendChild(card)
  })

  // 🔥 ADD THESE LINES
  updateSlider2D()
  updateSlider3D()
})
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


window.addEventListener("resize", updateSlider2D);

/* =========================
   3D SLIDER
========================= */

let currentIndex3D = 0;

function getVisibleCards3D() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    if (w <= 1200) return 3;
    return 4;
}

function changeSlide3D(direction) {
    const totalSlides = document.querySelectorAll(".slide3d").length;
    const visibleCards = getVisibleCards3D();

    currentIndex3D += direction;

    if (currentIndex3D < 0) {
        currentIndex3D = totalSlides - visibleCards;
    }

    if (currentIndex3D > totalSlides - visibleCards) {
        currentIndex3D = 0;
    }

    updateSlider3D();
}

function updateSlider3D() {
    const slides = document.querySelector(".slides3d");
    const visibleCards = getVisibleCards3D();
    const movePercentage = 100 / visibleCards;

    slides.style.transform = `translateX(-${currentIndex3D * movePercentage}%)`;
}

/* 🔥 Important */
window.addEventListener("resize", updateSlider3D);


const logo = document.querySelector(".logo");

logo.addEventListener("click", function () {

    if (window.innerWidth <= 767) {   // only work on mobile
        const menu = document.getElementById("mobileMenu");
        menu.classList.toggle("open");
    }

});
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("open");
}

const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", function () {
    const menu = document.getElementById("mobileMenu");
    menu.classList.remove("open");
});


window.changeSlide2D = changeSlide2D
window.changeSlide3D = changeSlide3D