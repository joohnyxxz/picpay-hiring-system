package com.app.picpay.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Funcionario {
    private int id;
    private String nome;
    private String email;
    private String telefone;
    private String departamento;
    private double salario;
    private String cidade;
    private StatusFuncionario status;
}