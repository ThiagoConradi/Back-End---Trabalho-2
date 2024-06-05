const Curtida = require('../Curtida'); // Importe o modelo do usuário

class CurtidaDAO {
    // Cria e persiste uma curtida
    async create({ idUsuario, idPostagem }) {
        let newCurtida;
        try {
            newCurtida = await Curtida.create({ idPostagem, idUsuario })
        } catch (error) {
            console.error('Erro ao curtir a publicação:', error);
        } finally {
            return newCurtida; // Retorne a curtida criada
        }
    }

    // Busca uma curtida no banco de dados pela sua ID
    async getById(CurtidaId) {
        let curtida;
        try {
            curtida = await Curtida.findByPk(CurtidaId);
        } catch (error) {
            console.error('Erro ao procurar curtida:', error);
        } finally {
            return curtida;
        }
    }

    // Exclui uma curtida do banco de dados
    async delete(CurtidaId) {
        let deletado = false
        try {
            const curtida = await Curtida.findByPk(CurtidaId);
            if (curtida) {
                await curtida.destroy()
                deletado = true;
            } else {
                console.error('Curtida não encontrada para exclusão.');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        } finally {
            return deletado;
        }
    }
}

module.exports = new CurtidaDAO();

