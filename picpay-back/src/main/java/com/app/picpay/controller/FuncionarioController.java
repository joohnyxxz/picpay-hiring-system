package com.app.picpay.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.picpay.model.Funcionario;
import com.app.picpay.service.FuncionarioService;

import jakarta.validation.Valid;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {
    
    @Autowired
    private FuncionarioService service;

    @PostMapping
    public ResponseEntity<String> adicionar(@Valid @RequestBody Funcionario funcionario) {
        String mensagem = service.adicionar(funcionario);

        return ResponseEntity.status(201).body(mensagem);
    }

    @GetMapping
    public ResponseEntity<ArrayList<Funcionario>> buscar() {
        return ResponseEntity.ok(service.buscar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarFuncionario(@PathVariable Integer id) {
        Funcionario funcionario = service.buscarFuncionario(id);

        if (funcionario == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(funcionario);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> atualizar(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
        Funcionario atualizado = service.atualizar(id, funcionario);

        if (atualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(atualizado);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Funcionario> atualizarFuncionario(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
        Funcionario atualizado = service.atualizarFuncionario(id, funcionario);

        if (atualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable Integer id) {
        String mensagem = service.deletar(id);

        if (mensagem.contains("não encontrado")) {
            return ResponseEntity.status(404).body(mensagem);
        }

        return ResponseEntity.ok(mensagem);
    }
}
