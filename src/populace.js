const db = require('./config/database');
const PostagemDAO = require('./models/dao/PostagemDAO');
const UsuarioDAO = require('./models/dao/UsuarioDAO');
const CurtidaDAO = require('./models/dao/CurtidaDAO');
const RespostaDAO = require('./models/dao/RespostaDAO');


// Sincronize os modelos com o banco de dados
db.sequelize.sync({ force: true }).then(async () => {

  console.log('Inserindo dados de exemplo.');

  // Adicionando os usuários
  await UsuarioDAO.create({
    nome: 'Matthew Hettinger',
    email: 'matthewh@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Kristin Sykes',
    email: 'kristins@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Clement Merrifield',
    email: 'clementm@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Tommy Blackburn',
    email: 'tommyb@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Agnes Walker',
    email: 'agnesw@example.com',
    senha: 'senha123',
  })

  await UsuarioDAO.create({
    nome: 'Thiago Buttner',
    email: 'thiagobuttner@gmail.com',
    senha: 'thiagodograu123',
  })

  await UsuarioDAO.create({
    nome: 'Pablo Henrique Southier',
    email: 'pablinhosouthier@gmail.com',
    senha: 'showdebola',
  })

  await UsuarioDAO.create({
    nome: 'Dionathan Vargas',
    email: 'dionathanvargas@yahoo.com',
    senha: 'cabelo',
  })

  await UsuarioDAO.create({
    nome: 'Sérgio Betorneira',
    email: 'sergiobetorneira@hotmail.com',
    senha: 'betorneiragiratoria',
  })

  await UsuarioDAO.create({
    nome: 'Chucrute',
    email: 'gustavodebos@gmail.com',
    senha: 'gustavopixaim',
  })

  // Adicionando as postagens
  await PostagemDAO.create({
    idUsuario: 1,
    titulo: "Um post",
    conteudo: "Conteúdo de um post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 2,
    titulo: "Segundo post",
    conteudo: "Conteúdo do segundo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 3,
    titulo: "Terceiro post",
    conteudo: "Conteúdo do terceiro post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 4,
    titulo: "Quarto post",
    conteudo: "Conteúdo do quarto post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 5,
    titulo: "Quinto post",
    conteudo: "Conteúdo do quinto post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 6,
    titulo: "Sexto post",
    conteudo: "Conteúdo do sexto post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 7,
    titulo: "Sétimo post",
    conteudo: "Conteúdo do sétimo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 8,
    titulo: "Oitavo post",
    conteudo: "Conteúdo do oitavo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 9,
    titulo: "Nono post",
    conteudo: "Conteúdo do nono post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await PostagemDAO.create({
    idUsuario: 10,
    titulo: "Décimo post",
    conteudo: "Conteúdo do décimo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  // Adicionando as Curtidas
  await CurtidaDAO.create({
    idUsuario: 1,
    idPostagem: 1
  })

  await CurtidaDAO.create({
    idUsuario: 2,
    idPostagem: 2
  })

  await CurtidaDAO.create({
    idUsuario: 3,
    idPostagem: 7
  })

  await CurtidaDAO.create({
    idUsuario: 3,
    idPostagem: 3
  })

  await CurtidaDAO.create({
    idUsuario: 4,
    idPostagem: 4
  })

  await CurtidaDAO.create({
    idUsuario: 5,
    idPostagem: 5
  })

  await CurtidaDAO.create({
    idUsuario: 6,
    idPostagem: 6
  })

  await CurtidaDAO.create({
    idUsuario: 7,
    idPostagem: 7
  })

  await CurtidaDAO.create({
    idUsuario: 8,
    idPostagem: 8
  })

  await CurtidaDAO.create({
    idUsuario: 9,
    idPostagem: 9
  })

  // Adicionando as Respostas
  await RespostaDAO.create({
    idUsuario: 1,
    idPostagem: 10,
    conteudo: "Resposta do décimo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 2,
    idPostagem: 9,
    conteudo: "Resposta do nono post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 3,
    idPostagem: 8,
    conteudo: "Resposta do oitavo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 4,
    idPostagem: 7,
    conteudo: "Resposta do sétimo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 5,
    idPostagem: 6,
    conteudo: "Resposta do sexto post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 6,
    idPostagem: 5,
    conteudo: "Resposta do quinto post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 7,
    idPostagem: 4,
    conteudo: "Resposta do quarto post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 8,
    idPostagem: 3,
    conteudo: "Resposta do terceiro post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 9,
    idPostagem: 2,
    conteudo: "Resposta do segundo post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  await RespostaDAO.create({
    idUsuario: 10,
    idPostagem: 1,
    conteudo: "Resposta do primeiro post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  console.log('Dados de exemplo criados com sucesso.');
  process.exit(0);
});
