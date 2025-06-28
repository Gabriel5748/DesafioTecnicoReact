import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const email = "gabriel@gmail.com";
  const senha = "123";
  const navigate = useNavigate();

  let [_email, setEmail] = useState("");
  let [_password, setPassword] = useState("");

  function Logar(emailInput, passwordInput) {
    if (emailInput !== email || passwordInput !== senha) {
      alert("Email e/ou senha incorretos");
      setEmail("");
      setPassword("");
    } else {
      localStorage.setItem("token", true);
      navigate("/home");
    }
  }

  return (
    <div className="bg-gradient-to-tr from-purple-700 via-purple-500 to-purple-400 flex items-center justify-center min-h-screen p-4">
      <div className="bg-purple-900 bg-opacity-90 rounded-lg shadow-xl w-full max-w-sm p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-white tracking-wide">
          Login
        </h1>
        <input
          type="email"
          placeholder="Informe o email"
          className="w-full px-4 py-3 rounded-md bg-purple-700 text-white placeholder-purple-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={_email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Informe a senha"
          className="w-full px-4 py-3 rounded-md bg-purple-700 text-white placeholder-purple-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={_password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
        <button
          onClick={() => Logar(_email, _password)}
          className="w-full flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold rounded-md py-3 shadow-md transition-colors duration-200"
          type="button"
        >
          <LogIn size={20} />
          <span>Logar</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
