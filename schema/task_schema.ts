import { model, Schema } from "npm:mongoose@8.14.0";
import { TaskStatus } from "../models/task_status.ts";

const taskSchema = new Schema({
  description: { type: String, unique: true },
  status: { type: String, default: TaskStatus.TODO },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

taskSchema.path("description").required(
  true,
  "Task description cannot be empty!",
);
taskSchema.path("status").required(true, "Task status cannot be empty");
taskSchema.methods = {
  update: async function (description?: string, status?: TaskStatus) {
    this.description = description ?? this.description;
    this.description = status ?? this.description;
    this.updatedAt = Date.now;
    return await this.save();
  },
};

export default model("TaskModel", taskSchema);
