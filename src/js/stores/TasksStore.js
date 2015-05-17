import Immutable from "bower_components/immutable/dist/immutable";
import TaskActions from "actions/TaskActions";
import Dispatcher from "services/Dispatcher";
import { EventEmitter } from "events";

let idCounter = 0;

function newTask({ description }) {
  return {
    id: idCounter++,
    completedPomodoros: 0,
    description
  };
}

let tasks = new Immutable.List([
  newTask({ description: "Something" }),
  newTask({ description: "Something else"})
]);
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
  }
};

function emitChange() {
  eventEmitter.emit("change");
}

function handleAction(payload) {
  if (payload.actionType === TaskActions.CREATE_NEW_TASK) {
    tasks = tasks.push(newTask(payload.spec));
    emitChange();
  }
  else if (payload.actionType === TaskActions.DELETE_TASK) {
    let id = payload.id;
    tasks = tasks.filter((task) => task.id !== id);
    emitChange();
  }
  else if (payload.actionType === TaskActions.SELECT_TASK) {
    let taskId = payload.id;
    let task = tasks.find((t) => t.id === taskId);
    if (!task) {
      throw new Error(`Can't find task with ID ${taskId}`);
    }

    currentTask = task;
    emitChange();
  }
  else if (payload.actionType === TaskActions.DESELECT_TASK) {
    if (!currentTask) {
      throw new Error("Can't deslect task; no task is selected");
    }

    currentTask = null;
    emitChange();
  }
}

TasksStore.dispatchToken = Dispatcher.register(handleAction);

export default TasksStore;
