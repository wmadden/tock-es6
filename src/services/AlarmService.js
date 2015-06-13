import * as PomodoroActions from "actions/PomodoroActions";
import * as BreakActions from "actions/BreakActions";
import Dispatcher from "services/Dispatcher";
import * as AudioService from "services/AudioService";
import NotificationService from "services/NotificationService";

function handleAction(action) {
  if (action.actionType === PomodoroActions.FINISHED) {
    AudioService.play("/audio/alarm.ogg");

    NotificationService.showNotification("Pomodoro finished!", {
      icon: "/images/icon-128.png",
      body: "Great work, now take a 5 minute break.",
      timeout: 10,
    });

    setTimeout(BreakActions.start);
  } else if (action.actionType === BreakActions.FINISHED) {
    AudioService.play("/audio/alarm.ogg");

    NotificationService.showNotification("Back to work!", {
      icon: "/images/icon-128.png",
      body: "Your break is over, time to start the next pomodoro.",
      timeout: 10,
    });
  }
}

Dispatcher.register(handleAction);
