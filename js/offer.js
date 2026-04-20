function applyOffer(type){
    localStorage.setItem("offer", type);
    alert("Offer Applied ✅");
    window.location.href = "cart.html";
}

