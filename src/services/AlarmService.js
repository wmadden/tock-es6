import * as PomodoroActions from "actions/PomodoroActions";
import * as BreakActions from "actions/PomodoroActions";
import Dispatcher from "services/Dispatcher";
import * as AudioService from "services/AudioService";

function handleAction(action) {
  if (action.actionType === PomodoroActions.FINISHED) {
    AudioService.play("/audio/alarm.ogg");
    setTimeout(BreakActions.start);
  }
}

Dispatcher.register(handleAction);
