import React from "react";
import NewTaskForm from "components/NewTaskForm";
import TaskList from "components/TaskList";
import TasksStore from "stores/TasksStore";
import TaskActions from "actions/TaskActions";

let TaskListScreen = React.createClass({

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return { tasks: TasksStore.getTasks() };
  },

  render() {
    return <div>
      <div className="task-list-screen__list">
        <TaskList tasks={ this.state.tasks }
          selectTask={ this.selectTask }
          deleteTask={ this.deleteTask } />
      </div>

      <NewTaskForm newTask={ this.createNewTask }/>
    </div>;
  },

  createNewTask(spec) {
    TaskActions.createNewTask(spec);
  },

  deleteTask(task) {
    TaskActions.deleteTask(task);
  },

  selectTask(task) {
    TaskActions.selectTask(task);
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

export default TaskListScreen;
