import Dispatcher from "../services/Dispatcher";

export const START = "POMODORO_ACTIONS__START";
export const STOP = "POMODORO_ACTIONS__STOP";
export const FINISHED = "POMODORO_ACTIONS__FINISHED";
export const TICK = "POMODORO_ACTIONS__TICK";

export function start() {
  Dispatcher.dispatch({
    actionType: START
  });
}

export function stop() {
  Dispatcher.dispatch({
    actionType: STOP
  });
}

export function finished() {
  Dispatcher.dispatch({
    actionType: FINISHED
  });
}

export function tick() {
  Dispatcher.dispatch({
    actionType: TICK
  });
}
