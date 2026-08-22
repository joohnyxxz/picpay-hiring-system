package com.app.picpay.service;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;

import com.app.picpay.model.Funcionario;

@Service
public class FuncionarioService {
    private ArrayList<Funcionario> funcionarios = new ArrayList<>();
    private AtomicInteger contadorId = new AtomicInteger(1);

    public String adicionar(Funcionario novoFuncionario) {
        novoFuncionario.setId(contadorId.getAndIncrement());

        funcionarios.add(novoFuncionario);

        return "Funcionário: " + novoFuncionario.getNome() + " cadastrado com sucesso!";
    }

    public ArrayList<Funcionario> buscar() {
        return funcionarios;
    }

    public Funcionario buscarFuncionario(int idFuncionario) {
        for (Funcionario f : funcionarios) {
            if (f.getId() == idFuncionario) {
                return f;
            }
        }
        return null;
    }

    public Funcionario atualizar(int id, Funcionario funcionarioAtualizado) {
        Funcionario funcionarioExistente = buscarFuncionario(id);

        if (funcionarioExistente == null) {
            return null;
        }

        funcionarioExistente.setNome(funcionarioAtualizado.getNome());
        funcionarioExistente.setEmail(funcionarioAtualizado.getEmail());
        funcionarioExistente.setTelefone(funcionarioAtualizado.getTelefone());
        funcionarioExistente.setCargo(funcionarioAtualizado.getCargo());
        funcionarioExistente.setDepartamento(funcionarioAtualizado.getDepartamento());
        funcionarioExistente.setSalario(funcionarioAtualizado.getSalario());
        funcionarioExistente.setCidade(funcionarioAtualizado.getCidade());
        funcionarioExistente.setStatus(funcionarioAtualizado.getStatus());

        return funcionarioExistente;
    }

    public Funcionario atualizarFuncionario(int id, Funcionario funcionarioAtualizado) {
        Funcionario funcionarioExistente = buscarFuncionario(id);

        if (funcionarioExistente == null) {
            return null;
        }

        if (funcionarioAtualizado.getNome() != null) {
            funcionarioExistente.setNome(funcionarioAtualizado.getNome());
        }

        if (funcionarioAtualizado.getEmail() != null) {
            funcionarioExistente.setEmail(funcionarioAtualizado.getEmail());
        }

        if (funcionarioAtualizado.getTelefone() != null) {
            funcionarioExistente.setTelefone(funcionarioAtualizado.getTelefone());
        }

        if (funcionarioAtualizado.getCargo() != null) {
            funcionarioExistente.setCargo(funcionarioAtualizado.getCargo());
        }

        if (funcionarioAtualizado.getDepartamento() != null) {
            funcionarioExistente.setDepartamento(funcionarioAtualizado.getDepartamento());
        }

        if (funcionarioAtualizado.getSalario() != null) {
            funcionarioExistente.setSalario(funcionarioAtualizado.getSalario());
        }

        if (funcionarioAtualizado.getCidade() != null) {
            funcionarioExistente.setCidade(funcionarioAtualizado.getCidade());
        }

        if (funcionarioAtualizado.getStatus() != null) {
            funcionarioExistente.setStatus(funcionarioAtualizado.getStatus());
        }

        return funcionarioExistente;
    }

    public String deletar(int id) {
        Funcionario funcionarioExistente = buscarFuncionario(id);

        if (funcionarioExistente == null) {
            return "Funcionário: " + id + " não existe";
        }

        funcionarios.remove(funcionarioExistente);
        return "Funcionário: " + funcionarioExistente.getNome() + " deletado com sucesso!";
    }
}
