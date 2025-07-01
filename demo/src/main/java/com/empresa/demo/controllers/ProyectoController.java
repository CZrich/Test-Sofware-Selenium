package com.empresa.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.demo.domain.proyecto.Proyecto;
import com.empresa.demo.domain.proyecto.ProyectoDTO;
import com.empresa.demo.domain.proyecto.ProyectoDetailDTO;
import com.empresa.demo.domain.proyecto.ProyectoService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/proyectos")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    


    @GetMapping
    public List<Proyecto> getAllProyectos() {
        return proyectoService.getAllProyectos();
    }

    @PostMapping
    public  Proyecto createProyecto(@RequestBody  ProyectoDTO proyecto) {
        return proyectoService.createProyecto(proyecto);
    }

    @GetMapping("/{id}/ingenieros")
    public ResponseEntity<?> getIngenierosByProyecto(@PathVariable Long id) {
        return ResponseEntity.ok(proyectoService.getIngenierosByProyecto(id));
    }

    @GetMapping("/{id}")
    public ProyectoDetailDTO getProyecto(@PathVariable Long id) {
        return proyectoService.getProyecto(id);
    }

    @PutMapping("/{id}")
    @Transactional
     public ResponseEntity<Void> updateProyecto(@RequestBody ProyectoDTO proyecto,@PathVariable Long id) {
        return proyectoService.updateProyecto(proyecto, id);
     }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteProyecto(@PathVariable Long id) {
        return proyectoService.deleteProyecto(id);
    }

}
