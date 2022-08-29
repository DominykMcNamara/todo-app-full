const Router = require("express-promise-router");
const db = require("../db/index.db");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const todoList = await db.query("SELECT * FROM todos");

    res.status(200).json({
      status: "success",
      results: todoList.rows.length,
      data: {
        todos: todoList.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/completed", async (req, res) => {
  try {
    const numberOfIncompletedTodos = await db.query(
      "SELECT COUNT(*) FROM todos WHERE completed = false "
    );
    res.status(200).json({
      status: "success",
      results: numberOfIncompletedTodos.rows.length,
      data: {
        numberOfIncompletedTodos: numberOfIncompletedTodos.rows[0].count,
      },
    });
    console.log(numberOfIncompletedTodos);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await db.query("SELECT * FROM todos WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        todos: todo.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTodo = await db.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [req.body.description]
    );
    const numberOfIncompleteTodos = await db.query(
      "SELECT COUNT(*) FROM todos WHERE completed = false"
    );
    console.log(newTodo);
    res.status(201).json({
      status: "success",
      data: {
        todo: newTodo.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await db.query(
      "UPDATE todos SET  completed = $1 WHERE id = $2 RETURNING *",
      [true, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        todo: updatedTodo.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await db.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.status(201).json({
      status: "success",
      data: {
        todo: deletedTodo.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const deletedTodos = await db.query(
      "DELETE FROM todos WHERE completed = true RETURNING *"
    );
    res.status(201).json({
      status: "success",
      data: {
        todo: deletedTodos.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
