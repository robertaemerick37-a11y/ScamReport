document.addEventListener('DOMContentLoaded', function () {
  // ==========================================
  // File a Complaint Smooth Scroll Action
  // ==========================================
  var button = document.getElementById('complaintButton');
  if (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault(); // Prevents default link/button jumps
      
      // Target the contact section element
      var contactSection = document.querySelector('.contact-section') || document.getElementById('contactSection');
      
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Hamburger menu toggle
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mainNav = document.getElementById('mainNav');

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', function () {
      hamburgerBtn.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    var navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburgerBtn.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!hamburgerBtn.contains(event.target) && !mainNav.contains(event.target)) {
        hamburgerBtn.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ==========================================
  // Dynamic Counter Animation
  // ==========================================
  var counters = document.querySelectorAll('.stat-number[data-target]');
  var speed = 2000; // Total duration of animation in milliseconds (2 seconds)

  counters.forEach(function (counter) {
    var target = parseInt(counter.getAttribute('data-target'), 10);
    var startTime = null;

    function updateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;
      
      // Calculate current value based on time progress
      var currentValue = Math.min(Math.floor((progress / speed) * target), target);
      
      // Append '+' symbol for the Projects Completed stat (target 670)
      if (target === 670) {
        counter.innerText = currentValue + '+';
      } else {
        counter.innerText = currentValue;
      }

      if (progress < speed) {
        requestAnimationFrame(updateCount);
      }
    }

    requestAnimationFrame(updateCount);
  });

  // ==========================================
  // FAQ Accordion Interactivity
  // ==========================================
  var accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var currentItem = this.parentElement;
      
      // Close all other open accordion rows
      document.querySelectorAll('.accordion-item').forEach(function (item) {
        if (item !== currentItem) {
          item.classList.remove('active');
        }
      });

      // Toggle the active class on the clicked element
      currentItem.classList.toggle('active');
    });
  });

  // ==========================================
  // Testimonials Slider Logic (8 Cards Shift + 6s Autoplay)
  // ==========================================
  var track = document.getElementById('testimonialTrack');
  var dots = document.querySelectorAll('#carouselDots .dot');
  var counterDisplay = document.getElementById('carouselCounter');
  var prevBtn = document.getElementById('prevTestimonial');
  var nextBtn = document.getElementById('nextTestimonial');
  
  var currentIndex = 0;
  var totalItems = dots.length;
  var autoplayTimer = null;

  function updateCarousel(index) {
    if (!track) return;
    
    var cards = document.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    // Calculate exact width to translate (Card width + layout gap spacing)
    var cardWidth = cards[0].getBoundingClientRect().width;
    var gap = 24; 
    var moveAmount = index * (cardWidth + gap);

    // Slide the track container horizontally
    track.style.transform = 'translateX(-' + moveAmount + 'px)';
    
    // Update the layout dot indicators
    dots.forEach(function(dot, i) {
      if (i === index) dot.classList.add('active');
      else dot.classList.remove('active');
    });
    
    // Update text numerical counter
    if (counterDisplay) {
      counterDisplay.innerText = (index + 1) + " / " + totalItems;
    }
    
    currentIndex = index;
  }

  function handleNextSlide() {
    var visibleCards = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    var maxIndex = totalItems - visibleCards;
    
    var nextIndex = currentIndex + 1;
    if (nextIndex > maxIndex) nextIndex = 0; // Loops back cleanly to start
    
    updateCarousel(nextIndex);
  }

  function startAutoplay() {
    stopAutoplay(); // Clear any existing intervals safely
    autoplayTimer = setInterval(handleNextSlide, 6000); // 6000ms = 6 seconds
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', function() {
      handleNextSlide();
      startAutoplay(); // Resets the 6-second timer on manual click
    });

    prevBtn.addEventListener('click', function() {
      var visibleCards = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
      var maxIndex = totalItems - visibleCards;
      
      var prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = maxIndex; // Jumps to end structural index bounds
      
      updateCarousel(prevIndex);
      startAutoplay(); // Resets the 6-second timer on manual click
    });

    // Handle recalculating offsets smoothly if browser scales dynamically
    window.addEventListener('resize', function() {
      updateCarousel(currentIndex);
    });

    // Fire off the autoplay interval loop on initial script load
    startAutoplay();
  }

  // ==========================================
  // EmailJS Form Integration & Security Settings
  // ==========================================
  var EMAILJS_PUBLIC_KEY = "IAzC66I-ra2Iz9ofT";
  var EMAILJS_SERVICE_ID = "service_6x3eyzc";
  var EMAILJS_TEMPLATE_ID = "template_3ti8tlt";

  if (typeof emailjs !== 'undefined') {
    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY") {
      console.warn("EmailJS public key is not configured. Add the real key from your EmailJS dashboard before enabling form submissions.");
    } else {
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
        blockHeadless: true, // Blocks automated bot scripts
        limitRate: {
          throttle: 10000,   // Enforces a 10-second wait between submissions per user
        }
      });
    }
  }

  var recoveryForm = document.getElementById("recoveryForm");
  var successCard = document.getElementById("successCard");
  var formTitleTag = document.getElementById("formTitleTag");
  var referenceCode = document.getElementById("referenceCode");
  var resetFormBtn = document.getElementById("resetFormBtn");

  // Utility function to generate a random reference ID like #MRTTO19R
  function generateReferenceID() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "#" + result;
  }

  if (recoveryForm && successCard) {
    recoveryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Check Honeypot: If filled out, it's a spambot—stop execution immediately
      var honeypot = document.getElementById("website_hp");
      if (honeypot && honeypot.value !== "") {
        console.warn("Spam submission detected.");
        return;
      }

      // Check if EmailJS loaded properly (defense against ad-blockers)
      if (typeof emailjs === 'undefined') {
        alert("Unable to reach the email service. Please check your internet connection or ad-blocker settings, or email us directly.");
        return;
      }

      if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY") {
        alert("The contact form is not configured yet. Add your EmailJS public key in script.js before sending inquiries.");
        return;
      }

      // Trim form input strings
      var fullName = document.getElementById("fullName");
      var emailAddress = document.getElementById("emailAddress");
      var caseDetails = document.getElementById("caseDetails");

      if (fullName) fullName.value = fullName.value.trim();
      if (emailAddress) emailAddress.value = emailAddress.value.trim();
      if (caseDetails) caseDetails.value = caseDetails.value.trim();

      var submitBtn = recoveryForm.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : "SUBMIT CASE INQUIRY";

      if (submitBtn) {
        submitBtn.textContent = "SENDING...";
        submitBtn.disabled = true;
      }

      var requestTimedOut = false;
      var timeoutId = setTimeout(function () {
        requestTimedOut = true;
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
        alert("The email service timed out. Please try again or email us directly.");
      }, 15000);

      // Send form data via EmailJS, but do not leave the form stuck if the request hangs.
      var emailRequest = emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this);
      var timeoutRequest = new Promise(function (_, reject) {
        setTimeout(function () {
          reject(new Error("The email service timed out."));
        }, 15000);
      });

      Promise.race([emailRequest, timeoutRequest])
        .then(function () {
          // Generate unique reference ID
          if (referenceCode) {
            referenceCode.textContent = "Reference: " + generateReferenceID();
          }

          // Hide form and show success card
          recoveryForm.style.display = "none";
          if (formTitleTag) formTitleTag.style.display = "none";
          successCard.style.display = "block";

          recoveryForm.reset();
        })
        .catch(function (error) {
          console.error("EmailJS Submission Error:", error);
          if (!requestTimedOut) {
            alert("Failed to submit inquiry. Please try again or email us directly.");
          }
        })
        .finally(function () {
          clearTimeout(timeoutId);
          if (submitBtn) {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
          }
        });
    });

    // Reset view when clicking "Submit another inquiry"
    if (resetFormBtn) {
      resetFormBtn.addEventListener("click", function () {
        successCard.style.display = "none";
        recoveryForm.style.display = "block";
        if (formTitleTag) formTitleTag.style.display = "inline-block";
      });
    }
  }
});