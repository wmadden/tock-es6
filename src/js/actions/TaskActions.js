import Dispatcher from "../services/Dispatcher";

export default {
  CREATE_NEW_TASK: "TASK_ACTIONS__CREATE_NEW_TASK",
  DELETE_TASK: "TASK_ACTIONS__DELETE_TASK",

  createNewTask({ description }) {
    Dispatcher.dispatch({
      actionType: this.CREATE_NEW_TASK,
      spec: {
        description
      }
    });
  },

  deleteTask({ id }) {
    Dispatcher.dispatch({
      actionType: this.DELETE_TASK,
      id
    });
  }
};
