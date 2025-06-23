//CRUD Usado AJAX
// Inicialización de variables
let idMascotaEliminar = 0;

// Cargar las mascotas cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    obtenerMascotas();
});

function obtenerMascotas() {
    $.ajax({
        url: "/v1/api/mascota",
        contentType: "application/json",
        method: "GET",
        success: function(resultado) {
            if(resultado.estado === 1) {
                // Limpiar la tabla
                let tabla = $('#example').DataTable();
                tabla.clear();

                // Agregar las mascotas a la tabla
                resultado.mascotas.forEach(function(mascota) {
                    let botones = '<button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="seleccionarMascotaActualizar('+mascota.id+');">Edit</button>';
                    botones = botones + ' <button type="button" class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="seleccionarMascotaEliminar('+mascota.id+');">Delete</button>';

                    tabla.row.add([
                        mascota.id,
                        mascota.nombre,
                        mascota.edad,
                        botones
                    ]).node().id = 'renglon_'+mascota.id;
                });

                tabla.draw(false);
            } else {
                alert(resultado.mensaje);
            }
        },
        error: function(xhr, error, mensaje) {
            alert("Error de comunicación: " + error);
        }
    });
}

function guardarMascota(){
    nombre_mascota = document.getElementById("nombre_mascota").value;
    edad_mascota = document.getElementById("edad_mascota").value;
    raza_mascota = document.getElementById("raza_mascota").value;
    observaciones_mascota = document.getElementById("observaciones_mascota").value;
    //Validar de forma simple los campos - EXPRESIONES REGULARES
    if(nombre_mascota && edad_mascota>0 && observaciones_mascota){
        $.ajax({
            url: "/v1/api/mascota",
            contentType:"application/json",
            method:"POST",
            data: JSON.stringify({
                nombre:nombre_mascota,
                edad:edad_mascota,
                raza:raza_mascota,
                observaciones:observaciones_mascota
            }),
            success: function( resultado ) {
                alert(resultado.mensaje);
                let botones = '<button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="seleccionarMascotaActualizar('+resultado.mascota.id+');">Edit</button>'
                botones = botones + ' <button type="button" class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="seleccionarMascotaEliminar('+resultado.mascota.id+');">Delete</button>'

                let tabla = $('#example');
                //Agregar a la tabla y asignar un id: renglon_?

                tabla.DataTable().row.add([
                    resultado.mascota.id,
                    resultado.mascota.nombre,
                    resultado.mascota.edad,
                    botones
                ]).node().id='renglon_'+resultado.mascota.id; //renglon_5

                tabla.draw(false);


            },
            error:function (xhr,error,mensaje) {
                //Se dispara la funcion si no conexion al servidor
                alert("Error de comunicacion: "+error);
            }
        });
    }else{
        alert("Ingresa los datos correctamente")
    }
}

function seleccionarMascotaActualizar(id) {
    // Obtener los datos de la mascota seleccionada
    let datosMascota = $('#example').DataTable().row('#renglon_'+id).data();

    // Llenar el formulario de edición con los datos de la mascota
    document.getElementById("id_mascota_editar").value = datosMascota[0];
    document.getElementById("nombre_mascota_editar").value = datosMascota[1];
    document.getElementById("edad_mascota_editar").value = datosMascota[2];
    // Nota: La raza y observaciones no están en la tabla, se necesitaría una consulta adicional
    // o almacenar estos datos en atributos data- en la fila
}

function actualizarMascota() {
    let id_mascota = document.getElementById("id_mascota_editar").value;
    let nombre_mascota = document.getElementById("nombre_mascota_editar").value;
    let edad_mascota = document.getElementById("edad_mascota_editar").value;
    let raza_mascota = document.getElementById("raza_mascota_editar").value;
    let observaciones_mascota = document.getElementById("observaciones_mascota_editar").value;

    // Validar de forma simple los campos
    if(id_mascota && nombre_mascota && edad_mascota > 0 && observaciones_mascota) {
        $.ajax({
            url: "/v1/api/mascota/actualizar",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                id: id_mascota,
                nombre: nombre_mascota,
                edad: edad_mascota,
                raza: raza_mascota,
                observaciones: observaciones_mascota
            }),
            success: function(resultado) {
                if(resultado.estado === 1) {
                    // Actualizar la fila en la tabla
                    let botones = '<button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="seleccionarMascotaActualizar('+resultado.mascota.id+');">Edit</button>';
                    botones = botones + ' <button type="button" class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="seleccionarMascotaEliminar('+resultado.mascota.id+');">Delete</button>';

                    $('#example').DataTable().row('#renglon_'+resultado.mascota.id).data([
                        resultado.mascota.id,
                        resultado.mascota.nombre,
                        resultado.mascota.edad,
                        botones
                    ]).draw(false);

                    // Cerrar el modal
                    $('#editModal').modal('hide');
                    alert(resultado.mensaje);
                } else {
                    alert(resultado.mensaje);
                }
            },
            error: function(xhr, error, mensaje) {
                alert("Error de comunicación: " + error);
            }
        });
    } else {
        alert("Ingresa los datos correctamente");
    }
}

function seleccionarMascotaEliminar(id){
    //Mostar el modal de eliminar mascota
    let datosMascota = $('#example').DataTable().row('#renglon_'+id).data();
    $('#nombre_eliminar').text(datosMascota[1]+' :(')
    idMascotaEliminar = id;


}

function eliminarMascota() {
    if(idMascotaEliminar > 0) {
        $.ajax({
            url: "/v1/api/mascota/eliminar",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                id: idMascotaEliminar
            }),
            success: function(resultado) {
                if(resultado.estado === 1) {
                    // Eliminar la fila de la tabla
                    $('#example').DataTable().row('#renglon_'+idMascotaEliminar).remove().draw();
                    // Cerrar el modal
                    $('#deleteModal').modal('hide');
                    alert(resultado.mensaje);
                } else {
                    alert(resultado.mensaje);
                }
            },
            error: function(xhr, error, mensaje) {
                alert("Error de comunicación: " + error);
            }
        });
    } else {
        alert("No se ha seleccionado ninguna mascota para eliminar");
    }
}
