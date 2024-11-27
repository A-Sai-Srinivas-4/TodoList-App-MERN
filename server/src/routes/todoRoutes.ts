import { Router, Request, Response } from "express"; // Import necessary types from Express
import TodoModel from "../models/Todo"; // Import the Todo model

const router: Router = Router(); // Create a new Router instance

// Get all todos
router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find(); // Fetch todos

    // Send a structured success response
    res.status(200).json({
      status: "success",
      data: todos,
      message: "Todos fetched successfully",
    });
  } catch (err: any) {
    console.error("Error fetching todos:", err.message);

    // Send a structured error response
    res.status(500).json({
      status: "error",
      data: null,
      message: "An error occurred while fetching todos",
    });
  }
});

// Create a new todo
router.post("/", async (req: Request, res: Response) => {
  const todo = new TodoModel({
    title: req.body.title, // Set the title from the request body
    status: req.body.status, // Set the status from the request body
    time: req.body.time, // Set the time from the request body
  });

  try {
    const newTodo = await todo.save(); // Save the new todo to the database
    res.status(201).json({
      status: "success",
      data: newTodo,
      message: "Todo created successfully",
    }); // Return the created todo as a JSON response
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err.message,
    }); // Handle error if there's an issue
  }
});

// Update an existing todo
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.findById(req.params.id); // Find the todo by ID
    if (todo) {
      todo.title = req.body.title; // Update the todo title
      todo.status = req.body.status; // Update the todo status
      todo.time = req.body.time; // Update the todo time
      const updatedTodo = await todo.save(); // Save the updated todo
      res.json({
        status: "success",
        data: updatedTodo,
        message: "Todo updated successfully",
      }); // Return the updated todo as a JSON response
    } else {
      res.status(404).json({
        status: "error",
        data: null,
        message: "Todo not found",
      }); // Return error if todo not found
    }
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err.message,
    }); // Handle error if there's an issue
  }
});

// Delete a todo
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.findById(req.params.id); // Find the todo by ID
    if (todo) {
      await todo.deleteOne(); // Delete the todo
      res.json({
        status: "success",
        data: null,
        message: "Todo deleted successfully",
      }); // Return success message
    } else {
      res.status(404).json({
        status: "error",
        data: null,
        message: "Todo not found",
      }); // Return error if todo not found
    }
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      data: null,
      message: err.message,
    }); // Handle error if there's an issue
  }
});

export default router; // Export the router for use in the server file
