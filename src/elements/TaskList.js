import React from "react";
import classnames from "classnames";
import { IconButton, SvgIcon } from "material-ui";
let TaskList = React.createClass({

  propTypes: {
    selectTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    markTaskFinished: React.PropTypes.func.isRequired,
    tasks: React.PropTypes.array.isRequired,
  },

  render() {
    let { deleteTask, selectTask, markTaskFinished, tasks } = this.props;
    let orderedTasks = this.orderTasks(tasks);

    function taskItem(task) {
      function renderMarkFinishedButton() {
        if (!task.finished) {
          return (
            <IconButton
              tooltip="Mark task finished"
              onClick={ (e) => { e.stopPropagation(); markTaskFinished(task); }}
            >
              <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_done_24px" />
            </IconButton>
          );
        }
        return null;
      }

      return (
        <li
          className={ classnames("task cf", { "task--finished": task.finished }) }
          key={task.id} onClick={ () => selectTask(task) }
        >
          <span className="task__description" style={ { "float": "left" } }>
            { task.description }
            { task.completedPomodoros > 0 ? ` (${task.completedPomodoros})` : "" }
          </span>
          <div className="task__actions">
            { renderMarkFinishedButton() }
            <IconButton
              tooltip="Delete task"
              onClick={ (e) => { e.stopPropagation(); deleteTask(task); }}
            >
              <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_delete_24px" />
            </IconButton>
          </div>
        </li>
      );
    }

    return (
      <div>
        <ul className="list--no-markers">
          {
            orderedTasks.map( (task) => taskItem(task) )
          }
        </ul>
      </div>
    );
  },

  orderTasks(tasks) {
    let inCompleteTasks = tasks.filter((t) => !t.finished);
    return inCompleteTasks.sort((taskA, taskB) => {
      if (taskA.id < taskB.id) {
        return -1;
      }
      if (taskA.id > taskB.id) {
        return 1;
      }
      return 0;
    });
  },

});

export default TaskList;
