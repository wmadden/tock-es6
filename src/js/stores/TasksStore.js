import Immutable from "bower_components/immutable/dist/immutable";
import TaskActions from "actions/TaskActions";
import Dispatcher from "services/Dispatcher";
// import EventEmitter from "bower_components/eventemitter2/eventemitter2";

let state = new Immutable.Map({
  tasks: [
    { description: "Something" },
    { description: "Something else" }
  ]
});

let TasksStore = {
  getTasks() {
    return state.toJS().tasks;
  }
};

function handleAction(payload) {
  if (payload.actionType === TaskActions.CREATE_NEW_TASK) {
    var { description } = payload.spec;
    state = state.set("tasks", state.tasks.push({ description }));

  }
}

TasksStore.dispatchToken = Dispatcher.register(handleAction);

export default TasksStore;
