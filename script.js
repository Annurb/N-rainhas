let paragrafo = document.getElementById("paragrafo")

//tabuleiro
const N = 4; // tamanho
const tabuleiroDOM = document.querySelector("#tabuleiro");

// matriz do tabuleiro 
let mat;

// pilha para simular a recursao
let stack;

let terminou = false;

//criar tabueiro
function criarTabuleiro() {
    tabuleiroDOM.innerHTML = ""; // limpa
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let quadrado = document.createElement('div');
            quadrado.setAttribute("id", `i${i}j${j}`);
            quadrado.classList.add("quadrado");

            if ((i + j) % 2 === 0) {
                quadrado.style.backgroundColor = 'white';
            } else {
                quadrado.style.backgroundColor = 'black';
            }

            tabuleiroDOM.appendChild(quadrado);
        }
    }
}

//reiniciar
function init() {
    mat = Array.from({ length: N }, () => Array(N).fill(0));
    stack = [{ row: 0, col: -1 }]; // primeira linha, sem coluna
    terminou = false;

    criarTabuleiro();
}

//a posição é sgura?
function isSafe(row, col) {
    // coluna 
    for (let i = 0; i < row; i++) {
        if (mat[i][col] === 1) return false;
    }

    //diagonal esquerda
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (mat[i][j] === 1) return false;
    }

    //diagonal direita
    for (let i = row - 1, j = col + 1; i >= 0 && j < N; i--, j++) {
        if (mat[i][j] === 1) return false;
    }

    return true;
}

//colocar rainha
function colocarRainha(row, col) {
    const alvo = document.getElementById(`i${row}j${col}`);
    const img = document.createElement("img");
    img.src = "queen.png";
    img.width = 50;
    img.classList.add("rainha");
    alvo.appendChild(img);
}

//retirar rainha
function removerRainha(row, col) {
    const alvo = document.getElementById(`i${row}j${col}`);
    const img = alvo.querySelector("img");
    if (img) img.remove();
}

//passo a passo do backtracking
function passo() {
    if (terminou) {
        console.log("Solução completa! Reinicie para tentar de novo.");
        return;
    }

    //estado atual
    let topo = stack[stack.length - 1];
    let row = topo.row;

    //se finalizou as linhas
    if (row === N) {
        paragrafo.textContent = " Solução encontrada!"
        botao.textContent = "Finalizado"
        terminou = true;
        return;
    }

    //proxima coluna
    topo.col++;

    //ultrapassou o limite:backtrack
    if (topo.col >= N) {
        paragrafo.textContent = `Backtracking da linha ${row}`

        stack.pop(); //soma uma linha
        if (stack.length === 0) {
            terminou = true;
            return;
        }

        //remove rainha da linha anterior
        let anterior = stack[stack.length - 1];
        removerRainha(anterior.row, anterior.col);
        mat[anterior.row][anterior.col] = 0;

        return;
    }

    //verifica se e seguro
    if (isSafe(row, topo.col)) {
        paragrafo.textContent = `Tentando posição segura (${row+1}, ${topo.col+1})`

        //coloca rainha
        mat[row][topo.col] = 1;
        colocarRainha(row, topo.col);

        //proxima linha
        stack.push({ row: row + 1, col: -1 });
    } else {
        paragrafo.textContent = `Posição (${row+1}, ${topo.col+1}) NÃO é segura.`

    }
}

//botao
document.getElementById("botao").onclick = passo;

//inicia
init();
