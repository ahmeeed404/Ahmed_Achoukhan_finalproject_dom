let videoButton = document.querySelector(".heroSection .rightBttn button");
let aboutVideoButton = document.querySelector(".aboutSection .vedio button");
let menuImages = document.querySelectorAll(".menuImages img");
let galleryImages = document.querySelectorAll(".galleryImages img");
let allImages = [...menuImages, ...galleryImages];
let modal = document.getElementById("mediaModal");
const mediaContent = modal.querySelector(".media-content");
let closeBtn = modal.querySelector(".media-close");
let prevBtn = modal.querySelector(".media-prev");
let nextBtn = modal.querySelector(".media-next");

let videoLink = "https://www.youtube.com/embed/Y7f98aduVJ8";
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
  img.addEventListener("click", function() {
    currentIndex = i;
    isVideo = false;
    renderContent();
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function(e) {
  if (e.target === modal) closeModal();
});

prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);
