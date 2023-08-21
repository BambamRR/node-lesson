const express = require('express')
const exphbs = require('express-handlebars')
const port = null || 3000;
const mysql = require('mysql2')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const app = express()

app.use(express.static('public'))

const hbs = exphbs.create([
    'views/partials'
])
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'roinuj33',
    database: 'nodemysql2'
})

conn.connect(function (err) {
    if(err){
        console.log(err)
    }
    console.log("Conectou ao MySQL")
    app.listen(port, () => {
        console.log(`Servidor iniciado na porta ${port}`)
    })
})

