const res = require('express/lib/response');
const Resposta = require('../Resposta'); // Importe o modelo do usuário

class RespostaDAO {
    // Cria e persiste uma resposta
    async create({ idUsuario, idPostagem, conteudo, dataHora, }) {
        let newResposta;
        try {
            newResposta = await Resposta.create({ idUsuario, idPostagem, conteudo, dataHora })
        } catch (error) {
            console.error('Erro ao criar resposta:', error);
        } finally {
            return newResposta; // Retorna a resposta criada
        }
    }

    // Busca todas as respostas do banco de dados
    async getAll() {
        let respostas;
        try {
            respostas = await Resposta.findAll();
        } catch (error) {
            console.error('Erro ao buscar respostas:', error);
        } finally {
            return respostas;
        }
    }

    // Busca um usuário no banco de dados pela sua ID
    async getById(RespostaId) {
        let respostas;
        try {
            respostas = await Resposta.findByPk(RespostaId);
        } catch (error) {
            console.error('Erro ao buscar resposta por ID:', error);
        } finally {
            return respostas;
        }
    }

    // Atualiza uma resposta no banco de dados
    async update(RespostaId, respostaAtualizado) {
        let respostas;
        try {
            respostas = await Resposta.findByPk(RespostaId);
            if (respostas) {
                respostas.dataHora = respostaAtualizado.dataHora || respostas.dataHora; // Atualiza o campo de data e hora se ele foi alterado
                await respostas.save(); // Salve as alterações
            } else {
                console.log('Resposta não encontrada para atualização.');
            }
        } catch (error) {
            console.error('Erro ao atualizar resposta:', error);
        } finally {
            return respostas;
        }
    }

    // Exclui um usuário do banco de dados
    async delete(RespostaId) {
        let deletado = false
        try {
            const respostas = await Resposta.findByPk(RespostaId);
            if (respostas) {
                await respostas.destroy()
                deletado = true;
            } else {
                console.error('Resposta não encontrada para exclusão.');
            }
        } catch (error) {
            console.error('Erro ao excluir resposta:', error);
        } finally {
            return deletado;
        }
    }
}

module.exports = new RespostaDAO();
