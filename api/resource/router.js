// build your `/api/resources` router here
const express = require("express");

const {
  checkResourceId,
  checkResourcePayload,
} = require("./resources-middleware");

const Resource = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resources = await Resource.getResources();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkResourceId, (req, res, next) => {
  Resource.findById(req.params.id)
    .then((resource) => {
      res.json(resource);
    })
    .catch(next);
});

router.post("/", checkResourcePayload, (req, res, next) => {
  Resource.addResource(req.body)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch(next);
});

module.exports = router;
