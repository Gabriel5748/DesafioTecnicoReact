import { useState } from "react";
import { Tag } from "lucide-react";

function AddProduto({ api_url, setProdutos }) {
  let [name, setName] = useState("");
  let [preco, setPreco] = useState("");
  let [estoque, setEstoque] = useState("");
  let [categoria, setCategoria] = useState("");
  let [addButtonProduct, setToggleProduct] = useState(false);

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

  function addProductIsChecked() {
    addButtonProduct = addButtonProduct
      ? setToggleProduct(false)
      : setToggleProduct(true);
  }

  return (
    <div>
      <div className="flex justify-start mb-8">
        <button
          type="button"
          className="flex flex-row gap-2 font-bold"
          onClick={addProductIsChecked}
        >
          <Tag />
          <h2>Adicionar Produto</h2>
        </button>
      </div>
      <div
        className={`${
          addButtonProduct ? "flex" : "hidden"
        } flex-col gap-5 bg-purple-600 rounded-lg p-8 w-[500px] shadow-lg`}
      >
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Informe o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Informe o preço unitário"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Informe a quantidade do estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Informe a categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md px-6 py-3 transition-colors duration-200"
          onClick={adicionarProduto}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default AddProduto;
