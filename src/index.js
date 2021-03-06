require("./database/mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const Todo = require("./database/models/Todo");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
// main.use(bodyParser.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
//   );
//   next();
// });

app.get("/", cors(), async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (!todos) {
      return res.status(404).json();
      // .json({ message: "No Todos To Show" });
    }
    return res.json({ message: "Welcome", todos });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/todos/", cors(), async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (!todos) {
      return res.status(404).json();
      // .json({ message: "No Todos To Show" });
    }
    return res.json({ message: "Welcome", todos });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/todos/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params || 0;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json();
    }
    const todo = await Todo.findById(id);
    if (todo) {
      return res.status(200).json({ todo });
    }
    return res.status(404).json();
    // .json({ message: "Todo Not Found" });
  } catch (error) {
    return res.status(500).json(error);
  }
});
app.post("/todos/", cors(), async (req, res) => {
  try {
    const { title, description } = Object.keys(req.body).includes("title")
      ? req.body
      : JSON.parse(req.query[0]);
    const errors = [];
    if (!title) {
      errors.push("The Title field is required.");
    }
    if (!description) {
      errors.push("The Description field is required.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors, meta });
    }
    let todo = new Todo({ title, description });
    todo = await todo.save();
    if (todo) {
      return res.status(201).json();
      // .json({ message: "Todo Successfully Created!", todo });
    } else {
      return res.status(500).json();
      // .json({ message: "Server Error. Please Try Again Later." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.put("/todos/:id", cors(), async (req, res) => {
  try {
    console.log("PUTxxxxxxxxxxxxxxxxxxxxx", req, "xxxxxxxxxxxxxxxxxxxxxxxxxx");
    const { id } = req.params || 0;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json();
    }
    const { title, description } = Object.keys(req.body).includes("title")
      ? req.body
      : JSON.parse(req.query[0]);
    const errors = [];
    if (!title) {
      errors.push("The Title field is required.");
    }
    if (!description) {
      errors.push("The Description field is required.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors, meta });
    }
    let todo = await Todo.findById(id);
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo = await todo.save();
      if (todo) {
        return res.status(200).json();
        // .json({ message: "Todo Successfully Updated!", todo });
      } else {
        return res.status(500).json();
        // .json({ message: "Server Error. Please Try Again Later." });
      }
    } else {
      return res.status(404).json();
      // .json({ message: "Todo Not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.patch("/todos/:id", cors(), async (req, res) => {
  try {
    console.log("PATCH************", req, "**********************");
    const { id } = req.params || 0;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json();
    }
    const { title, description } = Object.keys(req.body).includes("title")
      ? req.body
      : JSON.parse(req.query[0]);
    const errors = [];
    if (!title) {
      errors.push("The Title field is required.");
    }
    if (!description) {
      errors.push("The Description field is required.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors, meta });
    }
    let todo = await Todo.findById(id);
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo = await todo.save();
      if (todo) {
        return res.status(200).json();
        // .json({ message: "Todo Successfully Updated!", todo });
      } else {
        return res.status(500).json();
        // .json({ message: "Server Error. Please Try Again Later." });
      }
    } else {
      return res.status(404).json();
      // .json({ message: "Todo Not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.delete("/todos/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params || 0;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json();
    }
    const todo = await Todo.findByIdAndDelete(id);
    if (todo) {
      return res.status(200).json();
      // .json({ message: "Todo Successfully Deleted!", todo });
    } else {
      return res.status(404).json();
      // .json({ message: "Todo Not Found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to establish a connection to port: ${PORT}.`);
  } else {
    console.log(`Connected to port:${PORT}`);
  }
});
