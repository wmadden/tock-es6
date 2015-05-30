import Immutable from "bower_components/immutable/dist/immutable";
import TaskActions from "actions/TaskActions";
import * as PomodoroActions from "actions/PomodoroActions";
import Dispatcher from "services/Dispatcher";
import { EventEmitter } from "events";

let idCounter = 0;

function newTask({ description }) {
  return {
    id: idCounter++,
    completedPomodoros: 0,
    description,
  };
}

let tasks = new Immutable.List([]);
let currentTask;

let eventEmitter = new EventEmitter();

let TasksStore = {
  addChangeListener(callback) {
    eventEmitter.addListener("change", callback);
  },

  removeChangeListener(callback) {
    eventEmitter.removeListener("change", callback);
  },

  getTasks() {
    return tasks.toJS();
  },

  getCurrentTask() {
    return currentTask;
  },
};

function emitChange() {
  eventEmitter.emit("change");
}

function createTask(task) {
  tasks = tasks.push(newTask(task));
}

function selectTask(taskId) {
  let task = tasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error(`Can't find task with ID ${taskId}`);
  }
  currentTask = task;
}

function deselectTask() {
  currentTask = null;
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  if (currentTask && id === currentTask.id) {
    deselectTask();
  }
}

function incrementCompletedPomodoros() {
  currentTask.completedPomodoros += 1;
}

function handleAction(payload) {
  if (payload.actionType === TaskActions.NEW_TASK_CREATED) {
    let { description } = payload.task;
    createTask({ description });
    emitChange();
  } else if (payload.actionType === TaskActions.DELETE_TASK) {
    let id = payload.id;
    deleteTask(id);
    emitChange();
  } else if (payload.actionType === TaskActions.SELECT_TASK) {
    let taskId = payload.id;
    selectTask(taskId);
    emitChange();
  } else if (payload.actionType === TaskActions.DESELECT_TASK) {
    deselectTask();
    emitChange();
  } else if (payload.actionType === PomodoroActions.FINISHED) {
    incrementCompletedPomodoros();
    emitChange();
  }
}

TasksStore.dispatchToken = Dispatcher.register(handleAction);

export default TasksStore;
