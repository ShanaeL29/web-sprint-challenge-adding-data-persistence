// build your `Resource` model here
const db = require("../../data/dbConfig");

async function getResources() {
  const rows = await db("resources").select(
    "resource_id",
    "resource_name",
    "resource_description"
  );

  return rows;
}

async function findById(id) {
  const rows = await db("resources")
    .select("resource_id", "resource_name", "resource_description")
    .where("resource_id", id);

  const found = {};
  found.resource_id = rows[0].resource_id;
  found.resource_name = rows[0].resource_name;
  found.resource_description = rows[0].resource_description;

  return found;
}

function addResource(resource) {
  return db("resources")
    .insert(resource)
    .then(([id]) => {
      return findById(id);
    });
}

module.exports = {
  getResources,
  findById,
  addResource,
};
