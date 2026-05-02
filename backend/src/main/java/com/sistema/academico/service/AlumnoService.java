package com.sistema.academico.service;

import com.sistema.academico.entity.Alumno;
import com.sistema.academico.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository alumnoRepository;

    public List<Alumno> obtenerTodos() {
        return alumnoRepository.findAll();
    }

    public Optional<Alumno> obtenerPorId(Long id) {
        return alumnoRepository.findById(id);
    }

    public Alumno guardar(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public Alumno actualizar(Long id, Alumno alumnoActualizado) {
        return alumnoRepository.findById(id)
                .map(alumno -> {
                    alumno.setNombre(alumnoActualizado.getNombre());
                    alumno.setApellidoPaterno(alumnoActualizado.getApellidoPaterno());
                    alumno.setApellidoMaterno(alumnoActualizado.getApellidoMaterno());
                    alumno.setMatricula(alumnoActualizado.getMatricula());
                    alumno.setTelefono(alumnoActualizado.getTelefono());
                    alumno.setCorreo(alumnoActualizado.getCorreo());
                    alumno.setCarrera(alumnoActualizado.getCarrera());
                    alumno.setSemestre(alumnoActualizado.getSemestre());
                    alumno.setImagenURL(alumnoActualizado.getImagenURL());
                    return alumnoRepository.save(alumno);
                }).orElseThrow(() -> new RuntimeException("Alumno no encontrado con id " + id));
    }

    public void eliminar(Long id) {
        alumnoRepository.deleteById(id);
    }
}
