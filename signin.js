document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const otp = document.getElementById('otp').value.trim();
        const captcha = document.getElementById('captcha').value.trim();
        const captchaContainer = document.getElementById('captcha-container').textContent.trim();

        if (captcha !== captchaContainer) {
            alert('Invalid captcha. Please try again.');
            return;
        }

        // Simulate OTP verification
        if (otp !== '123456') {
            alert('Invalid OTP. Please try again.');
            return;
        }

        // Check if user exists in local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.mobile === mobile && user.name && user.name.toLowerCase() === name.toLowerCase());

        if (!userExists) {
            alert('User not found. Please sign up first.');
            window.location.href = 'signup.html'; // Redirect to sign-up page
        } else {
            // Save the logged-in user and login time
            localStorage.setItem('loggedInUser', JSON.stringify({ name, mobile }));
            localStorage.setItem('loginTime', new Date().getTime());

            alert('Sign in successful!');
            // Redirect to the home page after sign-in
            window.location.href = '../index.html';
        }
    });
});
