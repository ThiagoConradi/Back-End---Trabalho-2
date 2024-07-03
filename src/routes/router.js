const { Router } = require("express");
const router = new Router();
const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');
const UsuarioDAO = require("../models/dao/UsuarioDAO");
const PostagemDAO = require("../models/dao/PostagemDAO");


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

// Simulação de posts
const posts = [{
        titulo: "Lógica de Programação",
        curtidas: 5,
        autor: "Thiago Büttner",
        horario: "10:00",
        descricao: "A lógica de programação é a base essencial para qualquer pessoa que deseje se aventurar no mundo da programação de computadores. Para facilitar a compreensão e o aprendizado dessa lógica, muitos iniciantes recorrem a ferramentas e linguagens amigáveis, como o Portugol Studio e a linguagem C.",
        comentarios: [{ autor: "Eduardo Bolsan", horario: "10:05", texto: "Muito bom" }, { autor: "Ramon Bobella", horario: "10: 10", texto: "Muito proveitoso" }]
    },

    {
        titulo: "Arquitetura de Software e Hardware",
        curtidas: 3,
        autor: "Pablo Southier",
        horario: "11:00",
        descricao: "A arquitetura de software, por outro lado, está relacionada à estrutura lógica e ao design dos programas e aplicativos que são executados em um sistema de computação. Isso envolve a organização de módulos de software, a comunicação entre eles e a maneira como os dados são processados e armazenados. A arquitetura de software desempenha um papel crucial na manutenção, escalabilidade e extensibilidade de sistemas de software. Projetar uma arquitetura de software sólida é fundamental para criar aplicativos robustos e flexíveis. A arquitetura de hardware se refere à estrutura física e ao design dos componentes eletrônicos que compõem um sistema de computação. Isso inclui processadores, memória, dispositivos de armazenamento, placas-mãe, periféricos e outros componentes físicos. A arquitetura de hardware desempenha um papel crítico na determinação da capacidade, desempenho e eficiência de um sistema. Compreender a arquitetura de hardware é fundamental para projetar e dimensionar sistemas de computação eficazes.",
        comentarios: [{ autor: "Guilherme Faccin", horario: "11:05", texto: "Legal" }]
    },

    {
        titulo: "Fundamentos UI/UX",
        curtidas: 8,
        autor: "Dionathan Luan de Vargas",
        horario: "12:00",
        descricao: "A UI, ou Interface do Usuário, refere-se à camada visual e interativa de um produto digital. Isso inclui elementos como botões, menus, cores, tipografia, layouts e todos os elementos visíveis com os quais os usuários interagem. O objetivo da UI é criar uma aparência atraente e funcional que facilite a navegação e a compreensão do sistema. O design de UI se concentra na estética e na usabilidade dos elementos visuais. A UX, ou Experiência do Usuário, abrange a experiência geral do usuário ao interagir com um produto ou sistema. Ela inclui fatores emocionais, cognitivos e práticos. A UX se preocupa com como os usuários se sentem, pensam e realizam tarefas ao usar um produto. Para criar uma boa UX, é fundamental compreender as necessidades, expectativas e comportamentos dos usuários e projetar o sistema de forma a atender a esses requisitos de forma eficiente e agradável. A Importância da Harmonia entre UI e UX: O sucesso de um produto digital depende da harmonia entre UI e UX. Uma interface bonita, mas confusa, pode frustrar os usuários, assim como uma interface funcional, mas pouco atraente, pode não cativar. Portanto, designers de UI/UX trabalham para criar designs visualmente atraentes que também são intuitivos e fáceis de usar.",
        comentarios: []
    }
];

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

module.exports = router;