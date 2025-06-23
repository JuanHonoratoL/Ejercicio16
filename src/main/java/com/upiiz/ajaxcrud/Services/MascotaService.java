package com.upiiz.ajaxcrud.Services;

import com.upiiz.ajaxcrud.Repositories.MascotaRepository;
import com.upiiz.ajaxcrud.models.MascotaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Service

public class MascotaService implements MascotaRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<MascotaModel> findAllMascots() {
        return jdbcTemplate.query("SELECT * FROM mascota",
                new BeanPropertyRowMapper<>(MascotaModel.class));
    }

    @Override
    public MascotaModel findMascotById(int id) {
        return jdbcTemplate.query("SELECT * FROM mascota WHERE id=?",
                        new BeanPropertyRowMapper<>(MascotaModel.class),id)
                .stream().findFirst().orElse(new MascotaModel());
    }

    @Override
    public MascotaModel save(MascotaModel mascota) {
        KeyHolder keyHolder = new GeneratedKeyHolder(); // Para capturar el ID generado

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO mascota(nombre, edad, raza, observaciones) VALUES (?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS // Indicar que queremos recuperar las claves generadas
            );
            ps.setString(1, mascota.getNombre());
            ps.setInt(2, mascota.getEdad());
            ps.setInt(3, mascota.getRaza());
            ps.setString(4, mascota.getObservaciones());
            return ps;
        }, keyHolder);

        // Obtenemos el ID generado y lo asignamos al producto
        Number generatedId = keyHolder.getKey();
        if (generatedId != null) {
            mascota.setId(generatedId.longValue());
        }else {
            mascota.setId(0L);
        }

        return mascota; // Retornamos el modelo con el ID asignado
    }


    @Override
    public int update(MascotaModel mascota) {
        int registrosAfectados = jdbcTemplate.update(
                "UPDATE mascota SET nombre=?, edad=?, raza=?, observaciones=? WHERE id=?",
                mascota.getNombre(),mascota.getEdad(),mascota.getRaza(),mascota.getObservaciones(),mascota.getId());
        return registrosAfectados;
    }

    @Override
    public int delete(int id) {
       int registrosAfectaods = jdbcTemplate.update("DELETE FROM mascota WHERE id=?",id);
        return registrosAfectaods;
    }

}