import React from "react";
import NewTaskForm from "elements/NewTaskForm";
import NotificationPermissionToggle from "elements/NotificationPermissionToggle";
import TaskList from "elements/TaskList";
import TasksStore from "stores/TasksStore";
import TaskActions from "actions/TaskActions";

let TaskListScreen = React.createClass({

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
    return { tasks: TasksStore.getTasks() };
  },

  render() {
    return (
      <div>
        <div className="task-list-screen__list">
          <TaskList tasks={ this.state.tasks }
            selectTask={ this.selectTask }
            selectTaskAndStartPomodoro={ this.selectTaskAndStartPomodoro }
            deleteTask={ this.deleteTask }
            markTaskFinished={ TaskActions.markTaskFinished } />
        </div>

        <NewTaskForm newTask={ this.createNewTask }/>

        <NotificationPermissionToggle />
      </div>
    );
  },

  createNewTask(task) {
    TaskActions.createNewTask(task);
  },

  deleteTask(task) {
    TaskActions.deleteTask(task);
  },

  selectTask(task) {
    TaskActions.selectTask(task);
  },

  selectTaskAndStartPomodoro(task) {
    TaskActions.selectTaskAndStartPomodoro(task);
  },

});

export default TaskListScreen;
