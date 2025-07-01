package com.empresa.demo.domain.contrato;

import com.empresa.demo.domain.ingeniero.Ingeniero;
import com.empresa.demo.domain.proyecto.Proyecto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//import java.util.List;

@Entity(name = "Contrato")
@Table(name = "contrato")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCon;

    @ManyToOne
    private Ingeniero ingenieros;

    @ManyToOne
    private Proyecto proyectos;

    private  boolean status;

}
