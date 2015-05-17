import React from "react";
import { FlatButton, TextField } from "material-ui";
let TaskList = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return <form class="new-task-form" onSubmit={ (e) => { e.preventDefault(); this.planTask } }>
      <TextField
        onChange={ this.setDescription }
        value={ this.state.description }
        hintText="What are you working on next?"
        errorText={ this.state.errorText }
        className="new-task-form__input" />

      <FlatButton label="Plan" onClick={ this.planTask } />
      <FlatButton label="Start" />
    </form>;
  },

  setDescription(e) {
    this.state.description = e.target.value;
    this.setState({ errorText: null });
  },

  planTask() {
    if (!this.state.description) {
      this.setState({ errorText: "What, nothing?" });
      return;
    }
    this.props.newTask({ description: this.state.description });
    this.setState({ description: null });
  }


});

export default TaskList;