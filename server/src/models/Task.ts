import mongoose, { Schema, Document } from "mongoose"; // Import Mongoose and its types

// Define a TypeScript interface for the Task model
interface Task extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Task model
const taskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true, // Set the title field as required
    },
    description: {
      type: String,
      required: true, // Set the description field as required
    },
    completed: {
      type: Boolean,
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
const TaskModel = mongoose.model<Task>("Task", taskSchema); 

export default TaskModel; // Export the model for use in other parts of the application
