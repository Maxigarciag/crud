function mostrarError(mensaje) {
  alert(mensaje);
}
function validateform() {
  let marca = document.getElementById("inputmarca").value;
  let modelo = document.getElementById("inputmodelo").value;
  let talle = document.getElementById("inputtalle").value;
  let stock = document.getElementById("inputCantidadCargar").value;
  let precio = document.getElementById("inputPrecioCargar").value;

  if (marca.trim() === "") {
    alert("Ingrese la marca");
    return false;
  }
  if (modelo.trim() === "") {
    alert("Ingrese el modelo");
    return false;
  }
  if (talle.trim() === "") {
    alert("Ingrese el talle");
    return false;
  }
  if (isNaN(stock) || stock.trim() === "" || stock < 0) {
    alert("Ingrese un valor numérico válido y positivo para el stock");
    return false;
  }
  if (isNaN(precio) || precio.trim() === "" || precio < 0) {
    alert("Ingrese un precio de producto valido");
    return false;
  }

  return true;
}
function read() {
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
      html += "<td><span style='color:red'>Sin stock</span></td>";
    } else {
      html += "<td>" + element.stock + "</td>";
    }

    html +=
      '<td><button onclick="deletedata(' +
      index +
      ')" class="btn btn-danger" id="btneliminar">Eliminar Dato</button><button id="btnedit" onclick="editdata(' +
      index +
      ')" class="btn btn-warning">Editar Dato</button></td>';
    html += "</tr>";
  });

  document.querySelector("#tabledata tbody").innerHTML = html;
}
document.addEventListener("DOMContentLoaded", read);
function adddata() {
  if (validateform()) {
    let marca = document.getElementById("inputmarca").value;
    let modelo = document.getElementById("inputmodelo").value;
    let talle = document.getElementById("inputtalle").value;
    let stock = document.getElementById("inputCantidadCargar").value;
    let precio = document.getElementById("inputPrecioCargar").value;

    var listsneakers;
    if (localStorage.getItem("listsneakers") == null) {
      listsneakers = [];
    } else {
      listsneakers = JSON.parse(localStorage.getItem("listsneakers"));
    }

    listsneakers.push({
      marca: marca,
      modelo: modelo,
      talle: talle,
      stock: stock,
      precio: precio,
    });

    localStorage.setItem("listsneakers", JSON.stringify(listsneakers));
    read();

    // Si el stock es 0, agregar el estilo rojo al elemento en la tabla
    if (stock == 0) {
      let tableRows = document.querySelectorAll("#tabledata tbody tr");
      let lastRow = tableRows[tableRows.length - 1];
      let stockCell = lastRow.querySelector("td:nth-child(4)");
      stockCell.innerHTML = "<span style='color:red'>Sin stock</span>";
    }

    // Limpiar los campos de entrada después de agregar el dato
    document.getElementById("inputmarca").value = "";
    document.getElementById("inputmodelo").value = "";
    document.getElementById("inputtalle").value = "";
    document.getElementById("inputCantidadCargar").value = "";
    document.getElementById("inputPrecioCargar").value = " ";
  }
}
function deletedata(index) {
  let listsneakers;
  if (localStorage.getItem("listsneakers") == null) {
    listsneakers = [];
  } else {
    listsneakers = JSON.parse(localStorage.getItem("listsneakers"));
  }

  listsneakers.splice(index, 1);
  localStorage.setItem("listsneakers", JSON.stringify(listsneakers));

  read();
}
function editdata(index) {
  document.getElementById("btnadd").style.display = "none";
  document.getElementById("btnupdate").style.display = "block";

  let listsneakers;
  if (localStorage.getItem("listsneakers") == null) {
    listsneakers = [];
  } else {
    listsneakers = JSON.parse(localStorage.getItem("listsneakers"));
  }

  document.getElementById("inputmarca").value = listsneakers[index].marca;
  document.getElementById("inputmodelo").value = listsneakers[index].modelo;
  document.getElementById("inputtalle").value = listsneakers[index].talle;
  document.getElementById("inputCantidadCargar").value =
    listsneakers[index].stock;
  document.getElementById("inputPrecioCargar").value =
    listsneakers[index].precio;

  document.querySelector("#btnupdate").onclick = function () {
    if (validateform() == true) {
      listsneakers[index].marca = document.getElementById("inputmarca").value;
      listsneakers[index].modelo = document.getElementById("inputmodelo").value;
      listsneakers[index].talle = document.getElementById("inputtalle").value;
      listsneakers[index].stock = document.getElementById(
        "inputCantidadCargar"
      ).value;
      listsneakers[index].precio =
        document.getElementById("inputPrecioCargar").value;

      localStorage.setItem("listsneakers", JSON.stringify(listsneakers));
      read();
      document.getElementById("inputmarca").value = "";
      document.getElementById("inputmodelo").value = "";
      document.getElementById("inputtalle").value = "";
      document.getElementById("inputCantidadCargar").value = "";
      document.getElementById("inputPrecioCargar").value = " ";

      document.getElementById("btnadd").style.display = "block";
      document.getElementById("btnupdate").style.display = "none";
    }
  };
}