"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tracker = exports.sdk = void 0;

var _utils = require("../helper/utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getSDK() {
  var sdk = null,
      tracker = '';

  try {
    if (uni && (typeof uni === "undefined" ? "undefined" : _typeof(uni)) === 'object' && typeof uni.request === 'function') {
      sdk = uni;
    }

    if (wx && (typeof wx === "undefined" ? "undefined" : _typeof(wx)) === 'object' && typeof wx.request === 'function') {
      // 微信
      tracker = wx;
    } else if (my && (typeof my === "undefined" ? "undefined" : _typeof(my)) === 'object' && typeof my.request === 'function') {
      // 支付宝
      tracker = my;
    } else if (tt && (typeof tt === "undefined" ? "undefined" : _typeof(tt)) === 'object' && typeof tt.request === 'function') {
      // 头条
      tracker = tt;
    } else if (dd && (typeof dd === "undefined" ? "undefined" : _typeof(dd)) === 'object' && typeof dd.request === 'function') {
      // dingding
      tracker = dd;
    } else if (qq && (typeof qq === "undefined" ? "undefined" : _typeof(qq)) === 'object' && typeof qq.request === 'function') {
      // QQ 小程序、QQ 小游戏
      tracker = qq;
    } else if (swan && (typeof swan === "undefined" ? "undefined" : _typeof(swan)) === 'object' && typeof swan.request === 'function') {
      // 百度小程序
      tracker = swan;
    } else {
      tracker = uni;
    }
  } catch (err) {
    console.warn('unsupport platform, Fail to start');
  }

  console.log('------get SDK-------');
  return {
    sdk: sdk,
    tracker: tracker
  };
}

var instance = getSDK();
var sdk = instance.sdk;
exports.sdk = sdk;
var tracker = instance.tracker;
exports.tracker = tracker;