import { TaskStatus } from "./task_status.ts";

type TaskOptions = {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
};

type TaskCopy = {
  description?: string;
  status?: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
};

class Task {
  readonly id: number;
  description: string;
  status: TaskStatus;
  readonly createdAt: string;
  updatedAt: string | undefined;

  constructor({ id, description, status, createdAt, updatedAt }: TaskOptions) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt ?? new Date().toISOString();
    this.updatedAt = updatedAt;
  }

  static fromJson(obj: any): Task {
    return new Task({
      id: obj.id,
      description: obj.description,
      status: obj.status,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    });
  }

  // update(description = undefined, status = undefined) {
  //   this.description = description ?? this.description;
  //   this.status = status ?? this.status;
  //   if (description || status) this.updatedAt = new Date().toISOString();
  // }

  copyWith = ({ description, status, createdAt, updatedAt }: TaskCopy): Task =>
    new Task({
      id: this.id,
      description: description ?? this.description,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt ?? new Date().toISOString(),
    });
}

// const parseJsonToTasks = (jsonString: string) => {
//   const list: Task[] = JSON.parse(jsonString);
//   return list;
// };

export { Task, TaskStatus };
