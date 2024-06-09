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

  var html = "";
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
    html += `<td><button class="btn btn-primary btnedit" onclick="mostrarFormularioVender(${index})">Vender</button></td>`;
    html += "</tr>";
  });

  document.querySelector("#tableStock tbody").innerHTML = html;
}

function mostrarFormularioVender(index) {
  let listsneakers = JSON.parse(localStorage.getItem("listsneakers"));
  let sneaker = listsneakers[index];

  document.getElementById("inputMarcaRestar").value = sneaker.marca;
  document.getElementById("inputModeloRestar").value = sneaker.modelo;
  document.getElementById("inputTalleRestar").value = sneaker.talle;
  document.getElementById("venderFormContainer").hidden = false;
}
function ocultarFormulario() {
  document.getElementById("inputMarcaRestar").value = "";
  document.getElementById("inputModeloRestar").value = "";
  document.getElementById("inputTalleRestar").value = "";
  document.getElementById("inputCantidadRestar").value = "";
  document.getElementById("venderFormContainer").hidden = true;
}

async function restarStock() {
  let marcaRestar = document.getElementById("inputMarcaRestar").value.trim();
  let modeloRestar = document.getElementById("inputModeloRestar").value.trim();
  let talleRestar = document.getElementById("inputTalleRestar").value.trim();
  let cantidadRestar = parseInt(
    document.getElementById("inputCantidadRestar").value
  );

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
        encontrado = true;
      } else {
        alert("No hay suficiente stock para restar esa cantidad.");
      }
    }
  }

  if (!encontrado) {
    alert("Producto no encontrado en el stock.");
  }

  localStorage.setItem("listsneakers", JSON.stringify(listsneakers));
  await mostrarDatos();

  document.getElementById("inputMarcaRestar").value = "";
  document.getElementById("inputModeloRestar").value = "";
  document.getElementById("inputTalleRestar").value = "";
  document.getElementById("inputCantidadRestar").value = "";

  document.getElementById("venderFormContainer").hidden = true;
}
