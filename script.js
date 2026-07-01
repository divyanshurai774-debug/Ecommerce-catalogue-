const productContainer=document.getElementById("products");
const search=document.getElementById("search");

let products=[];

async function loadProducts(){

const response=await fetch("products.json");

products=await response.json();

displayProducts(products);

}

function displayProducts(items){

productContainer.innerHTML="";

items.forEach(product=>{

productContainer.innerHTML+=`

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addCart(${product.id})">
Add To Cart
</button>

</div>

`;

});

}

search.addEventListener("input",()=>{

const value=search.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value)

);

displayProducts(filtered);

});

function addCart(id){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

cart.push(id);

localStorage.setItem("cart",JSON.stringify(cart));

alert("Added to Cart");

}

loadProducts();
