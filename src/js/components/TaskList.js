import React from "react";
import { FlatButton, Paper } from "material-ui";
let TaskList = React.createClass({

  render() {
    return <Paper zDepth={1}>
      <ul className="list--no-markers">
        {
          this.props.tasks.map( (task) => {
            return <li className="task">
              {task.description}
              <div className="task__actions">
                <FlatButton>Start</FlatButton>
                <FlatButton>Delete</FlatButton>
                <FlatButton>Done</FlatButton>
              </div>
            </li>;
          })
        }
      </ul>
    </Paper>;
  }

});

export default TaskList;
