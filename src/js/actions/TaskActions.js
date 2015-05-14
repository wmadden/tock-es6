import Dispatcher from "services/Dispatcher";

export default {
  CREATE_NEW_TASK: "TASK_ACTIONS__CREATE_NEW_TASK",

  createNewTask({ description }) {
    Dispatcher.dispatch({
      actionType: this.CREATE_NEW_TASK,
      spec: {
        description
      }
    });
  }
};
