import NotificationService from "services/NotificationService";

function enableNotifications() {
  return NotificationService.requestPermission();
}

function disableNotifications() {
  // TODO
}

export default {
  enableNotifications,
  disableNotifications,
};
