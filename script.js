// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Smooth Scroll for Navigation Links
$$('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href')?.substring(1);
        const targetSection = $(`#${targetId}`);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Fade-in Animation for Sections
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target); // Unobserve after animation for performance
        }
    });
}, { threshold: 0.1 });

$$('section').forEach(section => fadeInObserver.observe(section));

// Cart Logic
document.addEventListener('DOMContentLoaded', () => {
    const accessoriesGrid = $('.accessories-grid');
    const cartIcon = $('.cart-icon');
    const cartCountElement = $('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Sample accessory data
    const accessories = [
        { id: 1, image: 'Assets/images/gothic-necklace.jpg', title: 'Gothic Necklace', originalPrice: 50, discountPrice: 35, description: 'A handmade piece with dark elegance.', discount: '$15' },
        { id: 2, image: 'Assets/images/skull-ring.jpg', title: 'Skull Ring', originalPrice: 40, discountPrice: 28, description: 'Bold and mysterious, crafted with care.', discount: '$12' },
        { id: 3, image: 'Assets/images/raven-earrings.jpg', title: 'Raven Earrings', originalPrice: 30, discountPrice: 20, description: 'Perfect for the shadowy soul.', discount: '$10' }
    ];

    // Update cart count in navbar
    const updateCartCount = () => {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            console.log('Cart count updated:', cart.length);
        } else {
            console.warn('Cart count element not found!');
        }
    };

    // Fly-to-cart animation for discount badge
    const animateBadgeToCart = (e, discount) => {
        const badge = document.createElement('div');
        badge.classList.add('discount-badge');
        badge.textContent = `-${discount}`;
        badge.style.left = `${e.clientX}px`;
        badge.style.top = `${e.clientY}px`;
        document.body.appendChild(badge);

        const cartRect = cartIcon.getBoundingClientRect();
        const badgeRect = badge.getBoundingClientRect();
        const deltaX = cartRect.left - badgeRect.left;
        const deltaY = cartRect.top - badgeRect.top;

        badge.style.transition = 'all 0.8s ease';
        requestAnimationFrame(() => {
            badge.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.5)`;
            badge.style.opacity = '0';
        });
        setTimeout(() => badge.remove(), 800);
    };

    // Add accessory card to grid
    const createAccessoryCard = (accessory) => {
        const card = document.createElement('div');
        card.classList.add('accessory-card');
        card.innerHTML = `
            <img src="${accessory.image}" alt="${accessory.title}" class="accessory-image" loading="lazy">
            <div class="accessory-info">
                <h3 class="accessory-title">${accessory.title}</h3>
                <p class="accessory-price">
                    <span class="original-price">$${accessory.originalPrice}</span>
                    <span class="discount-price">$${accessory.discountPrice}</span>
                </p>
                <p class="accessory-desc">${accessory.description}</p>
                <button class="add-to-cart" data-id="${accessory.id}">Add to Cart</button>
            </div>
        `;
        accessoriesGrid.appendChild(card);

        // Add to Cart event
        card.querySelector('.add-to-cart').addEventListener('click', (e) => {
            const existingItem = cart.find(item => item.id === accessory.id);
            if (!existingItem) {
                cart.push({ ...accessory, quantity: 1 });
            } else {
                existingItem.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            animateBadgeToCart(e, accessory.discount);
            cartIcon.classList.add('added');
            setTimeout(() => cartIcon.classList.remove('added'), 500);
        });
    };

    // Initialize accessories grid
    if (accessoriesGrid) {
        accessories.forEach(createAccessoryCard);
    } else {
        console.error('Accessories grid not found!');
    }

    // Initial cart count update
    updateCartCount();

    // Cart page logic (for cart.html)
    const cartTableBody = $('tbody');
    const cartTotalElement = $('.cart-total');
    const checkoutBtn = $('.checkout-btn');

    if (cartTableBody) {
        const renderCart = () => {
            cartTableBody.innerHTML = '';
            if (cart.length === 0) {
                cartTableBody.innerHTML = '<tr><td colspan="3" class="cart-empty">Your cart is empty!</td></tr>';
                if (cartTotalElement) cartTotalElement.textContent = 'Total: $0';
                if (checkoutBtn) checkoutBtn.disabled = true;
                return;
            }

            cart.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="item-name">${item.title} (x${item.quantity})</td>
                    <td class="item-price">$${item.discountPrice * item.quantity}</td>
                    <td><button class="remove-btn" data-index="${index}">Remove</button></td>
                `;
                cartTableBody.appendChild(row);

                // Remove item event
                row.querySelector('.remove-btn').addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        cart.splice(index, 1);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                });
            });

            const total = cart.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
            if (cartTotalElement) cartTotalElement.textContent = `Total: $${total}`;
            if (checkoutBtn) checkoutBtn.disabled = false;
        };

        renderCart();

        // Checkout button event
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.length > 0) {
                    alert('Checkout successful! Thank you for your purchase.');
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                }
            });
        }
    }
});

// Enhanced Navbar, Lightbox, and Back-to-Top (from previous code)
window.addEventListener('scroll', () => {
    const navbar = $('.navbar');
    const backToTop = $('.back-to-top');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 300);
});

$('.hamburger')?.addEventListener('click', () => {
    $('.nav-links').classList.toggle('active');
});

$$('.art-piece').forEach(piece => {
    piece.addEventListener('click', () => {
        const imgSrc = piece.querySelector('img').src;
        $('.lightbox-image').src = imgSrc;
        $('.lightbox').classList.add('active');
    });
});

$('.close')?.addEventListener('click', () => {
    $('.lightbox').classList.remove('active');
});

$('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});