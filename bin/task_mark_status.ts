import { Task } from "../models/task_model.ts";
import { parseStatus, TaskStatus } from "../models/task_status.ts";

const filePath = "task.json";

export function markTask(id: string, status: string) {
  const currStatus: TaskStatus | undefined = parseStatus(status);
  const taskId = parseInt(id);
  if (isNaN(taskId)) {
    console.error("id needs to be number");
    Deno.exit(1);
  }
  if (!currStatus) {
    console.error(
      `Invalid status, available options are ${
        Object.values(TaskStatus).join(", ")
      }`,
    );
    Deno.exit(1);
  }
  Deno.readTextFile(filePath).then((data) => {
    const tasks: Task[] = JSON.parse(data).map(Task.fromJson);
    const targetTask: Task | undefined = tasks.find((task) =>
      task.id == taskId
    );
    if (!targetTask) {
      console.error("No task found");
      Deno.exit(1);
    }
    console.log(typeof targetTask);
    const index = tasks.indexOf(targetTask);
    const updatedTask: Task = targetTask.copyWith({ status: currStatus });
    tasks[index] = updatedTask;
    Deno.writeTextFile(filePath, JSON.stringify(tasks, null, 2));
    console.log(
      `Task ${targetTask.id} status updated to ${targetTask.status}`,
    );
  }).catch((err) => {
    if (err.code === "ENOENT") {
      console.error("No task file initialized yet. Add a task first");
      Deno.exit(1);
    } else if (err.code === "EACCES") {
      console.error(`Permission denied for file ${filePath}`);
      Deno.exit(1);
    } else {
      throw err;
    }
  });
}
