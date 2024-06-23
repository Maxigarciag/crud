document.addEventListener("DOMContentLoaded", function () {
    mostrarComprobante();
});

function mostrarComprobante() {
    let venta = JSON.parse(localStorage.getItem("venta"));

    if (venta) {
        // Clonar la plantilla de comprobante
        let plantilla = document.getElementById("plantillaComprobante");
        let nuevaTarjeta = plantilla.content.cloneNode(true);

        // Modificar los valores en la tarjeta clonada
        nuevaTarjeta.querySelector(".card-title").textContent = venta.producto;
        nuevaTarjeta.querySelector(".card-subtitle").textContent = `Talle: ${venta.talle}`;
        nuevaTarjeta.querySelectorAll(".card-text")[0].innerHTML = `<strong>Cantidad:</strong> ${venta.cantidad}`;
        nuevaTarjeta.querySelectorAll(".card-text")[1].innerHTML = `<strong>Método de Pago:</strong> ${venta.metodoPago === '1' ? 'Contado' : 'Transferencia'}`;
        nuevaTarjeta.querySelectorAll(".card-text")[2].innerHTML = `<strong>Dirección de Facturación:</strong> ${venta.dfacturacion}`;
        nuevaTarjeta.querySelectorAll(".card-text")[3].innerHTML = `<strong>Nombre:</strong> ${venta.buyerName}`;
        nuevaTarjeta.querySelectorAll(".card-text")[4].innerHTML = `<strong>Correo Electrónico:</strong> ${venta.buyerEmail}`;
        nuevaTarjeta.querySelectorAll(".card-text")[5].innerHTML = `<strong>Teléfono:</strong> ${venta.buyerPhone}`;

        // Mostrar el valor de la venta
        let precioTotalElement = document.createElement("p");
        precioTotalElement.classList.add("card-text");
        precioTotalElement.innerHTML = `<strong>Valor de la Venta:</strong> <span style="color: green;">${venta.precioTotal.toFixed(2)} $</span>`;
        nuevaTarjeta.querySelector(".card-body").appendChild(precioTotalElement);

        // Obtener el contenedor de comprobantes y agregar la nueva tarjeta
        let comprobantesContainer = document.getElementById("comprobantesContainer");
        comprobantesContainer.appendChild(nuevaTarjeta);
    } else {
        console.log("No hay datos de venta disponibles.");
    }
}
