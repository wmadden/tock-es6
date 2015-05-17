import React from "react";
import { FlatButton, TextField } from "material-ui";

let TaskList = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return <form class="new-task-form"
      onSubmit={ (e) => { e.preventDefault(); this.planTask(); } }>

      <TextField className="new-task-form__input"
        value={ this.state.description }
        hintText="What are you working on next?"
        errorText={ this.state.errorText }
        onChange={ this.setDescription } />

      <FlatButton label="Plan" />
      <FlatButton label="Start" onClick={ (e) => e.preventDefault() } />

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
