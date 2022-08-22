function iniciarSesion(){
    const email = document.getElementById("email")
    const password1 = document.getElementById("password1")
    if(email.value && password1.value){
        window.location.href = "index.html"
    }
}