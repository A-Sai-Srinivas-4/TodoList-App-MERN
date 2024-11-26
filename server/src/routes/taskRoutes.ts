import { Router, Request, Response } from "express"; // Import necessary types from Express
import TaskModel from "../models/Task"; // Import the Task model

const router: Router = Router(); // Create a new Router instance

// Get all tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find(); // Find all tasks from the database
    res.json(tasks); // Return the tasks as a JSON response
  } catch (err: any) {
    res.status(500).json({ message: err.message }); // Handle error if there's an issue
  }
});

// Create a new task
router.post("/", async (req: Request, res: Response) => {
  const task = new TaskModel({
    title: req.body.title,           // Set the title from the request body
    description: req.body.description, // Set the description from the request body
  });

  try {
    const newTask = await task.save(); // Save the new task to the database
    res.status(201).json(newTask);     // Return the created task as a JSON response
  } catch (err: any) {
    res.status(400).json({ message: err.message }); // Handle error if there's an issue
  }
});

// Update an existing task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.id); // Find the task by ID
    if (task) {
      task.title = req.body.title;            // Update the task title
      task.description = req.body.description; // Update the task description
      const updatedTask = await task.save();  // Save the updated task
      res.json(updatedTask);                  // Return the updated task as a JSON response
    } else {
      res.status(404).json({ message: "Task not found" }); // Return error if task not found
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message }); // Handle error if there's an issue
  }
});

// Delete a task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.id); // Find the task by ID
    if (task) {
      await task.deleteOne(); // Delete the task
      res.json({ message: "Task deleted" }); // Return success message
    } else {
      res.status(404).json({ message: "Task not found" }); // Return error if task not found
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message }); // Handle error if there's an issue
  }
});

export default router; // Export the router for use in the server file
