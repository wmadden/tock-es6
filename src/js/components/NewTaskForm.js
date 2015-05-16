import React from "react";
import { FlatButton, TextField } from "material-ui";
let TaskList = React.createClass({

  render() {
    return <div class="new-task-form">
      <TextField hintText="Add a new task" className="new-task-form__input" />

      <FlatButton label="Plan" />
      <FlatButton label="Start" />
    </div>;
  }

});

export default TaskList;
