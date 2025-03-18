document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const otp = document.getElementById('otp').value;
        const captcha = document.getElementById('captcha').value;
        const captchaContainer = document.getElementById('captcha-container').textContent;

        if (captcha !== captchaContainer) {
            alert('Invalid captcha. Please try again.');
            return;
        }

        // Simulate OTP verification
        if (otp !== '123456') {
            alert('Invalid OTP. Please try again.');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.mobile === mobile);

        if (userExists) {
            alert('This account already exists. Please sign in.');
            window.location.href = 'signin.html'; // Redirect to sign-in page
            return;
        }

        // Save user data in local storage
        users.push({ name, mobile });
        localStorage.setItem('users', JSON.stringify(users));

        // Save the logged-in user and login time
        localStorage.setItem('loggedInUser', JSON.stringify({ name, mobile }));
        localStorage.setItem('loginTime', new Date().getTime());

        alert('Sign up successful!');
        window.location.href = '../index.html'; // Redirect to home page
    });
});
