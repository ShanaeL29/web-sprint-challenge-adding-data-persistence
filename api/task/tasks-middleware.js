const db = require("../../data/dbConfig");

module.exports = {
  async checkTaskId(req, res, next) {
    const task = await db("tasks").where("task_id", req.params.id).first();
    if (task) {
      next();
    } else {
      next({
        message: "Could not find task with given task_id.",
        status: 404,
      });
    }
  },
  checkTaskPayload(req, res, next) {
    if (req.body.task_description && req.body.project_id) {
      next();
    } else {
      next({
        status: 422,
        message: "task_description and project_id are required",
      });
    }
  },
};
