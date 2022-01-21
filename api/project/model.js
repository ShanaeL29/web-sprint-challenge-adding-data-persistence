// build your `Project` model here
const db = require("../../data/dbConfig");

async function getProjects() {
  const rows = await db("projects").select(
    "project_id",
    "project_name",
    "project_description",
    "project_completed"
  );
  console.log(rows);

  rows.forEach((row) => {
    row.project_completed == 0
      ? (row.project_completed = false)
      : (row.project_completed = true);
  });

  return rows;
}

async function findById(id) {
  const rows = await db("projects")
    .select(
      "project_id",
      "project_name",
      "project_description",
      "project_completed"
    )
    .where("project_id", id);

  const selected = {};
  selected.project_id = rows[0].project_id;
  selected.project_name = rows[0].project_name;
  selected.project_description = rows[0].project_description;
  selected.project_completed = rows[0].project_completed;
  selected.project_completed == 0
    ? (selected.project_completed = false)
    : (selected.project_completed = true);

  return selected;
}

function createProject(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => {
      return findById(id);
    });
}

module.exports = {
  getProjects,
  findById,
  createProject,
};
