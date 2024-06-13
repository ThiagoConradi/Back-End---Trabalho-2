const express = require("express");
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars')
const router = require("./routes/router.js")
const jwt = require('jsonwebtoken'); // 'jsonwebtoken' é usado para criar e verificar tokens JWT
const cookieParser = require('cookie-parser'); // 'cookie-parser' é um middleware que analisa os cookies anexados ao objeto de solicitação do cliente


class App {
    constructor() {
        this.server = express();
        this.middleweres();
        this.routes();
    }

    middleweres() {
        // Deixando uma pasta pública para usar CSS, imagens estáticas e Javascript
        this.server.use(express.static('public'))

        // Configura o body-parser
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));

        // Configurando o Handlebars como mecanismo de template
        this.server.engine('handlebars', engine())
        this.server.set('view engine', 'handlebars')
        this.server.set("views", "./src/views")

        // Configurando o cookie-parser para analisar os cookies
        this.server.use(cookieParser());

        // Configurando um middleware para verificar o token JWT
        this.server.use((req, res, next) => {
            res.set('Cache-Control', 'no-store') // Instrui ao navegador a não armazenar a página em cache
            let token = req.cookies["tokenJWT"]; // Obtendo o token do cookie
            jwt.verify(token, 'chave_secreta', (err, user) => { // Verificando o token
                if (user) req.id = user.id // Se o token for válido, o ID do usuário é anexado ao objeto de solicitação
            });
            console.log("token", token)
            next() // Chamando a próxima função no pipeline do middleware
        })
    }

    // Função para configurar as rotas
    routes() {
        this.server.use(router) // Usando o router importado para configurar as rotas
    }
}

// Exportando uma nova instância da classe App
module.exports = new App().server;