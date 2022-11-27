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
    } else {
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
}

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
toDataURL('https://cdn.discordapp.com/attachments/571092147801948204/784586541146177606/6f32c864-985a-481d-8d8e-bd1f14ab9951.png', function (dataUrl) {
    console.log('RESULT:', dataUrl)
})

function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("file").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.src = srcData;
            newImage.classList.add("imgSize")
            // add.classList("imgSize")
            document.getElementById("showImage").innerHTML = newImage.outerHTML;
            // alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
            // console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}