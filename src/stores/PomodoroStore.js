import * as PomodoroActions from "actions/PomodoroActions";
import TaskActions from "actions/TaskActions";
import TasksStore from "stores/TasksStore";
import Dispatcher from "services/Dispatcher";
import { EventEmitter } from "events";

const FULL_POMODORO_DURATION = 25 * 60 * 1000;
let pomodoroRunning = false;
let pomodoroStartedAt;
let pomodoroDuration = 0;
let timerId;

function startPomodoro() {
  if (pomodoroRunning) {
    throw new Error("Can't start pomodoro because one is already running");
  }
  pomodoroRunning = true;
  pomodoroStartedAt = Date.now();
  pomodoroDuration = 0;
  timerId = setInterval(PomodoroActions.tick, 0);
}

function stopPomodoro() {
  pomodoroRunning = false;
  pomodoroStartedAt = null;
  pomodoroDuration = 0;
  clearInterval(timerId);
}

function updatePomodoroDuration() {
  pomodoroDuration = Date.now() - pomodoroStartedAt;
  if (pomodoroDuration > FULL_POMODORO_DURATION) {
    stopPomodoro();
    setTimeout(PomodoroActions.finished, 0);
    setTimeout(TaskActions.incrementCompletedPomodoros, 0);
  }
}

let eventEmitter = new EventEmitter();

let PomodoroStore = {
  addChangeListener(callback) {
    eventEmitter.addListener("change", callback);
  },

  removeChangeListener(callback) {
    eventEmitter.removeListener("change", callback);
  },

  isPomodoroRunning() {
    return pomodoroRunning;
  },

  getPomodoroDuration() {
    return pomodoroDuration;
  },
};

function emitChange() {
  eventEmitter.emit("change");
}

function handleAction(payload) {
  if (payload.actionType === PomodoroActions.START) {
    startPomodoro();
    emitChange();
  } else if (payload.actionType === PomodoroActions.STOP) {
    stopPomodoro();
    emitChange();
  } else if (payload.actionType === PomodoroActions.FINISHED) {
    stopPomodoro();
    emitChange();
  } else if (payload.actionType === PomodoroActions.TICK) {
    updatePomodoroDuration();
    emitChange();
  } else if (payload.actionType === TaskActions.DELETE_TASK) {
    Dispatcher.waitFor([TasksStore.dispatchToken]);
    if (!TasksStore.getCurrentTask()) {
      stopPomodoro();
    }
    emitChange();
  } else if (payload.actionType === TaskActions.DESELECT_TASK) {
    Dispatcher.waitFor([TasksStore.dispatchToken]);
    if (!TasksStore.getCurrentTask()) {
      stopPomodoro();
    }
    emitChange();
  }
}

PomodoroStore.dispatchToken = Dispatcher.register(handleAction);

export default PomodoroStore;
