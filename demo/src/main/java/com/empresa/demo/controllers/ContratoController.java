package com.empresa.demo.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.demo.domain.contrato.Contrato;
import com.empresa.demo.domain.contrato.ContratoService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/contratos")   
public class ContratoController {

    private ContratoService contratoService;
    public ContratoController(ContratoService contratoService) {
        this.contratoService = contratoService;
    }

    @PostMapping
    public Contrato createContrato( @RequestBody Contrato contrato) {
        return contratoService.createContrato(contrato);
    }
    
    @GetMapping("/{id}")
    public Contrato getContratoById(@PathVariable Long id) {
        return contratoService.getContratoById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteContrato(@PathVariable Long id) {
        contratoService.deleteContrato(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public void updateContrato(@PathVariable Long id, @RequestBody Contrato contrato) {
        contratoService.updateContrato(id, contrato);
    }
}
