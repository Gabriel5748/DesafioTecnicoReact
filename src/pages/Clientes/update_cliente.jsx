import { forwardRef, useRef, useState, useImperativeHandle } from "react";

const AtualizarCliente = forwardRef(({ onSubmit }, ref) => {
  const dialogRef = useRef();
  const [cliente, setCliente] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cnpj: "",
  });

  useImperativeHandle(ref, () => ({
    open(clienteInfo) {
      setCliente(clienteInfo);
      dialogRef.current.showModal();
    },
  }));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(cliente);
    dialogRef.current.close();
  }

  return (
    <dialog ref={dialogRef} className="rounded-lg p-0 bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-purple-600 rounded-lg p-8 w-[500px] shadow-lg"
      >
        <h2 className="font-bold text-2xl text-center text-white mb-4">
          Editar Cliente
        </h2>
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={cliente.nome}
          onChange={(e) =>
            setCliente((prev) => ({ ...prev, nome: e.target.value }))
          }
          placeholder="Nome"
          required
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={cliente.email}
          onChange={(e) =>
            setCliente((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Email"
          required
          type="email"
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={cliente.telefone}
          onChange={(e) =>
            setCliente((prev) => ({ ...prev, telefone: e.target.value }))
          }
          placeholder="Telefone"
          required
          type="tel"
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={cliente.cpf}
          onChange={(e) =>
            setCliente((prev) => ({ ...prev, cpf: e.target.value }))
          }
          placeholder="CPF"
          required
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={cliente.cnpj}
          onChange={(e) =>
            setCliente((prev) => ({ ...prev, cnpj: e.target.value }))
          }
          placeholder="CNPJ"
        />

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md px-6 py-3 transition-colors duration-200 w-full"
        >
          Salvar
        </button>
      </form>
    </dialog>
  );
});

export default AtualizarCliente;
