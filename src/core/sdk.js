import { deepMixObject } from '../helper/utils'

function getSDK() {
	var sdk = null,
		tracker = ''
	try {
		if (uni && typeof uni === 'object' && typeof uni.request === 'function') {
			sdk = uni
		}

		if (wx && typeof wx === 'object' && typeof wx.request === 'function') {
			// 微信
			tracker = wx
		} else if (
			my &&
			typeof my === 'object' &&
			typeof my.request === 'function'
		) {
			// 支付宝
			tracker = my
		} else if (
			tt &&
			typeof tt === 'object' &&
			typeof tt.request === 'function'
		) {
			// 头条
			tracker = tt
		} else if (
			dd &&
			typeof dd === 'object' &&
			typeof dd.request === 'function'
		) {
			// dingding
			tracker = dd
		} else if (
			qq &&
			typeof qq === 'object' &&
			typeof qq.request === 'function'
		) {
			// QQ 小程序、QQ 小游戏
			tracker = qq
		} else if (
			swan &&
			typeof swan === 'object' &&
			typeof swan.request === 'function'
		) {
			// 百度小程序
			tracker = swan
		} else {
			tracker = uni
		}
	} catch (err) {
		console.warn('unsupport platform, Fail to start')
	}
	console.log('------get SDK-------')
	return { sdk, tracker }
}
const instance = getSDK()

export const sdk = instance.sdk
export const tracker = instance.tracker
