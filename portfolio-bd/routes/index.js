const express = require('express');
const Aluno = require('../models/Aluno');
const Disciplina = require('../models/Disciplinas');
const Projeto = require('../models/Projetos');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const aluno = await Aluno.findOne();

    res.render('index', {
      nome: aluno ? aluno.nome : "Visitante"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar página inicial");
  }
});


//ALUNO

router.post('/aluno', async (req, res) => {
  const aluno = await Aluno.create(req.body);
  res.status(201).json(aluno);
});

router.get('/alunos', async (req, res) => {
  const alunos = await Aluno.findAll();
  res.json(alunos);
});

router.get('/aluno/:id', async (req, res) => {
  const cliente = await Aluno.findByPk(req.params.id);
  res.json(cliente);
});

router.put('/aluno/:id', async (req, res) => {
  await Aluno.update(req.body, { where: { id: req.params.id } });
  res.status(204).send();
});

router.delete('/aluno/:id', async (req, res) => {
  await Aluno.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

router.get('/sobre', async (req, res) => {
  try {
    const aluno = await Aluno.findOne();

    res.render('sobre', {
      nome: aluno.nome,
      curso: aluno.curso,
      instituicao: aluno.instituicao,
      ano_ingresso: aluno.ano_ingresso,
      email: aluno.email,
      telefone: aluno.telefone
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar dados");
  }
});

//DISCIPLINAS

router.get('/disciplinas', async (req, res) => {
    try {
        const todas = await Disciplina.findAll();

        const disciplinas = {
            cursadas: todas.filter(d => d.cursada === true).map(d => d.nome),
            andamento: todas.filter(d => d.cursada === false).map(d => d.nome)
        };

        res.render('disciplinas', { disciplinas });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar disciplinas");
    }
});

//POST
router.post('/disciplinas', async (req, res) => {
    try {
        const nova = await Disciplina.create({
            nome: req.body.nome,
            cursada: req.body.status === "cursadas"
        });

        res.redirect('/disciplinas');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao adicionar disciplina");
    }
});


//DELETE
router.delete('/disciplinas', async (req, res) => {
    try {
        await Disciplina.destroy({ where: { nome: req.body.nome } });
        res.json({ message: "Disciplina removida com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao remover disciplina" });
    }
});


// Mover de andamento → cursadas
router.post('/disciplinas/mover', async (req, res) => {
    try {
        await Disciplina.update(
            { cursada: true },
            { where: { nome: req.body.nome } }
        );

        res.redirect('/disciplinas');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao mover disciplina");
    }
});

//PROJETOS

router.get('/projetos', async (req, res) => {
  try {
    const projetos = await Projeto.findAll({ order: [['id', 'DESC']] });
    res.render('projetos', { projetos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar projetos");
  }
});

//POST
router.post('/projetos', async (req, res) => {
  try {
    await Projeto.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      link: req.body.link,
      concluido: false
    });
    res.redirect('/projetos');
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar projeto");
  }
});

//UPDATE
router.put('/projetos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Projeto.update(req.body, { where: { id } });
    res.json({ message: 'Atualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar projeto' });
  }
});

//DELETE
router.delete('/projetos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Projeto.destroy({ where: { id } });
    res.json({ message: 'Projeto deletado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar projeto' });
  }
});

// CONTATO
router.get('/contato', async (req, res) => {
  try {
    const contato = await Aluno.findOne({
      attributes: ['email', 'telefone'] 
    });

    if (!contato) {
      return res.render('contato', {
        email: "Nenhum email cadastrado",
        telefone: "Nenhum telefone cadastrado"
      });
    }

    res.render('contato', {
      email: contato.email,
      telefone: contato.telefone
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar dados");
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const totalDisciplinas = await Disciplina.count();
    const totalProjetos = await Projeto.count();
    const concluidos = await Projeto.count({ where: { concluido: true } });

    // Busca apenas o campo tecnologias
    const projetos = await Projeto.findAll({
      attributes: ['tecnologias']
    });

    let mapaTec = {};

    projetos.forEach(p => {
      if (!p.tecnologias) return;

      const lista = p.tecnologias; // já é json array

      lista.forEach(t => {
        mapaTec[t] = (mapaTec[t] || 0) + 1;
      });
    });

    const tecnologias = Object.keys(mapaTec)
      .sort((a, b) => mapaTec[b] - mapaTec[a])
      .slice(0, 8);

    res.render('dashboard', {
      totalDisciplinas,
      totalProjetos,
      concluidos,
      tecnologias
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar dashboard");
  }
});



module.exports = router;
