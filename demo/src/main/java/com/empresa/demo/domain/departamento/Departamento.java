package com.empresa.demo.domain.departamento;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.empresa.demo.domain.proyecto.Proyecto;

@Entity(name = "Departamento")
@Table(name = "departamento")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDep;
    private  String nomDep;
    private String  telDep;
    private  String faxDep;

    @OneToMany(mappedBy = "departamento",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Proyecto> proyectos;
}
