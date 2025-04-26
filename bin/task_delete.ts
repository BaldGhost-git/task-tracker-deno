import { Task } from "../models/task_model.ts";

const filePath = "task.json";

export function deleteTask(id: string): void {
  const taskId = parseInt(id);
  if (isNaN(taskId)) {
    console.error("id needs to be number");
    Deno.exit(1);
  }

  Deno.readTextFile(filePath).then((data) => {
    const tasks: Task[] = JSON.parse(data).map(Task.fromJson);
    if (tasks.length == 0) {
      console.error("You have no tasks");
      Deno.exit(1);
    }
    const newTask = tasks.filter((task) => task.id != taskId);
    Deno.writeTextFile(filePath, JSON.stringify(newTask, null, 2));
    console.log(`Task deleted successfully`);
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
