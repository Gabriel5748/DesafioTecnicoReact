const produtos = [];

const listarProdutos = (req, res) => {
  res.json(produtos);
};

const buscarProdutoPorId = (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (!produto)
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  res.json(produto);
};

function buscarProduto(nome) {
  return produtos.find((p) => p.nome === nome);
}

function verificarEstoque(nome) {
  const produto = buscarProduto(nome);
  return produto ? Number(produto.estoque) : null;
}

function verificarProdutoPreco(nome) {
  const produto = buscarProduto(nome);
  return produto ? produto.preco : null;
}

function atualizarEstoque(id, novoEstoque) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return false;
  produto.estoque = novoEstoque;
  return true;
}
const adicionarProdutos = (req, res) => {
  const { nome, preco, estoque, categoria } = req.body;
  const id = produtos.length + 1;
  const newProduct = {
    id: id,
    nome: nome,
    preco: preco,
    estoque: estoque,
    categoria: categoria,
  };

  produtos.push(newProduct);
  res.status(201).json(newProduct);
};

const atualizarProdutos = (req, res) => {
  const { id } = req.params;
  // const { nome, preco, estoque, categoria } = req.body;

  const index = produtos.findIndex((produto) => produto.id === parseInt(id));

  if (index != -1) {
    const produtoAtual = produtos[index];
    const camposAtualizados = req.body;

    produtos[index] = { ...produtoAtual, ...camposAtualizados };

    res.json(produtos[index]);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
};

const removerProdutos = (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex((produto) => produto.id === parseInt(id));

  if (index !== -1) {
    produtos.splice(index, 1);
    res.json({ mensagem: "Produto excluído com sucesso" });
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
};

export default {
  produtos,
  listarProdutos,
  buscarProduto,
  buscarProdutoPorId,
  verificarEstoque,
  verificarProdutoPreco,
  adicionarProdutos,
  atualizarProdutos,
  removerProdutos,
  atualizarEstoque,
};
