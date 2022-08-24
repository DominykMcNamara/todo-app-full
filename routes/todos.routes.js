const Router = require("express-promise-router");
const db = require("../db/index.db");

const router = new Router();

/**
 * @swagger
 *  tags:
 *      name: Todos
 *      description: endpoints to reach the Todo table in the database.
 *
 */

// Get routes

/**
 * @swagger
 * /api/v1/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *
 *     responses:
 *       200:
 *          description: A list of todos.
 *          content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: The  ID of a todo.
 *                  example: 1
 *                description:
 *                  type: string
 *                  description: The description of the todo.
 *                  example: Tomato
 *                completed:
 *                  type: boolean
 *                  description: Describes if a todo is complete or not.
 *                  example: true
 *
 *       404:
 *          description: Not found.
 */

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

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   get:
 *    summary: Retrieve a single todo
 *    tags: [Todos]
 *    parameters:
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *
 *    responses:
 *      201:
 *          description: A single todo.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: The todo ID.
 *                    example: 1
 *                  description:
 *                    type: string
 *                    description: The description of the todo.
 *                    example: Make dinner.
 *                  completed:
 *                    type: boolean
 *                    description: Describes if a todo is complete or not.
 *                    example: false
 *
 *      400:
 *          description: todo cannot be found.
 */

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

/**
 * @swagger
 * /api/v1/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *
 *     responses:
 *       200:
 *          description: A list of todos.
 *          content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: The  ID of a todo.
 *                  example: 1
 *                description:
 *                  type: string
 *                  description: The description of the todo.
 *                  example: Tomato
 *                completed:
 *                  type: boolean
 *                  description: Describes if a todo is complete or not.
 *                  example: true
 *
 *       404:
 *          description: Not found.
 */

// Post routes
/**
 * @swagger
 * /api/v1/todos:
 *  post:
 *    summary: Create a new todo.
 *    tags: [Todos]
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              description:
 *                type: string
 *                description: The description of the new todo.
 *                example: Make dinner.
 *              completed:
 *                type: boolean
 *                description: Describes if a todo is complete or not.
 *                example: false
 *          required:
 *            - description
 *            - completed
 *
 *    responses:
 *      201:
 *        description: Successfully created a new todo.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                type: integer
 *                description: The id of the created todo.
 *                example: 1
 *              description:
 *                type: string
 *                description: The description of the new todo.
 *                example: Make dinner
 *
 *      400:
 *          description: Todo could not be created.
 */
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newTodo = await db.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [req.body.description]
    );
    const numberOfIncompleteTodos = await db.query(
      "SELECT COUNT(*) FROM todos WHERE completed = false"
    );
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

// Put routes
/**
 * @swagger
 * /api/v1/todos/{id}:
 *  put:
 *    summary: Update a todo's information.
 *    tags: [Todos]
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        description: Updated todo information.
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the todo to update
 *        schema:
 *         type: integer
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              description:
 *                type: string
 *                description: The new description of the todo.
 *                example: Make Dinner for 5.
 *              completed:
 *                type: string
 *                description: The updated description of the todo.
 *                example: true
 *
 *    responses:
 *      201:
 *        description: Successfully updated the product.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                type: integer
 *                description: The id of the updated todo.
 *                example: 1
 *              description:
 *                type: string
 *                description: The new description of the todo.
 *                example: Make Dinner for 5.
 *              completed:
 *                type: string
 *                description: The updated description of the todo.
 *                example: true
 *
 *      400:
 *          description: Product could not be updated.
 */

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

// Delete routes
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *    summary: Delete a single todo
 *    tags: [Todos]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the todo to delete
 *        schema:
 *         type: integer
 *
 *    responses:
 *      201:
 *          description: Todo successfully deleted.
 *
 *      400:
 *          description: Todo cannot be found.
 */

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

/**
 * @swagger
 * /todos/:
 *   delete:
 *    summary: Delete completed todos
 *    tags: [Todos]
 *
 *    responses:
 *      201:
 *          description: Todos successfully deleted.
 *
 *      400:
 *          description: Todo cannot be found.
 */

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
