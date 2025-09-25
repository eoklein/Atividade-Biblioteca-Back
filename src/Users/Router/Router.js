import { Router } from "express";
import { criarUsuario } from "./Users/Controller/Controller.js"
import { verifyUser } from "../../Middleware/auth.js";

const rotas = Router();

rotas.post("/", [verifyUser], criarUsuario);

export default rotas;