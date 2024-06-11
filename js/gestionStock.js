
document.addEventListener("DOMContentLoaded", function () {
  mostrarDatos();
});

function mostrarDatos() {
  let listsneakers;
  if (localStorage.getItem("listsneakers") == null) {
      listsneakers = [];
  } else {
      listsneakers = JSON.parse(localStorage.getItem("listsneakers"));
  }

  let html = "";
  listsneakers.forEach(function (element, index) {
      html += "<tr>";
      html += "<td>" + element.marca + "</td>";
      html += "<td>" + element.modelo + "</td>";
      html += "<td>" + element.talle + "</td>";
      html += "<td>" + element.precio + " $" + "</td>";
      if (element.stock == 0) {
          html += "<td style='color:red;'>Sin stock</td>";
      } else {
          html += "<td>" + element.stock + " " + "</td>";
      }
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
  document.getElementById("inputDfacturacion").value = ""; // Clear this field as it will be entered by the user
  document.getElementById("inputCantidadRestar").value = ""; // Clear this field as it will be entered by the user
  document.getElementById("venderFormContainer").hidden = false;
}

function ocultarFormulario() {
  document.getElementById("inputProducto").value = "";
  document.getElementById("inputTalle").value = "";
  document.getElementById("inputDfacturacion").value = "";
  document.getElementById("inputCantidadRestar").value = "";
  document.getElementById("venderFormContainer").hidden = true;
}
function restarStock() {
  let productoRestar = document.getElementById("inputProducto").value.trim();
  let talleRestar = document.getElementById("inputTalle").value.trim();
  let cantidadRestar = parseInt(document.getElementById("inputCantidadRestar").value);
  let dfacturacion = document.getElementById("inputDfacturacion").value.trim();

  if (isNaN(cantidadRestar) || cantidadRestar <= 0) {
      alert("Ingrese una cantidad válida para restar.");
      return;
  }

  let listsneakers;
  if (localStorage.getItem("listsneakers") == null) {
      listsneakers = [];
  } else {
      listsneakers = JSON.parse(localStorage.getItem("listsneakers"));
  }

  let [marcaRestar, ...modeloRestar] = productoRestar.split(" ");
  modeloRestar = modeloRestar.join(" ");

  marcaRestar = marcaRestar.toLowerCase();
  modeloRestar = modeloRestar.toLowerCase();
  talleRestar = talleRestar.toLowerCase();

  let encontrado = false;
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

              // Guardar dfacturacion en el objeto actual
              listsneakers[i].dfacturacion = dfacturacion;

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

  localStorage.setItem("listsneakers", JSON.stringify(listsneakers)); // Guardar la lista actualizada
  mostrarDatos();

  ocultarFormulario();
}
