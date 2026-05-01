package com.sistema.academico.service;

import com.sistema.academico.entity.Semestre;
import com.sistema.academico.repository.SemestreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SemestreService {

    @Autowired
    private SemestreRepository semestreRepository;

    public List<Semestre> obtenerTodos() {
        return semestreRepository.findAll();
    }

    public Optional<Semestre> obtenerPorId(Long id) {
        return semestreRepository.findById(id);
    }

    public Semestre guardarSemestre(Semestre semestre) {
        return semestreRepository.save(semestre);
    }

    public Optional<Semestre> actualizarSemestre(Long id, Semestre semestreActualizado) {
        return semestreRepository.findById(id)
                .map(semestre -> {
                    semestre.setNombre(semestreActualizado.getNombre());
                    semestre.setEstado(semestreActualizado.getEstado());
                    return semestreRepository.save(semestre);
                });
    }

    public void eliminarSemestre(Long id) {
        semestreRepository.deleteById(id);
    }
}
