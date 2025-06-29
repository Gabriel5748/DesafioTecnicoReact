import { Download } from "lucide-react";
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import ExportarPDF from "./Export/export_pdf";

function ExportarDados({
  data = [],
  columns = [],
  pdfFileName,
  excelFileName,
  isPedido,
}) {
  const [exportButtonIsChecked, toggleExportData] = useState(false);

  const exportDataIsChecked = () => toggleExportData((prev) => !prev);

  const exportarExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert("Nenhum dado para exportar.");
      return;
    }

    const dadosFormatados = isPedido
      ? data.map((item) => ({
          "Pedido ID": item.id,
          Itens: item.itens
            ?.map((produto) => `${produto.nome} (x${produto.quantidade})`)
            .join(", "),
          "Total (R$)": item.total,
          "Cliente Nome": item.clienteNome,
          "Cliente ID": item.clienteId,
          "Data Pedido": item.data,
        }))
      : columns.length
      ? data.map((item) => {
          const linha = {};
          columns.forEach((col) => {
            linha[col.headerName] = item[col.field];
          });
          return linha;
        })
      : data;
    const worksheet = XLSX.utils.json_to_sheet(dadosFormatados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, `${excelFileName}.xlsx`);
  };

  const exportarPDF = async () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert("Nenhum dado para exportar.");
      return;
    }

    try {
      const dadosPDF = isPedido
        ? data.map((item) => ({
            ...item,
            itens:
              item.itens
                ?.map((produto) => `${produto.nome} (x${produto.quantidade})`)
                .join(", ") ?? "—",
          }))
        : data;

      const blob = await pdf(
        <ExportarPDF
          data={dadosPDF}
          columns={columns}
          titulo={isPedido ? "Pedidos" : "DataGrid"}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pdfFileName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Erro ao gerar PDF: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <button
          type="button"
          className="flex gap-2"
          onClick={exportDataIsChecked}
        >
          <Download />
          <h2 className="font-bold">Exportar Dados</h2>
        </button>
      </div>

      <div className={`${exportButtonIsChecked ? "flex" : "hidden"} gap-4`}>
        <button
          type="button"
          onClick={exportarExcel}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Exportar Para Excel
        </button>

        <button
          type="button"
          onClick={exportarPDF}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Exportar Para PDF
        </button>
      </div>
    </div>
  );
}

export default ExportarDados;
