document.addEventListener('DOMContentLoaded', () => {
    const sendOtpButton = document.getElementById('send-otp');
    const captchaContainer = document.getElementById('captcha-container');
    const refreshCaptchaButton = document.getElementById('refresh-captcha');

    const generateCaptcha = () => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars[Math.floor(Math.random() * chars.length)];
        }
        return captcha;
    };

    const displayCaptcha = () => {
        const captcha = generateCaptcha();
        captchaContainer.textContent = captcha;
    };

    sendOtpButton.addEventListener('click', () => {
        const mobile = document.getElementById('mobile').value;
        if (mobile) {
            // Simulate sending OTP
            alert(`OTP sent to ${mobile}`);
        } else {
            alert('Please enter your mobile number.');
        }
    });

    refreshCaptchaButton.addEventListener('click', displayCaptcha);

    displayCaptcha();
});
