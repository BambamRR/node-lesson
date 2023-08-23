const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/create");
  }
  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await Task.create(task);

    res.redirect("/tasks");
  }

  static async showTasks(req, res) {
    try {
      const done = 0; //não finalizada
      const task = await Task.findAll({ where: { done: done }, raw: true });
      console.log(task)

      res.render("tasks/all", { task });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateTask(req, res) {
    const id = req.params.id;
    Task.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render("tasks/edit", { task: data });
      })
      .catch((err) => console.log(err));
  }

  static async updateTaskSave(req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description
    const userData = {
      title: title,
      description:description
    }
    try{
    await Task.update(userData, { where:{id: id}})
      console.log("Editado com sucesso ")
      res.redirect('/tasks')
    }catch(error) {
      console.log(error)
    }
  }

  static async removeTask(req, res) {
    const id = req.body.id;

    await Task.destroy({ where: { id: id } })
      .then((task) => {
        console.log(task);
        res.redirect("back");
      })
      .catch((error) => {
        console.log("Erro ao excluir tarefa: " + error);
      });
  }

  static async finshTasks(req, res) {
    const id = req.body.id;
    const done = 1;
    const userData = {
      done,
    };
    try {
      await Task.update(userData, { where: { id: id } });
      res.redirect("back");
    } catch (error) {
      console.log("Erro ao finalizar tarefa: " + error);
    }
  }
};
