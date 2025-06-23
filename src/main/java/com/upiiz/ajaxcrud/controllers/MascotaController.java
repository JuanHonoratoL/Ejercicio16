package com.upiiz.ajaxcrud.controllers;

import com.upiiz.ajaxcrud.Services.MascotaService;
import com.upiiz.ajaxcrud.models.MascotaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Controller
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;



    @GetMapping
    public String mascota() {
        return "mascota";
    }

    @GetMapping("/v1/api/mascota")
    public ResponseEntity<Map<String,Object>> getMascotas() {
        List<MascotaModel> mascotas = mascotaService.findAllMascots();
        return ResponseEntity.ok(Map.of(
                "estado", 1,
                "mensaje", "Mascotas obtenidas correctamente",
                "mascotas", mascotas
        ));
    }

    @PostMapping("/v1/api/mascota")
    public ResponseEntity<Map<String,Object>> mascotaPost(@RequestBody Map<String,Object> objetoMascota) {
        MascotaModel mascota = new MascotaModel(
                objetoMascota.get("nombre").toString(),
                Integer.parseInt(objetoMascota.get("edad").toString()),
                Integer.parseInt(objetoMascota.get("raza").toString()),
                objetoMascota.get("observaciones").toString()
        );
        //Solo para probar la funcionalidad se envia al front lo mismo
        //1.- Debemos crear un objeto mascota
        //2.- Debemos mandar llamar al servicio -> definido de un repositorio
        //Esta mascota ya tiene su ID
        MascotaModel mascotaGuardada = mascotaService.save(mascota);
        if(mascotaGuardada != null) {


        return ResponseEntity.ok(Map.of(
                "estado", 1,
                "mensaje", "Mascota guardada correctamente",
                "mascota", mascotaGuardada));
        }
        else {
            return ResponseEntity.ok(Map.of("estado", 0,
                    "Mensaje", "Error: No se pudo guardar la mascota",
                    "mascota", objetoMascota));
            }
    }

    @PostMapping("/v1/api/mascota/eliminar")
    public ResponseEntity<Map<String,Object>> mascotaDeletePost(@RequestBody Map<String,Object> objetoMascota) {
        int id = Integer.parseInt(objetoMascota.get("id").toString());
        if(mascotaService.delete(id) > 0){
            return ResponseEntity.ok(Map.of(
                    "estado", 1,
                    "mensaje", "Mascota eliminada"
            ));
        }
        else {
            return ResponseEntity.ok(Map.of(
                    "estado", 0,
                    "mensaje", "No se pudo eliminar la Mascota"
            ));
        }
    }

    @PostMapping("/v1/api/mascota/actualizar")
    public ResponseEntity<Map<String,Object>> mascotaUpdatePost(@RequestBody Map<String,Object> objetoMascota) {
        MascotaModel mascota = new MascotaModel(
                objetoMascota.get("nombre").toString(),
                Integer.parseInt(objetoMascota.get("edad").toString()),
                Integer.parseInt(objetoMascota.get("raza").toString()),
                objetoMascota.get("observaciones").toString()
        );
        mascota.setId(Long.parseLong(objetoMascota.get("id").toString()));

        int resultado = mascotaService.update(mascota);
        if(resultado > 0) {
            return ResponseEntity.ok(Map.of(
                    "estado", 1,
                    "mensaje", "Mascota actualizada correctamente",
                    "mascota", mascota
            ));
        } else {
            return ResponseEntity.ok(Map.of(
                    "estado", 0,
                    "mensaje", "Error: No se pudo actualizar la mascota",
                    "mascota", objetoMascota
            ));
        }
    }
}
