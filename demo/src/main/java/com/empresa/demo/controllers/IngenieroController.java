package com.empresa.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.demo.domain.ingeniero.Ingeniero;
import com.empresa.demo.domain.ingeniero.IngenieroService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping ("/ingenieros")
public class IngenieroController {



    private IngenieroService ingenieroService;

    // Constructor injection for IngenieroService

    public IngenieroController(IngenieroService ingenieroService) {
        this.ingenieroService = ingenieroService;
    }
    
    @GetMapping
    public List<Ingeniero> getAllIngenieros() {
        return ingenieroService.getAllIngeniero().get();
    }

    @PostMapping
    public  Ingeniero createIngeniero(@RequestBody Ingeniero ingeniero) {
        return ingenieroService.createIngeniero(ingeniero);
    }

    @GetMapping("/{id}")
    public Ingeniero getIngeniero(@PathVariable   Long id) {
        return ingenieroService.getIngeniero(id);
    }

    @PutMapping("/{id}")   
    @Transactional
    public ResponseEntity<Void> updateIngeniero(@RequestBody Ingeniero ingeniero,@PathVariable Long id) {
        ingenieroService.updateIngeniero(ingeniero, id);
    
        return ResponseEntity.status(204).build();  
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void deleteIngeniero(@PathVariable Long id) {
        ingenieroService.deleteIngeniero(id);
    }

}
