async function obtainAndLoadCart() {
    const id = "25801";
    const url = `https://japceibal.github.io/emercado-api/user_cart/${id}.json`;
    //CART_INFO_URL + 25801 + EXT_TYPE;

    const datos = await getJSONData(url)

    // console.log("datos carrito")
    // console.log(datos)
    // console.log(datos.articles)

    loadCart(datos.data.articles);
}

function loadCart(articles) {
    // articles[1] = JSON.parse(JSON.stringify(articles[0]));
    // articles[1].count = 3;
    // articles[2] = JSON.parse(JSON.stringify(articles[0]));

    // console.log(articles)

    let cart = "";
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        cart += `
            <tr>
                <td><img src="${article.image}" alt="${article.name}" width="70px" /></td>
                <td>${article.name}</td>
                <td>${article.currency} <span id="costo-${i}">${article.unitCost}</span></td>
                <td><input id="input-${i}" class="form-control input-numero" type="number" value="${article.count}" onchange="miFuncion(${i})"></td>
                <td>${article.currency} <span id="span-${i}">${article.unitCost*article.count}</span></td>
            </tr>
        `
    }
    document.getElementById("carrito").innerHTML = cart;
}

document.addEventListener('DOMContentLoaded', () => {
    obtainAndLoadCart()
})

function miFuncion(i){
    const costo = Number(document.getElementById("costo-" + i).innerText);
    const cantidad = Number(document.getElementById("input-" + i).value);
    document.getElementById("span-" + i).innerText = costo * cantidad;
}