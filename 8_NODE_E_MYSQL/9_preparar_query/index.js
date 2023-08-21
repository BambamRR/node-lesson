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

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", async (req, res) => {
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pagesqty}')`;
  const values = [title, pagesqty];

  try {
    conn.query(sql, function (err) {
      console.log(err);
    });
    console.log("Livros inseridos no sistema com sucesso");
  } catch (error) {
    console.log(error);
  }

  res.render("home");
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    const books = data;
    res.render("books", { books });
  });
});

app.get("/book/:id", async (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    const book = result[0];

    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  const title = req.body.title;
  const pageqty = req.body.pageqty;

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    res.render("editbook", { book });
  });
});

app.post("/books/sendEdit", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sqlUpdate = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id} `;

  conn.query(sqlUpdate, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/books')
  });
});

app.post('/books/remove/:id',(req, res) => {
  const id = req.body.id
  const sql = `DELETE FROM books WHERE id = ${id}`

  conn.query(sql, function(err){
    if(err){
      console.log(err)
      return
    }
    res.redirect('/books')
  })
} )



  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
