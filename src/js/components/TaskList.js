import React from "react";
import { /*RaisedButton, Paper,*/ Menu } from "material-ui";

var numberMenuItems = [
   { payload: '1', text: 'All', number: '22' },
   { payload: '3', text: 'Uncategorized', number: '6'},
   { payload: '4', text: 'Trash', number: '11' }
];

let TaskList = React.createClass({

  render() {
    return <Menu menuItems={numberMenuItems} />;
    //
    // <Paper zDepth={1}>
    //   <ul className="ui fluid vertical menu">
    //   {
    //     this.props.tasks.map( (task) => {
    //       return <li>
    //         <RaisedButton label={ task.description } />
    //       </li>;
    //     })
    //   }
    //   </ul>
    // </Paper>;
  }

});

export default TaskList;
