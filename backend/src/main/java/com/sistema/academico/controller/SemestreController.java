package com.sistema.academico.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sistema.academico.entity.Semestre;
import com.sistema.academico.service.SemestreService;

@RestController
@RequestMapping("/semestres")
@CrossOrigin(origins = "http://localhost:5173")
public class SemestreController {

    @Autowired
    private SemestreService semestreService;

    @GetMapping("/traer-semestres")
    public List<Semestre> traerSemestres() {
        return semestreService.obtenerTodos();
    }

    @GetMapping("/traer-semestre/{id}")
    public ResponseEntity<Semestre> traerUnSemestre(@PathVariable Long id) {
        Optional<Semestre> semestre = semestreService.obtenerPorId(id);
        return semestre.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/insertar-semestre")
    public Semestre insertarSemestre(@RequestBody Semestre semestre) {
        return semestreService.guardarSemestre(semestre);
    }

    @PutMapping("/editar-semestre/{id}")
    public ResponseEntity<Semestre> actualizarSemestre(@PathVariable Long id, @RequestBody Semestre semestre) {
        Optional<Semestre> actualizado = semestreService.actualizarSemestre(id, semestre);
        return actualizado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar-semestre/{id}")
    public ResponseEntity<Void> eliminarSemestre(@PathVariable Long id) {
        semestreService.eliminarSemestre(id);
        return ResponseEntity.ok().build();
    }
}
