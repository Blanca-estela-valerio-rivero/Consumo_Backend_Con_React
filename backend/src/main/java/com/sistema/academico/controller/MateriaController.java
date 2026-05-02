package com.sistema.academico.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sistema.academico.entity.Materia;
import com.sistema.academico.service.MateriaService;

@RestController
@RequestMapping("/materias")
@CrossOrigin(origins = "*")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    @GetMapping("/materias")
    public List<Materia> traerMaterias() {
        return materiaService.obtenerTodos();
    }

    @GetMapping("/traer-materia/{id}")
    public ResponseEntity<Materia> traerUnaMateria(@PathVariable Long id) {
        Optional<Materia> materia = materiaService.obtenerPorId(id);
        return materia.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/por-semestre/{semestreId}")
    public List<Materia> traerMateriasPorSemestre(@PathVariable Long semestreId) {
        return materiaService.obtenerPorSemestre(semestreId);
    }

    @PostMapping("/insertar-materia")
    public Materia insertarMateria(@RequestBody Materia materia) {
        return materiaService.guardarMateria(materia);
    }

    @PutMapping("/editar-materia/{id}")
    public ResponseEntity<Materia> actualizarMateria(@PathVariable Long id, @RequestBody Materia materia) {
        Optional<Materia> actualizado = materiaService.actualizarMateria(id, materia);
        return actualizado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar-materia/{id}")
    public ResponseEntity<Void> eliminarMateria(@PathVariable Long id) {
        materiaService.eliminarMateria(id);
        return ResponseEntity.ok().build();
    }
}
