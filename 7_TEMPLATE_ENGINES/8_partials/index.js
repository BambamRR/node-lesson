const express = require('express');
const exphbs = require('express-handlebars');

const app = express()
const hbs = exphbs.create({
  partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/post', (req, res) => {

  const post = {
    title: "Postagem do Blog",
    category: "JAVASCRIPT",
    text: "Teste de objeto Javascript"
  }

  res.render('blogpost', {post})
})

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: 'Aprender NodeJS',
      category: 'Javascript',
      body: 'teste',
      comments: 4
    
  },   {
    title: 'Aprender php',
    category: 'php',
    body: 'teste',
    comments: 6
  
},   {
  title: 'Aprender Java',
  category: 'Java',
  body: 'teste',
  comments: 4

},
]
  
  res.render('blog', {posts})
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
