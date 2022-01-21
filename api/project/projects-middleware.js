const db = require("../../data/dbConfig");

module.exports = {
  async checkProjectId(req, res, next) {
    const project = await db("projects")
      .where("project_id", req.params.id)
      .first();
    if (project) {
      next();
    } else {
      next({
        message: "Could not find project with given project_id.",
        status: 404,
      });
    }
  },
  checkProjectPayload(req, res, next) {
    if (req.body.project_name && req.body.project_name.trim()) {
      req.body.project_name = req.body.project_name.trim();
      next();
    } else {
      next({ status: 422, message: "project_name is required" });
    }
  },
};
