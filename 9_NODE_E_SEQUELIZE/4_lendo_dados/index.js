const express = require("express");
const exphbs = require("express-handlebars");
const port = null || 3000;
const conn = require("./db/conn");
const User = require("./model/User");
const sequelize = require("./db/conn");

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

app.get("/users/create", (req, res) => {
  res.render("adduser");
});

app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  await User.create({ name, occupation, newsletter });
  console.log(req.body);

  res.redirect("/");
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: {id: id} });

  res.render('userview', { user })
});

app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({where: {id: id}})  

  res.redirect('back')
})

app.get("/", async function (req, res) {
  const users = await User.findAll({ raw: true });
  console.log(users);
  res.render("home", { users: users });
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
    console.log("Conected on port 3000");
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(port, () => {
//   console.log(`Servidor iniciado na porta ${port}`);
// });
