const url1 = "https://japceibal.github.io/emercado-api/cats_products/101.json"

// async function getDataFromEndpoint(endpoint){
//     const response = await fetch(endpoint)
//     return await response.json()
// }

async function empezarListarProductos() {
    const datos = await getJSONData(url1)
    console.log("datos:") 
    console.log(datos)

    let productos = datos.data.products

    console.log("productos:")
    console.log(productos)

    showProductsList(productos)
    // for (let producto of productos){
    //     console.log(producto)
    //     let html_tr = `
    //     <tr>
    //         <td>${producto._id}</td>
    //         <td><input type="text" value="${producto.nombre}"></td>
    //         <td><input type="text" value="${persona.apellido}"></td>
    //         <td><input type="text" value="${persona.nacimiento}"></td>
    //         <td><input type="text" value="${persona.sexo}"></td>
    //         <td><button onclick="modificarPersona('${persona._id}')">Modificar</button></td>
    //     </tr>
    //     `
    //     let tbody = document.getElementById("tbody")
    //     tbody.innerHTML += html_tr
    // }
}

document.addEventListener('DOMContentLoaded', () => {
    empezarListarProductos()
})

function showProductsList(productos) {

    let htmlContentToAppend = "";
    for (let producto of productos) {

        htmlContentToAppend += `
            <div onclick="setCatID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${producto.name} - ${producto.cost} ${producto.currency}</h4>       
                            <small class="text-muted">${producto.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${producto.description}</p>
                    </div>
                </div>
            </div>
            `
    }
    document.getElementById("contenedor-productos").innerHTML = htmlContentToAppend;
}
