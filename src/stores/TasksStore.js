import Immutable from "bower_components/immutable/dist/immutable";
import TaskActions from "actions/TaskActions";
import Dispatcher from "services/Dispatcher";
import { EventEmitter } from "events";

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

function addTask(task) {
  tasks = tasks.push(task);
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

function markTaskFinished(id) {
  let task = tasks.filter((t) => t.id === id).get(0);
  task.finished = true;
  if (currentTask && currentTask.id === id) {
    deselectTask();
  }
}

function handleAction(payload) {
  if (payload.actionType === TaskActions.TASKS_LOADED) {
    let { tasks } = payload;
    tasks.forEach(addTask);
    emitChange();
  } else if (payload.actionType === TaskActions.NEW_TASK_CREATED) {
    addTask(payload.task);
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
  } else if (payload.actionType === TaskActions.INCREMENT_COMPLETED_POMODOROS) {
    incrementCompletedPomodoros();
    emitChange();
  } else if (payload.actionType === TaskActions.MARK_TASK_FINISHED) {
    markTaskFinished(payload.id);
    emitChange();
  }
}

TasksStore.dispatchToken = Dispatcher.register(handleAction);

export default TasksStore;
