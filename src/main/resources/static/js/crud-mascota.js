//CRUD usando AJAX

function  obtenerMascotas(){




}

function guardarMascota(){
    nombre_mascota = document.getElementById("nombre_mascota").value;
    edad_mascota = document.getElementById("edad_mascota").value;
    raza_mascota = document.getElementById("raza").value;
    observaciones_mascota = document.getElementById("observaciones_mascota").value;
    if(nombre_mascota && edad_mascota > 0 && observaciones_mascota){

        $.ajax({
            method:"POST",
            url: "V1/api/mascota",
            data: JSON.stringify({
                nombre: nombre_mascota,
                edad: edad_mascota,
                raza: raza_mascota,
                observaciones: observaciones_mascota

            }),
            success: function( resultado ) {
                alert(resultado.nombre);
                alert(resultado.raza);
                alert(resultado.observaciones);



            },
            error: function (xhr,status,mensaje){
                //Se dispara la funcion sino conexion el servidor
                alert("Error de comunicacipon"+error)
            }
        });




    }else {

    }
}

function eliminarMascota(){

}

function seleccionarMascotaEliminar(){

}

function actualizarMascota(){

}
