import React from "react";
import TaskListScreen from "ui/TaskListScreen";
import TaskDetailScreen from "ui/TaskDetailScreen";
import TasksStore from "stores/TasksStore";

function branch(condition, whenTrue, whenFalse) {
  return condition ? whenTrue() : whenFalse();
}

let App = React.createClass({

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      currentTask: TasksStore.getCurrentTask()
    };
  },

  render() {
    return <div className="app">
      <h1>Tock</h1>
      { branch( this.state.currentTask,
          () => <TaskDetailScreen />,
          () => <TaskListScreen />
        ) }
    </div>;
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

export default App;
