import React from "react";
import TasksStore from "stores/TasksStore";
import TaskActions from "actions/TaskActions";
import { FlatButton } from "material-ui";

let TaskDetailScreen = React.createClass({

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      task: TasksStore.getCurrentTask()
    };
  },

  render() {
    return <div>
      <FlatButton onClick={ this.deselectTask }>Back</FlatButton>

      <div>{ this.state.task.description }</div>
      <div>{ this.state.task.completedPomodoros } pomodoros completed</div>

      <div className="task-detail__actions">
        <FlatButton>Start</FlatButton>
        <FlatButton>Stop</FlatButton>
        <FlatButton onClick={ this.deleteTask }>Delete</FlatButton>
        <FlatButton>Finished</FlatButton>
      </div>
    </div>;
  },

  deselectTask() {
    TaskActions.deselectTask();
  },

  deleteTask() {
    TaskActions.deleteTask(this.state.task);
  },

  componentWillMount() {
    TasksStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState(this.getStateFromStores());
  }

});

export default TaskDetailScreen;
