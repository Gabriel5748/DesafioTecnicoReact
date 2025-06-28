import { redirect } from "react-router-dom";

// Voltar aqui depois

const IsAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (token) throw redirect("/home");
  return null;
};

export default IsAuthenticated;
