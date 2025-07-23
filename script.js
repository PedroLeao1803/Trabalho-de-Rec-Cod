// Classe representando um carro
class Carro {
  constructor(modelo, marca, categoria) {
    this.modelo = modelo;
    this.marca = marca;
    this.categoria = categoria;
  }
}

// Lista onde os carros serão armazenados
const carros = [];

// Referências aos elementos HTML
const form = document.getElementById('form-carro');
const listaCarros = document.getElementById('lista-carros');
const inputBusca = document.getElementById('input-busca');

// Função para mostrar os carros na tela
function renderizarLista(lista) {
  listaCarros.innerHTML = '';

  if (lista.length === 0) {
    listaCarros.innerHTML = '<p>Nenhum carro encontrado.</p>';
    return;
  }

  lista.forEach((carro, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${carro.modelo}</strong> - ${carro.marca} (${carro.categoria})
      </div>
      <button class="remove-btn" onclick="removerCarro(${index})">Remover</button>
    `;
    listaCarros.appendChild(li);
  });
}

// Função para adicionar um novo carro
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const modelo = document.getElementById('modelo').value.trim();
  const marca = document.getElementById('marca').value.trim();
  const categoria = document.getElementById('categoria').value.trim();

  if (!modelo || !marca || !categoria) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const novoCarro = new Carro(modelo, marca, categoria);
  carros.push(novoCarro);
  renderizarLista(carros);
  form.reset();
});

// Função para remover um carro da lista
function removerCarro(index) {
  carros.splice(index, 1);
  renderizarLista(carros);
}

// Função para buscar carros
inputBusca.addEventListener('input', () => {
  const termo = inputBusca.value.toLowerCase();

  const resultados = carros.filter(carro =>
    carro.modelo.toLowerCase().includes(termo) ||
    carro.categoria.toLowerCase().includes(termo)
  );

  renderizarLista(resultados);
});
