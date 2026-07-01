const cartContainer = document.getElementById("cartItems");
const total = document.getElementById("total");

async function loadCart() {

const response = await fetch("products.json");

const products = await response.json();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let sum = 0;

cartContainer.innerHTML = "";

cart.forEach(id => {

const product = products.find(p => p.id === id);

sum += product.price;

cartContainer.innerHTML += `

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="removeCart(${id})">

Remove

</button>

</div>

`;

});

total.innerHTML = "Total: ₹" + sum;

}

function removeCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const index = cart.indexOf(id);

if(index > -1){

cart.splice(index,1);

}

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}

loadCart();
