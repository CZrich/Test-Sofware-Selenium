package com.empresa.demo.domain.ingeniero;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.empresa.demo.domain.contrato.Contrato;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "Ingeniero")
@Table(name = "ingeniero")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Ingeniero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long idIng;
    private  String namIng;
    private  String carIng;
    private  String espIng;
    @OneToMany(mappedBy = "ingenieros",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Contrato> contratos;

}
