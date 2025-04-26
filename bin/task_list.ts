import { Task } from "../models/task_model.ts";
import { parseStatus, TaskStatus } from "../models/task_status.ts";

const filePath = "task.json";

export function readTasks(status: string | undefined) {
  Deno.readTextFile(filePath).then(
    (data: string) => {
      const tasks: Task[] = JSON.parse(data);
      if (status) {
        const validStatus: TaskStatus | undefined = parseStatus(status);
        if (!validStatus) {
          console.error(
            `Invalid status, available options are ${
              Object.keys(TaskStatus).join(
                ", ",
              )
            }`,
          );
          return;
        }
        const dataByStatus: Task[] = tasks.filter((obj) =>
          obj.status == validStatus
        );
        console.log(dataByStatus);
      } else {
        console.log(tasks);
      }
    },
  ).catch((err) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error("No task file initialized yet. Add a task first");
        Deno.exit(1);
      } else if (err.code === "EACCES") {
        console.error(`Permission denied for file ${filePath}`);
        Deno.exit(1);
      } else {
        throw err;
      }
    }
  });
}
