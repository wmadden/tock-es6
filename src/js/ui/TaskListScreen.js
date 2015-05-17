import React from "react";
import NewTaskForm from "components/NewTaskForm";
import TaskList from "components/TaskList";
import TasksStore from "stores/TasksStore";
import TaskActions from "actions/TaskActions";

let TaskListScreen = React.createClass({

  render() {
    return <div>
      <div className="task-list-screen__list">
        <TaskList tasks={ TasksStore.getTasks() } />
      </div>

      <NewTaskForm newTask={ this.createNewTask }/>
    </div>;
  },

  createNewTask(spec) {
    return console.log("New task", spec);
    TaskActions.createNewTask(spec);
  }

});

export default TaskListScreen;
