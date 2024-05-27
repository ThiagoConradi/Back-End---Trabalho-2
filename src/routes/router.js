const { Router } = require("express");
const router = new Router();

router.get('/', (req, res) => {
  res.status(200).render("paginaPrincipal")
})

const produtosRoutes = require('./produtos');
router.use('/produtos', produtosRoutes);

module.exports = router;
