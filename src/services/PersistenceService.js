import Dexie from "dexie";
import * as _ from "lodash";

const db = new Dexie("tock-database");

db.version(1).stores({
  tasks: "id++,finished",
});
db.on("populate", () => {
  db.tasks.add({ description: "Click me to focus on this task", finished: false, completedPomodoros: 0, estimatedPomodorosNeeded: 1 });
  db.tasks.add({ description: "Add a new task below", finished: false, completedPomodoros: 0, estimatedPomodorosNeeded: 1 });
  db.tasks.add({ description: "Delete these tasks using the trashcan on the right", finished: false, completedPomodoros: 0, estimatedPomodorosNeeded: 1 });
});

const SHOULD_LOG_TIMING = true;

function errorHandler(e) {
  /*eslint-disable no-console */
  console.log(e);
  throw e;
  /*eslint-enable no-console */
}

function logTiming(description, promise) {
  if (!SHOULD_LOG_TIMING) return promise;
  /*eslint-disable no-console */
  let timeStarted = Date.now();
  return promise.then( (result) => {
    let timeTaken = Date.now() - timeStarted;
    console.log(`${description} took`, timeTaken, "ms");
    return result;
  });
  /*eslint-enable no-console */
}

function open() {
  return logTiming("open()", db.open());
}

function getUnfinishedTasks() {
  return logTiming("getUnfinishedTasks()",
    db.tasks
      .toArray()
      .catch(errorHandler)
  );
}

function createTask(task) {
  let createdTask = _.pick(task, "description", "finished", "completedPomodoros", "estimatedPomodorosNeeded");
  createdTask.completedPomodoros = createdTask.completedPomodoros || 0;
  createdTask.estimatedPomodorosNeeded = createdTask.estimatedPomodorosNeeded || 0;
  return logTiming("createTask()",
    db.tasks
      .add(createdTask)
      .then(() => {
        return createdTask;
      })
      .catch(errorHandler)
  );
}

function updateTask(task) {
  return logTiming("updateTask()",
    db.tasks
      .update(task.id, task)
      .catch(errorHandler)
  );
}

function deleteTask(task) {
  let { id } = task;
  return logTiming("deleteTask()",
    db.tasks
      .delete(id)
      .catch(errorHandler)
  );
}

open();

export {
  getUnfinishedTasks,
  createTask,
  deleteTask,
  updateTask,
};
