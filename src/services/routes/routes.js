import express from "express";

const router = express.Router();
import clienteController from "../controllers/clientes_controller.js";
import produtoController from "../controllers/produtos_controller.js";
import pedidoController from "../controllers/pedidos_controller.js";

// ---------GET----------

// router.get("/");
// router.get("/home");
router.get("/clientes", clienteController.listarClientes);
router.get("/produtos", produtoController.listarProdutos);
router.get("/pedidos", pedidoController.listarPedidos);

// ---------POST----------
router.post("/clientes", clienteController.adicionarClientes);
router.post("/produtos", produtoController.adicionarProdutos);
router.post("/pedidos", pedidoController.adicionarPedidos);

// ---------PUT----------
router.put("/clientes/:id", clienteController.atualizarClientes);
router.put("/produtos/:id", produtoController.atualizarProdutos);
router.put("/pedidos/:id", pedidoController.atualizarPedidos);

// ---------DELETE----------
router.delete("/clientes/:id", clienteController.removerClientes);
router.delete("/produtos/:id", produtoController.removerProdutos);
router.delete("/pedidos/:id", pedidoController.removerPedidos);

export default router;
