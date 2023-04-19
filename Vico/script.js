const cartButton = document.querySelector("#cart-btn");
const cartDropdown = document.querySelector("#cart-dropdown");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const emptyCartMsg = document.querySelector("#empty-cart");

let cart = [];

// Add item to cart
function addToCart(item) {
  // Check if item is already in cart
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    // Increment quantity if item is already in cart
    existingItem.quantity++;
  } else {
    // Add item to cart if not already in cart
    cart.push({ ...item, quantity: 1 });
  }

  // Update cart UI
  updateCart();
}

// Remove item from cart
function removeFromCart(itemId) {
  // Find index of item in cart
  const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);

  // Remove item from cart
  cart.splice(itemIndex, 1);

  // Update cart UI
  updateCart();
}

// Update cart UI
function updateCart() {
  // Update cart dropdown
  if (cart.length === 0) {
    // Show empty cart message if cart is empty
    cartDropdown.classList.add("empty");  
    emptyCartMsg.style.display = "block";
    cartItems.innerHTML = "";
    cartTotal.textContent = "$0.00";
  } else {
    // Hide empty cart message if cart is not empty
    cartDropdown.classList.remove("empty");
    emptyCartMsg.style.display = "none";

    // Generate cart item HTML
    const cartItemHtml = cart.map(item => `
      <li>
        <img src="${item.imgSrc}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>${item.quantity} x $${item.price.toFixed(2)}</p>
        <button class="remove-item-btn" data-id="${item.id}">Remove</button>
      </li>
    `).join("");

    cartItems.innerHTML = cartItemHtml;

    // Calculate and display cart total
    const cartTotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = "$" + cartTotalAmount.toFixed(2);
  }
}

/********************************** */




// Event listeners
cartButton.addEventListener("click", () => {
  cartDropdown.classList.toggle("open");
});

document.addEventListener("click", event => {
  if (!cartDropdown.contains(event.target) && event.target !== cartButton) {
    cartDropdown.classList.remove("open");
  }
});

document.addEventListener("click", event => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const itemId = parseInt(event.target.dataset.id);
    const item = products.find(product => product.id === itemId);
    addToCart(item);
  } else if (event.target.classList.contains("remove-item-btn")) {
    const itemId = parseInt(event.target.dataset.id);
    removeFromCart(itemId);
  }
});




