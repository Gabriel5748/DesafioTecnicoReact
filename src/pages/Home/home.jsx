import { useState } from "react";
import Clientes from "../Clientes/clientes";
import Produtos from "../Produtos/produtos";
import Pedidos from "../Pedidos/pedidos";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Home() {
  const [pagina, setPagina] = useState("clientes");
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate(-1);
  }

  return (
    <div className="flex min-h-screen bg-purple-100">
      <nav className="bg-purple-700 w-48 min-h-screen p-6 flex flex-col space-y-6">
        <button
          onClick={() => setPagina("clientes")}
          className={`text-white font-semibold py-3 rounded-md transition-colors duration-300 ${
            pagina === "clientes" ? "bg-purple-400" : "hover:bg-purple-600"
          }`}
        >
          Clientes
        </button>
        <button
          onClick={() => setPagina("produtos")}
          className={`text-white font-semibold py-3 rounded-md transition-colors duration-300 ${
            pagina === "produtos" ? "bg-purple-400" : "hover:bg-purple-600"
          }`}
        >
          Produtos
        </button>
        <button
          onClick={() => setPagina("pedidos")}
          className={`text-white font-semibold py-3 rounded-md transition-colors duration-300 ${
            pagina === "pedidos" ? "bg-purple-400" : "hover:bg-purple-600"
          }`}
        >
          Pedidos
        </button>
        <button
          onClick={logOut}
          className="flex gap-2 text-white font-semibold py-3 rounded-md transition-colors duration-300 hover:bg-purple-600 "
        >
          <LogOut />
          <h2 className="font-bold">Sair</h2>
        </button>
      </nav>

      <main className="flex-grow p-10 bg-white rounded-l-3xl shadow-lg">
        {pagina === "clientes" && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-purple-900">
              Tabela Clientes
            </h1>
            <Clientes></Clientes>
          </div>
        )}
        {pagina === "produtos" && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-purple-900">
              Tabela Produtos
            </h1>
            <Produtos></Produtos>
          </div>
        )}
        {pagina === "pedidos" && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-purple-900">
              Tabela Pedidos
            </h1>
            <Pedidos></Pedidos>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
