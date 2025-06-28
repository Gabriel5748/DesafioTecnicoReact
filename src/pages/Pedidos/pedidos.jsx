import { useEffect, useRef, useState } from "react";
import MyDataGrid from "../../components/datagrid";
import AddPedido from "./add_pedido";
import ExportarDados from "../../components/export_data";
import AtualizarPedido from "../Pedidos/update_pedido";

function Pedidos() {
  const api_url = "http://localhost:3000/api/pedidos";
  const [pedidos, setPedidos] =
    useState(JSON.parse(localStorage.getItem("pedidos"))) || [];
  const atualizarRef = useRef();

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api_url, { method: "GET" });
      const data = await response.json();
      setPedidos(data);
    };
    fetchData();
  }, []);

  function editarPedido(pedidoId) {
    const pedido = pedidos.find((pedido) => pedido.id === pedidoId);
    if (pedido) {
      atualizarRef.current.open(pedido);
    }
  }

  async function salvarEdicao(pedidoAtualizado) {
    const response = await fetch(`${api_url}/${pedidoAtualizado.id}`, {
      method: "PUT",
      body: JSON.stringify(pedidoAtualizado),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const pedidoEditado = await response.json();

      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoEditado.id ? pedidoEditado : pedido
        )
      );
    } else {
      alert("Falha ao salvar edição!");
    }
  }

  async function deletarPedido(pedidoId) {
    const response = await fetch(`${api_url}/${pedidoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPedidos((prev) => prev.filter((pedido) => pedido.id != pedidoId));
    } else {
      alert("Falha ao remover pedido!");
    }
  }

  const pedidoColumns = [
    { field: "id", headerName: "Pedido ID", width: 100 },
    {
      field: "itens",
      headerName: "Itens",
      width: 300,
      renderCell: (params) => {
        return params.value
          .map(
            (item) =>
              `${item.nome} x ${item.quantidade} unidade(s)
              `
          )
          .join(", ");
      },
    },
    { field: "total", headerName: "Total (R$)", width: 120 },
    { field: "clienteNome", headerName: "Cliente Nome", width: 130 },
    { field: "clienteId", headerName: "Cliente ID", width: 130 },
    { field: "data", headerName: "Data Pedido", width: 100 },
  ];

  return (
    <div>
      <MyDataGrid
        data={pedidos}
        columns={pedidoColumns}
        funcEdit={editarPedido}
        funcDelete={deletarPedido}
        pageSize={5}
      />
      <div className="flex justify-between mt-8">
        <AddPedido api_url={api_url} setPedidos={setPedidos}></AddPedido>
        <ExportarDados data={pedidos}></ExportarDados>
        <AtualizarPedido ref={atualizarRef} onSubmit={salvarEdicao} />
      </div>
    </div>
  );
}

export default Pedidos;
