
document.addEventListener('DOMContentLoaded', function () {
    mostrarDatos();
});

function mostrarDatos() {
    let listsneakers;
    if (localStorage.getItem('listsneakers') == null) {
        listsneakers = [];
    } else {
        listsneakers = JSON.parse(localStorage.getItem('listsneakers'));
    }

    var html = "";
    listsneakers.forEach(function (element) {
        html += "<tr>";
        html += "<td>" + element.marca + "</td>";
        html += "<td>" + element.modelo + "</td>";
        html += "<td>" + (element.talle || '') + "</td>";
        html += "<td>" + element.precio +" $"+ "</td>";
        if (element.stock == 0) {
            html += "<td><span style='color:red'>Sin stock</span></td>";
        } else {
            html += "<td>" + element.stock + "</td>";
        }       
        html += "</tr>";
    });

    document.querySelector('#tabledata tbody').innerHTML = html;
}

function buscarDatos() {
    var input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById("buscar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabledata");
    tbody = table.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; 
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

      
