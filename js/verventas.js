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
        nuevaTarjeta.querySelectorAll(".card-text")[0].textContent = `Cantidad: ${venta.cantidad}`;
        nuevaTarjeta.querySelectorAll(".card-text")[1].textContent = `Método de Pago: ${venta.metodoPago === '1' ? 'Contado' : 'Transferencia'}`;
        nuevaTarjeta.querySelectorAll(".card-text")[2].textContent = `Dirección de Facturación: ${venta.dfacturacion}`;
        nuevaTarjeta.querySelectorAll(".card-text")[3].textContent = `Nombre: ${venta.buyerName}`;
        nuevaTarjeta.querySelectorAll(".card-text")[4].textContent = `Correo Electrónico: ${venta.buyerEmail}`;
        nuevaTarjeta.querySelectorAll(".card-text")[5].textContent = `Teléfono: ${venta.buyerPhone}`;

        // Obtener el contenedor de comprobantes y agregar la nueva tarjeta
        let comprobantesContainer = document.getElementById("comprobantesContainer");
        comprobantesContainer.appendChild(nuevaTarjeta);
    } else {
        console.log("No hay datos de venta disponibles.");
    }
}
