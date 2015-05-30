import React from "react";
import { IconButton, SvgIcon, Paper } from "material-ui";
let TaskList = React.createClass({

  propTypes: {
    selectTaskAndStartPomodoro: React.PropTypes.func.isRequired,
    selectTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    tasks: React.PropTypes.array.isRequired,
  },

  render() {
    function taskItem(task) {
      return (
        <li className="task" onClick={ () => this.props.selectTask(task) }>
          { task.description }
          { task.completedPomodoros > 0 ? ` (${task.completedPomodoros})` : "" }
          <div className="task__actions">
            <IconButton
              tooltip="Start Pomodoro"
              onClick={ (e) => { e.stopPropagation(); this.props.selectTaskAndStartPomodoro(task); }}
            >
              <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_play_arrow_24px" />
            </IconButton>

            <IconButton
              tooltip="Delete task"
              onClick={ (e) => { e.stopPropagation(); this.props.deleteTask(task); }}
            >
              <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_delete_24px" />
            </IconButton>

            <IconButton
              tooltip="Mark completed"
              onClick={ (e) => { e.stopPropagation(); }}
            >
              <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_done_24px" />
            </IconButton>
          </div>
        </li>
      );
    }

    return (
      <Paper zDepth={0}>
        <ul className="list--no-markers">
          {
            this.props.tasks.map( (task) => taskItem(task) )
          }
        </ul>
      </Paper>
    );
  },

});

export default TaskList;
