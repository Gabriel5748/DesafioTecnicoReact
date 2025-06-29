import { forwardRef, useRef, useState, useImperativeHandle } from "react";

const AtualizarProduto = forwardRef(({ onSubmit }, ref) => {
  const dialogRef = useRef();
  const [produto, setProduto] = useState({
    id: "",
    nome: "",
    preco: "",
    estoque: "",
    categoria: "",
  });

  useImperativeHandle(ref, () => ({
    open(produtoInfo) {
      setProduto({
        ...produtoInfo,
        preco: produtoInfo.preco?.toString() || "",
        estoque: produtoInfo.estoque?.toString() || "",
      });
      dialogRef.current.showModal();
    },
  }));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(produto);
    dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg p-0 bg-transparent"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current.close();
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-purple-600 rounded-lg p-8 w-[500px] shadow-lg"
      >
        <h2 className="font-bold text-2xl text-center text-white mb-4">
          Editar Produto
        </h2>
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={produto.nome}
          onChange={(e) =>
            setProduto((prev) => ({ ...prev, nome: e.target.value }))
          }
          placeholder="Nome"
          required
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={produto.preco}
          onChange={(e) =>
            setProduto((prev) => ({ ...prev, preco: e.target.value }))
          }
          placeholder="Preço"
          required
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={produto.estoque}
          onChange={(e) =>
            setProduto((prev) => ({ ...prev, estoque: e.target.value }))
          }
          placeholder="Estoque"
          required
        />
        <input
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
          value={produto.categoria}
          onChange={(e) =>
            setProduto((prev) => ({ ...prev, categoria: e.target.value }))
          }
          placeholder="Categoria"
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

export default AtualizarProduto;
