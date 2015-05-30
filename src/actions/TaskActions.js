import * as PomodoroActions from "actions/PomodoroActions";
import Dispatcher from "services/Dispatcher";
import * as PersistenceService from "services/PersistenceService";

const TASKS_LOADED = "TASK_ACTIONS__TASK_LOADED";
const NEW_TASK_CREATED = "TASK_ACTIONS__NEW_TASK_CREATED";
const DELETE_TASK = "TASK_ACTIONS__DELETE_TASK";
const SELECT_TASK = "TASK_ACTIONS__SELECT_TASK";
const DESELECT_TASK = "TASK_ACTIONS__DESELECT_TASK";

function createNewTask(task) {
  Dispatcher.dispatch({
    actionType: NEW_TASK_CREATED,
    task,
  });
}

function tasksLoaded(tasks) {
  Dispatcher.dispatch({
    actionType: TASKS_LOADED,
    tasks,
  });
}

function deleteTask({ id }) {
  Dispatcher.dispatch({
    actionType: DELETE_TASK,
    id,
  });
}

function selectTask({ id }) {
  Dispatcher.dispatch({
    actionType: SELECT_TASK,
    id,
  });
}

function deselectTask() {
  Dispatcher.dispatch({
    actionType: DESELECT_TASK,
  });
}

function selectTaskAndStartPomodoro({ id }) {
  selectTask({ id });
  PomodoroActions.start();
}

export default {
  TASKS_LOADED,
  NEW_TASK_CREATED,
  DELETE_TASK,
  SELECT_TASK,
  DESELECT_TASK,
  tasksLoaded,
  deleteTask,
  selectTask,
  selectTaskAndStartPomodoro,
  deselectTask,
  createNewTask,
};
