/* =========================================
   1. TYPEWRITER EFFECT (The "Cool" Part)
   ========================================= */
const typingText = document.querySelector(".typing-text");
const words = [
  "Mobile Apps",
  "Flutter Experiences",
  "Scalable Solutions",
  "Clean Architecture",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);

  if (typingText) {
    typingText.textContent = currentChar;
    typingText.classList.add("stop-blinking");
  }

  if (!isDeleting && charIndex < currentWord.length) {
    // If typing
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    // If deleting
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    // If word is complete
    isDeleting = !isDeleting;

    if (typingText) typingText.classList.remove("stop-blinking");

    // Pause before typing next word or deleting
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};

// Start the typing effect when page loads
document.addEventListener("DOMContentLoaded", typeEffect);

/* =========================================
   2. SCROLL REVEAL ANIMATION (Professional Feel)
   ========================================= */
// This makes elements fade in as you scroll down
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

// Select elements to animate
const sections = document.querySelectorAll(
  ".card, .premium-project, .skills-category, .certificate-card",
);
sections.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)"; // Start slightly lower
  el.style.transition = "all 0.6s ease-out"; // Smooth transition
  observer.observe(el);
});

/* =========================================
   3. THEME TOGGLE (Dark/Light Mode)
   ========================================= */
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

/* =========================================
   4. SMOOTH SCROLLING FOR NAV LINKS
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* =========================================
   5. CERTIFICATE MODAL LOGIC (UPDATED)
   ========================================= */
const modal = document.getElementById("cert-modal");
const modalImg = document.getElementById("cert-modal-img");
const modalClose = document.getElementById("cert-modal-close");

// Target the NEW styled buttons
document.querySelectorAll(".view-cert-btn-styled").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // Get image source from the data-cert attribute
    const imgSrc = this.getAttribute("data-cert");

    if (imgSrc) {
      modalImg.src = imgSrc;
      modal.classList.add("open");
      document.body.style.overflow = "hidden"; // Stop background scrolling
    }
  });
});

// Function to close modal
const closeModal = () => {
  modal.classList.remove("open");
  document.body.style.overflow = "auto"; // Re-enable scrolling
  setTimeout(() => {
    modalImg.src = "";
  }, 300); // Clear src after animation
};

if (modalClose) modalClose.addEventListener("click", closeModal);

// Close if clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

/* =========================================
   7. PROJECT DESCRIPTION TOGGLE (NEW)
   ========================================= */
document.querySelectorAll(".project-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // Get the parent project card
    const projectCard = this.closest(".premium-project");
    const fullDesc = projectCard.querySelector(".project-full-desc");
    const isHidden = fullDesc.classList.contains("hidden");

    if (isHidden) {
      // Show the full description
      fullDesc.classList.remove("hidden");
      fullDesc.classList.add("show");
      this.textContent = "Show Less ↑";
    } else {
      // Hide the full description
      fullDesc.classList.remove("show");
      fullDesc.classList.add("hidden");
      this.textContent = "Show Details ↓";
    }
  });
});

/* =========================================
   6. CONTACT FORM HANDLING (FIXED)
   ========================================= */
const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Get the button and save original text
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnTextSpan = submitBtn.querySelector("span");
    const btnIcon = submitBtn.querySelector("i");
    const originalText = btnTextSpan.innerText;

    // 2. Set Loading State
    btnTextSpan.innerText = "Sending...";
    btnIcon.className = "fas fa-spinner fa-spin"; // Spin icon
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // 3. Success!
        form.reset(); // Clear inputs

        // Hide form fields smoothly (optional, or just show success msg below)
        // form.style.display = 'none';

        // Show Success Message
        formSuccess.classList.remove("hidden");
        formSuccess.style.display = "flex"; // Ensure flex is applied

        // Reset Button
        btnTextSpan.innerText = "Sent!";
        btnIcon.className = "fas fa-check";

        // Restore button after 3 seconds
        setTimeout(() => {
          btnTextSpan.innerText = originalText;
          btnIcon.className = "fas fa-paper-plane";
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";

          // Optional: Hide success message after 5 seconds
          // setTimeout(() => {
          //    formSuccess.classList.add("hidden");
          //    formSuccess.style.display = "none";
          // }, 5000);
        }, 3000);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      // 4. Error Handler
      alert(
        "Oops! There was a problem sending your message. Please try again.",
      );
      btnTextSpan.innerText = originalText;
      btnIcon.className = "fas fa-paper-plane";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  });
}
