const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/', function (req, res) {
  const user = {
    name: "Leo",
    surname: "Richard",
    age: "29"
  }

  const palavra = "teste "
  const auth = false;

  const approved = false;

  res.render('home', {user: user, palavra, auth, approved});
});

app.listen(3000, ()=> {
  console.log("Servidor rodando na porta 3000")
});
