import * as PomodoroActions from "actions/PomodoroActions";
import Dispatcher from "services/Dispatcher";

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
  NEW_TASK_CREATED,
  DELETE_TASK,
  SELECT_TASK,
  DESELECT_TASK,
  deleteTask,
  selectTask,
  selectTaskAndStartPomodoro,
  deselectTask,
  createNewTask,
};
