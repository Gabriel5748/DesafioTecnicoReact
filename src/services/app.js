import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, resp) => {
  resp.send("Servidor Inicializado");
});

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
