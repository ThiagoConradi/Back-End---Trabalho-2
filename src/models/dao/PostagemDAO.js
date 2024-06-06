const Postagem = require('../Postagem'); // Importe o modelo da postagem

class PostagemDAO {
  // Cria e persiste uma postagem
  async create({ idUsuario, titulo, conteudo, dataHora }) {
    let newPostagem;
    try {
      newPostagem = await Postagem.create({ idUsuario, titulo, conteudo, dataHora });
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    } finally {
      return newPostagem; // Retorne a postagem criada
    }
  }

  async getAll() {
    let postagem;
    try {
      postagem = await Postagem.findAll();
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    } finally {
      return postagem;
    }
  }

  async getById(userId) {
    let postagem;
    try {
      postagem = await Postagem.findByPk(userId);
    } catch (error) {
      console.error('Erro ao buscar postagens por ID:', error);
    } finally {
      return postagem;
    }
  }
}

module.exports = new PostagemDAO();
