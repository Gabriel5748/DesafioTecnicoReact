const produtos = [];

const listarProdutos = (req, res) => {
  res.json(produtos);
};

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
  const { nome, preco, estoque, categoria } = req.body;

  const index = produtos.findIndex((produto) => produto.id === parseInt(id));

  if (index != -1) {
    produtos[index].nome = nome;
    produtos[index].preco = preco;
    produtos[index].estoque = estoque;
    produtos[index].categoria = categoria;

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
  listarProdutos,
  adicionarProdutos,
  atualizarProdutos,
  removerProdutos,
};
