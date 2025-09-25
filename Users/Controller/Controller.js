import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let ultimoId = 0;

async function criarUsuario(req, res) {

    try {
    const { nome, senha, } = req.body;

    const usuarioExistente = await prisma.users.findUnique({
      where: { username: nomeUsuario },
    });

    if (usuarioExistente) {
      return res.status(400).json({ erro: "Nome de usuário já existe" });
    }

    if (!senha || senha.length < 4) {
        return res
            .status(400)
            .json({ erro: "A senha deve ter pelo menos 4 caracteres" });
    }

    const totalUsuarios = await prisma.users.count();
    const isAdmin = totalUsuarios === 0;

    const novoUsuario = await prisma.users.create({
      data: {
        username: nomeUsuario,
        password: senha,
        isAdmin,
      },
    });


    return res.status(201).json(novoUsuario);
  } catch (erro) {
    console.error(erro.message);
    return res.status(500).json({ erro: "Erro ao criar usuário" });
  }

}