import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function criarUsuario(req, res) {
    try {
    const { nomeUsuario, senha, } = req.body;

    if (!nome || !senha) {
      return res.status(400).json({ erro: "Nome e senha são obrigatórios" });
    }

    const usuarioExistente = await prisma.user.findUnique({
      where: { nomeUsuario: nomeUsuario },
    });

    if (usuarioExistente) {
      return res.status(400).json({ erro: "Nome de usuário já existe" });
    }

    if (!senha || senha.length < 4) {
        return res
            .status(400)
            .json({ erro: "A senha deve ter pelo menos 4 caracteres" });
    }

    const totalUsuarios = await prisma.user.count();
    const isAdmin = totalUsuarios === 0;

    const novoUsuario = await prisma.user.create({
      data: {
        nomeUsuario: nomeUsuario,
        senha: senha,
        isAdmin,
      },
    });


    return res.status(201).json(novoUsuario);
  } catch (erro) {
    console.error(erro.message);
    return res.status(500).json({ erro: "Erro ao criar usuário" });
  }

}