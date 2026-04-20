function logout(){
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

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