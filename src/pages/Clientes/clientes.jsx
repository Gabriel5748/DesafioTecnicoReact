// import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import "@mui/x-data-grid/themeAugmentation";
import { useEffect, useRef, useState } from "react";
// import { SquarePen, Trash2 } from "lucide-react";
import AddCliente from "./add_cliente";
import MyDataGrid from "../../components/datagrid";
import AtualizarCliente from "./update_cliente";
import ExportarDados from "../../components/export_data";
// import ExportarExcel from "../../components/Export/export_excel";

function Clientes() {
  const api_url = "http://localhost:3000/api/clientes";
  const [clientes, setClientes] = useState([]);

  const atualizarRef = useRef();

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api_url, { method: "GET" });
      const data = await response.json();
      setClientes(data);
    };
    fetchData();
  }, []);

  function editarCliente(clienteId) {
    const cliente = clientes.find((cliente) => cliente.id === clienteId);
    if (cliente) {
      atualizarRef.current.open(cliente);
    }
  }

  async function salvarEdicao(clienteAtualizado) {
    const response = await fetch(`${api_url}/${clienteAtualizado.id}`, {
      method: "PUT",
      body: JSON.stringify(clienteAtualizado),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const clienteEditado = await response.json();

      setClientes((prev) =>
        prev.map((cliente) =>
          cliente.id === clienteEditado.id ? clienteEditado : cliente
        )
      );
    } else {
      alert("Falha ao salvar edição!");
    }
  }

  async function deletarCliente(clienteId) {
    const response = await fetch(`${api_url}/${clienteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setClientes((prev) => prev.filter((cliente) => cliente.id != clienteId));
    } else {
      alert("Falha ao remover cliente!");
    }
  }

  const clienteColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "telefone", headerName: "Telefone", width: 150 },
    { field: "cpf", headerName: "CPF", width: 150 },
    { field: "cnpj", headerName: "CNPJ", width: 150 },
  ];

  return (
    <div>
      <MyDataGrid
        data={clientes}
        columns={clienteColumns}
        funcEdit={editarCliente}
        funcDelete={deletarCliente}
      ></MyDataGrid>
      <div className="flex justify-between mt-8">
        <AddCliente
          setClientes={setClientes}
          clientes={clientes}
          api_url={api_url}
        ></AddCliente>

        <ExportarDados
          data={clientes}
          columns={clienteColumns}
          excelFileName={"clientes"}
          pdfFileName={"clientes"}
          isPedido={false}
        />
      </div>
      <AtualizarCliente ref={atualizarRef} onSubmit={salvarEdicao} />{" "}
    </div>
  );
}

export default Clientes;
