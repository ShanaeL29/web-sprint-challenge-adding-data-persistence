const db = require("../../data/dbConfig");

module.exports = {
  async checkResourceId(req, res, next) {
    const resource = await db("resources")
      .where("resource_id", req.params.id)
      .first();
    if (resource) {
      next();
    } else {
      next({
        message: "Could not find resource with given resource_id.",
        status: 404,
      });
    }
  },
  checkResourcePayload(req, res, next) {
    if (!req.body.resource_name || !req.body.resource_name.trim()) {
      next({ status: 422, message: "resource_name is required" });
    } else {
      req.body.resource_name = req.body.resource_name.trim();
      next();
    }
  },
};
