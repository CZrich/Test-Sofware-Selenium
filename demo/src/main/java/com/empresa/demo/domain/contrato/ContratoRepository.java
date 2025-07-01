package com.empresa.demo.domain.contrato;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.empresa.demo.domain.ingeniero.Ingeniero;

@Repository
public interface ContratoRepository  extends JpaRepository<Contrato, Long> {


    @Query("SELECT c.ingenieros FROM Contrato c WHERE c.proyectos.idProy = :idProy")
    Optional<List<Ingeniero>> getListIngenieroInProyecto( @Param("idProy")Long idProy);
    
    @Modifying
    @Query("Delete FROM Contrato c WHERE c.proyectos.idProy = :idProy")
    void deleteByProyectoId(@Param("idProy") Long idProy);

    @Modifying
    @Query("Delete FROM Contrato c WHERE c.ingenieros.idIng = :idIng")
    void deleteByIngenieroId(@Param("idIng") Long idIng);
   

}
