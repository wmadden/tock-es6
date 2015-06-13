import PermissionActions from "actions/PermissionActions";
import Dispatcher from "services/Dispatcher";
import { EventEmitter } from "events";

let permissions = {};

let eventEmitter = new EventEmitter();

let PermissionStore = {
  addChangeListener(callback) {
    eventEmitter.addListener("change", callback);
  },

  removeChangeListener(callback) {
    eventEmitter.removeListener("change", callback);
  },

  getPermission(name) {
    return permissions[name];
  },
};

function emitChange() {
  eventEmitter.emit("change");
}

function setPermission(name, value) {
  permissions[name] = !!value; // Coerce to boolean
}

function handleAction(payload) {
  if (payload.actionType === PermissionActions.SET_PERMISSION) {
    let { name, value } = payload;
    setPermission(name, value);
    emitChange();
  }
}

PermissionStore.dispatchToken = Dispatcher.register(handleAction);

export default PermissionStore;
