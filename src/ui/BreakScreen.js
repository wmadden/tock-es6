import React from "react";
import TasksStore from "stores/TasksStore";
import BreakStore from "stores/BreakStore";
import TaskActions from "actions/TaskActions";
import * as PomodoroActions from "actions/PomodoroActions";
import { FlatButton, Paper } from "material-ui";
import formatDuration from "services/TimeFormatter";

let TaskDetailScreen = React.createClass({

  componentWillMount() {
    TasksStore.addChangeListener(this.onChange);
    BreakStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this.onChange);
    BreakStore.removeChangeListener(this.onChange);
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  onChange() {
    this.setState(this.getStateFromStores());
  },

  getStateFromStores() {
    return {
      task: TasksStore.getCurrentTask(),
      isPomodoroRunning: BreakStore.isPomodoroRunning(),
      pomodoroDuration: BreakStore.getPomodoroDuration(),
    };
  },

  render() {
    let { isPomodoroRunning, pomodoroDuration, task } = this.state;

    function renderPomodoroDuration() {
      if (!isPomodoroRunning) return null;
      return `running: ${formatDuration(pomodoroDuration)}`;
    }

    return (
      <Paper zDepth={1}>
        <FlatButton onClick={ this.deselectTask }>Back</FlatButton>

        <h4>{ task.description }</h4>
        { renderPomodoroDuration() }
        <div>{ task.completedPomodoros } pomodoros completed</div>

        <div className="task-detail__actions">
          <FlatButton onClick={ PomodoroActions.start }>Start</FlatButton>
          <FlatButton onClick={ PomodoroActions.stop }>Stop</FlatButton>
          <FlatButton onClick={ this.deleteTask }>Delete</FlatButton>
          <FlatButton>Finished</FlatButton>
        </div>
      </Paper>
    );
  },

  deselectTask() {
    TaskActions.deselectTask();
  },

  deleteTask() {
    TaskActions.deleteTask(this.state.task);
  },

});

export default TaskDetailScreen;
