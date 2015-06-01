import React from "react";
import App from "ui/App";
import { getUnfinishedTasks } from "services/PersistenceService";
import * as TaskActions from "actions/TaskActions";
// We import the AlarmService here even though we don't need it so that it registers its dispatcher
/*eslint-disable no-unused-vars */
import AlarmService from "services/AlarmService";
/*eslint-enable no-unused-vars */

function bootAction(mountPoint) {
  getUnfinishedTasks().then((tasks) => {
    TaskActions.tasksLoaded(tasks);
  });

  React.render(<App />, mountPoint);
}

export default bootAction;
