// ===============================
// CONFIGURAÇÃO INICIAL
// ===============================

const paginaAtual = window.location.pathname;
const ehIndex = paginaAtual.includes("index.html") || paginaAtual === "/";

// 👉 CONTROLE DE SESSÃO (só roda uma vez)
const sessaoIniciada = sessionStorage.getItem("sessaoIniciada");

if (ehIndex && !sessaoIniciada) {
    sessionStorage.clear();
    sessionStorage.setItem("sessaoIniciada", "true");
}

// ===============================
// UTILIDADES
// ===============================

function salvar(key, valor) {
    sessionStorage.setItem(key, valor);
}

function obter(key) {
    return sessionStorage.getItem(key);
}

// ===============================
// SISTEMA DE LANÇAMENTO
// ===============================

function iniciarSistemaLancamento() {
    if (!ehIndex) return;

    const anoLancamento = 2026;
    const anoAtual = new Date().getFullYear();
    const alertaJaVisto = obter("alertaLancamento");

    if (anoAtual === anoLancamento && !alertaJaVisto) {
        alert("🚀 LANÇAMENTO! Bem-vindo ao Space Sheep!");
        salvar("alertaLancamento", "true");
    }
}

// ===============================
// VERIFICAÇÃO DE IDADE
// ===============================

function verificarIdade() {

    const idadeSalva = obter("idadeVerificada");

    // se já verificou, não pergunta de novo
    if (idadeSalva) return true;

    let idade = prompt("Digite sua idade para acessar o Space Sheep:");

    if (idade === null || idade.trim() === "" || isNaN(idade)) {
        bloquearAcesso("Acesso negado 🚫");
        return false;
    }

    if (parseInt(idade) < 16) {
        bloquearAcesso("Acesso restrito 🚫");
        return false;
    }

    salvar("idadeVerificada", "true");
    alert("Acesso liberado 🚀 Bem-vindo ao Space Sheep!");

    return true;
}

// ===============================
// BLOQUEIO
// ===============================

function bloquearAcesso(msg) {
    document.body.innerHTML = `
        <h1 style="color:white; text-align:center; margin-top:50px;">
            ${msg}
        </h1>
    `;
}

// ===============================
// NOME DO JOGADOR
// ===============================

function obterNomeJogador() {

    let nome = obter("nomeJogador");

    // se já tem nome salvo, não pergunta
    if (nome) return nome;

    nome = prompt("Digite seu nome, astronauta:");

    if (!nome || nome.trim() === "") {
        nome = "Jogador Desconhecido";
    }

    salvar("nomeJogador", nome);

    return nome;
}

// ===============================
// RESET
// ===============================

function resetarDados() {
    if (confirm("Deseja resetar tudo?")) {
        sessionStorage.clear();
        location.reload();
    }
}

// ===============================
// TEMA
// ===============================

function aplicarTemaSalvo() {
    const tema = obter("tema");
    const btn = document.querySelector(".theme-btn");

    if (tema === "light") {
        document.body.classList.add("light-mode");
        if (btn) btn.textContent = "TEMA ESCURO";
    }
}

function alternarTema() {
    const body = document.body;
    const btn = document.querySelector(".theme-btn");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        salvar("tema", "light");
        if (btn) btn.textContent = "TEMA ESCURO";
    } else {
        salvar("tema", "dark");
        if (btn) btn.textContent = "TEMA CLARO";
    }
}

// ===============================
// HUD (SOMENTE INDEX)
// ===============================

function atualizarHUD(nomeJogador) {
    if (!ehIndex) return;

    const statusJogador = "Explorando o universo";

    document.getElementById("status").innerHTML =
        `Jogador: <span class="neon">${nomeJogador}</span> | Status: ${statusJogador}`;

    document.getElementById("nome-jogo").textContent = "Jogo: Space Sheep";
    document.getElementById("pontuacao").textContent = "Faixa Etária: 16+";
    document.getElementById("nivel").textContent = "Gênero: Plataforma";
    document.getElementById("vidas").textContent = "Plataforma: PC";
}

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 Script carregado");

    aplicarTemaSalvo();

    const acessoPermitido = verificarIdade();
    if (!acessoPermitido) return;

    const nomeJogador = obterNomeJogador();
    atualizarHUD(nomeJogador);

    iniciarSistemaLancamento();

});