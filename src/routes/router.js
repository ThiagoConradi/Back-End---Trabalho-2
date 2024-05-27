const { Router } = require("express");
const router = new Router();

router.get('/', (req, res) => {
  res.status(200).render("paginaPrincipal")
})

router.get('/login', (req, res) => {
  res.status(200).render("login")
})

router.get('/cadastroUsuario', (req, res) => {
  res.status(200).render("cadastroUsuario")
})

module.exports = router;

