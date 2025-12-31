// /*
// targeting elements
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const cartTotal = document.getElementById("cart-total");
const totalPrice = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// products array
const products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 39.99 },
  { id: 3, name: "Product 3", price: 49.99 },
];

// cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// save cart to local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// listen for dom content load
document.addEventListener("DOMContentLoaded", () => {
  displayProductsData();
  if (cart.length > 0) {
    cart.forEach((product) => {
      displayCartData(product);
      toggleEmpty();
    });
  }
});

// display products data
function displayProductsData() {
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to Cart</button>
    `;
    // pushing product to cart on add to cart button click
    productDiv.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const itemExists = cart.find((item) => item.id === product.id);
        if (!itemExists) {
          cart.push(product);
          displayCartData(product);
          showSumUpdate();
          toggleEmpty();
          saveCart();
        }
      }
    });
    productList.appendChild(productDiv);
  });
}

// toggle empty cart element function
function toggleEmpty() {
  const isEmpty = cart.length === 0;
  emptyCart.classList.toggle("hidden", !isEmpty);
  // cartTotal.classList.toggle("hidden", isEmpty);
}

// display cart data function
function displayCartData(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Remove from Cart</button>
    `;
  // removing product from cart on remove from cart button click
  productDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      cart = cart.filter((p) => p.id !== product.id);
      showSumUpdate();
      productDiv.remove();
      toggleEmpty();
      saveCart();
    }
  });
  cartItems.appendChild(productDiv);
  toggleEmpty();
}

// shows updated sum on dom
function showSumUpdate() {
  let sum = 0;
  cart.forEach((product) => {
    sum += product.price;
  });
  totalPrice.innerText = `$${sum.toFixed(2)}`;
}

// listen for checkout btn
checkoutBtn.addEventListener("click", () => {
  cart = [];
  removeCartItemsFromDom();
  showSumUpdate();
  toggleEmpty();
  saveCart();
  alert("Checkout Successfull");
});

// remove all element from cartItems except empty cart message
function removeCartItemsFromDom() {
  Array.from(cartItems.children).forEach((child) => {
    if (child.id !== emptyCart.id) {
      child.remove();
    }
  });
}
// */

// // cart array
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // // save cart to local storage
// // function saveCart(){
// //   localStorage.setItem('cart', JSON.stringify(cart))
// // }

// // // listen for dom content load
// // document.addEventListener("DOMContentLoaded", () => {

// // });

// console.log(cart)
