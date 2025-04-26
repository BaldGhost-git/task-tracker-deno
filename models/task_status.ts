/**
 * Enum for task statuses.
 * @readonly
 * @enum {{name: string}}
 */
export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in progress",
  DONE = "done",
}

export const stringToStatusMap = new Map<string, TaskStatus>(
  Object.values(TaskStatus).map((val) => [val, val]),
);

export function parseStatus(input: string): TaskStatus | undefined {
  return stringToStatusMap.get(input);
}
