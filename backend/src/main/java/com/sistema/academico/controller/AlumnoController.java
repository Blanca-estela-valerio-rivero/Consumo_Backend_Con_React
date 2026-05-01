package com.sistema.academico.controller;

import com.sistema.academico.entity.Alumno;
import com.sistema.academico.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alumnos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @GetMapping("/traer-alumnos")
    public List<Alumno> obtenerTodos() {
        return alumnoService.obtenerTodos();
    }

    @GetMapping("/traer-alumno/{id}")
    public ResponseEntity<Alumno> obtenerPorId(@PathVariable Long id) {
        Optional<Alumno> alumno = alumnoService.obtenerPorId(id);
        return alumno.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/insertar-alumnos")
    public ResponseEntity<Alumno> crearAlumno(@RequestBody Alumno alumno) {
        Alumno nuevoAlumno = alumnoService.guardar(alumno);
        return new ResponseEntity<>(nuevoAlumno, HttpStatus.CREATED);
    }

    @PutMapping("/editar-alumnos/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumno) {
        try {
            Alumno alumnoActualizado = alumnoService.actualizar(id, alumno);
            return ResponseEntity.ok(alumnoActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/eliminar-alumnos/{id}")
    public ResponseEntity<Void> eliminarAlumno(@PathVariable Long id) {
        try {
            alumnoService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
