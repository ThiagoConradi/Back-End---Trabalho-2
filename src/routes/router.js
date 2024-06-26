const { Router } = require("express");
const router = new Router();
const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');
const UsuarioDAO = require("../models/dao/UsuarioDAO");

// Variável para armazenar o usuário logado
let usuarioLogado;

// Função assíncrona para obter o usuário logado
// Esta função busca o usuário no banco de dados usando o ID da requisição
async function getUsuarioLogado(req) {
    usuarioLogado = await UsuarioDAO.getById(req.id);
}

router.get('/', async(req, res) => {
    await getUsuarioLogado(req)
    if (usuarioLogado) {
        res.status(200).render("paginaPrincipal", {
            usuarioLogado: usuarioLogado.get()
        })
    } else {
        res.status(200).render("paginaPrincipal")
    }
})

router.get('/login', (req, res) => {
    res.status(200).render("login")
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
    console.log("token:", token)

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

module.exports = router;