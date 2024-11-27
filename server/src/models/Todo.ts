import mongoose, { Schema, Document } from "mongoose"; // Import Mongoose and its types

// Define a TypeScript interface for the Task model
interface Todo extends Document {
  title: string;
  status: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Task model
const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true, // Set the title field as required
    },
    status: {
      type: String,
      required: true, // Set the status field as required
    },
    time: {
      type: String,
      default: false, // Set the default value to false
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set the default value to the current date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Set the default value to the current date
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

// Create the Task model using the schema and interface
const TodoModel = mongoose.model<Todo>(
  "TodoList_DB",
  todoSchema,
  "TodoList_DB"
);
//  is a Mongoose model that represents the "Todo" collection in the "TodoList_DB" database

export default TodoModel; // Export the model for use in other parts of the application
