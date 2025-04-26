import { Task } from "../models/task_model.ts";

const filePath = "task.json";
export function updateTask(id: string, newDesc: string): void {
  const taskId = parseInt(id);
  if (isNaN(taskId)) {
    console.error("id needs to be number");
    Deno.exit(1);
  }
  if (newDesc.length == 0) {
    console.error("Can't update task with empty desc");
    Deno.exit(1);
  }

  Deno.readTextFile(filePath).then((data) => {
    const tasks: Task[] = JSON.parse(data).map(Task.fromJson);
    const oldTask: Task | undefined = tasks.find((task) => task.id == taskId);
    if (!oldTask) {
      console.error("No task found");
      Deno.exit(1);
    }
    const index = tasks.indexOf(oldTask);
    const updatedTask: Task = oldTask.copyWith({ description: newDesc });
    tasks[index] = updatedTask;
    Deno.writeTextFile(filePath, JSON.stringify(tasks, null, 2));
    console.log(`Task updated successfully (ID: ${id})`);
  }).catch((err) => {
    if (err.code === "ENOENT") {
      console.error(
        "No task file initialized yet. Add a task first",
      );
      Deno.exit(1);
    } else if (err.code === "EACCES") {
      console.error(`Permission denied for file ${filePath}`);
      Deno.exit(1);
    } else {
      throw err;
    }
  });
}
