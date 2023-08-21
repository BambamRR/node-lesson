const express = require("express");
const exphbs = require("express-handlebars");
const port = null || 3000;
const mysql = require("mysql2");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

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

app.get("books/:id", async (req, res) => {
  const id  = req.params.id;

  const sql = `SELECT * FROM book WHERE id = ${id}`;

  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    const book = result;

    res.render("book", { book });
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "roinuj33",
  database: "nodemysql2",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Conectou ao MySQL");
  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
});
