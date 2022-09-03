document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        // localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        // localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        // localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    mostrarMailEnNav()
});


function mostrarMailEnNav(){
    let guardarElemento = document.getElementById("EmailLogueado")
    // console.log(guardarElemento)
    // console.log(guardarElemento.__proto__)
    let value = localStorage.getItem("email")
    // console.log(value)
    // console.log(guardarElemento.innerText)
    guardarElemento.innerText = value;
}