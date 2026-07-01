const productContainer = document.getElementById("products");
const search = document.getElementById("search");
const category = document.getElementById("category");

let products = [];

async function loadProducts() {

    const response = await fetch("products.json");
    products = await response.json();

    displayProducts(products);
}

function displayProducts(items) {

    productContainer.innerHTML = "";

    items.forEach(product => {

        productContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p>₹${product.price}</p>

            <button onclick="addCart(${product.id})">
                Add To Cart
            </button>

        </div>

        `;
    });

}

search.addEventListener("input", filterProducts);
category.addEventListener("change", filterProducts);

function filterProducts() {

    let keyword = search.value.toLowerCase();
    let selected = category.value;

    let filtered = products.filter(product => {

        let matchName = product.name.toLowerCase().includes(keyword);

        let matchCategory =
            selected === "all" || product.category === selected;

        return matchName && matchCategory;

    });

    displayProducts(filtered);

}

function addCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added to Cart");

}

loadProducts();
