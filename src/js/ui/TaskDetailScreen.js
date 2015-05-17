import React from "react";
import TasksStore from "stores/TasksStore";
import PomodoroStore from "stores/PomodoroStore";
import TaskActions from "actions/TaskActions";
import * as PomodoroActions from "actions/PomodoroActions";
import { FlatButton, Paper } from "material-ui";
import { branch } from "components/helpers";

function ljust(string, minLength, padder = ' ') {
  string = string.toString();
  let paddingLength = minLength - string.length;
  if (paddingLength < 0) {
    return string;
  }
  return new Array( paddingLength + 1 ).join(padder) + string;
}

function formatDuration(milliseconds) {
  let seconds = Math.round(milliseconds / 100);
  if (seconds === 0) {
    return "00:00";
  }

  let result = [
    60, // 60 seconds in a minute
    60  // 60 minutes in an hour
  ].map( (count) => {
    let n = seconds % count;
    seconds = Math.floor(seconds / count);
    return ljust(n, 2, '0');
  });

  return result.reverse().join(':');
}

let TaskDetailScreen = React.createClass({

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      task: TasksStore.getCurrentTask(),
      isPomodoroRunning: PomodoroStore.isPomodoroRunning(),
      pomodoroDuration: PomodoroStore.getPomodoroDuration()
    };
  },

  render() {
    return <Paper zDepth={1}>
      <FlatButton onClick={ this.deselectTask }>Back</FlatButton>

      <h4>{ this.state.task.description }</h4>
      {
        branch(this.state.isPomodoroRunning,
          () => `running: ${formatDuration(this.state.pomodoroDuration)}`,
          () => ""
        )
      }
      <div>{ this.state.task.completedPomodoros } pomodoros completed</div>

      <div className="task-detail__actions">
        <FlatButton onClick={ PomodoroActions.start }>Start</FlatButton>
        <FlatButton onClick={ PomodoroActions.stop }>Stop</FlatButton>
        <FlatButton onClick={ this.deleteTask }>Delete</FlatButton>
        <FlatButton>Finished</FlatButton>
      </div>
    </Paper>;
  },

  deselectTask() {
    TaskActions.deselectTask();
  },

  deleteTask() {
    TaskActions.deleteTask(this.state.task);
  },

  componentWillMount() {
    TasksStore.addChangeListener(this.onChange);
    PomodoroStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this.onChange);
    PomodoroStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState(this.getStateFromStores());
  }

});

export default TaskDetailScreen;
