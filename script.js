// Compliments array
const compliments = [
    "Your smile lights up my entire world 🌟",
    "Every moment with you feels like a dream come true 💭",
    "You make my heart skip a beat every single day 💓",
    "Your laugh is my favorite sound in the universe 🎵",
    "I fall in love with you more and more each day 💕",
    "You're the most beautiful person, inside and out ✨",
    "Being with you feels like coming home 🏡",
    "Your kindness and warmth inspire me every day 🌸",
    "You're my best friend and my greatest love 💖",
    "Life is infinitely better with you by my side 🌈",
    "Your eyes sparkle brighter than all the stars ⭐",
    "You make ordinary moments feel extraordinary 🎪",
    "I'm so grateful for every second we spend together 🙏",
    "Your love makes me want to be a better person 🌱",
    "You're the answer to every prayer I've ever had 🕊️",
    "My favorite place is wherever you are 📍",
    "You bring out the best version of me 🦋",
    "Your happiness is my happiness 😊",
    "I love the way you see the world 🌍",
    "You're my forever and always 💍",
  ]
  
  // Gallery images (placeholder images - user will replace these)
  const galleryImages = [
    { src: "/romantic-couple-photo-1.png", alt: "Our Memory 1" },
    { src: "/romantic-couple-moment.png", alt: "Our Memory 2" },
    { src: "/romantic-couple-photo-3.jpg", alt: "Our Memory 3" },
    { src: "/romantic-couple-photo-4.jpg", alt: "Our Memory 4" },
    { src: "/romantic-couple-photo-5.jpg", alt: "Our Memory 5" },
    { src: "/romantic-couple-photo-6.jpg", alt: "Our Memory 6" },
  ]
  
  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    initFloatingHearts()
    initCompliments()
    initMusicPlayer()
    initGallery()
    initFooterDate()
  })
  
  // Floating hearts animation
  function initFloatingHearts() {
    const heartsContainer = document.getElementById("heartsContainer")
    const heartEmojis = ["💕", "💖", "💗", "💓", "💝", "❤️", "💘"]
  
    setInterval(() => {
      const heart = document.createElement("div")
      heart.className = "floating-heart"
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
      heart.style.left = Math.random() * 100 + "%"
      heart.style.animationDuration = Math.random() * 3 + 5 + "s"
      heart.style.animationDelay = Math.random() * 2 + "s"
  
      heartsContainer.appendChild(heart)
  
      setTimeout(() => {
        heart.remove()
      }, 8000)
    }, 2000)
  }
  
  // Compliment button functionality
  function initCompliments() {
    const complimentBtn = document.getElementById("complimentBtn")
    const complimentText = document.getElementById("complimentText")
    let lastCompliment = -1
  
    complimentBtn.addEventListener("click", () => {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * compliments.length)
      } while (randomIndex === lastCompliment && compliments.length > 1)
  
      lastCompliment = randomIndex
  
      // Fade out
      complimentText.style.opacity = "0"
      complimentText.style.transform = "translateY(-10px)"
  
      setTimeout(() => {
        complimentText.textContent = compliments[randomIndex]
        // Fade in
        complimentText.style.opacity = "1"
        complimentText.style.transform = "translateY(0)"
      }, 300)
    })
  
    // Add transition styles
    complimentText.style.transition = "opacity 0.3s ease, transform 0.3s ease"
  }
  
  // Music player functionality
  function initMusicPlayer() {
    const playBtn = document.getElementById("playBtn")
    const audioPlayer = document.getElementById("audioPlayer")
    const playIcon = document.getElementById("playIcon")
    const playText = document.getElementById("playText")
  
    playBtn.addEventListener("click", () => {
      if (audioPlayer.paused) {
        audioPlayer.play().catch((err) => {
          console.log("Audio playback failed:", err)
          alert("Please add your music file to /music/our-song.mp3")
        })
        playIcon.textContent = "⏸️"
        playText.textContent = "Pause"
      } else {
        audioPlayer.pause()
        playIcon.textContent = "▶️"
        playText.textContent = "Play Our Song"
      }
    })
  
    audioPlayer.addEventListener("ended", () => {
      playIcon.textContent = "▶️"
      playText.textContent = "Play Our Song"
    })
  }
  
  // Gallery functionality
  function initGallery() {
    const galleryGrid = document.getElementById("galleryGrid")
    const lightbox = document.getElementById("lightbox")
    const lightboxImg = document.getElementById("lightboxImg")
    const lightboxClose = document.getElementById("lightboxClose")
    const lightboxPrev = document.getElementById("lightboxPrev")
    const lightboxNext = document.getElementById("lightboxNext")
  
    let currentImageIndex = 0
  
    // Create gallery items
    galleryImages.forEach((image, index) => {
      const galleryItem = document.createElement("div")
      galleryItem.className = "gallery-item"
      galleryItem.innerHTML = `
              <img src="${image.src}" alt="${image.alt}">
              <div class="gallery-overlay">
                  <span class="gallery-overlay-text">💕</span>
              </div>
          `
  
      galleryItem.addEventListener("click", () => {
        openLightbox(index)
      })
  
      galleryGrid.appendChild(galleryItem)
    })
  
    // Lightbox functions
    function openLightbox(index) {
      currentImageIndex = index
      lightboxImg.src = galleryImages[index].src
      lightboxImg.alt = galleryImages[index].alt
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  
    function closeLightbox() {
      lightbox.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  
    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
      lightboxImg.src = galleryImages[currentImageIndex].src
      lightboxImg.alt = galleryImages[currentImageIndex].alt
    }
  
    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length
      lightboxImg.src = galleryImages[currentImageIndex].src
      lightboxImg.alt = galleryImages[currentImageIndex].alt
    }
  
    // Event listeners
    lightboxClose.addEventListener("click", closeLightbox)
    lightboxPrev.addEventListener("click", showPrevImage)
    lightboxNext.addEventListener("click", showNextImage)
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return
  
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") showPrevImage()
      if (e.key === "ArrowRight") showNextImage()
    })
  }
  
  // Footer date
  function initFooterDate() {
    const footerDate = document.getElementById("footerDate")
    const now = new Date()
    footerDate.textContent = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  