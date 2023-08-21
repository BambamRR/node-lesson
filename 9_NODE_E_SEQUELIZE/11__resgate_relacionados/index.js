const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const conn = require("./db/conn");

const User = require("./models/User");
const Address = require("./models/Address");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.get("/", function (req, res) {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users);
      res.render("home", { users: users });
    })
    .catch((err) => console.log(err));
});

app.post("/address/create", async (req, res) => {
  const { UserId, street, number, city } = req.body;

  const address = {
    UserId,
    street,
    number,
    city,
  };

  await Address.create(address);

  res.redirect("back");
});

app.post("/address/delete", async (req, res) => {
  const id = req.body.id;

  await Address.destroy({ where: { id: id } });

  res.status(200).redirect('back')
});

app.get("/users/create", function (req, res) {
  res.render("adduser");
});

app.post("/users/create", function (req, res) {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  }

  User.create({ name, occupation, newsletter })
    .then(res.redirect("/"))
    .catch((err) => console.log(err));
});

app.get("/users/:id", function (req, res) {
  const id = req.params.id;

  User.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user);
      res.render("userview", { user });
    })
    .catch((err) => console.log(err));
});

app.post("/users/delete/:id", function (req, res) {
  const id = req.params.id;

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((user) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.get("/users/edit/:id", async function (req, res) {
  const id = req.params.id;

  const user = await User.findOne({
    include: Address,
    where: {
      id: id,
    },
  });
  res.render("useredit", { user: user.get({ plain: true }) });
});

app.post("/users/update", function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  console.log(req.body);
  console.log(userData);

  User.update(userData, {
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// Criar tabelas e rodar o app
conn
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));