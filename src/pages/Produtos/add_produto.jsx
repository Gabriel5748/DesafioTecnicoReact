import { useState } from "react";
import { Tag } from "lucide-react";

function AddProduto({ api_url, setProdutos }) {
  const [name, setName] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState("");
  const [addButtonProduct, setToggleProduct] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = {
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
  };

  const toggleForm = () => {
    setToggleProduct((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-start mb-8">
        <button
          type="button"
          className="flex flex-row gap-2 font-bold"
          onClick={toggleForm}
        >
          <Tag />
          <h2>Adicionar Produto</h2>
        </button>
      </div>

      {addButtonProduct && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-purple-600 rounded-lg p-8 w-[500px] shadow-lg"
        >
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Informe o nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Informe o preço unitário"
            value={preco}
            onChange={(e) => {
              let valor = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\./g, "$1");

              if (valor.startsWith(".")) return;
              setPreco(valor);
            }}
            required
          />
          <input
            className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="number"
            placeholder="Informe a quantidade do estoque"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            min={1}
            required
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
          >
            Adicionar
          </button>
        </form>
      )}
    </div>
  );
}

export default AddProduto;
