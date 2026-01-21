// ** modal global
let videoButton = document.querySelector(".heroSection .rightBttn button");
let aboutVideoButton = document.querySelector(".aboutSection .vedio button");
let menuImages = document.querySelectorAll(".menuImages img");
let galleryImages = document.querySelectorAll(".galleryImages img");
let allImages = [...menuImages, ...galleryImages];
let modal = document.getElementById("mediaModal");
let mediaContent = modal.querySelector(".media-content");
let closeBtn = modal.querySelector(".media-close");
let prevBtn = modal.querySelector(".media-prev");
let nextBtn = modal.querySelector(".media-next");

let videoLink = "https://youtu.be/Y7f98aduVJ8";
let currentIndex = -1;
let isVideo = true;

function openModal() {
    isVideo = true;
    currentIndex = -1;
    renderContent();
    modal.classList.add("active");
}

function renderContent() {
    if (currentIndex === -1) {
        mediaContent.innerHTML = `<iframe src="${videoLink}" frameborder="0" allowfullscreen></iframe>`;
    } else {
        mediaContent.innerHTML = `<img src="${allImages[currentIndex].src}" alt="Media Image">`;
    }
}

function showPrev() {
    if (currentIndex === -1) {
        currentIndex = allImages.length - 1;
        isVideo = false;
    } else if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = -1;
        isVideo = true;
    }
    renderContent();
}

function showNext() {
    if (currentIndex === -1 && allImages.length > 0) {
        currentIndex = 0;
        isVideo = false;
    } else if (currentIndex < allImages.length - 1) {
        currentIndex++;
    } else {
        currentIndex = -1;
        isVideo = true;
    }
    renderContent();
}

function closeModal() {
    modal.classList.remove("active");
    mediaContent.innerHTML = "";
}


videoButton.addEventListener("click", openModal);
aboutVideoButton.addEventListener("click", openModal);

allImages.forEach((img, i) => {
    img.addEventListener("click", function () {
        currentIndex = i;
        isVideo = false;
        renderContent();
        modal.classList.add("active");
    });
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
});

prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);


// ** carousel of tetimonials
let cards = document.querySelectorAll(".testimonialCard");
let testimonialsSection = document.querySelector(".testimonials .container");
let testimonialCircles = document.createElement("div");

testimonialCircles.style.display = "flex";
testimonialCircles.style.justifyContent = "center";
testimonialCircles.style.gap = "10px";
testimonialCircles.style.marginTop = "25px";
testimonialsSection.appendChild(testimonialCircles);

let index = 0;
cards.forEach(card => card.style.display = "none");

cards[0].style.display = "flex";
cards.forEach((card, i) => {
    let dot = document.createElement("span");
    dot.style.width = "12px";
    dot.style.height = "12px";
    dot.style.borderRadius = "50%";
    dot.style.background = i === 0 ? "red" : "#ccc";
    dot.addEventListener("click", () => {
        index = i;
        showCard();
    });
    testimonialCircles.appendChild(dot);
});

let dots = testimonialCircles.querySelectorAll("span");
function showCard() {
    cards.forEach(c =>
        c.style.display = "none"
    );
    dots.forEach(d =>
        d.style.background = "#ccc"
    );
    cards[index].style.display = "flex";
    dots[index].style.background = "red";
}

setInterval(() => {
    index = (index + 1) % cards.length;
    showCard();
}, 4000);

// ** events carousel
let events = document.querySelectorAll(".eventContent > div");
let visible = 3;
let start = 0;
let total = events.length;

events.forEach(e =>
    e.style.display = "none");

let eventt = document.querySelector(".events")

let eventCircles = document.createElement("div");
eventCircles.style.display = "flex";
eventCircles.style.justifyContent = "center";
eventCircles.style.gap = "10px";
eventCircles.style.marginTop = "25px";

eventt.appendChild(eventCircles);

for (let i = 0; i < total; i++) {
    let dot = document.createElement("span");
    dot.style.width = "12px";
    dot.style.height = "12px";
    dot.style.borderRadius = "50%";
    dot.style.background = i === 0 ? "red" : "#ccc";
    dot.style.cursor = "pointer";
    dot.addEventListener("click", () => {
        start = i;
        showEvents();
    });
    eventCircles.appendChild(dot);
}

let eventDots = eventCircles.querySelectorAll("span");

function showEvents() {
    events.forEach(e =>
        e.style.display = "none"
    );
    eventDots.forEach(d =>
        d.style.background = "#ccc"
    );
    for (let i = 0; i < visible; i++) {
        events[(start + i) % total].style.display = "flex";
    }
    eventDots[start % total].style.background = "red";
}

showEvents();
setInterval(() => {
    start++; showEvents();
}, 4000);

// **carouselof gallery 
let slides = document.querySelectorAll(".galleryImages div");
let activeIndex = 2;

function updateCarousel() {
    slides.forEach((slide, index) => {
        let offset = index - activeIndex;


        if (offset > slides.length / 2) offset -= slides.length;
        if (offset < -slides.length / 2) offset += slides.length;

        slide.style.transform = `
      translateX(${offset * 300}px)
      scale(${offset === 0 ? 1.2 : 0.9})
    `;

        slide.style.zIndex = offset === 0 ? 3 : 1;
        slide.style.opacity = Math.abs(offset) > 2 ? 0 : 1;
    });
}

updateCarousel();

setInterval(() => {
    activeIndex = (activeIndex + 1) % slides.length;
    updateCarousel();
}, 2500);

