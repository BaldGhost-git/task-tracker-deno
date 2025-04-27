import { TaskStatus } from "../models/task_status.ts";
import TaskModel from "../schema/task_schema.ts";
import mongoose from "npm:mongoose@8.14.0";

export async function addTask(desc: string) {
  if (!desc || desc.length == 0) {
    console.error("Can't add a new task with empty description");
    Deno.exit(1);
  }

  try {
    const newTask = new TaskModel({
      description: desc,
      status: TaskStatus.TODO,
    });
    await newTask.save();
    console.log(`Task added successfully (ID: ${newTask._id})`);
  } catch (e) {
    console.log(e);
    await mongoose.disconnect();
    Deno.exit(1);
  }
}
