const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/post', (req, res) => {

  const post = {
    title: "Postagem do Blog",
    overview: "JAVASCRIPT",
    text: "Teste de objeto Javascript"
  }

  res.render('blogpost', {post})
})

app.get('/dashboard', (req, res) => {

  const items = ["item a,item b,item c,item d "]
  res.render('dashboard', {items})
})

app.get('/', function (req, res) {
  const user = {
    name: "Leo",
    surname: "Richard",
    age: "29"
  }

  const palavra = "teste "
  const auth = true;

  const approved = true;

  res.render('home', {user: user, palavra, auth, approved});
});

app.listen(3000, ()=> {
  console.log("Servidor rodando na porta 3000")
});
