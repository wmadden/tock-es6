import React from "bower_components/react/react";

let TaskList = React.createClass({

  render() {
    return <ul className="ui fluid vertical menu">
      {
        this.props.tasks.map( (task) => {
          return <li>
            <a href="#" className="item">{ task.description }</a>
          </li>;
        })
      }
    </ul>;
  }

});

export default TaskList;
