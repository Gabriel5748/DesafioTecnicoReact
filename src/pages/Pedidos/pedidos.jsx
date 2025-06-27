import { DataGrid } from "@mui/x-data-grid";

import "@mui/x-data-grid/themeAugmentation";
import { useEffect, useRef, useState } from "react";
import MyDataGrid from "../../components/datagrid";

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

      setProdutos((prev) =>
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
      setProdutos((prev) => prev.filter((pedido) => pedido.id != pedidoId));
    } else {
      alert("Falha ao remover pedido!");
    }
  }

  const pedidoColumns = [
    { field: "id", headerName: "ID do Pedido", width: 100 },
    { field: "clienteId", headerName: "ID do Cliente", width: 130 },
    { field: "itens", headerName: "Itens", width: 100 },
    { field: "total", headerName: "Total (R$)", width: 120 },
  ];

  return [
    <div style={{ height: 300, width: "100%" }}>
      <MyDataGrid
        data={pedidos}
        columns={pedidoColumns}
        funcEdit={editarPedido}
        funcDelete={deletarPedido}
        pageSize={5}
      />
    </div>,
  ];
}

export default Pedidos;
