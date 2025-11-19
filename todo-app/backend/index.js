const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/api/todos", async (req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const { text, status } = req.body;
  const todo = await prisma.todo.create({ data: { text, status } });
  res.status(201).json(todo);
});

app.put("/api/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { text, status } = req.body;
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { text, status },
    });
    res.json(todo);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

app.delete("/api/todos/completed", async (req, res) => {
  try {
    await prisma.todo.deleteMany({ where: { status: "completed" } });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.todo.delete({ where: { id } });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log("API running at http://localhost:3000");
});
