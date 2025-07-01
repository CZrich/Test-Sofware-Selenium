package com.empresa.demo.domain.proyecto;


import com.empresa.demo.domain.contrato.Contrato;
import com.empresa.demo.domain.contrato.ContratoRepository;
import com.empresa.demo.domain.departamento.Departamento;
import com.empresa.demo.domain.departamento.DepartementoRepository;
import com.empresa.demo.domain.ingeniero.Ingeniero;
import com.empresa.demo.domain.ingeniero.IngenieroRepository;
import com.empresa.demo.exception.RequestException;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProyectoService {

    @Autowired
    private  ProyectoRepository proyectoRepository;
    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private DepartementoRepository departamentoRepository;

    @Autowired
    private IngenieroRepository ingenieroRepository;

  public Proyecto createProyecto(ProyectoDTO proyectotDto) {
       Departamento departamento = departamentoRepository.findById(proyectotDto.getIdDep())
        .orElseThrow(() -> new RequestException("Departamento no encontrado", HttpStatus.BAD_REQUEST));

    Proyecto proyecto = new Proyecto();
    proyecto.setNomProy(proyectotDto.getNomProy());
    proyecto.setIniFechProy(proyectotDto.getIniFechProy());
    proyecto.setTerFechProy(proyectotDto.getTerFechProy());
    proyecto.setDepartamento(departamento);
    
    Proyecto savedProyecto = proyectoRepository.save(proyecto);

    for (Long idIng : proyectotDto.getIngenieroIds()) {
        Ingeniero ing = ingenieroRepository.findById(idIng)
            .orElseThrow(() -> new RequestException("Ingeniero no encontrado", HttpStatus.BAD_REQUEST));
        
        Contrato contrato = new Contrato();
        contrato.setIngenieros(ing);
        contrato.setProyectos(savedProyecto);
        contrato.setStatus(true);
        
        contratoRepository.save(contrato);
    }

    return savedProyecto;
}

    public List<Proyecto> getAllProyectos() {
        return proyectoRepository.findAll();
    }
    
    public List<Ingeniero> getIngenierosByProyecto(Long id) {
      Optional<List<Ingeniero>> ingenierosOpt = contratoRepository.getListIngenieroInProyecto(id);
        if (ingenierosOpt.isPresent()) {
            return ingenierosOpt.get();
        } else {
            throw new RequestException("Ingenieros not found for the given project ID", HttpStatus.NOT_FOUND);
        }
      
    }
    public ResponseEntity<Void> updateProyecto(ProyectoDTO proyectoDto, Long id){

       Proyecto proyecto = proyectoRepository.findById(id)
        .orElseThrow(() -> new RequestException("Proyecto no encontrado", HttpStatus.NOT_FOUND));

    Departamento departamento = departamentoRepository.findById(proyectoDto.getIdDep())
        .orElseThrow(() -> new RequestException("Departamento no encontrado", HttpStatus.BAD_REQUEST));

    // Actualizar datos del proyecto
    proyecto.setNomProy(proyectoDto.getNomProy());
    proyecto.setIniFechProy(proyectoDto.getIniFechProy());
    proyecto.setTerFechProy(proyectoDto.getTerFechProy());
    proyecto.setDepartamento(departamento);
    
    Proyecto savedProyecto = proyectoRepository.save(proyecto);

    // Eliminar contratos anteriores
    contratoRepository.deleteByProyectoId(savedProyecto.getIdProy());

    // Crear nuevos contratos
    for (Long idIng : proyectoDto.getIngenieroIds()) {
        Ingeniero ing = ingenieroRepository.findById(idIng)
            .orElseThrow(() -> new RequestException("Ingeniero no encontrado", HttpStatus.BAD_REQUEST));
        
        Contrato contrato = new Contrato();
        contrato.setIngenieros(ing);
        contrato.setProyectos(savedProyecto);
        contrato.setStatus(true);
        
        contratoRepository.save(contrato);
    }

    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    public  ProyectoDetailDTO getProyecto(Long id){
        Optional<Proyecto> proyectoOpt = proyectoRepository.findById(id);
        
        if(proyectoOpt.isEmpty()){
            throw  new RequestException("project no found", HttpStatus.BAD_REQUEST);
        }
        ProyectoDetailDTO  proyectoDetailDTO = new ProyectoDetailDTO();
         proyectoDetailDTO.setIdProy(proyectoOpt.get().getIdProy());
        proyectoDetailDTO.setNomProy(proyectoOpt.get().getNomProy());
        proyectoDetailDTO.setIniFechProy(proyectoOpt.get().getIniFechProy());
        proyectoDetailDTO.setTerFechProy(proyectoOpt.get().getTerFechProy());
        proyectoDetailDTO.setNomDep(proyectoOpt.get().getDepartamento().getNomDep());
        return  proyectoDetailDTO;
    }

    @Transactional
    public ResponseEntity<Void> deleteProyecto(Long id) {
        if (!proyectoRepository.existsById(id)) {
            throw new RequestException("Proyecto no encontrado con ID: " + id, HttpStatus.NOT_FOUND);
        }
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new RequestException("Proyecto no encontrado", HttpStatus.NOT_FOUND));
        contratoRepository.deleteByProyectoId(proyecto.getIdProy());
        proyectoRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
