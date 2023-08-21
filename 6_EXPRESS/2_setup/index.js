const express = require('express');
const app = express();
const port = 3000 // variavel de ambiente

const path = require('path');

const basePath = path.join(__dirname, 'templates');

app.get('/', (req, res) => {
    res.send('Olá mundo!!')
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})