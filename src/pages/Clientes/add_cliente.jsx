import { useState } from "react";
import { UserRoundPlus } from "lucide-react";
import {
  formatarCPF,
  formatarCNPJ,
  formatarTelefone,
} from "../../components/Formatter/formatter";

function AddCliente({ api_url, setClientes }) {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [cpf, setCPF] = useState("");
  let [cnpj, setCNPJ] = useState("");
  let [addButtonIsChecked, setToggleAddClient] = useState(false);

  async function adicionarCliente(e) {
    e.preventDefault();

    let cliente = {
      nome: name,
      email,
      telefone: phone,
      cpf,
      cnpj,
    };
    const response = await fetch(api_url, {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const novoCliente = await response.json();
      setClientes((prev) => [...prev, novoCliente]);
      setName("");
      setEmail("");
      setPhone("");
      setCPF("");
      setCNPJ("");
    } else {
      alert("Falha ao adicionar novo cliente!");
    }
  }

  function addClientIsChecked() {
    addButtonIsChecked = addButtonIsChecked
      ? setToggleAddClient(false)
      : setToggleAddClient(true);
  }

  return (
    <div>
      <div className="flex justify-start mb-8">
        <button
          type="button"
          className="flex flex-row gap-2 font-bold"
          onClick={addClientIsChecked}
        >
          <UserRoundPlus />
          <h2>Adicionar Cliente</h2>
        </button>
      </div>

      {addButtonIsChecked && (
        <form
          onSubmit={adicionarCliente}
          className="flex flex-col gap-5 bg-purple-600 rounded-lg p-8 w-[500px] shadow-lg"
        >
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Informe o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="email"
            placeholder="Informe o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Informe o telefone"
            value={phone}
            onChange={(e) => setPhone(formatarTelefone(e.target.value))}
            required
          />
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Informe o CPF"
            value={cpf}
            onChange={(e) => {
              setCPF(formatarCPF(e.target.value));
            }}
            required
          />
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Informe o CNPJ"
            value={cnpj}
            onChange={(e) => {
              setCNPJ(formatarCNPJ(e.target.value));
            }}
          />

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md px-6 py-3 transition-colors duration-200"
          >
            Adicionar
          </button>
        </form>
      )}
    </div>
  );
}

export default AddCliente;
