async function empezarListarProducto() {
    const url = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
    // console.log(url)
    //"https://japceibal.github.io/emercado-api/products/50742.json"

    const datos = await getJSONData(url)
    console.log("datos producto")
    console.log(datos)
    showProduct(datos.data);
    relatedProducts(datos.data.relatedProducts)
}

theData = {}

//Función que muestra el producto.
function showProduct(theData) {
    // console.log("theData")
    // console.log(theData)

    loadCarousel(theData.images)
    loadData(theData)
}

//Función para cargar el carrusel de imágenes.
function loadCarousel(photoList) {
    let buttons = "";
    let images = "";

    for (let i = 0; i < photoList.length; i++) {
        let photo = photoList[i];
        // console.log("photo")
        // console.log(photo)

        let firstButtonAttributes = "";
        let imageActive = "";
        if (i == 0) {
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

//Lo que primero se inicia.
document.addEventListener("DOMContentLoaded", function (e) {
    // console.log(e)
    empezarListarProducto();
    obtainAndLoadComments();
});

//Función para cargar todas las características del producto.
function loadData(data) {
    // console.log("esta entrando a loadData")
    let featuress = `
    <div class="row">
        <div class="col">
            <h2>${data.name}</h2>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col">
            <h5><strong>Precio:</strong></h5>
            <p>${data.currency} ${data.cost}</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <h5><strong>Descripción:</strong></h5>
            <p>${data.description}</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <h5><strong>Categoría:</strong></h5>
            <p>${data.category}</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <h5><strong>Productos vendidos:</strong></h5>
            <p>${data.soldCount}</p>
        </div>
    </div>
    `
    document.getElementById("features").innerHTML = featuress;
}

async function obtainAndLoadComments() {
    const url2 = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;
    //https://japceibal.github.io/emercado-api/products_comments/50742.json

    const datos = await getJSONData(url2)

    // console.log("datos comentarios")
    // console.log(datos)

    loadComments(datos.data);
    goUp()
}

//Función para cargar los comentarios.
function loadComments(data) {
    // console.log("data")
    // console.log(data)
    let comment = "";
    for (let i = 0; i < data.length; i++) {
        const currentElement = data[i];
        // console.log(currentElement)
        comment += `
        <div class="row mt-4">
            <div class="col d-flex">
                <h4><strong>${currentElement.user}</strong> - </h4>
                <h4 class="fs-5 px-1"> ${currentElement.dateTime} - </h4>
                <h4 class="estrellas">${showStars(currentElement.score)}</h4>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p class="fs-5">${currentElement.description}</p>
            </div>
        </div>
        `
    }
    // console.log("comment")
    // console.log(comment)
    document.getElementById("comentarios").innerHTML = comment;
}

function showStars(score) {
    addScore = "";
    for (let i = 1; i < 6; i++) {
        if (score >= i) {
            addScore += "★";
        } else {
            addScore += "☆";
        }
    }
    return addScore;
}

function relatedProducts(relatedProducts){
    let products = "";
    // console.log("relatedProducts:")
    // console.log(relatedProducts)
    for (let product of relatedProducts) {
        products += `
        <div class="col col-md-6 col-lg-4 col-xl-3" onclick="setIDAndReload(${product.id})">
            <div class="card px-2" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("related").innerHTML = products
}

function setIDAndReload(id){
    localStorage.setItem("prodID", id)
    window.location.reload();
}

function goUp(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
}