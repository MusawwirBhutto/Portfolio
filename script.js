// Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// 🌙 Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️"; // Switch to light
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙"; // Switch to dark
    localStorage.setItem("theme", "light");
  }
});

// Certificate Modal Logic
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("cert-modal");
  const modalImg = document.getElementById("cert-modal-img");
  const modalClose = document.getElementById("cert-modal-close");

  // Open modal on button click (for certificates without external links)
  document.querySelectorAll(".view-cert-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // If it's an <a> tag with href, let it open in new tab
      if (btn.tagName === "A" && btn.hasAttribute("href")) return;
      e.preventDefault();
      const imgSrc = btn.getAttribute("data-cert");
      if (imgSrc) {
        modalImg.src = imgSrc;
        modal.classList.add("open");
      }
    });
  });

  // Close modal
  modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
    modalImg.src = "";
  });

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modalImg.src = "";
    }
  });

  // ESC key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("open");
      modalImg.src = "";
    }
  });
});

 const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      formSuccess.textContent = "Thanks for your message! I'll get back to you soon."; // ✅ updated here
      formSuccess.classList.remove("hidden");
      setTimeout(() => {
        formSuccess.classList.add("show");
      }, 50);
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Error: Could not send message. Please try later.");
  }
});
