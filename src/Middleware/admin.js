import { PrismaClient } from "@prisma/client";
 
export function vefiryAdmin(req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ mensagem: "Acesso negado: Admins apenas" });
    }

    next();
  } catch (erro) {
    console.error(erro.message);
    return res.status(500).json({ mensagem: "Erro na autorização" });
  }
}