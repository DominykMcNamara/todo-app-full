require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.routes");

const path = require("path");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(cors());
app.use(express.json());

app.use("/api/v1/todos", routes.todos);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

port = process.env.PORT;
app.listen(port, () => console.log(`server is listening on port ${port}`));
