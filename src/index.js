require("./database/mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Todo = require("./database/models/Todo");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// main.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const meta = req.headers;
  const todos = await Todo.find({});
  if (!todos) {
    res.status(404).json({ meta, message: 'No Todos To Show' })
   }
  res.json({ message: "Welcome", todos });
});
app.get("/todos/:id", async (req, res) => { 
  const { id } = req.params || 0;
  const todo = await Todo.findById(id);
  if (todo) {
    res.status(200).json({ meta, todo })
  }
  res.status(404).json({ meta, message: 'Todo Not Found' })
})
app.post("/todos/", (req, res) => {
  const { title, description } = req.body;
  const meta = req.headers;
  const errors = [];
  if (!title) {
    errors.push("The Title field is required.");
  }
  if (!description) {
    errors.push("The Description field is required.");
  }
  if (errors.length > 0) {
    res.status(400).json({ errors, meta})
   }
  let todo = new Todo({ title, description })
  todo = await todo.save();
  if (todo) {
    return res.status(201).json({ meta, message: 'Todo Successfully Created!', todo })
  } else {
    res.status(500).json({ meta, message: 'Server Error. Please Try Again Later.'});
  }
  res.status(500).json({ meta, message: 'Server Error. Please Try Again Later.' });
});
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params.id || 0;
  const { title, description } = req.body;
  const meta = req.headers;
  const errors = [];
  if (!title) {
    errors.push("The Title field is required.");
  }
  if (!description) {
    errors.push("The Description field is required.");
  }
  if (errors.length > 0) {
    res.status(400).json({ errors, meta})
  }
  let todo = await Todo.findById(id);
  if (todo) {
    todo.title = title;
    todo.description = description;
    todo = await todo.save();
    if (todo) {
      return res.status(200).json({ meta, message: 'Todo Successfully Updated!', todo })
    } else {
      res.status(500).json({ meta, message: 'Server Error. Please Try Again Later.' });
    }
  } else {
    res.status(404).json({ meta, message: 'Todo Not Found' })
   }
  res.status(500).json({ meta, message: 'Server Error. Please Try Again Later.' })
});
app.delete("/todos/:id", async () => {
  const { id } = req.params || 0;
  const meta = req.headers;
  const todo = await Todo.findByIdAndDelete(id);
  if (todo) {
    res.status(200).json({ meta, message: 'Todo Successfully Deleted!', todo })
  } else {
    res.status(404).json({ meta, message: 'Todo Not Found' })
   }
  res.status(500).json({ meta, message: 'Server Error. Please Try Again Later.' })
 });
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to establish a connection to port: ${PORT}.`);
  } else {
    console.log(`Connected to port:${PORT}`);
  }
});
