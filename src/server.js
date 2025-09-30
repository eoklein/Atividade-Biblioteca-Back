import express from "express";
import rotas from "./Routers/Auth.js";
import rotasLivros from "./Routers/Books.js";

const app = express();

app.use(express.json());

app.use('/Auth', rotas);

app.use('/Books', rotasLivros);

app.listen(3000, ()=>{
  console.log("O servidor está rodando na porta 3000 🚀");
});