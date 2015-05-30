import React from "react";
import { IconButton, SvgIcon, TextField } from "material-ui";

let TaskList = React.createClass({

  propTypes: {
    newTask: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {};
  },

  render() {
    return (
      <form className="new-task-form"
        style={{ borderTop: "1px solid #f0f0f0" }}
        onSubmit={ (e) => { e.preventDefault(); this.planTask(); } }>

        <TextField className="new-task-form__input"
          value={ this.state.description }
          hintText="What are you working on next?"
          errorText={ this.state.errorText }
          onChange={ this.setDescription } />

        <IconButton tooltip="Plan task">
          <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_add_24px" />
        </IconButton>

        <IconButton tooltip="Start Pomodoro">
          <SvgIcon styles={{ height: 24, width: 24 }} className="svg-ic_play_arrow_24px" />
        </IconButton>
      </form>
    );
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
  },

});

export default TaskList;
