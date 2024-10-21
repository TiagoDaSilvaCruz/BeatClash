function iniciar() {
  const infor = document.querySelector('.infor');
  infor.style.display = 'none';

  document.querySelector("audio").play();
  carregarArquivo();
}

// Seleciona as pistas
const pistas = document.querySelectorAll('.pista');

// Inicializa o contador de erros
let erros = 0;
const maxErros = 20;

// Função para carregar o arquivo
function carregarArquivo() {
  fetch('dados.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo: ' + response.statusText);
      }
      return response.text();
    })
    .then(conteudo => {
      const linhas = conteudo.trim().split('\n');
      linhas.forEach(linha => {
        // Ajuste da expressão regular para corresponder corretamente
        const match = linha.match(/Pista:\s*(\d+),\s*Tempo:\s*(\d+(?:\.\d+)?)s,\s*Tipo:\s*(\d+)/);
        if (match) {
          const pista = match[1] - 1; // -1 para ajustar ao índice
          const tempo = parseFloat(match[2]) * 1000 - 1000; // Converte para milissegundos
          const tipo = match[3];
          console.log(tempo);
          setTimeout(() => criarHexagonoPelaPista(pista, tempo, tipo), tempo);
        } else {
          console.error('Linha não reconhecida:', linha); // Adiciona log para linhas não reconhecidas
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
}

// Função para criar hexágono com base nos dados carregados
function criarHexagonoPelaPista(pista, tempo, tipo) {
  const hexagono = document.createElement('div');
  hexagono.classList.add('hexagono');

  const tipoLinha = tipo === '1' ? 'linhatipo1' : tipo === '2' ? 'linhatipo2' : 'linhatipo3';
  const tipoBackground = tipoLinha === 'linhatipo1' ? 'backgroundtipo1' 
                     : tipoLinha === 'linhatipo2' ? 'backgroundtipo2' 
                     : 'backgroundtipo3';

  for (let i = 1; i <= 6; i++) {
    const linha = document.createElement('div');
    linha.classList.add(tipoLinha, `linha${i}`);
    hexagono.appendChild(linha);
  }

  for (let i = 1; i <= 3; i++) {
    const background = document.createElement('div');
    background.classList.add(tipoBackground, `background${i}`);
    hexagono.appendChild(background);
  }

  // Adiciona o hexágono à pista designada
  pistas[pista].appendChild(hexagono);

  // Armazena o tempo em que o hexágono foi criado
  const tempoCriacao = Date.now();

  // Adiciona um evento de clique no hexágono
  hexagono.addEventListener('click', () => {
    console.log("cccccccccccccccccccccc");
  });

}

// Função para incrementar o contador de erros
function incrementarErros() {
  erros++;
  document.getElementById('contador-erros').textContent = `vida: ${20 - erros}`;

  if (erros >= maxErros) {
    alert("Você perdeu! Máximo de erros atingido.");
    reiniciarJogo();
  }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  erros = 0;
  document.querySelectorAll('.hexagono').forEach(hex => hex.remove());
  carregarArquivo(); // Reinicia o carregamento dos hexágonos
}
