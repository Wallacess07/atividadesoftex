

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
        const index = celula.getAttribute("data-index");

        if (tabuleiro[index] === "" && jogoAtivo) {
            tabuleiro[index] = jogadorAtual;
            celula.textContent = jogadorAtual;

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
    // alterna o jogador inicial
    proximoJogador = proximoJogador === "X" ? "O" : "X";
    jogadorAtual = proximoJogador;
    jogoAtivo = true;
    celulas.forEach(celula => celula.textContent = "");
    mensagem.textContent = "";
}
