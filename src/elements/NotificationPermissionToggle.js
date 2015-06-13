import React from "react";
import { Toggle } from "material-ui";
import PermissionStore from "stores/PermissionStore";
import PreferencesActions from "actions/PreferencesActions";

const NotificationPermissionToggle = React.createClass({
  propTypes: {
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  componentWillMount() {
    PermissionStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    PermissionStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState(this.getStateFromStores());
  },

  onToggle(event, toggled) {
    if (toggled) {
      PreferencesActions.enableNotifications();
    } else {
      PreferencesActions.disableNotifications();
    }
  },

  getStateFromStores() {
    return {
      notificationsEnabled: PermissionStore.getPermission("notifications"),
    };
  },

  render() {
    return (
      <Toggle
        label="Should I show a notification when your pomodoro ends?"
        defaultToggled={ this.state.notificationsEnabled }
        onToggle={ this.onToggle }
        disabled={ this.state.notificationsEnabled }
      />
    );
  },

});

export default NotificationPermissionToggle;
