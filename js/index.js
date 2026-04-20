function logout(){
    localStorage.removeItem("user");
    window.location.href = "login.html";
}


function filterMenu(category, event) {

    let cards = document.querySelectorAll(".menu-card");
    let buttons = document.querySelectorAll(".menu-filters button");

    
    buttons.forEach(btn => btn.classList.remove("active"));
    if(event) event.target.classList.add("active");

    cards.forEach(card => {

        card.style.display = "block";

        if (category !== "all") {
            if (!card.classList.contains(category)) {
                card.style.display = "none";
            }
        }
    });
}


document.querySelectorAll(".cart-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        let card = this.closest(".menu-card");

        let name = card.getAttribute("data-name");
        let price = parseInt(card.getAttribute("data-price"));

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let image = card.getAttribute("data-image");

        if(!image){
            image = card.querySelector("img").getAttribute("src");
        }

        let category = card.classList.contains("pizza") ? "pizza" :
                       card.classList.contains("burger") ? "burger" :
                       card.classList.contains("drink") ? "drink" :
                       card.classList.contains("fries") ? "fries" :
                       card.classList.contains("sandwich") ? "sandwich" : "";

        let existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, image, category, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Item added to cart 🛒");

        window.location.href = "cart.html";
    });

});


document.addEventListener("DOMContentLoaded", function(){

    
    let user = JSON.parse(localStorage.getItem("user"));

    let loginBtn = document.querySelector(".login_link");
    let logoutBtn = document.querySelector(".logout_icon");

    if(user){
        if(loginBtn) loginBtn.style.display = "none";
        if(logoutBtn) logoutBtn.style.display = "block";
    } else {
        if(loginBtn) loginBtn.style.display = "block";
        if(logoutBtn) logoutBtn.style.display = "none";
    }

    
    let searchInput = document.getElementById("searchInput");

    if(!searchInput) return;

    searchInput.addEventListener("keydown", function(e){

        if(e.key === "Enter"){   

            let value = this.value.toLowerCase();
            let cards = document.querySelectorAll(".menu-card");

            if(value === ""){
                cards.forEach(card => card.style.display = "block");
                return;
            }

            let found = false;

            cards.forEach(card => {

                let name = card.getAttribute("data-name");

                if(name){
                    name = name.toLowerCase();

                    if(name.includes(value)){
                        card.style.display = "block";
                        found = true;
                    } else {
                        card.style.display = "none";
                    }
                }

            });

            if(found){

                let menuSection = document.querySelector(".menu-section");

                let yOffset = -70;

                let y = menuSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                });
            }
        }
    });
});


function toggleMenu(){
    document.querySelector(".nav_links").classList.toggle("active");
}


function checkLoginAndRedirect(page){

    let user = JSON.parse(localStorage.getItem("user"));

    if(user){
        window.location.href = page;
    }else{
        localStorage.setItem("redirect", page);
        window.location.href = "login.html";
    }
}