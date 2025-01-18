document.addEventListener('DOMContentLoaded', () => {
    // Snow effect
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 100;

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random size between 2px and 8px
        const size = Math.random() * 6 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Random blur based on size (bigger snowflakes = more blur)
        const blur = (size - 2) * 0.8; 
        snowflake.style.filter = `blur(${blur}px)`;
        
        // Adjust opacity based on size (bigger = more opaque)
        const opacity = 0.3 + (size - 2) * 0.1; 
        snowflake.style.opacity = opacity;
        
        // Random starting position
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 5s and 15s
        const duration = Math.random() * 10 + 5;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Add some random horizontal movement
        const horizontalMovement = Math.random() * 200 - 100; 
        snowflake.style.transform = `translateX(${horizontalMovement}px)`;
        
        snowContainer.appendChild(snowflake);
        
        // Remove snowflake after animation ends
        setTimeout(() => {
            snowflake.remove();
            createSnowflake();
        }, duration * 1000);
    }

    // Create initial snowflakes with staggered start
    for (let i = 0; i < snowflakeCount; i++) {
        setTimeout(createSnowflake, Math.random() * 3000); 
    }

    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        // Store email in localStorage
        localStorage.setItem('userEmail', email);
        
        // Here you would typically send the data to your server
        console.log('Login attempt:', { email, password, remember });
        
        // Add animation to button
        const button = document.querySelector('.login-button');
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            
            // Simulate login delay
            button.textContent = 'Logging in...';
            button.disabled = true;
            
            setTimeout(() => {
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 1000);
        }, 100);
    });

    // Add some nice focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });
});
