document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simple validation - you can replace this with your actual authentication logic
    if (username && password) {
        errorMessage.textContent = '';
        // Add a smooth transition effect
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);
    } else {
        errorMessage.textContent = 'Please enter both username and password';
    }
});