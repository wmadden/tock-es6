import React from "bower_components/react/react";
import TaskList from "components/TaskList";
import TasksStore from "stores/TasksStore";

let App = React.createClass({

    render() {
      return <div className="ui segment">
        <TaskList tasks={ TasksStore.getTasks() } />
      </div>;
    }

});

export default App;
