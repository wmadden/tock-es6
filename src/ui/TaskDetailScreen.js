import React from "react";
import TasksStore from "stores/TasksStore";
import PomodoroStore from "stores/PomodoroStore";
import BreakStore from "stores/BreakStore";
import TaskActions from "actions/TaskActions";
import * as BreakActions from "actions/BreakActions";
import * as PomodoroActions from "actions/PomodoroActions";
import { formatDuration } from "services/TimeFormatter";
import { FlatButton, Paper } from "material-ui";

let TaskDetailScreen = React.createClass({

  componentWillMount() {
    TasksStore.addChangeListener(this.onChange);
    PomodoroStore.addChangeListener(this.onChange);
    BreakStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this.onChange);
    PomodoroStore.removeChangeListener(this.onChange);
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

      isPomodoroRunning: PomodoroStore.isPomodoroRunning(),
      pomodoroDuration: PomodoroStore.getPomodoroDuration(),

      isBreakRunning: BreakStore.isBreakRunning(),
      breakDuration: BreakStore.getBreakDuration(),
    };
  },

  renderContent() {
    if (this.state.isPomodoroRunning) {
      return `running: ${formatDuration(this.state.pomodoroDuration)}`;
    }
    if (this.state.isBreakRunning) {
      return `on break: ${formatDuration(this.state.breakDuration)}`;
    }
    return "";
  },

  renderStartStopButton() {
    if (this.state.isPomodoroRunning) {
      return <FlatButton onClick={ PomodoroActions.stop }>Stop</FlatButton>;
    }
    if (this.state.isBreakRunning) {
      return <FlatButton onClick={ BreakActions.stop }>Stop</FlatButton>;
    }

    return <FlatButton onClick={ PomodoroActions.start }>Start</FlatButton>;
  },

  render() {
    return (
      <Paper zDepth={1}>
        <h4>{ this.state.task.description }</h4>
        {
          this.renderContent()
        }
        <div>{ this.state.task.completedPomodoros } pomodoros completed</div>

        <div className="task-detail__actions">
          <FlatButton onClick={ this.deselectTask }>Back</FlatButton>
          { this.renderStartStopButton() }
          <FlatButton onClick={ this.deleteTask }>Delete</FlatButton>
          <FlatButton>Finished</FlatButton>
        </div>
      </Paper>
    );
  },

  deselectTask() {
    TaskActions.deselectTask();
  },

  // completeTask() {
  //   TaskActions.completeTask();
  // },

  deleteTask() {
    TaskActions.deleteTask(this.state.task);
  },

});

export default TaskDetailScreen;
