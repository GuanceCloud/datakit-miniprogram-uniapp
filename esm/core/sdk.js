import { deepMixObject } from '../helper/utils';

function getSDK() {
  var sdk = null,
      tracker = '';

  try {
    if (wx && typeof wx === 'object' && typeof wx.request === 'function') {
      sdk = deepMixObject({}, wx);
      tracker = 'wx';
      wx = sdk;
    }
  } catch (err) {
    console.warn('unsupport platform, Fail to start');
  }

  console.log('------get SDK-------');
  return {
    sdk,
    tracker
  };
}

var instance = getSDK();
export var sdk = instance.sdk;
export var tracker = instance.tracker;