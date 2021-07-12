"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startActionCollection = startActionCollection;

var _utils = require("../../helper/utils");

var _lifeCycle = require("../../core/lifeCycle");

var _enums = require("../../helper/enums");

var _trackActions = require("./trackActions");

function startActionCollection(lifeCycle, configuration, Vue) {
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.AUTO_ACTION_COMPLETED, function (action) {
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processAction(action));
  });

  if (configuration.trackInteractions) {
    (0, _trackActions.trackActions)(lifeCycle, Vue);
  }
}

function processAction(action) {
  var autoActionProperties = {
    action: {
      error: {
        count: action.counts.errorCount
      },
      id: action.id,
      loadingTime: (0, _utils.msToNs)(action.duration),
      long_task: {
        count: action.counts.longTaskCount
      },
      resource: {
        count: action.counts.resourceCount
      }
    }
  };
  var actionEvent = (0, _utils.extend2Lev)({
    action: {
      target: {
        name: action.name
      },
      type: action.type
    },
    date: action.startClocks,
    type: _enums.RumEventType.ACTION
  }, autoActionProperties);
  return {
    rawRumEvent: actionEvent,
    startTime: action.startClocks
  };
}