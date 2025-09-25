import { Router } from "express";

const rotas = Router();

rotas.post("/"), criarUsuario;

export default rotas;