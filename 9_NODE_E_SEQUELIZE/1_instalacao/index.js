const express = require("express");
const exphbs = require("express-handlebars");
const port = null || 3000;
const conn = require('./db/conn')
const app = express();

app.use(express.static("public"));

const hbs = exphbs.create(["views/partials"]);
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get('/users/create', (req, res) => {
  res.render('adduser');
})

app.get('/', function (req, res) {
  res.render('home');
})

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
