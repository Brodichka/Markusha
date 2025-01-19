let productGrid = document.getElementById("product-grid");
let productsArray = [];
let url = "https://markusha-d631.restdb.io/rest/products"  ;


const my_headers = {
  "Content-Type": "application/json",
  "x-apikey": "6787e49877327a6a8f5a546a",
  "cache-control": "no-cache",
};

fetch(url, {
  method: "GET",
  headers: my_headers,
})
.then(async function (responce){
  productsArray = await responce.json();
  console.log(productsArray);
  productGrid.innerHTML = null;
  productsArray.forEach(p => {
    productsArray.push(p);
    let pElem = document.createElement("div");
    pElem.classList.add('product')
    pElem.innerHTML = `
                <h2 class='product-name'>${p.name}</h2>
                <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
                <p class='product-price'>Ціна: ${p.price} грн</p>
                <p class='product-description'>${p.description}</p>
                <a href='#'>Профіль продавця</a>
                <button>Купити</button>
            `;
    productGrid.appendChild(pElem); // Додаємо продукт у DOM
  });
});

let cardProd = document.getElementById("card-product");
let card = [];
if (localStorage.getItem("card")) {
  card = JSON.parse(localStorage.getItem("card"));
  drawCardProducts();
}

function fun() {
  cardProd.classList.toggle("hide");
}
function addProductTocard(id) {
  let product = productsArray.find(function (p) {
    return p.id == id;
  });
  card.push(product);
  drawCardProducts();
  localStorage.setItem("card", JSON.stringify(card));

  document.getElementById("card-button").classList.add("active");
  setTimeout(function () {
    document.getElementById("card-button").classList.remove("active");
  }, 500);
}

function drawCardProducts() {
  if (card.length === 0) return (cardProd.innerHTML = "Card is empty");
  cardProd.innerHTML = null;
  let sum = 0;
  card.forEach(function (p) {
    cardProd.innerHTML += `
    <p><img src="${p.photo_url}"> ${p.name} |${p.price} грн. </p>
    <hr>
    `;
    sum += p.price;
  });
  cardProd.innerHTML += `
  <p>Total Price: ${sum} грн. </p>
  <button onClick="buyAll()">Buy All</button>
  `;
}
function buyAll() {
  card = [];
  cardProd.innerHTML = "Гроші зняті";
  localStorage.setItem("card", "[]");
}

function openCard(){
  cardProd.classList.toggle('hide');
}
