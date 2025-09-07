let jogadorAtual = 'X';
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;
let pontosX = 0;
let pontosO = 0;
let pontosEmpate = 0;
let proximoJogador = 'X'; // alterna entre X e O para começar

const celulas = document.querySelectorAll(".celula");
const mensagem = document.getElementById("mensagem");
const pontosXSpan = document.getElementById("pontos-x");
const pontosOSpan = document.getElementById("pontos-o");
const pontosEmpateSpan = document.getElementById("pontos-empate");

celulas.forEach(celula => {
    celula.addEventListener("click", () => {
        if (!jogoAtivo || celula.textContent) return;
        celula.textContent = jogadorAtual;
        celula.classList.add(jogadorAtual.toLowerCase()); // Adiciona classe x ou o
        tabuleiro[parseInt(celula.dataset.index)] = jogadorAtual;

        if (verificaVitoria()) {
            mensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
            jogoAtivo = false;
            if (jogadorAtual === "X") {
                pontosX++;
                pontosXSpan.textContent = `X: ${pontosX}`;
            } else {
                pontosO++;
                pontosOSpan.textContent = `O: ${pontosO}`;
            }
        } else if (!tabuleiro.includes("")) {
            mensagem.textContent = "Empate!";
            jogoAtivo = false;
            pontosEmpate++;
            pontosEmpateSpan.textContent = `Empate: ${pontosEmpate}`;
        } else {
            jogadorAtual = jogadorAtual === "X" ? "O" : "X";
        }
    });
});

function verificaVitoria() {
    const combinacoes = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return combinacoes.some(comb => {
        const [a, b, c] = comb;
        return tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c];
    });
}

function reiniciarJogo() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    proximoJogador = proximoJogador === "X" ? "O" : "X";
    jogadorAtual = proximoJogador;
    jogoAtivo = true;
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("x", "o"); // Remove classes ao reiniciar
    });
    mensagem.textContent = "";
}

window.addEventListener('DOMContentLoaded', function() {
    // Mostra/esconde o menu de configurações
    const btnMenu = document.getElementById('btn-menu');
    const configArea = document.getElementById('config-area');
    if (btnMenu && configArea) {
        btnMenu.addEventListener('click', function() {
            configArea.style.display = configArea.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Troca fundo e mantém após atualizar
    const selectFundo = document.getElementById('fundo');
    if (selectFundo) {
        const fundoSalvo = localStorage.getItem('fundoEscolhido');
        if (fundoSalvo) {
            document.body.classList.remove('bg-jogo', 'bg-floresta', 'bg-cidade');
            document.body.classList.add(fundoSalvo);
            selectFundo.value = fundoSalvo;
        }
        selectFundo.addEventListener('change', function() {
            document.body.classList.remove('bg-jogo', 'bg-floresta', 'bg-cidade');
            document.body.classList.add(selectFundo.value);
            localStorage.setItem('fundoEscolhido', selectFundo.value);
        });
    }

    // Troca tema com interruptor e mantém após atualizar
    const temaSwitch = document.getElementById('tema-switch');
    if (temaSwitch) {
        const temaSalvo = localStorage.getItem('temaEscolhido');
        if (temaSalvo) {
            document.body.classList.remove('theme-claro', 'theme-escuro');
            document.body.classList.add(temaSalvo);
            temaSwitch.checked = temaSalvo === 'theme-escuro';
        }
        temaSwitch.addEventListener('change', function() {
            if (temaSwitch.checked) {
                document.body.classList.remove('theme-claro');
                document.body.classList.add('theme-escuro');
                localStorage.setItem('temaEscolhido', 'theme-escuro');
            } else {
                document.body.classList.remove('theme-escuro');
                document.body.classList.add('theme-claro');
                localStorage.setItem('temaEscolhido', 'theme-claro');
            }
        });
    }

    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const texto = document.getElementById('feedback-text').value;
            alert('Obrigado pelo seu feedback!\n\n' + texto);
            feedbackForm.reset();
        });
    }
});
