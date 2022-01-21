// build your `Task` model here
const db = require("../../data/dbConfig");

async function getTasks() {
  const rows = await db("tasks as t")
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "project_name",
      "project_description"
    );

  rows.forEach((row) => {
    row.task_completed == 0
      ? (row.task_completed = false)
      : (row.task_completed = true);
  });

  return rows;
}

async function findById(id) {
  const rows = await db("tasks as t")
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "t.project_id"
    )
    .where("task_id", id);

  const result = {};

  result.task_id = rows[0].task_id;
  result.task_description = rows[0].task_description;
  result.task_notes = rows[0].task_notes;
  result.task_completed = rows[0].task_completed;
  result.task_completed == 0
    ? (result.task_completed = false)
    : (result.task_completed = true);
  result.project_id = rows[0].project_id;

  return result;
}

function createTask(task) {
  return db("tasks")
    .insert(task)
    .then(([id]) => {
      return findById(id);
    });
}

module.exports = {
  getTasks,
  findById,
  createTask,
};
