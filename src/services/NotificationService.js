import Notify from "notifyjs";
import PermissionActions from "actions/PermissionActions";

function updatePermissionStore() {
  PermissionActions.setPermission("notifications", !Notify.needsPermission);
}

function init() {
  updatePermissionStore();
}

function requestPermission() {
  return new Promise( (resolve, reject) => {
    if (Notify.needsPermission) {
      Notify.requestPermission(resolve, reject);
    } else {
      resolve();
    }
  }).then(() => {
    updatePermissionStore();
  });
}

function showNotification(text) {
  let notification = new Notify(text, {});
  return requestPermission().then(() => notification.show);
}

export default {
  init,
  requestPermission,
  showNotification,
};
