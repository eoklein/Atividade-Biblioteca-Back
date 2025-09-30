import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyAdmin(req, res, next) {
  try {
    const user = req.user;
        
    if (!user) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }

    const usuarioBanco = await prisma.users.findUnique({
      where: { id: user.id }
    });

    if (!usuarioBanco) {
      return res.status(401).json({ mensagem: "Usuário não encontrado" });
    }

    if (!usuarioBanco.isAdmin) {
      return res.status(403).json({ mensagem: "Acesso negado: Apenas administradores" });
    }

    next();

  } catch (error) {
    console.error("Erro na autorização:", error.message);
    return res.status(500).json({ mensagem: "Erro na autorização" });
  }
}