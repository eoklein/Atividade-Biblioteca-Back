import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyUser(req,res,next) {
    try {
        const auth = req.headers.autorization;

        if (!auth || !auth.startsWith("Basic ")) {
            return res.status(401).json({ mensagem: "Token precisa ser Basic"});
        }

        const base64Token = auth.split(" ")[1];

        const [nomeUsuario, senha] = atob(base64Token).split(":");

        const user = await prisma.user.findUnique({
            where: { nomeUsuario },
        });

        if (!user) {
            return res.status(401).json({ mensagem: "Usuario não encontrado"});
        }

        if (senha !== user.senha) {
            return res.status(401).json({ mensagem: "Senha inválida"});
        }

        req.user = user;
        next();
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: "Erro na autenticação" });
    }
}
