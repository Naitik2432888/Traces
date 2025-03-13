document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.querySelector(".cart-items");
    const cartCountElement = document.querySelector(".cart-count");
    const cartTotalElement = document.querySelector(".cart-total");

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart loaded on cart.html:", cart); // Debug log

    // Function to update cart UI
    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = "<tr><td colspan='3'>Your cart is empty.</td></tr>";
        } else {
            cart.forEach(item => {
                total += item.discountPrice;
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td class="item-name">${item.title}</td>
                    <td class="item-price">$${item.discountPrice}</td>
                    <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
                `;
                cartItemsList.appendChild(tr);
            });
        }

        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            console.log("Updated cart count on cart.html:", cart.length); // Debug log
        }
        if (cartTotalElement) {
            cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    }

    // Initial update
    updateCart();

    // Remove item event
    cartItemsList.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });
});