"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitIdlePageActivity = waitIdlePageActivity;
exports.trackPageActivities = trackPageActivities;
exports.waitPageActivitiesCompletion = waitPageActivitiesCompletion;
exports.PAGE_ACTIVITY_MAX_DURATION = exports.PAGE_ACTIVITY_END_DELAY = exports.PAGE_ACTIVITY_VALIDATION_DELAY = void 0;

var _utils = require("../helper/utils");

var _lifeCycle = require("../core/lifeCycle");

var _observable = require("../core/observable");

// Delay to wait for a page activity to validate the tracking process
var PAGE_ACTIVITY_VALIDATION_DELAY = 100; // Delay to wait after a page activity to end the tracking process

exports.PAGE_ACTIVITY_VALIDATION_DELAY = PAGE_ACTIVITY_VALIDATION_DELAY;
var PAGE_ACTIVITY_END_DELAY = 100; // Maximum duration of the tracking process

exports.PAGE_ACTIVITY_END_DELAY = PAGE_ACTIVITY_END_DELAY;
var PAGE_ACTIVITY_MAX_DURATION = 10000;
exports.PAGE_ACTIVITY_MAX_DURATION = PAGE_ACTIVITY_MAX_DURATION;

function waitIdlePageActivity(lifeCycle, completionCallback) {
  var _trackPageActivities = trackPageActivities(lifeCycle);

  var pageActivitiesObservable = _trackPageActivities.observable;
  var stopPageActivitiesTracking = _trackPageActivities.stop;

  var _waitPageActivitiesCompletion = waitPageActivitiesCompletion(pageActivitiesObservable, stopPageActivitiesTracking, completionCallback);

  var stopWaitPageActivitiesCompletion = _waitPageActivitiesCompletion.stop;

  function stop() {
    stopWaitPageActivitiesCompletion();
    stopPageActivitiesTracking();
  }

  return {
    stop: stop
  };
} // Automatic action collection lifecycle overview:
//                      (Start new trackPageActivities)
//              .-------------------'--------------------.
//              v                                        v
//     [Wait for a page activity ]          [Wait for a maximum duration]
//     [timeout: VALIDATION_DELAY]          [  timeout: MAX_DURATION    ]
//          /                  \                           |
//         v                    v                          |
//  [No page activity]   [Page activity]                   |
//         |                   |,----------------------.   |
//         v                   v                       |   |
//     (Discard)     [Wait for a page activity]        |   |
//                   [   timeout: END_DELAY   ]        |   |
//                       /                \            |   |
//                      v                  v           |   |
//             [No page activity]    [Page activity]   |   |
//                      |                 |            |   |
//                      |                 '------------'   |
//                      '-----------. ,--------------------'
//                                   v
//                                 (End)
//
// Note: because MAX_DURATION > VALIDATION_DELAY, we are sure that if the process is still alive
// after MAX_DURATION, it has been validated.


function trackPageActivities(lifeCycle) {
  var observable = new _observable.Observable();
  var subscriptions = [];
  var firstRequestIndex;
  var pendingRequestsCount = 0;
  subscriptions.push(lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.PAGE_SET_DATA_UPDATE, function () {
    notifyPageActivity();
  }), lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.PAGE_ALIAS_ACTION, function () {
    notifyPageActivity();
  }));
  subscriptions.push(lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.REQUEST_STARTED, function (startEvent) {
    if (firstRequestIndex === undefined) {
      firstRequestIndex = startEvent.requestIndex;
    }

    pendingRequestsCount += 1;
    notifyPageActivity();
  }));
  subscriptions.push(lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.REQUEST_COMPLETED, function (request) {
    // If the request started before the tracking start, ignore it
    if (firstRequestIndex === undefined || request.requestIndex < firstRequestIndex) {
      return;
    }

    pendingRequestsCount -= 1;
    notifyPageActivity();
  }));

  function notifyPageActivity() {
    observable.notify({
      isBusy: pendingRequestsCount > 0
    });
  }

  return {
    observable: observable,
    stop: function stop() {
      (0, _utils.each)(subscriptions, function (sub) {
        sub.unsubscribe();
      });
    }
  };
}

function waitPageActivitiesCompletion(pageActivitiesObservable, stopPageActivitiesTracking, completionCallback) {
  var idleTimeoutId;
  var hasCompleted = false;
  var validationTimeoutId = setTimeout(function () {
    complete({
      hadActivity: false
    });
  }, PAGE_ACTIVITY_VALIDATION_DELAY);
  var maxDurationTimeoutId = setTimeout(function () {
    complete({
      hadActivity: true,
      endTime: (0, _utils.now)()
    });
  }, PAGE_ACTIVITY_MAX_DURATION);
  pageActivitiesObservable.subscribe(function (data) {
    var isBusy = data.isBusy;
    clearTimeout(validationTimeoutId);
    clearTimeout(idleTimeoutId);
    var lastChangeTime = (0, _utils.now)();

    if (!isBusy) {
      idleTimeoutId = setTimeout(function () {
        complete({
          hadActivity: true,
          endTime: lastChangeTime
        });
      }, PAGE_ACTIVITY_END_DELAY);
    }
  });

  function stop() {
    hasCompleted = true;
    clearTimeout(validationTimeoutId);
    clearTimeout(idleTimeoutId);
    clearTimeout(maxDurationTimeoutId);
    stopPageActivitiesTracking();
  }

  function complete(params) {
    if (hasCompleted) {
      return;
    }

    stop();
    completionCallback(params);
  }

  return {
    stop: stop
  };
}