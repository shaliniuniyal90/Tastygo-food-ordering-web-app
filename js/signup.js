function signupUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    
    if (name === "" || email === "" || password === "") {
        document.getElementById("msg").innerText = "Please fill all fields ❌";
        return;
    }

    // save data
    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("msg").innerText = "Signup Successful ✅";
    window.location.href = "menu.html";

}