package com.sistema.academico.service;

import com.sistema.academico.entity.Materia;
import com.sistema.academico.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository materiaRepository;

    public List<Materia> obtenerTodos() {
        return materiaRepository.findAll();
    }

    public Optional<Materia> obtenerPorId(Long id) {
        return materiaRepository.findById(id);
    }

    public List<Materia> obtenerPorSemestre(Long semestreId) {
        return materiaRepository.findBySemestre(semestreId);
    }

    public Materia guardarMateria(Materia materia) {
        return materiaRepository.save(materia);
    }

    public Optional<Materia> actualizarMateria(Long id, Materia materiaActualizada) {
        return materiaRepository.findById(id)
                .map(materia -> {
                    materia.setCodigo(materiaActualizada.getCodigo());
                    materia.setNombre(materiaActualizada.getNombre());
                    materia.setCarrera(materiaActualizada.getCarrera());
                    materia.setProfesor(materiaActualizada.getProfesor());
                    materia.setCreditos(materiaActualizada.getCreditos());
                    materia.setHorario(materiaActualizada.getHorario());
                    materia.setSemestre(materiaActualizada.getSemestre());
                    return materiaRepository.save(materia);
                });
    }

    public void eliminarMateria(Long id) {
        materiaRepository.deleteById(id);
    }
}
