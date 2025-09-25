import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function detalhesLivro(req, res) {
    try {
        const { id } = req.params;
        const livro = await prisma.books.findUnique({
            where: { id: Number(id) },
            select: { id: true,
                 titulo: true,
                 autor: true,
                 avaliable: true 
            },
        });

        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado"});
        }

        res.json(livro);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ erro: "Erro ao buscar livro"});
    }
}

async function listarLivros(req, res) {
    try {
        const livros = await prisma.books.findMany({
            select: {
                id: true,
                titulo: true,
                autor: true,
                available: true,
            },
        });

        return res.json(livros);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao listar livros"});
    }
}

async function criarLivro(req, res) {

    try {
        const { titulo, autor } = req.body;
        const usuario = req.user;

        if (!usuario.isAdmin) {
            return res.status(403).json({ erro: "Acesso negado" });
        }

        if (!titulo || !autor) {
            return res.status(400).json({ erro: "Todos os campos devem ser preenchidos" });
        }

        const novoLivro = await prisma.books.create({
            data: {
                titulo,
                autor,
            },
        });

        return res.status(201).json(novoLivro);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao criar livro" });
    }
}

async function atualizarLivro(req, res) {
    try{
        const { id } = req.params;
        const { titulo, autor, available } = req.body;
        const usuario = req.user;

        if (!usuario.isAdmin) {
            return res.status(403).json({ erro: "Acesso negado" });
        }

        const livroAtualizado = await prisma.books.update({
            where: { id: Number(id) },
            data: {
                titulo,
                autor,
                available,
            },
        });

        return res.json(livroAtualizado);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao atualizar livro" });
    }
}

async function deletarLivro(req, res) {
    try{
        const { id } = req.params;
        const usuario = req.user;

        if (!usuario.isAdmin) {
            return res.status(403).json({ erro: "Acesso negado" });
        }

        await prisma.books.delete({
            where: { id: Number(id) },
        });

        return res.json({ mensagem: "Livro deletado com sucesso" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao deletar livro" });
    }
}

async function emprestarLivro(req, res) {
    try{
        const { id } = req.params;
        const livro = await prisma.books.findUnique({
            where: { id: Number(id) },
        });
        
        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        if ('!livro.available') {
            return res.status(400).json({ erro: "Livro indisponível" });
        }

        const livroAtualizado = await prisma.books.update({
            where: { id: Number(id) },
            data: {
                available: false,
            },
        });

        return res.json({ mensagem: "Livro emprestado com sucesso", livro: livroAtualizado });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao emprestar livro" });
    }
}

async function devolverLivro(req, res) {
    try{
        const { id } = req.params;
        const livro = await prisma.books.findUnique({
            where: { id: Number(id) },
        });
        
        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        if (livro.available) {
            return res.status(400).json({ erro: "Livro indisponível" });
        }

        const livroAtualizado = await prisma.books.update({
            where: { id: Number(id) },
            data: {
                available: true,
            },
        });
        
        return res.json({ mensagem: "Livro devolvido com sucesso", livro: livroAtualizado });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao devolver livro" });
    }
}

