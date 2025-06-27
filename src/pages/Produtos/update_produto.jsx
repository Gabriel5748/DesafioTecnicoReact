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
    <div>
      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit} className="space-y-2 space-x-2">
          <div className="flex flex-col gap-5 justify-center items-center bg-purple-400 w-[500px]  rounded-md">
            <h2 className="font-bold text-2xl text-center">Editar Produto</h2>
            <input
              className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
              value={produto.nome}
              onChange={(e) =>
                setProduto((prev) => ({ ...prev, nome: e.target.value }))
              }
              placeholder="Nome"
            />
            <input
              className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
              value={produto.preco}
              onChange={(e) =>
                setProduto((prev) => ({ ...prev, preco: e.target.value }))
              }
              placeholder="Preço"
            />
            <input
              className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
              value={produto.estoque}
              onChange={(e) =>
                setProduto((prev) => ({ ...prev, estoque: e.target.value }))
              }
              placeholder="Estoque"
            />
            <input
              className="bg-purple-400 px-4 py-2 outline-purple-800 rounded-md border-2 placeholder-white"
              value={produto.categoria}
              onChange={(e) =>
                setProduto((prev) => ({ ...prev, categoria: e.target.value }))
              }
              placeholder="Categoria"
            />

            <button type="submit" className="bg-green-400 px-3 py-1 rounded-md">
              Salvar
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
});

export default AtualizarProduto;
