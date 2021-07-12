export var ONE_SECOND = 1000;
export var ONE_MINUTE = 60 * ONE_SECOND;
export var ONE_HOUR = 60 * ONE_MINUTE;
export var ONE_KILO_BYTE = 1024;
export var CLIENT_ID_TOKEN = 'datafluxRum:client:id';
export var RumEventType = {
  ACTION: 'action',
  ERROR: 'error',
  LONG_TASK: 'long_task',
  VIEW: 'view',
  RESOURCE: 'resource',
  APP: 'app',
  ACTION: 'action'
};
export var RequestType = {
  XHR: 'network',
  DOWNLOAD: 'resource'
};
export var ActionType = {
  tap: 'tap',
  longpress: 'longpress',
  longtap: 'longtap'
};
export var MpHook = {
  data: 1,
  onLoad: 1,
  onShow: 1,
  onReady: 1,
  render: 1,
  onPullDownRefresh: 1,
  onReachBottom: 1,
  onPageScroll: 1,
  onResize: 1,
  onHide: 1,
  onUnload: 1
};