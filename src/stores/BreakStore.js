import * as BreakActions from "actions/BreakActions";
import Dispatcher from "services/Dispatcher";
import { EventEmitter } from "events";

const BREAK_DURATION = 5 * 60 * 1000;
let breakRunning = false;
let breakStartedAt;
let breakDuration = 0;
let timerId;

function startBreak() {
  if (breakRunning) {
    throw new Error("Can't start Break because one is already running");
  }
  breakRunning = true;
  breakStartedAt = Date.now();
  breakDuration = 0;
  timerId = setInterval(BreakActions.tick, 0);
}

function stopBreak() {
  breakRunning = false;
  breakStartedAt = null;
  breakDuration = 0;
  clearInterval(timerId);
}

function updateBreakDuration() {
  breakDuration = Date.now() - breakStartedAt;
  if (breakDuration > BREAK_DURATION) {
    stopBreak();
    setTimeout(BreakActions.finished, 0);
  }
}

let eventEmitter = new EventEmitter();

let BreakStore = {
  addChangeListener(callback) {
    eventEmitter.addListener("change", callback);
  },

  removeChangeListener(callback) {
    eventEmitter.removeListener("change", callback);
  },

  isBreakRunning() {
    return breakRunning;
  },

  getBreakDuration() {
    return breakDuration;
  },
};

function emitChange() {
  eventEmitter.emit("change");
}

function handleAction(payload) {
  if (payload.actionType === BreakActions.START) {
    startBreak();
    emitChange();
  } else if (payload.actionType === BreakActions.STOP) {
    stopBreak();
    emitChange();
  } else if (payload.actionType === BreakActions.FINISHED) {
    stopBreak();
    emitChange();
  } else if (payload.actionType === BreakActions.TICK) {
    updateBreakDuration();
    emitChange();
  }
}

BreakStore.dispatchToken = Dispatcher.register(handleAction);

export default BreakStore;
