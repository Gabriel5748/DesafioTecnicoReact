import { Download } from "lucide-react";
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";

function ExportarDados({ element, pdfFileName = "documento.pdf" }) {
  const [exportButtonIsChecked, toggleExportData] = useState(false);

  const exportDataIsChecked = () => toggleExportData((prev) => !prev);

  const exportarPDF = async () => {
    if (!element) {
      alert("Nenhum conteúdo PDF fornecido.");
      return;
    }

    try {
      const blob = await pdf(element).toBlob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFileName;
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
