import { mkConfig, generateCsv, download } from "export-to-csv";
import { usePDF } from "react-to-pdf";
import { Download } from "lucide-react";
import { useState } from "react";

function ExportarDados({ data }) {
  let [exportButtonIsChecked, toggleExportData] = useState(false);

  function exportDataIsChecked() {
    exportButtonIsChecked = exportButtonIsChecked
      ? toggleExportData(false)
      : toggleExportData(true);
  }

  const exportarExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert("Nenhum dado para exportar.");
      return;
    }

    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const ExportarPDF = () => {
    const { toPDF, targetRef } = usePDF();

    return (
      <div>
        <button type="button" onClick={() => toPDF()}>
          Exportar Para PDF
        </button>
        <div ref={targetRef}>{/* Conteúdo do PDF */}</div>
      </div>
    );
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
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Exportar Para PDF
        </button>
      </div>
    </div>
  );
}

export default ExportarDados;
