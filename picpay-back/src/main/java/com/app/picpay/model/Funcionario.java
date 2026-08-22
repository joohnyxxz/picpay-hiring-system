package com.app.picpay.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Funcionario {
    private Integer id;
    @NotBlank(message = "O nome é obrigatório")
    private String nome;
    @NotBlank(message = "O e-mail é obrigatório")
    private String email;
    private String telefone;
    @NotBlank(message = "O cargo é obrigatório")
    private String cargo;
    private String departamento;
    private Double salario;
    private String cidade;
    private StatusFuncionario status;
}