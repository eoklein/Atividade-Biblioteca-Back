import { Router } from "express";
import { verifyUser } from "../Middleware/auth.js";
import { listarLivros, criarLivro, atualizarLivro, deletarLivro, borrow, Return, detalhesLivro } from "../Controller/Books.js";
import { verifyAdmin } from "../Middleware/admin.js";

const rotasLivros = Router();

rotasLivros.use(verifyUser);

rotasLivros.get("/", listarLivros);

rotasLivros.get("/:id", detalhesLivro);

rotasLivros.post("/", [verifyAdmin], criarLivro);

rotasLivros.patch("/:id", [verifyAdmin], atualizarLivro);

rotasLivros.delete("/:id", [verifyAdmin], deletarLivro);

rotasLivros.post("/:id/borrow", borrow);

rotasLivros.post("/:id/return", Return);

export default rotasLivros;