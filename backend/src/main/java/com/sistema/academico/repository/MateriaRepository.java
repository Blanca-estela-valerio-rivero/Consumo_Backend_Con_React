package com.sistema.academico.repository;

import com.sistema.academico.entity.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {
    List<Materia> findBySemestre(Long semestre);
}
