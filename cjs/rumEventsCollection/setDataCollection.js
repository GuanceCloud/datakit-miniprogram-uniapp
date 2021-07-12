"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSetDataColloction = startSetDataColloction;

var _lifeCycle = require("../core/lifeCycle");

var _utils = require("../helper/utils");

function resetSetData(data, callback, lifeCycle, mpInstance) {
  var pendingStartTimestamp = (0, _utils.now)();

  var _callback = function _callback() {
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.PAGE_SET_DATA_UPDATE, {
      pendingStartTimestamp: pendingStartTimestamp,
      updateEndTimestamp: (0, _utils.now)()
    });

    if (typeof callback === 'function') {
      callback.call(mpInstance);
    }
  };

  return _callback;
}

function startSetDataColloction(lifeCycle, Vue) {
  var originVueExtend = Vue.extend;

  Vue.extend = function (vueOptions) {
    var userDefinedMethod = vueOptions['onLoad'];

    vueOptions['onLoad'] = function () {
      var mpInstance = this.$scope;
      var setData = mpInstance.setData; // 重写setData

      if (typeof setData === 'function') {
        try {
          // 这里暂时这么处理 只读属性 会抛出错误
          mpInstance.setData = function (data, callback) {
            return setData.call(mpInstance, data, resetSetData(data, callback, lifeCycle, mpInstance));
          };
        } catch (err) {
          Object.defineProperty(mpInstance.__proto__, 'setData', {
            configurable: false,
            enumerable: false,
            value: function value(data, callback) {
              return setData.call(mpInstance, data, resetSetData(data, callback, lifeCycle, mpInstance));
            }
          });
        }
      }

      return userDefinedMethod && userDefinedMethod.apply(this, arguments);
    };

    return originVueExtend.call(this, vueOptions);
  };
}