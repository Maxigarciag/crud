document.addEventListener("DOMContentLoaded", function () {
    mostrarDatos();
});

function mostrarDatos() {
    let listsneakers = JSON.parse(localStorage.getItem("listsneakers")) || [];

    let html = "";
    listsneakers.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.marca + "</td>";
        html += "<td>" + element.modelo + "</td>";
        html += "<td>" + element.talle + "</td>";
        html += "<td>" + element.precio + " $" + "</td>";
        html += "<td style='color:" + (element.stock == 0 ? 'red' : 'black') + ";'>" + (element.stock == 0 ? 'Sin stock' : element.stock) + "</td>";
        html += `<td><button class="btnedit" onclick="mostrarFormularioVender(${index})">Vender</button></td>`;
        html += "</tr>";
    });

    document.querySelector("#tableStock tbody").innerHTML = html;
}

function mostrarFormularioVender(index) {
    let listsneakers = JSON.parse(localStorage.getItem("listsneakers"));
    let sneaker = listsneakers[index];

    document.getElementById("inputProducto").value = `${sneaker.marca} ${sneaker.modelo}`;
    document.getElementById("inputTalle").value = sneaker.talle;
    document.getElementById("inputDfacturacion").value = ""; 
    document.getElementById("inputCantidadRestar").value = ""; 
    document.getElementById("comboBox").value = ""; 
    document.getElementById("venderFormContainer").hidden = false;
    document.getElementById("additionalForm").classList.add("hidden"); // Reset additional form visibility
}

function ocultarFormulario() {
    document.getElementById("inputProducto").value = "";
    document.getElementById("inputTalle").value = "";
    document.getElementById("inputDfacturacion").value = "";
    document.getElementById("inputCantidadRestar").value = "";
    document.getElementById("venderFormContainer").hidden = true;
    document.getElementById("additionalForm").classList.add("hidden");
}

function onComboBoxChange() {
    var comboBox = document.getElementById("comboBox");
    var additionalForm = document.getElementById("additionalForm");

    if (comboBox.value === "1" || comboBox.value === "2") { // Mostrar el formulario tanto para "Contado" (1) como para "Transferencia" (2)
        additionalForm.classList.remove("hidden");
    } else {
        additionalForm.classList.add("hidden");
    }
}

function restarStock() {
    let productoRestar = document.getElementById("inputProducto").value.trim();
    let talleRestar = document.getElementById("inputTalle").value.trim();
    let cantidadRestar = parseInt(document.getElementById("inputCantidadRestar").value);
    let dfacturacion = document.getElementById("inputDfacturacion").value.trim();
    let comboBox = document.getElementById("comboBox");
    let valorSeleccionado = comboBox.value;

    if (isNaN(cantidadRestar) || cantidadRestar <= 0) {
        alert("Ingrese una cantidad válida para restar.");
        return;
    }

    let listsneakers = JSON.parse(localStorage.getItem("listsneakers")) || [];

    let [marcaRestar, ...modeloRestar] = productoRestar.split(" ");
    modeloRestar = modeloRestar.join(" ");

    marcaRestar = marcaRestar.toLowerCase();
    modeloRestar = modeloRestar.toLowerCase();
    talleRestar = talleRestar.toLowerCase();

    let encontrado = false;
    let precioTotalVenta = 0;
    for (let i = 0; i < listsneakers.length; i++) {
        let marcaActual = listsneakers[i].marca.toLowerCase();
        let modeloActual = listsneakers[i].modelo.toLowerCase();
        let talleActual = listsneakers[i].talle.toLowerCase();

        if (
            marcaActual === marcaRestar &&
            modeloActual === modeloRestar &&
            talleActual === talleRestar
        ) {
            if (listsneakers[i].stock >= cantidadRestar) {
                listsneakers[i].stock -= cantidadRestar;

                // Guardar dfacturacion y valorSeleccionado en el objeto actual
                listsneakers[i].dfacturacion = dfacturacion;
                listsneakers[i].valorSeleccionado = valorSeleccionado;

                // Calcular el precio total de la venta
                let precioProducto = parseFloat(listsneakers[i].precio);
                precioTotalVenta = precioProducto * cantidadRestar;

                encontrado = true;
                break; // Producto encontrado y stock actualizado, salir del bucle
            } else {
                alert("No hay suficiente stock para restar esa cantidad.");
                return;
            }
        }
    }

    if (!encontrado) {
        alert("Producto no encontrado en el stock.");
        return;
    }

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("listsneakers", JSON.stringify(listsneakers));

    // Crear objeto con los datos de la venta
    let venta = {
        producto: productoRestar,
        talle: talleRestar,
        cantidad: cantidadRestar,
        dfacturacion: dfacturacion,
        metodoPago: valorSeleccionado,
        precioTotal: precioTotalVenta,  // Guardar el precio total de la venta
        buyerName: document.getElementById("buyerName").value.trim(),
        buyerEmail: document.getElementById("buyerEmail").value.trim(),
        buyerPhone: document.getElementById("buyerPhone").value.trim()
    };

    // Validar que todos los datos del comprador estén completos
    if (!venta.buyerName || !venta.buyerEmail || !venta.buyerPhone) {
        alert("Por favor, complete todos los datos del comprador.");
        return;
    }

    // Guardar la venta en el almacenamiento local
    localStorage.setItem("venta", JSON.stringify(venta));

    // Actualizar y mostrar la lista de sneakers en la tabla
    mostrarDatos();

    // Ocultar el formulario después de la venta
    ocultarFormulario();
}
