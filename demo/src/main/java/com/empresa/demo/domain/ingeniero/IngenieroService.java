package com.empresa.demo.domain.ingeniero;


import com.empresa.demo.domain.contrato.ContratoRepository;
import com.empresa.demo.exception.RequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngenieroService {

    @Autowired
    private  IngenieroRepository ingenieroRepository;

    @Autowired
    private ContratoRepository contratoRepository;

    public  Optional<List<Ingeniero>> getAllIngeniero(){
        return  Optional.of(ingenieroRepository.findAll());
    }


    public  Ingeniero createIngeniero(Ingeniero ingeniero){

        return  ingenieroRepository.save(ingeniero);
    }


    public  Ingeniero getIngeniero(Long id){
        Optional<Ingeniero> ingenieroOpt=ingenieroRepository.findById(id);

        if(ingenieroOpt.isEmpty()){
            throw  new RequestException("ingeniero with "+ id +" no found", HttpStatus.BAD_REQUEST);
        }

        return  ingenieroOpt.get();
    }


    
    public ResponseEntity<Void> updateIngeniero(Ingeniero ingeniero,Long id){
        var  ingenieroOpt=getIngeniero(id);

         ingenieroOpt.setContratos(ingeniero.getContratos());
         ingenieroOpt.setNamIng(ingeniero.getNamIng());
         ingenieroOpt.setCarIng(ingeniero.getCarIng());
         ingenieroOpt.setEspIng(ingeniero.getEspIng());

         return  ResponseEntity.status(HttpStatusCode.valueOf(204)).build();

    }
    public   ResponseEntity<Void> deleteIngeniero(Long id){
        if(!ingenieroRepository.existsById(id)){
            throw  new RequestException(" Ingeniero doesn't exist  with " + id + "id",HttpStatus.BAD_REQUEST);
        }

        contratoRepository.deleteByIngenieroId(id);

        ingenieroRepository.deleteById(id);

        return ResponseEntity.status(HttpStatusCode.valueOf(204)).build();

    }





}
