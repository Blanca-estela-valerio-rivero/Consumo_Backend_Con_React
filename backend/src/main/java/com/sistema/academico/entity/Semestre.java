package com.sistema.academico.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "semestres")
public class Semestre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_semestre;

    private String nombre;
    private String estado;

    public Semestre() {
    }

    public Long getId_semestre() {
        return id_semestre;
    }

    public void setId_semestre(Long id_semestre) {
        this.id_semestre = id_semestre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
