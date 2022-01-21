// build your `/api/projects` router here
const express = require("express");

const {
  checkProjectId,
  checkProjectPayload,
} = require("./projects-middleware");

const Project = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.getProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkProjectId, (req, res, next) => {
  Project.findById(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.post("/", checkProjectPayload, (req, res, next) => {
  Project.createProject(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

module.exports = router;
