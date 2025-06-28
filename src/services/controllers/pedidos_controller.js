import clientes_controller from "./clientes_controller.js";
import produtos_controller from "./produtos_controller.js";

const pedidos = [];

const listarPedidos = (req, res) => {
  res.json(pedidos);
};

const adicionarPedidos = (req, res) => {
  const { clienteNome, itens } = req.body;
  const id = pedidos.length + 1;

  try {
    if (!clienteNome) {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }
    const clienteEncontrado = clientes_controller.verificarCliente(clienteNome);
    if (clienteEncontrado == null || clienteEncontrado == undefined) {
      throw new Error(`Cliente ${clienteNome} não foi encontrado`);
    }

    if (!itens || itens.length === 0) {
      throw new Error("O pedido deve conter pelo menos um item");
    }

    const total = itens.reduce((acc, item) => {
      const precoProduto = produtos_controller.verificarProdutoPreco(item.nome);

      if (precoProduto === null || precoProduto === undefined) {
        throw new Error(`Produto "${item.nome}" não encontrado`);
      }

      if (!item.quantidade || item.quantidade <= 0) {
        throw new Error(`Quantidade inválida para o produto "${item.nome}"`);
      }

      return acc + Number(precoProduto) * Number(item.quantidade);
    }, 0);

    // const clienteId = clientes_controller.verificarClienteID(clienteNome);

    const pedido = {
      id: id,
      clienteNome: clienteEncontrado.nome,
      clienteId: clienteEncontrado.id,
      data: new Date().toISOString(),
      itens: itens.map((item) => ({
        nome: item.nome,
        quantidade: item.quantidade,
      })),
      total: total,
    };

    pedidos.push(pedido);
    return res.status(201).json(pedido);
  } catch (error) {
    return res.status(400).json({
      mensagem: error.message,
      erro: "Erro ao processar pedido",
    });
  }
};

const atualizarPedidos = (req, res) => {
  const { id } = req.params;
  const { itens } = req.params;

  const index = pedidos.findIndex((pedido) => pedido.id == parseInt(id));

  if (index !== -1) {
    pedidos[index].itens = itens;
    pedidos[index].data = new Date().toISOString();
    pedidos[index].total = itens.reduce(
      (soma, item) => soma + item.preco * item.quantidade
    );
    res.json({ mensagem: "Pedido alterado com sucesso" });
  } else {
    res.json({ mensagem: "Pedido não encontrado" });
  }
};

const removerPedidos = (req, res) => {
  const { id } = req.params;

  const index = pedidos.findIndex((pedido) => pedido.id == parseInt(id));

  if (index !== -1) {
    pedidos.splice(index, 1);
    res.json({ mensagem: "Pedido excluído com sucesso" });
  } else {
    res.json({ mensagem: "Pedido não encontrado" });
  }
};

export default {
  listarPedidos,
  adicionarPedidos,
  atualizarPedidos,
  removerPedidos,
};
