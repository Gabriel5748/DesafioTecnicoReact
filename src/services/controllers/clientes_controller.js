const clientes = [];

const listarClientes = (req, res) => {
  res.json(clientes);
};

const verificarCliente = (clienteNome) => {
  return clientes.find((cliente) => cliente.nome === clienteNome);
};

const adicionarClientes = (req, res) => {
  const { nome, email, telefone, cpf, cnpj } = req.body;
  const id = clientes.length + 1;
  const newClient = {
    id: id,
    nome: nome,
    email: email,
    telefone: telefone,
    cpf: cpf,
    cnpj: cnpj,
  };

  clientes.push(newClient);
  res.status(201).json(newClient);
};

const atualizarClientes = (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, cpf, cnpj } = req.body;

  const index = clientes.findIndex((cliente) => cliente.id === parseInt(id));

  if (index != -1) {
    clientes[index].nome = nome;
    clientes[index].email = email;
    clientes[index].telefone = telefone;
    clientes[index].cpf = cpf;
    clientes[index].cnpj = cnpj;

    res.json(clientes[index]);
  } else {
    res.status(404).json({ mensagem: "Cliente não encontrado" });
  }
};

const removerClientes = (req, res) => {
  const { id } = req.params;
  const index = clientes.findIndex((cliente) => cliente.id === parseInt(id));

  if (index !== -1) {
    clientes.splice(index, 1);
    res.json({ mensagem: "Cliente excluído com sucesso" });
  } else {
    res.status(404).json({ mensagem: "Cliente não encontrado" });
  }
};

export default {
  listarClientes,
  verificarCliente,
  adicionarClientes,
  atualizarClientes,
  removerClientes,
};
