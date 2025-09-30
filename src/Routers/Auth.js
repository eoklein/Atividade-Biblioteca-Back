import { Router } from "express";
import { criarUsuario } from "../Controller/User.js";
import { verifyUser } from "../Middleware/auth.js";

const rotas = Router();

rotas.post("/Register", criarUsuario);

export default rotas;