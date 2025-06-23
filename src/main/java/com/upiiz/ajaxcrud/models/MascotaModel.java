package com.upiiz.ajaxcrud.models;

public class MascotaModel {
    private Long id;
    private String nombre;
    private int edad;
    private int raza;
    private String observaciones;

    public MascotaModel() {

    }

    public MascotaModel(String nombre, int edad, int raza, String observaciones) {
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.observaciones = observaciones;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public int getRaza() {
        return raza;
    }

    public void setRaza(int raza) {
        this.raza = raza;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
