import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/tasks", async (_req, res) => {
  try {
    const tasksAll = await prisma.task.findMany();
    res.status(200).json(tasksAll);
  } catch (error) {
    res.status(500).json("error fetching tasks");
  }
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findFirst({
      where: { id: id },
    });
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ message: "unable to find task" });
    }
  } catch (e) {
    console.log("Error fetching task:", e);
    res.status(500).json({ message: " Server Error" });
  }
});

app.post("/tasks", async (req, res) => {
  const { title, description, Iscompleted } = req.body;
  try {
    console.log(req.body);
    const task = await prisma.task.create({
      data: { title, description, Iscompleted },
    });
    res.status(201).json(task);
  } catch (e) {
    console.log("Error finding task:", e);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  console.log(req.body);
  const { title, description, Iscompleted } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: req.params.id },
      data: { title, description, Iscompleted },
    });
    res.status(200).json(updatedTask);
  } catch (e) {
    console.log("error updating task:", e);
    res.status(500).json;
  }
  ({ message: "server error" });
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (e) {
    console.log("error deleting task:", e);
    res.status(500).json({ message: "server error" });
  }
});

const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  console.log("App running on port 4000");
});
