import React from "react";
import TaskListScreen from "ui/TaskListScreen";
import TaskDetailScreen from "ui/TaskDetailScreen";
import TasksStore from "stores/TasksStore";
import { branch } from "components/helpers";

let App = React.createClass({

  getInitialState() {
    return this.getStateFromStores();
  },

  componentWillMount() {
    TasksStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    TasksStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState(this.getStateFromStores());
  },

  getStateFromStores() {
    return {
      currentTask: TasksStore.getCurrentTask(),
    };
  },

  render() {
    return (
      <div className="app">
        <h4>Tock</h4>
        { branch( this.state.currentTask,
            () => <TaskDetailScreen />,
            () => <TaskListScreen />
          ) }
      </div>
    );
  },

});

export default App;
