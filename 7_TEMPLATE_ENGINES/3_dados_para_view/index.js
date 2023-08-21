const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  const user = {
    name: "Leo",
    surname: "Richard",
    age: "29"
  }

  const palavra = "teste "

  res.render('home', {user: user, palavra: palavra});
});

app.listen(3000, ()=> {
  console.log("Servidor rodando na porta 3000")
});
