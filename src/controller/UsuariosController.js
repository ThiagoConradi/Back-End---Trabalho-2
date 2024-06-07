const Usuario = require("../models/usuario")
const UsuarioDAO = require('../models/dao/UsuarioDAO');

class UsuariosController {
    // Cria um novo usuário (CREATE)
    async create(req, res) {
        let nome = req.body.name;
        let email = req.body.email;
        let senha = req.body.password;

        let usuario = await UsuarioDAO.create({ nome, email, senha });
        console.log(usuario)
        // Faz o response para o browser
        if (usuario)
            res.status(201).render("paginaPrincipal")
        else
            res.status(500).json({ message: "Não foi possível criar um usuário" })
    }
}
module.exports = new UsuariosController();
