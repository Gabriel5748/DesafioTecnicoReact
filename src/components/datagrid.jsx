import { DataGrid } from "@mui/x-data-grid";
import { SquarePen, Trash2 } from "lucide-react";

function MyDataGrid({ data = [], columns = [], funcEdit, funcDelete }) {
  const finalColumns = [
    ...columns,
    {
      field: "acoes",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => (
        <div className="space-x-3">
          <button
            onClick={() => funcEdit?.(params.row.id)}
            className="bg-green-400 px-2 py-1 rounded-md text-black"
          >
            <SquarePen />
          </button>
          <button
            onClick={() => funcDelete?.(params.row.id)}
            className="bg-red-500 px-2 py-1 rounded-md text-black"
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        marginBottom: 24,
        position: "relative",
        zIndex: 0,
      }}
    >
      <DataGrid
        rows={data}
        columns={finalColumns}
        pageSize={5}
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            overflowY: "auto",
          },
        }}
      />
    </div>
  );
}

export default MyDataGrid;
