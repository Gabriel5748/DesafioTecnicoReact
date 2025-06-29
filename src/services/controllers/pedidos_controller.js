import clientes_controller from "./clientes_controller.js";
import produtos_controller from "./produtos_controller.js";

const pedidos = [];

const listarPedidos = (req, res) => {
  res.json(pedidos);
};

async function subtrairProdutoEstoque(produtoId, quantidadeASubtrair) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/produtos/${produtoId}`
    );
    if (!response.ok) throw new Error("Produto não encontrado");
    const produto = await response.json();

    const novoEstoque = produto.estoque - quantidadeASubtrair;
    if (novoEstoque < 0)
      throw new Error(`Estoque insuficiente para o produto "${produto.nome}"`);

    const respostaAtualizacao = await fetch(
      `http://localhost:3000/api/produtos/${produtoId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estoque: novoEstoque }),
      }
    );

    if (!respostaAtualizacao.ok)
      throw new Error(`Erro ao atualizar estoque do produto "${produto.nome}"`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function restaurarEstoquePedido(pedido) {
  try {
    for (const item of pedido.itens) {
      const produto = produtos_controller.produtos.find(
        (p) => p.nome === item.nome
      );
      if (!produto) {
        throw new Error(`Produto ${item.nome} não encontrado`);
      }

      const novoEstoque = Number(produto.estoque) + Number(item.quantidade);

      const respostaAtualizacao = await fetch(
        `http://localhost:3000/api/produtos/${produto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estoque: novoEstoque }),
        }
      );

      if (!respostaAtualizacao.ok) {
        throw new Error(`Erro ao restaurar estoque do produto ${produto.nome}`);
      }
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const adicionarPedidos = async (req, res) => {
  const { clienteNome, itens } = req.body;
  const id = pedidos.length + 1;

  try {
    if (!clienteNome) {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }

    const clienteEncontrado = clientes_controller.verificarCliente(clienteNome);
    if (!clienteEncontrado) {
      throw new Error(`Cliente ${clienteNome} não foi encontrado`);
    }

    if (!itens || itens.length === 0) {
      throw new Error("O pedido deve conter pelo menos um item");
    }

    for (const item of itens) {
      const estoqueDisponivel = produtos_controller.verificarEstoque(item.nome);
      if (estoqueDisponivel === null || item.quantidade > estoqueDisponivel) {
        throw new Error(
          `Produto "${item.nome}" não possui estoque suficiente. Solicitado: ${item.quantidade}, Disponível: ${estoqueDisponivel}`
        );
      }
    }

    const total = itens.reduce((acc, item) => {
      const preco = produtos_controller.verificarProdutoPreco(item.nome);
      if (preco === null || preco === undefined) {
        throw new Error(`Produto "${item.nome}" não encontrado`);
      }
      if (!item.quantidade || item.quantidade <= 0) {
        throw new Error(`Quantidade inválida para o produto "${item.nome}"`);
      }
      return acc + preco * item.quantidade;
    }, 0);

    for (const item of itens) {
      const produto = produtos_controller.buscarProduto(item.nome);
      if (!produto) {
        throw new Error(`Produto "${item.nome}" não encontrado`);
      }
      const sucesso = await subtrairProdutoEstoque(produto.id, item.quantidade);
      if (!sucesso) {
        throw new Error(`Erro ao atualizar estoque do produto "${item.nome}"`);
      }
    }

    const pedido = {
      id,
      clienteNome: clienteEncontrado.nome,
      clienteId: clienteEncontrado.id,
      data: new Date().toISOString(),
      itens: itens.map(({ nome, quantidade }) => ({
        nome,
        quantidade: Number(quantidade),
      })),
      total,
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

const atualizarPedidos = async (req, res) => {
  const { id } = req.params;
  const { itens } = req.body;

  const index = pedidos.findIndex((pedido) => pedido.id == parseInt(id));
  if (index === -1) {
    return res.status(404).json({ mensagem: "Pedido não encontrado" });
  }

  try {
    const pedidoOriginal = pedidos[index];

    for (const item of itens) {
      const produto = produtos_controller.buscarProduto(item.nome);
      if (!produto) {
        throw new Error(`Produto "${item.nome}" não encontrado`);
      }

      const estoqueDisponivel = produtos_controller.verificarEstoque(item.nome);
      if (estoqueDisponivel === null || item.quantidade > estoqueDisponivel) {
        throw new Error(
          `Produto "${item.nome}" não possui estoque suficiente. Solicitado: ${item.quantidade}, Disponível: ${estoqueDisponivel}`
        );
      }
    }

    const total = itens.reduce((acc, item) => {
      const preco = produtos_controller.verificarProdutoPreco(item.nome);
      if (preco === null) {
        throw new Error(`Produto "${item.nome}" não encontrado`);
      }
      return acc + preco * item.quantidade;
    }, 0);

    const estoqueRestaurado = await restaurarEstoquePedido(pedidoOriginal);
    if (!estoqueRestaurado) {
      throw new Error("Erro ao restaurar o estoque do pedido antigo");
    }

    for (const item of itens) {
      const produto = produtos_controller.buscarProduto(item.nome);
      const sucesso = await subtrairProdutoEstoque(produto.id, item.quantidade);
      if (!sucesso) {
        throw new Error(`Erro ao subtrair estoque do produto "${item.nome}"`);
      }
    }

    pedidos[index] = {
      ...pedidoOriginal,
      itens,
      total,
      data: new Date().toISOString(),
    };

    res.json({
      mensagem: "Pedido atualizado com sucesso",
      pedido: pedidos[index],
    });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const removerPedidos = async (req, res) => {
  const { id } = req.params;

  const index = pedidos.findIndex((pedido) => pedido.id == parseInt(id));

  if (index !== -1) {
    const pedidoExcluido = await restaurarEstoquePedido(pedidos[index]);

    if (!pedidoExcluido) {
      return res.status(400).json({
        mensagem: "Mensagem erro ao atualizar estoque do pedido excluído",
      });
    }

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
