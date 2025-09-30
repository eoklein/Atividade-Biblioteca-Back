import { Router } from "express";
import { verifyUser } from "../Middleware/auth.js";
import { listarLivros, criarLivro, atualizarLivro, deletarLivro, emprestarLivro, devolverLivro, detalhesLivro } from "../Controller/Books.js";
import { verifyAdmin } from "../Middleware/admin.js";

const rotasLivros = Router();

rotasLivros.use(verifyUser);

rotasLivros.get("/", listarLivros);

rotasLivros.get("/:id", detalhesLivro);

rotasLivros.post("/", [verifyAdmin], criarLivro);

rotasLivros.patch("/:id", [verifyAdmin], atualizarLivro);

rotasLivros.delete("/:id", [verifyAdmin], deletarLivro);

rotasLivros.post("/:id/emprestar", emprestarLivro);

rotasLivros.post("/:id/devolver", devolverLivro);

export default rotasLivros;