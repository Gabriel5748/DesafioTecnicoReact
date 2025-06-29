// import { saveAs } from "file-saver";
// import XLSX from "xlsx";

// const ExportarExcel = ({ data, fileName }) => {
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, `${fileName}.xlsx`);
//   };

//   return <button onClick={exportToExcel}>Export to Excel</button>;
// };

// export default ExportarExcel;
