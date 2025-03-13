// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Fade-in Animation for Sections
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Cart logic for index.html
document.addEventListener("DOMContentLoaded", () => {
    const accessoriesGrid = document.querySelector(".accessories-grid");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Sample accessory data
    const accessories = [
        { id: 1, image: "Assets/images/gothic-necklace.jpg", title: "Gothic Necklace", originalPrice: 50, discountPrice: 35, description: "A handmade piece with dark elegance.", discount: "$15" },
        { id: 2, image: "Assets/images/skull-ring.jpg", title: "Skull Ring", originalPrice: 40, discountPrice: 28, description: "Bold and mysterious, crafted with care.", discount: "$12" },
        { id: 3, image: "Assets/images/raven-earrings.jpg", title: "Raven Earrings", originalPrice: 30, discountPrice: 20, description: "Perfect for the shadowy soul.", discount: "$10" }
    ];

    // Update cart count in navbar
    function updateCartCount() {
        const cartCountElement = document.querySelector(".cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            console.log("Updated cart count on index.html:", cart.length); // Debug log
        } else {
            console.error("Cart count element not found on index.html!");
        }
    }

    // Dynamically create accessory cards
    if (accessoriesGrid) {
        accessories.forEach(accessory => {
            const card = document.createElement("div");
            card.classList.add("accessory-card");

            card.innerHTML = `
                <img src="${accessory.image}" alt="${accessory.title}" class="accessory-image">
                <h3 class="accessory-title">${accessory.title}</h3>
                <p class="accessory-price">
                    <span class="original-price">$${accessory.originalPrice}</span>
                    <span class="discount-price">$${accessory.discountPrice}</span>
                </p>
                <p class="accessory-desc">${accessory.description}</p>
                <button class="add-to-cart" data-id="${accessory.id}">Add to Cart</button>
            `;

            accessoriesGrid.appendChild(card);

            // Add to Cart button event
            const addToCartBtn = card.querySelector(".add-to-cart");
            addToCartBtn.addEventListener("click", (e) => {
                cart.push(accessory);
                localStorage.setItem("cart", JSON.stringify(cart));
                console.log("Cart updated on index.html:", cart); // Debug log
                updateCartCount();

                // Discount badge animation
                const badge = document.createElement("div");
                badge.classList.add("discount-badge");
                badge.textContent = `-${accessory.discount}`;
                badge.style.left = `${e.clientX}px`;
                badge.style.top = `${e.clientY}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1000);
            });
        });
    } else {
        console.error("Accessories grid not found on index.html!");
    }

    // Initial cart count update
    updateCartCount();
});