const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_RELEVANCE = "Art.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

document.addEventListener('DOMContentLoaded', () => {
    empezarListarProductos()
    setearEventListeners()
    document.getElementById("nameCategory").innerHTML = localStorage.getItem("catName")
})

async function empezarListarProductos() {
    const url = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
    //"https://japceibal.github.io/emercado-api/cats_products/101.json"

    const datos = await getJSONData(url)
    // console.log("datos:")
    // console.log(datos)

    currentProductsArray = datos.data.products;

    // console.log("currentProductsArray")
    // console.log(currentProductsArray)

    showProductsList()
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}



function showProductsList(cosaabuscar) {
    let currentProductsArrayFiltered = null;
    if(cosaabuscar) {
        currentProductsArrayFiltered = currentProductsArray.filter(producto => 
            producto.name.toLowerCase().includes(cosaabuscar.toLowerCase()) || 
            producto.description.toLowerCase().includes(cosaabuscar.toLowerCase())
        )
        console.log(currentProductsArrayFiltered)
    }

    let htmlContentToAppend = "";
    for (let producto of (currentProductsArrayFiltered || currentProductsArray)) {
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {
            htmlContentToAppend += `
                <div onclick="setProdID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${producto.name} - ${numberWithDots(producto.cost)} ${producto.currency}</h4>       
                                <small class="text-muted">${producto.soldCount} Vendidos</small>
                            </div>
                            <p class="mb-1">${producto.description}</p>
                        </div>
                    </div>
                </div>
                `
        }
    }
    //console.log(htmlContentToAppend)
    document.getElementById("contenedor-productos").innerHTML = htmlContentToAppend;
}

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_RELEVANCE) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);

    //Muestro las categor??as ordenadas
    showProductsList();
}

function setearEventListeners() {
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por cantidad
        //de productos por categor??a.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });
}

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

document.getElementById("barraDeBusqueda").addEventListener("keyup",(e)=>{
    // console.log(e)
    showProductsList(e.target.value);
})