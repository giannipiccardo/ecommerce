async function obtainAndLoadCart() {
    const id = "25801";
    const url = `https://japceibal.github.io/emercado-api/user_cart/${id}.json`;
    //CART_INFO_URL + 25801 + EXT_TYPE;

    const datos = await getJSONData(url)

    // console.log("datos carrito")
    // console.log(datos)
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
            <tr class="item-cart" data-index="${i}" data-currency="${article.currency}" data-unitcost="${article.unitCost}">
                <td><img src="${article.image}" alt="${article.name}" width="70px" /></td>
                <td>${article.name}</td>
                <td>${article.currency} <span id="costo-${i}">${article.unitCost}</span></td>
                <td><input id="input-${i}" class="form-control input-numero" type="number" min="0" max="99" value="${article.count}" onchange="miFuncion(${i})" onkeyup="miFuncion(${i})" style="min-width:100px"></td>
                <td>${article.currency} <span id="span-${i}">${article.unitCost * article.count}</span></td>
                <td><img src="./img/eliminar.png" alt="eliminar" width="35px" /></td>
            </tr>
        `
    }
    document.getElementById("carrito").innerHTML = cart;
}

document.addEventListener('DOMContentLoaded', () => {
    obtainAndLoadCart();
    setTipoDeEnvioListener();
    myValidation();
})

function setTipoDeEnvioListener(){
    const elems = Array.from(document.getElementsByName("envio"));

    elems.forEach(element => {
        element.addEventListener("click", subtotal)
    });
}

function miFuncion(i) {
    const costo = Number(document.getElementById("costo-" + i).innerText);
    const cantidad = Number(document.getElementById("input-" + i).value);
    document.getElementById("span-" + i).innerText = numberWithDots(costo * cantidad);
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
    let conversionRate = 40;

    for (let item of cartListArray) {
        // console.log(item)
        // console.log(item.dataset)
        // console.log(item.cells)
        let id = parseInt(item.dataset.index)
        // console.log(id)
        const currency = item.dataset.currency;
        let costo = 0;
        if (currency === "USD") {
            costo = Number(item.dataset.unitcost)
        } else {
            costo = Number(item.dataset.unitcost) / conversionRate;
        }
        const cantidad = Number(document.getElementById("input-" + id).value);
        subt += cantidad * costo;
    }
    document.getElementById("subtotal").innerHTML = `${CURRENCY} ${numberWithDots(subt)}`;

    let shipping = document.getElementsByName("envio");
    // console.log("shipping")
    // console.log(shipping)
    let shippingCost = 0;
    for (let i = 0; i < shipping.length; i++) {
        if (shipping[i].checked) {
            shippingCost = subt * parseFloat(shipping[i].value);
        }
    }
    // console.log("shippingCost")
    // console.log(shippingCost)
    shippingCost = Math.round(shippingCost)
    // console.log("shippingCost")
    // console.log(shippingCost)
    document.getElementById("costoEnvio").innerHTML = `${CURRENCY} ${numberWithDots(shippingCost)}`;

    document.getElementById("total").innerHTML = `<strong>${CURRENCY} ${numberWithDots(shippingCost + subt)}</strong>`;
}

document.getElementById("TarjCredito").addEventListener("click", () => {
    disableElements(true);
    document.getElementById("formOfPayment").innerText = "Tarjeta de crédito.";
    document.getElementById("formOfPayment2").checked = true;
})

document.getElementById("transfBancaria").addEventListener("click", () => {
    disableElements(false);
    document.getElementById("formOfPayment").innerText = "Transferencia bancaria.";
    document.getElementById("formOfPayment2").checked = true;
})

function disableElements(bool) {
    const paymentCard = document.getElementById("paymentCard")
    const inputs = paymentCard.getElementsByTagName("input")
    const selects = paymentCard.getElementsByTagName("select")

    const bankTransfer = document.getElementById("bankTransfer")
    const inputs2 = bankTransfer.getElementsByTagName("input")
    const selects2 = bankTransfer.getElementsByTagName("select")

    function toggleDisabledOfHTMLCollection(elements, bool) {
        Array.from(elements).forEach(element => {
            element.disabled = bool;
            element.required = !bool;
        });
    }

    toggleDisabledOfHTMLCollection(inputs, bool);
    toggleDisabledOfHTMLCollection(selects, bool);
    toggleDisabledOfHTMLCollection(inputs2, !bool);
    toggleDisabledOfHTMLCollection(selects2, !bool);

    toggleDisabledOfHTMLCollection(inputs2, bool);
    toggleDisabledOfHTMLCollection(selects2, bool);
    toggleDisabledOfHTMLCollection(inputs, !bool);
    toggleDisabledOfHTMLCollection(selects, !bool);
}

function myValidation() {
    var form = document.getElementById("myForm")

    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            // console.log("no es valido")
            event.preventDefault();
            event.stopPropagation();
        }else{
                document.getElementById("mensajito").classList.remove("oculto")
        }
        form.classList.add('was-validated')
    })
}

