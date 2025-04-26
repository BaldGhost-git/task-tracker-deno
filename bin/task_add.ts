import { Task } from "../models/task_model.ts";
import { TaskStatus } from "../models/task_status.ts";

export function addTask(desc: string) {
  if (!desc || desc.length == 0) {
    console.error("Can't add a new task with empty description");
    Deno.exit(1);
  }
  const filePath = "task.json";

  Deno.readTextFile(filePath).then(async (value: string) => {
    const tasks: Task[] = JSON.parse(value);
    const newTask = new Task({
      id: tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1,
      description: desc,
      status: TaskStatus.TODO,
    });
    tasks.push(newTask);
    const newData = JSON.stringify(tasks, null, 2);
    await Deno.writeTextFile(filePath, newData);
    console.log(`Task added successfully (ID: ${newTask.id})`);
  }).catch((err) => {
    if (err) {
      if (err.code === "ENOENT") {
        const task = new Task({
          id: 1,
          description: desc,
          status: TaskStatus.TODO,
        });
        const taskList = [task];
        const data = JSON.stringify(taskList, null, 2);
        Deno.writeTextFile("task.json", data);
        console.log(
          `Task file created and task added succesfully (ID: ${task.id})`,
        );
      } else if (err.code === "EACCES") {
        console.error(`Permission denied for file ${filePath}`);
      } else {
        throw err;
      }
    }
  });
  // Deno.readFile(filePath, (err, data) => {
  //   if (err) {
  //     if (err.code === "ENOENT") {
  //       const task = new Task(1, desc);
  //       const taskList = [task];
  //       const data = JSON.stringify(taskList, null, 2);
  //       fs.writeFileSync("task.json", data);
  //       console.log(
  //         `Task file created and task added succesfully (ID: ${task.id})`,
  //       );
  //     } else if (err.code === "EACCES") {
  //       console.error(`Permission denied for file ${filePath}`);
  //     } else {
  //       throw err;
  //     }
  //   } else {
  //     const tasks = parseJsonToTasks(data);
  //     const newTask = new Task(
  //       tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1,
  //       desc,
  //     );
  //     tasks.push(newTask);
  //     const newData = JSON.stringify(tasks, null, 2);
  //     fs.writeFileSync(filePath, newData);
  //     console.log(`Task added successfully (ID: ${newTask.id})`);
  //   }
  // });
}
