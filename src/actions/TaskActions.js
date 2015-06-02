import * as PomodoroActions from "actions/PomodoroActions";
import Dispatcher from "services/Dispatcher";
import * as PersistenceService from "services/PersistenceService";
import TasksStore from "stores/TasksStore";

const TASKS_LOADED = "TASK_ACTIONS__TASK_LOADED";
const NEW_TASK_CREATED = "TASK_ACTIONS__NEW_TASK_CREATED";
const DELETE_TASK = "TASK_ACTIONS__DELETE_TASK";
const SELECT_TASK = "TASK_ACTIONS__SELECT_TASK";
const DESELECT_TASK = "TASK_ACTIONS__DESELECT_TASK";
const MARK_TASK_FINISHED = "TASK_ACTIONS__MARK_TASK_FINISHED";
const INCREMENT_COMPLETED_POMODOROS = "TASK_ACTIONS__INCREMENT_COMPLETED_POMODOROS";

function createNewTask(task) {
  PersistenceService.createTask(task)
    .then((createdTask) => {
      Dispatcher.dispatch({
        actionType: NEW_TASK_CREATED,
        task: createdTask,
      });
    });
}

function tasksLoaded(tasks) {
  Dispatcher.dispatch({
    actionType: TASKS_LOADED,
    tasks,
  });
}

function deleteTask(task) {
  PersistenceService.deleteTask(task)
    .then(() => {
      Dispatcher.dispatch({
        actionType: DELETE_TASK,
        id: task.id,
      });
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

function markTaskFinished({ id }) {
  Dispatcher.dispatch({
    actionType: MARK_TASK_FINISHED,
    id,
  });
  PersistenceService.updateTask({ id, finished: true });
}

function selectTaskAndStartPomodoro({ id }) {
  selectTask({ id });
  PomodoroActions.start();
}

function incrementCompletedPomodoros() {
  Dispatcher.dispatch({
    actionType: INCREMENT_COMPLETED_POMODOROS,
  });
  let currentTask = TasksStore.getCurrentTask();
  PersistenceService.updateTask(currentTask);
}

export default {
  TASKS_LOADED,
  NEW_TASK_CREATED,
  DELETE_TASK,
  SELECT_TASK,
  MARK_TASK_FINISHED,
  DESELECT_TASK,
  INCREMENT_COMPLETED_POMODOROS,
  tasksLoaded,
  deleteTask,
  selectTask,
  markTaskFinished,
  selectTaskAndStartPomodoro,
  deselectTask,
  createNewTask,
  incrementCompletedPomodoros,
};
