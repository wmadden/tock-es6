import React from "bower_components/react/react";
// import NewTaskForm from "components/NewTaskForm";
import TaskList from "components/TaskList";
import TasksStore from "stores/TasksStore";
import TaskActions from "actions/TaskActions";

let App = React.createClass({

    render() {
      return <div className="ui segment">
        <TaskList tasks={ TasksStore.getTasks() } />
        {/* <NewTaskForm onNewTask={ this.createNewTask.bind(this) }/>*/}
      </div>;
    },

    createNewTask(spec) {
      TaskActions.createNewTask(spec);
    }

});

export default App;
