import React from "react";
import NewTaskForm from "components/NewTaskForm";
import TaskList from "components/TaskList";
import TasksStore from "./stores/TasksStore";
import TaskActions from "./actions/TaskActions";

let App = React.createClass({

  render() {
    return <div className="app">
      <h1>Tock</h1>

      <div className="task-list-screen__list">
        <TaskList tasks={ TasksStore.getTasks() } />
      </div>

      <NewTaskForm onNewTask={ this.createNewTask.bind(this) }/>
    </div>;
  },

  createNewTask(spec) {
    TaskActions.createNewTask(spec);
  }

});

export default App;
