let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

// Function to add product to cart
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    saveCart();
    updateCart();
}

// Function to update cart UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Bersihkan tampilan cart sebelum menambahkan elemen baru
    cartItems.innerHTML = "";

    // Jika cart kosong
    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";
    } else {
        // Tampilkan produk dalam cart
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("flex", "justify-between", "items-center", "border-b", "py-2");

            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="text-red-500" onclick="removeFromCart(${index})">Remove</button>
            `;

            cartItems.appendChild(itemElement);
        });
    }

    // Update total harga
    cartTotal.textContent = total.toFixed(2);
    
    // Update jumlah item di ikon cart
    cartCount.textContent = cart.length;
}

// Function to remove item from cart
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

// Function to save cart data to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total.toFixed(2));
}

// Load cart data saat halaman dimuat
document.addEventListener("DOMContentLoaded", updateCart);
