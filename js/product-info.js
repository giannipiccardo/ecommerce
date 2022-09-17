async function empezarListarProducto() {
    const url = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
    console.log(url)
    //"https://japceibal.github.io/emercado-api/products/50742.json"

    const datos = await getJSONData(url)
    console.log(datos)
    showProduct(datos.data);
}

datitos = {}

function showProduct(datitos) {
    console.log("datitos")
    console.log(datitos)

    loadCarousel(datitos.images)
    loadData(datitos)
}

function loadCarousel(photoList) {
    let buttons = "";
    let images = "";

    for(let i=0; i<photoList.length; i++){
        let photo = photoList[i];
        // console.log("photo")
        // console.log(photo)

        let firstButtonAttributes = "";
        let imageActive = "";
        if(i == 0){
            firstButtonAttributes = ' class="active" aria-current="true"';
            imageActive = "active";
        }

        buttons += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i}"${firstButtonAttributes}></button>`
        
        images += ` <div class="carousel-item ${imageActive}">
                        <img src="${photo}" class="d-block w-100" alt="${photo}">
                    </div> `
    
    }
    // console.log("buttons:")
    // console.log(buttons)
    // console.log("images:")
    // console.log(images)

    document.getElementById("carousel-indicators").innerHTML = buttons;
    document.getElementById("carousel-inner").innerHTML = images;
}

document.addEventListener("DOMContentLoaded", function (e) {
    console.log(e)
    empezarListarProducto();
});

function loadData(data){
    // console.log("esta entrando a loadData")
    let featuress = `
    <div class="row">
        <h2>${data.name}</h2>
    </div>
    <hr>
    <div class="row">
        <h5><strong>Precio:</strong></h5>
        <p>${data.currency} ${data.cost}</p>
    </div>
    <div class="row">
        <h5><strong>Descripción:</strong></h5>
        <p>${data.description}</p>
    </div>
    <div class="row">
        <h5><strong>Categoría:</strong></h5>
        <p>${data.category}</p>
    </div>
    <div class="row">
        <h5><strong>Cantidad de productos vendidos:</strong></h5>
        <p>${data.soldCount}</p>
    </div>
    `
    document.getElementById("features").innerHTML = featuress;
}

function newComment() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let hour = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (day < 10) {
        day = "0" + day;
    }
    let date = today.getFullYear() + "-" + month + "-" + day + "-" + hour;
    return date
}
