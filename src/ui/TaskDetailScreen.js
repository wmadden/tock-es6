import React from "react";
import TasksStore from "stores/TasksStore";
import PomodoroStore from "stores/PomodoroStore";
import BreakStore from "stores/BreakStore";
import TaskActions from "actions/TaskActions";
import * as BreakActions from "actions/BreakActions";
import * as PomodoroActions from "actions/PomodoroActions";
import { formatDuration } from "services/TimeFormatter";
import { IconButton, SvgIcon, Paper } from "material-ui";

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
      return (
        <IconButton tooltip="Stop Pomodoro" onClick={ PomodoroActions.stop }>
          <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_stop_24px" />
        </IconButton>
      );
    }
    if (this.state.isBreakRunning) {
      return (
        <IconButton tooltip="Stop Break" onClick={ BreakActions.stop }>
          <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_stop_24px" />
        </IconButton>
      );
    }

    return (
      <IconButton tooltip="Start Pomodoro" onClick={ PomodoroActions.start }>
        <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_play_arrow_24px" />
      </IconButton>
    );
  },

  render() {
    return (
      <Paper zDepth={0} style={{ textAlign: "center" }}>
        <h4>{ this.state.task.description }</h4>
        <div style={{ margin: "20px 0 0", minHeight: 60 }}>
          {
            this.renderContent()
          }
          <div>{ this.state.task.completedPomodoros } pomodoros completed</div>
        </div>

        <div className="task-detail__actions">
          <IconButton tooltip="Back" onClick={ this.deselectTask }>
            <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_arrow_back_24px" />
          </IconButton>

          { this.renderStartStopButton() }

          <IconButton tooltip="Delete task" onClick={ this.deleteTask }>
            <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_delete_24px" />
          </IconButton>

          <IconButton tooltip="Mark completed" onClick={ this.markTaskFinished }>
            <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_done_24px" />
          </IconButton>
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

  markTaskFinished() {
    TaskActions.markTaskFinished(this.state.task);
  },

});

export default TaskDetailScreen;
