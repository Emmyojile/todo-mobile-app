const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 5000;
const cors = require("cors");
const corsOptions = {
  origin: ["*", "http://10.0.2.2:3000"],
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const moment = require("moment");

mongoose
  .connect(
    "mongodb+srv://emmyojile:emmy%401599@cluster0.baodx4z.mongodb.net/todo-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log(error, "Error connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("Server running on port " + port);
});

const User = require("./models/user");
const Todo = require("./models/todo");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(202).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Email not found");
      return res.status(400).json({ message: "Email not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, category } = req.body;

    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    });

    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    user?.todos.push(newTodo._id);
    await user.save();

    res.status(201).json({ message: "Todo added Successfully", todo: newTodo });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      {
        new: true,
      }
    );

    if (!updatedTodo) {
      res.status(400).json({ error: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo Marked As Complete", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/todos/completed/:date", async (req, res) => {
  try {
    const date = req.params.date;

    const completedTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`),
      },
    }).exec();

    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/todos/count", async (req, res) => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed",
    }).exec();

    const totalPendingTodos = await Todo.countDocuments({
      status: "pending",
    }).exec();

    res.status(200).json({ totalCompletedTodos, totalPendingTodos });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
