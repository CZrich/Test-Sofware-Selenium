package com.empresa.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.demo.domain.departamento.Departamento;
import com.empresa.demo.domain.departamento.DepartamentoService;
import com.empresa.demo.exception.RequestException;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/departamentos")
public class DepartamentoController {


    private DepartamentoService departamentoService;
    
    DepartamentoController(DepartamentoService departamentoService) {
        this.departamentoService = departamentoService;
    }



    @GetMapping
    public List<Departamento> getAllDepartamentos() {
        return  departamentoService.getAllDepartamentos();
    }

    @GetMapping("/{id}")
    public Departamento getDepartamento(@PathVariable  Long id) {
        Departamento departamento = departamentoService.getDepartamento(id);
        if (departamento == null) {
            throw new RequestException("no found departemento with ",HttpStatus.BAD_REQUEST);
        }
        return departamento;
    }
    @PostMapping
    public Departamento createDepartamento(@RequestBody  Departamento departamento) {
        return departamentoService.creatDepartamento(departamento);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> updateDepartamento(@PathVariable Long id,@RequestBody Departamento departamento) {
       
         departamentoService.updateDepartamento(id, departamento);
         return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity< Void > deleteDepartamento( @PathVariable Long id) {
       
        departamentoService.deleteDeparatamento(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }



}
