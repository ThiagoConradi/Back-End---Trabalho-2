const { Router } = require("express");
const router = new Router();
const Usuario = require("../models/Usuario");
const Postagem = require("../models/Postagem")
const jwt = require('jsonwebtoken');
const UsuarioDAO = require("../models/dao/UsuarioDAO");
const PostagemDAO = require("../models/dao/PostagemDAO");
const RespostaDAO = require("../models/dao/RespostaDAO");



// Variável para armazenar o usuário logado
let usuarioLogado;

// Função assíncrona para obter o usuário logado
// Esta função busca o usuário no banco de dados usando o ID da requisição
async function getUsuarioLogado(req) {
    usuarioLogado = await UsuarioDAO.getById(req.id);
}

router.get('/', async(req, res) => {
    await getUsuarioLogado(req)
    let postagens = await PostagemDAO.getAll()

    if (postagens) postagens = postagens.map(postagens => postagens.get())

    const idPost = req.query.idPost;
    let postAberto

    if (idPost) {
        postAberto = await PostagemDAO.getById(idPost)
        if (postAberto) {
            postAberto = postAberto.get()
            postAberto.autor = await (await UsuarioDAO.getById(postAberto.idUsuario)).get().nome
            postAberto.dataHora = postAberto.dataHora.toLocaleString('pt-BR', { timezone: 'UTC' });
            let comentarios = await (RespostaDAO.getAllbypost(postAberto))
            for (let i = 0; i < comentarios.length; i++) {
                comentarios[i] = comentarios[i].get()
                let comentador = await UsuarioDAO.getById(comentarios[i].idUsuario)
                comentarios[i].autor_comentario = comentador.get().nome
                console.log(comentarios[i])
            }
            postAberto.comentarios = comentarios
        }
    }

    if (usuarioLogado) {
        res.status(200).render("paginaPrincipal", {
            usuarioLogado: usuarioLogado.get(),
            postagens: postagens,
            postAberto: postAberto
        })
    } else {
        res.status(200).render("paginaPrincipal", { postagens: postagens, postAberto: postAberto })
    }


})

router.get('/login', (req, res) => {
    res.status(200).render("login")

    if (usuarioLogado) {
        res.status(404).send("Usuário já está logado")
    } else {
        res.status(200).render("paginaPrincipal")
    }
})

router.post('/logar', async(req, res) => {

    let email = req.body.email;
    let senha = req.body.password;

    const usuario = await Usuario.findOne({ where: { email: email } });

    if (!usuario || senha !== usuario.senha) {
        return res.status(200).render('login', {
            message: 'Usuário ou senha inválidos'
        });
    }

    const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: '1H' });

    res.cookie("tokenJWT", token);
    return res.redirect(301, '/');
})

// Definindo a rota GET para deslogar o usuário
// Esta rota limpa o cookie do token JWT e redireciona o usuário para a página inicial
router.get('/deslogar', (req, res) => {
    res.clearCookie('tokenJWT');
    return res.redirect(301, '/');
});

router.get('/cadastroUsuario', (req, res) => {
    res.status(200).render("cadastroUsuario")
})

router.post('/cadastrar', async(req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    const usuario = await Usuario.findOne({ where: { email: email } });

    if (usuario) {
        res.status(404).send("Usuário já cadastrado")
    } else {
        await UsuarioDAO.create({ nome, email, senha })
        res.status(200).render("paginaPrincipal")
    }
})

router.get('/paginaPrincipal', (req, res) => {
    const idPost = req.query.post;
    if (idPost) {
        let post = posts[idPost - 1]
        if (post) {
            res.status(200).render('paginaPrincipal', { posts, post });
        } else {
            res.status(404).send('Post não encontrado');
        }
    } else {
        res.status(200).render('paginaPrincipal', { posts });
    }
});

//postar
router.post('/criar', async(req, res) => {
    await getUsuarioLogado(req);

    if (usuarioLogado) {
        const { titulo, conteudo } = req.body;
        try {
            newPostagem = await PostagemDAO.create({
                idUsuario: usuarioLogado.id,
                titulo,
                conteudo,
                dataHora: new Date()
            });
            res.status(201).redirect("/");

        } catch (error) {
            res.status(500).send({ error: 'erro ao criar postagem' })
        }
    } else {
        res.redirect('/login');
    }
});

//comentar
router.post('/postage/comentar/:id', async(req, res) => {
    await getUsuarioLogado(req);

    if (usuarioLogado) {

        try {
            newResposta = await RespostaDAO.create({
                idUsuario: usuarioLogado.id,
                idPostagem: usuarioLogado,
                conteudo,
                dataHora: new Date()
            })
            res.status(200).redirect("/?post=" + idPostagem);

        } catch (error) {
            res.status(500).send({ error: 'erro ao fazer um comentário' })
        }
    } else {
        res.redirect('/login');
    }
})

module.exports = router;