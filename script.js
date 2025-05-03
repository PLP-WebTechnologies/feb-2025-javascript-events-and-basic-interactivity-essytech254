// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // ------- EVENT HANDLING SECTION -------
    
    // Button click event - Change color
    const colorButton = document.getElementById('color-button');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#7d53de', '#ff9f68', '#4d6de3'];
    let colorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color changed to ${colors[colorIndex]}`;
        this.classList.add('pulse');
        
        // Remove animation class after it completes
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 600);
    });
    
    // Hover effect for tagline
    const tagline = document.querySelector('.tagline');
    tagline.addEventListener('mouseenter', function() {
        this.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.color = 'white';
        this.textContent = "Welcome to my interactive portfolio!";
    });
    
    tagline.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = 'white';
        this.textContent = "Hover over me for a surprise!";
    });
    
    // Keypress detection
    const keypressBox = document.getElementById('keypress-box');
    const keyDisplay = document.getElementById('key-display');
    
    keypressBox.addEventListener('keydown', function(event) {
        keyDisplay.textContent = `Key pressed: ${event.key} (Code: ${event.code})`;
        this.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.color = 'white';
        
        // Change back after a short delay
        setTimeout(() => {
            this.style.backgroundColor = '#f8f9fa';
            this.style.color = 'var(--dark-color)';
        }, 500);
    });
    
    keypressBox.addEventListener('click', function() {
        this.focus();
    });
    
    // Secret action - Double-click
    const secretBox = document.getElementById('secret-box');
    
    secretBox.addEventListener('dblclick', function() {
        this.innerHTML = '🎉 You found the secret! 🎉';
        this.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.color = 'white';
        this.style.transform = 'scale(1.1)';
        
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            createConfetti(this);
        }
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 600);
    });
    
    // Long press detection (BONUS)
    let pressTimer;
    secretBox.addEventListener('mousedown', function() {
        pressTimer = window.setTimeout(() => {
            this.innerHTML = '🔥 Long press detected! 🔥';
            this.style.backgroundColor = '#ff6b6b';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.innerHTML = 'Double-click for a secret!';
                this.style.backgroundColor = '#f8f9fa';
                this.style.color = 'var(--dark-color)';
            }, 2000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // ------- INTERACTIVE ELEMENTS SECTION -------
    
    // Image Gallery/Slideshow
    const galleryImages = document.querySelectorAll('.gallery-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        // Hide all images
        galleryImages.forEach(img => img.classList.remove('active'));
        // Show the selected image
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    }, 5000);
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', function() {
            // Toggle active class for current item
            item.classList.toggle('active');
            
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Activate first accordion item by default
    accordionItems[0].classList.add('active');
    
    // Create confetti function (BONUS animation)
    function createConfetti(parentElement) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        
        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 20;
        confetti.style.top = startY + '%';
        confetti.style.left = startX + '%';
        
        // Add animation
        confetti.style.animation = `confetti-fall ${Math.random() * 2 + 1}s ease-out forwards`;
        
        // Append to parent
        parentElement.appendChild(confetti);
        
        // Clean up after animation
        setTimeout(() => {
            parentElement.removeChild(confetti);
        }, 3000);
    }
    
    // Add confetti fall animation dynamically to the document
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(300px) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // ------- FORM VALIDATION SECTION -------
    
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const messageError = document.getElementById('message-error');
    
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation (BONUS)
    // Name validation
    nameInput.addEventListener('input', function() {
        validateName();
    });
    
    // Email validation
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    
    // Password validation
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPasswordValid) {
            // Show success message
            formStatus.textContent = "Form submitted successfully! Thank you for reaching out.";
            formStatus.className = "success";
            
            // Reset form
            contactForm.reset();
            clearValidationStyles();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } else {
            // Show error message
            formStatus.textContent = "Please fix the errors in the form.";
            formStatus.className = "error";
        }
    });
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('error');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('error');
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('error');
            return true;
        }
    }
    
    function clearValidationStyles() {
        // Clear all error styles
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        messageError.textContent = '';
        
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
        messageInput.classList.remove('error');
    }
});