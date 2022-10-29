async function obtainAndLoadCart() {
    const id = "25801";
    const url = `https://japceibal.github.io/emercado-api/user_cart/${id}.json`;
    //CART_INFO_URL + 25801 + EXT_TYPE;

    const datos = await getJSONData(url)

    // console.log("datos carrito")
    console.log(datos)
    // console.log(datos.articles)

    loadCart(datos.data.articles);
    subtotal(datos.data.articles);
}

function loadCart(articles) {
    articles[1] = JSON.parse(JSON.stringify(articles[0]));
    articles[1].count = 3;
    articles[2] = JSON.parse(JSON.stringify(articles[0]));

    // console.log(articles)

    let cart = "";
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        cart += `
            <tr id="item-cart-${i}" class="item-cart">
                <td><img src="${article.image}" alt="${article.name}" width="70px" /></td>
                <td>${article.name}</td>
                <td>${article.currency} <span id="costo-${i}">${article.unitCost}</span></td>
                <td><input id="input-${i}" class="form-control input-numero" type="number" min="0" max="99" value="${article.count}" onchange="miFuncion(${i})"></td>
                <td>${article.currency} <span id="span-${i}">${article.unitCost * article.count}</span></td>
            </tr>
        `
    }
    document.getElementById("carrito").innerHTML = cart;
}

document.addEventListener('DOMContentLoaded', () => {
    obtainAndLoadCart()
})

function miFuncion(i) {
    const costo = Number(document.getElementById("costo-" + i).innerText);
    const cantidad = Number(document.getElementById("input-" + i).value);
    document.getElementById("span-" + i).innerText = costo * cantidad;
    subtotal();
}

function subtotal() {
    let cartList = document.getElementsByClassName("item-cart")
    // console.log("cartList")
    // console.log(cartList)
    let cartListArray = Array.from(cartList)
    // console.log("cartListArray")
    // console.log(cartListArray)

    let subt = 0;
    let CURRENCY = "USD";

    for (let item of cartListArray) {
        // console.log(item)
        // console.log(item.cells)
        let id = item.id
        id = id.replace("item-cart-", "")
        id = parseInt(id)
        // console.log(id)
        const costo = Number(document.getElementById("costo-" + id).innerText);
        const cantidad = Number(document.getElementById("input-" + id).value);
        subt += cantidad * costo;

    }
    document.getElementById("subtotal").innerHTML = `${CURRENCY} ${subt}`

    // let cartList1 = document.getElementById("item-cart-1")
    // console.log("cartList1")
    // console.log({cartList1})
}


// function subtotal2(articles) {
//     let subt = 0;
//     for (let i = 0; i < articles.length; i++) {
//         const article = articles[i];
//         subt += parseInt(article.unitCost) * parseInt(article.count);
//     }
//     console.log(subt)
//     document.getElementById("subtotal").innerHTML = articles.currency + " " + subt
// }

