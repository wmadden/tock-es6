import React from "react";
import { FlatButton, Paper } from "material-ui";
let TaskList = React.createClass({

  propTypes: {
    selectTaskAndStartPomodoro: React.PropTypes.func.isRequired,
    selectTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    tasks: React.PropTypes.array.isRequired,
  },

  render() {
    return (
      <Paper zDepth={1}>
        <ul className="list--no-markers">
          {
            this.props.tasks.map( (task) => {
              return (
                <li className="task" onClick={ () => this.props.selectTask(task) }>
                  { task.description }
                  { task.completedPomodoros > 0 ? ` (${task.completedPomodoros})` : "" }
                  <div className="task__actions">
                    <FlatButton
                      onClick={ (e) => { e.stopPropagation(); this.props.selectTaskAndStartPomodoro(task); }}>
                      Start
                    </FlatButton>
                    <FlatButton onClick={ (e) => { e.stopPropagation(); this.props.deleteTask(task); }}>
                      Delete
                    </FlatButton>
                    <FlatButton>Done</FlatButton>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </Paper>
    );
  },

});

export default TaskList;
