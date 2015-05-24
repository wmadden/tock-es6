import React from "react";
import { FlatButton, Paper } from "material-ui";
let TaskList = React.createClass({

  render() {
    return <Paper zDepth={1}>
      <ul className="list--no-markers">
        {
          this.props.tasks.map( (task) => {
            return <li className="task" onClick={ () => this.props.selectTask(task) }>
              { task.description }
              { task.completedPomodoros > 0 ? ` (${task.completedPomodoros})` : "" }
              <div className="task__actions">
                <FlatButton
                  onClick={ (e) => {
                    e.stopPropagation();
                    this.props.selectTaskAndStartPomodoro(task);
                  }}>
                  Start
                </FlatButton>
                <FlatButton onClick={ (e) => {
                    e.stopPropagation();
                    this.props.deleteTask(task);
                  }}>
                  Delete
                </FlatButton>
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
