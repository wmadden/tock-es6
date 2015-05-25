import Dispatcher from "../services/Dispatcher";

export const START = "BREAK_ACTIONS__START";
export const STOP = "BREAK_ACTIONS__STOP";
export const FINISHED = "BREAK_ACTIONS__FINISHED";
export const TICK = "BREAK_ACTIONS__TICK";

export function start() {
  Dispatcher.dispatch({
    actionType: START,
  });
}

export function stop() {
  Dispatcher.dispatch({
    actionType: STOP,
  });
}

export function finished() {
  Dispatcher.dispatch({
    actionType: FINISHED,
  });
}

export function tick() {
  Dispatcher.dispatch({
    actionType: TICK,
  });
}
