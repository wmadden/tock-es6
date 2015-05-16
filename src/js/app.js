import React from "react";
import TaskListScreen from "components/TaskListScreen";

let App = React.createClass({

  render() {
    return <div className="app">
      <h1>Tock</h1>
      <TaskListScreen />
    </div>;
  }

});

export default App;
