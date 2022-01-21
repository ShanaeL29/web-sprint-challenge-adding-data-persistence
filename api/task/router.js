// build your `/api/tasks` router here
const express = require("express");

const { checkTaskId, checkTaskPayload } = require("./tasks-middleware");

const Task = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.getTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkTaskId, (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) => {
      res.json(task);
    })
    .catch(next);
});

router.post("/", checkTaskPayload, (req, res, next) => {
  Task.createTask(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch(next);
});

module.exports = router;
