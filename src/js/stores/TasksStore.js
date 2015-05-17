import Immutable from "bower_components/immutable/dist/immutable";
import TaskActions from "actions/TaskActions";
import Dispatcher from "services/Dispatcher";
import { EventEmitter } from "events";

let idCounter = 0;

function newTask({ description }) {
  return {
    id: idCounter++,
    description
  };
}

let tasks = new Immutable.List([
  newTask({ description: "Something" }),
  newTask({ description: "Something else"})
]);

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
}

TasksStore.dispatchToken = Dispatcher.register(handleAction);

export default TasksStore;
