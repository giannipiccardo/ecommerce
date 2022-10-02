function iniciarSesion() {
    const email = document.getElementById("email");
    const password1 = document.getElementById("password1");

    let validacionOk = validacionLogin(email.value, password1.value)
    if (validacionOk) {
        guardarEnLocalStorage("email", email.value)
        window.location.href = "index.html";
    } else {
        alert("Hubo un error!")
    }
}

function validacionLogin(email, password) {
    if (email && password) {
        return true;
    }
    return false;
}

function guardarEnLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function logOut(){
    // console.log("esta entrando a logOut()")
    
    takeOutOfLocalStorage("email");
    window.location.href = "index.html";
}

function takeOutOfLocalStorage(key){
    localStorage.removeItem(key);
}