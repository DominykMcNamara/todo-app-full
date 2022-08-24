require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//SWAGGER CONFIGURATION
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Todo-app",
      version: "1.0.0",
      description: "A simple todo",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
  },
  apis: ["routes/todos.routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use("/api/v1/todos/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/todos", routes.todos);
port = process.env.PORT
app.listen(port, () => console.log(`server is listening on port ${port}`));

