function loginUser() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        document.getElementById("error").innerText = "No user found ❌";
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {

        document.getElementById("error").innerText = "Login Successful ✅";

        
        let redirect = localStorage.getItem("redirect");

        setTimeout(() => {

            if(redirect){
                localStorage.removeItem("redirect");
                window.location.href = redirect;
            } else {
                window.location.href = "menu.html";
            }

        }, 1000);

    } else {
        document.getElementById("error").innerText = "Invalid details ❌";
    }
}