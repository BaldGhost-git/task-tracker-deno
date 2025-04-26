# Task Tracker CLI

A simple task-tracker CLI, Just like [this one](https://github.com/BaldGhost-git/task-tracker-cli), but in Deno instead

## Prerequisites
- Deno

## Installation
Clone this repo
```bash
git clone https://github.com/BaldGhost-git/task-tracker-cli.git
```

Installed it with this command
```bash
deno install -g --allow-read=task.json --allow-write=task.json -n task-tracker ./main.ts
```

## Usage
### `add <desc>`

Insert a new task with a description. `<desc>` should be enclosed with double quotes ("").
```bash
task-tracker add "first task"
```

### `update <id> <desc>`
Update a task with new description. `<id>` should be a number, not a string
```bash
task-tracker update 1 "task 1"
``` 

### `list [ todo | in progress | done]`
Outputs all task
```bash
task-tracker list
```

### `mark <id> [ in progress | done ]`
Mark a task as work in progress or done.
```bash
task-tracker 1 in-progress
```

### `delete <id>`
Delete a task.
```bash
task-tracker delete 1
```
