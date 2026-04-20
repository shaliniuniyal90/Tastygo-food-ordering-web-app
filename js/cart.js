let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cart-container");


let offer = localStorage.getItem("offer");


function calculateTotal(){

    let total = 0;

    
    if(offer === "pizza"){

        let pizzas = [];

        cart.forEach(item => {
            if(item.category === "pizza"){
                for(let i=0; i<item.qty; i++){
                    pizzas.push(item.price);
                }
            } else {
                total += item.price * item.qty;
            }
        });

        pizzas.sort((a,b)=>a-b);

        for(let i=0; i<pizzas.length; i+=2){
            total += pizzas[i+1] || pizzas[i];
        }
    }

    
    else if(offer === "burgerCombo"){

        let burgerCount = 0;

        cart.forEach(item => {
            if(item.category === "burger"){
                burgerCount += item.qty;
            } else {
                total += item.price * item.qty;
            }
        });

        let combo = Math.floor(burgerCount / 2);

        total += combo * 199;

    
        total += (burgerCount % 2) * 100;
    }

    
    else if(offer === "combo"){

        let burger = 0, drink = 0;

        cart.forEach(item => {
            if(item.category === "burger") burger += item.qty;
            else if(item.category === "drink") drink += item.qty;
            else total += item.price * item.qty;
        });

        let combo = Math.min(burger, drink);

        total += combo * 149;

        total += (burger - combo) * 100;
        total += (drink - combo) * 50;
    }


    else{
        cart.forEach(item => {
            total += item.price * item.qty;
        });
    }

    return total;
}


function displayCart() {

    container.innerHTML = "";

    cart.forEach((item, index) => {

        let div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" width="100">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>

            <button onclick="decrease(${index})">-</button>
            <span>${item.qty}</span>
            <button onclick="increase(${index})">+</button>
        `;

        container.appendChild(div);
    });

    // 🔥 TOTAL SECTION
    let total = calculateTotal();


if(offer){
    let offerTag = document.createElement("p");
    offerTag.innerHTML = "Offer Applied: " + offer;
    offerTag.style.color = "green";
    offerTag.style.fontWeight = "bold";
    container.appendChild(offerTag);
}

let totalDiv = document.createElement("div");
totalDiv.classList.add("cart-total");

totalDiv.innerHTML = `
    <h2>Total Amount</h2>
    <h3>$${total}</h3>
    <button onclick="placeOrder()">Place Order</button>
    <button onclick="removeOffer()">Remove Offer</button>
`;

container.appendChild(totalDiv);
}

// ➕ INCREASE
function increase(index) {
    cart[index].qty++;
    updateCart();
}

// ➖ DECREASE
function decrease(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}


function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}


function placeOrder() {

    let user = JSON.parse(localStorage.getItem("user"));

    
    if(!user){
        alert("Please login first 🔐");

    
        localStorage.setItem("redirect", "cart.html");

        window.location.href = "login.html";
        return;
    }

    
    if (cart.length === 0) {
        alert("Cart is empty 🛒 Please add items first!");
        return;
    }

    
    alert("Order Placed Successfully 🎉");

    localStorage.removeItem("cart");
    localStorage.removeItem("offer");

    cart = [];
    displayCart();
}

function removeOffer(){
    localStorage.removeItem("offer");
    alert("Offer Removed ❌");
    displayCart();
}

displayCart();


