import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function criarUsuario(req, res) {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      return res.status(400).json({ erro: "Nome e senha são obrigatórios" });
    }

    if (senha.length < 4) {
      return res.status(400).json({ erro: "A senha deve ter pelo menos 4 caracteres" });
    }

    const usuarioExistente = await prisma.users.findFirst({
      where: { nome: nome },
    });

    if (usuarioExistente) {
      return res.status(400).json({ erro: "Nome de usuário já existe" });
    }

    const totalUsuarios = await prisma.users.count();
    const isAdmin = totalUsuarios === 0;

    const novoUsuario = await prisma.users.create({
      data: {
        nome: nome,
        senha: senha,
      },
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
        usuario: {
          id: novoUsuario.id
        }
    });

    } catch (erro) {
      console.error("Erro ao criar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao criar usuário" });
    }
}