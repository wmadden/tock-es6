import React from "react";
import { timeSegments } from "services/TimeFormatter";

const Clockface = React.createClass({
  propTypes: {
    time: React.PropTypes.number,
  },

  render() {
    let segments = timeSegments(this.props.time);
    function separator(i) {
      if (i < segments.length - 1) {
        return ":";
      }
      return "";
    }

    return (
      <div styles={Clockface.styles.container}>
        {
          segments.map( (segment, i) => {
            return (
              <span styles={Clockface.styles.segment}>
                { segment }{ separator(i) }
              </span>
            );
          })
        }
      </div>
    );
  },
});

Clockface.styles = {
  segment: {},
  container: {},
};

export default Clockface;
