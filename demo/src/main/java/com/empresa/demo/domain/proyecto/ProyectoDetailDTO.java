package com.empresa.demo.domain.proyecto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ProyectoDetailDTO {
    private Long idProy;
    private String nomProy;
    private LocalDate iniFechProy;
    private LocalDate terFechProy;
    private String nomDep;


}
