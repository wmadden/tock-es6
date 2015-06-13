import Dispatcher from "services/Dispatcher";

const SET_PERMISSION = Symbol("Set permission");

function setPermission(name, value) {
  Dispatcher.dispatch({
    actionType: SET_PERMISSION,
    name,
    value,
  });
}

export default {
  SET_PERMISSION,
  setPermission,
};
