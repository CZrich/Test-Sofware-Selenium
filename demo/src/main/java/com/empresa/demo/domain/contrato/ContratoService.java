package com.empresa.demo.domain.contrato;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.empresa.demo.domain.ingeniero.IngenieroRepository;
import com.empresa.demo.domain.proyecto.ProyectoRepository;
import com.empresa.demo.exception.RequestException;

@Service
public class ContratoService {
    @Autowired
    private ContratoRepository contratoRepository;
    @Autowired
    private    IngenieroRepository ingenieroRepository;
    @Autowired
    private   ProyectoRepository proyectoRepository;



  
    public Contrato createContrato(Contrato contrato) {

        if (contrato == null) {
            throw new RequestException("Contrato cannot be null", HttpStatus.BAD_REQUEST);
        }
        if (!ingenieroRepository.existsById(contrato.getIngenieros().getIdIng())  ) {
            throw new RequestException("Ingenieros cannot be null or empty", HttpStatus.BAD_REQUEST);
        }
        if (!proyectoRepository.existsById(contrato.getProyectos().getIdProy()))  {
            throw new RequestException("Proyectos cannot be null or empty", HttpStatus.BAD_REQUEST);
        }
        return contratoRepository.save(contrato);
    }
    public Contrato getContratoById(Long id) {
         Optional<Contrato>contratoOpt = contratoRepository.findById(id);
        if (contratoOpt.isEmpty()) {
            throw new RequestException("contrato no found",HttpStatus.BAD_REQUEST); 
        
        }

        return  contratoOpt.get();
    }

    

    public void deleteContrato(Long id) {
        if (!contratoRepository.existsById(id)) {
            throw new RequestException("Contrato not found", HttpStatus.NOT_FOUND);
        }
        contratoRepository.deleteById(id);
    }
    public ResponseEntity<Void> updateContrato(Long id, Contrato contrato) {
        var existingContrato = contratoRepository.findById(id);
        if (existingContrato.isEmpty()) {
            throw new RequestException("Contrato not found", HttpStatus.NOT_FOUND);}
         var contratoOpt = existingContrato.get();
        contratoOpt.setIngenieros(contrato.getIngenieros());
        contratoOpt.setProyectos(contrato.getProyectos());
        contratoOpt.setStatus(contrato.isStatus());
        
        return ResponseEntity.ok().build();
    }
    
    public List<Contrato> getAllContratos() {
        return contratoRepository.findAll();
    }
    public boolean existsById(Long id) {
        return contratoRepository.existsById(id);
    }

}
