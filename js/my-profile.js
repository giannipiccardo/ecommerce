(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    mandarLocalStorageDatos();

                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function extraerDelLocalStorage() {
    //checkear al inicio si está logueado o no
    if (localStorage.getItem("email")) {
        document.getElementById("email").value = localStorage.getItem("email")
    }else{
        window.location.href = "login.html";
    }

    //en caso que alguna vez haya guardado sus datos de perfil, cargarlos
    const obj_ls = localStorage.getItem('userObj')
    if (obj_ls) {
        const userObjj = JSON.parse(obj_ls);
        console.log(userObjj)

        document.getElementById("primerNombre").value = userObjj.PrimerNombre
        document.getElementById("segundoNombre").value = userObjj.SegundoNombre
        document.getElementById("primerApellido").value = userObjj.PrimerApellido
        document.getElementById("segundoApellido").value = userObjj.SegundoApellido
        document.getElementById("celularDeContacto").value = userObjj.Celular
        // document.getElementById("email").value = userObjj.Email
    }
}

document.addEventListener("DOMContentLoaded", () => {
    extraerDelLocalStorage();
})

function mandarLocalStorageDatos() {
    const userObj = {
        PrimerNombre: document.getElementById("primerNombre").value,
        SegundoNombre: document.getElementById("segundoNombre").value,
        PrimerApellido: document.getElementById("primerApellido").value,
        SegundoApellido: document.getElementById("segundoApellido").value,
        Email: document.getElementById("email").value,
        Celular: document.getElementById("celularDeContacto").value,
    }
    console.log(userObj)
    localStorage.setItem("userObj", JSON.stringify(userObj))
    getImg()
}

function getImg() {
    const avatarElement = document.getElementById("avatar");
    const image = avatarElement.files[0];
    console.log("avatar")
    console.log(avatar)
    if (image) {
        const urlImage = convertImage(image)
    }
}

function convertImage(image) {
    var reader = new FileReader();
    console.log("next");

    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

        imageBase64Stringsep = base64String;

        // alert(imageBase64Stringsep);
        console.log(base64String);
        return base64String
    }
    reader.readAsDataURL(image);
}