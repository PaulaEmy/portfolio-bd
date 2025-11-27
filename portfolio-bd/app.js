const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const routes = require('./routes/index');
const seed = require('./seed');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

sequelize.sync({ force: true })
  .then(async () => {
    console.log("Banco sincronizado!");

    await seed(); // agora funciona

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch(err => console.log(err));
  