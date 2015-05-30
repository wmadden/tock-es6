import React from "react";
import TaskListScreen from "ui/TaskListScreen";
import TaskDetailScreen from "ui/TaskDetailScreen";
import TasksStore from "stores/TasksStore";

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

  renderScreen() {
    if (this.state.currentTask) {
      return <TaskDetailScreen />;
    }
    return <TaskListScreen />;
  },

  render() {
    return (
      <div className="app">
        <h4>Tock</h4>
        { this.renderScreen() }
      </div>
    );
  },

});

export default App;
