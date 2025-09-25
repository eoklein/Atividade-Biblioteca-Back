import { Router } from "express";

const rotasLivros = Router();

rotasLivros.get("/"), listarLivros;

rotasLivros.get("/:id"), buscarLivro;

rotasLivros.post("/"), criarLivro;

rotasLivros.patch("/:id"), atualizarLivro;

rotasLivros.delete("/:id"), deletarLivro;

rotasLivros.post("/:id/emprestar"), emprestarLivro;

rotasLivros.post("/:id/devolver"), devolverLivro;

export default rotasLivros;