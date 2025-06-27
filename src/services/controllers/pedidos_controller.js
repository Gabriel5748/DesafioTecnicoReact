const pedidos = [];

const listarPedidos = (req, res) => {
  res.json(pedidos);
};

const adicionarPedidos = (req, res) => {
  const { clienteId, itens } = req.body;
  const id = pedidos.length + 1;

  const total = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade
  );

  const pedido = {
    id: id,
    clienteId: clienteId,
    data: new Date().toISOString(),
    itens: itens,
    total: total,
  };

  pedidos.push(pedido);
  res(201).json(pedido);
};

const atualizarPedidos = (req, res) => {
  const { pedidoId } = req.params;
  const { itens } = req.params;

  const index = pedidos.findIndex((pedido) => pedido.id == parseInt(pedidoId));

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
  const { pedidoId } = req.params;

  const index = pedidos.findIndex((pedido) => pedido.id == parseInt(pedidoId));

  if (index !== -1) {
    pedidos.slice(index, 1);
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
