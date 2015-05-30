import React from "react";
import App from "./ui/App";
import { getUnfinishedTasks } from "services/PersistenceService";
import * as TaskActions from "actions/TaskActions";
/*eslint-disable no-unused-vars */
import AlarmService from "./services/AlarmService";
/*eslint-enable no-unused-vars */

getUnfinishedTasks().then((tasks) => {
  TaskActions.tasksLoaded(tasks);
});

React.render(<App />, document.body);
