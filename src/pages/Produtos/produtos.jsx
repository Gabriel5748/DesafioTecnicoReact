import { useEffect, useRef, useState } from "react";
import MyDataGrid from "../../components/datagrid";
import AtualizarProduto from "./update_produto";
import AddProduto from "./add_produto";
import ExportarDados from "../../components/export_data";
import ExportarPDF from "../../components/Export/export_pdf";

function Produtos() {
  const api_url = "http://localhost:3000/api/produtos";
  const [produtos, setProdutos] =
    useState(JSON.parse(localStorage.getItem("produtos"))) || [];
  const atualizarRef = useRef();

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api_url, { method: "GET" });
      const data = await response.json();
      setProdutos(data);
    };
    fetchData();
  }, []);

  function editarProduto(produtoId) {
    const produto = produtos.find((produto) => produto.id === produtoId);
    if (produto) {
      atualizarRef.current.open(produto);
    }
  }

  async function salvarEdicao(produtoAtualizado) {
    const response = await fetch(`${api_url}/${produtoAtualizado.id}`, {
      method: "PUT",
      body: JSON.stringify(produtoAtualizado),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const produtoEditado = await response.json();

      setProdutos((prev) =>
        prev.map((produto) =>
          produto.id === produtoEditado.id ? produtoEditado : produto
        )
      );
    } else {
      alert("Falha ao salvar edição!");
    }
  }

  async function deletarProduto(produtoId) {
    const response = await fetch(`${api_url}/${produtoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProdutos((prev) => prev.filter((produto) => produto.id != produtoId));
    } else {
      alert("Falha ao remover produto!");
    }
  }

  const produtoColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Nome", width: 130 },
    { field: "preco", headerName: "Preço", width: 90 },
    { field: "estoque", headerName: "Estoque", width: 90 },
    { field: "categoria", headerName: "Categoria", width: 90 },
  ];

  return [
    <div>
      <MyDataGrid
        data={produtos}
        columns={produtoColumns}
        funcEdit={editarProduto}
        funcDelete={deletarProduto}
      ></MyDataGrid>
      <div className="flex justify-between mt-8">
        <AddProduto
          produtos={produtos}
          api_url={api_url}
          setProdutos={setProdutos}
        ></AddProduto>

        <ExportarDados
          data={produtos}
          pdfFileName="produtos.pdf"
          element={
            <ExportarPDF
              data={produtos}
              columns={produtoColumns}
              titulo={"DataGrid Produtos"}
            />
          }
        ></ExportarDados>
      </div>
      <AtualizarProduto ref={atualizarRef} onSubmit={salvarEdicao} />{" "}
    </div>,
  ];
}

export default Produtos;
