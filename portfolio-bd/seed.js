const sequelize = require("./config/database");
const Aluno = require("./models/Aluno");
const Disciplina = require("./models/Disciplinas");
const Projeto = require("./models/Projetos");

async function seed() {
  try {
    await sequelize.sync({ force: true });

    console.log("Banco recriado. Inserindo dados...");

    await Aluno.create({
      id: 1,
      nome: "Paula Emy Tamay",
      curso: "DSM",
      instituicao: "FATEC",
      ano_ingresso: "2025",
      email: "paulaemy8262999@gmail.com",
      telefone: "12982355367"
    });

    await Disciplina.bulkCreate([
      { id: 1, nome: "Design Digital", cursada: true },
      { id: 2, nome: "Desenvolvimento Web I", cursada: true },
      { id: 3, nome: "Engenharia de Software I", cursada: true },
      { id: 4, nome: "Sistemas Operacionais e Rede de Computadores", cursada: true },
      { id: 5, nome: "Algoritmos e Lógica de Programação", cursada: true },
      { id: 6, nome: "Modelagem de Banco de Dados", cursada: true },
      { id: 7, nome: "Banco de Dados Relacional", cursada: false },
      { id: 8, nome: "Estrutura de Dados", cursada: false },
      { id: 9, nome: "Técnicas de Programação", cursada: false },
      { id: 10, nome: "Engenharia de Software II", cursada: false },
      { id: 11, nome: "Matemãtica para Computação", cursada: false },
      { id: 12, nome: "Desenvolvimento Web II", cursada: false }
    ]);

    await Projeto.bulkCreate([
      {
        id: 1,
        titulo: "Site de avaliação de projetos para Feira Técnica",
        descricao:
          "Projeto feito para meu TCC do Colégio UNIVAP Centro. Tem como objetivo a criação de um site com a intenção de facilitar a organização dos projetos e permitir que professores e visitantes possam avaliar digitalmente os trabalhos da feira técnica.",
        link: "https://github.com/PaulaEmy/tcc",
        concluido: true
      },
      {
        id: 2,
        titulo: "Site para análise de dados de exportação e importação do estado de SP",
        descricao:
          "Primeira API para a FATEC. O objetivo desse site é permitir que qualquer usuário visualize os dados de importações e exportações do estado de SP com gráficos e filtros a fim de facilitar o entendimento das informações.",
        link: "https://github.com/Kernel-Panic-FatecSjc/KernelPanic",
        concluido: true
      },
      {
        id: 3,
        titulo: "Site para centralizar e padronizar processos da Newe Log",
        descricao:
          "Projeto desenvolvido para a API (Aprendizagem por Projeto Integrado) do 2° Semestre do curso Desenvolvimento de Software Multiplataforma (DSM) em parceria com a empresa Newe Log, no projeto de Plataforma Integrada de Gestão.",
        link: "https://github.com/Kernel-Panic-FatecSjc/KernelPanic-2DSM-API",
        concluido: true
      }
    ]);

    console.log("Seeds inseridos com sucesso!");

  } catch (error) {
    console.error("Erro ao rodar seeds:", error);
  }
}

module.exports = seed;
