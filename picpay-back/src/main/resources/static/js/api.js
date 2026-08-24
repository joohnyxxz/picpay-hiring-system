// ====== CONFIGURAÇÕES DA API ======
const API_URL = 'http://localhost:8080/funcionarios'; 

// ====== VARIÁVEIS GLOBAIS ======
let idDelecaoAtual = null; 

// ====== FUNÇÕES DE INICIALIZAÇÃO ======
document.addEventListener('DOMContentLoaded', () => {
    carregarFuncionarios();
    configurarFormularios();
    configurarBusca();
});

// ====== COMUNICAÇÃO COM O BACK-END (GET) ======
async function carregarFuncionarios() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const funcionarios = await response.json();
        
        atualizarCards(funcionarios);
        renderizarTabela(funcionarios);
    } catch (error) {
        mostrarFeedback('Erro ao carregar a lista de funcionários do servidor.', false);
        console.error(error);
    }
}

// ====== ATUALIZAR CARDS NO DASHBOARD ======
function atualizarCards(funcionarios) {
    let total = funcionarios.length;
    let emAnalise = 0, aprovados = 0, reprovados = 0, contratados = 0;

    funcionarios.forEach(f => {
        switch(f.status) {
            case 'EM_ANALISE': emAnalise++; break;
            case 'APROVADO': aprovados++; break;
            case 'REPROVADO': reprovados++; break;
            case 'PICPAY_LOVERS': contratados++; break;
        }
    });

    document.getElementById('count-total').textContent = total;
    document.getElementById('count-analise').textContent = emAnalise;
    document.getElementById('count-aprovados').textContent = aprovados;
    document.getElementById('count-reprovados').textContent = reprovados;
    document.getElementById('count-contratados').textContent = contratados;
}

// ====== RENDERIZAR TABELA E AÇÕES ======
function renderizarTabela(funcionarios) {
    const tbody = document.getElementById('tabela-funcionarios');
    tbody.innerHTML = ''; 

    funcionarios.forEach(f => {
        let statusFormatado = f.status.replace('_', ' ').toLowerCase();
        statusFormatado = statusFormatado.charAt(0).toUpperCase() + statusFormatado.slice(1);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${f.id}</td>
            <td>${f.nome}</td>
            <td>${f.cargo}</td>
            <td>${f.departamento || '-'}</td>
            <td>${statusFormatado}</td>
            <td style="display: flex; gap: 10px;">
                <button class="btn-secondary" style="padding: 6px 12px; font-size: 12px; flex: initial;" onclick='abrirModalEdicao(${JSON.stringify(f)})'>Editar</button>
                <button class="btn-danger" style="padding: 6px 12px; font-size: 12px; flex: initial;" onclick="abrirModalDeletar(${f.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ====== CONFIGURAÇÃO DOS FORMULÁRIOS (POST / PUT) ======
function configurarFormularios() {
    // FORMULÁRIO DE CADASTRO
    document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
        e.preventDefault();
        const novoFuncionario = {
            nome: document.getElementById('cad-nome').value,
            email: document.getElementById('cad-email').value,
            telefone: document.getElementById('cad-telefone').value,
            cargo: document.getElementById('cad-cargo').value,
            departamento: document.getElementById('cad-departamento').value,
            cidade: document.getElementById('cad-cidade').value,
            salario: parseFloat(document.getElementById('cad-salario').value) || null,
            status: document.getElementById('cad-status').value 
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoFuncionario)
            });
            if (!res.ok) throw new Error('Erro ao cadastrar');
            closeModals();
            mostrarFeedback('Candidato cadastrado com sucesso!', true);
            carregarFuncionarios();
            document.getElementById('form-cadastro').reset();
        } catch (error) {
            mostrarFeedback('Ops! Ocorreu um erro interno ao cadastrar.', false);
        }
    });

    // FORMULÁRIO DE EDIÇÃO
    document.getElementById('form-edicao').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const funcionarioAtualizado = {
            nome: document.getElementById('edit-nome').value,
            email: document.getElementById('edit-email').value,
            telefone: document.getElementById('edit-telefone').value,
            cargo: document.getElementById('edit-cargo').value,
            departamento: document.getElementById('edit-departamento').value,
            cidade: document.getElementById('edit-cidade').value,
            salario: parseFloat(document.getElementById('edit-salario').value) || null,
            status: document.getElementById('edit-status').value
        };

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(funcionarioAtualizado)
            });
            if (!res.ok) throw new Error('Erro ao editar');
            closeModals();
            mostrarFeedback('Funcionário editado com sucesso!', true);
            carregarFuncionarios();
        } catch (error) {
            mostrarFeedback('Ops! Ocorreu um erro interno ao editar.', false);
        }
    });

    // BOTÃO CONFIRMAR DELEÇÃO
    document.getElementById('btn-confirmar-deletar').addEventListener('click', async () => {
        if (!idDelecaoAtual) return;
        try {
            const res = await fetch(`${API_URL}/${idDelecaoAtual}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Erro ao deletar');
            closeModals();
            mostrarFeedback('Funcionário excluído com sucesso!', true);
            carregarFuncionarios();
        } catch (error) {
            mostrarFeedback('Ops! Ocorreu um erro interno ao excluir.', false);
        }
    });
}

// ====== FUNÇÃO DE BUSCA LOCAL ======
function configurarBusca() {
    const inputPesquisa = document.getElementById('input-pesquisa');
    inputPesquisa.addEventListener('input', () => {
        const termo = inputPesquisa.value.toLowerCase();
        const linhas = document.querySelectorAll('#tabela-funcionarios tr');
        
        linhas.forEach(linha => {
            const nome = linha.children[1].textContent.toLowerCase();
            const cargo = linha.children[2].textContent.toLowerCase();
            if (nome.includes(termo) || cargo.includes(termo)) {
                linha.style.display = '';
            } else {
                linha.style.display = 'none';
            }
        });
    });
}

// ====== CONTROLE DE MODAIS ======
const overlay = document.getElementById('modal-overlay');

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    overlay.classList.add('hidden');
    idDelecaoAtual = null;
}

function abrirModalCadastro() {
    closeModals();
    document.getElementById('modal-cadastro').classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function abrirModalEdicao(funcionario) {
    closeModals();
    // Preenche os campos
    document.getElementById('edit-id').value = funcionario.id;
    document.getElementById('edit-nome').value = funcionario.nome;
    document.getElementById('edit-email').value = funcionario.email;
    document.getElementById('edit-telefone').value = funcionario.telefone || '';
    document.getElementById('edit-cargo').value = funcionario.cargo;
    document.getElementById('edit-departamento').value = funcionario.departamento || '';
    document.getElementById('edit-cidade').value = funcionario.cidade || '';
    document.getElementById('edit-salario').value = funcionario.salario || '';
    document.getElementById('edit-status').value = funcionario.status;
    
    document.getElementById('modal-edicao').classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function abrirModalDeletar(id) {
    closeModals();
    idDelecaoAtual = Number(id); 
    document.getElementById('modal-deletar').classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function mostrarFeedback(mensagem, isSucesso) {
    closeModals(); 
    
    const iconContainer = document.getElementById('feedback-icon');
    const msgElement = document.getElementById('feedback-message');
    const modalFeedback = document.getElementById('modal-feedback');

    msgElement.textContent = mensagem;

    if (isSucesso) {
        iconContainer.innerHTML = '✔';
        iconContainer.className = 'icon-container icon-success';
    } else {
        iconContainer.innerHTML = '!';
        iconContainer.className = 'icon-container icon-error';
    }

    modalFeedback.classList.remove('hidden');
    overlay.classList.remove('hidden');
}