#!/usr/bin/env -S deno run --allow-read --allow-sys --allow-env --allow-net

import { addTask } from "./bin/task_add.ts";
import { deleteTask } from "./bin/task_delete.ts";
import { readTasks } from "./bin/task_list.ts";
import { markTask } from "./bin/task_mark_status.ts";
import { updateTask } from "./bin/task_update.ts";
import mongoose from "npm:mongoose@8.14.0";

await mongoose.connect("mongodb://localhost:27017");

const command = Deno.args[0];
switch (command) {
  case "add":
    addTask(Deno.args[1]);
    break;
  case "delete":
    deleteTask(Deno.args[1]);
    break;
  case "list":
    readTasks(Deno.args[1]);
    break;
  case "update":
    updateTask(Deno.args[1], Deno.args[2]);
    break;
  case "mark": {
    const [j, status] = Deno.args.slice(1);
    markTask(j, status);
    break;
  }
  case undefined:
  case "help":
    console.log(`
    ===============================
            Task Tracker CLI 📋
    ===============================

    A simple task tracking tool, as a solution to roadmap.sh challenge
    https://roadmap.sh/projects/task-tracker
    
    Usage:
        task-tracker <command> [options]
    
    Commands:
        add <desc>                  Add a new task
                                    Example: task-tracker add "Buy groceries"
    
        delete <taskId>             Delete a task by its ID
                                    Example: task-tracker delete 3
    
        list                        List all tasks
                                    Example: task-tracker list
    
        mark <taskId> [ in-progress| done ]
                                    Mark a task as in-progress or done
                                    Example: task-tracker mark 2 done
    
        update <taskId> <newTask>   Update the task content
                                    Example: task-tracker update 4 "Buy groceries and cook dinner"
        
        help                        Output this help page
    
    Notes:
        - Task IDs are shown in the list command output.
        - All data is stored locally in a task.json file.
    
    Happy tracking! ✅
    `);
    break;
  default:
    console.error(
      `${command}: command not found\n try "task-tracker help" to see list of commands`,
    );
    Deno.exit(1);
}

await mongoose.disconnect();
Deno.exit(0);

