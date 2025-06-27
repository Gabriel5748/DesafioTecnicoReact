import { useState } from "react";

function AddPedido({ api_url, setPedidos }) {
  let [name, setName] = useState("");
  let [preco, setPreco] = useState("");
  let [estoque, setEstoque] = useState("");
  let [categoria, setCategoria] = useState("");

  async function adicionarProduto() {
    let produto = {
      nome: name,
      preco: preco,
      estoque: estoque,
      categoria: categoria,
    };
    const response = await fetch(api_url, {
      method: "POST",
      body: JSON.stringify(produto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const novoProduto = await response.json();
      setProdutos((prev) => [...prev, novoProduto]);
      setName("");
      setPreco("");
      setEstoque("");
      setCategoria("");
    } else {
      alert("Falha ao adicionar novo produto!");
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center bg-purple-400 w-[500px]  rounded-md">
        <input
          className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
          type="text"
          placeholder="Informe o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
          type="text"
          placeholder="Informe o preço unitário"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
          type="text"
          placeholder="Informe a quantidade do estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />
        <input
          className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
          type="text"
          placeholder="Informe a categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <button
          type="submit"
          className="bg-red-500 rounded-md space-x-3 space-y-2 px-8 py-2"
          onClick={() => adicionarProduto()}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default AddPedido;
