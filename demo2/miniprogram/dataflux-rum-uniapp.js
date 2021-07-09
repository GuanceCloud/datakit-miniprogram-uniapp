/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/boot/buildEnv.js":
/*!******************************!*\
  !*** ./src/boot/buildEnv.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildEnv": () => (/* binding */ buildEnv)
/* harmony export */ });
const buildEnv = {
	sdkVersion: '<<< SDK_VERSION >>>',
	sdkName: 'df_uniapp_rum_sdk',
}


/***/ }),

/***/ "./src/boot/rum.entry.js":
/*!*******************************!*\
  !*** ./src/boot/rum.entry.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeRum": () => (/* binding */ makeRum),
/* harmony export */   "datafluxRum": () => (/* binding */ datafluxRum)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _rum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rum */ "./src/boot/rum.js");


const makeRum = function (startRumImpl) {
	var isAlreadyInitialized = false
	var rumGlobal = {
		init: function (Vue, userConfiguration) {
			if (typeof userConfiguration === 'undefined') {
				userConfiguration = {}
			}
			if (!Vue) return
			if (!canInitRum(userConfiguration)) {
				return
			}
			startRumImpl(Vue, userConfiguration)

			isAlreadyInitialized = true
		},
	}
	return rumGlobal
	function canInitRum(userConfiguration) {
		if (isAlreadyInitialized) {
			console.error('DATAFLUX_RUM is already initialized.')
			return false
		}

		if (!userConfiguration.applicationId) {
			console.error(
				'Application ID is not configured, no RUM data will be collected.',
			)
			return false
		}
		if (!userConfiguration.datakitOrigin) {
			console.error(
				'datakitOrigin is not configured, no RUM data will be collected.',
			)
			return false
		}
		if (
			userConfiguration.sampleRate !== undefined &&
			!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isPercentage)(userConfiguration.sampleRate)
		) {
			console.error('Sample Rate should be a number between 0 and 100')
			return false
		}
		return true
	}
}
const datafluxRum = makeRum(_rum__WEBPACK_IMPORTED_MODULE_1__.startRum)


/***/ }),

/***/ "./src/boot/rum.js":
/*!*************************!*\
  !*** ./src/boot/rum.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRum": () => (/* binding */ startRum)
/* harmony export */ });
/* harmony import */ var _buildEnv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildEnv */ "./src/boot/buildEnv.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/configuration */ "./src/core/configuration.js");
/* harmony import */ var _rumEventsCollection_error_errorCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rumEventsCollection/error/errorCollection */ "./src/rumEventsCollection/error/errorCollection.js");
/* harmony import */ var _rumEventsCollection_assembly__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rumEventsCollection/assembly */ "./src/rumEventsCollection/assembly.js");
/* harmony import */ var _rumEventsCollection_parentContexts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../rumEventsCollection/parentContexts */ "./src/rumEventsCollection/parentContexts.js");
/* harmony import */ var _rumEventsCollection_transport_batch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../rumEventsCollection/transport/batch */ "./src/rumEventsCollection/transport/batch.js");
/* harmony import */ var _rumEventsCollection_page_viewCollection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../rumEventsCollection/page/viewCollection */ "./src/rumEventsCollection/page/viewCollection.js");
/* harmony import */ var _rumEventsCollection_requestCollection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../rumEventsCollection/requestCollection */ "./src/rumEventsCollection/requestCollection.js");
/* harmony import */ var _rumEventsCollection_resource_resourceCollection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../rumEventsCollection/resource/resourceCollection */ "./src/rumEventsCollection/resource/resourceCollection.js");
/* harmony import */ var _rumEventsCollection_app_appCollection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../rumEventsCollection/app/appCollection */ "./src/rumEventsCollection/app/appCollection.js");
/* harmony import */ var _rumEventsCollection_performanceCollection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../rumEventsCollection/performanceCollection */ "./src/rumEventsCollection/performanceCollection.js");
/* harmony import */ var _rumEventsCollection_setDataCollection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../rumEventsCollection/setDataCollection */ "./src/rumEventsCollection/setDataCollection.js");
/* harmony import */ var _rumEventsCollection_action_actionCollection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../rumEventsCollection/action/actionCollection */ "./src/rumEventsCollection/action/actionCollection.js");
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");
















const startRum = function (Vue, userConfiguration) {
	const configuration = (0,_core_configuration__WEBPACK_IMPORTED_MODULE_2__.commonInit)(userConfiguration, _buildEnv__WEBPACK_IMPORTED_MODULE_0__.buildEnv)
	const lifeCycle = new _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycle()
	var parentContexts = (0,_rumEventsCollection_parentContexts__WEBPACK_IMPORTED_MODULE_5__.startParentContexts)(lifeCycle)
	var batch = (0,_rumEventsCollection_transport_batch__WEBPACK_IMPORTED_MODULE_6__.startRumBatch)(configuration, lifeCycle)
	;(0,_rumEventsCollection_assembly__WEBPACK_IMPORTED_MODULE_4__.startRumAssembly)(
		userConfiguration.applicationId,
		configuration,
		lifeCycle,
		parentContexts,
	)
	;(0,_rumEventsCollection_app_appCollection__WEBPACK_IMPORTED_MODULE_10__.startAppCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_resource_resourceCollection__WEBPACK_IMPORTED_MODULE_9__.startResourceCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_page_viewCollection__WEBPACK_IMPORTED_MODULE_7__.startViewCollection)(lifeCycle, configuration, Vue)
	;(0,_rumEventsCollection_error_errorCollection__WEBPACK_IMPORTED_MODULE_3__.startErrorCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_requestCollection__WEBPACK_IMPORTED_MODULE_8__.startRequestCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_performanceCollection__WEBPACK_IMPORTED_MODULE_11__.startPagePerformanceObservable)(lifeCycle, configuration)
	;(0,_rumEventsCollection_setDataCollection__WEBPACK_IMPORTED_MODULE_12__.startSetDataColloction)(lifeCycle, Vue)
	;(0,_rumEventsCollection_action_actionCollection__WEBPACK_IMPORTED_MODULE_13__.startActionCollection)(lifeCycle, configuration, Vue)
}


/***/ }),

/***/ "./src/core/baseInfo.js":
/*!******************************!*\
  !*** ./src/core/baseInfo.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");



class BaseInfo {
	constructor() {
		this.sessionId = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.UUID)()
		this.getDeviceInfo()
		this.getNetWork()
	}
	getDeviceInfo() {
		try {
			const deviceInfo = _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getSystemInfoSync()
			var osInfo = deviceInfo.system.split(' ')
			var osVersion = ''
			if (osInfo.length > 1) {
				osVersion = osInfo[1]
			} else {
				osVersion = osInfo[0] || ''
			}
			var osVersionMajor =
				osVersion.split('.').length && osVersion.split('.')[0]

			this.deviceInfo = {
				screenSize: `${deviceInfo.screenWidth}*${deviceInfo.screenHeight} `,
				platform: deviceInfo.platform,
				platformVersion: deviceInfo.version,
				osVersion: osVersion,
				osVersionMajor: osVersionMajor,
				os: osInfo.length > 1 && osInfo[0],
				app: deviceInfo.app,
				brand: deviceInfo.brand,
				model: deviceInfo.model,
				frameworkVersion: deviceInfo.SDKVersion,
				pixelRatio: deviceInfo.pixelRatio,
				deviceUuid: deviceInfo.deviceId,
			}
		} catch (e) {
			this.deviceInfo = {}
		}
	}
	getClientID() {
		var clienetId = _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getStorageSync(_helper_enums__WEBPACK_IMPORTED_MODULE_2__.CLIENT_ID_TOKEN)
		if (!clienetId) {
			clienetId = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.UUID)()
			_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.setStorageSync(_helper_enums__WEBPACK_IMPORTED_MODULE_2__.CLIENT_ID_TOKEN, clienetId)
		}
		return clienetId
	}
	getNetWork() {
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getNetworkType({
			success: (e) => {
				this.deviceInfo.network = e.networkType ? e.networkType : 'unknown'
			},
		})
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onNetworkStatusChange((e) => {
			this.deviceInfo.network = e.networkType ? e.networkType : 'unknown'
		})
	}
	getSessionId() {
		return this.sessionId
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new BaseInfo());


/***/ }),

/***/ "./src/core/configuration.js":
/*!***********************************!*\
  !*** ./src/core/configuration.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_CONFIGURATION": () => (/* binding */ DEFAULT_CONFIGURATION),
/* harmony export */   "commonInit": () => (/* binding */ commonInit),
/* harmony export */   "isIntakeRequest": () => (/* binding */ isIntakeRequest)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");


var TRIM_REGIX = /^\s+|\s+$/g
var DEFAULT_CONFIGURATION = {
	sampleRate: 100,
	flushTimeout: 30 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_SECOND,
	maxErrorsByMinute: 3000,
	/**
	 * Logs intake limit
	 */
	maxBatchSize: 50,
	maxMessageSize: 256 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,

	/**
	 * beacon payload max queue size implementation is 64kb
	 * ensure that we leave room for logs, rum and potential other users
	 */
	batchBytesLimit: 16 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
	datakitUrl: '',
	/**
	 * arbitrary value, byte precision not needed
	 */
	requestErrorResponseLengthLimit: 32 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
	trackInteractions: false,
}
function trim(str) {
	return str.replace(TRIM_REGIX, '')
}
function getDatakitUrlUrl(url) {
	if (url && url.lastIndexOf('/') === url.length - 1)
		return trim(url) + 'v1/write/rum'
	return trim(url) + '/v1/write/rum'
}
function commonInit(userConfiguration, buildEnv) {
	var transportConfiguration = {
		applicationId: userConfiguration.applicationId,
		env: userConfiguration.env || '',
		version: userConfiguration.version || '',
		sdkVersion: buildEnv.sdkVersion,
		sdkName: buildEnv.sdkName,
		datakitUrl: getDatakitUrlUrl(
			userConfiguration.datakitUrl || userConfiguration.datakitOrigin,
		),
		tags: userConfiguration.tags || [],
	}
	if ('trackInteractions' in userConfiguration) {
		transportConfiguration.trackInteractions = !!userConfiguration.trackInteractions
	}
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(DEFAULT_CONFIGURATION, transportConfiguration)
}
const haveSameOrigin = function (url1, url2) {
	const parseUrl1 = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.urlParse)(url1).getParse()
	const parseUrl2 = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.urlParse)(url2).getParse()
	return parseUrl1.Origin === parseUrl2.Origin
}
function isIntakeRequest(url, configuration) {
	return haveSameOrigin(url, configuration.datakitUrl)
}


/***/ }),

/***/ "./src/core/dataMap.js":
/*!*****************************!*\
  !*** ./src/core/dataMap.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commonTags": () => (/* binding */ commonTags),
/* harmony export */   "dataMap": () => (/* binding */ dataMap)
/* harmony export */ });
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");

// 需要用双引号将字符串类型的field value括起来， 这里有数组标示[string, path]
var commonTags = {
	sdk_name: '_dd.sdk_name',
	sdk_version: '_dd.sdk_version',
	app_id: 'application.id',
	env: '_dd.env',
	version: '_dd.version',
	userid: 'user.user_id',
	session_id: 'session.id',
	session_type: 'session.type',
	is_signin: 'user.is_signin',
	device: 'device.brand',
	model: 'device.model',
	device_uuid: 'device.device_uuid',
	os: 'device.os',
	app: 'device.app',
	os_version: 'device.os_version',
	os_version_major: 'device.os_version_major',
	screen_size: 'device.screen_size',
	network_type: 'device.network_type',
	platform: 'device.platform',
	platform_version: 'device.platform_version',
	app_framework_version: 'device.framework_version',
	view_id: 'page.id',
	view_name: 'page.route',
	view_referer: 'page.referer',
}
var dataMap = {
	view: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.VIEW,
		tags: {
			view_apdex_level: 'page.apdex_level',
			is_active: 'page.is_active',
		},
		fields: {
			page_fmp: 'page.fmp',
			first_paint_time: 'page.fpt',
			loading_time: 'page.loading_time',
			onload_to_onshow: 'page.onload2onshow',
			onshow_to_onready: 'page.onshow2onready',
			time_spent: 'page.time_spent',
			view_error_count: 'page.error.count',
			view_resource_count: 'page.resource.count',
			view_long_task_count: 'page.long_task.count',
			view_action_count: 'page.action.count',
			view_setdata_count: 'page.setdata.count',
		},
	},
	resource: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.RESOURCE,
		tags: {
			resource_type: 'resource.type',
			resource_status: 'resource.status',
			resource_status_group: 'resource.status_group',
			resource_method: 'resource.method',
			resource_url: 'resource.url',
			resource_url_host: 'resource.url_host',
			resource_url_path: 'resource.url_path',
			resource_url_path_group: 'resource.url_path_group',
			resource_url_query: 'resource.url_query',
		},
		fields: {
			resource_size: 'resource.size',
			resource_load: 'resource.load',
			resource_dns: 'resource.dns',
			resource_tcp: 'resource.tcp',
			resource_ssl: 'resource.ssl',
			resource_ttfb: 'resource.ttfb',
			resource_trans: 'resource.trans',
			resource_first_byte: 'resource.firstbyte',
			duration: 'resource.duration',
		},
	},
	error: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.ERROR,
		tags: {
			error_source: 'error.source',
			error_type: 'error.type',
			resource_url: 'error.resource.url',
			resource_url_host: 'error.resource.url_host',
			resource_url_path: 'error.resource.url_path',
			resource_url_path_group: 'error.resource.url_path_group',
			resource_status: 'error.resource.status',
			resource_status_group: 'error.resource.status_group',
			resource_method: 'error.resource.method',
		},
		fields: {
			error_message: ['string', 'error.message'],
			error_stack: ['string', 'error.stack'],
		},
	},
	long_task: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.LONG_TASK,
		tags: {},
		fields: {
			duration: 'long_task.duration',
		},
	},
	action: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.ACTION,
		tags: {
			action_id: 'action.id',
			action_name: 'action.target.name',
			action_type: 'action.type',
		},
		fields: {
			duration: 'action.loading_time',
			action_error_count: 'action.error.count',
			action_resource_count: 'action.resource.count',
			action_long_task_count: 'action.long_task.count',
		},
	},
	app: {
		alias_key: 'action', // metrc 别名,
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.APP,
		tags: {
			action_id: 'app.id',
			action_name: 'app.name',
			action_type: 'app.type',
		},
		fields: {
			duration: 'app.duration',
		},
	},
}


/***/ }),

/***/ "./src/core/downloadProxy.js":
/*!***********************************!*\
  !*** ./src/core/downloadProxy.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startDownloadProxy": () => (/* binding */ startDownloadProxy),
/* harmony export */   "resetDownloadProxy": () => (/* binding */ resetDownloadProxy)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sdk */ "./src/core/sdk.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");



var downloadProxySingleton
var beforeSendCallbacks = []
var onRequestCompleteCallbacks = []
var originalDownloadRequest
function startDownloadProxy() {
	if (!downloadProxySingleton) {
		proxyDownload()
		downloadProxySingleton = {
			beforeSend: function (callback) {
				beforeSendCallbacks.push(callback)
			},
			onRequestComplete: function (callback) {
				onRequestCompleteCallbacks.push(callback)
			},
		}
	}
	return downloadProxySingleton
}

function resetDownloadProxy() {
	if (downloadProxySingleton) {
		downloadProxySingleton = undefined
		beforeSendCallbacks.splice(0, beforeSendCallbacks.length)
		onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length)
		_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile = originalDownloadRequest
	}
}

function proxyDownload() {
	originalDownloadRequest = _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile
	_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile = function () {
		var _this = this
		var dataflux_xhr = {
			method: 'GET',
			startTime: 0,
			url: arguments[0].url,
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RequestType.DOWNLOAD,
			responseType: 'file',
		}
		dataflux_xhr.startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)()

		var originalSuccess = arguments[0].success

		arguments[0].success = function () {
			reportXhr(arguments[0])

			if (originalSuccess) {
				originalSuccess.apply(_this, arguments)
			}
		}
		var originalFail = arguments[0].fail
		arguments[0].fail = function () {
			reportXhr(arguments[0])
			if (originalFail) {
				originalFail.apply(_this, arguments)
			}
		}
		var hasBeenReported = false
		var reportXhr = function (res) {
			if (hasBeenReported) {
				return
			}
			hasBeenReported = true
			dataflux_xhr.duration = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - dataflux_xhr.startTime
			dataflux_xhr.response = JSON.stringify({
				filePath: res.filePath,
				tempFilePath: res.tempFilePath,
			})
			dataflux_xhr.header = res.header || {}
			dataflux_xhr.profile = res.profile
			dataflux_xhr.status = res.statusCode || res.status || 0
			onRequestCompleteCallbacks.forEach(function (callback) {
				callback(dataflux_xhr)
			})
		}
		beforeSendCallbacks.forEach(function (callback) {
			callback(dataflux_xhr)
		})
		return originalDownloadRequest.apply(this, arguments)
	}
}


/***/ }),

/***/ "./src/core/errorCollection.js":
/*!*************************************!*\
  !*** ./src/core/errorCollection.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startConsoleTracking": () => (/* binding */ startConsoleTracking),
/* harmony export */   "stopConsoleTracking": () => (/* binding */ stopConsoleTracking),
/* harmony export */   "filterErrors": () => (/* binding */ filterErrors),
/* harmony export */   "startRuntimeErrorTracking": () => (/* binding */ startRuntimeErrorTracking),
/* harmony export */   "stopRuntimeErrorTracking": () => (/* binding */ stopRuntimeErrorTracking),
/* harmony export */   "startAutomaticErrorCollection": () => (/* binding */ startAutomaticErrorCollection),
/* harmony export */   "trackNetworkError": () => (/* binding */ trackNetworkError)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _errorTools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorTools */ "./src/core/errorTools.js");
/* harmony import */ var _helper_tracekit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/tracekit */ "./src/helper/tracekit.js");
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./observable */ "./src/core/observable.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration */ "./src/core/configuration.js");
/* harmony import */ var _xhrProxy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./xhrProxy */ "./src/core/xhrProxy.js");
/* harmony import */ var _downloadProxy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./downloadProxy */ "./src/core/downloadProxy.js");








var originalConsoleError

function startConsoleTracking(errorObservable) {
	originalConsoleError = console.error
	console.error = function () {
		originalConsoleError.apply(console, arguments)
		var args = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.toArray)(arguments)
		var message = []
		args.concat(['console error:']).forEach(function (para) {
			message.push(formatConsoleParameters(para))
		})

		errorObservable.notify({
			message: message.join(' '),
			source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.CONSOLE,
			startTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)(),
		})
	}
}

function stopConsoleTracking() {
	console.error = originalConsoleError
}

function formatConsoleParameters(param) {
	if (typeof param === 'string') {
		return param
	}
	if (param instanceof Error) {
		return (0,_errorTools__WEBPACK_IMPORTED_MODULE_2__.toStackTraceString)((0,_helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.computeStackTrace)(param))
	}
	return JSON.stringify(param, undefined, 2)
}
function filterErrors(configuration, errorObservable) {
	var errorCount = 0
	var filteredErrorObservable = new _observable__WEBPACK_IMPORTED_MODULE_4__.Observable()
	errorObservable.subscribe(function (error) {
		if (errorCount < configuration.maxErrorsByMinute) {
			errorCount += 1
			filteredErrorObservable.notify(error)
		} else if (errorCount === configuration.maxErrorsByMinute) {
			errorCount += 1
			filteredErrorObservable.notify({
				message:
					'Reached max number of errors by minute: ' +
					configuration.maxErrorsByMinute,
				source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.AGENT,
				startTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)(),
			})
		}
	})
	setInterval(function () {
		errorCount = 0
	}, _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_MINUTE)
	return filteredErrorObservable
}
var traceKitReportHandler

function startRuntimeErrorTracking(errorObservable) {
	traceKitReportHandler = function (stackTrace, _, errorObject) {
		var error = (0,_errorTools__WEBPACK_IMPORTED_MODULE_2__.formatUnknownError)(stackTrace, errorObject, 'Uncaught')
		errorObservable.notify({
			message: error.message,
			stack: error.stack,
			type: error.type,
			source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.SOURCE,
			startTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)(),
		})
	}
	_helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.report.subscribe(traceKitReportHandler)
}

function stopRuntimeErrorTracking() {
	_helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.report.unsubscribe(traceKitReportHandler)
}
var filteredErrorsObservable

function startAutomaticErrorCollection(configuration) {
	if (!filteredErrorsObservable) {
		var errorObservable = new _observable__WEBPACK_IMPORTED_MODULE_4__.Observable()
		trackNetworkError(configuration, errorObservable)
		startConsoleTracking(errorObservable)
		startRuntimeErrorTracking(errorObservable)
		filteredErrorsObservable = filterErrors(configuration, errorObservable)
	}
	return filteredErrorsObservable
}

function trackNetworkError(configuration, errorObservable) {
	(0,_xhrProxy__WEBPACK_IMPORTED_MODULE_6__.startXhrProxy)().onRequestComplete(function (context) {
		return handleCompleteRequest(context.type, context)
	})
	;(0,_downloadProxy__WEBPACK_IMPORTED_MODULE_7__.startDownloadProxy)().onRequestComplete(function (context) {
		return handleCompleteRequest(context.type, context)
	})

	function handleCompleteRequest(type, request) {
		if (
			!(0,_configuration__WEBPACK_IMPORTED_MODULE_5__.isIntakeRequest)(request.url, configuration) &&
			(isRejected(request) || isServerError(request))
		) {
			errorObservable.notify({
				message: format(type) + 'error' + request.method + ' ' + request.url,
				resource: {
					method: request.method,
					statusCode: request.status,
					url: request.url,
				},
				type: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.NETWORK,
				source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.NETWORK,
				stack:
					truncateResponse(request.response, configuration) || 'Failed to load',
				startTime: request.startTime,
			})
		}
	}

	return {
		stop: function () {
			(0,_xhrProxy__WEBPACK_IMPORTED_MODULE_6__.resetXhrProxy)()
			;(0,_downloadProxy__WEBPACK_IMPORTED_MODULE_7__.resetDownloadProxy)()
		},
	}
}
function isRejected(request) {
	return request.status === 0 && request.responseType !== 'opaque'
}

function isServerError(request) {
	return request.status >= 500
}

function truncateResponse(response, configuration) {
	if (
		response &&
		response.length > configuration.requestErrorResponseLengthLimit
	) {
		return (
			response.substring(0, configuration.requestErrorResponseLengthLimit) +
			'...'
		)
	}
	return response
}

function format(type) {
	if (_helper_enums__WEBPACK_IMPORTED_MODULE_1__.RequestType.XHR === type) {
		return 'XHR'
	}
	return _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RequestType.DOWNLOAD
}


/***/ }),

/***/ "./src/core/errorTools.js":
/*!********************************!*\
  !*** ./src/core/errorTools.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorSource": () => (/* binding */ ErrorSource),
/* harmony export */   "formatUnknownError": () => (/* binding */ formatUnknownError),
/* harmony export */   "toStackTraceString": () => (/* binding */ toStackTraceString)
/* harmony export */ });
var ErrorSource = {
	AGENT: 'agent',
	CONSOLE: 'console',
	NETWORK: 'network',
	SOURCE: 'source',
	LOGGER: 'logger',
}
function formatUnknownError(stackTrace, errorObject, nonErrorPrefix) {
	if (
		!stackTrace ||
		(stackTrace.message === undefined && !(errorObject instanceof Error))
	) {
		return {
			message: nonErrorPrefix + '' + JSON.stringify(errorObject),
			stack: 'No stack, consider using an instance of Error',
			type: stackTrace && stackTrace.name,
		}
	}
	return {
		message: stackTrace.message || 'Empty message',
		stack: toStackTraceString(stackTrace),
		type: stackTrace.name,
	}
}

function toStackTraceString(stack) {
	var result = stack.name || 'Error' + ': ' + stack.message
	stack.stack.forEach(function (frame) {
		var func = frame.func === '?' ? '<anonymous>' : frame.func
		var args =
			frame.args && frame.args.length > 0
				? '(' + frame.args.join(', ') + ')'
				: ''
		var line = frame.line ? ':' + frame.line : ''
		var column = frame.line && frame.column ? ':' + frame.column : ''
		result += '\n  at ' + func + args + ' @ ' + frame.url + line + column
	})
	return result
}


/***/ }),

/***/ "./src/core/lifeCycle.js":
/*!*******************************!*\
  !*** ./src/core/lifeCycle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LifeCycle": () => (/* binding */ LifeCycle),
/* harmony export */   "LifeCycleEventType": () => (/* binding */ LifeCycleEventType)
/* harmony export */ });
class LifeCycle {
	constructor() {
		this.callbacks = {}
	}
	notify(eventType, data) {
		const eventCallbacks = this.callbacks[eventType]
		if (eventCallbacks) {
			eventCallbacks.forEach((callback) => callback(data))
		}
	}
	subscribe(eventType, callback) {
		if (!this.callbacks[eventType]) {
			this.callbacks[eventType] = []
		}
		this.callbacks[eventType].push(callback)
		return {
			unsubscribe: () => {
				this.callbacks[eventType] = this.callbacks[eventType].filter(
					(other) => callback !== other,
				)
			},
		}
	}
}

var LifeCycleEventType = {
	PERFORMANCE_ENTRY_COLLECTED: 'PERFORMANCE_ENTRY_COLLECTED',
	AUTO_ACTION_CREATED: 'AUTO_ACTION_CREATED',
	AUTO_ACTION_COMPLETED: 'AUTO_ACTION_COMPLETED',
	AUTO_ACTION_DISCARDED: 'AUTO_ACTION_DISCARDED',
	APP_HIDE: 'APP_HIDE',
	APP_UPDATE: 'APP_UPDATE',
	PAGE_SET_DATA_UPDATE: 'PAGE_SET_DATA_UPDATE',
	PAGE_ALIAS_ACTION: 'PAGE_ALIAS_ACTION',
	VIEW_CREATED: 'VIEW_CREATED',
	VIEW_UPDATED: 'VIEW_UPDATED',
	VIEW_ENDED: 'VIEW_ENDED',
	REQUEST_STARTED: 'REQUEST_STARTED',
	REQUEST_COMPLETED: 'REQUEST_COMPLETED',
	RAW_RUM_EVENT_COLLECTED: 'RAW_RUM_EVENT_COLLECTED',
	RUM_EVENT_COLLECTED: 'RUM_EVENT_COLLECTED',
}


/***/ }),

/***/ "./src/core/observable.js":
/*!********************************!*\
  !*** ./src/core/observable.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
class Observable {
	constructor() {
		this.observers = []
	}
	subscribe(f) {
		this.observers.push(f)
	}
	notify(data) {
		this.observers.forEach(function (observer) {
			observer(data)
		})
	}
}


/***/ }),

/***/ "./src/core/sdk.js":
/*!*************************!*\
  !*** ./src/core/sdk.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sdk": () => (/* binding */ sdk),
/* harmony export */   "tracker": () => (/* binding */ tracker)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");


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

const sdk = instance.sdk
const tracker = instance.tracker


/***/ }),

/***/ "./src/core/transport.js":
/*!*******************************!*\
  !*** ./src/core/transport.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpRequest": () => (/* binding */ HttpRequest),
/* harmony export */   "Batch": () => (/* binding */ Batch)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _dataMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataMap */ "./src/core/dataMap.js");




// https://en.wikipedia.org/wiki/UTF-8
var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/
function addBatchPrecision(url) {
	if (!url) return url
	return url + (url.indexOf('?') === -1 ? '?' : '&') + 'precision=ms'
}
var httpRequest = function (endpointUrl, bytesLimit) {
	this.endpointUrl = endpointUrl
	this.bytesLimit = bytesLimit
}
httpRequest.prototype = {
	send: function (data) {
		var url = addBatchPrecision(this.endpointUrl)
		_core_sdk__WEBPACK_IMPORTED_MODULE_1__.sdk.request({
			method: 'POST',
			header: {
				'content-type': 'text/plain;charset=UTF-8',
			},
			url,
			data,
		})
	},
}

var HttpRequest = httpRequest

function batch(
	request,
	maxSize,
	bytesLimit,
	maxMessageSize,
	flushTimeout,
	lifeCycle,
) {
	this.request = request
	this.maxSize = maxSize
	this.bytesLimit = bytesLimit
	this.maxMessageSize = maxMessageSize
	this.flushTimeout = flushTimeout
	this.lifeCycle = lifeCycle
	this.pushOnlyBuffer = []
	this.upsertBuffer = {}
	this.bufferBytesSize = 0
	this.bufferMessageCount = 0
	this.flushOnVisibilityHidden()
	this.flushPeriodically()
}
batch.prototype = {
	add: function (message) {
		this.addOrUpdate(message)
	},

	upsert: function (message, key) {
		this.addOrUpdate(message, key)
	},

	flush: function () {
		if (this.bufferMessageCount !== 0) {
			var messages = this.pushOnlyBuffer.concat((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.values)(this.upsertBuffer))
			this.request.send(messages.join('\n'), this.bufferBytesSize)
			this.pushOnlyBuffer = []
			this.upsertBuffer = {}
			this.bufferBytesSize = 0
			this.bufferMessageCount = 0
		}
	},

	processSendData: function (message) {
		// var data = safeJSONParse(message)
		if (!message || !message.type) return ''
		var rowStr = ''
		var hasFileds = false
		;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(_dataMap__WEBPACK_IMPORTED_MODULE_3__.dataMap, function (value, key) {
			if (value.type === message.type) {
				// 做一下别名处理
				if (value.alias_key) {
					rowStr += value.alias_key + ','
				} else {
					rowStr += key + ','
				}

				var tagsStr = []
				var tags = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend)({}, _dataMap__WEBPACK_IMPORTED_MODULE_3__.commonTags, value.tags)
				;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(tags, function (value_path, _key) {
					var _value = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, value_path)
					if (_value || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_value)) {
						tagsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_value))
					}
				})
				if (message.tags.length) {
					// 自定义tag
					(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(message.tags, function (_value, _key) {
						if (_value || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_value)) {
							tagsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_value))
						}
					})
				}
				var fieldsStr = []
				;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(value.fields, function (_value, _key) {
					if (Array.isArray(_value) && _value.length === 2) {
						var type = _value[0],
							value_path = _value[1]
						var _valueData = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, value_path)
						if (_valueData || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_valueData)) {
							_valueData =
								type === 'string'
									? '"' +
									  String(_valueData)
											.replace(/[\\]*"/g, '"')
											.replace(/"/g, '\\"') +
									  '"'
									: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_valueData)
							fieldsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + _valueData)
						}
					} else if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(_value)) {
						var _valueData = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, _value)
						if (_valueData || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_valueData)) {
							_valueData = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_valueData)
							fieldsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + _valueData)
						}
					}
				})
				if (tagsStr.length) {
					rowStr += tagsStr.join(',')
				}
				if (fieldsStr.length) {
					rowStr += ' '
					rowStr += fieldsStr.join(',')
					hasFileds = true
				}
				rowStr = rowStr + ' ' + message.date
			}
		})
		return hasFileds ? rowStr : ''
	},
	sizeInBytes: function (candidate) {
		// Accurate byte size computations can degrade performances when there is a lot of events to process
		if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
			return candidate.length
		}
		var total = 0,
			charCode
		// utf-8编码
		for (var i = 0, len = candidate.length; i < len; i++) {
			charCode = candidate.charCodeAt(i)
			if (charCode <= 0x007f) {
				total += 1
			} else if (charCode <= 0x07ff) {
				total += 2
			} else if (charCode <= 0xffff) {
				total += 3
			} else {
				total += 4
			}
		}
		return total
	},

	addOrUpdate: function (message, key) {
		var process = this.process(message)
		if (!process.processedMessage || process.processedMessage === '') return
		if (process.messageBytesSize >= this.maxMessageSize) {
			console.warn(
				'Discarded a message whose size was bigger than the maximum allowed size' +
					this.maxMessageSize +
					'KB.',
			)
			return
		}
		if (this.hasMessageFor(key)) {
			this.remove(key)
		}
		if (this.willReachedBytesLimitWith(process.messageBytesSize)) {
			this.flush()
		}
		this.push(process.processedMessage, process.messageBytesSize, key)
		if (this.isFull()) {
			this.flush()
		}
	},
	process: function (message) {
		var processedMessage = this.processSendData(message)
		var messageBytesSize = this.sizeInBytes(processedMessage)
		return {
			processedMessage: processedMessage,
			messageBytesSize: messageBytesSize,
		}
	},

	push: function (processedMessage, messageBytesSize, key) {
		if (this.bufferMessageCount > 0) {
			// \n separator at serialization
			this.bufferBytesSize += 1
		}
		if (key !== undefined) {
			this.upsertBuffer[key] = processedMessage
		} else {
			this.pushOnlyBuffer.push(processedMessage)
		}
		this.bufferBytesSize += messageBytesSize
		this.bufferMessageCount += 1
	},

	remove: function (key) {
		var removedMessage = this.upsertBuffer[key]
		delete this.upsertBuffer[key]
		var messageBytesSize = this.sizeInBytes(removedMessage)
		this.bufferBytesSize -= messageBytesSize
		this.bufferMessageCount -= 1
		if (this.bufferMessageCount > 0) {
			this.bufferBytesSize -= 1
		}
	},

	hasMessageFor: function (key) {
		return key !== undefined && this.upsertBuffer[key] !== undefined
	},

	willReachedBytesLimitWith: function (messageBytesSize) {
		// byte of the separator at the end of the message
		return this.bufferBytesSize + messageBytesSize + 1 >= this.bytesLimit
	},

	isFull: function () {
		return (
			this.bufferMessageCount === this.maxSize ||
			this.bufferBytesSize >= this.bytesLimit
		)
	},

	flushPeriodically: function () {
		var _this = this
		setTimeout(function () {
			_this.flush()
			_this.flushPeriodically()
		}, _this.flushTimeout)
	},

	flushOnVisibilityHidden: function () {
		var _this = this
		/**
		 * With sendBeacon, requests are guaranteed to be successfully sent during document unload
		 */
		// @ts-ignore this function is not always defined
		this.lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.APP_HIDE, function () {
			_this.flush()
		})
	},
}

var Batch = batch


/***/ }),

/***/ "./src/core/xhrProxy.js":
/*!******************************!*\
  !*** ./src/core/xhrProxy.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startXhrProxy": () => (/* binding */ startXhrProxy),
/* harmony export */   "resetXhrProxy": () => (/* binding */ resetXhrProxy)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sdk */ "./src/core/sdk.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");



var xhrProxySingleton
var beforeSendCallbacks = []
var onRequestCompleteCallbacks = []
var originalXhrRequest
function startXhrProxy() {
	if (!xhrProxySingleton) {
		proxyXhr()
		xhrProxySingleton = {
			beforeSend: function (callback) {
				beforeSendCallbacks.push(callback)
			},
			onRequestComplete: function (callback) {
				onRequestCompleteCallbacks.push(callback)
			},
		}
	}
	return xhrProxySingleton
}

function resetXhrProxy() {
	if (xhrProxySingleton) {
		xhrProxySingleton = undefined
		beforeSendCallbacks.splice(0, beforeSendCallbacks.length)
		onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length)
		_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request = originalXhrRequest
	}
}

function proxyXhr() {
	originalXhrRequest = _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request
	_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request = function () {
		var _this = this
		var dataflux_xhr = {
			method: arguments[0].method || 'GET',
			startTime: 0,
			url: arguments[0].url,
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RequestType.XHR,
			responseType: arguments[0].responseType || 'text',
		}
		dataflux_xhr.startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)()

		var originalSuccess = arguments[0].success

		arguments[0].success = function () {
			reportXhr(arguments[0])

			if (originalSuccess) {
				originalSuccess.apply(_this, arguments)
			}
		}
		var originalFail = arguments[0].fail
		arguments[0].fail = function () {
			reportXhr(arguments[0])
			if (originalFail) {
				originalFail.apply(_this, arguments)
			}
		}
		var hasBeenReported = false
		var reportXhr = function (res) {
			if (hasBeenReported) {
				return
			}
			hasBeenReported = true
			dataflux_xhr.duration = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - dataflux_xhr.startTime
			dataflux_xhr.response = JSON.stringify(res.data)
			dataflux_xhr.header = res.header || {}
			dataflux_xhr.profile = res.profile
			dataflux_xhr.status = res.statusCode || res.status || 0
			onRequestCompleteCallbacks.forEach(function (callback) {
				callback(dataflux_xhr)
			})
		}
		beforeSendCallbacks.forEach(function (callback) {
			callback(dataflux_xhr)
		})
		return originalXhrRequest.apply(this, arguments)
	}
}


/***/ }),

/***/ "./src/helper/enums.js":
/*!*****************************!*\
  !*** ./src/helper/enums.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ONE_SECOND": () => (/* binding */ ONE_SECOND),
/* harmony export */   "ONE_MINUTE": () => (/* binding */ ONE_MINUTE),
/* harmony export */   "ONE_HOUR": () => (/* binding */ ONE_HOUR),
/* harmony export */   "ONE_KILO_BYTE": () => (/* binding */ ONE_KILO_BYTE),
/* harmony export */   "CLIENT_ID_TOKEN": () => (/* binding */ CLIENT_ID_TOKEN),
/* harmony export */   "RumEventType": () => (/* binding */ RumEventType),
/* harmony export */   "RequestType": () => (/* binding */ RequestType),
/* harmony export */   "ActionType": () => (/* binding */ ActionType),
/* harmony export */   "MpHook": () => (/* binding */ MpHook)
/* harmony export */ });
const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_KILO_BYTE = 1024
const CLIENT_ID_TOKEN = 'datafluxRum:client:id'
const RumEventType = {
	ACTION: 'action',
	ERROR: 'error',
	LONG_TASK: 'long_task',
	VIEW: 'view',
	RESOURCE: 'resource',
	APP: 'app',
	ACTION: 'action',
}

var RequestType = {
	XHR: 'network',
	DOWNLOAD: 'resource',
}

var ActionType = {
	tap: 'tap',
	longpress: 'longpress',
	longtap: 'longtap',
}
var MpHook = {
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
	onUnload: 1,
}


/***/ }),

/***/ "./src/helper/tracekit.js":
/*!********************************!*\
  !*** ./src/helper/tracekit.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrap": () => (/* binding */ wrap),
/* harmony export */   "report": () => (/* binding */ report),
/* harmony export */   "computeStackTrace": () => (/* binding */ computeStackTrace)
/* harmony export */ });
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");


const UNKNOWN_FUNCTION = '?'
function has(object, key) {
	return Object.prototype.hasOwnProperty.call(object, key)
}
function isUndefined(what) {
	return typeof what === 'undefined'
}
function wrap(func) {
	var _this = this
	function wrapped() {
		try {
			return func.apply(_this, arguments)
		} catch (e) {
			report(e)
			throw e
		}
	}
	return wrapped
}
/**
 * Cross-browser processing of unhandled exceptions
 *
 * Syntax:
 * ```js
 *   report.subscribe(function(stackInfo) { ... })
 *   report.unsubscribe(function(stackInfo) { ... })
 *   report(exception)
 *   try { ...code... } catch(ex) { report(ex); }
 * ```
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *     on top frame; column number is not guaranteed
 *   - Opera: full stack trace with line and column numbers
 *   - Chrome: full stack trace with line and column numbers
 *   - Safari: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *   - IE: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where report was called.
 *
 * Handlers receive a StackTrace object as described in the
 * computeStackTrace docs.
 *
 * @memberof TraceKit
 * @namespace
 */
var report = (function reportModuleWrapper() {
	var handlers = []

	/**
	 * Add a crash handler.
	 * @param {Function} handler
	 * @memberof report
	 */
	function subscribe(handler) {
		installGlobalHandler()
		installGlobalUnhandledRejectionHandler()
		installGlobalOnPageNotFoundHandler()
		installGlobalOnMemoryWarningHandler()
		handlers.push(handler)
	}

	/**
	 * Remove a crash handler.
	 * @param {Function} handler
	 * @memberof report
	 */
	function unsubscribe(handler) {
		for (var i = handlers.length - 1; i >= 0; i -= 1) {
			if (handlers[i] === handler) {
				handlers.splice(i, 1)
			}
		}
	}

	/**
	 * Dispatch stack information to all handlers.
	 * @param {StackTrace} stack
	 * @param {boolean} isWindowError Is this a top-level window error?
	 * @param {Error=} error The error that's being handled (if available, null otherwise)
	 * @memberof report
	 * @throws An exception if an error occurs while calling an handler.
	 */
	function notifyHandlers(stack, isWindowError, error) {
		var exception
		for (var i in handlers) {
			if (has(handlers, i)) {
				try {
					handlers[i](stack, isWindowError, error)
				} catch (inner) {
					exception = inner
				}
			}
		}

		if (exception) {
			throw exception
		}
	}

	var onErrorHandlerInstalled
	var onUnhandledRejectionHandlerInstalled
	var onPageNotFoundHandlerInstalled
	var onOnMemoryWarningHandlerInstalled
	/**
	 * Ensures all global unhandled exceptions are recorded.
	 * Supported by Gecko and IE.
	 * @param {Event|string} message Error message.
	 * @param {string=} url URL of script that generated the exception.
	 * @param {(number|string)=} lineNo The line number at which the error occurred.
	 * @param {(number|string)=} columnNo The column number at which the error occurred.
	 * @param {Error=} errorObj The actual Error object.
	 * @memberof report
	 */
	function traceKitWindowOnError(err) {
		const error = typeof err === 'string' ? new Error(err) : err
		var stack
		var name = ''
		var msg = ''
		stack = computeStackTrace(error)
		if (
			error &&
			error.message &&
			{}.toString.call(error.message) === '[object String]'
		) {
			const messages = error.message.split('\n')
			if (messages.length >= 3) {
				msg = messages[2]
				const groups = msg.match(ERROR_TYPES_RE)
				if (groups) {
					name = groups[1]
					msg = groups[2]
				}
			}
		}
		if (msg) {
			stack.message = msg
		}
		if (name) {
			stack.name = name
		}
		notifyHandlers(stack, true, error)
	}

	/**
	 * Ensures all unhandled rejections are recorded.
	 * @param {PromiseRejectionEvent} e event.
	 * @memberof report
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
	 */
	function traceKitWindowOnUnhandledRejection({ reason, promise }) {
		const error = typeof reason === 'string' ? new Error(reason) : reason
		var stack
		var name = ''
		var msg = ''
		stack = computeStackTrace(error)
		if (
			error &&
			error.message &&
			{}.toString.call(error.message) === '[object String]'
		) {
			const messages = error.message.split('\n')
			if (messages.length >= 3) {
				msg = messages[2]
				const groups = msg.match(ERROR_TYPES_RE)
				if (groups) {
					name = groups[1]
					msg = groups[2]
				}
			}
		}
		if (msg) {
			stack.message = msg
		}
		if (name) {
			stack.name = name
		}
		notifyHandlers(stack, true, error)
	}

	/**
	 * Install a global onerror handler
	 * @memberof report
	 */
	function installGlobalHandler() {
		if (onErrorHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onError) {
			return
		}
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onError(traceKitWindowOnError)
		onErrorHandlerInstalled = true
	}

	/**
	 * Install a global onunhandledrejection handler
	 * @memberof report
	 */
	function installGlobalUnhandledRejectionHandler() {
		if (onUnhandledRejectionHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection) {
			return
		}

		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection &&
			_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection(traceKitWindowOnUnhandledRejection)
		onUnhandledRejectionHandlerInstalled = true
	}
	function installGlobalOnPageNotFoundHandler() {
		if (onPageNotFoundHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onPageNotFound) {
			return
		}
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onPageNotFound((res) => {
			const url = res.path.split('?')[0]
			notifyHandlers(
				{
					message: JSON.stringify(res),
					type: 'pagenotfound',
					name: url + '页面无法找到',
				},
				true,
				{},
			)
		})
		onPageNotFoundHandlerInstalled = true
	}
	function installGlobalOnMemoryWarningHandler() {
		if (onOnMemoryWarningHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onMemoryWarning) {
			return
		}
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onMemoryWarning(({ level = -1 }) => {
			let levelMessage = '没有获取到告警级别信息'

			switch (level) {
				case 5:
					levelMessage = 'TRIM_MEMORY_RUNNING_MODERATE'
					break
				case 10:
					levelMessage = 'TRIM_MEMORY_RUNNING_LOW'
					break
				case 15:
					levelMessage = 'TRIM_MEMORY_RUNNING_CRITICAL'
					break
				default:
					return
			}
			notifyHandlers(
				{
					message: levelMessage,
					type: 'memorywarning',
					name: '内存不足告警',
				},
				true,
				{},
			)
		})
		onOnMemoryWarningHandlerInstalled = true
	}
	/**
	 * Reports an unhandled Error.
	 * @param {Error} ex
	 * @memberof report
	 * @throws An exception if an incompvare stack trace is detected (old IE browsers).
	 */
	function doReport(ex) {}

	doReport.subscribe = subscribe
	doReport.unsubscribe = unsubscribe
	doReport.traceKitWindowOnError = traceKitWindowOnError

	return doReport
})()

/**
 * computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   ```js
 *   s = computeStackTrace.ofCaller([depth])
 *   s = computeStackTrace(exception) // consider using report instead (see below)
 *   ```
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with report,
 * which builds on top of computeStackTrace and provides better
 * IE support by utilizing the sdk.onError event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 * Tracing example:
 *  ```js
 *     function trace(message) {
 *         var stackInfo = computeStackTrace.ofCaller();
 *         var data = message + "\n";
 *         for(var i in stackInfo.stack) {
 *             var item = stackInfo.stack[i];
 *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
 *         }
 *         if (window.console)
 *             console.info(data);
 *         else
 *             alert(data);
 *     }
 * ```
 * @memberof TraceKit
 * @namespace
 */
var computeStackTrace = (function computeStackTraceWrapper() {
	var debug = false

	// Contents of Exception in various browsers.
	//
	// SAFARI:
	// ex.message = Can't find variable: qq
	// ex.line = 59
	// ex.sourceId = 580238192
	// ex.sourceURL = http://...
	// ex.expressionBeginOffset = 96
	// ex.expressionCaretOffset = 98
	// ex.expressionEndOffset = 98
	// ex.name = ReferenceError
	//
	// FIREFOX:
	// ex.message = qq is not defined
	// ex.fileName = http://...
	// ex.lineNumber = 59
	// ex.columnNumber = 69
	// ex.stack = ...stack trace... (see the example below)
	// ex.name = ReferenceError
	//
	// CHROME:
	// ex.message = qq is not defined
	// ex.name = ReferenceError
	// ex.type = not_defined
	// ex.arguments = ['aa']
	// ex.stack = ...stack trace...
	//
	// INTERNET EXPLORER:
	// ex.message = ...
	// ex.name = ReferenceError
	//
	// OPERA:
	// ex.message = ...message... (see the example below)
	// ex.name = ReferenceError
	// ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
	// ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

	/**
	 * Computes stack trace information from the stack property.
	 * Chrome and Gecko use this property.
	 * @param {Error} ex
	 * @return {?StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceFromStackProp(ex) {
		if (!ex.stack) {
			return
		}

		// tslint:disable-next-line max-line-length
		var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i
		// tslint:disable-next-line max-line-length
		var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i
		// tslint:disable-next-line max-line-length
		var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i

		// Used to additionally parse URL/line/column from eval frames
		var isEval
		var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
		var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/
		var lines = ex.stack.split('\n')
		var stack = []
		var submatch
		var parts
		var element

		for (var i = 0, j = lines.length; i < j; i += 1) {
			if (chrome.exec(lines[i])) {
				parts = chrome.exec(lines[i])
				var isNative = parts[2] && parts[2].indexOf('native') === 0 // start of line
				isEval = parts[2] && parts[2].indexOf('eval') === 0 // start of line
				submatch = chromeEval.exec(parts[2])
				if (isEval && submatch) {
					// throw out eval line/column and use top-most line/column number
					parts[2] = submatch[1] // url
					parts[3] = submatch[2] // line
					parts[4] = submatch[3] // column
				}
				element = {
					args: isNative ? [parts[2]] : [],
					column: parts[4] ? +parts[4] : undefined,
					func: parts[1] || UNKNOWN_FUNCTION,
					line: parts[3] ? +parts[3] : undefined,
					url: !isNative ? parts[2] : undefined,
				}
			} else if (winjs.exec(lines[i])) {
				parts = winjs.exec(lines[i])
				element = {
					args: [],
					column: parts[4] ? +parts[4] : undefined,
					func: parts[1] || UNKNOWN_FUNCTION,
					line: +parts[3],
					url: parts[2],
				}
			} else if (gecko.exec(lines[i])) {
				parts = gecko.exec(lines[i])
				isEval = parts[3] && parts[3].indexOf(' > eval') > -1
				submatch = geckoEval.exec(parts[3])
				if (isEval && submatch) {
					// throw out eval line/column and use top-most line number
					parts[3] = submatch[1]
					parts[4] = submatch[2]
					parts[5] = undefined // no column when eval
				} else if (i === 0 && !parts[5] && !isUndefined(ex.columnNumber)) {
					// FireFox uses this awesome columnNumber property for its top frame
					// Also note, Firefox's column number is 0-based and everything else expects 1-based,
					// so adding 1
					// NOTE: this hack doesn't work if top-most frame is eval
					stack[0].column = ex.columnNumber + 1
				}
				element = {
					args: parts[2] ? parts[2].split(',') : [],
					column: parts[5] ? +parts[5] : undefined,
					func: parts[1] || UNKNOWN_FUNCTION,
					line: parts[4] ? +parts[4] : undefined,
					url: parts[3],
				}
			} else {
				continue
			}

			if (!element.func && element.line) {
				element.func = UNKNOWN_FUNCTION
			}
			stack.push(element)
		}

		if (!stack.length) {
			return
		}

		return {
			stack,
			message: extractMessage(ex),
			name: ex.name,
		}
	}

	/**
	 * Computes stack trace information from the stacktrace property.
	 * Opera 10+ uses this property.
	 * @param {Error} ex
	 * @return {?StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceFromStacktraceProp(ex) {
		// Access and store the stacktrace property before doing ANYTHING
		// else to it because Opera is not very good at providing it
		// reliably in other circumstances.
		var stacktrace = ex.stacktrace
		if (!stacktrace) {
			return
		}

		var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i
		// tslint:disable-next-line max-line-length
		var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i
		var lines = stacktrace.split('\n')
		var stack = []
		var parts

		for (var line = 0; line < lines.length; line += 2) {
			var element
			if (opera10Regex.exec(lines[line])) {
				parts = opera10Regex.exec(lines[line])
				element = {
					args: [],
					column: undefined,
					func: parts[3],
					line: +parts[1],
					url: parts[2],
				}
			} else if (opera11Regex.exec(lines[line])) {
				parts = opera11Regex.exec(lines[line])
				element = {
					args: parts[5] ? parts[5].split(',') : [],
					column: +parts[2],
					func: parts[3] || parts[4],
					line: +parts[1],
					url: parts[6],
				}
			}

			if (element) {
				if (!element.func && element.line) {
					element.func = UNKNOWN_FUNCTION
				}
				element.context = [lines[line + 1]]

				stack.push(element)
			}
		}

		if (!stack.length) {
			return
		}

		return {
			stack,
			message: extractMessage(ex),
			name: ex.name,
		}
	}

	/**
	 * NOT TESTED.
	 * Computes stack trace information from an error message that includes
	 * the stack trace.
	 * Opera 9 and earlier use this method if the option to show stack
	 * traces is turned on in opera:config.
	 * @param {Error} ex
	 * @return {?StackTrace} Stack information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceFromOperaMultiLineMessage(ex) {
		// TODO: Clean this function up
		// Opera includes a stack trace into the exception message. An example is:
		//
		// Statement on line 3: Undefined variable: undefinedFunc
		// Backtrace:
		//   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js:
		//   In function zzz
		//         undefinedFunc(a);
		//   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
		//   In function yyy
		//           zzz(x, y, z);
		//   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
		//   In function xxx
		//           yyy(a, a, a);
		//   Line 1 of function script
		//     try { xxx('hi'); return false; } catch(ex) { report(ex); }
		//   ...

		var lines = ex.message.split('\n')
		if (lines.length < 4) {
			return
		}

		var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i
		var lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i
		var lineRE3 = /^\s*Line (\d+) of function script\s*$/i
		var stack = []
		var scripts =
			window &&
			window.document &&
			window.document.getElementsByTagName('script')
		var inlineScriptBlocks = []
		var parts

		for (var s in scripts) {
			if (has(scripts, s) && !scripts[s].src) {
				inlineScriptBlocks.push(scripts[s])
			}
		}

		for (var line = 2; line < lines.length; line += 2) {
			var item
			if (lineRE1.exec(lines[line])) {
				parts = lineRE1.exec(lines[line])
				item = {
					args: [],
					column: undefined,
					func: parts[3],
					line: +parts[1],
					url: parts[2],
				}
			} else if (lineRE2.exec(lines[line])) {
				parts = lineRE2.exec(lines[line])
				item = {
					args: [],
					column: undefined, // TODO: Check to see if inline#1 (+parts[2]) points to the script number or column number.
					func: parts[4],
					line: +parts[1],
					url: parts[3],
				}
			} else if (lineRE3.exec(lines[line])) {
				parts = lineRE3.exec(lines[line])
				var url = window.location.href.replace(/#.*$/, '')
				item = {
					url,
					args: [],
					column: undefined,
					func: '',
					line: +parts[1],
				}
			}

			if (item) {
				if (!item.func) {
					item.func = UNKNOWN_FUNCTION
				}
				item.context = [lines[line + 1]]
				stack.push(item)
			}
		}
		if (!stack.length) {
			return // could not parse multiline exception message as Opera stack trace
		}

		return {
			stack,
			message: lines[0],
			name: ex.name,
		}
	}

	/**
	 * Adds information about the first frame to incompvare stack traces.
	 * Safari and IE require this to get compvare data on the first frame.
	 * @param {StackTrace} stackInfo Stack trace information from
	 * one of the compute* methods.
	 * @param {string=} url The URL of the script that caused an error.
	 * @param {(number|string)=} lineNo The line number of the script that
	 * caused an error.
	 * @param {string=} message The error generated by the browser, which
	 * hopefully contains the name of the object that caused the error.
	 * @return {boolean} Whether or not the stack information was
	 * augmented.
	 * @memberof computeStackTrace
	 */
	function augmentStackTraceWithInitialElement(
		stackInfo,
		url,
		lineNo,
		message,
	) {
		var initial = {
			url,
			line: lineNo ? +lineNo : undefined,
		}

		if (initial.url && initial.line) {
			stackInfo.incompvare = false

			var stack = stackInfo.stack
			if (stack.length > 0) {
				if (stack[0].url === initial.url) {
					if (stack[0].line === initial.line) {
						return false // already in stack trace
					}
					if (!stack[0].line && stack[0].func === initial.func) {
						stack[0].line = initial.line
						stack[0].context = initial.context
						return false
					}
				}
			}

			stack.unshift(initial)
			stackInfo.partial = true
			return true
		}
		stackInfo.incompvare = true

		return false
	}

	/**
	 * Computes stack trace information by walking the arguments.caller
	 * chain at the time the exception occurred. This will cause earlier
	 * frames to be missed but is the only way to get any stack trace in
	 * Safari and IE. The top frame is restored by
	 * {@link augmentStackTraceWithInitialElement}.
	 * @param {Error} ex
	 * @param {number} depth
	 * @return {StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceByWalkingCallerChain(ex, depth) {
		var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i
		var stack = []
		var funcs = {}
		var recursion = false
		var parts
		var item

		for (
			var curr = computeStackTraceByWalkingCallerChain.caller;
			curr && !recursion;
			curr = curr.caller
		) {
			if (curr === computeStackTrace || curr === report) {
				continue
			}

			item = {
				args: [],
				column: undefined,
				func: UNKNOWN_FUNCTION,
				line: undefined,
				url: undefined,
			}

			parts = functionName.exec(curr.toString())
			if (curr.name) {
				item.func = curr.name
			} else if (parts) {
				item.func = parts[1]
			}

			if (typeof item.func === 'undefined') {
				item.func = parts
					? parts.input.substring(0, parts.input.indexOf('{'))
					: undefined
			}

			if (funcs[curr + '']) {
				recursion = true
			} else {
				funcs[curr + ''] = true
			}

			stack.push(item)
		}

		if (depth) {
			stack.splice(0, depth)
		}

		var result = {
			stack,
			message: ex.message,
			name: ex.name,
		}
		augmentStackTraceWithInitialElement(
			result,
			ex.sourceURL || ex.fileName,
			ex.line || ex.lineNumber,
			ex.message || ex.description,
		)
		return result
	}

	/**
	 * Computes a stack trace for an exception.
	 * @param {Error} ex
	 * @param {(string|number)=} depth
	 * @memberof computeStackTrace
	 */
	function doComputeStackTrace(ex, depth) {
		var stack
		var normalizedDepth = depth === undefined ? 0 : +depth

		try {
			// This must be tried first because Opera 10 *destroys*
			// its stacktrace property if you try to access the stack
			// property first!!
			stack = computeStackTraceFromStacktraceProp(ex)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		try {
			stack = computeStackTraceFromStackProp(ex)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		try {
			stack = computeStackTraceFromOperaMultiLineMessage(ex)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		try {
			stack = computeStackTraceByWalkingCallerChain(ex, normalizedDepth + 1)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		return {
			message: extractMessage(ex),
			name: ex.name,
			stack: [],
		}
	}

	/**
	 * Logs a stacktrace starting from the previous call and working down.
	 * @param {(number|string)=} depth How many frames deep to trace.
	 * @return {StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceOfCaller(depth) {
		var currentDepth = (depth === undefined ? 0 : +depth) + 1 // "+ 1" because "ofCaller" should drop one frame
		try {
			throw new Error()
		} catch (ex) {
			return computeStackTrace(ex, currentDepth + 1)
		}
	}

	doComputeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement
	doComputeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp
	doComputeStackTrace.ofCaller = computeStackTraceOfCaller

	return doComputeStackTrace
})()
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/
function extractMessage(ex) {
	const message = ex && ex.message
	// console.log('message',message)
	if (!message) {
		return 'No error message'
	}
	if (message.error && typeof message.error.message === 'string') {
		return message.error.message
	}

	return message
}


/***/ }),

/***/ "./src/helper/utils.js":
/*!*****************************!*\
  !*** ./src/helper/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArguments": () => (/* binding */ isArguments),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "values": () => (/* binding */ values),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "msToNs": () => (/* binding */ msToNs),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "areInOrder": () => (/* binding */ areInOrder),
/* harmony export */   "UUID": () => (/* binding */ UUID),
/* harmony export */   "jsonStringify": () => (/* binding */ jsonStringify),
/* harmony export */   "elapsed": () => (/* binding */ elapsed),
/* harmony export */   "getMethods": () => (/* binding */ getMethods),
/* harmony export */   "replaceNumberCharByPath": () => (/* binding */ replaceNumberCharByPath),
/* harmony export */   "getStatusGroup": () => (/* binding */ getStatusGroup),
/* harmony export */   "getQueryParamsFromUrl": () => (/* binding */ getQueryParamsFromUrl),
/* harmony export */   "isPercentage": () => (/* binding */ isPercentage),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "extend2Lev": () => (/* binding */ extend2Lev),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isEmptyObject": () => (/* binding */ isEmptyObject),
/* harmony export */   "isJSONString": () => (/* binding */ isJSONString),
/* harmony export */   "safeJSONParse": () => (/* binding */ safeJSONParse),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "throttle": () => (/* binding */ throttle),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "performDraw": () => (/* binding */ performDraw),
/* harmony export */   "findByPath": () => (/* binding */ findByPath),
/* harmony export */   "withSnakeCaseKeys": () => (/* binding */ withSnakeCaseKeys),
/* harmony export */   "deepSnakeCase": () => (/* binding */ deepSnakeCase),
/* harmony export */   "toSnakeCase": () => (/* binding */ toSnakeCase),
/* harmony export */   "escapeRowData": () => (/* binding */ escapeRowData),
/* harmony export */   "urlParse": () => (/* binding */ urlParse),
/* harmony export */   "getOwnObjectKeys": () => (/* binding */ getOwnObjectKeys),
/* harmony export */   "defineObject": () => (/* binding */ defineObject),
/* harmony export */   "deepMixObject": () => (/* binding */ deepMixObject)
/* harmony export */ });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./src/helper/enums.js");

var ArrayProto = Array.prototype
var ObjProto = Object.prototype
var ObjProto = Object.prototype
var hasOwnProperty = ObjProto.hasOwnProperty
var slice = ArrayProto.slice
var toString = ObjProto.toString
var nativeForEach = ArrayProto.forEach
var breaker = false
var isArguments = function (obj) {
	return !!(obj && hasOwnProperty.call(obj, 'callee'))
}
var each = function (obj, iterator, context) {
	if (obj === null) return false
	if (nativeForEach && obj.forEach === nativeForEach) {
		obj.forEach(iterator, context)
	} else if (obj.length === +obj.length) {
		for (var i = 0, l = obj.length; i < l; i++) {
			if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
				return false
			}
		}
	} else {
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				if (iterator.call(context, obj[key], key, obj) === breaker) {
					return false
				}
			}
		}
	}
}
var values = function (obj) {
	var results = []
	if (obj === null) {
		return results
	}
	each(obj, function (value) {
		results[results.length] = value
	})
	return results
}
function round(num, decimals) {
	return +num.toFixed(decimals)
}

function msToNs(duration) {
	if (typeof duration !== 'number') {
		return duration
	}
	return round(duration * 1e6, 0)
}
var isUndefined = function (obj) {
	return obj === void 0
}
var isString = function (obj) {
	return toString.call(obj) === '[object String]'
}
var isDate = function (obj) {
	return toString.call(obj) === '[object Date]'
}
var isBoolean = function (obj) {
	return toString.call(obj) === '[object Boolean]'
}
var isNumber = function (obj) {
	return toString.call(obj) === '[object Number]' && /[\d\.]+/.test(String(obj))
}

var toArray = function (iterable) {
	if (!iterable) return []
	if (iterable.toArray) {
		return iterable.toArray()
	}
	if (Array.isArray(iterable)) {
		return slice.call(iterable)
	}
	if (isArguments(iterable)) {
		return slice.call(iterable)
	}
	return values(iterable)
}
var areInOrder = function () {
	var numbers = toArray(arguments)
	for (var i = 1; i < numbers.length; i += 1) {
		if (numbers[i - 1] > numbers[i]) {
			return false
		}
	}
	return true
}
/**
 * UUID v4
 * from https://gist.github.com/jed/982883
 */
function UUID(placeholder) {
	return placeholder
		? // tslint:disable-next-line no-bitwise
		  (
				parseInt(placeholder, 10) ^
				((Math.random() * 16) >> (parseInt(placeholder, 10) / 4))
		  ).toString(16)
		: `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, UUID)
}
function jsonStringify(value, replacer, space) {
	if (value === null || value === undefined) {
		return JSON.stringify(value)
	}
	var originalToJSON = [false, undefined]
	if (hasToJSON(value)) {
		// We need to add a flag and not rely on the truthiness of value.toJSON
		// because it can be set but undefined and that's actually significant.
		originalToJSON = [true, value.toJSON]
		delete value.toJSON
	}

	var originalProtoToJSON = [false, undefined]
	var prototype
	if (typeof value === 'object') {
		prototype = Object.getPrototypeOf(value)
		if (hasToJSON(prototype)) {
			originalProtoToJSON = [true, prototype.toJSON]
			delete prototype.toJSON
		}
	}

	var result
	try {
		result = JSON.stringify(value, undefined, space)
	} catch (e) {
		result = '<error: unable to serialize object>'
	} finally {
		if (originalToJSON[0]) {
			value.toJSON = originalToJSON[1]
		}
		if (originalProtoToJSON[0]) {
			prototype.toJSON = originalProtoToJSON[1]
		}
	}
	return result
}
function hasToJSON(value) {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.hasOwnProperty('toJSON')
	)
}
function elapsed(start, end) {
	return end - start
}
function getMethods(obj) {
	var funcs = []
	for (var key in obj) {
		if (typeof obj[key] === 'function' && !_enums__WEBPACK_IMPORTED_MODULE_0__.MpHook[key]) {
			funcs.push(key)
		}
	}
	return funcs
}
// 替换url包含数字的路由
function replaceNumberCharByPath(path) {
	if (path) {
		return path.replace(/\/([^\/]*)\d([^\/]*)/g, '/?')
	} else {
		return ''
	}
}
function getStatusGroup(status) {
	if (!status) return status
	return (
		String(status).substr(0, 1) + String(status).substr(1).replace(/\d*/g, 'x')
	)
}
var getQueryParamsFromUrl = function (url) {
	var result = {}
	var arr = url.split('?')
	var queryString = arr[1] || ''
	if (queryString) {
		result = getURLSearchParams('?' + queryString)
	}
	return result
}
function isPercentage(value) {
	return isNumber(value) && value >= 0 && value <= 100
}

var extend = function (obj) {
	slice.call(arguments, 1).forEach(function (source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				obj[prop] = source[prop]
			}
		}
	})
	return obj
}
var extend2Lev = function (obj) {
	slice.call(arguments, 1).forEach(function (source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				if (isObject(source[prop]) && isObject(obj[prop])) {
					extend(obj[prop], source[prop])
				} else {
					obj[prop] = source[prop]
				}
			}
		}
	})
	return obj
}

var trim = function (str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}
var isObject = function (obj) {
	if (obj === null) return false
	return toString.call(obj) === '[object Object]'
}
var isEmptyObject = function (obj) {
	if (isObject(obj)) {
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				return false
			}
		}
		return true
	} else {
		return false
	}
}

var isJSONString = function (str) {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}
var safeJSONParse = function (str) {
	var val = null
	try {
		val = JSON.parse(str)
	} catch (e) {
		return false
	}
	return val
}
var now =
	Date.now ||
	function () {
		return new Date().getTime()
	}
var throttle = function (func, wait, options) {
	var timeout, context, args, result
	var previous = 0
	if (!options) options = {}

	var later = function () {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function () {
		args = arguments
		var now = new Date().getTime()
		if (!previous && options.leading === false) previous = now
		//下次触发 func 剩余的时间
		var remaining = wait - (now - previous)
		context = this
		// 如果没有剩余的时间了或者你改了系统时间
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			result = func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
		return result
	}
	throttled.cancel = function () {
		clearTimeout(timeout)
		previous = 0
		timeout = null
	}
	return throttled
}
function noop() {}
/**
 * Return true if the draw is successful
 * @param threshold between 0 and 100
 */
function performDraw(threshold) {
	return threshold !== 0 && Math.random() * 100 <= threshold
}
function findByPath(source, path) {
	var pathArr = path.split('.')
	while (pathArr.length) {
		var key = pathArr.shift()
		if (source && key in source && hasOwnProperty.call(source, key)) {
			source = source[key]
		} else {
			return undefined
		}
	}
	return source
}
function withSnakeCaseKeys(candidate) {
	const result = {}
	Object.keys(candidate).forEach((key) => {
		result[toSnakeCase(key)] = deepSnakeCase(candidate[key])
	})
	return result
}

function deepSnakeCase(candidate) {
	if (Array.isArray(candidate)) {
		return candidate.map((value) => deepSnakeCase(value))
	}
	if (typeof candidate === 'object' && candidate !== null) {
		return withSnakeCaseKeys(candidate)
	}
	return candidate
}

function toSnakeCase(word) {
	return word
		.replace(/[A-Z]/g, function (uppercaseLetter, index) {
			return (index !== 0 ? '_' : '') + uppercaseLetter.toLowerCase()
		})
		.replace(/-/g, '_')
}

function escapeRowData(str) {
	if (!isString(str)) return str
	var reg = /[\s=,"]/g
	return String(str).replace(reg, function (word) {
		return '\\' + word
	})
}
var urlParse = function (para) {
	var URLParser = function (a) {
		this._fields = {
			Username: 4,
			Password: 5,
			Port: 7,
			Protocol: 2,
			Host: 6,
			Path: 8,
			URL: 0,
			QueryString: 9,
			Fragment: 10,
		}
		this._values = {}
		this._regex = null
		this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/

		if (typeof a != 'undefined') {
			this._parse(a)
		}
	}
	URLParser.prototype.setUrl = function (a) {
		this._parse(a)
	}
	URLParser.prototype._initValues = function () {
		for (var a in this._fields) {
			this._values[a] = ''
		}
	}
	URLParser.prototype.addQueryString = function (queryObj) {
		if (typeof queryObj !== 'object') {
			return false
		}
		var query = this._values.QueryString || ''
		for (var i in queryObj) {
			if (new RegExp(i + '[^&]+').test(query)) {
				query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i])
			} else {
				if (query.slice(-1) === '&') {
					query = query + i + '=' + queryObj[i]
				} else {
					if (query === '') {
						query = i + '=' + queryObj[i]
					} else {
						query = query + '&' + i + '=' + queryObj[i]
					}
				}
			}
		}
		this._values.QueryString = query
	}
	URLParser.prototype.getParse = function () {
		return this._values
	}
	URLParser.prototype.getUrl = function () {
		var url = ''
		url += this._values.Origin
		url += this._values.Port ? ':' + this._values.Port : ''
		url += this._values.Path
		url += this._values.QueryString ? '?' + this._values.QueryString : ''
		return url
	}
	URLParser.prototype._parse = function (a) {
		this._initValues()
		var b = this._regex.exec(a)
		if (!b) {
			throw 'DPURLParser::_parse -> Invalid URL'
		}
		for (var c in this._fields) {
			if (typeof b[this._fields[c]] != 'undefined') {
				this._values[c] = b[this._fields[c]]
			}
		}
		this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '')
		this._values['Origin'] =
			this._values['Protocol'] + '://' + this._values['Hostname']
	}
	return new URLParser(para)
}
const getOwnObjectKeys = function (obj, isEnumerable) {
	var keys = Object.keys(obj)
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(obj)
		if (isEnumerable) {
			symbols = symbols.filter(function (t) {
				return Object.getOwnPropertyDescriptor(obj, t).enumerable
			})
		}
		keys.push.apply(keys, symbols)
	}
	return keys
}
const defineObject = function (obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true,
		})
	} else {
		obj[key] = value
	}
	return obj
}
const deepMixObject = function (targetObj) {
	for (var t = 1; t < arguments.length; t++) {
		var target = arguments[t] != null ? arguments[t] : {}
		if (t % 2) {
			getOwnObjectKeys(Object(target), true).forEach(function (t) {
				defineObject(targetObj, t, target[t])
			})
		} else {
			if (Object.getOwnPropertyDescriptors) {
				Object.defineProperties(
					targetObj,
					Object.getOwnPropertyDescriptors(target),
				)
			} else {
				getOwnObjectKeys(Object(target)).forEach(function (t) {
					Object.defineProperty(
						targetObj,
						t,
						Object.getOwnPropertyDescriptor(target, t),
					)
				})
			}
		}
	}
	return targetObj
}


/***/ }),

/***/ "./src/rumEventsCollection/action/actionCollection.js":
/*!************************************************************!*\
  !*** ./src/rumEventsCollection/action/actionCollection.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startActionCollection": () => (/* binding */ startActionCollection)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _trackActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trackActions */ "./src/rumEventsCollection/action/trackActions.js");





function startActionCollection(lifeCycle, configuration, Vue) {
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_COMPLETED,
		function (action) {
			lifeCycle.notify(
				_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
				processAction(action),
			)
		},
	)
	if (configuration.trackInteractions) {
		(0,_trackActions__WEBPACK_IMPORTED_MODULE_3__.trackActions)(lifeCycle, Vue)
	}
}

function processAction(action) {
	var autoActionProperties = {
		action: {
			error: {
				count: action.counts.errorCount,
			},
			id: action.id,
			loadingTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(action.duration),
			long_task: {
				count: action.counts.longTaskCount,
			},
			resource: {
				count: action.counts.resourceCount,
			},
		},
	}
	var actionEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(
		{
			action: {
				target: {
					name: action.name,
				},
				type: action.type,
			},
			date: action.startClocks,
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.ACTION,
		},
		autoActionProperties,
	)
	return {
		rawRumEvent: actionEvent,
		startTime: action.startClocks,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/action/trackActions.js":
/*!********************************************************!*\
  !*** ./src/rumEventsCollection/action/trackActions.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trackActions": () => (/* binding */ trackActions)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _trackEventCounts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trackEventCounts */ "./src/rumEventsCollection/trackEventCounts.js");
/* harmony import */ var _trackPageActiveites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trackPageActiveites */ "./src/rumEventsCollection/trackPageActiveites.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");





function trackActions(lifeCycle, Vue) {
	var action = startActionManagement(lifeCycle)

	// New views trigger the discard of the current pending Action
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.VIEW_CREATED, function () {
		action.discardCurrent()
	})
	var originVueExtend = Vue.extend

	Vue.extend = function (vueOptions) {
		// methods 方法
		if (vueOptions.methods) {
			const vueMethods = Object.keys(vueOptions.methods)
			vueMethods.forEach((methodName) => {
				clickProxy(
					vueOptions.methods,
					methodName,
					function (_action) {
						action.create(_action.type, _action.name)
					},
					lifeCycle,
				)
			})
		}

		const originMethods = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.getMethods)(vueOptions)
		originMethods.forEach((methodName) => {
			clickProxy(
				vueOptions,
				methodName,
				function (_action) {
					action.create(_action.type, _action.name)
				},
				lifeCycle,
			)
		})
		return originVueExtend.call(this, vueOptions)
	}
	// var originPage = Page
	// Page = function (page) {
	// 	const methods = getMethods(page)
	// 	methods.forEach((methodName) => {
	// 		clickProxy(
	// 			page,
	// 			methodName,
	// 			function (_action) {
	// 				action.create(_action.type, _action.name)
	// 			},
	// 			lifeCycle,
	// 		)
	// 	})
	// 	return originPage(page)
	// }
	// var originComponent = Component
	// Component = function (component) {
	// 	const methods = getMethods(component)
	// 	methods.forEach((methodName) => {
	// 		clickProxy(component, methodName, function (_action) {
	// 			action.create(_action.type, _action.name)
	// 		})
	// 	})
	// 	return originComponent(component)
	// }
	return {
		stop: function () {
			action.discardCurrent()
			// stopListener()
		},
	}
}
function clickProxy(page, methodName, callback, lifeCycle) {
	var oirginMethod = page[methodName]

	page[methodName] = function () {
		const result = oirginMethod.apply(this, arguments)
		var action = {}
		if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(arguments[0])) {
			var currentTarget = arguments[0].currentTarget || {}
			var dataset = currentTarget.dataset || {}
			var actionType = arguments[0].type
			if (actionType && _helper_enums__WEBPACK_IMPORTED_MODULE_4__.ActionType[actionType]) {
				action.type = actionType
				action.name = dataset.name || dataset.content || dataset.type
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			} else if (methodName === 'onAddToFavorites') {
				action.type = 'click'
				action.name =
					'收藏 ' +
					'标题: ' +
					result.title +
					(result.query ? ' query: ' + result.query : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			} else if (methodName === 'onShareAppMessage') {
				action.type = 'click'
				action.name =
					'转发 ' +
					'标题: ' +
					result.title +
					(result.path ? ' path: ' + result.path : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			} else if (methodName === 'onShareTimeline') {
				action.type = 'click'
				action.name =
					'分享到朋友圈 ' +
					'标题: ' +
					result.title +
					(result.query ? ' query: ' + result.query : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			} else if (methodName === 'onTabItemTap') {
				var item = arguments.length && arguments[0]
				action.type = 'click'
				action.name =
					'tab ' +
					'名称: ' +
					item.text +
					(item.pagePath ? ' 跳转到: ' + item.pagePath : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			}
		}
		return result
	}
}
function startActionManagement(lifeCycle) {
	var currentAction
	var currentIdlePageActivitySubscription

	return {
		create: function (type, name) {
			if (currentAction) {
				// Ignore any new action if another one is already occurring.
				return
			}
			var pendingAutoAction = new PendingAutoAction(lifeCycle, type, name)

			currentAction = pendingAutoAction
			currentIdlePageActivitySubscription = (0,_trackPageActiveites__WEBPACK_IMPORTED_MODULE_3__.waitIdlePageActivity)(
				lifeCycle,
				function (params) {
					if (params.hadActivity) {
						pendingAutoAction.complete(params.endTime)
					} else {
						pendingAutoAction.discard()
					}
					currentAction = undefined
				},
			)
		},
		discardCurrent: function () {
			if (currentAction) {
				currentIdlePageActivitySubscription.stop()
				currentAction.discard()
				currentAction = undefined
			}
		},
	}
}
var PendingAutoAction = function (lifeCycle, type, name) {
	this.id = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)()
	this.startClocks = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
	this.name = name
	this.type = type
	this.lifeCycle = lifeCycle
	this.eventCountsSubscription = (0,_trackEventCounts__WEBPACK_IMPORTED_MODULE_2__.trackEventCounts)(lifeCycle)
	this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_CREATED, {
		id: this.id,
		startClocks: this.startClocks,
	})
}
PendingAutoAction.prototype = {
	complete: function (endTime) {
		var eventCounts = this.eventCountsSubscription.eventCounts
		this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_COMPLETED, {
			counts: {
				errorCount: eventCounts.errorCount,
				longTaskCount: eventCounts.longTaskCount,
				resourceCount: eventCounts.resourceCount,
			},
			duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.elapsed)(this.startClocks, endTime),
			id: this.id,
			name: this.name,
			startClocks: this.startClocks,
			type: this.type,
		})
		this.eventCountsSubscription.stop()
	},
	discard: function () {
		this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_DISCARDED)
		this.eventCountsSubscription.stop()
	},
}


/***/ }),

/***/ "./src/rumEventsCollection/app/appCollection.js":
/*!******************************************************!*\
  !*** ./src/rumEventsCollection/app/appCollection.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startAppCollection": () => (/* binding */ startAppCollection)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/rumEventsCollection/app/index.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");




function startAppCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, function (appinfo) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processAppUpdate(appinfo),
		)
	})

	return (0,_index__WEBPACK_IMPORTED_MODULE_0__.rewriteApp)(configuration, lifeCycle)
}

function processAppUpdate(appinfo) {
	var appEvent = {
		date: appinfo.startTime,
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.APP,
		app: {
			type: appinfo.type,
			name: appinfo.name,
			id: appinfo.id,
			duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.duration),
		},
	}
	console.log(appEvent, 'appEvent====')
	return {
		rawRumEvent: appEvent,
		startTime: appinfo.startTime,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/app/index.js":
/*!**********************************************!*\
  !*** ./src/rumEventsCollection/app/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "THROTTLE_VIEW_UPDATE_PERIOD": () => (/* binding */ THROTTLE_VIEW_UPDATE_PERIOD),
/* harmony export */   "startupTypes": () => (/* binding */ startupTypes),
/* harmony export */   "rewriteApp": () => (/* binding */ rewriteApp)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");



// 劫持原小程序App方法
var THROTTLE_VIEW_UPDATE_PERIOD = 3000
const startupTypes = {
	COLD: 'cold',
	HOT: 'hot',
}
function rewriteApp(configuration, lifeCycle, Vue) {
	const originApp = App
	var appInfo = {
		isStartUp: false, // 是否启动
	}
	var startTime
	App = function (app) {
		startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
		// 合并方法，插入记录脚本
		;['onLaunch', 'onShow', 'onHide'].forEach((methodName) => {
			const userDefinedMethod = app[methodName] // 暂存用户定义的方法
			app[methodName] = function (options) {
				if (methodName === 'onLaunch') {
					appInfo.isStartUp = true
					appInfo.isHide = false
					appInfo.startupType = startupTypes.COLD
				} else if (methodName === 'onShow') {
					if (appInfo.isStartUp && appInfo.isHide) {
						// 判断是热启动
						appInfo.startupType = startupTypes.HOT
						// appUpdate()
					}
				} else if (methodName === 'onHide') {
					lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_HIDE)
					appInfo.isHide = true
				}
				return userDefinedMethod && userDefinedMethod.call(this, options)
			}
		})
		return originApp(app)
	}

	startPerformanceObservable(lifeCycle)
}

function startPerformanceObservable(lifeCycle) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			// 过滤掉其他页面监听，只保留首次启动
			var codeDownloadDuration
			const launchEntity = entitys.find(
				(entity) =>
					entity.entryType === 'navigation' &&
					entity.navigationType === 'appLaunch',
			)
			if (typeof launchEntity !== 'undefined') {
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, {
					startTime: launchEntity.startTime,
					name: '启动',
					type: 'launch',
					id: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)(),
					duration: launchEntity.duration,
				})
			}
			const scriptentity = entitys.find(
				(entity) =>
					entity.entryType === 'script' && entity.name === 'evaluateScript',
			)
			if (typeof scriptentity !== 'undefined') {
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, {
					startTime: scriptentity.startTime,
					name: '脚本注入',
					type: 'script_insert',
					id: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)(),
					duration: scriptentity.duration,
				})
			}
			const firstEntity = entitys.find(
				(entity) =>
					entity.entryType === 'render' && entity.name === 'firstRender',
			)
			if (firstEntity && scriptentity && launchEntity) {
				if (
					!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.areInOrder)(firstEntity.duration, launchEntity.duration) ||
					!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.areInOrder)(scriptentity.duration, launchEntity.duration)
				) {
					return
				}
				codeDownloadDuration =
					launchEntity.duration - firstEntity.duration - scriptentity.duration
				// 资源下载耗时
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, {
					startTime: launchEntity.startTime,
					name: '小程序包下载',
					type: 'package_download',
					id: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)(),
					duration: codeDownloadDuration,
				})
				// 资源下载时间暂时定为：首次启动时间-脚本加载时间-初次渲染时间
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/assembly.js":
/*!*********************************************!*\
  !*** ./src/rumEventsCollection/assembly.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRumAssembly": () => (/* binding */ startRumAssembly)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _core_baseInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/baseInfo */ "./src/core/baseInfo.js");




function isTracked(configuration) {
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.performDraw)(configuration.sampleRate)
}
var SessionType = {
	SYNTHETICS: 'synthetics',
	USER: 'user',
}
function startRumAssembly(
	applicationId,
	configuration,
	lifeCycle,
	parentContexts,
) {
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
		function (data) {
			var startTime = data.startTime
			var rawRumEvent = data.rawRumEvent
			var viewContext = parentContexts.findView(startTime)

			var deviceContext = {
				device: _core_baseInfo__WEBPACK_IMPORTED_MODULE_3__.default.deviceInfo,
			}
			if (
				isTracked(configuration) &&
				(viewContext || rawRumEvent.type === _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.APP)
			) {
				var actionContext = parentContexts.findAction(startTime)
				var rumContext = {
					_dd: {
						sdkName: configuration.sdkName,
						sdkVersion: configuration.sdkVersion,
						env: configuration.env,
						version: configuration.version,
					},
					tags: configuration.tags,
					application: {
						id: applicationId,
					},
					device: {},
					date: new Date().getTime(),
					session: {
						id: _core_baseInfo__WEBPACK_IMPORTED_MODULE_3__.default.getSessionId(),
						type: SessionType.USER,
					},
					user: {
						user_id: configuration.user_id || _core_baseInfo__WEBPACK_IMPORTED_MODULE_3__.default.getClientID(),
						is_signin: configuration.user_id ? 'T' : 'F',
					},
				}

				var rumEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(
					rumContext,
					deviceContext,
					viewContext,
					actionContext,
					rawRumEvent,
				)

				var serverRumEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.withSnakeCaseKeys)(rumEvent)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent)
			}
		},
	)
}


/***/ }),

/***/ "./src/rumEventsCollection/error/errorCollection.js":
/*!**********************************************************!*\
  !*** ./src/rumEventsCollection/error/errorCollection.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startErrorCollection": () => (/* binding */ startErrorCollection),
/* harmony export */   "doStartErrorCollection": () => (/* binding */ doStartErrorCollection)
/* harmony export */ });
/* harmony import */ var _core_errorCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/errorCollection */ "./src/core/errorCollection.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");




function startErrorCollection(lifeCycle, configuration) {
	return doStartErrorCollection(
		lifeCycle,
		configuration,
		(0,_core_errorCollection__WEBPACK_IMPORTED_MODULE_0__.startAutomaticErrorCollection)(configuration),
	)
}

function doStartErrorCollection(lifeCycle, configuration, observable) {
	observable.subscribe(function (error) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processError(error),
		)
	})
}

function processError(error) {
	var resource = error.resource
	if (resource) {
		var urlObj = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.urlParse)(error.resource.url).getParse()
		resource = {
			method: error.resource.method,
			status: error.resource.statusCode,
			statusGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.getStatusGroup)(error.resource.statusCode),
			url: error.resource.url,
			urlHost: urlObj.Host,
			urlPath: urlObj.Path,
			urlPathGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.replaceNumberCharByPath)(urlObj.Path),
		}
	}
	var rawRumEvent = {
		date: error.startTime,
		error: {
			message: error.message,
			resource: resource,
			source: error.source,
			stack: error.stack,
			type: error.type,
			starttime: error.startTime,
		},
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ERROR,
	}
	return {
		rawRumEvent: rawRumEvent,
		startTime: error.startTime,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/page/index.js":
/*!***********************************************!*\
  !*** ./src/rumEventsCollection/page/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "THROTTLE_VIEW_UPDATE_PERIOD": () => (/* binding */ THROTTLE_VIEW_UPDATE_PERIOD),
/* harmony export */   "rewritePage": () => (/* binding */ rewritePage)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _trackEventCounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../trackEventCounts */ "./src/rumEventsCollection/trackEventCounts.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/sdk */ "./src/core/sdk.js");





// 劫持原小程序App方法
var THROTTLE_VIEW_UPDATE_PERIOD = 3000

function rewritePage(configuration, lifeCycle, Vue) {
	var originVueExtend = Vue.extend

	Vue.extend = function (vueOptions) {
		// 合并方法，插入记录脚本
		var currentView,
			startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
		;['onReady', 'onShow', 'onLoad', 'onUnload', 'onHide'].forEach(
			(methodName) => {
				const userDefinedMethod = vueOptions[methodName]
				vueOptions[methodName] = function () {
					if (this.mpType !== 'page') {
						return userDefinedMethod && userDefinedMethod.apply(this, arguments)
					}
					// 只处理page类型
					if (methodName === 'onShow' || methodName === 'onLoad') {
						if (typeof currentView === 'undefined') {
							const activePage = getActivePage()
							currentView = newView(
								lifeCycle,
								activePage && activePage.route,
								startTime,
							)
						}
					}

					currentView && currentView.setLoadEventEnd(methodName)

					if (
						(methodName === 'onUnload' ||
							methodName === 'onHide' ||
							methodName === 'onShow') &&
						currentView
					) {
						currentView.triggerUpdate()
						if (methodName === 'onUnload' || methodName === 'onHide') {
							currentView.end()
						}
					}
					return userDefinedMethod && userDefinedMethod.apply(this, arguments)
				}
			},
		)
		return originVueExtend.call(this, vueOptions)
	}
}
function newView(lifeCycle, route, startTime) {
	if (typeof startTime === 'undefined') {
		startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
	}
	var id = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)()
	var isActive = true
	var eventCounts = {
		errorCount: 0,
		resourceCount: 0,
		userActionCount: 0,
	}
	var setdataCount = 0

	var documentVersion = 0
	var setdataDuration = 0
	var loadingDuration = 0
	var loadingTime
	var showTime
	var onload2onshowTime
	var onshow2onready
	var stayTime
	var fpt, fmp
	lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_CREATED, {
		id,
		startTime,
		route,
	})
	var scheduleViewUpdate = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.throttle)(
		triggerViewUpdate,
		THROTTLE_VIEW_UPDATE_PERIOD,
		{
			leading: false,
		},
	)
	var cancelScheduleViewUpdate = scheduleViewUpdate.cancel
	var _trackEventCounts = (0,_trackEventCounts__WEBPACK_IMPORTED_MODULE_1__.trackEventCounts)(
		lifeCycle,
		function (newEventCounts) {
			eventCounts = newEventCounts
			scheduleViewUpdate()
		},
	)
	var stopEventCountsTracking = _trackEventCounts.stop
	var _trackFptTime = trackFptTime(lifeCycle, function (duration) {
		fpt = duration
		scheduleViewUpdate()
	})
	var stopFptTracking = _trackFptTime.stop
	var _trackSetDataTime = trackSetDataTime(lifeCycle, function (duration) {
		if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(duration)) {
			setdataDuration += duration
			setdataCount++
			scheduleViewUpdate()
		}
	})
	var stopSetDataTracking = _trackSetDataTime.stop
	var _trackLoadingTime = trackLoadingTime(lifeCycle, function (duration) {
		if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(duration)) {
			loadingDuration = duration
			scheduleViewUpdate()
		}
	})
	var stopLoadingTimeTracking = _trackLoadingTime.stop

	var setLoadEventEnd = function (type) {
		if (type === 'onLoad') {
			loadingTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
			loadingDuration = loadingTime - startTime
		} else if (type === 'onShow') {
			showTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
			if (
				typeof onload2onshowTime === 'undefined' &&
				typeof loadingTime !== 'undefined'
			) {
				onload2onshowTime = showTime - loadingTime
			}
		} else if (type === 'onReady') {
			if (
				typeof onshow2onready === 'undefined' &&
				typeof showTime !== 'undefined'
			) {
				onshow2onready = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - showTime
			}
			if (typeof fmp === 'undefined') {
				fmp = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime // 从开发者角度看，小程序首屏渲染完成的标志是首页 Page.onReady 事件触发。
			}
		} else if (type === 'onHide' || type === 'onUnload') {
			if (typeof showTime !== 'undefined') {
				stayTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - showTime
			}
			isActive = false
		}
		triggerViewUpdate()
	}
	function triggerViewUpdate() {
		documentVersion += 1
		lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_UPDATED, {
			documentVersion: documentVersion,
			eventCounts: eventCounts,
			id: id,
			loadingTime: loadingDuration,
			stayTime,
			onload2onshowTime,
			onshow2onready,
			setdataDuration,
			setdataCount,
			fmp,
			fpt,
			startTime: startTime,
			route: route,
			duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime,
			isActive: isActive,
		})
	}
	return {
		scheduleUpdate: scheduleViewUpdate,
		setLoadEventEnd,
		triggerUpdate: function () {
			cancelScheduleViewUpdate()
			triggerViewUpdate()
		},
		end: function () {
			stopEventCountsTracking()
			stopFptTracking()
			cancelScheduleViewUpdate()
			stopSetDataTracking()
			stopLoadingTimeTracking()
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_ENDED, { endClocks: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() })
		},
	}
}
function trackFptTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			const firstRenderEntity = entitys.find(
				(entity) =>
					entity.entryType === 'render' && entity.name === 'firstRender',
			)

			if (typeof firstRenderEntity !== 'undefined') {
				callback(firstRenderEntity.duration)
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function trackLoadingTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			const navigationEnity = entitys.find(
				(entity) => entity.entryType === 'navigation',
			)
			if (typeof navigationEnity !== 'undefined') {
				callback(navigationEnity.duration)
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function trackSetDataTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PAGE_SET_DATA_UPDATE,
		function (data) {
			if (!data) return
			callback(data.updateEndTimestamp - data.pendingStartTimestamp)
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function getActivePage() {
	const curPages = getCurrentPages()
	if (curPages.length) {
		return curPages[curPages.length - 1]
	}
	return {}
}


/***/ }),

/***/ "./src/rumEventsCollection/page/viewCollection.js":
/*!********************************************************!*\
  !*** ./src/rumEventsCollection/page/viewCollection.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startViewCollection": () => (/* binding */ startViewCollection)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/rumEventsCollection/page/index.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");




function startViewCollection(lifeCycle, configuration, Vue) {
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__.LifeCycleEventType.VIEW_UPDATED, function (view) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processViewUpdate(view),
		)
	})

	return (0,_index__WEBPACK_IMPORTED_MODULE_0__.rewritePage)(configuration, lifeCycle, Vue)
}
function processViewUpdate(view) {
	var apdexLevel
	if (view.fmp) {
		apdexLevel = parseInt(Number(view.fmp) / 1000)
		apdexLevel = apdexLevel > 9 ? 9 : apdexLevel
	}
	var viewEvent = {
		_dd: {
			documentVersion: view.documentVersion,
		},
		date: view.startTime,
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.VIEW,
		page: {
			action: {
				count: view.eventCounts.userActionCount,
			},
			error: {
				count: view.eventCounts.errorCount,
			},
			setdata: {
				count: view.setdataCount,
			},
			setdata_duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.setdataDuration),
			loadingTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.loadingTime),
			stayTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.stayTime),
			onload2onshow: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.onload2onshowTime),
			onshow2onready: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.onshow2onready),
			fpt: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.fpt),
			fmp: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.fmp),
			isActive: view.isActive,
			apdexLevel,
			// longTask: {
			//   count: view.eventCounts.longTaskCount
			// },
			resource: {
				count: view.eventCounts.resourceCount,
			},
			timeSpent: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.duration),
		},
	}
	return {
		rawRumEvent: viewEvent,
		startTime: view.startTime,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/parentContexts.js":
/*!***************************************************!*\
  !*** ./src/rumEventsCollection/parentContexts.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VIEW_CONTEXT_TIME_OUT_DELAY": () => (/* binding */ VIEW_CONTEXT_TIME_OUT_DELAY),
/* harmony export */   "CLEAR_OLD_CONTEXTS_INTERVAL": () => (/* binding */ CLEAR_OLD_CONTEXTS_INTERVAL),
/* harmony export */   "startParentContexts": () => (/* binding */ startParentContexts)
/* harmony export */ });
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");



var VIEW_CONTEXT_TIME_OUT_DELAY = 4 * _helper_enums__WEBPACK_IMPORTED_MODULE_0__.ONE_HOUR
var CLEAR_OLD_CONTEXTS_INTERVAL = _helper_enums__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE

function startParentContexts(lifeCycle) {
	var currentView
	var currentAction
	var previousViews = []
	var previousActions = []
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_CREATED,
		function (currentContext) {
			currentView = currentContext
		},
	)

	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_UPDATED,
		function (currentContext) {
			// A view can be updated after its end.  We have to ensure that the view being updated is the
			// most recently created.
			if (currentView && currentView.id === currentContext.id) {
				currentView = currentContext
			}
		},
	)
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_ENDED, function (data) {
		if (currentView) {
			previousViews.unshift({
				endTime: data.endClocks,
				context: buildCurrentViewContext(),
				startTime: currentView.startTime,
			})
			currentView = undefined
		}
	})
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_CREATED,
		function (currentContext) {
			currentAction = currentContext
		},
	)

	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_COMPLETED,
		function (action) {
			if (currentAction) {
				previousActions.unshift({
					context: buildCurrentActionContext(),
					endTime: currentAction.startClocks + action.duration,
					startTime: currentAction.startClocks,
				})
			}
			currentAction = undefined
		},
	)

	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_DISCARDED, function () {
		currentAction = undefined
	})
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.SESSION_RENEWED, function () {
		previousViews = []
		previousActions = []
		currentView = undefined
		currentAction = undefined
	})
	var clearOldContextsInterval = setInterval(function () {
		clearOldContexts(previousViews, VIEW_CONTEXT_TIME_OUT_DELAY)
	}, CLEAR_OLD_CONTEXTS_INTERVAL)

	function clearOldContexts(previousContexts, timeOutDelay) {
		var oldTimeThreshold = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - timeOutDelay
		while (
			previousContexts.length > 0 &&
			previousContexts[previousContexts.length - 1].startTime < oldTimeThreshold
		) {
			previousContexts.pop()
		}
	}
	function buildCurrentActionContext() {
		return { userAction: { id: currentAction.id } }
	}
	function buildCurrentViewContext() {
		return {
			page: {
				id: currentView.id,
				referer:
					(previousViews.length &&
						previousViews[previousViews.length - 1].context.page.route) ||
					undefined,
				route: currentView.route,
			},
		}
	}

	function findContext(
		buildContext,
		previousContexts,
		currentContext,
		startTime,
	) {
		if (startTime === undefined) {
			return currentContext ? buildContext() : undefined
		}
		if (currentContext && startTime >= currentContext.startTime) {
			return buildContext()
		}
		var flag = undefined
		;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.each)(previousContexts, function (previousContext) {
			if (startTime > previousContext.endTime) {
				return false
			}
			if (startTime >= previousContext.startTime) {
				flag = previousContext.context
				return false
			}
		})

		return flag
	}

	var parentContexts = {
		findView: function (startTime) {
			return findContext(
				buildCurrentViewContext,
				previousViews,
				currentView,
				startTime,
			)
		},
		findAction: function (startTime) {
			return findContext(
				buildCurrentActionContext,
				previousActions,
				currentAction,
				startTime,
			)
		},

		stop: function () {
			clearInterval(clearOldContextsInterval)
		},
	}
	return parentContexts
}


/***/ }),

/***/ "./src/rumEventsCollection/performanceCollection.js":
/*!**********************************************************!*\
  !*** ./src/rumEventsCollection/performanceCollection.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startPagePerformanceObservable": () => (/* binding */ startPagePerformanceObservable)
/* harmony export */ });
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");


function startPagePerformanceObservable(lifeCycle, configuration) {
	if (!!_core_sdk__WEBPACK_IMPORTED_MODULE_1__.tracker.getPerformance) {
		const performance = _core_sdk__WEBPACK_IMPORTED_MODULE_1__.tracker.getPerformance()
		if (!performance || typeof performance.createObserver !== 'function') return
		const observer = performance.createObserver((entryList) => {
			lifeCycle.notify(
				_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
				entryList.getEntries(),
			)
		})
		observer.observe({ entryTypes: ['render', 'script', 'navigation'] })
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/requestCollection.js":
/*!******************************************************!*\
  !*** ./src/rumEventsCollection/requestCollection.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRequestCollection": () => (/* binding */ startRequestCollection),
/* harmony export */   "trackXhr": () => (/* binding */ trackXhr),
/* harmony export */   "trackDownload": () => (/* binding */ trackDownload)
/* harmony export */ });
/* harmony import */ var _core_xhrProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/xhrProxy */ "./src/core/xhrProxy.js");
/* harmony import */ var _core_downloadProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/downloadProxy */ "./src/core/downloadProxy.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rumEventsCollection/resource/resourceUtils */ "./src/rumEventsCollection/resource/resourceUtils.js");





var nextRequestIndex = 1

function startRequestCollection(lifeCycle, configuration) {
	trackXhr(lifeCycle, configuration)
	trackDownload(lifeCycle, configuration)
}
function parseHeader(header) {
	// 大小写兼容
	if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.isObject)(header)) return header
	var res = {}
	Object.keys(header).forEach(function (key) {
		res[key.toLowerCase()] = header[key]
	})
	return res
}
function getHeaderString(header) {
	if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.isObject)(header)) return header
	var headerStr = ''
	Object.keys(header).forEach(function (key) {
		headerStr += key + ':' + header[key] + ';'
	})
	return headerStr
}
function trackXhr(lifeCycle, configuration) {
	var xhrProxy = (0,_core_xhrProxy__WEBPACK_IMPORTED_MODULE_0__.startXhrProxy)()
	xhrProxy.beforeSend(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			context.requestIndex = getNextRequestIndex()
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_STARTED, {
				requestIndex: context.requestIndex,
			})
		}
	})
	xhrProxy.onRequestComplete(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_COMPLETED, {
				duration: context.duration,
				method: context.method,
				requestIndex: context.requestIndex,
				performance: context.profile,
				response: context.response,
				startTime: context.startTime,
				status: context.status,
				type: context.type,
				url: context.url,
			})
		}
	})
	return xhrProxy
}
function trackDownload(lifeCycle, configuration) {
	var dwonloadProxy = (0,_core_downloadProxy__WEBPACK_IMPORTED_MODULE_1__.startDownloadProxy)()
	dwonloadProxy.beforeSend(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			context.requestIndex = getNextRequestIndex()
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_STARTED, {
				requestIndex: context.requestIndex,
			})
		}
	})
	dwonloadProxy.onRequestComplete(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_COMPLETED, {
				duration: context.duration,
				method: context.method,
				requestIndex: context.requestIndex,
				performance: context.profile,
				response: context.response,
				startTime: context.startTime,
				status: context.status,
				type: context.type,
				url: context.url,
			})
		}
	})
	return dwonloadProxy
}
function getNextRequestIndex() {
	var result = nextRequestIndex
	nextRequestIndex += 1
	return result
}


/***/ }),

/***/ "./src/rumEventsCollection/resource/resourceCollection.js":
/*!****************************************************************!*\
  !*** ./src/rumEventsCollection/resource/resourceCollection.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startResourceCollection": () => (/* binding */ startResourceCollection)
/* harmony export */ });
/* harmony import */ var _resourceUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resourceUtils */ "./src/rumEventsCollection/resource/resourceUtils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");




function startResourceCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_COMPLETED, function (request) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processRequest(request),
		)
	})
}

function processRequest(request) {
	var type = request.type
	var timing = request.performance
	var correspondingTimingOverrides = timing
		? computePerformanceEntryMetrics(timing)
		: undefined
	var urlObj = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.urlParse)(request.url).getParse()
	var startTime = request.startTime
	var resourceEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.extend2Lev)(
		{
			date: startTime,
			resource: {
				type: type,
				duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(request.duration),
				method: request.method,
				status: request.status,
				statusGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.getStatusGroup)(request.status),
				url: request.url,
				urlHost: urlObj.Host,
				urlPath: urlObj.Path,
				urlPathGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.replaceNumberCharByPath)(urlObj.Path),
				urlQuery: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.jsonStringify)((0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.getQueryParamsFromUrl)(request.url)),
			},
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_3__.RumEventType.RESOURCE,
		},
		correspondingTimingOverrides,
	)
	return { startTime: startTime, rawRumEvent: resourceEvent }
}
function computePerformanceEntryMetrics(timing) {
	return {
		resource: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.extend2Lev)(
			{},
			{
				load: (0,_resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computePerformanceResourceDuration)(timing),
				size: (0,_resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computeSize)(timing),
			},
			(0,_resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computePerformanceResourceDetails)(timing),
		),
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/resource/resourceUtils.js":
/*!***********************************************************!*\
  !*** ./src/rumEventsCollection/resource/resourceUtils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computePerformanceResourceDuration": () => (/* binding */ computePerformanceResourceDuration),
/* harmony export */   "computePerformanceResourceDetails": () => (/* binding */ computePerformanceResourceDetails),
/* harmony export */   "toValidEntry": () => (/* binding */ toValidEntry),
/* harmony export */   "computeSize": () => (/* binding */ computeSize),
/* harmony export */   "isAllowedRequestUrl": () => (/* binding */ isAllowedRequestUrl)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/configuration */ "./src/core/configuration.js");



function areInOrder() {
	var numbers = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.toArray)(arguments)
	for (var i = 1; i < numbers.length; i += 1) {
		if (numbers[i - 1] > numbers[i]) {
			return false
		}
	}
	return true
}

function computePerformanceResourceDuration(entry) {
	// Safari duration is always 0 on timings blocked by cross origin policies.
	if (entry.startTime < entry.responseEnd) {
		return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(entry.responseEnd - entry.startTime)
	}
}

//  interface PerformanceResourceDetails {
//   redirect?: PerformanceResourceDetailsElement
//   dns?: PerformanceResourceDetailsElement
//   connect?: PerformanceResourceDetailsElement
//   ssl?: PerformanceResourceDetailsElement
//   firstByte: PerformanceResourceDetailsElement
//   download: PerformanceResourceDetailsElement
//   fmp:
// }
// page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
// page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
// page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
// page_firstbyte	float		首包时间	responseStart - domainLookupStart
// page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
// page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
// page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
// page_tcp	float		tcp连接时间	connectEnd - connectStart
// page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
// page_ttfb	float		请求响应耗时	responseStart - requestStart
// page_trans	float		内容传输时间	responseEnd - responseStart
// page_dom	float		DOM解析耗时	domInteractive - responseEnd
// page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd

//  navigationStart：当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性。

// ·   unloadEventStart：如果前一个网页与当前网页属于同一个域名，则返回前一个网页的unload事件发生时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

// ·   unloadEventEnd：如果前一个网页与当前网页属于同一个域名，则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

// ·   redirectStart：返回第一个HTTP跳转开始时的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

// ·   redirectEnd：返回最后一个HTTP跳转结束时（即跳转回应的最后一个字节接受完成时）的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

// ·   fetchStart：返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。

// ·   domainLookupStart：返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

// ·   domainLookupEnd：返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

// ·   connectStart：返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。

// ·   connectEnd：返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。

// ·   secureConnectionStart：返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。

// ·   requestStart：返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。

// ·   responseStart：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。

// ·   responseEnd：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。

// ·   domLoading：返回当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

// ·   domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

// ·   domContentLoadedEventStart：返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的Unix毫秒时间戳。

// ·   domContentLoadedEventEnd：返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。

// ·   domComplete：返回当前网页DOM结构生成时（即Document.readyState属性变为“complete”，以及相应的readystatechange事件发生时）的Unix毫秒时间戳。

// ·   loadEventStart：返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生，返回0。

// ·   loadEventEnd：返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生，返回0
function computePerformanceResourceDetails(entry) {
	var validEntry = toValidEntry(entry)

	if (!validEntry) {
		return undefined
	}

	var startTime = validEntry.startTime,
		fetchStart = validEntry.fetchStart,
		redirectStart = validEntry.redirectStart,
		redirectEnd = validEntry.redirectEnd,
		domainLookupStart =
			validEntry.domainLookupStart || validEntry.domainLookUpStart,
		domainLookupEnd = validEntry.domainLookupEnd || validEntry.domainLookUpEnd,
		connectStart = validEntry.connectStart,
		SSLconnectionStart = validEntry.SSLconnectionStart,
		SSLconnectionEnd = validEntry.SSLconnectionEnd,
		connectEnd = validEntry.connectEnd,
		requestStart = validEntry.requestStart,
		responseStart = validEntry.responseStart,
		responseEnd = validEntry.responseEnd
	var details = {
		firstbyte: formatTiming(startTime, domainLookupStart, responseStart),
		trans: formatTiming(startTime, responseStart, responseEnd),
		ttfb: formatTiming(startTime, requestStart, responseStart),
	}
	// Make sure a connection occurred
	if (connectEnd !== fetchStart) {
		details.tcp = formatTiming(startTime, connectStart, connectEnd)

		// Make sure a secure connection occurred
		if (areInOrder(connectStart, SSLconnectionStart, SSLconnectionEnd)) {
			details.ssl = formatTiming(
				startTime,
				SSLconnectionStart,
				SSLconnectionEnd,
			)
		}
	}

	// Make sure a domain lookup occurred
	if (domainLookupEnd !== fetchStart) {
		details.dns = formatTiming(startTime, domainLookupStart, domainLookupEnd)
	}

	if (hasRedirection(entry)) {
		details.redirect = formatTiming(startTime, redirectStart, redirectEnd)
	}

	return details
}

function toValidEntry(entry) {
	// Ensure timings are in the right order. On top of filtering out potential invalid
	// RumPerformanceResourceTiming, it will ignore entries from requests where timings cannot be
	// collected, for example cross origin requests without a "Timing-Allow-Origin" header allowing
	// it.
	// page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
	// page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
	// page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
	// page_firstbyte	float		首包时间	responseStart - domainLookupStart
	// page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
	// page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
	// page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
	// page_tcp	float		tcp连接时间	connectEnd - connectStart
	// page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
	// page_ttfb	float		请求响应耗时	responseStart - requestStart
	// page_trans	float		内容传输时间	responseEnd - responseStart
	// page_dom	float		DOM解析耗时	domInteractive - responseEnd
	// page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd
	if (
		!areInOrder(
			entry.startTime,
			entry.fetchStart,
			entry.domainLookupStart,
			entry.domainLookupEnd,
			entry.connectStart,
			entry.connectEnd,
			entry.requestStart,
			entry.responseStart,
			entry.responseEnd,
		)
	) {
		return undefined
	}

	if (!hasRedirection(entry)) {
		return entry
	}

	var redirectStart = entry.redirectStart
	var redirectEnd = entry.redirectEnd
	// Firefox doesn't provide redirect timings on cross origin requests.
	// Provide a default for those.
	if (redirectStart < entry.startTime) {
		redirectStart = entry.startTime
	}
	if (redirectEnd < entry.startTime) {
		redirectEnd = entry.fetchStart
	}

	// Make sure redirect timings are in order
	if (
		!areInOrder(entry.startTime, redirectStart, redirectEnd, entry.fetchStart)
	) {
		return undefined
	}
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend)({}, entry, {
		redirectEnd: redirectEnd,
		redirectStart: redirectStart,
	})
	// return {
	//   ...entry,
	//   redirectEnd,
	//   redirectStart
	// }
}

function hasRedirection(entry) {
	// The only time fetchStart is different than startTime is if a redirection occurred.
	return entry.fetchStart !== entry.startTime
}

function formatTiming(origin, start, end) {
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(end - start)
}

function computeSize(entry) {
	// Make sure a request actually occurred
	if (entry.startTime < entry.responseStart) {
		return entry.receivedBytedCount
	}
	return undefined
}

function isAllowedRequestUrl(configuration, url) {
	return url && !(0,_core_configuration__WEBPACK_IMPORTED_MODULE_1__.isIntakeRequest)(url, configuration)
}


/***/ }),

/***/ "./src/rumEventsCollection/setDataCollection.js":
/*!******************************************************!*\
  !*** ./src/rumEventsCollection/setDataCollection.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startSetDataColloction": () => (/* binding */ startSetDataColloction)
/* harmony export */ });
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");


function resetSetData(data, callback, lifeCycle, mpInstance) {
	var pendingStartTimestamp = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)()
	var _callback = function () {
		lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, {
			pendingStartTimestamp: pendingStartTimestamp,
			updateEndTimestamp: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)(),
		})
		if (typeof callback === 'function') {
			callback.call(mpInstance)
		}
	}
	return _callback
}
function startSetDataColloction(lifeCycle, Vue) {
	var originVueExtend = Vue.extend

	Vue.extend = function (vueOptions) {
		const userDefinedMethod = vueOptions['onLoad']
		vueOptions['onLoad'] = function () {
			var mpInstance = this.$scope
			var setData = mpInstance.setData

			// 重写setData
			if (typeof setData === 'function') {
				Object.defineProperty(mpInstance.__proto__, 'setData', {
					configurable: false,
					enumerable: false,
					value: function (data, callback) {
						return setData.call(
							mpInstance,
							data,
							resetSetData(data, callback, lifeCycle, mpInstance),
						)
					},
				})
				// 这里暂时这么处理
				mpInstance.setData = function (data, callback) {
					return setData.call(
						mpInstance,
						data,
						resetSetData(data, callback, lifeCycle, mpInstance),
					)
				}
			}

			return userDefinedMethod && userDefinedMethod.apply(this, arguments)
		}
		return originVueExtend.call(this, vueOptions)
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/trackEventCounts.js":
/*!*****************************************************!*\
  !*** ./src/rumEventsCollection/trackEventCounts.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trackEventCounts": () => (/* binding */ trackEventCounts)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");




function trackEventCounts(lifeCycle, callback) {
	if (typeof callback === 'undefined') {
		callback = _helper_utils__WEBPACK_IMPORTED_MODULE_0__.noop
	}
	var eventCounts = {
		errorCount: 0,
		resourceCount: 0,
		longTaskCount: 0,
		userActionCount: 0,
	}

	var subscription = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
		function (data) {
			var rawRumEvent = data.rawRumEvent
			switch (rawRumEvent.type) {
				case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ERROR:
					eventCounts.errorCount += 1
					callback(eventCounts)
					break
				case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.RESOURCE:
					eventCounts.resourceCount += 1
					callback(eventCounts)
					break
				case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ACTION:
					eventCounts.userActionCount += 1
					callback(eventCounts)
					break
			}
		},
	)

	return {
		stop: function () {
			subscription.unsubscribe()
		},
		eventCounts: eventCounts,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/trackPageActiveites.js":
/*!********************************************************!*\
  !*** ./src/rumEventsCollection/trackPageActiveites.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PAGE_ACTIVITY_VALIDATION_DELAY": () => (/* binding */ PAGE_ACTIVITY_VALIDATION_DELAY),
/* harmony export */   "PAGE_ACTIVITY_END_DELAY": () => (/* binding */ PAGE_ACTIVITY_END_DELAY),
/* harmony export */   "PAGE_ACTIVITY_MAX_DURATION": () => (/* binding */ PAGE_ACTIVITY_MAX_DURATION),
/* harmony export */   "waitIdlePageActivity": () => (/* binding */ waitIdlePageActivity),
/* harmony export */   "trackPageActivities": () => (/* binding */ trackPageActivities),
/* harmony export */   "waitPageActivitiesCompletion": () => (/* binding */ waitPageActivitiesCompletion)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/observable */ "./src/core/observable.js");



// Delay to wait for a page activity to validate the tracking process
var PAGE_ACTIVITY_VALIDATION_DELAY = 100
// Delay to wait after a page activity to end the tracking process
var PAGE_ACTIVITY_END_DELAY = 100
// Maximum duration of the tracking process
var PAGE_ACTIVITY_MAX_DURATION = 10000

function waitIdlePageActivity(lifeCycle, completionCallback) {
	var _trackPageActivities = trackPageActivities(lifeCycle)
	var pageActivitiesObservable = _trackPageActivities.observable
	var stopPageActivitiesTracking = _trackPageActivities.stop
	var _waitPageActivitiesCompletion = waitPageActivitiesCompletion(
		pageActivitiesObservable,
		stopPageActivitiesTracking,
		completionCallback,
	)

	var stopWaitPageActivitiesCompletion = _waitPageActivitiesCompletion.stop
	function stop() {
		stopWaitPageActivitiesCompletion()
		stopPageActivitiesTracking()
	}

	return { stop: stop }
}

// Automatic action collection lifecycle overview:
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
	var observable = new _core_observable__WEBPACK_IMPORTED_MODULE_2__.Observable()
	var subscriptions = []
	var firstRequestIndex
	var pendingRequestsCount = 0

	subscriptions.push(
		lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, function () {
			notifyPageActivity()
		}),
		lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, function () {
			notifyPageActivity()
		}),
	)

	subscriptions.push(
		lifeCycle.subscribe(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_STARTED,
			function (startEvent) {
				if (firstRequestIndex === undefined) {
					firstRequestIndex = startEvent.requestIndex
				}

				pendingRequestsCount += 1
				notifyPageActivity()
			},
		),
	)

	subscriptions.push(
		lifeCycle.subscribe(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_COMPLETED,
			function (request) {
				// If the request started before the tracking start, ignore it
				if (
					firstRequestIndex === undefined ||
					request.requestIndex < firstRequestIndex
				) {
					return
				}
				pendingRequestsCount -= 1
				notifyPageActivity()
			},
		),
	)

	function notifyPageActivity() {
		observable.notify({ isBusy: pendingRequestsCount > 0 })
	}

	return {
		observable: observable,
		stop: function () {
			(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(subscriptions, function (sub) {
				sub.unsubscribe()
			})
		},
	}
}

function waitPageActivitiesCompletion(
	pageActivitiesObservable,
	stopPageActivitiesTracking,
	completionCallback,
) {
	var idleTimeoutId
	var hasCompleted = false

	var validationTimeoutId = setTimeout(function () {
		complete({ hadActivity: false })
	}, PAGE_ACTIVITY_VALIDATION_DELAY)
	var maxDurationTimeoutId = setTimeout(function () {
		complete({ hadActivity: true, endTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() })
	}, PAGE_ACTIVITY_MAX_DURATION)
	pageActivitiesObservable.subscribe(function (data) {
		var isBusy = data.isBusy
		clearTimeout(validationTimeoutId)
		clearTimeout(idleTimeoutId)
		var lastChangeTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
		if (!isBusy) {
			idleTimeoutId = setTimeout(function () {
				complete({ hadActivity: true, endTime: lastChangeTime })
			}, PAGE_ACTIVITY_END_DELAY)
		}
	})

	function stop() {
		hasCompleted = true
		clearTimeout(validationTimeoutId)
		clearTimeout(idleTimeoutId)
		clearTimeout(maxDurationTimeoutId)
		stopPageActivitiesTracking()
	}

	function complete(params) {
		if (hasCompleted) {
			return
		}
		stop()
		completionCallback(params)
	}

	return { stop: stop }
}


/***/ }),

/***/ "./src/rumEventsCollection/transport/batch.js":
/*!****************************************************!*\
  !*** ./src/rumEventsCollection/transport/batch.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRumBatch": () => (/* binding */ startRumBatch)
/* harmony export */ });
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_transport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/transport */ "./src/core/transport.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");



function startRumBatch(configuration, lifeCycle) {
	var batch = makeRumBatch(configuration, lifeCycle)
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.RUM_EVENT_COLLECTED,
		function (serverRumEvent) {
			if (serverRumEvent.type === _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.VIEW) {
				batch.upsert(serverRumEvent, serverRumEvent.page.id)
			} else {
				batch.add(serverRumEvent)
			}
		},
	)
	return {
		stop: function () {
			batch.stop()
		},
	}
}

function makeRumBatch(configuration, lifeCycle) {
	var primaryBatch = createRumBatch(configuration.datakitUrl, lifeCycle)

	function createRumBatch(endpointUrl, lifeCycle) {
		return new _core_transport__WEBPACK_IMPORTED_MODULE_1__.Batch(
			new _core_transport__WEBPACK_IMPORTED_MODULE_1__.HttpRequest(endpointUrl, configuration.batchBytesLimit),
			configuration.maxBatchSize,
			configuration.batchBytesLimit,
			configuration.maxMessageSize,
			configuration.flushTimeout,
			lifeCycle,
		)
	}

	var stopped = false
	return {
		add: function (message) {
			if (stopped) {
				return
			}
			primaryBatch.add(message)
		},
		stop: function () {
			stopped = true
		},
		upsert: function (message, key) {
			if (stopped) {
				return
			}
			primaryBatch.upsert(message, key)
		},
	}
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datafluxRum": () => (/* reexport safe */ _boot_rum_entry__WEBPACK_IMPORTED_MODULE_0__.datafluxRum)
/* harmony export */ });
/* harmony import */ var _boot_rum_entry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot/rum.entry */ "./src/boot/rum.entry.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvYm9vdC9idWlsZEVudi5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvYm9vdC9ydW0uZW50cnkuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL2Jvb3QvcnVtLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9jb3JlL2Jhc2VJbmZvLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9jb3JlL2NvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL2NvcmUvZGF0YU1hcC5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvY29yZS9kb3dubG9hZFByb3h5LmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9jb3JlL2Vycm9yQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvY29yZS9lcnJvclRvb2xzLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9jb3JlL2xpZmVDeWNsZS5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvY29yZS9vYnNlcnZhYmxlLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9jb3JlL3Nkay5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvY29yZS90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL2NvcmUveGhyUHJveHkuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL2hlbHBlci9lbnVtcy5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvaGVscGVyL3RyYWNla2l0LmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9oZWxwZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vYWN0aW9uL2FjdGlvbkNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vYWN0aW9uL3RyYWNrQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9hcHAvYXBwQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vYXNzZW1ibHkuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vZXJyb3IvZXJyb3JDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vcGFnZS92aWV3Q29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9wYXJlbnRDb250ZXh0cy5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9wZXJmb3JtYW5jZUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vcmVxdWVzdENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vcmVzb3VyY2UvcmVzb3VyY2VDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3Jlc291cmNlL3Jlc291cmNlVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vc2V0RGF0YUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vdHJhY2tFdmVudENvdW50cy5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi90cmFja1BhZ2VBY3RpdmVpdGVzLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLXVuaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3RyYW5zcG9ydC9iYXRjaC5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tdW5pYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS11bmlhcHAvLi9zcmMv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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFdBQVcsY0FBYyxFQUFFLFlBQVksWUFBWTtBQUNqRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxpQkFBaUI7QUFDN0I7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssMENBQTBDO0FBQy9DLFlBQVksTUFBTTtBQUNsQixZQUFZLE9BQU87QUFDbkIsYUFBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZLGlCQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLGlCQUFpQjtBQUM3QixhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3QzQmdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixpQ0FBaUMsT0FBTztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ087QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EseUNBQXlDLDBDQUFNO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7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O1VDdERBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDIiwiZmlsZSI6ImRhdGFmbHV4LXJ1bS11bmlhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYnVpbGRFbnYgPSB7XG5cdHNka1ZlcnNpb246ICc8PDwgU0RLX1ZFUlNJT04gPj4+Jyxcblx0c2RrTmFtZTogJ2RmX3VuaWFwcF9ydW1fc2RrJyxcbn1cbiIsImltcG9ydCB7IGlzUGVyY2VudGFnZSB9IGZyb20gJy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IHN0YXJ0UnVtIH0gZnJvbSAnLi9ydW0nXG5leHBvcnQgY29uc3QgbWFrZVJ1bSA9IGZ1bmN0aW9uIChzdGFydFJ1bUltcGwpIHtcblx0dmFyIGlzQWxyZWFkeUluaXRpYWxpemVkID0gZmFsc2Vcblx0dmFyIHJ1bUdsb2JhbCA9IHtcblx0XHRpbml0OiBmdW5jdGlvbiAoVnVlLCB1c2VyQ29uZmlndXJhdGlvbikge1xuXHRcdFx0aWYgKHR5cGVvZiB1c2VyQ29uZmlndXJhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dXNlckNvbmZpZ3VyYXRpb24gPSB7fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCFWdWUpIHJldHVyblxuXHRcdFx0aWYgKCFjYW5Jbml0UnVtKHVzZXJDb25maWd1cmF0aW9uKSkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHN0YXJ0UnVtSW1wbChWdWUsIHVzZXJDb25maWd1cmF0aW9uKVxuXG5cdFx0XHRpc0FscmVhZHlJbml0aWFsaXplZCA9IHRydWVcblx0XHR9LFxuXHR9XG5cdHJldHVybiBydW1HbG9iYWxcblx0ZnVuY3Rpb24gY2FuSW5pdFJ1bSh1c2VyQ29uZmlndXJhdGlvbikge1xuXHRcdGlmIChpc0FscmVhZHlJbml0aWFsaXplZCkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignREFUQUZMVVhfUlVNIGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQuJylcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblxuXHRcdGlmICghdXNlckNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25JZCkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0J0FwcGxpY2F0aW9uIElEIGlzIG5vdCBjb25maWd1cmVkLCBubyBSVU0gZGF0YSB3aWxsIGJlIGNvbGxlY3RlZC4nLFxuXHRcdFx0KVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdGlmICghdXNlckNvbmZpZ3VyYXRpb24uZGF0YWtpdE9yaWdpbikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0J2RhdGFraXRPcmlnaW4gaXMgbm90IGNvbmZpZ3VyZWQsIG5vIFJVTSBkYXRhIHdpbGwgYmUgY29sbGVjdGVkLicsXG5cdFx0XHQpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0dXNlckNvbmZpZ3VyYXRpb24uc2FtcGxlUmF0ZSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHQhaXNQZXJjZW50YWdlKHVzZXJDb25maWd1cmF0aW9uLnNhbXBsZVJhdGUpXG5cdFx0KSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdTYW1wbGUgUmF0ZSBzaG91bGQgYmUgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMDAnKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH1cbn1cbmV4cG9ydCBjb25zdCBkYXRhZmx1eFJ1bSA9IG1ha2VSdW0oc3RhcnRSdW0pXG4iLCJpbXBvcnQgeyBidWlsZEVudiB9IGZyb20gJy4vYnVpbGRFbnYnXG5pbXBvcnQgeyBMaWZlQ3ljbGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IGNvbW1vbkluaXQgfSBmcm9tICcuLi9jb3JlL2NvbmZpZ3VyYXRpb24nXG5pbXBvcnQgeyBzdGFydEVycm9yQ29sbGVjdGlvbiB9IGZyb20gJy4uL3J1bUV2ZW50c0NvbGxlY3Rpb24vZXJyb3IvZXJyb3JDb2xsZWN0aW9uJ1xuaW1wb3J0IHsgc3RhcnRSdW1Bc3NlbWJseSB9IGZyb20gJy4uL3J1bUV2ZW50c0NvbGxlY3Rpb24vYXNzZW1ibHknXG5pbXBvcnQgeyBzdGFydFBhcmVudENvbnRleHRzIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9wYXJlbnRDb250ZXh0cydcbmltcG9ydCB7IHN0YXJ0UnVtQmF0Y2ggfSBmcm9tICcuLi9ydW1FdmVudHNDb2xsZWN0aW9uL3RyYW5zcG9ydC9iYXRjaCdcbmltcG9ydCB7IHN0YXJ0Vmlld0NvbGxlY3Rpb24gfSBmcm9tICcuLi9ydW1FdmVudHNDb2xsZWN0aW9uL3BhZ2Uvdmlld0NvbGxlY3Rpb24nXG5pbXBvcnQgeyBzdGFydFJlcXVlc3RDb2xsZWN0aW9uIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9yZXF1ZXN0Q29sbGVjdGlvbidcbmltcG9ydCB7IHN0YXJ0UmVzb3VyY2VDb2xsZWN0aW9uIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9yZXNvdXJjZS9yZXNvdXJjZUNvbGxlY3Rpb24nXG5pbXBvcnQgeyBzdGFydEFwcENvbGxlY3Rpb24gfSBmcm9tICcuLi9ydW1FdmVudHNDb2xsZWN0aW9uL2FwcC9hcHBDb2xsZWN0aW9uJ1xuaW1wb3J0IHsgc3RhcnRQYWdlUGVyZm9ybWFuY2VPYnNlcnZhYmxlIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9wZXJmb3JtYW5jZUNvbGxlY3Rpb24nXG5pbXBvcnQgeyBzdGFydFNldERhdGFDb2xsb2N0aW9uIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9zZXREYXRhQ29sbGVjdGlvbidcbmltcG9ydCB7IHN0YXJ0QWN0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4uL3J1bUV2ZW50c0NvbGxlY3Rpb24vYWN0aW9uL2FjdGlvbkNvbGxlY3Rpb24nXG5cbmltcG9ydCB7IHNkayB9IGZyb20gJy4uL2NvcmUvc2RrJ1xuZXhwb3J0IGNvbnN0IHN0YXJ0UnVtID0gZnVuY3Rpb24gKFZ1ZSwgdXNlckNvbmZpZ3VyYXRpb24pIHtcblx0Y29uc3QgY29uZmlndXJhdGlvbiA9IGNvbW1vbkluaXQodXNlckNvbmZpZ3VyYXRpb24sIGJ1aWxkRW52KVxuXHRjb25zdCBsaWZlQ3ljbGUgPSBuZXcgTGlmZUN5Y2xlKClcblx0dmFyIHBhcmVudENvbnRleHRzID0gc3RhcnRQYXJlbnRDb250ZXh0cyhsaWZlQ3ljbGUpXG5cdHZhciBiYXRjaCA9IHN0YXJ0UnVtQmF0Y2goY29uZmlndXJhdGlvbiwgbGlmZUN5Y2xlKVxuXHRzdGFydFJ1bUFzc2VtYmx5KFxuXHRcdHVzZXJDb25maWd1cmF0aW9uLmFwcGxpY2F0aW9uSWQsXG5cdFx0Y29uZmlndXJhdGlvbixcblx0XHRsaWZlQ3ljbGUsXG5cdFx0cGFyZW50Q29udGV4dHMsXG5cdClcblx0c3RhcnRBcHBDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbilcblx0c3RhcnRSZXNvdXJjZUNvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKVxuXHRzdGFydFZpZXdDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbiwgVnVlKVxuXHRzdGFydEVycm9yQ29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pXG5cdHN0YXJ0UmVxdWVzdENvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKVxuXHRzdGFydFBhZ2VQZXJmb3JtYW5jZU9ic2VydmFibGUobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKVxuXHRzdGFydFNldERhdGFDb2xsb2N0aW9uKGxpZmVDeWNsZSwgVnVlKVxuXHRzdGFydEFjdGlvbkNvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uLCBWdWUpXG59XG4iLCJpbXBvcnQgeyBzZGsgfSBmcm9tICcuLi9jb3JlL3NkaydcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBDTElFTlRfSURfVE9LRU4gfSBmcm9tICcuLi9oZWxwZXIvZW51bXMnXG5jbGFzcyBCYXNlSW5mbyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuc2Vzc2lvbklkID0gVVVJRCgpXG5cdFx0dGhpcy5nZXREZXZpY2VJbmZvKClcblx0XHR0aGlzLmdldE5ldFdvcmsoKVxuXHR9XG5cdGdldERldmljZUluZm8oKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGRldmljZUluZm8gPSBzZGsuZ2V0U3lzdGVtSW5mb1N5bmMoKVxuXHRcdFx0dmFyIG9zSW5mbyA9IGRldmljZUluZm8uc3lzdGVtLnNwbGl0KCcgJylcblx0XHRcdHZhciBvc1ZlcnNpb24gPSAnJ1xuXHRcdFx0aWYgKG9zSW5mby5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdG9zVmVyc2lvbiA9IG9zSW5mb1sxXVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3NWZXJzaW9uID0gb3NJbmZvWzBdIHx8ICcnXG5cdFx0XHR9XG5cdFx0XHR2YXIgb3NWZXJzaW9uTWFqb3IgPVxuXHRcdFx0XHRvc1ZlcnNpb24uc3BsaXQoJy4nKS5sZW5ndGggJiYgb3NWZXJzaW9uLnNwbGl0KCcuJylbMF1cblxuXHRcdFx0dGhpcy5kZXZpY2VJbmZvID0ge1xuXHRcdFx0XHRzY3JlZW5TaXplOiBgJHtkZXZpY2VJbmZvLnNjcmVlbldpZHRofSoke2RldmljZUluZm8uc2NyZWVuSGVpZ2h0fSBgLFxuXHRcdFx0XHRwbGF0Zm9ybTogZGV2aWNlSW5mby5wbGF0Zm9ybSxcblx0XHRcdFx0cGxhdGZvcm1WZXJzaW9uOiBkZXZpY2VJbmZvLnZlcnNpb24sXG5cdFx0XHRcdG9zVmVyc2lvbjogb3NWZXJzaW9uLFxuXHRcdFx0XHRvc1ZlcnNpb25NYWpvcjogb3NWZXJzaW9uTWFqb3IsXG5cdFx0XHRcdG9zOiBvc0luZm8ubGVuZ3RoID4gMSAmJiBvc0luZm9bMF0sXG5cdFx0XHRcdGFwcDogZGV2aWNlSW5mby5hcHAsXG5cdFx0XHRcdGJyYW5kOiBkZXZpY2VJbmZvLmJyYW5kLFxuXHRcdFx0XHRtb2RlbDogZGV2aWNlSW5mby5tb2RlbCxcblx0XHRcdFx0ZnJhbWV3b3JrVmVyc2lvbjogZGV2aWNlSW5mby5TREtWZXJzaW9uLFxuXHRcdFx0XHRwaXhlbFJhdGlvOiBkZXZpY2VJbmZvLnBpeGVsUmF0aW8sXG5cdFx0XHRcdGRldmljZVV1aWQ6IGRldmljZUluZm8uZGV2aWNlSWQsXG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dGhpcy5kZXZpY2VJbmZvID0ge31cblx0XHR9XG5cdH1cblx0Z2V0Q2xpZW50SUQoKSB7XG5cdFx0dmFyIGNsaWVuZXRJZCA9IHNkay5nZXRTdG9yYWdlU3luYyhDTElFTlRfSURfVE9LRU4pXG5cdFx0aWYgKCFjbGllbmV0SWQpIHtcblx0XHRcdGNsaWVuZXRJZCA9IFVVSUQoKVxuXHRcdFx0c2RrLnNldFN0b3JhZ2VTeW5jKENMSUVOVF9JRF9UT0tFTiwgY2xpZW5ldElkKVxuXHRcdH1cblx0XHRyZXR1cm4gY2xpZW5ldElkXG5cdH1cblx0Z2V0TmV0V29yaygpIHtcblx0XHRzZGsuZ2V0TmV0d29ya1R5cGUoe1xuXHRcdFx0c3VjY2VzczogKGUpID0+IHtcblx0XHRcdFx0dGhpcy5kZXZpY2VJbmZvLm5ldHdvcmsgPSBlLm5ldHdvcmtUeXBlID8gZS5uZXR3b3JrVHlwZSA6ICd1bmtub3duJ1xuXHRcdFx0fSxcblx0XHR9KVxuXHRcdHNkay5vbk5ldHdvcmtTdGF0dXNDaGFuZ2UoKGUpID0+IHtcblx0XHRcdHRoaXMuZGV2aWNlSW5mby5uZXR3b3JrID0gZS5uZXR3b3JrVHlwZSA/IGUubmV0d29ya1R5cGUgOiAndW5rbm93bidcblx0XHR9KVxuXHR9XG5cdGdldFNlc3Npb25JZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXNzaW9uSWRcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQmFzZUluZm8oKVxuIiwiaW1wb3J0IHsgZXh0ZW5kMkxldiwgdXJsUGFyc2UgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBPTkVfS0lMT19CWVRFLCBPTkVfU0VDT05EIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xudmFyIFRSSU1fUkVHSVggPSAvXlxccyt8XFxzKyQvZ1xuZXhwb3J0IHZhciBERUZBVUxUX0NPTkZJR1VSQVRJT04gPSB7XG5cdHNhbXBsZVJhdGU6IDEwMCxcblx0Zmx1c2hUaW1lb3V0OiAzMCAqIE9ORV9TRUNPTkQsXG5cdG1heEVycm9yc0J5TWludXRlOiAzMDAwLFxuXHQvKipcblx0ICogTG9ncyBpbnRha2UgbGltaXRcblx0ICovXG5cdG1heEJhdGNoU2l6ZTogNTAsXG5cdG1heE1lc3NhZ2VTaXplOiAyNTYgKiBPTkVfS0lMT19CWVRFLFxuXG5cdC8qKlxuXHQgKiBiZWFjb24gcGF5bG9hZCBtYXggcXVldWUgc2l6ZSBpbXBsZW1lbnRhdGlvbiBpcyA2NGtiXG5cdCAqIGVuc3VyZSB0aGF0IHdlIGxlYXZlIHJvb20gZm9yIGxvZ3MsIHJ1bSBhbmQgcG90ZW50aWFsIG90aGVyIHVzZXJzXG5cdCAqL1xuXHRiYXRjaEJ5dGVzTGltaXQ6IDE2ICogT05FX0tJTE9fQllURSxcblx0ZGF0YWtpdFVybDogJycsXG5cdC8qKlxuXHQgKiBhcmJpdHJhcnkgdmFsdWUsIGJ5dGUgcHJlY2lzaW9uIG5vdCBuZWVkZWRcblx0ICovXG5cdHJlcXVlc3RFcnJvclJlc3BvbnNlTGVuZ3RoTGltaXQ6IDMyICogT05FX0tJTE9fQllURSxcblx0dHJhY2tJbnRlcmFjdGlvbnM6IGZhbHNlLFxufVxuZnVuY3Rpb24gdHJpbShzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKFRSSU1fUkVHSVgsICcnKVxufVxuZnVuY3Rpb24gZ2V0RGF0YWtpdFVybFVybCh1cmwpIHtcblx0aWYgKHVybCAmJiB1cmwubGFzdEluZGV4T2YoJy8nKSA9PT0gdXJsLmxlbmd0aCAtIDEpXG5cdFx0cmV0dXJuIHRyaW0odXJsKSArICd2MS93cml0ZS9ydW0nXG5cdHJldHVybiB0cmltKHVybCkgKyAnL3YxL3dyaXRlL3J1bSdcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21tb25Jbml0KHVzZXJDb25maWd1cmF0aW9uLCBidWlsZEVudikge1xuXHR2YXIgdHJhbnNwb3J0Q29uZmlndXJhdGlvbiA9IHtcblx0XHRhcHBsaWNhdGlvbklkOiB1c2VyQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbklkLFxuXHRcdGVudjogdXNlckNvbmZpZ3VyYXRpb24uZW52IHx8ICcnLFxuXHRcdHZlcnNpb246IHVzZXJDb25maWd1cmF0aW9uLnZlcnNpb24gfHwgJycsXG5cdFx0c2RrVmVyc2lvbjogYnVpbGRFbnYuc2RrVmVyc2lvbixcblx0XHRzZGtOYW1lOiBidWlsZEVudi5zZGtOYW1lLFxuXHRcdGRhdGFraXRVcmw6IGdldERhdGFraXRVcmxVcmwoXG5cdFx0XHR1c2VyQ29uZmlndXJhdGlvbi5kYXRha2l0VXJsIHx8IHVzZXJDb25maWd1cmF0aW9uLmRhdGFraXRPcmlnaW4sXG5cdFx0KSxcblx0XHR0YWdzOiB1c2VyQ29uZmlndXJhdGlvbi50YWdzIHx8IFtdLFxuXHR9XG5cdGlmICgndHJhY2tJbnRlcmFjdGlvbnMnIGluIHVzZXJDb25maWd1cmF0aW9uKSB7XG5cdFx0dHJhbnNwb3J0Q29uZmlndXJhdGlvbi50cmFja0ludGVyYWN0aW9ucyA9ICEhdXNlckNvbmZpZ3VyYXRpb24udHJhY2tJbnRlcmFjdGlvbnNcblx0fVxuXHRyZXR1cm4gZXh0ZW5kMkxldihERUZBVUxUX0NPTkZJR1VSQVRJT04sIHRyYW5zcG9ydENvbmZpZ3VyYXRpb24pXG59XG5jb25zdCBoYXZlU2FtZU9yaWdpbiA9IGZ1bmN0aW9uICh1cmwxLCB1cmwyKSB7XG5cdGNvbnN0IHBhcnNlVXJsMSA9IHVybFBhcnNlKHVybDEpLmdldFBhcnNlKClcblx0Y29uc3QgcGFyc2VVcmwyID0gdXJsUGFyc2UodXJsMikuZ2V0UGFyc2UoKVxuXHRyZXR1cm4gcGFyc2VVcmwxLk9yaWdpbiA9PT0gcGFyc2VVcmwyLk9yaWdpblxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzSW50YWtlUmVxdWVzdCh1cmwsIGNvbmZpZ3VyYXRpb24pIHtcblx0cmV0dXJuIGhhdmVTYW1lT3JpZ2luKHVybCwgY29uZmlndXJhdGlvbi5kYXRha2l0VXJsKVxufVxuIiwiaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xuLy8g6ZyA6KaB55So5Y+M5byV5Y+35bCG5a2X56ym5Liy57G75Z6L55qEZmllbGQgdmFsdWXmi6zotbfmnaXvvIwg6L+Z6YeM5pyJ5pWw57uE5qCH56S6W3N0cmluZywgcGF0aF1cbmV4cG9ydCB2YXIgY29tbW9uVGFncyA9IHtcblx0c2RrX25hbWU6ICdfZGQuc2RrX25hbWUnLFxuXHRzZGtfdmVyc2lvbjogJ19kZC5zZGtfdmVyc2lvbicsXG5cdGFwcF9pZDogJ2FwcGxpY2F0aW9uLmlkJyxcblx0ZW52OiAnX2RkLmVudicsXG5cdHZlcnNpb246ICdfZGQudmVyc2lvbicsXG5cdHVzZXJpZDogJ3VzZXIudXNlcl9pZCcsXG5cdHNlc3Npb25faWQ6ICdzZXNzaW9uLmlkJyxcblx0c2Vzc2lvbl90eXBlOiAnc2Vzc2lvbi50eXBlJyxcblx0aXNfc2lnbmluOiAndXNlci5pc19zaWduaW4nLFxuXHRkZXZpY2U6ICdkZXZpY2UuYnJhbmQnLFxuXHRtb2RlbDogJ2RldmljZS5tb2RlbCcsXG5cdGRldmljZV91dWlkOiAnZGV2aWNlLmRldmljZV91dWlkJyxcblx0b3M6ICdkZXZpY2Uub3MnLFxuXHRhcHA6ICdkZXZpY2UuYXBwJyxcblx0b3NfdmVyc2lvbjogJ2RldmljZS5vc192ZXJzaW9uJyxcblx0b3NfdmVyc2lvbl9tYWpvcjogJ2RldmljZS5vc192ZXJzaW9uX21ham9yJyxcblx0c2NyZWVuX3NpemU6ICdkZXZpY2Uuc2NyZWVuX3NpemUnLFxuXHRuZXR3b3JrX3R5cGU6ICdkZXZpY2UubmV0d29ya190eXBlJyxcblx0cGxhdGZvcm06ICdkZXZpY2UucGxhdGZvcm0nLFxuXHRwbGF0Zm9ybV92ZXJzaW9uOiAnZGV2aWNlLnBsYXRmb3JtX3ZlcnNpb24nLFxuXHRhcHBfZnJhbWV3b3JrX3ZlcnNpb246ICdkZXZpY2UuZnJhbWV3b3JrX3ZlcnNpb24nLFxuXHR2aWV3X2lkOiAncGFnZS5pZCcsXG5cdHZpZXdfbmFtZTogJ3BhZ2Uucm91dGUnLFxuXHR2aWV3X3JlZmVyZXI6ICdwYWdlLnJlZmVyZXInLFxufVxuZXhwb3J0IHZhciBkYXRhTWFwID0ge1xuXHR2aWV3OiB7XG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLlZJRVcsXG5cdFx0dGFnczoge1xuXHRcdFx0dmlld19hcGRleF9sZXZlbDogJ3BhZ2UuYXBkZXhfbGV2ZWwnLFxuXHRcdFx0aXNfYWN0aXZlOiAncGFnZS5pc19hY3RpdmUnLFxuXHRcdH0sXG5cdFx0ZmllbGRzOiB7XG5cdFx0XHRwYWdlX2ZtcDogJ3BhZ2UuZm1wJyxcblx0XHRcdGZpcnN0X3BhaW50X3RpbWU6ICdwYWdlLmZwdCcsXG5cdFx0XHRsb2FkaW5nX3RpbWU6ICdwYWdlLmxvYWRpbmdfdGltZScsXG5cdFx0XHRvbmxvYWRfdG9fb25zaG93OiAncGFnZS5vbmxvYWQyb25zaG93Jyxcblx0XHRcdG9uc2hvd190b19vbnJlYWR5OiAncGFnZS5vbnNob3cyb25yZWFkeScsXG5cdFx0XHR0aW1lX3NwZW50OiAncGFnZS50aW1lX3NwZW50Jyxcblx0XHRcdHZpZXdfZXJyb3JfY291bnQ6ICdwYWdlLmVycm9yLmNvdW50Jyxcblx0XHRcdHZpZXdfcmVzb3VyY2VfY291bnQ6ICdwYWdlLnJlc291cmNlLmNvdW50Jyxcblx0XHRcdHZpZXdfbG9uZ190YXNrX2NvdW50OiAncGFnZS5sb25nX3Rhc2suY291bnQnLFxuXHRcdFx0dmlld19hY3Rpb25fY291bnQ6ICdwYWdlLmFjdGlvbi5jb3VudCcsXG5cdFx0XHR2aWV3X3NldGRhdGFfY291bnQ6ICdwYWdlLnNldGRhdGEuY291bnQnLFxuXHRcdH0sXG5cdH0sXG5cdHJlc291cmNlOiB7XG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLlJFU09VUkNFLFxuXHRcdHRhZ3M6IHtcblx0XHRcdHJlc291cmNlX3R5cGU6ICdyZXNvdXJjZS50eXBlJyxcblx0XHRcdHJlc291cmNlX3N0YXR1czogJ3Jlc291cmNlLnN0YXR1cycsXG5cdFx0XHRyZXNvdXJjZV9zdGF0dXNfZ3JvdXA6ICdyZXNvdXJjZS5zdGF0dXNfZ3JvdXAnLFxuXHRcdFx0cmVzb3VyY2VfbWV0aG9kOiAncmVzb3VyY2UubWV0aG9kJyxcblx0XHRcdHJlc291cmNlX3VybDogJ3Jlc291cmNlLnVybCcsXG5cdFx0XHRyZXNvdXJjZV91cmxfaG9zdDogJ3Jlc291cmNlLnVybF9ob3N0Jyxcblx0XHRcdHJlc291cmNlX3VybF9wYXRoOiAncmVzb3VyY2UudXJsX3BhdGgnLFxuXHRcdFx0cmVzb3VyY2VfdXJsX3BhdGhfZ3JvdXA6ICdyZXNvdXJjZS51cmxfcGF0aF9ncm91cCcsXG5cdFx0XHRyZXNvdXJjZV91cmxfcXVlcnk6ICdyZXNvdXJjZS51cmxfcXVlcnknLFxuXHRcdH0sXG5cdFx0ZmllbGRzOiB7XG5cdFx0XHRyZXNvdXJjZV9zaXplOiAncmVzb3VyY2Uuc2l6ZScsXG5cdFx0XHRyZXNvdXJjZV9sb2FkOiAncmVzb3VyY2UubG9hZCcsXG5cdFx0XHRyZXNvdXJjZV9kbnM6ICdyZXNvdXJjZS5kbnMnLFxuXHRcdFx0cmVzb3VyY2VfdGNwOiAncmVzb3VyY2UudGNwJyxcblx0XHRcdHJlc291cmNlX3NzbDogJ3Jlc291cmNlLnNzbCcsXG5cdFx0XHRyZXNvdXJjZV90dGZiOiAncmVzb3VyY2UudHRmYicsXG5cdFx0XHRyZXNvdXJjZV90cmFuczogJ3Jlc291cmNlLnRyYW5zJyxcblx0XHRcdHJlc291cmNlX2ZpcnN0X2J5dGU6ICdyZXNvdXJjZS5maXJzdGJ5dGUnLFxuXHRcdFx0ZHVyYXRpb246ICdyZXNvdXJjZS5kdXJhdGlvbicsXG5cdFx0fSxcblx0fSxcblx0ZXJyb3I6IHtcblx0XHR0eXBlOiBSdW1FdmVudFR5cGUuRVJST1IsXG5cdFx0dGFnczoge1xuXHRcdFx0ZXJyb3Jfc291cmNlOiAnZXJyb3Iuc291cmNlJyxcblx0XHRcdGVycm9yX3R5cGU6ICdlcnJvci50eXBlJyxcblx0XHRcdHJlc291cmNlX3VybDogJ2Vycm9yLnJlc291cmNlLnVybCcsXG5cdFx0XHRyZXNvdXJjZV91cmxfaG9zdDogJ2Vycm9yLnJlc291cmNlLnVybF9ob3N0Jyxcblx0XHRcdHJlc291cmNlX3VybF9wYXRoOiAnZXJyb3IucmVzb3VyY2UudXJsX3BhdGgnLFxuXHRcdFx0cmVzb3VyY2VfdXJsX3BhdGhfZ3JvdXA6ICdlcnJvci5yZXNvdXJjZS51cmxfcGF0aF9ncm91cCcsXG5cdFx0XHRyZXNvdXJjZV9zdGF0dXM6ICdlcnJvci5yZXNvdXJjZS5zdGF0dXMnLFxuXHRcdFx0cmVzb3VyY2Vfc3RhdHVzX2dyb3VwOiAnZXJyb3IucmVzb3VyY2Uuc3RhdHVzX2dyb3VwJyxcblx0XHRcdHJlc291cmNlX21ldGhvZDogJ2Vycm9yLnJlc291cmNlLm1ldGhvZCcsXG5cdFx0fSxcblx0XHRmaWVsZHM6IHtcblx0XHRcdGVycm9yX21lc3NhZ2U6IFsnc3RyaW5nJywgJ2Vycm9yLm1lc3NhZ2UnXSxcblx0XHRcdGVycm9yX3N0YWNrOiBbJ3N0cmluZycsICdlcnJvci5zdGFjayddLFxuXHRcdH0sXG5cdH0sXG5cdGxvbmdfdGFzazoge1xuXHRcdHR5cGU6IFJ1bUV2ZW50VHlwZS5MT05HX1RBU0ssXG5cdFx0dGFnczoge30sXG5cdFx0ZmllbGRzOiB7XG5cdFx0XHRkdXJhdGlvbjogJ2xvbmdfdGFzay5kdXJhdGlvbicsXG5cdFx0fSxcblx0fSxcblx0YWN0aW9uOiB7XG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLkFDVElPTixcblx0XHR0YWdzOiB7XG5cdFx0XHRhY3Rpb25faWQ6ICdhY3Rpb24uaWQnLFxuXHRcdFx0YWN0aW9uX25hbWU6ICdhY3Rpb24udGFyZ2V0Lm5hbWUnLFxuXHRcdFx0YWN0aW9uX3R5cGU6ICdhY3Rpb24udHlwZScsXG5cdFx0fSxcblx0XHRmaWVsZHM6IHtcblx0XHRcdGR1cmF0aW9uOiAnYWN0aW9uLmxvYWRpbmdfdGltZScsXG5cdFx0XHRhY3Rpb25fZXJyb3JfY291bnQ6ICdhY3Rpb24uZXJyb3IuY291bnQnLFxuXHRcdFx0YWN0aW9uX3Jlc291cmNlX2NvdW50OiAnYWN0aW9uLnJlc291cmNlLmNvdW50Jyxcblx0XHRcdGFjdGlvbl9sb25nX3Rhc2tfY291bnQ6ICdhY3Rpb24ubG9uZ190YXNrLmNvdW50Jyxcblx0XHR9LFxuXHR9LFxuXHRhcHA6IHtcblx0XHRhbGlhc19rZXk6ICdhY3Rpb24nLCAvLyBtZXRyYyDliKvlkI0sXG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLkFQUCxcblx0XHR0YWdzOiB7XG5cdFx0XHRhY3Rpb25faWQ6ICdhcHAuaWQnLFxuXHRcdFx0YWN0aW9uX25hbWU6ICdhcHAubmFtZScsXG5cdFx0XHRhY3Rpb25fdHlwZTogJ2FwcC50eXBlJyxcblx0XHR9LFxuXHRcdGZpZWxkczoge1xuXHRcdFx0ZHVyYXRpb246ICdhcHAuZHVyYXRpb24nLFxuXHRcdH0sXG5cdH0sXG59XG4iLCJpbXBvcnQgeyBzZGsgfSBmcm9tICcuL3NkaydcbmltcG9ydCB7IG5vdyB9IGZyb20gJy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IFJlcXVlc3RUeXBlIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xudmFyIGRvd25sb2FkUHJveHlTaW5nbGV0b25cbnZhciBiZWZvcmVTZW5kQ2FsbGJhY2tzID0gW11cbnZhciBvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcyA9IFtdXG52YXIgb3JpZ2luYWxEb3dubG9hZFJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBzdGFydERvd25sb2FkUHJveHkoKSB7XG5cdGlmICghZG93bmxvYWRQcm94eVNpbmdsZXRvbikge1xuXHRcdHByb3h5RG93bmxvYWQoKVxuXHRcdGRvd25sb2FkUHJveHlTaW5nbGV0b24gPSB7XG5cdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0YmVmb3JlU2VuZENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuXHRcdFx0fSxcblx0XHRcdG9uUmVxdWVzdENvbXBsZXRlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0b25SZXF1ZXN0Q29tcGxldGVDYWxsYmFja3MucHVzaChjYWxsYmFjaylcblx0XHRcdH0sXG5cdFx0fVxuXHR9XG5cdHJldHVybiBkb3dubG9hZFByb3h5U2luZ2xldG9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldERvd25sb2FkUHJveHkoKSB7XG5cdGlmIChkb3dubG9hZFByb3h5U2luZ2xldG9uKSB7XG5cdFx0ZG93bmxvYWRQcm94eVNpbmdsZXRvbiA9IHVuZGVmaW5lZFxuXHRcdGJlZm9yZVNlbmRDYWxsYmFja3Muc3BsaWNlKDAsIGJlZm9yZVNlbmRDYWxsYmFja3MubGVuZ3RoKVxuXHRcdG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzLnNwbGljZSgwLCBvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcy5sZW5ndGgpXG5cdFx0c2RrLmRvd25sb2FkRmlsZSA9IG9yaWdpbmFsRG93bmxvYWRSZXF1ZXN0XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJveHlEb3dubG9hZCgpIHtcblx0b3JpZ2luYWxEb3dubG9hZFJlcXVlc3QgPSBzZGsuZG93bmxvYWRGaWxlXG5cdHNkay5kb3dubG9hZEZpbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpc1xuXHRcdHZhciBkYXRhZmx1eF94aHIgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0c3RhcnRUaW1lOiAwLFxuXHRcdFx0dXJsOiBhcmd1bWVudHNbMF0udXJsLFxuXHRcdFx0dHlwZTogUmVxdWVzdFR5cGUuRE9XTkxPQUQsXG5cdFx0XHRyZXNwb25zZVR5cGU6ICdmaWxlJyxcblx0XHR9XG5cdFx0ZGF0YWZsdXhfeGhyLnN0YXJ0VGltZSA9IG5vdygpXG5cblx0XHR2YXIgb3JpZ2luYWxTdWNjZXNzID0gYXJndW1lbnRzWzBdLnN1Y2Nlc3NcblxuXHRcdGFyZ3VtZW50c1swXS5zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVwb3J0WGhyKGFyZ3VtZW50c1swXSlcblxuXHRcdFx0aWYgKG9yaWdpbmFsU3VjY2Vzcykge1xuXHRcdFx0XHRvcmlnaW5hbFN1Y2Nlc3MuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cylcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIG9yaWdpbmFsRmFpbCA9IGFyZ3VtZW50c1swXS5mYWlsXG5cdFx0YXJndW1lbnRzWzBdLmZhaWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXBvcnRYaHIoYXJndW1lbnRzWzBdKVxuXHRcdFx0aWYgKG9yaWdpbmFsRmFpbCkge1xuXHRcdFx0XHRvcmlnaW5hbEZhaWwuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cylcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIGhhc0JlZW5SZXBvcnRlZCA9IGZhbHNlXG5cdFx0dmFyIHJlcG9ydFhociA9IGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdGlmIChoYXNCZWVuUmVwb3J0ZWQpIHtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRoYXNCZWVuUmVwb3J0ZWQgPSB0cnVlXG5cdFx0XHRkYXRhZmx1eF94aHIuZHVyYXRpb24gPSBub3coKSAtIGRhdGFmbHV4X3hoci5zdGFydFRpbWVcblx0XHRcdGRhdGFmbHV4X3hoci5yZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0ZmlsZVBhdGg6IHJlcy5maWxlUGF0aCxcblx0XHRcdFx0dGVtcEZpbGVQYXRoOiByZXMudGVtcEZpbGVQYXRoLFxuXHRcdFx0fSlcblx0XHRcdGRhdGFmbHV4X3hoci5oZWFkZXIgPSByZXMuaGVhZGVyIHx8IHt9XG5cdFx0XHRkYXRhZmx1eF94aHIucHJvZmlsZSA9IHJlcy5wcm9maWxlXG5cdFx0XHRkYXRhZmx1eF94aHIuc3RhdHVzID0gcmVzLnN0YXR1c0NvZGUgfHwgcmVzLnN0YXR1cyB8fCAwXG5cdFx0XHRvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHRjYWxsYmFjayhkYXRhZmx1eF94aHIpXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRiZWZvcmVTZW5kQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRjYWxsYmFjayhkYXRhZmx1eF94aHIpXG5cdFx0fSlcblx0XHRyZXR1cm4gb3JpZ2luYWxEb3dubG9hZFJlcXVlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHR9XG59XG4iLCJpbXBvcnQgeyB0b0FycmF5LCBub3cgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBPTkVfTUlOVVRFLCBSZXF1ZXN0VHlwZSB9IGZyb20gJy4uL2hlbHBlci9lbnVtcydcbmltcG9ydCB7XG5cdEVycm9yU291cmNlLFxuXHRmb3JtYXRVbmtub3duRXJyb3IsXG5cdHRvU3RhY2tUcmFjZVN0cmluZyxcbn0gZnJvbSAnLi9lcnJvclRvb2xzJ1xuaW1wb3J0IHsgY29tcHV0ZVN0YWNrVHJhY2UsIHJlcG9ydCB9IGZyb20gJy4uL2hlbHBlci90cmFjZWtpdCdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuL29ic2VydmFibGUnXG5pbXBvcnQgeyBpc0ludGFrZVJlcXVlc3QgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nXG5pbXBvcnQgeyByZXNldFhoclByb3h5LCBzdGFydFhoclByb3h5IH0gZnJvbSAnLi94aHJQcm94eSdcbmltcG9ydCB7IHJlc2V0RG93bmxvYWRQcm94eSwgc3RhcnREb3dubG9hZFByb3h5IH0gZnJvbSAnLi9kb3dubG9hZFByb3h5J1xudmFyIG9yaWdpbmFsQ29uc29sZUVycm9yXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydENvbnNvbGVUcmFja2luZyhlcnJvck9ic2VydmFibGUpIHtcblx0b3JpZ2luYWxDb25zb2xlRXJyb3IgPSBjb25zb2xlLmVycm9yXG5cdGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0b3JpZ2luYWxDb25zb2xlRXJyb3IuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxuXHRcdHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpXG5cdFx0dmFyIG1lc3NhZ2UgPSBbXVxuXHRcdGFyZ3MuY29uY2F0KFsnY29uc29sZSBlcnJvcjonXSkuZm9yRWFjaChmdW5jdGlvbiAocGFyYSkge1xuXHRcdFx0bWVzc2FnZS5wdXNoKGZvcm1hdENvbnNvbGVQYXJhbWV0ZXJzKHBhcmEpKVxuXHRcdH0pXG5cblx0XHRlcnJvck9ic2VydmFibGUubm90aWZ5KHtcblx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2Uuam9pbignICcpLFxuXHRcdFx0c291cmNlOiBFcnJvclNvdXJjZS5DT05TT0xFLFxuXHRcdFx0c3RhcnRUaW1lOiBub3coKSxcblx0XHR9KVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQ29uc29sZVRyYWNraW5nKCkge1xuXHRjb25zb2xlLmVycm9yID0gb3JpZ2luYWxDb25zb2xlRXJyb3Jcbn1cblxuZnVuY3Rpb24gZm9ybWF0Q29uc29sZVBhcmFtZXRlcnMocGFyYW0pIHtcblx0aWYgKHR5cGVvZiBwYXJhbSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gcGFyYW1cblx0fVxuXHRpZiAocGFyYW0gaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiB0b1N0YWNrVHJhY2VTdHJpbmcoY29tcHV0ZVN0YWNrVHJhY2UocGFyYW0pKVxuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShwYXJhbSwgdW5kZWZpbmVkLCAyKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckVycm9ycyhjb25maWd1cmF0aW9uLCBlcnJvck9ic2VydmFibGUpIHtcblx0dmFyIGVycm9yQ291bnQgPSAwXG5cdHZhciBmaWx0ZXJlZEVycm9yT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKClcblx0ZXJyb3JPYnNlcnZhYmxlLnN1YnNjcmliZShmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRpZiAoZXJyb3JDb3VudCA8IGNvbmZpZ3VyYXRpb24ubWF4RXJyb3JzQnlNaW51dGUpIHtcblx0XHRcdGVycm9yQ291bnQgKz0gMVxuXHRcdFx0ZmlsdGVyZWRFcnJvck9ic2VydmFibGUubm90aWZ5KGVycm9yKVxuXHRcdH0gZWxzZSBpZiAoZXJyb3JDb3VudCA9PT0gY29uZmlndXJhdGlvbi5tYXhFcnJvcnNCeU1pbnV0ZSkge1xuXHRcdFx0ZXJyb3JDb3VudCArPSAxXG5cdFx0XHRmaWx0ZXJlZEVycm9yT2JzZXJ2YWJsZS5ub3RpZnkoe1xuXHRcdFx0XHRtZXNzYWdlOlxuXHRcdFx0XHRcdCdSZWFjaGVkIG1heCBudW1iZXIgb2YgZXJyb3JzIGJ5IG1pbnV0ZTogJyArXG5cdFx0XHRcdFx0Y29uZmlndXJhdGlvbi5tYXhFcnJvcnNCeU1pbnV0ZSxcblx0XHRcdFx0c291cmNlOiBFcnJvclNvdXJjZS5BR0VOVCxcblx0XHRcdFx0c3RhcnRUaW1lOiBub3coKSxcblx0XHRcdH0pXG5cdFx0fVxuXHR9KVxuXHRzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cdFx0ZXJyb3JDb3VudCA9IDBcblx0fSwgT05FX01JTlVURSlcblx0cmV0dXJuIGZpbHRlcmVkRXJyb3JPYnNlcnZhYmxlXG59XG52YXIgdHJhY2VLaXRSZXBvcnRIYW5kbGVyXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFJ1bnRpbWVFcnJvclRyYWNraW5nKGVycm9yT2JzZXJ2YWJsZSkge1xuXHR0cmFjZUtpdFJlcG9ydEhhbmRsZXIgPSBmdW5jdGlvbiAoc3RhY2tUcmFjZSwgXywgZXJyb3JPYmplY3QpIHtcblx0XHR2YXIgZXJyb3IgPSBmb3JtYXRVbmtub3duRXJyb3Ioc3RhY2tUcmFjZSwgZXJyb3JPYmplY3QsICdVbmNhdWdodCcpXG5cdFx0ZXJyb3JPYnNlcnZhYmxlLm5vdGlmeSh7XG5cdFx0XHRtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuXHRcdFx0c3RhY2s6IGVycm9yLnN0YWNrLFxuXHRcdFx0dHlwZTogZXJyb3IudHlwZSxcblx0XHRcdHNvdXJjZTogRXJyb3JTb3VyY2UuU09VUkNFLFxuXHRcdFx0c3RhcnRUaW1lOiBub3coKSxcblx0XHR9KVxuXHR9XG5cdHJlcG9ydC5zdWJzY3JpYmUodHJhY2VLaXRSZXBvcnRIYW5kbGVyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFJ1bnRpbWVFcnJvclRyYWNraW5nKCkge1xuXHRyZXBvcnQudW5zdWJzY3JpYmUodHJhY2VLaXRSZXBvcnRIYW5kbGVyKVxufVxudmFyIGZpbHRlcmVkRXJyb3JzT2JzZXJ2YWJsZVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRBdXRvbWF0aWNFcnJvckNvbGxlY3Rpb24oY29uZmlndXJhdGlvbikge1xuXHRpZiAoIWZpbHRlcmVkRXJyb3JzT2JzZXJ2YWJsZSkge1xuXHRcdHZhciBlcnJvck9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpXG5cdFx0dHJhY2tOZXR3b3JrRXJyb3IoY29uZmlndXJhdGlvbiwgZXJyb3JPYnNlcnZhYmxlKVxuXHRcdHN0YXJ0Q29uc29sZVRyYWNraW5nKGVycm9yT2JzZXJ2YWJsZSlcblx0XHRzdGFydFJ1bnRpbWVFcnJvclRyYWNraW5nKGVycm9yT2JzZXJ2YWJsZSlcblx0XHRmaWx0ZXJlZEVycm9yc09ic2VydmFibGUgPSBmaWx0ZXJFcnJvcnMoY29uZmlndXJhdGlvbiwgZXJyb3JPYnNlcnZhYmxlKVxuXHR9XG5cdHJldHVybiBmaWx0ZXJlZEVycm9yc09ic2VydmFibGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrTmV0d29ya0Vycm9yKGNvbmZpZ3VyYXRpb24sIGVycm9yT2JzZXJ2YWJsZSkge1xuXHRzdGFydFhoclByb3h5KCkub25SZXF1ZXN0Q29tcGxldGUoZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRyZXR1cm4gaGFuZGxlQ29tcGxldGVSZXF1ZXN0KGNvbnRleHQudHlwZSwgY29udGV4dClcblx0fSlcblx0c3RhcnREb3dubG9hZFByb3h5KCkub25SZXF1ZXN0Q29tcGxldGUoZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRyZXR1cm4gaGFuZGxlQ29tcGxldGVSZXF1ZXN0KGNvbnRleHQudHlwZSwgY29udGV4dClcblx0fSlcblxuXHRmdW5jdGlvbiBoYW5kbGVDb21wbGV0ZVJlcXVlc3QodHlwZSwgcmVxdWVzdCkge1xuXHRcdGlmIChcblx0XHRcdCFpc0ludGFrZVJlcXVlc3QocmVxdWVzdC51cmwsIGNvbmZpZ3VyYXRpb24pICYmXG5cdFx0XHQoaXNSZWplY3RlZChyZXF1ZXN0KSB8fCBpc1NlcnZlckVycm9yKHJlcXVlc3QpKVxuXHRcdCkge1xuXHRcdFx0ZXJyb3JPYnNlcnZhYmxlLm5vdGlmeSh7XG5cdFx0XHRcdG1lc3NhZ2U6IGZvcm1hdCh0eXBlKSArICdlcnJvcicgKyByZXF1ZXN0Lm1ldGhvZCArICcgJyArIHJlcXVlc3QudXJsLFxuXHRcdFx0XHRyZXNvdXJjZToge1xuXHRcdFx0XHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG5cdFx0XHRcdFx0c3RhdHVzQ29kZTogcmVxdWVzdC5zdGF0dXMsXG5cdFx0XHRcdFx0dXJsOiByZXF1ZXN0LnVybCxcblx0XHRcdFx0fSxcblx0XHRcdFx0dHlwZTogRXJyb3JTb3VyY2UuTkVUV09SSyxcblx0XHRcdFx0c291cmNlOiBFcnJvclNvdXJjZS5ORVRXT1JLLFxuXHRcdFx0XHRzdGFjazpcblx0XHRcdFx0XHR0cnVuY2F0ZVJlc3BvbnNlKHJlcXVlc3QucmVzcG9uc2UsIGNvbmZpZ3VyYXRpb24pIHx8ICdGYWlsZWQgdG8gbG9hZCcsXG5cdFx0XHRcdHN0YXJ0VGltZTogcmVxdWVzdC5zdGFydFRpbWUsXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RvcDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVzZXRYaHJQcm94eSgpXG5cdFx0XHRyZXNldERvd25sb2FkUHJveHkoKVxuXHRcdH0sXG5cdH1cbn1cbmZ1bmN0aW9uIGlzUmVqZWN0ZWQocmVxdWVzdCkge1xuXHRyZXR1cm4gcmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgcmVxdWVzdC5yZXNwb25zZVR5cGUgIT09ICdvcGFxdWUnXG59XG5cbmZ1bmN0aW9uIGlzU2VydmVyRXJyb3IocmVxdWVzdCkge1xuXHRyZXR1cm4gcmVxdWVzdC5zdGF0dXMgPj0gNTAwXG59XG5cbmZ1bmN0aW9uIHRydW5jYXRlUmVzcG9uc2UocmVzcG9uc2UsIGNvbmZpZ3VyYXRpb24pIHtcblx0aWYgKFxuXHRcdHJlc3BvbnNlICYmXG5cdFx0cmVzcG9uc2UubGVuZ3RoID4gY29uZmlndXJhdGlvbi5yZXF1ZXN0RXJyb3JSZXNwb25zZUxlbmd0aExpbWl0XG5cdCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHRyZXNwb25zZS5zdWJzdHJpbmcoMCwgY29uZmlndXJhdGlvbi5yZXF1ZXN0RXJyb3JSZXNwb25zZUxlbmd0aExpbWl0KSArXG5cdFx0XHQnLi4uJ1xuXHRcdClcblx0fVxuXHRyZXR1cm4gcmVzcG9uc2Vcbn1cblxuZnVuY3Rpb24gZm9ybWF0KHR5cGUpIHtcblx0aWYgKFJlcXVlc3RUeXBlLlhIUiA9PT0gdHlwZSkge1xuXHRcdHJldHVybiAnWEhSJ1xuXHR9XG5cdHJldHVybiBSZXF1ZXN0VHlwZS5ET1dOTE9BRFxufVxuIiwiZXhwb3J0IHZhciBFcnJvclNvdXJjZSA9IHtcblx0QUdFTlQ6ICdhZ2VudCcsXG5cdENPTlNPTEU6ICdjb25zb2xlJyxcblx0TkVUV09SSzogJ25ldHdvcmsnLFxuXHRTT1VSQ0U6ICdzb3VyY2UnLFxuXHRMT0dHRVI6ICdsb2dnZXInLFxufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFVua25vd25FcnJvcihzdGFja1RyYWNlLCBlcnJvck9iamVjdCwgbm9uRXJyb3JQcmVmaXgpIHtcblx0aWYgKFxuXHRcdCFzdGFja1RyYWNlIHx8XG5cdFx0KHN0YWNrVHJhY2UubWVzc2FnZSA9PT0gdW5kZWZpbmVkICYmICEoZXJyb3JPYmplY3QgaW5zdGFuY2VvZiBFcnJvcikpXG5cdCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRtZXNzYWdlOiBub25FcnJvclByZWZpeCArICcnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3JPYmplY3QpLFxuXHRcdFx0c3RhY2s6ICdObyBzdGFjaywgY29uc2lkZXIgdXNpbmcgYW4gaW5zdGFuY2Ugb2YgRXJyb3InLFxuXHRcdFx0dHlwZTogc3RhY2tUcmFjZSAmJiBzdGFja1RyYWNlLm5hbWUsXG5cdFx0fVxuXHR9XG5cdHJldHVybiB7XG5cdFx0bWVzc2FnZTogc3RhY2tUcmFjZS5tZXNzYWdlIHx8ICdFbXB0eSBtZXNzYWdlJyxcblx0XHRzdGFjazogdG9TdGFja1RyYWNlU3RyaW5nKHN0YWNrVHJhY2UpLFxuXHRcdHR5cGU6IHN0YWNrVHJhY2UubmFtZSxcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9TdGFja1RyYWNlU3RyaW5nKHN0YWNrKSB7XG5cdHZhciByZXN1bHQgPSBzdGFjay5uYW1lIHx8ICdFcnJvcicgKyAnOiAnICsgc3RhY2subWVzc2FnZVxuXHRzdGFjay5zdGFjay5mb3JFYWNoKGZ1bmN0aW9uIChmcmFtZSkge1xuXHRcdHZhciBmdW5jID0gZnJhbWUuZnVuYyA9PT0gJz8nID8gJzxhbm9ueW1vdXM+JyA6IGZyYW1lLmZ1bmNcblx0XHR2YXIgYXJncyA9XG5cdFx0XHRmcmFtZS5hcmdzICYmIGZyYW1lLmFyZ3MubGVuZ3RoID4gMFxuXHRcdFx0XHQ/ICcoJyArIGZyYW1lLmFyZ3Muam9pbignLCAnKSArICcpJ1xuXHRcdFx0XHQ6ICcnXG5cdFx0dmFyIGxpbmUgPSBmcmFtZS5saW5lID8gJzonICsgZnJhbWUubGluZSA6ICcnXG5cdFx0dmFyIGNvbHVtbiA9IGZyYW1lLmxpbmUgJiYgZnJhbWUuY29sdW1uID8gJzonICsgZnJhbWUuY29sdW1uIDogJydcblx0XHRyZXN1bHQgKz0gJ1xcbiAgYXQgJyArIGZ1bmMgKyBhcmdzICsgJyBAICcgKyBmcmFtZS51cmwgKyBsaW5lICsgY29sdW1uXG5cdH0pXG5cdHJldHVybiByZXN1bHRcbn1cbiIsImV4cG9ydCBjbGFzcyBMaWZlQ3ljbGUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNhbGxiYWNrcyA9IHt9XG5cdH1cblx0bm90aWZ5KGV2ZW50VHlwZSwgZGF0YSkge1xuXHRcdGNvbnN0IGV2ZW50Q2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3NbZXZlbnRUeXBlXVxuXHRcdGlmIChldmVudENhbGxiYWNrcykge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGRhdGEpKVxuXHRcdH1cblx0fVxuXHRzdWJzY3JpYmUoZXZlbnRUeXBlLCBjYWxsYmFjaykge1xuXHRcdGlmICghdGhpcy5jYWxsYmFja3NbZXZlbnRUeXBlXSkge1xuXHRcdFx0dGhpcy5jYWxsYmFja3NbZXZlbnRUeXBlXSA9IFtdXG5cdFx0fVxuXHRcdHRoaXMuY2FsbGJhY2tzW2V2ZW50VHlwZV0ucHVzaChjYWxsYmFjaylcblx0XHRyZXR1cm4ge1xuXHRcdFx0dW5zdWJzY3JpYmU6ICgpID0+IHtcblx0XHRcdFx0dGhpcy5jYWxsYmFja3NbZXZlbnRUeXBlXSA9IHRoaXMuY2FsbGJhY2tzW2V2ZW50VHlwZV0uZmlsdGVyKFxuXHRcdFx0XHRcdChvdGhlcikgPT4gY2FsbGJhY2sgIT09IG90aGVyLFxuXHRcdFx0XHQpXG5cdFx0XHR9LFxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgdmFyIExpZmVDeWNsZUV2ZW50VHlwZSA9IHtcblx0UEVSRk9STUFOQ0VfRU5UUllfQ09MTEVDVEVEOiAnUEVSRk9STUFOQ0VfRU5UUllfQ09MTEVDVEVEJyxcblx0QVVUT19BQ1RJT05fQ1JFQVRFRDogJ0FVVE9fQUNUSU9OX0NSRUFURUQnLFxuXHRBVVRPX0FDVElPTl9DT01QTEVURUQ6ICdBVVRPX0FDVElPTl9DT01QTEVURUQnLFxuXHRBVVRPX0FDVElPTl9ESVNDQVJERUQ6ICdBVVRPX0FDVElPTl9ESVNDQVJERUQnLFxuXHRBUFBfSElERTogJ0FQUF9ISURFJyxcblx0QVBQX1VQREFURTogJ0FQUF9VUERBVEUnLFxuXHRQQUdFX1NFVF9EQVRBX1VQREFURTogJ1BBR0VfU0VUX0RBVEFfVVBEQVRFJyxcblx0UEFHRV9BTElBU19BQ1RJT046ICdQQUdFX0FMSUFTX0FDVElPTicsXG5cdFZJRVdfQ1JFQVRFRDogJ1ZJRVdfQ1JFQVRFRCcsXG5cdFZJRVdfVVBEQVRFRDogJ1ZJRVdfVVBEQVRFRCcsXG5cdFZJRVdfRU5ERUQ6ICdWSUVXX0VOREVEJyxcblx0UkVRVUVTVF9TVEFSVEVEOiAnUkVRVUVTVF9TVEFSVEVEJyxcblx0UkVRVUVTVF9DT01QTEVURUQ6ICdSRVFVRVNUX0NPTVBMRVRFRCcsXG5cdFJBV19SVU1fRVZFTlRfQ09MTEVDVEVEOiAnUkFXX1JVTV9FVkVOVF9DT0xMRUNURUQnLFxuXHRSVU1fRVZFTlRfQ09MTEVDVEVEOiAnUlVNX0VWRU5UX0NPTExFQ1RFRCcsXG59XG4iLCJleHBvcnQgY2xhc3MgT2JzZXJ2YWJsZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMub2JzZXJ2ZXJzID0gW11cblx0fVxuXHRzdWJzY3JpYmUoZikge1xuXHRcdHRoaXMub2JzZXJ2ZXJzLnB1c2goZilcblx0fVxuXHRub3RpZnkoZGF0YSkge1xuXHRcdHRoaXMub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7XG5cdFx0XHRvYnNlcnZlcihkYXRhKVxuXHRcdH0pXG5cdH1cbn1cbiIsImltcG9ydCB7IGRlZXBNaXhPYmplY3QgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5cbmZ1bmN0aW9uIGdldFNESygpIHtcblx0dmFyIHNkayA9IG51bGwsXG5cdFx0dHJhY2tlciA9ICcnXG5cdHRyeSB7XG5cdFx0aWYgKHVuaSAmJiB0eXBlb2YgdW5pID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdW5pLnJlcXVlc3QgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHNkayA9IHVuaVxuXHRcdH1cblxuXHRcdGlmICh3eCAmJiB0eXBlb2Ygd3ggPT09ICdvYmplY3QnICYmIHR5cGVvZiB3eC5yZXF1ZXN0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvLyDlvq7kv6Fcblx0XHRcdHRyYWNrZXIgPSB3eFxuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRteSAmJlxuXHRcdFx0dHlwZW9mIG15ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIG15LnJlcXVlc3QgPT09ICdmdW5jdGlvbidcblx0XHQpIHtcblx0XHRcdC8vIOaUr+S7mOWunVxuXHRcdFx0dHJhY2tlciA9IG15XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdHR0ICYmXG5cdFx0XHR0eXBlb2YgdHQgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgdHQucmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCkge1xuXHRcdFx0Ly8g5aS05p2hXG5cdFx0XHR0cmFja2VyID0gdHRcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0ZGQgJiZcblx0XHRcdHR5cGVvZiBkZCA9PT0gJ29iamVjdCcgJiZcblx0XHRcdHR5cGVvZiBkZC5yZXF1ZXN0ID09PSAnZnVuY3Rpb24nXG5cdFx0KSB7XG5cdFx0XHQvLyBkaW5nZGluZ1xuXHRcdFx0dHJhY2tlciA9IGRkXG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdHFxICYmXG5cdFx0XHR0eXBlb2YgcXEgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgcXEucmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCkge1xuXHRcdFx0Ly8gUVEg5bCP56iL5bqP44CBUVEg5bCP5ri45oiPXG5cdFx0XHR0cmFja2VyID0gcXFcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0c3dhbiAmJlxuXHRcdFx0dHlwZW9mIHN3YW4gPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2Ygc3dhbi5yZXF1ZXN0ID09PSAnZnVuY3Rpb24nXG5cdFx0KSB7XG5cdFx0XHQvLyDnmb7luqblsI/nqIvluo9cblx0XHRcdHRyYWNrZXIgPSBzd2FuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRyYWNrZXIgPSB1bmlcblx0XHR9XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGNvbnNvbGUud2FybigndW5zdXBwb3J0IHBsYXRmb3JtLCBGYWlsIHRvIHN0YXJ0Jylcblx0fVxuXHRjb25zb2xlLmxvZygnLS0tLS0tZ2V0IFNESy0tLS0tLS0nKVxuXHRyZXR1cm4geyBzZGssIHRyYWNrZXIgfVxufVxuY29uc3QgaW5zdGFuY2UgPSBnZXRTREsoKVxuXG5leHBvcnQgY29uc3Qgc2RrID0gaW5zdGFuY2Uuc2RrXG5leHBvcnQgY29uc3QgdHJhY2tlciA9IGluc3RhbmNlLnRyYWNrZXJcbiIsImltcG9ydCB7XG5cdGZpbmRCeVBhdGgsXG5cdGVzY2FwZVJvd0RhdGEsXG5cdGlzTnVtYmVyLFxuXHRlYWNoLFxuXHRpc1N0cmluZyxcblx0dmFsdWVzLFxuXHRleHRlbmQsXG59IGZyb20gJy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IHNkayB9IGZyb20gJy4uL2NvcmUvc2RrJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29yZS9saWZlQ3ljbGUnXG5pbXBvcnQgeyBjb21tb25UYWdzLCBkYXRhTWFwIH0gZnJvbSAnLi9kYXRhTWFwJ1xuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVVRGLThcbnZhciBIQVNfTVVMVElfQllURVNfQ0hBUkFDVEVSUyA9IC9bXlxcdTAwMDAtXFx1MDA3Rl0vXG5mdW5jdGlvbiBhZGRCYXRjaFByZWNpc2lvbih1cmwpIHtcblx0aWYgKCF1cmwpIHJldHVybiB1cmxcblx0cmV0dXJuIHVybCArICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyAncHJlY2lzaW9uPW1zJ1xufVxudmFyIGh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24gKGVuZHBvaW50VXJsLCBieXRlc0xpbWl0KSB7XG5cdHRoaXMuZW5kcG9pbnRVcmwgPSBlbmRwb2ludFVybFxuXHR0aGlzLmJ5dGVzTGltaXQgPSBieXRlc0xpbWl0XG59XG5odHRwUmVxdWVzdC5wcm90b3R5cGUgPSB7XG5cdHNlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0dmFyIHVybCA9IGFkZEJhdGNoUHJlY2lzaW9uKHRoaXMuZW5kcG9pbnRVcmwpXG5cdFx0c2RrLnJlcXVlc3Qoe1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXI6IHtcblx0XHRcdFx0J2NvbnRlbnQtdHlwZSc6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnLFxuXHRcdFx0fSxcblx0XHRcdHVybCxcblx0XHRcdGRhdGEsXG5cdFx0fSlcblx0fSxcbn1cblxuZXhwb3J0IHZhciBIdHRwUmVxdWVzdCA9IGh0dHBSZXF1ZXN0XG5cbmZ1bmN0aW9uIGJhdGNoKFxuXHRyZXF1ZXN0LFxuXHRtYXhTaXplLFxuXHRieXRlc0xpbWl0LFxuXHRtYXhNZXNzYWdlU2l6ZSxcblx0Zmx1c2hUaW1lb3V0LFxuXHRsaWZlQ3ljbGUsXG4pIHtcblx0dGhpcy5yZXF1ZXN0ID0gcmVxdWVzdFxuXHR0aGlzLm1heFNpemUgPSBtYXhTaXplXG5cdHRoaXMuYnl0ZXNMaW1pdCA9IGJ5dGVzTGltaXRcblx0dGhpcy5tYXhNZXNzYWdlU2l6ZSA9IG1heE1lc3NhZ2VTaXplXG5cdHRoaXMuZmx1c2hUaW1lb3V0ID0gZmx1c2hUaW1lb3V0XG5cdHRoaXMubGlmZUN5Y2xlID0gbGlmZUN5Y2xlXG5cdHRoaXMucHVzaE9ubHlCdWZmZXIgPSBbXVxuXHR0aGlzLnVwc2VydEJ1ZmZlciA9IHt9XG5cdHRoaXMuYnVmZmVyQnl0ZXNTaXplID0gMFxuXHR0aGlzLmJ1ZmZlck1lc3NhZ2VDb3VudCA9IDBcblx0dGhpcy5mbHVzaE9uVmlzaWJpbGl0eUhpZGRlbigpXG5cdHRoaXMuZmx1c2hQZXJpb2RpY2FsbHkoKVxufVxuYmF0Y2gucHJvdG90eXBlID0ge1xuXHRhZGQ6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0dGhpcy5hZGRPclVwZGF0ZShtZXNzYWdlKVxuXHR9LFxuXG5cdHVwc2VydDogZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHRcdHRoaXMuYWRkT3JVcGRhdGUobWVzc2FnZSwga2V5KVxuXHR9LFxuXG5cdGZsdXNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuYnVmZmVyTWVzc2FnZUNvdW50ICE9PSAwKSB7XG5cdFx0XHR2YXIgbWVzc2FnZXMgPSB0aGlzLnB1c2hPbmx5QnVmZmVyLmNvbmNhdCh2YWx1ZXModGhpcy51cHNlcnRCdWZmZXIpKVxuXHRcdFx0dGhpcy5yZXF1ZXN0LnNlbmQobWVzc2FnZXMuam9pbignXFxuJyksIHRoaXMuYnVmZmVyQnl0ZXNTaXplKVxuXHRcdFx0dGhpcy5wdXNoT25seUJ1ZmZlciA9IFtdXG5cdFx0XHR0aGlzLnVwc2VydEJ1ZmZlciA9IHt9XG5cdFx0XHR0aGlzLmJ1ZmZlckJ5dGVzU2l6ZSA9IDBcblx0XHRcdHRoaXMuYnVmZmVyTWVzc2FnZUNvdW50ID0gMFxuXHRcdH1cblx0fSxcblxuXHRwcm9jZXNzU2VuZERhdGE6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0Ly8gdmFyIGRhdGEgPSBzYWZlSlNPTlBhcnNlKG1lc3NhZ2UpXG5cdFx0aWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLnR5cGUpIHJldHVybiAnJ1xuXHRcdHZhciByb3dTdHIgPSAnJ1xuXHRcdHZhciBoYXNGaWxlZHMgPSBmYWxzZVxuXHRcdGVhY2goZGF0YU1hcCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblx0XHRcdGlmICh2YWx1ZS50eXBlID09PSBtZXNzYWdlLnR5cGUpIHtcblx0XHRcdFx0Ly8g5YGa5LiA5LiL5Yir5ZCN5aSE55CGXG5cdFx0XHRcdGlmICh2YWx1ZS5hbGlhc19rZXkpIHtcblx0XHRcdFx0XHRyb3dTdHIgKz0gdmFsdWUuYWxpYXNfa2V5ICsgJywnXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm93U3RyICs9IGtleSArICcsJ1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHRhZ3NTdHIgPSBbXVxuXHRcdFx0XHR2YXIgdGFncyA9IGV4dGVuZCh7fSwgY29tbW9uVGFncywgdmFsdWUudGFncylcblx0XHRcdFx0ZWFjaCh0YWdzLCBmdW5jdGlvbiAodmFsdWVfcGF0aCwgX2tleSkge1xuXHRcdFx0XHRcdHZhciBfdmFsdWUgPSBmaW5kQnlQYXRoKG1lc3NhZ2UsIHZhbHVlX3BhdGgpXG5cdFx0XHRcdFx0aWYgKF92YWx1ZSB8fCBpc051bWJlcihfdmFsdWUpKSB7XG5cdFx0XHRcdFx0XHR0YWdzU3RyLnB1c2goZXNjYXBlUm93RGF0YShfa2V5KSArICc9JyArIGVzY2FwZVJvd0RhdGEoX3ZhbHVlKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdGlmIChtZXNzYWdlLnRhZ3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Ly8g6Ieq5a6a5LmJdGFnXG5cdFx0XHRcdFx0ZWFjaChtZXNzYWdlLnRhZ3MsIGZ1bmN0aW9uIChfdmFsdWUsIF9rZXkpIHtcblx0XHRcdFx0XHRcdGlmIChfdmFsdWUgfHwgaXNOdW1iZXIoX3ZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHR0YWdzU3RyLnB1c2goZXNjYXBlUm93RGF0YShfa2V5KSArICc9JyArIGVzY2FwZVJvd0RhdGEoX3ZhbHVlKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBmaWVsZHNTdHIgPSBbXVxuXHRcdFx0XHRlYWNoKHZhbHVlLmZpZWxkcywgZnVuY3Rpb24gKF92YWx1ZSwgX2tleSkge1xuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KF92YWx1ZSkgJiYgX3ZhbHVlLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdFx0dmFyIHR5cGUgPSBfdmFsdWVbMF0sXG5cdFx0XHRcdFx0XHRcdHZhbHVlX3BhdGggPSBfdmFsdWVbMV1cblx0XHRcdFx0XHRcdHZhciBfdmFsdWVEYXRhID0gZmluZEJ5UGF0aChtZXNzYWdlLCB2YWx1ZV9wYXRoKVxuXHRcdFx0XHRcdFx0aWYgKF92YWx1ZURhdGEgfHwgaXNOdW1iZXIoX3ZhbHVlRGF0YSkpIHtcblx0XHRcdFx0XHRcdFx0X3ZhbHVlRGF0YSA9XG5cdFx0XHRcdFx0XHRcdFx0dHlwZSA9PT0gJ3N0cmluZydcblx0XHRcdFx0XHRcdFx0XHRcdD8gJ1wiJyArXG5cdFx0XHRcdFx0XHRcdFx0XHQgIFN0cmluZyhfdmFsdWVEYXRhKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9bXFxcXF0qXCIvZywgJ1wiJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICtcblx0XHRcdFx0XHRcdFx0XHRcdCAgJ1wiJ1xuXHRcdFx0XHRcdFx0XHRcdFx0OiBlc2NhcGVSb3dEYXRhKF92YWx1ZURhdGEpXG5cdFx0XHRcdFx0XHRcdGZpZWxkc1N0ci5wdXNoKGVzY2FwZVJvd0RhdGEoX2tleSkgKyAnPScgKyBfdmFsdWVEYXRhKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaXNTdHJpbmcoX3ZhbHVlKSkge1xuXHRcdFx0XHRcdFx0dmFyIF92YWx1ZURhdGEgPSBmaW5kQnlQYXRoKG1lc3NhZ2UsIF92YWx1ZSlcblx0XHRcdFx0XHRcdGlmIChfdmFsdWVEYXRhIHx8IGlzTnVtYmVyKF92YWx1ZURhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdF92YWx1ZURhdGEgPSBlc2NhcGVSb3dEYXRhKF92YWx1ZURhdGEpXG5cdFx0XHRcdFx0XHRcdGZpZWxkc1N0ci5wdXNoKGVzY2FwZVJvd0RhdGEoX2tleSkgKyAnPScgKyBfdmFsdWVEYXRhKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0aWYgKHRhZ3NTdHIubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cm93U3RyICs9IHRhZ3NTdHIuam9pbignLCcpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGZpZWxkc1N0ci5sZW5ndGgpIHtcblx0XHRcdFx0XHRyb3dTdHIgKz0gJyAnXG5cdFx0XHRcdFx0cm93U3RyICs9IGZpZWxkc1N0ci5qb2luKCcsJylcblx0XHRcdFx0XHRoYXNGaWxlZHMgPSB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdFx0cm93U3RyID0gcm93U3RyICsgJyAnICsgbWVzc2FnZS5kYXRlXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRyZXR1cm4gaGFzRmlsZWRzID8gcm93U3RyIDogJydcblx0fSxcblx0c2l6ZUluQnl0ZXM6IGZ1bmN0aW9uIChjYW5kaWRhdGUpIHtcblx0XHQvLyBBY2N1cmF0ZSBieXRlIHNpemUgY29tcHV0YXRpb25zIGNhbiBkZWdyYWRlIHBlcmZvcm1hbmNlcyB3aGVuIHRoZXJlIGlzIGEgbG90IG9mIGV2ZW50cyB0byBwcm9jZXNzXG5cdFx0aWYgKCFIQVNfTVVMVElfQllURVNfQ0hBUkFDVEVSUy50ZXN0KGNhbmRpZGF0ZSkpIHtcblx0XHRcdHJldHVybiBjYW5kaWRhdGUubGVuZ3RoXG5cdFx0fVxuXHRcdHZhciB0b3RhbCA9IDAsXG5cdFx0XHRjaGFyQ29kZVxuXHRcdC8vIHV0Zi0457yW56CBXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbmRpZGF0ZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0Y2hhckNvZGUgPSBjYW5kaWRhdGUuY2hhckNvZGVBdChpKVxuXHRcdFx0aWYgKGNoYXJDb2RlIDw9IDB4MDA3Zikge1xuXHRcdFx0XHR0b3RhbCArPSAxXG5cdFx0XHR9IGVsc2UgaWYgKGNoYXJDb2RlIDw9IDB4MDdmZikge1xuXHRcdFx0XHR0b3RhbCArPSAyXG5cdFx0XHR9IGVsc2UgaWYgKGNoYXJDb2RlIDw9IDB4ZmZmZikge1xuXHRcdFx0XHR0b3RhbCArPSAzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0b3RhbCArPSA0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0b3RhbFxuXHR9LFxuXG5cdGFkZE9yVXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZSwga2V5KSB7XG5cdFx0dmFyIHByb2Nlc3MgPSB0aGlzLnByb2Nlc3MobWVzc2FnZSlcblx0XHRpZiAoIXByb2Nlc3MucHJvY2Vzc2VkTWVzc2FnZSB8fCBwcm9jZXNzLnByb2Nlc3NlZE1lc3NhZ2UgPT09ICcnKSByZXR1cm5cblx0XHRpZiAocHJvY2Vzcy5tZXNzYWdlQnl0ZXNTaXplID49IHRoaXMubWF4TWVzc2FnZVNpemUpIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0J0Rpc2NhcmRlZCBhIG1lc3NhZ2Ugd2hvc2Ugc2l6ZSB3YXMgYmlnZ2VyIHRoYW4gdGhlIG1heGltdW0gYWxsb3dlZCBzaXplJyArXG5cdFx0XHRcdFx0dGhpcy5tYXhNZXNzYWdlU2l6ZSArXG5cdFx0XHRcdFx0J0tCLicsXG5cdFx0XHQpXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0aWYgKHRoaXMuaGFzTWVzc2FnZUZvcihrZXkpKSB7XG5cdFx0XHR0aGlzLnJlbW92ZShrZXkpXG5cdFx0fVxuXHRcdGlmICh0aGlzLndpbGxSZWFjaGVkQnl0ZXNMaW1pdFdpdGgocHJvY2Vzcy5tZXNzYWdlQnl0ZXNTaXplKSkge1xuXHRcdFx0dGhpcy5mbHVzaCgpXG5cdFx0fVxuXHRcdHRoaXMucHVzaChwcm9jZXNzLnByb2Nlc3NlZE1lc3NhZ2UsIHByb2Nlc3MubWVzc2FnZUJ5dGVzU2l6ZSwga2V5KVxuXHRcdGlmICh0aGlzLmlzRnVsbCgpKSB7XG5cdFx0XHR0aGlzLmZsdXNoKClcblx0XHR9XG5cdH0sXG5cdHByb2Nlc3M6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0dmFyIHByb2Nlc3NlZE1lc3NhZ2UgPSB0aGlzLnByb2Nlc3NTZW5kRGF0YShtZXNzYWdlKVxuXHRcdHZhciBtZXNzYWdlQnl0ZXNTaXplID0gdGhpcy5zaXplSW5CeXRlcyhwcm9jZXNzZWRNZXNzYWdlKVxuXHRcdHJldHVybiB7XG5cdFx0XHRwcm9jZXNzZWRNZXNzYWdlOiBwcm9jZXNzZWRNZXNzYWdlLFxuXHRcdFx0bWVzc2FnZUJ5dGVzU2l6ZTogbWVzc2FnZUJ5dGVzU2l6ZSxcblx0XHR9XG5cdH0sXG5cblx0cHVzaDogZnVuY3Rpb24gKHByb2Nlc3NlZE1lc3NhZ2UsIG1lc3NhZ2VCeXRlc1NpemUsIGtleSkge1xuXHRcdGlmICh0aGlzLmJ1ZmZlck1lc3NhZ2VDb3VudCA+IDApIHtcblx0XHRcdC8vIFxcbiBzZXBhcmF0b3IgYXQgc2VyaWFsaXphdGlvblxuXHRcdFx0dGhpcy5idWZmZXJCeXRlc1NpemUgKz0gMVxuXHRcdH1cblx0XHRpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudXBzZXJ0QnVmZmVyW2tleV0gPSBwcm9jZXNzZWRNZXNzYWdlXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucHVzaE9ubHlCdWZmZXIucHVzaChwcm9jZXNzZWRNZXNzYWdlKVxuXHRcdH1cblx0XHR0aGlzLmJ1ZmZlckJ5dGVzU2l6ZSArPSBtZXNzYWdlQnl0ZXNTaXplXG5cdFx0dGhpcy5idWZmZXJNZXNzYWdlQ291bnQgKz0gMVxuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciByZW1vdmVkTWVzc2FnZSA9IHRoaXMudXBzZXJ0QnVmZmVyW2tleV1cblx0XHRkZWxldGUgdGhpcy51cHNlcnRCdWZmZXJba2V5XVxuXHRcdHZhciBtZXNzYWdlQnl0ZXNTaXplID0gdGhpcy5zaXplSW5CeXRlcyhyZW1vdmVkTWVzc2FnZSlcblx0XHR0aGlzLmJ1ZmZlckJ5dGVzU2l6ZSAtPSBtZXNzYWdlQnl0ZXNTaXplXG5cdFx0dGhpcy5idWZmZXJNZXNzYWdlQ291bnQgLT0gMVxuXHRcdGlmICh0aGlzLmJ1ZmZlck1lc3NhZ2VDb3VudCA+IDApIHtcblx0XHRcdHRoaXMuYnVmZmVyQnl0ZXNTaXplIC09IDFcblx0XHR9XG5cdH0sXG5cblx0aGFzTWVzc2FnZUZvcjogZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiBrZXkgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnVwc2VydEJ1ZmZlcltrZXldICE9PSB1bmRlZmluZWRcblx0fSxcblxuXHR3aWxsUmVhY2hlZEJ5dGVzTGltaXRXaXRoOiBmdW5jdGlvbiAobWVzc2FnZUJ5dGVzU2l6ZSkge1xuXHRcdC8vIGJ5dGUgb2YgdGhlIHNlcGFyYXRvciBhdCB0aGUgZW5kIG9mIHRoZSBtZXNzYWdlXG5cdFx0cmV0dXJuIHRoaXMuYnVmZmVyQnl0ZXNTaXplICsgbWVzc2FnZUJ5dGVzU2l6ZSArIDEgPj0gdGhpcy5ieXRlc0xpbWl0XG5cdH0sXG5cblx0aXNGdWxsOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuYnVmZmVyTWVzc2FnZUNvdW50ID09PSB0aGlzLm1heFNpemUgfHxcblx0XHRcdHRoaXMuYnVmZmVyQnl0ZXNTaXplID49IHRoaXMuYnl0ZXNMaW1pdFxuXHRcdClcblx0fSxcblxuXHRmbHVzaFBlcmlvZGljYWxseTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXNcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdF90aGlzLmZsdXNoKClcblx0XHRcdF90aGlzLmZsdXNoUGVyaW9kaWNhbGx5KClcblx0XHR9LCBfdGhpcy5mbHVzaFRpbWVvdXQpXG5cdH0sXG5cblx0Zmx1c2hPblZpc2liaWxpdHlIaWRkZW46IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzXG5cdFx0LyoqXG5cdFx0ICogV2l0aCBzZW5kQmVhY29uLCByZXF1ZXN0cyBhcmUgZ3VhcmFudGVlZCB0byBiZSBzdWNjZXNzZnVsbHkgc2VudCBkdXJpbmcgZG9jdW1lbnQgdW5sb2FkXG5cdFx0ICovXG5cdFx0Ly8gQHRzLWlnbm9yZSB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBhbHdheXMgZGVmaW5lZFxuXHRcdHRoaXMubGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuQVBQX0hJREUsIGZ1bmN0aW9uICgpIHtcblx0XHRcdF90aGlzLmZsdXNoKClcblx0XHR9KVxuXHR9LFxufVxuXG5leHBvcnQgdmFyIEJhdGNoID0gYmF0Y2hcbiIsImltcG9ydCB7IHNkayB9IGZyb20gJy4vc2RrJ1xuaW1wb3J0IHsgbm93IH0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgUmVxdWVzdFR5cGUgfSBmcm9tICcuLi9oZWxwZXIvZW51bXMnXG52YXIgeGhyUHJveHlTaW5nbGV0b25cbnZhciBiZWZvcmVTZW5kQ2FsbGJhY2tzID0gW11cbnZhciBvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcyA9IFtdXG52YXIgb3JpZ2luYWxYaHJSZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gc3RhcnRYaHJQcm94eSgpIHtcblx0aWYgKCF4aHJQcm94eVNpbmdsZXRvbikge1xuXHRcdHByb3h5WGhyKClcblx0XHR4aHJQcm94eVNpbmdsZXRvbiA9IHtcblx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHRiZWZvcmVTZW5kQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spXG5cdFx0XHR9LFxuXHRcdFx0b25SZXF1ZXN0Q29tcGxldGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHRvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuXHRcdFx0fSxcblx0XHR9XG5cdH1cblx0cmV0dXJuIHhoclByb3h5U2luZ2xldG9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldFhoclByb3h5KCkge1xuXHRpZiAoeGhyUHJveHlTaW5nbGV0b24pIHtcblx0XHR4aHJQcm94eVNpbmdsZXRvbiA9IHVuZGVmaW5lZFxuXHRcdGJlZm9yZVNlbmRDYWxsYmFja3Muc3BsaWNlKDAsIGJlZm9yZVNlbmRDYWxsYmFja3MubGVuZ3RoKVxuXHRcdG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzLnNwbGljZSgwLCBvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcy5sZW5ndGgpXG5cdFx0c2RrLnJlcXVlc3QgPSBvcmlnaW5hbFhoclJlcXVlc3Rcblx0fVxufVxuXG5mdW5jdGlvbiBwcm94eVhocigpIHtcblx0b3JpZ2luYWxYaHJSZXF1ZXN0ID0gc2RrLnJlcXVlc3Rcblx0c2RrLnJlcXVlc3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpc1xuXHRcdHZhciBkYXRhZmx1eF94aHIgPSB7XG5cdFx0XHRtZXRob2Q6IGFyZ3VtZW50c1swXS5tZXRob2QgfHwgJ0dFVCcsXG5cdFx0XHRzdGFydFRpbWU6IDAsXG5cdFx0XHR1cmw6IGFyZ3VtZW50c1swXS51cmwsXG5cdFx0XHR0eXBlOiBSZXF1ZXN0VHlwZS5YSFIsXG5cdFx0XHRyZXNwb25zZVR5cGU6IGFyZ3VtZW50c1swXS5yZXNwb25zZVR5cGUgfHwgJ3RleHQnLFxuXHRcdH1cblx0XHRkYXRhZmx1eF94aHIuc3RhcnRUaW1lID0gbm93KClcblxuXHRcdHZhciBvcmlnaW5hbFN1Y2Nlc3MgPSBhcmd1bWVudHNbMF0uc3VjY2Vzc1xuXG5cdFx0YXJndW1lbnRzWzBdLnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXBvcnRYaHIoYXJndW1lbnRzWzBdKVxuXG5cdFx0XHRpZiAob3JpZ2luYWxTdWNjZXNzKSB7XG5cdFx0XHRcdG9yaWdpbmFsU3VjY2Vzcy5hcHBseShfdGhpcywgYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgb3JpZ2luYWxGYWlsID0gYXJndW1lbnRzWzBdLmZhaWxcblx0XHRhcmd1bWVudHNbMF0uZmFpbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlcG9ydFhocihhcmd1bWVudHNbMF0pXG5cdFx0XHRpZiAob3JpZ2luYWxGYWlsKSB7XG5cdFx0XHRcdG9yaWdpbmFsRmFpbC5hcHBseShfdGhpcywgYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgaGFzQmVlblJlcG9ydGVkID0gZmFsc2Vcblx0XHR2YXIgcmVwb3J0WGhyID0gZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0aWYgKGhhc0JlZW5SZXBvcnRlZCkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdGhhc0JlZW5SZXBvcnRlZCA9IHRydWVcblx0XHRcdGRhdGFmbHV4X3hoci5kdXJhdGlvbiA9IG5vdygpIC0gZGF0YWZsdXhfeGhyLnN0YXJ0VGltZVxuXHRcdFx0ZGF0YWZsdXhfeGhyLnJlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkocmVzLmRhdGEpXG5cdFx0XHRkYXRhZmx1eF94aHIuaGVhZGVyID0gcmVzLmhlYWRlciB8fCB7fVxuXHRcdFx0ZGF0YWZsdXhfeGhyLnByb2ZpbGUgPSByZXMucHJvZmlsZVxuXHRcdFx0ZGF0YWZsdXhfeGhyLnN0YXR1cyA9IHJlcy5zdGF0dXNDb2RlIHx8IHJlcy5zdGF0dXMgfHwgMFxuXHRcdFx0b25SZXF1ZXN0Q29tcGxldGVDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0Y2FsbGJhY2soZGF0YWZsdXhfeGhyKVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0YmVmb3JlU2VuZENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0Y2FsbGJhY2soZGF0YWZsdXhfeGhyKVxuXHRcdH0pXG5cdFx0cmV0dXJuIG9yaWdpbmFsWGhyUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdH1cbn1cbiIsImV4cG9ydCBjb25zdCBPTkVfU0VDT05EID0gMTAwMFxuZXhwb3J0IGNvbnN0IE9ORV9NSU5VVEUgPSA2MCAqIE9ORV9TRUNPTkRcbmV4cG9ydCBjb25zdCBPTkVfSE9VUiA9IDYwICogT05FX01JTlVURVxuZXhwb3J0IGNvbnN0IE9ORV9LSUxPX0JZVEUgPSAxMDI0XG5leHBvcnQgY29uc3QgQ0xJRU5UX0lEX1RPS0VOID0gJ2RhdGFmbHV4UnVtOmNsaWVudDppZCdcbmV4cG9ydCBjb25zdCBSdW1FdmVudFR5cGUgPSB7XG5cdEFDVElPTjogJ2FjdGlvbicsXG5cdEVSUk9SOiAnZXJyb3InLFxuXHRMT05HX1RBU0s6ICdsb25nX3Rhc2snLFxuXHRWSUVXOiAndmlldycsXG5cdFJFU09VUkNFOiAncmVzb3VyY2UnLFxuXHRBUFA6ICdhcHAnLFxuXHRBQ1RJT046ICdhY3Rpb24nLFxufVxuXG5leHBvcnQgdmFyIFJlcXVlc3RUeXBlID0ge1xuXHRYSFI6ICduZXR3b3JrJyxcblx0RE9XTkxPQUQ6ICdyZXNvdXJjZScsXG59XG5cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZSA9IHtcblx0dGFwOiAndGFwJyxcblx0bG9uZ3ByZXNzOiAnbG9uZ3ByZXNzJyxcblx0bG9uZ3RhcDogJ2xvbmd0YXAnLFxufVxuZXhwb3J0IHZhciBNcEhvb2sgPSB7XG5cdGRhdGE6IDEsXG5cdG9uTG9hZDogMSxcblx0b25TaG93OiAxLFxuXHRvblJlYWR5OiAxLFxuXHRyZW5kZXI6IDEsXG5cdG9uUHVsbERvd25SZWZyZXNoOiAxLFxuXHRvblJlYWNoQm90dG9tOiAxLFxuXHRvblBhZ2VTY3JvbGw6IDEsXG5cdG9uUmVzaXplOiAxLFxuXHRvbkhpZGU6IDEsXG5cdG9uVW5sb2FkOiAxLFxufVxuIiwiaW1wb3J0IHsgc2RrIH0gZnJvbSAnLi4vY29yZS9zZGsnXG5cbmNvbnN0IFVOS05PV05fRlVOQ1RJT04gPSAnPydcbmZ1bmN0aW9uIGhhcyhvYmplY3QsIGtleSkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KVxufVxuZnVuY3Rpb24gaXNVbmRlZmluZWQod2hhdCkge1xuXHRyZXR1cm4gdHlwZW9mIHdoYXQgPT09ICd1bmRlZmluZWQnXG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcChmdW5jKSB7XG5cdHZhciBfdGhpcyA9IHRoaXNcblx0ZnVuY3Rpb24gd3JhcHBlZCgpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGZ1bmMuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cylcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXBvcnQoZSlcblx0XHRcdHRocm93IGVcblx0XHR9XG5cdH1cblx0cmV0dXJuIHdyYXBwZWRcbn1cbi8qKlxuICogQ3Jvc3MtYnJvd3NlciBwcm9jZXNzaW5nIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zXG4gKlxuICogU3ludGF4OlxuICogYGBganNcbiAqICAgcmVwb3J0LnN1YnNjcmliZShmdW5jdGlvbihzdGFja0luZm8pIHsgLi4uIH0pXG4gKiAgIHJlcG9ydC51bnN1YnNjcmliZShmdW5jdGlvbihzdGFja0luZm8pIHsgLi4uIH0pXG4gKiAgIHJlcG9ydChleGNlcHRpb24pXG4gKiAgIHRyeSB7IC4uLmNvZGUuLi4gfSBjYXRjaChleCkgeyByZXBvcnQoZXgpOyB9XG4gKiBgYGBcbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzLCBwbHVzIGNvbHVtbiBudW1iZXJcbiAqICAgICBvbiB0b3AgZnJhbWU7IGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBPcGVyYTogZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzXG4gKiAgIC0gQ2hyb21lOiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6IGxpbmUgYW5kIGNvbHVtbiBudW1iZXIgZm9yIHRoZSB0b3AgZnJhbWUgb25seTsgc29tZSBmcmFtZXNcbiAqICAgICBtYXkgYmUgbWlzc2luZywgYW5kIGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBJRTogbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcCBmcmFtZSBvbmx5OyBzb21lIGZyYW1lc1xuICogICAgIG1heSBiZSBtaXNzaW5nLCBhbmQgY29sdW1uIG51bWJlciBpcyBub3QgZ3VhcmFudGVlZFxuICpcbiAqIEluIHRoZW9yeSwgVHJhY2VLaXQgc2hvdWxkIHdvcmsgb24gYWxsIG9mIHRoZSBmb2xsb3dpbmcgdmVyc2lvbnM6XG4gKiAgIC0gSUU1LjUrIChvbmx5IDguMCB0ZXN0ZWQpXG4gKiAgIC0gRmlyZWZveCAwLjkrIChvbmx5IDMuNSsgdGVzdGVkKVxuICogICAtIE9wZXJhIDcrIChvbmx5IDEwLjUwIHRlc3RlZDsgdmVyc2lvbnMgOSBhbmQgZWFybGllciBtYXkgcmVxdWlyZVxuICogICAgIEV4Y2VwdGlvbnMgSGF2ZSBTdGFja3RyYWNlIHRvIGJlIGVuYWJsZWQgaW4gb3BlcmE6Y29uZmlnKVxuICogICAtIFNhZmFyaSAzKyAob25seSA0KyB0ZXN0ZWQpXG4gKiAgIC0gQ2hyb21lIDErIChvbmx5IDUrIHRlc3RlZClcbiAqICAgLSBLb25xdWVyb3IgMy41KyAodW50ZXN0ZWQpXG4gKlxuICogUmVxdWlyZXMgY29tcHV0ZVN0YWNrVHJhY2UuXG4gKlxuICogVHJpZXMgdG8gY2F0Y2ggYWxsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFuZCByZXBvcnQgdGhlbSB0byB0aGVcbiAqIHN1YnNjcmliZWQgaGFuZGxlcnMuIFBsZWFzZSBub3RlIHRoYXQgcmVwb3J0IHdpbGwgcmV0aHJvdyB0aGVcbiAqIGV4Y2VwdGlvbi4gVGhpcyBpcyBSRVFVSVJFRCBpbiBvcmRlciB0byBnZXQgYSB1c2VmdWwgc3RhY2sgdHJhY2UgaW4gSUUuXG4gKiBJZiB0aGUgZXhjZXB0aW9uIGRvZXMgbm90IHJlYWNoIHRoZSB0b3Agb2YgdGhlIGJyb3dzZXIsIHlvdSB3aWxsIG9ubHlcbiAqIGdldCBhIHN0YWNrIHRyYWNlIGZyb20gdGhlIHBvaW50IHdoZXJlIHJlcG9ydCB3YXMgY2FsbGVkLlxuICpcbiAqIEhhbmRsZXJzIHJlY2VpdmUgYSBTdGFja1RyYWNlIG9iamVjdCBhcyBkZXNjcmliZWQgaW4gdGhlXG4gKiBjb21wdXRlU3RhY2tUcmFjZSBkb2NzLlxuICpcbiAqIEBtZW1iZXJvZiBUcmFjZUtpdFxuICogQG5hbWVzcGFjZVxuICovXG5leHBvcnQgdmFyIHJlcG9ydCA9IChmdW5jdGlvbiByZXBvcnRNb2R1bGVXcmFwcGVyKCkge1xuXHR2YXIgaGFuZGxlcnMgPSBbXVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBjcmFzaCBoYW5kbGVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG5cdCAqIEBtZW1iZXJvZiByZXBvcnRcblx0ICovXG5cdGZ1bmN0aW9uIHN1YnNjcmliZShoYW5kbGVyKSB7XG5cdFx0aW5zdGFsbEdsb2JhbEhhbmRsZXIoKVxuXHRcdGluc3RhbGxHbG9iYWxVbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKClcblx0XHRpbnN0YWxsR2xvYmFsT25QYWdlTm90Rm91bmRIYW5kbGVyKClcblx0XHRpbnN0YWxsR2xvYmFsT25NZW1vcnlXYXJuaW5nSGFuZGxlcigpXG5cdFx0aGFuZGxlcnMucHVzaChoYW5kbGVyKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhIGNyYXNoIGhhbmRsZXIuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQG1lbWJlcm9mIHJlcG9ydFxuXHQgKi9cblx0ZnVuY3Rpb24gdW5zdWJzY3JpYmUoaGFuZGxlcikge1xuXHRcdGZvciAodmFyIGkgPSBoYW5kbGVycy5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuXHRcdFx0aWYgKGhhbmRsZXJzW2ldID09PSBoYW5kbGVyKSB7XG5cdFx0XHRcdGhhbmRsZXJzLnNwbGljZShpLCAxKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNwYXRjaCBzdGFjayBpbmZvcm1hdGlvbiB0byBhbGwgaGFuZGxlcnMuXG5cdCAqIEBwYXJhbSB7U3RhY2tUcmFjZX0gc3RhY2tcblx0ICogQHBhcmFtIHtib29sZWFufSBpc1dpbmRvd0Vycm9yIElzIHRoaXMgYSB0b3AtbGV2ZWwgd2luZG93IGVycm9yP1xuXHQgKiBAcGFyYW0ge0Vycm9yPX0gZXJyb3IgVGhlIGVycm9yIHRoYXQncyBiZWluZyBoYW5kbGVkIChpZiBhdmFpbGFibGUsIG51bGwgb3RoZXJ3aXNlKVxuXHQgKiBAbWVtYmVyb2YgcmVwb3J0XG5cdCAqIEB0aHJvd3MgQW4gZXhjZXB0aW9uIGlmIGFuIGVycm9yIG9jY3VycyB3aGlsZSBjYWxsaW5nIGFuIGhhbmRsZXIuXG5cdCAqL1xuXHRmdW5jdGlvbiBub3RpZnlIYW5kbGVycyhzdGFjaywgaXNXaW5kb3dFcnJvciwgZXJyb3IpIHtcblx0XHR2YXIgZXhjZXB0aW9uXG5cdFx0Zm9yICh2YXIgaSBpbiBoYW5kbGVycykge1xuXHRcdFx0aWYgKGhhcyhoYW5kbGVycywgaSkpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRoYW5kbGVyc1tpXShzdGFjaywgaXNXaW5kb3dFcnJvciwgZXJyb3IpXG5cdFx0XHRcdH0gY2F0Y2ggKGlubmVyKSB7XG5cdFx0XHRcdFx0ZXhjZXB0aW9uID0gaW5uZXJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChleGNlcHRpb24pIHtcblx0XHRcdHRocm93IGV4Y2VwdGlvblxuXHRcdH1cblx0fVxuXG5cdHZhciBvbkVycm9ySGFuZGxlckluc3RhbGxlZFxuXHR2YXIgb25VbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVySW5zdGFsbGVkXG5cdHZhciBvblBhZ2VOb3RGb3VuZEhhbmRsZXJJbnN0YWxsZWRcblx0dmFyIG9uT25NZW1vcnlXYXJuaW5nSGFuZGxlckluc3RhbGxlZFxuXHQvKipcblx0ICogRW5zdXJlcyBhbGwgZ2xvYmFsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFyZSByZWNvcmRlZC5cblx0ICogU3VwcG9ydGVkIGJ5IEdlY2tvIGFuZCBJRS5cblx0ICogQHBhcmFtIHtFdmVudHxzdHJpbmd9IG1lc3NhZ2UgRXJyb3IgbWVzc2FnZS5cblx0ICogQHBhcmFtIHtzdHJpbmc9fSB1cmwgVVJMIG9mIHNjcmlwdCB0aGF0IGdlbmVyYXRlZCB0aGUgZXhjZXB0aW9uLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGxpbmVObyBUaGUgbGluZSBudW1iZXIgYXQgd2hpY2ggdGhlIGVycm9yIG9jY3VycmVkLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGNvbHVtbk5vIFRoZSBjb2x1bW4gbnVtYmVyIGF0IHdoaWNoIHRoZSBlcnJvciBvY2N1cnJlZC5cblx0ICogQHBhcmFtIHtFcnJvcj19IGVycm9yT2JqIFRoZSBhY3R1YWwgRXJyb3Igb2JqZWN0LlxuXHQgKiBAbWVtYmVyb2YgcmVwb3J0XG5cdCAqL1xuXHRmdW5jdGlvbiB0cmFjZUtpdFdpbmRvd09uRXJyb3IoZXJyKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSB0eXBlb2YgZXJyID09PSAnc3RyaW5nJyA/IG5ldyBFcnJvcihlcnIpIDogZXJyXG5cdFx0dmFyIHN0YWNrXG5cdFx0dmFyIG5hbWUgPSAnJ1xuXHRcdHZhciBtc2cgPSAnJ1xuXHRcdHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2UoZXJyb3IpXG5cdFx0aWYgKFxuXHRcdFx0ZXJyb3IgJiZcblx0XHRcdGVycm9yLm1lc3NhZ2UgJiZcblx0XHRcdHt9LnRvU3RyaW5nLmNhbGwoZXJyb3IubWVzc2FnZSkgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBtZXNzYWdlcyA9IGVycm9yLm1lc3NhZ2Uuc3BsaXQoJ1xcbicpXG5cdFx0XHRpZiAobWVzc2FnZXMubGVuZ3RoID49IDMpIHtcblx0XHRcdFx0bXNnID0gbWVzc2FnZXNbMl1cblx0XHRcdFx0Y29uc3QgZ3JvdXBzID0gbXNnLm1hdGNoKEVSUk9SX1RZUEVTX1JFKVxuXHRcdFx0XHRpZiAoZ3JvdXBzKSB7XG5cdFx0XHRcdFx0bmFtZSA9IGdyb3Vwc1sxXVxuXHRcdFx0XHRcdG1zZyA9IGdyb3Vwc1syXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChtc2cpIHtcblx0XHRcdHN0YWNrLm1lc3NhZ2UgPSBtc2dcblx0XHR9XG5cdFx0aWYgKG5hbWUpIHtcblx0XHRcdHN0YWNrLm5hbWUgPSBuYW1lXG5cdFx0fVxuXHRcdG5vdGlmeUhhbmRsZXJzKHN0YWNrLCB0cnVlLCBlcnJvcilcblx0fVxuXG5cdC8qKlxuXHQgKiBFbnN1cmVzIGFsbCB1bmhhbmRsZWQgcmVqZWN0aW9ucyBhcmUgcmVjb3JkZWQuXG5cdCAqIEBwYXJhbSB7UHJvbWlzZVJlamVjdGlvbkV2ZW50fSBlIGV2ZW50LlxuXHQgKiBAbWVtYmVyb2YgcmVwb3J0XG5cdCAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd0V2ZW50SGFuZGxlcnMvb251bmhhbmRsZWRyZWplY3Rpb25cblx0ICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUHJvbWlzZVJlamVjdGlvbkV2ZW50XG5cdCAqL1xuXHRmdW5jdGlvbiB0cmFjZUtpdFdpbmRvd09uVW5oYW5kbGVkUmVqZWN0aW9uKHsgcmVhc29uLCBwcm9taXNlIH0pIHtcblx0XHRjb25zdCBlcnJvciA9IHR5cGVvZiByZWFzb24gPT09ICdzdHJpbmcnID8gbmV3IEVycm9yKHJlYXNvbikgOiByZWFzb25cblx0XHR2YXIgc3RhY2tcblx0XHR2YXIgbmFtZSA9ICcnXG5cdFx0dmFyIG1zZyA9ICcnXG5cdFx0c3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZShlcnJvcilcblx0XHRpZiAoXG5cdFx0XHRlcnJvciAmJlxuXHRcdFx0ZXJyb3IubWVzc2FnZSAmJlxuXHRcdFx0e30udG9TdHJpbmcuY2FsbChlcnJvci5tZXNzYWdlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQpIHtcblx0XHRcdGNvbnN0IG1lc3NhZ2VzID0gZXJyb3IubWVzc2FnZS5zcGxpdCgnXFxuJylcblx0XHRcdGlmIChtZXNzYWdlcy5sZW5ndGggPj0gMykge1xuXHRcdFx0XHRtc2cgPSBtZXNzYWdlc1syXVxuXHRcdFx0XHRjb25zdCBncm91cHMgPSBtc2cubWF0Y2goRVJST1JfVFlQRVNfUkUpXG5cdFx0XHRcdGlmIChncm91cHMpIHtcblx0XHRcdFx0XHRuYW1lID0gZ3JvdXBzWzFdXG5cdFx0XHRcdFx0bXNnID0gZ3JvdXBzWzJdXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKG1zZykge1xuXHRcdFx0c3RhY2subWVzc2FnZSA9IG1zZ1xuXHRcdH1cblx0XHRpZiAobmFtZSkge1xuXHRcdFx0c3RhY2submFtZSA9IG5hbWVcblx0XHR9XG5cdFx0bm90aWZ5SGFuZGxlcnMoc3RhY2ssIHRydWUsIGVycm9yKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc3RhbGwgYSBnbG9iYWwgb25lcnJvciBoYW5kbGVyXG5cdCAqIEBtZW1iZXJvZiByZXBvcnRcblx0ICovXG5cdGZ1bmN0aW9uIGluc3RhbGxHbG9iYWxIYW5kbGVyKCkge1xuXHRcdGlmIChvbkVycm9ySGFuZGxlckluc3RhbGxlZCB8fCAhc2RrLm9uRXJyb3IpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRzZGsub25FcnJvcih0cmFjZUtpdFdpbmRvd09uRXJyb3IpXG5cdFx0b25FcnJvckhhbmRsZXJJbnN0YWxsZWQgPSB0cnVlXG5cdH1cblxuXHQvKipcblx0ICogSW5zdGFsbCBhIGdsb2JhbCBvbnVuaGFuZGxlZHJlamVjdGlvbiBoYW5kbGVyXG5cdCAqIEBtZW1iZXJvZiByZXBvcnRcblx0ICovXG5cdGZ1bmN0aW9uIGluc3RhbGxHbG9iYWxVbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKCkge1xuXHRcdGlmIChvblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXJJbnN0YWxsZWQgfHwgIXNkay5vblVuaGFuZGxlZFJlamVjdGlvbikge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0c2RrLm9uVW5oYW5kbGVkUmVqZWN0aW9uICYmXG5cdFx0XHRzZGsub25VbmhhbmRsZWRSZWplY3Rpb24odHJhY2VLaXRXaW5kb3dPblVuaGFuZGxlZFJlamVjdGlvbilcblx0XHRvblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXJJbnN0YWxsZWQgPSB0cnVlXG5cdH1cblx0ZnVuY3Rpb24gaW5zdGFsbEdsb2JhbE9uUGFnZU5vdEZvdW5kSGFuZGxlcigpIHtcblx0XHRpZiAob25QYWdlTm90Rm91bmRIYW5kbGVySW5zdGFsbGVkIHx8ICFzZGsub25QYWdlTm90Rm91bmQpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRzZGsub25QYWdlTm90Rm91bmQoKHJlcykgPT4ge1xuXHRcdFx0Y29uc3QgdXJsID0gcmVzLnBhdGguc3BsaXQoJz8nKVswXVxuXHRcdFx0bm90aWZ5SGFuZGxlcnMoXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlOiBKU09OLnN0cmluZ2lmeShyZXMpLFxuXHRcdFx0XHRcdHR5cGU6ICdwYWdlbm90Zm91bmQnLFxuXHRcdFx0XHRcdG5hbWU6IHVybCArICfpobXpnaLml6Dms5Xmib7liLAnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHR7fSxcblx0XHRcdClcblx0XHR9KVxuXHRcdG9uUGFnZU5vdEZvdW5kSGFuZGxlckluc3RhbGxlZCA9IHRydWVcblx0fVxuXHRmdW5jdGlvbiBpbnN0YWxsR2xvYmFsT25NZW1vcnlXYXJuaW5nSGFuZGxlcigpIHtcblx0XHRpZiAob25Pbk1lbW9yeVdhcm5pbmdIYW5kbGVySW5zdGFsbGVkIHx8ICFzZGsub25NZW1vcnlXYXJuaW5nKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0c2RrLm9uTWVtb3J5V2FybmluZygoeyBsZXZlbCA9IC0xIH0pID0+IHtcblx0XHRcdGxldCBsZXZlbE1lc3NhZ2UgPSAn5rKh5pyJ6I635Y+W5Yiw5ZGK6K2m57qn5Yir5L+h5oGvJ1xuXG5cdFx0XHRzd2l0Y2ggKGxldmVsKSB7XG5cdFx0XHRcdGNhc2UgNTpcblx0XHRcdFx0XHRsZXZlbE1lc3NhZ2UgPSAnVFJJTV9NRU1PUllfUlVOTklOR19NT0RFUkFURSdcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIDEwOlxuXHRcdFx0XHRcdGxldmVsTWVzc2FnZSA9ICdUUklNX01FTU9SWV9SVU5OSU5HX0xPVydcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIDE1OlxuXHRcdFx0XHRcdGxldmVsTWVzc2FnZSA9ICdUUklNX01FTU9SWV9SVU5OSU5HX0NSSVRJQ0FMJ1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRub3RpZnlIYW5kbGVycyhcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lc3NhZ2U6IGxldmVsTWVzc2FnZSxcblx0XHRcdFx0XHR0eXBlOiAnbWVtb3J5d2FybmluZycsXG5cdFx0XHRcdFx0bmFtZTogJ+WGheWtmOS4jei2s+WRiuitpicsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdHt9LFxuXHRcdFx0KVxuXHRcdH0pXG5cdFx0b25Pbk1lbW9yeVdhcm5pbmdIYW5kbGVySW5zdGFsbGVkID0gdHJ1ZVxuXHR9XG5cdC8qKlxuXHQgKiBSZXBvcnRzIGFuIHVuaGFuZGxlZCBFcnJvci5cblx0ICogQHBhcmFtIHtFcnJvcn0gZXhcblx0ICogQG1lbWJlcm9mIHJlcG9ydFxuXHQgKiBAdGhyb3dzIEFuIGV4Y2VwdGlvbiBpZiBhbiBpbmNvbXB2YXJlIHN0YWNrIHRyYWNlIGlzIGRldGVjdGVkIChvbGQgSUUgYnJvd3NlcnMpLlxuXHQgKi9cblx0ZnVuY3Rpb24gZG9SZXBvcnQoZXgpIHt9XG5cblx0ZG9SZXBvcnQuc3Vic2NyaWJlID0gc3Vic2NyaWJlXG5cdGRvUmVwb3J0LnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmVcblx0ZG9SZXBvcnQudHJhY2VLaXRXaW5kb3dPbkVycm9yID0gdHJhY2VLaXRXaW5kb3dPbkVycm9yXG5cblx0cmV0dXJuIGRvUmVwb3J0XG59KSgpXG5cbi8qKlxuICogY29tcHV0ZVN0YWNrVHJhY2U6IGNyb3NzLWJyb3dzZXIgc3RhY2sgdHJhY2VzIGluIEphdmFTY3JpcHRcbiAqXG4gKiBTeW50YXg6XG4gKiAgIGBgYGpzXG4gKiAgIHMgPSBjb21wdXRlU3RhY2tUcmFjZS5vZkNhbGxlcihbZGVwdGhdKVxuICogICBzID0gY29tcHV0ZVN0YWNrVHJhY2UoZXhjZXB0aW9uKSAvLyBjb25zaWRlciB1c2luZyByZXBvcnQgaW5zdGVhZCAoc2VlIGJlbG93KVxuICogICBgYGBcbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiAgZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgbnVtYmVycyBhbmQgdW5yZWxpYWJsZSBjb2x1bW5cbiAqICAgICAgICAgICAgICAgbnVtYmVyIG9uIHRvcCBmcmFtZVxuICogICAtIE9wZXJhIDEwOiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBPcGVyYSA5LTogZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgbnVtYmVyc1xuICogICAtIENocm9tZTogICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6ICAgbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcG1vc3Qgc3RhY2t0cmFjZSBlbGVtZW50XG4gKiAgICAgICAgICAgICAgIG9ubHlcbiAqICAgLSBJRTogICAgICAgbm8gbGluZSBudW1iZXJzIHdoYXRzb2V2ZXJcbiAqXG4gKiBUcmllcyB0byBndWVzcyBuYW1lcyBvZiBhbm9ueW1vdXMgZnVuY3Rpb25zIGJ5IGxvb2tpbmcgZm9yIGFzc2lnbm1lbnRzXG4gKiBpbiB0aGUgc291cmNlIGNvZGUuIEluIElFIGFuZCBTYWZhcmksIHdlIGhhdmUgdG8gZ3Vlc3Mgc291cmNlIGZpbGUgbmFtZXNcbiAqIGJ5IHNlYXJjaGluZyBmb3IgZnVuY3Rpb24gYm9kaWVzIGluc2lkZSBhbGwgcGFnZSBzY3JpcHRzLiBUaGlzIHdpbGwgbm90XG4gKiB3b3JrIGZvciBzY3JpcHRzIHRoYXQgYXJlIGxvYWRlZCBjcm9zcy1kb21haW4uXG4gKiBIZXJlIGJlIGRyYWdvbnM6IHNvbWUgZnVuY3Rpb24gbmFtZXMgbWF5IGJlIGd1ZXNzZWQgaW5jb3JyZWN0bHksIGFuZFxuICogZHVwbGljYXRlIGZ1bmN0aW9ucyBtYXkgYmUgbWlzbWF0Y2hlZC5cbiAqXG4gKiBjb21wdXRlU3RhY2tUcmFjZSBzaG91bGQgb25seSBiZSB1c2VkIGZvciB0cmFjaW5nIHB1cnBvc2VzLlxuICogTG9nZ2luZyBvZiB1bmhhbmRsZWQgZXhjZXB0aW9ucyBzaG91bGQgYmUgZG9uZSB3aXRoIHJlcG9ydCxcbiAqIHdoaWNoIGJ1aWxkcyBvbiB0b3Agb2YgY29tcHV0ZVN0YWNrVHJhY2UgYW5kIHByb3ZpZGVzIGJldHRlclxuICogSUUgc3VwcG9ydCBieSB1dGlsaXppbmcgdGhlIHNkay5vbkVycm9yIGV2ZW50IHRvIHJldHJpZXZlIGluZm9ybWF0aW9uXG4gKiBhYm91dCB0aGUgdG9wIG9mIHRoZSBzdGFjay5cbiAqXG4gKiBOb3RlOiBJbiBJRSBhbmQgU2FmYXJpLCBubyBzdGFjayB0cmFjZSBpcyByZWNvcmRlZCBvbiB0aGUgRXJyb3Igb2JqZWN0LFxuICogc28gY29tcHV0ZVN0YWNrVHJhY2UgaW5zdGVhZCB3YWxrcyBpdHMgKm93biogY2hhaW4gb2YgY2FsbGVycy5cbiAqIFRoaXMgbWVhbnMgdGhhdDpcbiAqICAqIGluIFNhZmFyaSwgc29tZSBtZXRob2RzIG1heSBiZSBtaXNzaW5nIGZyb20gdGhlIHN0YWNrIHRyYWNlO1xuICogICogaW4gSUUsIHRoZSB0b3Btb3N0IGZ1bmN0aW9uIGluIHRoZSBzdGFjayB0cmFjZSB3aWxsIGFsd2F5cyBiZSB0aGVcbiAqICAgIGNhbGxlciBvZiBjb21wdXRlU3RhY2tUcmFjZS5cbiAqXG4gKiBUaGlzIGlzIG9rYXkgZm9yIHRyYWNpbmcgKGJlY2F1c2UgeW91IGFyZSBsaWtlbHkgdG8gYmUgY2FsbGluZ1xuICogY29tcHV0ZVN0YWNrVHJhY2UgZnJvbSB0aGUgZnVuY3Rpb24geW91IHdhbnQgdG8gYmUgdGhlIHRvcG1vc3QgZWxlbWVudFxuICogb2YgdGhlIHN0YWNrIHRyYWNlIGFueXdheSksIGJ1dCBub3Qgb2theSBmb3IgbG9nZ2luZyB1bmhhbmRsZWRcbiAqIGV4Y2VwdGlvbnMgKGJlY2F1c2UgeW91ciBjYXRjaCBibG9jayB3aWxsIGxpa2VseSBiZSBmYXIgYXdheSBmcm9tIHRoZVxuICogaW5uZXIgZnVuY3Rpb24gdGhhdCBhY3R1YWxseSBjYXVzZWQgdGhlIGV4Y2VwdGlvbikuXG4gKlxuICogVHJhY2luZyBleGFtcGxlOlxuICogIGBgYGpzXG4gKiAgICAgZnVuY3Rpb24gdHJhY2UobWVzc2FnZSkge1xuICogICAgICAgICB2YXIgc3RhY2tJbmZvID0gY29tcHV0ZVN0YWNrVHJhY2Uub2ZDYWxsZXIoKTtcbiAqICAgICAgICAgdmFyIGRhdGEgPSBtZXNzYWdlICsgXCJcXG5cIjtcbiAqICAgICAgICAgZm9yKHZhciBpIGluIHN0YWNrSW5mby5zdGFjaykge1xuICogICAgICAgICAgICAgdmFyIGl0ZW0gPSBzdGFja0luZm8uc3RhY2tbaV07XG4gKiAgICAgICAgICAgICBkYXRhICs9IChpdGVtLmZ1bmMgfHwgJ1thbm9ueW1vdXNdJykgKyBcIigpIGluIFwiICsgaXRlbS51cmwgKyBcIjpcIiArIChpdGVtLmxpbmUgfHwgJzAnKSArIFwiXFxuXCI7XG4gKiAgICAgICAgIH1cbiAqICAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlKVxuICogICAgICAgICAgICAgY29uc29sZS5pbmZvKGRhdGEpO1xuICogICAgICAgICBlbHNlXG4gKiAgICAgICAgICAgICBhbGVydChkYXRhKTtcbiAqICAgICB9XG4gKiBgYGBcbiAqIEBtZW1iZXJvZiBUcmFjZUtpdFxuICogQG5hbWVzcGFjZVxuICovXG5leHBvcnQgdmFyIGNvbXB1dGVTdGFja1RyYWNlID0gKGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlV3JhcHBlcigpIHtcblx0dmFyIGRlYnVnID0gZmFsc2VcblxuXHQvLyBDb250ZW50cyBvZiBFeGNlcHRpb24gaW4gdmFyaW91cyBicm93c2Vycy5cblx0Ly9cblx0Ly8gU0FGQVJJOlxuXHQvLyBleC5tZXNzYWdlID0gQ2FuJ3QgZmluZCB2YXJpYWJsZTogcXFcblx0Ly8gZXgubGluZSA9IDU5XG5cdC8vIGV4LnNvdXJjZUlkID0gNTgwMjM4MTkyXG5cdC8vIGV4LnNvdXJjZVVSTCA9IGh0dHA6Ly8uLi5cblx0Ly8gZXguZXhwcmVzc2lvbkJlZ2luT2Zmc2V0ID0gOTZcblx0Ly8gZXguZXhwcmVzc2lvbkNhcmV0T2Zmc2V0ID0gOThcblx0Ly8gZXguZXhwcmVzc2lvbkVuZE9mZnNldCA9IDk4XG5cdC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuXHQvL1xuXHQvLyBGSVJFRk9YOlxuXHQvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcblx0Ly8gZXguZmlsZU5hbWUgPSBodHRwOi8vLi4uXG5cdC8vIGV4LmxpbmVOdW1iZXIgPSA1OVxuXHQvLyBleC5jb2x1bW5OdW1iZXIgPSA2OVxuXHQvLyBleC5zdGFjayA9IC4uLnN0YWNrIHRyYWNlLi4uIChzZWUgdGhlIGV4YW1wbGUgYmVsb3cpXG5cdC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuXHQvL1xuXHQvLyBDSFJPTUU6XG5cdC8vIGV4Lm1lc3NhZ2UgPSBxcSBpcyBub3QgZGVmaW5lZFxuXHQvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3Jcblx0Ly8gZXgudHlwZSA9IG5vdF9kZWZpbmVkXG5cdC8vIGV4LmFyZ3VtZW50cyA9IFsnYWEnXVxuXHQvLyBleC5zdGFjayA9IC4uLnN0YWNrIHRyYWNlLi4uXG5cdC8vXG5cdC8vIElOVEVSTkVUIEVYUExPUkVSOlxuXHQvLyBleC5tZXNzYWdlID0gLi4uXG5cdC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuXHQvL1xuXHQvLyBPUEVSQTpcblx0Ly8gZXgubWVzc2FnZSA9IC4uLm1lc3NhZ2UuLi4gKHNlZSB0aGUgZXhhbXBsZSBiZWxvdylcblx0Ly8gZXgubmFtZSA9IFJlZmVyZW5jZUVycm9yXG5cdC8vIGV4Lm9wZXJhI3NvdXJjZWxvYyA9IDExICAocHJldHR5IG11Y2ggdXNlbGVzcywgZHVwbGljYXRlcyB0aGUgaW5mbyBpbiBleC5tZXNzYWdlKVxuXHQvLyBleC5zdGFja3RyYWNlID0gbi9hOyBzZWUgJ29wZXJhOmNvbmZpZyNVc2VyUHJlZnN8RXhjZXB0aW9ucyBIYXZlIFN0YWNrdHJhY2UnXG5cblx0LyoqXG5cdCAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrIHByb3BlcnR5LlxuXHQgKiBDaHJvbWUgYW5kIEdlY2tvIHVzZSB0aGlzIHByb3BlcnR5LlxuXHQgKiBAcGFyYW0ge0Vycm9yfSBleFxuXHQgKiBAcmV0dXJuIHs/U3RhY2tUcmFjZX0gU3RhY2sgdHJhY2UgaW5mb3JtYXRpb24uXG5cdCAqIEBtZW1iZXJvZiBjb21wdXRlU3RhY2tUcmFjZVxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wKGV4KSB7XG5cdFx0aWYgKCFleC5zdGFjaykge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuXHRcdHZhciBjaHJvbWUgPSAvXlxccyphdCAoLio/KSA/XFwoKCg/OmZpbGV8aHR0cHM/fGJsb2J8Y2hyb21lLWV4dGVuc2lvbnxuYXRpdmV8ZXZhbHx3ZWJwYWNrfDxhbm9ueW1vdXM+fFxcLykuKj8pKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFwpP1xccyokL2lcblx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG5cdFx0dmFyIGdlY2tvID0gL15cXHMqKC4qPykoPzpcXCgoLio/KVxcKSk/KD86XnxAKSgoPzpmaWxlfGh0dHBzP3xibG9ifGNocm9tZXx3ZWJwYWNrfHJlc291cmNlfFxcW25hdGl2ZSkuKj98W15AXSpidW5kbGUpKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFxzKiQvaVxuXHRcdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBtYXgtbGluZS1sZW5ndGhcblx0XHR2YXIgd2luanMgPSAvXlxccyphdCAoPzooKD86XFxbb2JqZWN0IG9iamVjdFxcXSk/LispICk/XFwoPygoPzpmaWxlfG1zLWFwcHh8aHR0cHM/fHdlYnBhY2t8YmxvYik6Lio/KTooXFxkKykoPzo6KFxcZCspKT9cXCk/XFxzKiQvaVxuXG5cdFx0Ly8gVXNlZCB0byBhZGRpdGlvbmFsbHkgcGFyc2UgVVJML2xpbmUvY29sdW1uIGZyb20gZXZhbCBmcmFtZXNcblx0XHR2YXIgaXNFdmFsXG5cdFx0dmFyIGdlY2tvRXZhbCA9IC8oXFxTKykgbGluZSAoXFxkKykoPzogPiBldmFsIGxpbmUgXFxkKykqID4gZXZhbC9pXG5cdFx0dmFyIGNocm9tZUV2YWwgPSAvXFwoKFxcUyopKD86OihcXGQrKSkoPzo6KFxcZCspKVxcKS9cblx0XHR2YXIgbGluZXMgPSBleC5zdGFjay5zcGxpdCgnXFxuJylcblx0XHR2YXIgc3RhY2sgPSBbXVxuXHRcdHZhciBzdWJtYXRjaFxuXHRcdHZhciBwYXJ0c1xuXHRcdHZhciBlbGVtZW50XG5cblx0XHRmb3IgKHZhciBpID0gMCwgaiA9IGxpbmVzLmxlbmd0aDsgaSA8IGo7IGkgKz0gMSkge1xuXHRcdFx0aWYgKGNocm9tZS5leGVjKGxpbmVzW2ldKSkge1xuXHRcdFx0XHRwYXJ0cyA9IGNocm9tZS5leGVjKGxpbmVzW2ldKVxuXHRcdFx0XHR2YXIgaXNOYXRpdmUgPSBwYXJ0c1syXSAmJiBwYXJ0c1syXS5pbmRleE9mKCduYXRpdmUnKSA9PT0gMCAvLyBzdGFydCBvZiBsaW5lXG5cdFx0XHRcdGlzRXZhbCA9IHBhcnRzWzJdICYmIHBhcnRzWzJdLmluZGV4T2YoJ2V2YWwnKSA9PT0gMCAvLyBzdGFydCBvZiBsaW5lXG5cdFx0XHRcdHN1Ym1hdGNoID0gY2hyb21lRXZhbC5leGVjKHBhcnRzWzJdKVxuXHRcdFx0XHRpZiAoaXNFdmFsICYmIHN1Ym1hdGNoKSB7XG5cdFx0XHRcdFx0Ly8gdGhyb3cgb3V0IGV2YWwgbGluZS9jb2x1bW4gYW5kIHVzZSB0b3AtbW9zdCBsaW5lL2NvbHVtbiBudW1iZXJcblx0XHRcdFx0XHRwYXJ0c1syXSA9IHN1Ym1hdGNoWzFdIC8vIHVybFxuXHRcdFx0XHRcdHBhcnRzWzNdID0gc3VibWF0Y2hbMl0gLy8gbGluZVxuXHRcdFx0XHRcdHBhcnRzWzRdID0gc3VibWF0Y2hbM10gLy8gY29sdW1uXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbWVudCA9IHtcblx0XHRcdFx0XHRhcmdzOiBpc05hdGl2ZSA/IFtwYXJ0c1syXV0gOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdGZ1bmM6IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT04sXG5cdFx0XHRcdFx0bGluZTogcGFydHNbM10gPyArcGFydHNbM10gOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0dXJsOiAhaXNOYXRpdmUgPyBwYXJ0c1syXSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh3aW5qcy5leGVjKGxpbmVzW2ldKSkge1xuXHRcdFx0XHRwYXJ0cyA9IHdpbmpzLmV4ZWMobGluZXNbaV0pXG5cdFx0XHRcdGVsZW1lbnQgPSB7XG5cdFx0XHRcdFx0YXJnczogW10sXG5cdFx0XHRcdFx0Y29sdW1uOiBwYXJ0c1s0XSA/ICtwYXJ0c1s0XSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuXHRcdFx0XHRcdGxpbmU6ICtwYXJ0c1szXSxcblx0XHRcdFx0XHR1cmw6IHBhcnRzWzJdLFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGdlY2tvLmV4ZWMobGluZXNbaV0pKSB7XG5cdFx0XHRcdHBhcnRzID0gZ2Vja28uZXhlYyhsaW5lc1tpXSlcblx0XHRcdFx0aXNFdmFsID0gcGFydHNbM10gJiYgcGFydHNbM10uaW5kZXhPZignID4gZXZhbCcpID4gLTFcblx0XHRcdFx0c3VibWF0Y2ggPSBnZWNrb0V2YWwuZXhlYyhwYXJ0c1szXSlcblx0XHRcdFx0aWYgKGlzRXZhbCAmJiBzdWJtYXRjaCkge1xuXHRcdFx0XHRcdC8vIHRocm93IG91dCBldmFsIGxpbmUvY29sdW1uIGFuZCB1c2UgdG9wLW1vc3QgbGluZSBudW1iZXJcblx0XHRcdFx0XHRwYXJ0c1szXSA9IHN1Ym1hdGNoWzFdXG5cdFx0XHRcdFx0cGFydHNbNF0gPSBzdWJtYXRjaFsyXVxuXHRcdFx0XHRcdHBhcnRzWzVdID0gdW5kZWZpbmVkIC8vIG5vIGNvbHVtbiB3aGVuIGV2YWxcblx0XHRcdFx0fSBlbHNlIGlmIChpID09PSAwICYmICFwYXJ0c1s1XSAmJiAhaXNVbmRlZmluZWQoZXguY29sdW1uTnVtYmVyKSkge1xuXHRcdFx0XHRcdC8vIEZpcmVGb3ggdXNlcyB0aGlzIGF3ZXNvbWUgY29sdW1uTnVtYmVyIHByb3BlcnR5IGZvciBpdHMgdG9wIGZyYW1lXG5cdFx0XHRcdFx0Ly8gQWxzbyBub3RlLCBGaXJlZm94J3MgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkIGFuZCBldmVyeXRoaW5nIGVsc2UgZXhwZWN0cyAxLWJhc2VkLFxuXHRcdFx0XHRcdC8vIHNvIGFkZGluZyAxXG5cdFx0XHRcdFx0Ly8gTk9URTogdGhpcyBoYWNrIGRvZXNuJ3Qgd29yayBpZiB0b3AtbW9zdCBmcmFtZSBpcyBldmFsXG5cdFx0XHRcdFx0c3RhY2tbMF0uY29sdW1uID0gZXguY29sdW1uTnVtYmVyICsgMVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZW1lbnQgPSB7XG5cdFx0XHRcdFx0YXJnczogcGFydHNbMl0gPyBwYXJ0c1syXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Y29sdW1uOiBwYXJ0c1s1XSA/ICtwYXJ0c1s1XSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuXHRcdFx0XHRcdGxpbmU6IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdHVybDogcGFydHNbM10sXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cblx0XHRcdGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuXHRcdFx0XHRlbGVtZW50LmZ1bmMgPSBVTktOT1dOX0ZVTkNUSU9OXG5cdFx0XHR9XG5cdFx0XHRzdGFjay5wdXNoKGVsZW1lbnQpXG5cdFx0fVxuXG5cdFx0aWYgKCFzdGFjay5sZW5ndGgpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRzdGFjayxcblx0XHRcdG1lc3NhZ2U6IGV4dHJhY3RNZXNzYWdlKGV4KSxcblx0XHRcdG5hbWU6IGV4Lm5hbWUsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrdHJhY2UgcHJvcGVydHkuXG5cdCAqIE9wZXJhIDEwKyB1c2VzIHRoaXMgcHJvcGVydHkuXG5cdCAqIEBwYXJhbSB7RXJyb3J9IGV4XG5cdCAqIEByZXR1cm4gez9TdGFja1RyYWNlfSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja3RyYWNlUHJvcChleCkge1xuXHRcdC8vIEFjY2VzcyBhbmQgc3RvcmUgdGhlIHN0YWNrdHJhY2UgcHJvcGVydHkgYmVmb3JlIGRvaW5nIEFOWVRISU5HXG5cdFx0Ly8gZWxzZSB0byBpdCBiZWNhdXNlIE9wZXJhIGlzIG5vdCB2ZXJ5IGdvb2QgYXQgcHJvdmlkaW5nIGl0XG5cdFx0Ly8gcmVsaWFibHkgaW4gb3RoZXIgY2lyY3Vtc3RhbmNlcy5cblx0XHR2YXIgc3RhY2t0cmFjZSA9IGV4LnN0YWNrdHJhY2Vcblx0XHRpZiAoIXN0YWNrdHJhY2UpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHZhciBvcGVyYTEwUmVnZXggPSAvIGxpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykoPzo6IGluIGZ1bmN0aW9uIChcXFMrKSk/JC9pXG5cdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuXHRcdHZhciBvcGVyYTExUmVnZXggPSAvIGxpbmUgKFxcZCspLCBjb2x1bW4gKFxcZCspXFxzKig/OmluICg/Ojxhbm9ueW1vdXMgZnVuY3Rpb246IChbXj5dKyk+fChbXlxcKV0rKSlcXCgoLiopXFwpKT8gaW4gKC4qKTpcXHMqJC9pXG5cdFx0dmFyIGxpbmVzID0gc3RhY2t0cmFjZS5zcGxpdCgnXFxuJylcblx0XHR2YXIgc3RhY2sgPSBbXVxuXHRcdHZhciBwYXJ0c1xuXG5cdFx0Zm9yICh2YXIgbGluZSA9IDA7IGxpbmUgPCBsaW5lcy5sZW5ndGg7IGxpbmUgKz0gMikge1xuXHRcdFx0dmFyIGVsZW1lbnRcblx0XHRcdGlmIChvcGVyYTEwUmVnZXguZXhlYyhsaW5lc1tsaW5lXSkpIHtcblx0XHRcdFx0cGFydHMgPSBvcGVyYTEwUmVnZXguZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0ZWxlbWVudCA9IHtcblx0XHRcdFx0XHRhcmdzOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1szXSxcblx0XHRcdFx0XHRsaW5lOiArcGFydHNbMV0sXG5cdFx0XHRcdFx0dXJsOiBwYXJ0c1syXSxcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcGVyYTExUmVnZXguZXhlYyhsaW5lc1tsaW5lXSkpIHtcblx0XHRcdFx0cGFydHMgPSBvcGVyYTExUmVnZXguZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0ZWxlbWVudCA9IHtcblx0XHRcdFx0XHRhcmdzOiBwYXJ0c1s1XSA/IHBhcnRzWzVdLnNwbGl0KCcsJykgOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46ICtwYXJ0c1syXSxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1szXSB8fCBwYXJ0c1s0XSxcblx0XHRcdFx0XHRsaW5lOiArcGFydHNbMV0sXG5cdFx0XHRcdFx0dXJsOiBwYXJ0c1s2XSxcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoIWVsZW1lbnQuZnVuYyAmJiBlbGVtZW50LmxpbmUpIHtcblx0XHRcdFx0XHRlbGVtZW50LmZ1bmMgPSBVTktOT1dOX0ZVTkNUSU9OXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbWVudC5jb250ZXh0ID0gW2xpbmVzW2xpbmUgKyAxXV1cblxuXHRcdFx0XHRzdGFjay5wdXNoKGVsZW1lbnQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFzdGFjay5sZW5ndGgpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRzdGFjayxcblx0XHRcdG1lc3NhZ2U6IGV4dHJhY3RNZXNzYWdlKGV4KSxcblx0XHRcdG5hbWU6IGV4Lm5hbWUsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE5PVCBURVNURUQuXG5cdCAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gYW4gZXJyb3IgbWVzc2FnZSB0aGF0IGluY2x1ZGVzXG5cdCAqIHRoZSBzdGFjayB0cmFjZS5cblx0ICogT3BlcmEgOSBhbmQgZWFybGllciB1c2UgdGhpcyBtZXRob2QgaWYgdGhlIG9wdGlvbiB0byBzaG93IHN0YWNrXG5cdCAqIHRyYWNlcyBpcyB0dXJuZWQgb24gaW4gb3BlcmE6Y29uZmlnLlxuXHQgKiBAcGFyYW0ge0Vycm9yfSBleFxuXHQgKiBAcmV0dXJuIHs/U3RhY2tUcmFjZX0gU3RhY2sgaW5mb3JtYXRpb24uXG5cdCAqIEBtZW1iZXJvZiBjb21wdXRlU3RhY2tUcmFjZVxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VGcm9tT3BlcmFNdWx0aUxpbmVNZXNzYWdlKGV4KSB7XG5cdFx0Ly8gVE9ETzogQ2xlYW4gdGhpcyBmdW5jdGlvbiB1cFxuXHRcdC8vIE9wZXJhIGluY2x1ZGVzIGEgc3RhY2sgdHJhY2UgaW50byB0aGUgZXhjZXB0aW9uIG1lc3NhZ2UuIEFuIGV4YW1wbGUgaXM6XG5cdFx0Ly9cblx0XHQvLyBTdGF0ZW1lbnQgb24gbGluZSAzOiBVbmRlZmluZWQgdmFyaWFibGU6IHVuZGVmaW5lZEZ1bmNcblx0XHQvLyBCYWNrdHJhY2U6XG5cdFx0Ly8gICBMaW5lIDMgb2YgbGlua2VkIHNjcmlwdCBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuanM6XG5cdFx0Ly8gICBJbiBmdW5jdGlvbiB6enpcblx0XHQvLyAgICAgICAgIHVuZGVmaW5lZEZ1bmMoYSk7XG5cdFx0Ly8gICBMaW5lIDcgb2YgaW5saW5lIzEgc2NyaXB0IGluIGZpbGU6Ly9sb2NhbGhvc3QvVXNlcnMvYW5kcmV5dml0L1Byb2plY3RzL1RyYWNlS2l0L2phdmFzY3JpcHQtY2xpZW50L3NhbXBsZS5odG1sOlxuXHRcdC8vICAgSW4gZnVuY3Rpb24geXl5XG5cdFx0Ly8gICAgICAgICAgIHp6eih4LCB5LCB6KTtcblx0XHQvLyAgIExpbmUgMyBvZiBpbmxpbmUjMSBzY3JpcHQgaW4gZmlsZTovL2xvY2FsaG9zdC9Vc2Vycy9hbmRyZXl2aXQvUHJvamVjdHMvVHJhY2VLaXQvamF2YXNjcmlwdC1jbGllbnQvc2FtcGxlLmh0bWw6XG5cdFx0Ly8gICBJbiBmdW5jdGlvbiB4eHhcblx0XHQvLyAgICAgICAgICAgeXl5KGEsIGEsIGEpO1xuXHRcdC8vICAgTGluZSAxIG9mIGZ1bmN0aW9uIHNjcmlwdFxuXHRcdC8vICAgICB0cnkgeyB4eHgoJ2hpJyk7IHJldHVybiBmYWxzZTsgfSBjYXRjaChleCkgeyByZXBvcnQoZXgpOyB9XG5cdFx0Ly8gICAuLi5cblxuXHRcdHZhciBsaW5lcyA9IGV4Lm1lc3NhZ2Uuc3BsaXQoJ1xcbicpXG5cdFx0aWYgKGxpbmVzLmxlbmd0aCA8IDQpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHZhciBsaW5lUkUxID0gL15cXHMqTGluZSAoXFxkKykgb2YgbGlua2VkIHNjcmlwdCAoKD86ZmlsZXxodHRwcz98YmxvYilcXFMrKSg/OjogaW4gZnVuY3Rpb24gKFxcUyspKT9cXHMqJC9pXG5cdFx0dmFyIGxpbmVSRTIgPSAvXlxccypMaW5lIChcXGQrKSBvZiBpbmxpbmUjKFxcZCspIHNjcmlwdCBpbiAoKD86ZmlsZXxodHRwcz98YmxvYilcXFMrKSg/OjogaW4gZnVuY3Rpb24gKFxcUyspKT9cXHMqJC9pXG5cdFx0dmFyIGxpbmVSRTMgPSAvXlxccypMaW5lIChcXGQrKSBvZiBmdW5jdGlvbiBzY3JpcHRcXHMqJC9pXG5cdFx0dmFyIHN0YWNrID0gW11cblx0XHR2YXIgc2NyaXB0cyA9XG5cdFx0XHR3aW5kb3cgJiZcblx0XHRcdHdpbmRvdy5kb2N1bWVudCAmJlxuXHRcdFx0d2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVxuXHRcdHZhciBpbmxpbmVTY3JpcHRCbG9ja3MgPSBbXVxuXHRcdHZhciBwYXJ0c1xuXG5cdFx0Zm9yICh2YXIgcyBpbiBzY3JpcHRzKSB7XG5cdFx0XHRpZiAoaGFzKHNjcmlwdHMsIHMpICYmICFzY3JpcHRzW3NdLnNyYykge1xuXHRcdFx0XHRpbmxpbmVTY3JpcHRCbG9ja3MucHVzaChzY3JpcHRzW3NdKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAodmFyIGxpbmUgPSAyOyBsaW5lIDwgbGluZXMubGVuZ3RoOyBsaW5lICs9IDIpIHtcblx0XHRcdHZhciBpdGVtXG5cdFx0XHRpZiAobGluZVJFMS5leGVjKGxpbmVzW2xpbmVdKSkge1xuXHRcdFx0XHRwYXJ0cyA9IGxpbmVSRTEuZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRhcmdzOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1szXSxcblx0XHRcdFx0XHRsaW5lOiArcGFydHNbMV0sXG5cdFx0XHRcdFx0dXJsOiBwYXJ0c1syXSxcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lUkUyLmV4ZWMobGluZXNbbGluZV0pKSB7XG5cdFx0XHRcdHBhcnRzID0gbGluZVJFMi5leGVjKGxpbmVzW2xpbmVdKVxuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGFyZ3M6IFtdLFxuXHRcdFx0XHRcdGNvbHVtbjogdW5kZWZpbmVkLCAvLyBUT0RPOiBDaGVjayB0byBzZWUgaWYgaW5saW5lIzEgKCtwYXJ0c1syXSkgcG9pbnRzIHRvIHRoZSBzY3JpcHQgbnVtYmVyIG9yIGNvbHVtbiBudW1iZXIuXG5cdFx0XHRcdFx0ZnVuYzogcGFydHNbNF0sXG5cdFx0XHRcdFx0bGluZTogK3BhcnRzWzFdLFxuXHRcdFx0XHRcdHVybDogcGFydHNbM10sXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAobGluZVJFMy5leGVjKGxpbmVzW2xpbmVdKSkge1xuXHRcdFx0XHRwYXJ0cyA9IGxpbmVSRTMuZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0dmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKiQvLCAnJylcblx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHR1cmwsXG5cdFx0XHRcdFx0YXJnczogW10sXG5cdFx0XHRcdFx0Y29sdW1uOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0ZnVuYzogJycsXG5cdFx0XHRcdFx0bGluZTogK3BhcnRzWzFdLFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdGlmICghaXRlbS5mdW5jKSB7XG5cdFx0XHRcdFx0aXRlbS5mdW5jID0gVU5LTk9XTl9GVU5DVElPTlxuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW0uY29udGV4dCA9IFtsaW5lc1tsaW5lICsgMV1dXG5cdFx0XHRcdHN0YWNrLnB1c2goaXRlbSlcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCFzdGFjay5sZW5ndGgpIHtcblx0XHRcdHJldHVybiAvLyBjb3VsZCBub3QgcGFyc2UgbXVsdGlsaW5lIGV4Y2VwdGlvbiBtZXNzYWdlIGFzIE9wZXJhIHN0YWNrIHRyYWNlXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YWNrLFxuXHRcdFx0bWVzc2FnZTogbGluZXNbMF0sXG5cdFx0XHRuYW1lOiBleC5uYW1lLFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmaXJzdCBmcmFtZSB0byBpbmNvbXB2YXJlIHN0YWNrIHRyYWNlcy5cblx0ICogU2FmYXJpIGFuZCBJRSByZXF1aXJlIHRoaXMgdG8gZ2V0IGNvbXB2YXJlIGRhdGEgb24gdGhlIGZpcnN0IGZyYW1lLlxuXHQgKiBAcGFyYW0ge1N0YWNrVHJhY2V9IHN0YWNrSW5mbyBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbiBmcm9tXG5cdCAqIG9uZSBvZiB0aGUgY29tcHV0ZSogbWV0aG9kcy5cblx0ICogQHBhcmFtIHtzdHJpbmc9fSB1cmwgVGhlIFVSTCBvZiB0aGUgc2NyaXB0IHRoYXQgY2F1c2VkIGFuIGVycm9yLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGxpbmVObyBUaGUgbGluZSBudW1iZXIgb2YgdGhlIHNjcmlwdCB0aGF0XG5cdCAqIGNhdXNlZCBhbiBlcnJvci5cblx0ICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBlcnJvciBnZW5lcmF0ZWQgYnkgdGhlIGJyb3dzZXIsIHdoaWNoXG5cdCAqIGhvcGVmdWxseSBjb250YWlucyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRoYXQgY2F1c2VkIHRoZSBlcnJvci5cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YWNrIGluZm9ybWF0aW9uIHdhc1xuXHQgKiBhdWdtZW50ZWQuXG5cdCAqIEBtZW1iZXJvZiBjb21wdXRlU3RhY2tUcmFjZVxuXHQgKi9cblx0ZnVuY3Rpb24gYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQoXG5cdFx0c3RhY2tJbmZvLFxuXHRcdHVybCxcblx0XHRsaW5lTm8sXG5cdFx0bWVzc2FnZSxcblx0KSB7XG5cdFx0dmFyIGluaXRpYWwgPSB7XG5cdFx0XHR1cmwsXG5cdFx0XHRsaW5lOiBsaW5lTm8gPyArbGluZU5vIDogdW5kZWZpbmVkLFxuXHRcdH1cblxuXHRcdGlmIChpbml0aWFsLnVybCAmJiBpbml0aWFsLmxpbmUpIHtcblx0XHRcdHN0YWNrSW5mby5pbmNvbXB2YXJlID0gZmFsc2VcblxuXHRcdFx0dmFyIHN0YWNrID0gc3RhY2tJbmZvLnN0YWNrXG5cdFx0XHRpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuXHRcdFx0XHRpZiAoc3RhY2tbMF0udXJsID09PSBpbml0aWFsLnVybCkge1xuXHRcdFx0XHRcdGlmIChzdGFja1swXS5saW5lID09PSBpbml0aWFsLmxpbmUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZSAvLyBhbHJlYWR5IGluIHN0YWNrIHRyYWNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghc3RhY2tbMF0ubGluZSAmJiBzdGFja1swXS5mdW5jID09PSBpbml0aWFsLmZ1bmMpIHtcblx0XHRcdFx0XHRcdHN0YWNrWzBdLmxpbmUgPSBpbml0aWFsLmxpbmVcblx0XHRcdFx0XHRcdHN0YWNrWzBdLmNvbnRleHQgPSBpbml0aWFsLmNvbnRleHRcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRzdGFjay51bnNoaWZ0KGluaXRpYWwpXG5cdFx0XHRzdGFja0luZm8ucGFydGlhbCA9IHRydWVcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHN0YWNrSW5mby5pbmNvbXB2YXJlID0gdHJ1ZVxuXG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHQvKipcblx0ICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gYnkgd2Fsa2luZyB0aGUgYXJndW1lbnRzLmNhbGxlclxuXHQgKiBjaGFpbiBhdCB0aGUgdGltZSB0aGUgZXhjZXB0aW9uIG9jY3VycmVkLiBUaGlzIHdpbGwgY2F1c2UgZWFybGllclxuXHQgKiBmcmFtZXMgdG8gYmUgbWlzc2VkIGJ1dCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IGFueSBzdGFjayB0cmFjZSBpblxuXHQgKiBTYWZhcmkgYW5kIElFLiBUaGUgdG9wIGZyYW1lIGlzIHJlc3RvcmVkIGJ5XG5cdCAqIHtAbGluayBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudH0uXG5cdCAqIEBwYXJhbSB7RXJyb3J9IGV4XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aFxuXHQgKiBAcmV0dXJuIHtTdGFja1RyYWNlfSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluKGV4LCBkZXB0aCkge1xuXHRcdHZhciBmdW5jdGlvbk5hbWUgPSAvZnVuY3Rpb25cXHMrKFtfJGEtekEtWlxceEEwLVxcdUZGRkZdW18kYS16QS1aMC05XFx4QTAtXFx1RkZGRl0qKT9cXHMqXFwoL2lcblx0XHR2YXIgc3RhY2sgPSBbXVxuXHRcdHZhciBmdW5jcyA9IHt9XG5cdFx0dmFyIHJlY3Vyc2lvbiA9IGZhbHNlXG5cdFx0dmFyIHBhcnRzXG5cdFx0dmFyIGl0ZW1cblxuXHRcdGZvciAoXG5cdFx0XHR2YXIgY3VyciA9IGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4uY2FsbGVyO1xuXHRcdFx0Y3VyciAmJiAhcmVjdXJzaW9uO1xuXHRcdFx0Y3VyciA9IGN1cnIuY2FsbGVyXG5cdFx0KSB7XG5cdFx0XHRpZiAoY3VyciA9PT0gY29tcHV0ZVN0YWNrVHJhY2UgfHwgY3VyciA9PT0gcmVwb3J0KSB7XG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cblx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdGFyZ3M6IFtdLFxuXHRcdFx0XHRjb2x1bW46IHVuZGVmaW5lZCxcblx0XHRcdFx0ZnVuYzogVU5LTk9XTl9GVU5DVElPTixcblx0XHRcdFx0bGluZTogdW5kZWZpbmVkLFxuXHRcdFx0XHR1cmw6IHVuZGVmaW5lZCxcblx0XHRcdH1cblxuXHRcdFx0cGFydHMgPSBmdW5jdGlvbk5hbWUuZXhlYyhjdXJyLnRvU3RyaW5nKCkpXG5cdFx0XHRpZiAoY3Vyci5uYW1lKSB7XG5cdFx0XHRcdGl0ZW0uZnVuYyA9IGN1cnIubmFtZVxuXHRcdFx0fSBlbHNlIGlmIChwYXJ0cykge1xuXHRcdFx0XHRpdGVtLmZ1bmMgPSBwYXJ0c1sxXVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIGl0ZW0uZnVuYyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0aXRlbS5mdW5jID0gcGFydHNcblx0XHRcdFx0XHQ/IHBhcnRzLmlucHV0LnN1YnN0cmluZygwLCBwYXJ0cy5pbnB1dC5pbmRleE9mKCd7JykpXG5cdFx0XHRcdFx0OiB1bmRlZmluZWRcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZ1bmNzW2N1cnIgKyAnJ10pIHtcblx0XHRcdFx0cmVjdXJzaW9uID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVuY3NbY3VyciArICcnXSA9IHRydWVcblx0XHRcdH1cblxuXHRcdFx0c3RhY2sucHVzaChpdGVtKVxuXHRcdH1cblxuXHRcdGlmIChkZXB0aCkge1xuXHRcdFx0c3RhY2suc3BsaWNlKDAsIGRlcHRoKVxuXHRcdH1cblxuXHRcdHZhciByZXN1bHQgPSB7XG5cdFx0XHRzdGFjayxcblx0XHRcdG1lc3NhZ2U6IGV4Lm1lc3NhZ2UsXG5cdFx0XHRuYW1lOiBleC5uYW1lLFxuXHRcdH1cblx0XHRhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudChcblx0XHRcdHJlc3VsdCxcblx0XHRcdGV4LnNvdXJjZVVSTCB8fCBleC5maWxlTmFtZSxcblx0XHRcdGV4LmxpbmUgfHwgZXgubGluZU51bWJlcixcblx0XHRcdGV4Lm1lc3NhZ2UgfHwgZXguZGVzY3JpcHRpb24sXG5cdFx0KVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wdXRlcyBhIHN0YWNrIHRyYWNlIGZvciBhbiBleGNlcHRpb24uXG5cdCAqIEBwYXJhbSB7RXJyb3J9IGV4XG5cdCAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpPX0gZGVwdGhcblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBkb0NvbXB1dGVTdGFja1RyYWNlKGV4LCBkZXB0aCkge1xuXHRcdHZhciBzdGFja1xuXHRcdHZhciBub3JtYWxpemVkRGVwdGggPSBkZXB0aCA9PT0gdW5kZWZpbmVkID8gMCA6ICtkZXB0aFxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFRoaXMgbXVzdCBiZSB0cmllZCBmaXJzdCBiZWNhdXNlIE9wZXJhIDEwICpkZXN0cm95cypcblx0XHRcdC8vIGl0cyBzdGFja3RyYWNlIHByb3BlcnR5IGlmIHlvdSB0cnkgdG8gYWNjZXNzIHRoZSBzdGFja1xuXHRcdFx0Ly8gcHJvcGVydHkgZmlyc3QhIVxuXHRcdFx0c3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja3RyYWNlUHJvcChleClcblx0XHRcdGlmIChzdGFjaykge1xuXHRcdFx0XHRyZXR1cm4gc3RhY2tcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZGVidWcpIHtcblx0XHRcdFx0dGhyb3cgZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlRnJvbVN0YWNrUHJvcChleClcblx0XHRcdGlmIChzdGFjaykge1xuXHRcdFx0XHRyZXR1cm4gc3RhY2tcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZGVidWcpIHtcblx0XHRcdFx0dGhyb3cgZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlRnJvbU9wZXJhTXVsdGlMaW5lTWVzc2FnZShleClcblx0XHRcdGlmIChzdGFjaykge1xuXHRcdFx0XHRyZXR1cm4gc3RhY2tcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZGVidWcpIHtcblx0XHRcdFx0dGhyb3cgZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4oZXgsIG5vcm1hbGl6ZWREZXB0aCArIDEpXG5cdFx0XHRpZiAoc3RhY2spIHtcblx0XHRcdFx0cmV0dXJuIHN0YWNrXG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKGRlYnVnKSB7XG5cdFx0XHRcdHRocm93IGVcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bWVzc2FnZTogZXh0cmFjdE1lc3NhZ2UoZXgpLFxuXHRcdFx0bmFtZTogZXgubmFtZSxcblx0XHRcdHN0YWNrOiBbXSxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTG9ncyBhIHN0YWNrdHJhY2Ugc3RhcnRpbmcgZnJvbSB0aGUgcHJldmlvdXMgY2FsbCBhbmQgd29ya2luZyBkb3duLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGRlcHRoIEhvdyBtYW55IGZyYW1lcyBkZWVwIHRvIHRyYWNlLlxuXHQgKiBAcmV0dXJuIHtTdGFja1RyYWNlfSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZU9mQ2FsbGVyKGRlcHRoKSB7XG5cdFx0dmFyIGN1cnJlbnREZXB0aCA9IChkZXB0aCA9PT0gdW5kZWZpbmVkID8gMCA6ICtkZXB0aCkgKyAxIC8vIFwiKyAxXCIgYmVjYXVzZSBcIm9mQ2FsbGVyXCIgc2hvdWxkIGRyb3Agb25lIGZyYW1lXG5cdFx0dHJ5IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigpXG5cdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdHJldHVybiBjb21wdXRlU3RhY2tUcmFjZShleCwgY3VycmVudERlcHRoICsgMSlcblx0XHR9XG5cdH1cblxuXHRkb0NvbXB1dGVTdGFja1RyYWNlLmF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50ID0gYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnRcblx0ZG9Db21wdXRlU3RhY2tUcmFjZS5jb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3Bcblx0ZG9Db21wdXRlU3RhY2tUcmFjZS5vZkNhbGxlciA9IGNvbXB1dGVTdGFja1RyYWNlT2ZDYWxsZXJcblxuXHRyZXR1cm4gZG9Db21wdXRlU3RhY2tUcmFjZVxufSkoKVxudmFyIEVSUk9SX1RZUEVTX1JFID0gL14oPzpbVXVdbmNhdWdodCAoPzpleGNlcHRpb246ICk/KT8oPzooKD86RXZhbHxJbnRlcm5hbHxSYW5nZXxSZWZlcmVuY2V8U3ludGF4fFR5cGV8VVJJfClFcnJvcik6ICk/KC4qKSQvXG5mdW5jdGlvbiBleHRyYWN0TWVzc2FnZShleCkge1xuXHRjb25zdCBtZXNzYWdlID0gZXggJiYgZXgubWVzc2FnZVxuXHQvLyBjb25zb2xlLmxvZygnbWVzc2FnZScsbWVzc2FnZSlcblx0aWYgKCFtZXNzYWdlKSB7XG5cdFx0cmV0dXJuICdObyBlcnJvciBtZXNzYWdlJ1xuXHR9XG5cdGlmIChtZXNzYWdlLmVycm9yICYmIHR5cGVvZiBtZXNzYWdlLmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UuZXJyb3IubWVzc2FnZVxuXHR9XG5cblx0cmV0dXJuIG1lc3NhZ2Vcbn1cbiIsImltcG9ydCB7IE1wSG9vayB9IGZyb20gJy4vZW51bXMnXG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZVxudmFyIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZVxudmFyIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZVxudmFyIGhhc093blByb3BlcnR5ID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHlcbnZhciBzbGljZSA9IEFycmF5UHJvdG8uc2xpY2VcbnZhciB0b1N0cmluZyA9IE9ialByb3RvLnRvU3RyaW5nXG52YXIgbmF0aXZlRm9yRWFjaCA9IEFycmF5UHJvdG8uZm9yRWFjaFxudmFyIGJyZWFrZXIgPSBmYWxzZVxuZXhwb3J0IHZhciBpc0FyZ3VtZW50cyA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuICEhKG9iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgJ2NhbGxlZScpKVxufVxuZXhwb3J0IHZhciBlYWNoID0gZnVuY3Rpb24gKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcblx0aWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cdGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG5cdFx0b2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpXG5cdH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGlmIChpIGluIG9iaiAmJiBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gYnJlYWtlcikge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG5cdFx0XHRcdGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGJyZWFrZXIpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuZXhwb3J0IHZhciB2YWx1ZXMgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHZhciByZXN1bHRzID0gW11cblx0aWYgKG9iaiA9PT0gbnVsbCkge1xuXHRcdHJldHVybiByZXN1bHRzXG5cdH1cblx0ZWFjaChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHJlc3VsdHNbcmVzdWx0cy5sZW5ndGhdID0gdmFsdWVcblx0fSlcblx0cmV0dXJuIHJlc3VsdHNcbn1cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW0sIGRlY2ltYWxzKSB7XG5cdHJldHVybiArbnVtLnRvRml4ZWQoZGVjaW1hbHMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtc1RvTnMoZHVyYXRpb24pIHtcblx0aWYgKHR5cGVvZiBkdXJhdGlvbiAhPT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4gZHVyYXRpb25cblx0fVxuXHRyZXR1cm4gcm91bmQoZHVyYXRpb24gKiAxZTYsIDApXG59XG5leHBvcnQgdmFyIGlzVW5kZWZpbmVkID0gZnVuY3Rpb24gKG9iaikge1xuXHRyZXR1cm4gb2JqID09PSB2b2lkIDBcbn1cbmV4cG9ydCB2YXIgaXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nXG59XG5leHBvcnQgdmFyIGlzRGF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG59XG5leHBvcnQgdmFyIGlzQm9vbGVhbiA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nXG59XG5leHBvcnQgdmFyIGlzTnVtYmVyID0gZnVuY3Rpb24gKG9iaikge1xuXHRyZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiAvW1xcZFxcLl0rLy50ZXN0KFN0cmluZyhvYmopKVxufVxuXG5leHBvcnQgdmFyIHRvQXJyYXkgPSBmdW5jdGlvbiAoaXRlcmFibGUpIHtcblx0aWYgKCFpdGVyYWJsZSkgcmV0dXJuIFtdXG5cdGlmIChpdGVyYWJsZS50b0FycmF5KSB7XG5cdFx0cmV0dXJuIGl0ZXJhYmxlLnRvQXJyYXkoKVxuXHR9XG5cdGlmIChBcnJheS5pc0FycmF5KGl0ZXJhYmxlKSkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKGl0ZXJhYmxlKVxuXHR9XG5cdGlmIChpc0FyZ3VtZW50cyhpdGVyYWJsZSkpIHtcblx0XHRyZXR1cm4gc2xpY2UuY2FsbChpdGVyYWJsZSlcblx0fVxuXHRyZXR1cm4gdmFsdWVzKGl0ZXJhYmxlKVxufVxuZXhwb3J0IHZhciBhcmVJbk9yZGVyID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgbnVtYmVycyA9IHRvQXJyYXkoYXJndW1lbnRzKVxuXHRmb3IgKHZhciBpID0gMTsgaSA8IG51bWJlcnMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAobnVtYmVyc1tpIC0gMV0gPiBudW1iZXJzW2ldKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWVcbn1cbi8qKlxuICogVVVJRCB2NFxuICogZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBVVUlEKHBsYWNlaG9sZGVyKSB7XG5cdHJldHVybiBwbGFjZWhvbGRlclxuXHRcdD8gLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHQgIChcblx0XHRcdFx0cGFyc2VJbnQocGxhY2Vob2xkZXIsIDEwKSBeXG5cdFx0XHRcdCgoTWF0aC5yYW5kb20oKSAqIDE2KSA+PiAocGFyc2VJbnQocGxhY2Vob2xkZXIsIDEwKSAvIDQpKVxuXHRcdCAgKS50b1N0cmluZygxNilcblx0XHQ6IGAkezFlN30tJHsxZTN9LSR7NGUzfS0kezhlM30tJHsxZTExfWAucmVwbGFjZSgvWzAxOF0vZywgVVVJRClcbn1cbmV4cG9ydCBmdW5jdGlvbiBqc29uU3RyaW5naWZ5KHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcblx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG5cdH1cblx0dmFyIG9yaWdpbmFsVG9KU09OID0gW2ZhbHNlLCB1bmRlZmluZWRdXG5cdGlmIChoYXNUb0pTT04odmFsdWUpKSB7XG5cdFx0Ly8gV2UgbmVlZCB0byBhZGQgYSBmbGFnIGFuZCBub3QgcmVseSBvbiB0aGUgdHJ1dGhpbmVzcyBvZiB2YWx1ZS50b0pTT05cblx0XHQvLyBiZWNhdXNlIGl0IGNhbiBiZSBzZXQgYnV0IHVuZGVmaW5lZCBhbmQgdGhhdCdzIGFjdHVhbGx5IHNpZ25pZmljYW50LlxuXHRcdG9yaWdpbmFsVG9KU09OID0gW3RydWUsIHZhbHVlLnRvSlNPTl1cblx0XHRkZWxldGUgdmFsdWUudG9KU09OXG5cdH1cblxuXHR2YXIgb3JpZ2luYWxQcm90b1RvSlNPTiA9IFtmYWxzZSwgdW5kZWZpbmVkXVxuXHR2YXIgcHJvdG90eXBlXG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKVxuXHRcdGlmIChoYXNUb0pTT04ocHJvdG90eXBlKSkge1xuXHRcdFx0b3JpZ2luYWxQcm90b1RvSlNPTiA9IFt0cnVlLCBwcm90b3R5cGUudG9KU09OXVxuXHRcdFx0ZGVsZXRlIHByb3RvdHlwZS50b0pTT05cblx0XHR9XG5cdH1cblxuXHR2YXIgcmVzdWx0XG5cdHRyeSB7XG5cdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUsIHVuZGVmaW5lZCwgc3BhY2UpXG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXN1bHQgPSAnPGVycm9yOiB1bmFibGUgdG8gc2VyaWFsaXplIG9iamVjdD4nXG5cdH0gZmluYWxseSB7XG5cdFx0aWYgKG9yaWdpbmFsVG9KU09OWzBdKSB7XG5cdFx0XHR2YWx1ZS50b0pTT04gPSBvcmlnaW5hbFRvSlNPTlsxXVxuXHRcdH1cblx0XHRpZiAob3JpZ2luYWxQcm90b1RvSlNPTlswXSkge1xuXHRcdFx0cHJvdG90eXBlLnRvSlNPTiA9IG9yaWdpbmFsUHJvdG9Ub0pTT05bMV1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdFxufVxuZnVuY3Rpb24gaGFzVG9KU09OKHZhbHVlKSB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0dmFsdWUuaGFzT3duUHJvcGVydHkoJ3RvSlNPTicpXG5cdClcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbGFwc2VkKHN0YXJ0LCBlbmQpIHtcblx0cmV0dXJuIGVuZCAtIHN0YXJ0XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0aG9kcyhvYmopIHtcblx0dmFyIGZ1bmNzID0gW11cblx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIU1wSG9va1trZXldKSB7XG5cdFx0XHRmdW5jcy5wdXNoKGtleSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZ1bmNzXG59XG4vLyDmm7/mjaJ1cmzljIXlkKvmlbDlrZfnmoTot6/nlLFcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTnVtYmVyQ2hhckJ5UGF0aChwYXRoKSB7XG5cdGlmIChwYXRoKSB7XG5cdFx0cmV0dXJuIHBhdGgucmVwbGFjZSgvXFwvKFteXFwvXSopXFxkKFteXFwvXSopL2csICcvPycpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICcnXG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXNHcm91cChzdGF0dXMpIHtcblx0aWYgKCFzdGF0dXMpIHJldHVybiBzdGF0dXNcblx0cmV0dXJuIChcblx0XHRTdHJpbmcoc3RhdHVzKS5zdWJzdHIoMCwgMSkgKyBTdHJpbmcoc3RhdHVzKS5zdWJzdHIoMSkucmVwbGFjZSgvXFxkKi9nLCAneCcpXG5cdClcbn1cbmV4cG9ydCB2YXIgZ2V0UXVlcnlQYXJhbXNGcm9tVXJsID0gZnVuY3Rpb24gKHVybCkge1xuXHR2YXIgcmVzdWx0ID0ge31cblx0dmFyIGFyciA9IHVybC5zcGxpdCgnPycpXG5cdHZhciBxdWVyeVN0cmluZyA9IGFyclsxXSB8fCAnJ1xuXHRpZiAocXVlcnlTdHJpbmcpIHtcblx0XHRyZXN1bHQgPSBnZXRVUkxTZWFyY2hQYXJhbXMoJz8nICsgcXVlcnlTdHJpbmcpXG5cdH1cblx0cmV0dXJuIHJlc3VsdFxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGVyY2VudGFnZSh2YWx1ZSkge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMTAwXG59XG5cbmV4cG9ydCB2YXIgZXh0ZW5kID0gZnVuY3Rpb24gKG9iaikge1xuXHRzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0Zm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcblx0XHRcdGlmIChzb3VyY2VbcHJvcF0gIT09IHZvaWQgMCkge1xuXHRcdFx0XHRvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF1cblx0XHRcdH1cblx0XHR9XG5cdH0pXG5cdHJldHVybiBvYmpcbn1cbmV4cG9ydCB2YXIgZXh0ZW5kMkxldiA9IGZ1bmN0aW9uIChvYmopIHtcblx0c2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG5cdFx0XHRpZiAoc291cmNlW3Byb3BdICE9PSB2b2lkIDApIHtcblx0XHRcdFx0aWYgKGlzT2JqZWN0KHNvdXJjZVtwcm9wXSkgJiYgaXNPYmplY3Qob2JqW3Byb3BdKSkge1xuXHRcdFx0XHRcdGV4dGVuZChvYmpbcHJvcF0sIHNvdXJjZVtwcm9wXSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcblx0cmV0dXJuIG9ialxufVxuXG5leHBvcnQgdmFyIHRyaW0gPSBmdW5jdGlvbiAoc3RyKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKVxufVxuZXhwb3J0IHZhciBpc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0aWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cdHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59XG5leHBvcnQgdmFyIGlzRW1wdHlPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdGlmIChpc09iamVjdChvYmopKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG5cbmV4cG9ydCB2YXIgaXNKU09OU3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuXHR0cnkge1xuXHRcdEpTT04ucGFyc2Uoc3RyKVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0cmV0dXJuIHRydWVcbn1cbmV4cG9ydCB2YXIgc2FmZUpTT05QYXJzZSA9IGZ1bmN0aW9uIChzdHIpIHtcblx0dmFyIHZhbCA9IG51bGxcblx0dHJ5IHtcblx0XHR2YWwgPSBKU09OLnBhcnNlKHN0cilcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdHJldHVybiB2YWxcbn1cbmV4cG9ydCB2YXIgbm93ID1cblx0RGF0ZS5ub3cgfHxcblx0ZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHR9XG5leHBvcnQgdmFyIHRocm90dGxlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcblx0dmFyIHRpbWVvdXQsIGNvbnRleHQsIGFyZ3MsIHJlc3VsdFxuXHR2YXIgcHJldmlvdXMgPSAwXG5cdGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG5cblx0dmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdHRpbWVvdXQgPSBudWxsXG5cdFx0cmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuXHRcdGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsXG5cdH1cblxuXHR2YXIgdGhyb3R0bGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdGFyZ3MgPSBhcmd1bWVudHNcblx0XHR2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblx0XHRpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93XG5cdFx0Ly/kuIvmrKHop6blj5EgZnVuYyDliankvZnnmoTml7bpl7Rcblx0XHR2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cylcblx0XHRjb250ZXh0ID0gdGhpc1xuXHRcdC8vIOWmguaenOayoeacieWJqeS9meeahOaXtumXtOS6huaIluiAheS9oOaUueS6huezu+e7n+aXtumXtFxuXHRcdGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG5cdFx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dClcblx0XHRcdFx0dGltZW91dCA9IG51bGxcblx0XHRcdH1cblx0XHRcdHByZXZpb3VzID0gbm93XG5cdFx0XHRyZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG5cdFx0XHRpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbFxuXHRcdH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcblx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpXG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXHR0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KVxuXHRcdHByZXZpb3VzID0gMFxuXHRcdHRpbWVvdXQgPSBudWxsXG5cdH1cblx0cmV0dXJuIHRocm90dGxlZFxufVxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuLyoqXG4gKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZHJhdyBpcyBzdWNjZXNzZnVsXG4gKiBAcGFyYW0gdGhyZXNob2xkIGJldHdlZW4gMCBhbmQgMTAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwZXJmb3JtRHJhdyh0aHJlc2hvbGQpIHtcblx0cmV0dXJuIHRocmVzaG9sZCAhPT0gMCAmJiBNYXRoLnJhbmRvbSgpICogMTAwIDw9IHRocmVzaG9sZFxufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeVBhdGgoc291cmNlLCBwYXRoKSB7XG5cdHZhciBwYXRoQXJyID0gcGF0aC5zcGxpdCgnLicpXG5cdHdoaWxlIChwYXRoQXJyLmxlbmd0aCkge1xuXHRcdHZhciBrZXkgPSBwYXRoQXJyLnNoaWZ0KClcblx0XHRpZiAoc291cmNlICYmIGtleSBpbiBzb3VyY2UgJiYgaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcblx0XHRcdHNvdXJjZSA9IHNvdXJjZVtrZXldXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHR9XG5cdH1cblx0cmV0dXJuIHNvdXJjZVxufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhTbmFrZUNhc2VLZXlzKGNhbmRpZGF0ZSkge1xuXHRjb25zdCByZXN1bHQgPSB7fVxuXHRPYmplY3Qua2V5cyhjYW5kaWRhdGUpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdHJlc3VsdFt0b1NuYWtlQ2FzZShrZXkpXSA9IGRlZXBTbmFrZUNhc2UoY2FuZGlkYXRlW2tleV0pXG5cdH0pXG5cdHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBTbmFrZUNhc2UoY2FuZGlkYXRlKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KGNhbmRpZGF0ZSkpIHtcblx0XHRyZXR1cm4gY2FuZGlkYXRlLm1hcCgodmFsdWUpID0+IGRlZXBTbmFrZUNhc2UodmFsdWUpKVxuXHR9XG5cdGlmICh0eXBlb2YgY2FuZGlkYXRlID09PSAnb2JqZWN0JyAmJiBjYW5kaWRhdGUgIT09IG51bGwpIHtcblx0XHRyZXR1cm4gd2l0aFNuYWtlQ2FzZUtleXMoY2FuZGlkYXRlKVxuXHR9XG5cdHJldHVybiBjYW5kaWRhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvU25ha2VDYXNlKHdvcmQpIHtcblx0cmV0dXJuIHdvcmRcblx0XHQucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24gKHVwcGVyY2FzZUxldHRlciwgaW5kZXgpIHtcblx0XHRcdHJldHVybiAoaW5kZXggIT09IDAgPyAnXycgOiAnJykgKyB1cHBlcmNhc2VMZXR0ZXIudG9Mb3dlckNhc2UoKVxuXHRcdH0pXG5cdFx0LnJlcGxhY2UoLy0vZywgJ18nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUm93RGF0YShzdHIpIHtcblx0aWYgKCFpc1N0cmluZyhzdHIpKSByZXR1cm4gc3RyXG5cdHZhciByZWcgPSAvW1xccz0sXCJdL2dcblx0cmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UocmVnLCBmdW5jdGlvbiAod29yZCkge1xuXHRcdHJldHVybiAnXFxcXCcgKyB3b3JkXG5cdH0pXG59XG5leHBvcnQgdmFyIHVybFBhcnNlID0gZnVuY3Rpb24gKHBhcmEpIHtcblx0dmFyIFVSTFBhcnNlciA9IGZ1bmN0aW9uIChhKSB7XG5cdFx0dGhpcy5fZmllbGRzID0ge1xuXHRcdFx0VXNlcm5hbWU6IDQsXG5cdFx0XHRQYXNzd29yZDogNSxcblx0XHRcdFBvcnQ6IDcsXG5cdFx0XHRQcm90b2NvbDogMixcblx0XHRcdEhvc3Q6IDYsXG5cdFx0XHRQYXRoOiA4LFxuXHRcdFx0VVJMOiAwLFxuXHRcdFx0UXVlcnlTdHJpbmc6IDksXG5cdFx0XHRGcmFnbWVudDogMTAsXG5cdFx0fVxuXHRcdHRoaXMuX3ZhbHVlcyA9IHt9XG5cdFx0dGhpcy5fcmVnZXggPSBudWxsXG5cdFx0dGhpcy5fcmVnZXggPSAvXigoXFx3Kyk6XFwvXFwvKT8oKFxcdyspOj8oXFx3Kyk/QCk/KFteXFwvXFw/Ol0rKTo/KFxcZCspPyhcXC8/W15cXD8jXSspP1xcPz8oW14jXSspPyM/KFxcdyopL1xuXG5cdFx0aWYgKHR5cGVvZiBhICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9wYXJzZShhKVxuXHRcdH1cblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLnNldFVybCA9IGZ1bmN0aW9uIChhKSB7XG5cdFx0dGhpcy5fcGFyc2UoYSlcblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLl9pbml0VmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIGEgaW4gdGhpcy5fZmllbGRzKSB7XG5cdFx0XHR0aGlzLl92YWx1ZXNbYV0gPSAnJ1xuXHRcdH1cblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLmFkZFF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24gKHF1ZXJ5T2JqKSB7XG5cdFx0aWYgKHR5cGVvZiBxdWVyeU9iaiAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHR2YXIgcXVlcnkgPSB0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgfHwgJydcblx0XHRmb3IgKHZhciBpIGluIHF1ZXJ5T2JqKSB7XG5cdFx0XHRpZiAobmV3IFJlZ0V4cChpICsgJ1teJl0rJykudGVzdChxdWVyeSkpIHtcblx0XHRcdFx0cXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoaSArICdbXiZdKycpLCBpICsgJz0nICsgcXVlcnlPYmpbaV0pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAocXVlcnkuc2xpY2UoLTEpID09PSAnJicpIHtcblx0XHRcdFx0XHRxdWVyeSA9IHF1ZXJ5ICsgaSArICc9JyArIHF1ZXJ5T2JqW2ldXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHF1ZXJ5ID09PSAnJykge1xuXHRcdFx0XHRcdFx0cXVlcnkgPSBpICsgJz0nICsgcXVlcnlPYmpbaV1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cXVlcnkgPSBxdWVyeSArICcmJyArIGkgKyAnPScgKyBxdWVyeU9ialtpXVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgPSBxdWVyeVxuXHR9XG5cdFVSTFBhcnNlci5wcm90b3R5cGUuZ2V0UGFyc2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlc1xuXHR9XG5cdFVSTFBhcnNlci5wcm90b3R5cGUuZ2V0VXJsID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciB1cmwgPSAnJ1xuXHRcdHVybCArPSB0aGlzLl92YWx1ZXMuT3JpZ2luXG5cdFx0dXJsICs9IHRoaXMuX3ZhbHVlcy5Qb3J0ID8gJzonICsgdGhpcy5fdmFsdWVzLlBvcnQgOiAnJ1xuXHRcdHVybCArPSB0aGlzLl92YWx1ZXMuUGF0aFxuXHRcdHVybCArPSB0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgPyAnPycgKyB0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgOiAnJ1xuXHRcdHJldHVybiB1cmxcblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLl9wYXJzZSA9IGZ1bmN0aW9uIChhKSB7XG5cdFx0dGhpcy5faW5pdFZhbHVlcygpXG5cdFx0dmFyIGIgPSB0aGlzLl9yZWdleC5leGVjKGEpXG5cdFx0aWYgKCFiKSB7XG5cdFx0XHR0aHJvdyAnRFBVUkxQYXJzZXI6Ol9wYXJzZSAtPiBJbnZhbGlkIFVSTCdcblx0XHR9XG5cdFx0Zm9yICh2YXIgYyBpbiB0aGlzLl9maWVsZHMpIHtcblx0XHRcdGlmICh0eXBlb2YgYlt0aGlzLl9maWVsZHNbY11dICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRoaXMuX3ZhbHVlc1tjXSA9IGJbdGhpcy5fZmllbGRzW2NdXVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl92YWx1ZXNbJ0hvc3RuYW1lJ10gPSB0aGlzLl92YWx1ZXNbJ0hvc3QnXS5yZXBsYWNlKC86XFxkKyQvLCAnJylcblx0XHR0aGlzLl92YWx1ZXNbJ09yaWdpbiddID1cblx0XHRcdHRoaXMuX3ZhbHVlc1snUHJvdG9jb2wnXSArICc6Ly8nICsgdGhpcy5fdmFsdWVzWydIb3N0bmFtZSddXG5cdH1cblx0cmV0dXJuIG5ldyBVUkxQYXJzZXIocGFyYSlcbn1cbmV4cG9ydCBjb25zdCBnZXRPd25PYmplY3RLZXlzID0gZnVuY3Rpb24gKG9iaiwgaXNFbnVtZXJhYmxlKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuXHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopXG5cdFx0aWYgKGlzRW51bWVyYWJsZSkge1xuXHRcdFx0c3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG5cdFx0XHRcdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgdCkuZW51bWVyYWJsZVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0a2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpXG5cdH1cblx0cmV0dXJuIGtleXNcbn1cbmV4cG9ydCBjb25zdCBkZWZpbmVPYmplY3QgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG5cdGlmIChrZXkgaW4gb2JqKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG5cdFx0XHR2YWx1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHR9KVxuXHR9IGVsc2Uge1xuXHRcdG9ialtrZXldID0gdmFsdWVcblx0fVxuXHRyZXR1cm4gb2JqXG59XG5leHBvcnQgY29uc3QgZGVlcE1peE9iamVjdCA9IGZ1bmN0aW9uICh0YXJnZXRPYmopIHtcblx0Zm9yICh2YXIgdCA9IDE7IHQgPCBhcmd1bWVudHMubGVuZ3RoOyB0KyspIHtcblx0XHR2YXIgdGFyZ2V0ID0gYXJndW1lbnRzW3RdICE9IG51bGwgPyBhcmd1bWVudHNbdF0gOiB7fVxuXHRcdGlmICh0ICUgMikge1xuXHRcdFx0Z2V0T3duT2JqZWN0S2V5cyhPYmplY3QodGFyZ2V0KSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuXHRcdFx0XHRkZWZpbmVPYmplY3QodGFyZ2V0T2JqLCB0LCB0YXJnZXRbdF0pXG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG5cdFx0XHRcdFx0dGFyZ2V0T2JqLFxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHRhcmdldCksXG5cdFx0XHRcdClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGdldE93bk9iamVjdEtleXMoT2JqZWN0KHRhcmdldCkpLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoXG5cdFx0XHRcdFx0XHR0YXJnZXRPYmosXG5cdFx0XHRcdFx0XHR0LFxuXHRcdFx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHQpLFxuXHRcdFx0XHRcdClcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhcmdldE9ialxufVxuIiwiaW1wb3J0IHsgbXNUb05zLCBleHRlbmQyTGV2IH0gZnJvbSAnLi4vLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vY29yZS9saWZlQ3ljbGUnXG5pbXBvcnQgeyBSdW1FdmVudFR5cGUgfSBmcm9tICcuLi8uLi9oZWxwZXIvZW51bXMnXG5pbXBvcnQgeyB0cmFja0FjdGlvbnMgfSBmcm9tICcuL3RyYWNrQWN0aW9ucydcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0QWN0aW9uQ29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24sIFZ1ZSkge1xuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5BVVRPX0FDVElPTl9DT01QTEVURUQsXG5cdFx0ZnVuY3Rpb24gKGFjdGlvbikge1xuXHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShcblx0XHRcdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJBV19SVU1fRVZFTlRfQ09MTEVDVEVELFxuXHRcdFx0XHRwcm9jZXNzQWN0aW9uKGFjdGlvbiksXG5cdFx0XHQpXG5cdFx0fSxcblx0KVxuXHRpZiAoY29uZmlndXJhdGlvbi50cmFja0ludGVyYWN0aW9ucykge1xuXHRcdHRyYWNrQWN0aW9ucyhsaWZlQ3ljbGUsIFZ1ZSlcblx0fVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzQWN0aW9uKGFjdGlvbikge1xuXHR2YXIgYXV0b0FjdGlvblByb3BlcnRpZXMgPSB7XG5cdFx0YWN0aW9uOiB7XG5cdFx0XHRlcnJvcjoge1xuXHRcdFx0XHRjb3VudDogYWN0aW9uLmNvdW50cy5lcnJvckNvdW50LFxuXHRcdFx0fSxcblx0XHRcdGlkOiBhY3Rpb24uaWQsXG5cdFx0XHRsb2FkaW5nVGltZTogbXNUb05zKGFjdGlvbi5kdXJhdGlvbiksXG5cdFx0XHRsb25nX3Rhc2s6IHtcblx0XHRcdFx0Y291bnQ6IGFjdGlvbi5jb3VudHMubG9uZ1Rhc2tDb3VudCxcblx0XHRcdH0sXG5cdFx0XHRyZXNvdXJjZToge1xuXHRcdFx0XHRjb3VudDogYWN0aW9uLmNvdW50cy5yZXNvdXJjZUNvdW50LFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9XG5cdHZhciBhY3Rpb25FdmVudCA9IGV4dGVuZDJMZXYoXG5cdFx0e1xuXHRcdFx0YWN0aW9uOiB7XG5cdFx0XHRcdHRhcmdldDoge1xuXHRcdFx0XHRcdG5hbWU6IGFjdGlvbi5uYW1lLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0eXBlOiBhY3Rpb24udHlwZSxcblx0XHRcdH0sXG5cdFx0XHRkYXRlOiBhY3Rpb24uc3RhcnRDbG9ja3MsXG5cdFx0XHR0eXBlOiBSdW1FdmVudFR5cGUuQUNUSU9OLFxuXHRcdH0sXG5cdFx0YXV0b0FjdGlvblByb3BlcnRpZXMsXG5cdClcblx0cmV0dXJuIHtcblx0XHRyYXdSdW1FdmVudDogYWN0aW9uRXZlbnQsXG5cdFx0c3RhcnRUaW1lOiBhY3Rpb24uc3RhcnRDbG9ja3MsXG5cdH1cbn1cbiIsImltcG9ydCB7XG5cdGVsYXBzZWQsXG5cdG5vdyxcblx0VVVJRCxcblx0Z2V0TWV0aG9kcyxcblx0aXNPYmplY3QsXG5cdGtleXMsXG59IGZyb20gJy4uLy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IHsgdHJhY2tFdmVudENvdW50cyB9IGZyb20gJy4uL3RyYWNrRXZlbnRDb3VudHMnXG5pbXBvcnQgeyB3YWl0SWRsZVBhZ2VBY3Rpdml0eSB9IGZyb20gJy4uL3RyYWNrUGFnZUFjdGl2ZWl0ZXMnXG5pbXBvcnQgeyBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2VudW1zJ1xuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrQWN0aW9ucyhsaWZlQ3ljbGUsIFZ1ZSkge1xuXHR2YXIgYWN0aW9uID0gc3RhcnRBY3Rpb25NYW5hZ2VtZW50KGxpZmVDeWNsZSlcblxuXHQvLyBOZXcgdmlld3MgdHJpZ2dlciB0aGUgZGlzY2FyZCBvZiB0aGUgY3VycmVudCBwZW5kaW5nIEFjdGlvblxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKExpZmVDeWNsZUV2ZW50VHlwZS5WSUVXX0NSRUFURUQsIGZ1bmN0aW9uICgpIHtcblx0XHRhY3Rpb24uZGlzY2FyZEN1cnJlbnQoKVxuXHR9KVxuXHR2YXIgb3JpZ2luVnVlRXh0ZW5kID0gVnVlLmV4dGVuZFxuXG5cdFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAodnVlT3B0aW9ucykge1xuXHRcdC8vIG1ldGhvZHMg5pa55rOVXG5cdFx0aWYgKHZ1ZU9wdGlvbnMubWV0aG9kcykge1xuXHRcdFx0Y29uc3QgdnVlTWV0aG9kcyA9IE9iamVjdC5rZXlzKHZ1ZU9wdGlvbnMubWV0aG9kcylcblx0XHRcdHZ1ZU1ldGhvZHMuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuXHRcdFx0XHRjbGlja1Byb3h5KFxuXHRcdFx0XHRcdHZ1ZU9wdGlvbnMubWV0aG9kcyxcblx0XHRcdFx0XHRtZXRob2ROYW1lLFxuXHRcdFx0XHRcdGZ1bmN0aW9uIChfYWN0aW9uKSB7XG5cdFx0XHRcdFx0XHRhY3Rpb24uY3JlYXRlKF9hY3Rpb24udHlwZSwgX2FjdGlvbi5uYW1lKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bGlmZUN5Y2xlLFxuXHRcdFx0XHQpXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGNvbnN0IG9yaWdpbk1ldGhvZHMgPSBnZXRNZXRob2RzKHZ1ZU9wdGlvbnMpXG5cdFx0b3JpZ2luTWV0aG9kcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XG5cdFx0XHRjbGlja1Byb3h5KFxuXHRcdFx0XHR2dWVPcHRpb25zLFxuXHRcdFx0XHRtZXRob2ROYW1lLFxuXHRcdFx0XHRmdW5jdGlvbiAoX2FjdGlvbikge1xuXHRcdFx0XHRcdGFjdGlvbi5jcmVhdGUoX2FjdGlvbi50eXBlLCBfYWN0aW9uLm5hbWUpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxpZmVDeWNsZSxcblx0XHRcdClcblx0XHR9KVxuXHRcdHJldHVybiBvcmlnaW5WdWVFeHRlbmQuY2FsbCh0aGlzLCB2dWVPcHRpb25zKVxuXHR9XG5cdC8vIHZhciBvcmlnaW5QYWdlID0gUGFnZVxuXHQvLyBQYWdlID0gZnVuY3Rpb24gKHBhZ2UpIHtcblx0Ly8gXHRjb25zdCBtZXRob2RzID0gZ2V0TWV0aG9kcyhwYWdlKVxuXHQvLyBcdG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuXHQvLyBcdFx0Y2xpY2tQcm94eShcblx0Ly8gXHRcdFx0cGFnZSxcblx0Ly8gXHRcdFx0bWV0aG9kTmFtZSxcblx0Ly8gXHRcdFx0ZnVuY3Rpb24gKF9hY3Rpb24pIHtcblx0Ly8gXHRcdFx0XHRhY3Rpb24uY3JlYXRlKF9hY3Rpb24udHlwZSwgX2FjdGlvbi5uYW1lKVxuXHQvLyBcdFx0XHR9LFxuXHQvLyBcdFx0XHRsaWZlQ3ljbGUsXG5cdC8vIFx0XHQpXG5cdC8vIFx0fSlcblx0Ly8gXHRyZXR1cm4gb3JpZ2luUGFnZShwYWdlKVxuXHQvLyB9XG5cdC8vIHZhciBvcmlnaW5Db21wb25lbnQgPSBDb21wb25lbnRcblx0Ly8gQ29tcG9uZW50ID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXHQvLyBcdGNvbnN0IG1ldGhvZHMgPSBnZXRNZXRob2RzKGNvbXBvbmVudClcblx0Ly8gXHRtZXRob2RzLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcblx0Ly8gXHRcdGNsaWNrUHJveHkoY29tcG9uZW50LCBtZXRob2ROYW1lLCBmdW5jdGlvbiAoX2FjdGlvbikge1xuXHQvLyBcdFx0XHRhY3Rpb24uY3JlYXRlKF9hY3Rpb24udHlwZSwgX2FjdGlvbi5uYW1lKVxuXHQvLyBcdFx0fSlcblx0Ly8gXHR9KVxuXHQvLyBcdHJldHVybiBvcmlnaW5Db21wb25lbnQoY29tcG9uZW50KVxuXHQvLyB9XG5cdHJldHVybiB7XG5cdFx0c3RvcDogZnVuY3Rpb24gKCkge1xuXHRcdFx0YWN0aW9uLmRpc2NhcmRDdXJyZW50KClcblx0XHRcdC8vIHN0b3BMaXN0ZW5lcigpXG5cdFx0fSxcblx0fVxufVxuZnVuY3Rpb24gY2xpY2tQcm94eShwYWdlLCBtZXRob2ROYW1lLCBjYWxsYmFjaywgbGlmZUN5Y2xlKSB7XG5cdHZhciBvaXJnaW5NZXRob2QgPSBwYWdlW21ldGhvZE5hbWVdXG5cblx0cGFnZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCByZXN1bHQgPSBvaXJnaW5NZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHRcdHZhciBhY3Rpb24gPSB7fVxuXHRcdGlmIChpc09iamVjdChhcmd1bWVudHNbMF0pKSB7XG5cdFx0XHR2YXIgY3VycmVudFRhcmdldCA9IGFyZ3VtZW50c1swXS5jdXJyZW50VGFyZ2V0IHx8IHt9XG5cdFx0XHR2YXIgZGF0YXNldCA9IGN1cnJlbnRUYXJnZXQuZGF0YXNldCB8fCB7fVxuXHRcdFx0dmFyIGFjdGlvblR5cGUgPSBhcmd1bWVudHNbMF0udHlwZVxuXHRcdFx0aWYgKGFjdGlvblR5cGUgJiYgQWN0aW9uVHlwZVthY3Rpb25UeXBlXSkge1xuXHRcdFx0XHRhY3Rpb24udHlwZSA9IGFjdGlvblR5cGVcblx0XHRcdFx0YWN0aW9uLm5hbWUgPSBkYXRhc2V0Lm5hbWUgfHwgZGF0YXNldC5jb250ZW50IHx8IGRhdGFzZXQudHlwZVxuXHRcdFx0XHRjYWxsYmFjayhhY3Rpb24pXG5cdFx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlBBR0VfQUxJQVNfQUNUSU9OLCB0cnVlKVxuXHRcdFx0fSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnb25BZGRUb0Zhdm9yaXRlcycpIHtcblx0XHRcdFx0YWN0aW9uLnR5cGUgPSAnY2xpY2snXG5cdFx0XHRcdGFjdGlvbi5uYW1lID1cblx0XHRcdFx0XHQn5pS26JePICcgK1xuXHRcdFx0XHRcdCfmoIfpopg6ICcgK1xuXHRcdFx0XHRcdHJlc3VsdC50aXRsZSArXG5cdFx0XHRcdFx0KHJlc3VsdC5xdWVyeSA/ICcgcXVlcnk6ICcgKyByZXN1bHQucXVlcnkgOiAnJylcblx0XHRcdFx0Y2FsbGJhY2soYWN0aW9uKVxuXHRcdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5QQUdFX0FMSUFTX0FDVElPTiwgdHJ1ZSlcblx0XHRcdH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ29uU2hhcmVBcHBNZXNzYWdlJykge1xuXHRcdFx0XHRhY3Rpb24udHlwZSA9ICdjbGljaydcblx0XHRcdFx0YWN0aW9uLm5hbWUgPVxuXHRcdFx0XHRcdCfovazlj5EgJyArXG5cdFx0XHRcdFx0J+agh+mimDogJyArXG5cdFx0XHRcdFx0cmVzdWx0LnRpdGxlICtcblx0XHRcdFx0XHQocmVzdWx0LnBhdGggPyAnIHBhdGg6ICcgKyByZXN1bHQucGF0aCA6ICcnKVxuXHRcdFx0XHRjYWxsYmFjayhhY3Rpb24pXG5cdFx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlBBR0VfQUxJQVNfQUNUSU9OLCB0cnVlKVxuXHRcdFx0fSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnb25TaGFyZVRpbWVsaW5lJykge1xuXHRcdFx0XHRhY3Rpb24udHlwZSA9ICdjbGljaydcblx0XHRcdFx0YWN0aW9uLm5hbWUgPVxuXHRcdFx0XHRcdCfliIbkuqvliLDmnIvlj4vlnIggJyArXG5cdFx0XHRcdFx0J+agh+mimDogJyArXG5cdFx0XHRcdFx0cmVzdWx0LnRpdGxlICtcblx0XHRcdFx0XHQocmVzdWx0LnF1ZXJ5ID8gJyBxdWVyeTogJyArIHJlc3VsdC5xdWVyeSA6ICcnKVxuXHRcdFx0XHRjYWxsYmFjayhhY3Rpb24pXG5cdFx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlBBR0VfQUxJQVNfQUNUSU9OLCB0cnVlKVxuXHRcdFx0fSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnb25UYWJJdGVtVGFwJykge1xuXHRcdFx0XHR2YXIgaXRlbSA9IGFyZ3VtZW50cy5sZW5ndGggJiYgYXJndW1lbnRzWzBdXG5cdFx0XHRcdGFjdGlvbi50eXBlID0gJ2NsaWNrJ1xuXHRcdFx0XHRhY3Rpb24ubmFtZSA9XG5cdFx0XHRcdFx0J3RhYiAnICtcblx0XHRcdFx0XHQn5ZCN56ewOiAnICtcblx0XHRcdFx0XHRpdGVtLnRleHQgK1xuXHRcdFx0XHRcdChpdGVtLnBhZ2VQYXRoID8gJyDot7PovazliLA6ICcgKyBpdGVtLnBhZ2VQYXRoIDogJycpXG5cdFx0XHRcdGNhbGxiYWNrKGFjdGlvbilcblx0XHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9BTElBU19BQ1RJT04sIHRydWUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxufVxuZnVuY3Rpb24gc3RhcnRBY3Rpb25NYW5hZ2VtZW50KGxpZmVDeWNsZSkge1xuXHR2YXIgY3VycmVudEFjdGlvblxuXHR2YXIgY3VycmVudElkbGVQYWdlQWN0aXZpdHlTdWJzY3JpcHRpb25cblxuXHRyZXR1cm4ge1xuXHRcdGNyZWF0ZTogZnVuY3Rpb24gKHR5cGUsIG5hbWUpIHtcblx0XHRcdGlmIChjdXJyZW50QWN0aW9uKSB7XG5cdFx0XHRcdC8vIElnbm9yZSBhbnkgbmV3IGFjdGlvbiBpZiBhbm90aGVyIG9uZSBpcyBhbHJlYWR5IG9jY3VycmluZy5cblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHR2YXIgcGVuZGluZ0F1dG9BY3Rpb24gPSBuZXcgUGVuZGluZ0F1dG9BY3Rpb24obGlmZUN5Y2xlLCB0eXBlLCBuYW1lKVxuXG5cdFx0XHRjdXJyZW50QWN0aW9uID0gcGVuZGluZ0F1dG9BY3Rpb25cblx0XHRcdGN1cnJlbnRJZGxlUGFnZUFjdGl2aXR5U3Vic2NyaXB0aW9uID0gd2FpdElkbGVQYWdlQWN0aXZpdHkoXG5cdFx0XHRcdGxpZmVDeWNsZSxcblx0XHRcdFx0ZnVuY3Rpb24gKHBhcmFtcykge1xuXHRcdFx0XHRcdGlmIChwYXJhbXMuaGFkQWN0aXZpdHkpIHtcblx0XHRcdFx0XHRcdHBlbmRpbmdBdXRvQWN0aW9uLmNvbXBsZXRlKHBhcmFtcy5lbmRUaW1lKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwZW5kaW5nQXV0b0FjdGlvbi5kaXNjYXJkKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3VycmVudEFjdGlvbiA9IHVuZGVmaW5lZFxuXHRcdFx0XHR9LFxuXHRcdFx0KVxuXHRcdH0sXG5cdFx0ZGlzY2FyZEN1cnJlbnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChjdXJyZW50QWN0aW9uKSB7XG5cdFx0XHRcdGN1cnJlbnRJZGxlUGFnZUFjdGl2aXR5U3Vic2NyaXB0aW9uLnN0b3AoKVxuXHRcdFx0XHRjdXJyZW50QWN0aW9uLmRpc2NhcmQoKVxuXHRcdFx0XHRjdXJyZW50QWN0aW9uID0gdW5kZWZpbmVkXG5cdFx0XHR9XG5cdFx0fSxcblx0fVxufVxudmFyIFBlbmRpbmdBdXRvQWN0aW9uID0gZnVuY3Rpb24gKGxpZmVDeWNsZSwgdHlwZSwgbmFtZSkge1xuXHR0aGlzLmlkID0gVVVJRCgpXG5cdHRoaXMuc3RhcnRDbG9ja3MgPSBub3coKVxuXHR0aGlzLm5hbWUgPSBuYW1lXG5cdHRoaXMudHlwZSA9IHR5cGVcblx0dGhpcy5saWZlQ3ljbGUgPSBsaWZlQ3ljbGVcblx0dGhpcy5ldmVudENvdW50c1N1YnNjcmlwdGlvbiA9IHRyYWNrRXZlbnRDb3VudHMobGlmZUN5Y2xlKVxuXHR0aGlzLmxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLkFVVE9fQUNUSU9OX0NSRUFURUQsIHtcblx0XHRpZDogdGhpcy5pZCxcblx0XHRzdGFydENsb2NrczogdGhpcy5zdGFydENsb2Nrcyxcblx0fSlcbn1cblBlbmRpbmdBdXRvQWN0aW9uLnByb3RvdHlwZSA9IHtcblx0Y29tcGxldGU6IGZ1bmN0aW9uIChlbmRUaW1lKSB7XG5cdFx0dmFyIGV2ZW50Q291bnRzID0gdGhpcy5ldmVudENvdW50c1N1YnNjcmlwdGlvbi5ldmVudENvdW50c1xuXHRcdHRoaXMubGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuQVVUT19BQ1RJT05fQ09NUExFVEVELCB7XG5cdFx0XHRjb3VudHM6IHtcblx0XHRcdFx0ZXJyb3JDb3VudDogZXZlbnRDb3VudHMuZXJyb3JDb3VudCxcblx0XHRcdFx0bG9uZ1Rhc2tDb3VudDogZXZlbnRDb3VudHMubG9uZ1Rhc2tDb3VudCxcblx0XHRcdFx0cmVzb3VyY2VDb3VudDogZXZlbnRDb3VudHMucmVzb3VyY2VDb3VudCxcblx0XHRcdH0sXG5cdFx0XHRkdXJhdGlvbjogZWxhcHNlZCh0aGlzLnN0YXJ0Q2xvY2tzLCBlbmRUaW1lKSxcblx0XHRcdGlkOiB0aGlzLmlkLFxuXHRcdFx0bmFtZTogdGhpcy5uYW1lLFxuXHRcdFx0c3RhcnRDbG9ja3M6IHRoaXMuc3RhcnRDbG9ja3MsXG5cdFx0XHR0eXBlOiB0aGlzLnR5cGUsXG5cdFx0fSlcblx0XHR0aGlzLmV2ZW50Q291bnRzU3Vic2NyaXB0aW9uLnN0b3AoKVxuXHR9LFxuXHRkaXNjYXJkOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5saWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5BVVRPX0FDVElPTl9ESVNDQVJERUQpXG5cdFx0dGhpcy5ldmVudENvdW50c1N1YnNjcmlwdGlvbi5zdG9wKClcblx0fSxcbn1cbiIsImltcG9ydCB7IHJld3JpdGVBcHAgfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vY29yZS9saWZlQ3ljbGUnXG5pbXBvcnQgeyBSdW1FdmVudFR5cGUgfSBmcm9tICcuLi8uLi9oZWxwZXIvZW51bXMnXG5pbXBvcnQgeyBtc1RvTnMgfSBmcm9tICcuLi8uLi9oZWxwZXIvdXRpbHMnXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRBcHBDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbikge1xuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKExpZmVDeWNsZUV2ZW50VHlwZS5BUFBfVVBEQVRFLCBmdW5jdGlvbiAoYXBwaW5mbykge1xuXHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUkFXX1JVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0XHRwcm9jZXNzQXBwVXBkYXRlKGFwcGluZm8pLFxuXHRcdClcblx0fSlcblxuXHRyZXR1cm4gcmV3cml0ZUFwcChjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUpXG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBcHBVcGRhdGUoYXBwaW5mbykge1xuXHR2YXIgYXBwRXZlbnQgPSB7XG5cdFx0ZGF0ZTogYXBwaW5mby5zdGFydFRpbWUsXG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLkFQUCxcblx0XHRhcHA6IHtcblx0XHRcdHR5cGU6IGFwcGluZm8udHlwZSxcblx0XHRcdG5hbWU6IGFwcGluZm8ubmFtZSxcblx0XHRcdGlkOiBhcHBpbmZvLmlkLFxuXHRcdFx0ZHVyYXRpb246IG1zVG9OcyhhcHBpbmZvLmR1cmF0aW9uKSxcblx0XHR9LFxuXHR9XG5cdGNvbnNvbGUubG9nKGFwcEV2ZW50LCAnYXBwRXZlbnQ9PT09Jylcblx0cmV0dXJuIHtcblx0XHRyYXdSdW1FdmVudDogYXBwRXZlbnQsXG5cdFx0c3RhcnRUaW1lOiBhcHBpbmZvLnN0YXJ0VGltZSxcblx0fVxufVxuIiwiaW1wb3J0IHsgbm93LCBhcmVJbk9yZGVyLCBVVUlEIH0gZnJvbSAnLi4vLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vY29yZS9saWZlQ3ljbGUnXG5cbi8vIOWKq+aMgeWOn+Wwj+eoi+W6j0FwcOaWueazlVxuZXhwb3J0IHZhciBUSFJPVFRMRV9WSUVXX1VQREFURV9QRVJJT0QgPSAzMDAwXG5leHBvcnQgY29uc3Qgc3RhcnR1cFR5cGVzID0ge1xuXHRDT0xEOiAnY29sZCcsXG5cdEhPVDogJ2hvdCcsXG59XG5leHBvcnQgZnVuY3Rpb24gcmV3cml0ZUFwcChjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUsIFZ1ZSkge1xuXHRjb25zdCBvcmlnaW5BcHAgPSBBcHBcblx0dmFyIGFwcEluZm8gPSB7XG5cdFx0aXNTdGFydFVwOiBmYWxzZSwgLy8g5piv5ZCm5ZCv5YqoXG5cdH1cblx0dmFyIHN0YXJ0VGltZVxuXHRBcHAgPSBmdW5jdGlvbiAoYXBwKSB7XG5cdFx0c3RhcnRUaW1lID0gbm93KClcblx0XHQvLyDlkIjlubbmlrnms5XvvIzmj5LlhaXorrDlvZXohJrmnKxcblx0XHQ7WydvbkxhdW5jaCcsICdvblNob3cnLCAnb25IaWRlJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuXHRcdFx0Y29uc3QgdXNlckRlZmluZWRNZXRob2QgPSBhcHBbbWV0aG9kTmFtZV0gLy8g5pqC5a2Y55So5oi35a6a5LmJ55qE5pa55rOVXG5cdFx0XHRhcHBbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0XHRpZiAobWV0aG9kTmFtZSA9PT0gJ29uTGF1bmNoJykge1xuXHRcdFx0XHRcdGFwcEluZm8uaXNTdGFydFVwID0gdHJ1ZVxuXHRcdFx0XHRcdGFwcEluZm8uaXNIaWRlID0gZmFsc2Vcblx0XHRcdFx0XHRhcHBJbmZvLnN0YXJ0dXBUeXBlID0gc3RhcnR1cFR5cGVzLkNPTERcblx0XHRcdFx0fSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnb25TaG93Jykge1xuXHRcdFx0XHRcdGlmIChhcHBJbmZvLmlzU3RhcnRVcCAmJiBhcHBJbmZvLmlzSGlkZSkge1xuXHRcdFx0XHRcdFx0Ly8g5Yik5pat5piv54Ot5ZCv5YqoXG5cdFx0XHRcdFx0XHRhcHBJbmZvLnN0YXJ0dXBUeXBlID0gc3RhcnR1cFR5cGVzLkhPVFxuXHRcdFx0XHRcdFx0Ly8gYXBwVXBkYXRlKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ29uSGlkZScpIHtcblx0XHRcdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5BUFBfSElERSlcblx0XHRcdFx0XHRhcHBJbmZvLmlzSGlkZSA9IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdXNlckRlZmluZWRNZXRob2QgJiYgdXNlckRlZmluZWRNZXRob2QuY2FsbCh0aGlzLCBvcHRpb25zKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0cmV0dXJuIG9yaWdpbkFwcChhcHApXG5cdH1cblxuXHRzdGFydFBlcmZvcm1hbmNlT2JzZXJ2YWJsZShsaWZlQ3ljbGUpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0UGVyZm9ybWFuY2VPYnNlcnZhYmxlKGxpZmVDeWNsZSkge1xuXHR2YXIgc3Vic2NyaWJlID0gbGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUEVSRk9STUFOQ0VfRU5UUllfQ09MTEVDVEVELFxuXHRcdGZ1bmN0aW9uIChlbnRpdHlzKSB7XG5cdFx0XHQvLyDov4fmu6Tmjonlhbbku5bpobXpnaLnm5HlkKzvvIzlj6rkv53nlZnpppbmrKHlkK/liqhcblx0XHRcdHZhciBjb2RlRG93bmxvYWREdXJhdGlvblxuXHRcdFx0Y29uc3QgbGF1bmNoRW50aXR5ID0gZW50aXR5cy5maW5kKFxuXHRcdFx0XHQoZW50aXR5KSA9PlxuXHRcdFx0XHRcdGVudGl0eS5lbnRyeVR5cGUgPT09ICduYXZpZ2F0aW9uJyAmJlxuXHRcdFx0XHRcdGVudGl0eS5uYXZpZ2F0aW9uVHlwZSA9PT0gJ2FwcExhdW5jaCcsXG5cdFx0XHQpXG5cdFx0XHRpZiAodHlwZW9mIGxhdW5jaEVudGl0eSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuQVBQX1VQREFURSwge1xuXHRcdFx0XHRcdHN0YXJ0VGltZTogbGF1bmNoRW50aXR5LnN0YXJ0VGltZSxcblx0XHRcdFx0XHRuYW1lOiAn5ZCv5YqoJyxcblx0XHRcdFx0XHR0eXBlOiAnbGF1bmNoJyxcblx0XHRcdFx0XHRpZDogVVVJRCgpLFxuXHRcdFx0XHRcdGR1cmF0aW9uOiBsYXVuY2hFbnRpdHkuZHVyYXRpb24sXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzY3JpcHRlbnRpdHkgPSBlbnRpdHlzLmZpbmQoXG5cdFx0XHRcdChlbnRpdHkpID0+XG5cdFx0XHRcdFx0ZW50aXR5LmVudHJ5VHlwZSA9PT0gJ3NjcmlwdCcgJiYgZW50aXR5Lm5hbWUgPT09ICdldmFsdWF0ZVNjcmlwdCcsXG5cdFx0XHQpXG5cdFx0XHRpZiAodHlwZW9mIHNjcmlwdGVudGl0eSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuQVBQX1VQREFURSwge1xuXHRcdFx0XHRcdHN0YXJ0VGltZTogc2NyaXB0ZW50aXR5LnN0YXJ0VGltZSxcblx0XHRcdFx0XHRuYW1lOiAn6ISa5pys5rOo5YWlJyxcblx0XHRcdFx0XHR0eXBlOiAnc2NyaXB0X2luc2VydCcsXG5cdFx0XHRcdFx0aWQ6IFVVSUQoKSxcblx0XHRcdFx0XHRkdXJhdGlvbjogc2NyaXB0ZW50aXR5LmR1cmF0aW9uLFxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZmlyc3RFbnRpdHkgPSBlbnRpdHlzLmZpbmQoXG5cdFx0XHRcdChlbnRpdHkpID0+XG5cdFx0XHRcdFx0ZW50aXR5LmVudHJ5VHlwZSA9PT0gJ3JlbmRlcicgJiYgZW50aXR5Lm5hbWUgPT09ICdmaXJzdFJlbmRlcicsXG5cdFx0XHQpXG5cdFx0XHRpZiAoZmlyc3RFbnRpdHkgJiYgc2NyaXB0ZW50aXR5ICYmIGxhdW5jaEVudGl0eSkge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0IWFyZUluT3JkZXIoZmlyc3RFbnRpdHkuZHVyYXRpb24sIGxhdW5jaEVudGl0eS5kdXJhdGlvbikgfHxcblx0XHRcdFx0XHQhYXJlSW5PcmRlcihzY3JpcHRlbnRpdHkuZHVyYXRpb24sIGxhdW5jaEVudGl0eS5kdXJhdGlvbilcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdFx0Y29kZURvd25sb2FkRHVyYXRpb24gPVxuXHRcdFx0XHRcdGxhdW5jaEVudGl0eS5kdXJhdGlvbiAtIGZpcnN0RW50aXR5LmR1cmF0aW9uIC0gc2NyaXB0ZW50aXR5LmR1cmF0aW9uXG5cdFx0XHRcdC8vIOi1hOa6kOS4i+i9veiAl+aXtlxuXHRcdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5BUFBfVVBEQVRFLCB7XG5cdFx0XHRcdFx0c3RhcnRUaW1lOiBsYXVuY2hFbnRpdHkuc3RhcnRUaW1lLFxuXHRcdFx0XHRcdG5hbWU6ICflsI/nqIvluo/ljIXkuIvovb0nLFxuXHRcdFx0XHRcdHR5cGU6ICdwYWNrYWdlX2Rvd25sb2FkJyxcblx0XHRcdFx0XHRpZDogVVVJRCgpLFxuXHRcdFx0XHRcdGR1cmF0aW9uOiBjb2RlRG93bmxvYWREdXJhdGlvbixcblx0XHRcdFx0fSlcblx0XHRcdFx0Ly8g6LWE5rqQ5LiL6L295pe26Ze05pqC5pe25a6a5Li677ya6aaW5qyh5ZCv5Yqo5pe26Ze0LeiEmuacrOWKoOi9veaXtumXtC3liJ3mrKHmuLLmn5Pml7bpl7Rcblx0XHRcdH1cblx0XHR9LFxuXHQpXG5cdHJldHVybiB7XG5cdFx0c3RvcDogc3Vic2NyaWJlLnVuc3Vic2NyaWJlLFxuXHR9XG59XG4iLCJpbXBvcnQgeyBleHRlbmQyTGV2LCB3aXRoU25ha2VDYXNlS2V5cywgcGVyZm9ybURyYXcgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IFJ1bUV2ZW50VHlwZSB9IGZyb20gJy4uL2hlbHBlci9lbnVtcydcbmltcG9ydCBiYXNlSW5mbyBmcm9tICcuLi9jb3JlL2Jhc2VJbmZvJ1xuZnVuY3Rpb24gaXNUcmFja2VkKGNvbmZpZ3VyYXRpb24pIHtcblx0cmV0dXJuIHBlcmZvcm1EcmF3KGNvbmZpZ3VyYXRpb24uc2FtcGxlUmF0ZSlcbn1cbnZhciBTZXNzaW9uVHlwZSA9IHtcblx0U1lOVEhFVElDUzogJ3N5bnRoZXRpY3MnLFxuXHRVU0VSOiAndXNlcicsXG59XG5leHBvcnQgZnVuY3Rpb24gc3RhcnRSdW1Bc3NlbWJseShcblx0YXBwbGljYXRpb25JZCxcblx0Y29uZmlndXJhdGlvbixcblx0bGlmZUN5Y2xlLFxuXHRwYXJlbnRDb250ZXh0cyxcbikge1xuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5SQVdfUlVNX0VWRU5UX0NPTExFQ1RFRCxcblx0XHRmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0dmFyIHN0YXJ0VGltZSA9IGRhdGEuc3RhcnRUaW1lXG5cdFx0XHR2YXIgcmF3UnVtRXZlbnQgPSBkYXRhLnJhd1J1bUV2ZW50XG5cdFx0XHR2YXIgdmlld0NvbnRleHQgPSBwYXJlbnRDb250ZXh0cy5maW5kVmlldyhzdGFydFRpbWUpXG5cblx0XHRcdHZhciBkZXZpY2VDb250ZXh0ID0ge1xuXHRcdFx0XHRkZXZpY2U6IGJhc2VJbmZvLmRldmljZUluZm8sXG5cdFx0XHR9XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGlzVHJhY2tlZChjb25maWd1cmF0aW9uKSAmJlxuXHRcdFx0XHQodmlld0NvbnRleHQgfHwgcmF3UnVtRXZlbnQudHlwZSA9PT0gUnVtRXZlbnRUeXBlLkFQUClcblx0XHRcdCkge1xuXHRcdFx0XHR2YXIgYWN0aW9uQ29udGV4dCA9IHBhcmVudENvbnRleHRzLmZpbmRBY3Rpb24oc3RhcnRUaW1lKVxuXHRcdFx0XHR2YXIgcnVtQ29udGV4dCA9IHtcblx0XHRcdFx0XHRfZGQ6IHtcblx0XHRcdFx0XHRcdHNka05hbWU6IGNvbmZpZ3VyYXRpb24uc2RrTmFtZSxcblx0XHRcdFx0XHRcdHNka1ZlcnNpb246IGNvbmZpZ3VyYXRpb24uc2RrVmVyc2lvbixcblx0XHRcdFx0XHRcdGVudjogY29uZmlndXJhdGlvbi5lbnYsXG5cdFx0XHRcdFx0XHR2ZXJzaW9uOiBjb25maWd1cmF0aW9uLnZlcnNpb24sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0YWdzOiBjb25maWd1cmF0aW9uLnRhZ3MsXG5cdFx0XHRcdFx0YXBwbGljYXRpb246IHtcblx0XHRcdFx0XHRcdGlkOiBhcHBsaWNhdGlvbklkLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZGV2aWNlOiB7fSxcblx0XHRcdFx0XHRkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcblx0XHRcdFx0XHRzZXNzaW9uOiB7XG5cdFx0XHRcdFx0XHRpZDogYmFzZUluZm8uZ2V0U2Vzc2lvbklkKCksXG5cdFx0XHRcdFx0XHR0eXBlOiBTZXNzaW9uVHlwZS5VU0VSLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dXNlcjoge1xuXHRcdFx0XHRcdFx0dXNlcl9pZDogY29uZmlndXJhdGlvbi51c2VyX2lkIHx8IGJhc2VJbmZvLmdldENsaWVudElEKCksXG5cdFx0XHRcdFx0XHRpc19zaWduaW46IGNvbmZpZ3VyYXRpb24udXNlcl9pZCA/ICdUJyA6ICdGJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHJ1bUV2ZW50ID0gZXh0ZW5kMkxldihcblx0XHRcdFx0XHRydW1Db250ZXh0LFxuXHRcdFx0XHRcdGRldmljZUNvbnRleHQsXG5cdFx0XHRcdFx0dmlld0NvbnRleHQsXG5cdFx0XHRcdFx0YWN0aW9uQ29udGV4dCxcblx0XHRcdFx0XHRyYXdSdW1FdmVudCxcblx0XHRcdFx0KVxuXG5cdFx0XHRcdHZhciBzZXJ2ZXJSdW1FdmVudCA9IHdpdGhTbmFrZUNhc2VLZXlzKHJ1bUV2ZW50KVxuXHRcdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5SVU1fRVZFTlRfQ09MTEVDVEVELCBzZXJ2ZXJSdW1FdmVudClcblx0XHRcdH1cblx0XHR9LFxuXHQpXG59XG4iLCJpbXBvcnQgeyBzdGFydEF1dG9tYXRpY0Vycm9yQ29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL2NvcmUvZXJyb3JDb2xsZWN0aW9uJ1xuaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2VudW1zJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vY29yZS9saWZlQ3ljbGUnXG5pbXBvcnQge1xuXHR1cmxQYXJzZSxcblx0cmVwbGFjZU51bWJlckNoYXJCeVBhdGgsXG5cdGdldFN0YXR1c0dyb3VwLFxufSBmcm9tICcuLi8uLi9oZWxwZXIvdXRpbHMnXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRFcnJvckNvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdHJldHVybiBkb1N0YXJ0RXJyb3JDb2xsZWN0aW9uKFxuXHRcdGxpZmVDeWNsZSxcblx0XHRjb25maWd1cmF0aW9uLFxuXHRcdHN0YXJ0QXV0b21hdGljRXJyb3JDb2xsZWN0aW9uKGNvbmZpZ3VyYXRpb24pLFxuXHQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb1N0YXJ0RXJyb3JDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbiwgb2JzZXJ2YWJsZSkge1xuXHRvYnNlcnZhYmxlLnN1YnNjcmliZShmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRsaWZlQ3ljbGUubm90aWZ5KFxuXHRcdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJBV19SVU1fRVZFTlRfQ09MTEVDVEVELFxuXHRcdFx0cHJvY2Vzc0Vycm9yKGVycm9yKSxcblx0XHQpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFcnJvcihlcnJvcikge1xuXHR2YXIgcmVzb3VyY2UgPSBlcnJvci5yZXNvdXJjZVxuXHRpZiAocmVzb3VyY2UpIHtcblx0XHR2YXIgdXJsT2JqID0gdXJsUGFyc2UoZXJyb3IucmVzb3VyY2UudXJsKS5nZXRQYXJzZSgpXG5cdFx0cmVzb3VyY2UgPSB7XG5cdFx0XHRtZXRob2Q6IGVycm9yLnJlc291cmNlLm1ldGhvZCxcblx0XHRcdHN0YXR1czogZXJyb3IucmVzb3VyY2Uuc3RhdHVzQ29kZSxcblx0XHRcdHN0YXR1c0dyb3VwOiBnZXRTdGF0dXNHcm91cChlcnJvci5yZXNvdXJjZS5zdGF0dXNDb2RlKSxcblx0XHRcdHVybDogZXJyb3IucmVzb3VyY2UudXJsLFxuXHRcdFx0dXJsSG9zdDogdXJsT2JqLkhvc3QsXG5cdFx0XHR1cmxQYXRoOiB1cmxPYmouUGF0aCxcblx0XHRcdHVybFBhdGhHcm91cDogcmVwbGFjZU51bWJlckNoYXJCeVBhdGgodXJsT2JqLlBhdGgpLFxuXHRcdH1cblx0fVxuXHR2YXIgcmF3UnVtRXZlbnQgPSB7XG5cdFx0ZGF0ZTogZXJyb3Iuc3RhcnRUaW1lLFxuXHRcdGVycm9yOiB7XG5cdFx0XHRtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuXHRcdFx0cmVzb3VyY2U6IHJlc291cmNlLFxuXHRcdFx0c291cmNlOiBlcnJvci5zb3VyY2UsXG5cdFx0XHRzdGFjazogZXJyb3Iuc3RhY2ssXG5cdFx0XHR0eXBlOiBlcnJvci50eXBlLFxuXHRcdFx0c3RhcnR0aW1lOiBlcnJvci5zdGFydFRpbWUsXG5cdFx0fSxcblx0XHR0eXBlOiBSdW1FdmVudFR5cGUuRVJST1IsXG5cdH1cblx0cmV0dXJuIHtcblx0XHRyYXdSdW1FdmVudDogcmF3UnVtRXZlbnQsXG5cdFx0c3RhcnRUaW1lOiBlcnJvci5zdGFydFRpbWUsXG5cdH1cbn1cbiIsImltcG9ydCB7IGV4dGVuZCwgbm93LCB0aHJvdHRsZSwgVVVJRCwgaXNOdW1iZXIgfSBmcm9tICcuLi8uLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyB0cmFja0V2ZW50Q291bnRzIH0gZnJvbSAnLi4vdHJhY2tFdmVudENvdW50cydcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IHsgc2RrIH0gZnJvbSAnLi4vLi4vY29yZS9zZGsnXG5cbi8vIOWKq+aMgeWOn+Wwj+eoi+W6j0FwcOaWueazlVxuZXhwb3J0IHZhciBUSFJPVFRMRV9WSUVXX1VQREFURV9QRVJJT0QgPSAzMDAwXG5cbmV4cG9ydCBmdW5jdGlvbiByZXdyaXRlUGFnZShjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUsIFZ1ZSkge1xuXHR2YXIgb3JpZ2luVnVlRXh0ZW5kID0gVnVlLmV4dGVuZFxuXG5cdFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAodnVlT3B0aW9ucykge1xuXHRcdC8vIOWQiOW5tuaWueazle+8jOaPkuWFpeiusOW9leiEmuacrFxuXHRcdHZhciBjdXJyZW50Vmlldyxcblx0XHRcdHN0YXJ0VGltZSA9IG5vdygpXG5cdFx0O1snb25SZWFkeScsICdvblNob3cnLCAnb25Mb2FkJywgJ29uVW5sb2FkJywgJ29uSGlkZSddLmZvckVhY2goXG5cdFx0XHQobWV0aG9kTmFtZSkgPT4ge1xuXHRcdFx0XHRjb25zdCB1c2VyRGVmaW5lZE1ldGhvZCA9IHZ1ZU9wdGlvbnNbbWV0aG9kTmFtZV1cblx0XHRcdFx0dnVlT3B0aW9uc1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tcFR5cGUgIT09ICdwYWdlJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHVzZXJEZWZpbmVkTWV0aG9kICYmIHVzZXJEZWZpbmVkTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8g5Y+q5aSE55CGcGFnZeexu+Wei1xuXHRcdFx0XHRcdGlmIChtZXRob2ROYW1lID09PSAnb25TaG93JyB8fCBtZXRob2ROYW1lID09PSAnb25Mb2FkJykge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjdXJyZW50VmlldyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgYWN0aXZlUGFnZSA9IGdldEFjdGl2ZVBhZ2UoKVxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VmlldyA9IG5ld1ZpZXcoXG5cdFx0XHRcdFx0XHRcdFx0bGlmZUN5Y2xlLFxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2ZVBhZ2UgJiYgYWN0aXZlUGFnZS5yb3V0ZSxcblx0XHRcdFx0XHRcdFx0XHRzdGFydFRpbWUsXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjdXJyZW50VmlldyAmJiBjdXJyZW50Vmlldy5zZXRMb2FkRXZlbnRFbmQobWV0aG9kTmFtZSlcblxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdChtZXRob2ROYW1lID09PSAnb25VbmxvYWQnIHx8XG5cdFx0XHRcdFx0XHRcdG1ldGhvZE5hbWUgPT09ICdvbkhpZGUnIHx8XG5cdFx0XHRcdFx0XHRcdG1ldGhvZE5hbWUgPT09ICdvblNob3cnKSAmJlxuXHRcdFx0XHRcdFx0Y3VycmVudFZpZXdcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRWaWV3LnRyaWdnZXJVcGRhdGUoKVxuXHRcdFx0XHRcdFx0aWYgKG1ldGhvZE5hbWUgPT09ICdvblVubG9hZCcgfHwgbWV0aG9kTmFtZSA9PT0gJ29uSGlkZScpIHtcblx0XHRcdFx0XHRcdFx0Y3VycmVudFZpZXcuZW5kKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHVzZXJEZWZpbmVkTWV0aG9kICYmIHVzZXJEZWZpbmVkTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHQpXG5cdFx0cmV0dXJuIG9yaWdpblZ1ZUV4dGVuZC5jYWxsKHRoaXMsIHZ1ZU9wdGlvbnMpXG5cdH1cbn1cbmZ1bmN0aW9uIG5ld1ZpZXcobGlmZUN5Y2xlLCByb3V0ZSwgc3RhcnRUaW1lKSB7XG5cdGlmICh0eXBlb2Ygc3RhcnRUaW1lID09PSAndW5kZWZpbmVkJykge1xuXHRcdHN0YXJ0VGltZSA9IG5vdygpXG5cdH1cblx0dmFyIGlkID0gVVVJRCgpXG5cdHZhciBpc0FjdGl2ZSA9IHRydWVcblx0dmFyIGV2ZW50Q291bnRzID0ge1xuXHRcdGVycm9yQ291bnQ6IDAsXG5cdFx0cmVzb3VyY2VDb3VudDogMCxcblx0XHR1c2VyQWN0aW9uQ291bnQ6IDAsXG5cdH1cblx0dmFyIHNldGRhdGFDb3VudCA9IDBcblxuXHR2YXIgZG9jdW1lbnRWZXJzaW9uID0gMFxuXHR2YXIgc2V0ZGF0YUR1cmF0aW9uID0gMFxuXHR2YXIgbG9hZGluZ0R1cmF0aW9uID0gMFxuXHR2YXIgbG9hZGluZ1RpbWVcblx0dmFyIHNob3dUaW1lXG5cdHZhciBvbmxvYWQyb25zaG93VGltZVxuXHR2YXIgb25zaG93Mm9ucmVhZHlcblx0dmFyIHN0YXlUaW1lXG5cdHZhciBmcHQsIGZtcFxuXHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5WSUVXX0NSRUFURUQsIHtcblx0XHRpZCxcblx0XHRzdGFydFRpbWUsXG5cdFx0cm91dGUsXG5cdH0pXG5cdHZhciBzY2hlZHVsZVZpZXdVcGRhdGUgPSB0aHJvdHRsZShcblx0XHR0cmlnZ2VyVmlld1VwZGF0ZSxcblx0XHRUSFJPVFRMRV9WSUVXX1VQREFURV9QRVJJT0QsXG5cdFx0e1xuXHRcdFx0bGVhZGluZzogZmFsc2UsXG5cdFx0fSxcblx0KVxuXHR2YXIgY2FuY2VsU2NoZWR1bGVWaWV3VXBkYXRlID0gc2NoZWR1bGVWaWV3VXBkYXRlLmNhbmNlbFxuXHR2YXIgX3RyYWNrRXZlbnRDb3VudHMgPSB0cmFja0V2ZW50Q291bnRzKFxuXHRcdGxpZmVDeWNsZSxcblx0XHRmdW5jdGlvbiAobmV3RXZlbnRDb3VudHMpIHtcblx0XHRcdGV2ZW50Q291bnRzID0gbmV3RXZlbnRDb3VudHNcblx0XHRcdHNjaGVkdWxlVmlld1VwZGF0ZSgpXG5cdFx0fSxcblx0KVxuXHR2YXIgc3RvcEV2ZW50Q291bnRzVHJhY2tpbmcgPSBfdHJhY2tFdmVudENvdW50cy5zdG9wXG5cdHZhciBfdHJhY2tGcHRUaW1lID0gdHJhY2tGcHRUaW1lKGxpZmVDeWNsZSwgZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG5cdFx0ZnB0ID0gZHVyYXRpb25cblx0XHRzY2hlZHVsZVZpZXdVcGRhdGUoKVxuXHR9KVxuXHR2YXIgc3RvcEZwdFRyYWNraW5nID0gX3RyYWNrRnB0VGltZS5zdG9wXG5cdHZhciBfdHJhY2tTZXREYXRhVGltZSA9IHRyYWNrU2V0RGF0YVRpbWUobGlmZUN5Y2xlLCBmdW5jdGlvbiAoZHVyYXRpb24pIHtcblx0XHRpZiAoaXNOdW1iZXIoZHVyYXRpb24pKSB7XG5cdFx0XHRzZXRkYXRhRHVyYXRpb24gKz0gZHVyYXRpb25cblx0XHRcdHNldGRhdGFDb3VudCsrXG5cdFx0XHRzY2hlZHVsZVZpZXdVcGRhdGUoKVxuXHRcdH1cblx0fSlcblx0dmFyIHN0b3BTZXREYXRhVHJhY2tpbmcgPSBfdHJhY2tTZXREYXRhVGltZS5zdG9wXG5cdHZhciBfdHJhY2tMb2FkaW5nVGltZSA9IHRyYWNrTG9hZGluZ1RpbWUobGlmZUN5Y2xlLCBmdW5jdGlvbiAoZHVyYXRpb24pIHtcblx0XHRpZiAoaXNOdW1iZXIoZHVyYXRpb24pKSB7XG5cdFx0XHRsb2FkaW5nRHVyYXRpb24gPSBkdXJhdGlvblxuXHRcdFx0c2NoZWR1bGVWaWV3VXBkYXRlKClcblx0XHR9XG5cdH0pXG5cdHZhciBzdG9wTG9hZGluZ1RpbWVUcmFja2luZyA9IF90cmFja0xvYWRpbmdUaW1lLnN0b3BcblxuXHR2YXIgc2V0TG9hZEV2ZW50RW5kID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0XHRpZiAodHlwZSA9PT0gJ29uTG9hZCcpIHtcblx0XHRcdGxvYWRpbmdUaW1lID0gbm93KClcblx0XHRcdGxvYWRpbmdEdXJhdGlvbiA9IGxvYWRpbmdUaW1lIC0gc3RhcnRUaW1lXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAnb25TaG93Jykge1xuXHRcdFx0c2hvd1RpbWUgPSBub3coKVxuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2Ygb25sb2FkMm9uc2hvd1RpbWUgPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRcdHR5cGVvZiBsb2FkaW5nVGltZSAhPT0gJ3VuZGVmaW5lZCdcblx0XHRcdCkge1xuXHRcdFx0XHRvbmxvYWQyb25zaG93VGltZSA9IHNob3dUaW1lIC0gbG9hZGluZ1RpbWVcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdvblJlYWR5Jykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2Ygb25zaG93Mm9ucmVhZHkgPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRcdHR5cGVvZiBzaG93VGltZSAhPT0gJ3VuZGVmaW5lZCdcblx0XHRcdCkge1xuXHRcdFx0XHRvbnNob3cyb25yZWFkeSA9IG5vdygpIC0gc2hvd1RpbWVcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgZm1wID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRmbXAgPSBub3coKSAtIHN0YXJ0VGltZSAvLyDku47lvIDlj5HogIXop5LluqbnnIvvvIzlsI/nqIvluo/pppblsY/muLLmn5PlrozmiJDnmoTmoIflv5fmmK/pppbpobUgUGFnZS5vblJlYWR5IOS6i+S7tuinpuWPkeOAglxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ29uSGlkZScgfHwgdHlwZSA9PT0gJ29uVW5sb2FkJykge1xuXHRcdFx0aWYgKHR5cGVvZiBzaG93VGltZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0c3RheVRpbWUgPSBub3coKSAtIHNob3dUaW1lXG5cdFx0XHR9XG5cdFx0XHRpc0FjdGl2ZSA9IGZhbHNlXG5cdFx0fVxuXHRcdHRyaWdnZXJWaWV3VXBkYXRlKClcblx0fVxuXHRmdW5jdGlvbiB0cmlnZ2VyVmlld1VwZGF0ZSgpIHtcblx0XHRkb2N1bWVudFZlcnNpb24gKz0gMVxuXHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlZJRVdfVVBEQVRFRCwge1xuXHRcdFx0ZG9jdW1lbnRWZXJzaW9uOiBkb2N1bWVudFZlcnNpb24sXG5cdFx0XHRldmVudENvdW50czogZXZlbnRDb3VudHMsXG5cdFx0XHRpZDogaWQsXG5cdFx0XHRsb2FkaW5nVGltZTogbG9hZGluZ0R1cmF0aW9uLFxuXHRcdFx0c3RheVRpbWUsXG5cdFx0XHRvbmxvYWQyb25zaG93VGltZSxcblx0XHRcdG9uc2hvdzJvbnJlYWR5LFxuXHRcdFx0c2V0ZGF0YUR1cmF0aW9uLFxuXHRcdFx0c2V0ZGF0YUNvdW50LFxuXHRcdFx0Zm1wLFxuXHRcdFx0ZnB0LFxuXHRcdFx0c3RhcnRUaW1lOiBzdGFydFRpbWUsXG5cdFx0XHRyb3V0ZTogcm91dGUsXG5cdFx0XHRkdXJhdGlvbjogbm93KCkgLSBzdGFydFRpbWUsXG5cdFx0XHRpc0FjdGl2ZTogaXNBY3RpdmUsXG5cdFx0fSlcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHNjaGVkdWxlVXBkYXRlOiBzY2hlZHVsZVZpZXdVcGRhdGUsXG5cdFx0c2V0TG9hZEV2ZW50RW5kLFxuXHRcdHRyaWdnZXJVcGRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNhbmNlbFNjaGVkdWxlVmlld1VwZGF0ZSgpXG5cdFx0XHR0cmlnZ2VyVmlld1VwZGF0ZSgpXG5cdFx0fSxcblx0XHRlbmQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN0b3BFdmVudENvdW50c1RyYWNraW5nKClcblx0XHRcdHN0b3BGcHRUcmFja2luZygpXG5cdFx0XHRjYW5jZWxTY2hlZHVsZVZpZXdVcGRhdGUoKVxuXHRcdFx0c3RvcFNldERhdGFUcmFja2luZygpXG5cdFx0XHRzdG9wTG9hZGluZ1RpbWVUcmFja2luZygpXG5cdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5WSUVXX0VOREVELCB7IGVuZENsb2Nrczogbm93KCkgfSlcblx0XHR9LFxuXHR9XG59XG5mdW5jdGlvbiB0cmFja0ZwdFRpbWUobGlmZUN5Y2xlLCBjYWxsYmFjaykge1xuXHR2YXIgc3Vic2NyaWJlID0gbGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUEVSRk9STUFOQ0VfRU5UUllfQ09MTEVDVEVELFxuXHRcdGZ1bmN0aW9uIChlbnRpdHlzKSB7XG5cdFx0XHRjb25zdCBmaXJzdFJlbmRlckVudGl0eSA9IGVudGl0eXMuZmluZChcblx0XHRcdFx0KGVudGl0eSkgPT5cblx0XHRcdFx0XHRlbnRpdHkuZW50cnlUeXBlID09PSAncmVuZGVyJyAmJiBlbnRpdHkubmFtZSA9PT0gJ2ZpcnN0UmVuZGVyJyxcblx0XHRcdClcblxuXHRcdFx0aWYgKHR5cGVvZiBmaXJzdFJlbmRlckVudGl0eSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0Y2FsbGJhY2soZmlyc3RSZW5kZXJFbnRpdHkuZHVyYXRpb24pXG5cdFx0XHR9XG5cdFx0fSxcblx0KVxuXHRyZXR1cm4ge1xuXHRcdHN0b3A6IHN1YnNjcmliZS51bnN1YnNjcmliZSxcblx0fVxufVxuZnVuY3Rpb24gdHJhY2tMb2FkaW5nVGltZShsaWZlQ3ljbGUsIGNhbGxiYWNrKSB7XG5cdHZhciBzdWJzY3JpYmUgPSBsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5QRVJGT1JNQU5DRV9FTlRSWV9DT0xMRUNURUQsXG5cdFx0ZnVuY3Rpb24gKGVudGl0eXMpIHtcblx0XHRcdGNvbnN0IG5hdmlnYXRpb25Fbml0eSA9IGVudGl0eXMuZmluZChcblx0XHRcdFx0KGVudGl0eSkgPT4gZW50aXR5LmVudHJ5VHlwZSA9PT0gJ25hdmlnYXRpb24nLFxuXHRcdFx0KVxuXHRcdFx0aWYgKHR5cGVvZiBuYXZpZ2F0aW9uRW5pdHkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdGNhbGxiYWNrKG5hdmlnYXRpb25Fbml0eS5kdXJhdGlvbilcblx0XHRcdH1cblx0XHR9LFxuXHQpXG5cdHJldHVybiB7XG5cdFx0c3RvcDogc3Vic2NyaWJlLnVuc3Vic2NyaWJlLFxuXHR9XG59XG5mdW5jdGlvbiB0cmFja1NldERhdGFUaW1lKGxpZmVDeWNsZSwgY2FsbGJhY2spIHtcblx0dmFyIHN1YnNjcmliZSA9IGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlBBR0VfU0VUX0RBVEFfVVBEQVRFLFxuXHRcdGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRpZiAoIWRhdGEpIHJldHVyblxuXHRcdFx0Y2FsbGJhY2soZGF0YS51cGRhdGVFbmRUaW1lc3RhbXAgLSBkYXRhLnBlbmRpbmdTdGFydFRpbWVzdGFtcClcblx0XHR9LFxuXHQpXG5cdHJldHVybiB7XG5cdFx0c3RvcDogc3Vic2NyaWJlLnVuc3Vic2NyaWJlLFxuXHR9XG59XG5mdW5jdGlvbiBnZXRBY3RpdmVQYWdlKCkge1xuXHRjb25zdCBjdXJQYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG5cdGlmIChjdXJQYWdlcy5sZW5ndGgpIHtcblx0XHRyZXR1cm4gY3VyUGFnZXNbY3VyUGFnZXMubGVuZ3RoIC0gMV1cblx0fVxuXHRyZXR1cm4ge31cbn1cbiIsImltcG9ydCB7IHJld3JpdGVQYWdlIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCB7IFJ1bUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2hlbHBlci9lbnVtcydcbmltcG9ydCB7IG1zVG9OcyB9IGZyb20gJy4uLy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2NvcmUvbGlmZUN5Y2xlJ1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0Vmlld0NvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uLCBWdWUpIHtcblx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuVklFV19VUERBVEVELCBmdW5jdGlvbiAodmlldykge1xuXHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUkFXX1JVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0XHRwcm9jZXNzVmlld1VwZGF0ZSh2aWV3KSxcblx0XHQpXG5cdH0pXG5cblx0cmV0dXJuIHJld3JpdGVQYWdlKGNvbmZpZ3VyYXRpb24sIGxpZmVDeWNsZSwgVnVlKVxufVxuZnVuY3Rpb24gcHJvY2Vzc1ZpZXdVcGRhdGUodmlldykge1xuXHR2YXIgYXBkZXhMZXZlbFxuXHRpZiAodmlldy5mbXApIHtcblx0XHRhcGRleExldmVsID0gcGFyc2VJbnQoTnVtYmVyKHZpZXcuZm1wKSAvIDEwMDApXG5cdFx0YXBkZXhMZXZlbCA9IGFwZGV4TGV2ZWwgPiA5ID8gOSA6IGFwZGV4TGV2ZWxcblx0fVxuXHR2YXIgdmlld0V2ZW50ID0ge1xuXHRcdF9kZDoge1xuXHRcdFx0ZG9jdW1lbnRWZXJzaW9uOiB2aWV3LmRvY3VtZW50VmVyc2lvbixcblx0XHR9LFxuXHRcdGRhdGU6IHZpZXcuc3RhcnRUaW1lLFxuXHRcdHR5cGU6IFJ1bUV2ZW50VHlwZS5WSUVXLFxuXHRcdHBhZ2U6IHtcblx0XHRcdGFjdGlvbjoge1xuXHRcdFx0XHRjb3VudDogdmlldy5ldmVudENvdW50cy51c2VyQWN0aW9uQ291bnQsXG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IHtcblx0XHRcdFx0Y291bnQ6IHZpZXcuZXZlbnRDb3VudHMuZXJyb3JDb3VudCxcblx0XHRcdH0sXG5cdFx0XHRzZXRkYXRhOiB7XG5cdFx0XHRcdGNvdW50OiB2aWV3LnNldGRhdGFDb3VudCxcblx0XHRcdH0sXG5cdFx0XHRzZXRkYXRhX2R1cmF0aW9uOiBtc1RvTnModmlldy5zZXRkYXRhRHVyYXRpb24pLFxuXHRcdFx0bG9hZGluZ1RpbWU6IG1zVG9Ocyh2aWV3LmxvYWRpbmdUaW1lKSxcblx0XHRcdHN0YXlUaW1lOiBtc1RvTnModmlldy5zdGF5VGltZSksXG5cdFx0XHRvbmxvYWQyb25zaG93OiBtc1RvTnModmlldy5vbmxvYWQyb25zaG93VGltZSksXG5cdFx0XHRvbnNob3cyb25yZWFkeTogbXNUb05zKHZpZXcub25zaG93Mm9ucmVhZHkpLFxuXHRcdFx0ZnB0OiBtc1RvTnModmlldy5mcHQpLFxuXHRcdFx0Zm1wOiBtc1RvTnModmlldy5mbXApLFxuXHRcdFx0aXNBY3RpdmU6IHZpZXcuaXNBY3RpdmUsXG5cdFx0XHRhcGRleExldmVsLFxuXHRcdFx0Ly8gbG9uZ1Rhc2s6IHtcblx0XHRcdC8vICAgY291bnQ6IHZpZXcuZXZlbnRDb3VudHMubG9uZ1Rhc2tDb3VudFxuXHRcdFx0Ly8gfSxcblx0XHRcdHJlc291cmNlOiB7XG5cdFx0XHRcdGNvdW50OiB2aWV3LmV2ZW50Q291bnRzLnJlc291cmNlQ291bnQsXG5cdFx0XHR9LFxuXHRcdFx0dGltZVNwZW50OiBtc1RvTnModmlldy5kdXJhdGlvbiksXG5cdFx0fSxcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHJhd1J1bUV2ZW50OiB2aWV3RXZlbnQsXG5cdFx0c3RhcnRUaW1lOiB2aWV3LnN0YXJ0VGltZSxcblx0fVxufVxuIiwiaW1wb3J0IHsgT05FX01JTlVURSwgT05FX0hPVVIgfSBmcm9tICcuLi9oZWxwZXIvZW51bXMnXG5pbXBvcnQgeyBlYWNoLCBub3cgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmV4cG9ydCB2YXIgVklFV19DT05URVhUX1RJTUVfT1VUX0RFTEFZID0gNCAqIE9ORV9IT1VSXG5leHBvcnQgdmFyIENMRUFSX09MRF9DT05URVhUU19JTlRFUlZBTCA9IE9ORV9NSU5VVEVcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UGFyZW50Q29udGV4dHMobGlmZUN5Y2xlKSB7XG5cdHZhciBjdXJyZW50Vmlld1xuXHR2YXIgY3VycmVudEFjdGlvblxuXHR2YXIgcHJldmlvdXNWaWV3cyA9IFtdXG5cdHZhciBwcmV2aW91c0FjdGlvbnMgPSBbXVxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5WSUVXX0NSRUFURUQsXG5cdFx0ZnVuY3Rpb24gKGN1cnJlbnRDb250ZXh0KSB7XG5cdFx0XHRjdXJyZW50VmlldyA9IGN1cnJlbnRDb250ZXh0XG5cdFx0fSxcblx0KVxuXG5cdGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlZJRVdfVVBEQVRFRCxcblx0XHRmdW5jdGlvbiAoY3VycmVudENvbnRleHQpIHtcblx0XHRcdC8vIEEgdmlldyBjYW4gYmUgdXBkYXRlZCBhZnRlciBpdHMgZW5kLiAgV2UgaGF2ZSB0byBlbnN1cmUgdGhhdCB0aGUgdmlldyBiZWluZyB1cGRhdGVkIGlzIHRoZVxuXHRcdFx0Ly8gbW9zdCByZWNlbnRseSBjcmVhdGVkLlxuXHRcdFx0aWYgKGN1cnJlbnRWaWV3ICYmIGN1cnJlbnRWaWV3LmlkID09PSBjdXJyZW50Q29udGV4dC5pZCkge1xuXHRcdFx0XHRjdXJyZW50VmlldyA9IGN1cnJlbnRDb250ZXh0XG5cdFx0XHR9XG5cdFx0fSxcblx0KVxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKExpZmVDeWNsZUV2ZW50VHlwZS5WSUVXX0VOREVELCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdGlmIChjdXJyZW50Vmlldykge1xuXHRcdFx0cHJldmlvdXNWaWV3cy51bnNoaWZ0KHtcblx0XHRcdFx0ZW5kVGltZTogZGF0YS5lbmRDbG9ja3MsXG5cdFx0XHRcdGNvbnRleHQ6IGJ1aWxkQ3VycmVudFZpZXdDb250ZXh0KCksXG5cdFx0XHRcdHN0YXJ0VGltZTogY3VycmVudFZpZXcuc3RhcnRUaW1lLFxuXHRcdFx0fSlcblx0XHRcdGN1cnJlbnRWaWV3ID0gdW5kZWZpbmVkXG5cdFx0fVxuXHR9KVxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5BVVRPX0FDVElPTl9DUkVBVEVELFxuXHRcdGZ1bmN0aW9uIChjdXJyZW50Q29udGV4dCkge1xuXHRcdFx0Y3VycmVudEFjdGlvbiA9IGN1cnJlbnRDb250ZXh0XG5cdFx0fSxcblx0KVxuXG5cdGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLkFVVE9fQUNUSU9OX0NPTVBMRVRFRCxcblx0XHRmdW5jdGlvbiAoYWN0aW9uKSB7XG5cdFx0XHRpZiAoY3VycmVudEFjdGlvbikge1xuXHRcdFx0XHRwcmV2aW91c0FjdGlvbnMudW5zaGlmdCh7XG5cdFx0XHRcdFx0Y29udGV4dDogYnVpbGRDdXJyZW50QWN0aW9uQ29udGV4dCgpLFxuXHRcdFx0XHRcdGVuZFRpbWU6IGN1cnJlbnRBY3Rpb24uc3RhcnRDbG9ja3MgKyBhY3Rpb24uZHVyYXRpb24sXG5cdFx0XHRcdFx0c3RhcnRUaW1lOiBjdXJyZW50QWN0aW9uLnN0YXJ0Q2xvY2tzLFxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0Y3VycmVudEFjdGlvbiA9IHVuZGVmaW5lZFxuXHRcdH0sXG5cdClcblxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKExpZmVDeWNsZUV2ZW50VHlwZS5BVVRPX0FDVElPTl9ESVNDQVJERUQsIGZ1bmN0aW9uICgpIHtcblx0XHRjdXJyZW50QWN0aW9uID0gdW5kZWZpbmVkXG5cdH0pXG5cdGxpZmVDeWNsZS5zdWJzY3JpYmUoTGlmZUN5Y2xlRXZlbnRUeXBlLlNFU1NJT05fUkVORVdFRCwgZnVuY3Rpb24gKCkge1xuXHRcdHByZXZpb3VzVmlld3MgPSBbXVxuXHRcdHByZXZpb3VzQWN0aW9ucyA9IFtdXG5cdFx0Y3VycmVudFZpZXcgPSB1bmRlZmluZWRcblx0XHRjdXJyZW50QWN0aW9uID0gdW5kZWZpbmVkXG5cdH0pXG5cdHZhciBjbGVhck9sZENvbnRleHRzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cdFx0Y2xlYXJPbGRDb250ZXh0cyhwcmV2aW91c1ZpZXdzLCBWSUVXX0NPTlRFWFRfVElNRV9PVVRfREVMQVkpXG5cdH0sIENMRUFSX09MRF9DT05URVhUU19JTlRFUlZBTClcblxuXHRmdW5jdGlvbiBjbGVhck9sZENvbnRleHRzKHByZXZpb3VzQ29udGV4dHMsIHRpbWVPdXREZWxheSkge1xuXHRcdHZhciBvbGRUaW1lVGhyZXNob2xkID0gbm93KCkgLSB0aW1lT3V0RGVsYXlcblx0XHR3aGlsZSAoXG5cdFx0XHRwcmV2aW91c0NvbnRleHRzLmxlbmd0aCA+IDAgJiZcblx0XHRcdHByZXZpb3VzQ29udGV4dHNbcHJldmlvdXNDb250ZXh0cy5sZW5ndGggLSAxXS5zdGFydFRpbWUgPCBvbGRUaW1lVGhyZXNob2xkXG5cdFx0KSB7XG5cdFx0XHRwcmV2aW91c0NvbnRleHRzLnBvcCgpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGJ1aWxkQ3VycmVudEFjdGlvbkNvbnRleHQoKSB7XG5cdFx0cmV0dXJuIHsgdXNlckFjdGlvbjogeyBpZDogY3VycmVudEFjdGlvbi5pZCB9IH1cblx0fVxuXHRmdW5jdGlvbiBidWlsZEN1cnJlbnRWaWV3Q29udGV4dCgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cGFnZToge1xuXHRcdFx0XHRpZDogY3VycmVudFZpZXcuaWQsXG5cdFx0XHRcdHJlZmVyZXI6XG5cdFx0XHRcdFx0KHByZXZpb3VzVmlld3MubGVuZ3RoICYmXG5cdFx0XHRcdFx0XHRwcmV2aW91c1ZpZXdzW3ByZXZpb3VzVmlld3MubGVuZ3RoIC0gMV0uY29udGV4dC5wYWdlLnJvdXRlKSB8fFxuXHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0cm91dGU6IGN1cnJlbnRWaWV3LnJvdXRlLFxuXHRcdFx0fSxcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBmaW5kQ29udGV4dChcblx0XHRidWlsZENvbnRleHQsXG5cdFx0cHJldmlvdXNDb250ZXh0cyxcblx0XHRjdXJyZW50Q29udGV4dCxcblx0XHRzdGFydFRpbWUsXG5cdCkge1xuXHRcdGlmIChzdGFydFRpbWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGN1cnJlbnRDb250ZXh0ID8gYnVpbGRDb250ZXh0KCkgOiB1bmRlZmluZWRcblx0XHR9XG5cdFx0aWYgKGN1cnJlbnRDb250ZXh0ICYmIHN0YXJ0VGltZSA+PSBjdXJyZW50Q29udGV4dC5zdGFydFRpbWUpIHtcblx0XHRcdHJldHVybiBidWlsZENvbnRleHQoKVxuXHRcdH1cblx0XHR2YXIgZmxhZyA9IHVuZGVmaW5lZFxuXHRcdGVhY2gocHJldmlvdXNDb250ZXh0cywgZnVuY3Rpb24gKHByZXZpb3VzQ29udGV4dCkge1xuXHRcdFx0aWYgKHN0YXJ0VGltZSA+IHByZXZpb3VzQ29udGV4dC5lbmRUaW1lKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdFx0aWYgKHN0YXJ0VGltZSA+PSBwcmV2aW91c0NvbnRleHQuc3RhcnRUaW1lKSB7XG5cdFx0XHRcdGZsYWcgPSBwcmV2aW91c0NvbnRleHQuY29udGV4dFxuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0cmV0dXJuIGZsYWdcblx0fVxuXG5cdHZhciBwYXJlbnRDb250ZXh0cyA9IHtcblx0XHRmaW5kVmlldzogZnVuY3Rpb24gKHN0YXJ0VGltZSkge1xuXHRcdFx0cmV0dXJuIGZpbmRDb250ZXh0KFxuXHRcdFx0XHRidWlsZEN1cnJlbnRWaWV3Q29udGV4dCxcblx0XHRcdFx0cHJldmlvdXNWaWV3cyxcblx0XHRcdFx0Y3VycmVudFZpZXcsXG5cdFx0XHRcdHN0YXJ0VGltZSxcblx0XHRcdClcblx0XHR9LFxuXHRcdGZpbmRBY3Rpb246IGZ1bmN0aW9uIChzdGFydFRpbWUpIHtcblx0XHRcdHJldHVybiBmaW5kQ29udGV4dChcblx0XHRcdFx0YnVpbGRDdXJyZW50QWN0aW9uQ29udGV4dCxcblx0XHRcdFx0cHJldmlvdXNBY3Rpb25zLFxuXHRcdFx0XHRjdXJyZW50QWN0aW9uLFxuXHRcdFx0XHRzdGFydFRpbWUsXG5cdFx0XHQpXG5cdFx0fSxcblxuXHRcdHN0b3A6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwoY2xlYXJPbGRDb250ZXh0c0ludGVydmFsKVxuXHRcdH0sXG5cdH1cblx0cmV0dXJuIHBhcmVudENvbnRleHRzXG59XG4iLCJpbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IHRyYWNrZXIgfSBmcm9tICcuLi9jb3JlL3NkaydcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFBhZ2VQZXJmb3JtYW5jZU9ic2VydmFibGUobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdGlmICghIXRyYWNrZXIuZ2V0UGVyZm9ybWFuY2UpIHtcblx0XHRjb25zdCBwZXJmb3JtYW5jZSA9IHRyYWNrZXIuZ2V0UGVyZm9ybWFuY2UoKVxuXHRcdGlmICghcGVyZm9ybWFuY2UgfHwgdHlwZW9mIHBlcmZvcm1hbmNlLmNyZWF0ZU9ic2VydmVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm5cblx0XHRjb25zdCBvYnNlcnZlciA9IHBlcmZvcm1hbmNlLmNyZWF0ZU9ic2VydmVyKChlbnRyeUxpc3QpID0+IHtcblx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRcdExpZmVDeWNsZUV2ZW50VHlwZS5QRVJGT1JNQU5DRV9FTlRSWV9DT0xMRUNURUQsXG5cdFx0XHRcdGVudHJ5TGlzdC5nZXRFbnRyaWVzKCksXG5cdFx0XHQpXG5cdFx0fSlcblx0XHRvYnNlcnZlci5vYnNlcnZlKHsgZW50cnlUeXBlczogWydyZW5kZXInLCAnc2NyaXB0JywgJ25hdmlnYXRpb24nXSB9KVxuXHR9XG59XG4iLCJpbXBvcnQgeyBzdGFydFhoclByb3h5IH0gZnJvbSAnLi4vY29yZS94aHJQcm94eSdcbmltcG9ydCB7IHN0YXJ0RG93bmxvYWRQcm94eSB9IGZyb20gJy4uL2NvcmUvZG93bmxvYWRQcm94eSdcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBpc0FsbG93ZWRSZXF1ZXN0VXJsIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9yZXNvdXJjZS9yZXNvdXJjZVV0aWxzJ1xudmFyIG5leHRSZXF1ZXN0SW5kZXggPSAxXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFJlcXVlc3RDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbikge1xuXHR0cmFja1hocihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pXG5cdHRyYWNrRG93bmxvYWQobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKVxufVxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoaGVhZGVyKSB7XG5cdC8vIOWkp+Wwj+WGmeWFvOWuuVxuXHRpZiAoIWlzT2JqZWN0KGhlYWRlcikpIHJldHVybiBoZWFkZXJcblx0dmFyIHJlcyA9IHt9XG5cdE9iamVjdC5rZXlzKGhlYWRlcikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmVzW2tleS50b0xvd2VyQ2FzZSgpXSA9IGhlYWRlcltrZXldXG5cdH0pXG5cdHJldHVybiByZXNcbn1cbmZ1bmN0aW9uIGdldEhlYWRlclN0cmluZyhoZWFkZXIpIHtcblx0aWYgKCFpc09iamVjdChoZWFkZXIpKSByZXR1cm4gaGVhZGVyXG5cdHZhciBoZWFkZXJTdHIgPSAnJ1xuXHRPYmplY3Qua2V5cyhoZWFkZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGhlYWRlclN0ciArPSBrZXkgKyAnOicgKyBoZWFkZXJba2V5XSArICc7J1xuXHR9KVxuXHRyZXR1cm4gaGVhZGVyU3RyXG59XG5leHBvcnQgZnVuY3Rpb24gdHJhY2tYaHIobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdHZhciB4aHJQcm94eSA9IHN0YXJ0WGhyUHJveHkoKVxuXHR4aHJQcm94eS5iZWZvcmVTZW5kKGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0aWYgKGlzQWxsb3dlZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgY29udGV4dC51cmwpKSB7XG5cdFx0XHRjb250ZXh0LnJlcXVlc3RJbmRleCA9IGdldE5leHRSZXF1ZXN0SW5kZXgoKVxuXHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUkVRVUVTVF9TVEFSVEVELCB7XG5cdFx0XHRcdHJlcXVlc3RJbmRleDogY29udGV4dC5yZXF1ZXN0SW5kZXgsXG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0eGhyUHJveHkub25SZXF1ZXN0Q29tcGxldGUoZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRpZiAoaXNBbGxvd2VkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCBjb250ZXh0LnVybCkpIHtcblx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlJFUVVFU1RfQ09NUExFVEVELCB7XG5cdFx0XHRcdGR1cmF0aW9uOiBjb250ZXh0LmR1cmF0aW9uLFxuXHRcdFx0XHRtZXRob2Q6IGNvbnRleHQubWV0aG9kLFxuXHRcdFx0XHRyZXF1ZXN0SW5kZXg6IGNvbnRleHQucmVxdWVzdEluZGV4LFxuXHRcdFx0XHRwZXJmb3JtYW5jZTogY29udGV4dC5wcm9maWxlLFxuXHRcdFx0XHRyZXNwb25zZTogY29udGV4dC5yZXNwb25zZSxcblx0XHRcdFx0c3RhcnRUaW1lOiBjb250ZXh0LnN0YXJ0VGltZSxcblx0XHRcdFx0c3RhdHVzOiBjb250ZXh0LnN0YXR1cyxcblx0XHRcdFx0dHlwZTogY29udGV4dC50eXBlLFxuXHRcdFx0XHR1cmw6IGNvbnRleHQudXJsLFxuXHRcdFx0fSlcblx0XHR9XG5cdH0pXG5cdHJldHVybiB4aHJQcm94eVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrRG93bmxvYWQobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdHZhciBkd29ubG9hZFByb3h5ID0gc3RhcnREb3dubG9hZFByb3h5KClcblx0ZHdvbmxvYWRQcm94eS5iZWZvcmVTZW5kKGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0aWYgKGlzQWxsb3dlZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgY29udGV4dC51cmwpKSB7XG5cdFx0XHRjb250ZXh0LnJlcXVlc3RJbmRleCA9IGdldE5leHRSZXF1ZXN0SW5kZXgoKVxuXHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUkVRVUVTVF9TVEFSVEVELCB7XG5cdFx0XHRcdHJlcXVlc3RJbmRleDogY29udGV4dC5yZXF1ZXN0SW5kZXgsXG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0ZHdvbmxvYWRQcm94eS5vblJlcXVlc3RDb21wbGV0ZShmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdGlmIChpc0FsbG93ZWRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIGNvbnRleHQudXJsKSkge1xuXHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUkVRVUVTVF9DT01QTEVURUQsIHtcblx0XHRcdFx0ZHVyYXRpb246IGNvbnRleHQuZHVyYXRpb24sXG5cdFx0XHRcdG1ldGhvZDogY29udGV4dC5tZXRob2QsXG5cdFx0XHRcdHJlcXVlc3RJbmRleDogY29udGV4dC5yZXF1ZXN0SW5kZXgsXG5cdFx0XHRcdHBlcmZvcm1hbmNlOiBjb250ZXh0LnByb2ZpbGUsXG5cdFx0XHRcdHJlc3BvbnNlOiBjb250ZXh0LnJlc3BvbnNlLFxuXHRcdFx0XHRzdGFydFRpbWU6IGNvbnRleHQuc3RhcnRUaW1lLFxuXHRcdFx0XHRzdGF0dXM6IGNvbnRleHQuc3RhdHVzLFxuXHRcdFx0XHR0eXBlOiBjb250ZXh0LnR5cGUsXG5cdFx0XHRcdHVybDogY29udGV4dC51cmwsXG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0cmV0dXJuIGR3b25sb2FkUHJveHlcbn1cbmZ1bmN0aW9uIGdldE5leHRSZXF1ZXN0SW5kZXgoKSB7XG5cdHZhciByZXN1bHQgPSBuZXh0UmVxdWVzdEluZGV4XG5cdG5leHRSZXF1ZXN0SW5kZXggKz0gMVxuXHRyZXR1cm4gcmVzdWx0XG59XG4iLCJpbXBvcnQge1xuXHRjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZUR1cmF0aW9uLFxuXHRjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZURldGFpbHMsXG5cdGNvbXB1dGVTaXplLFxufSBmcm9tICcuL3Jlc291cmNlVXRpbHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7XG5cdG1zVG9Ocyxcblx0ZXh0ZW5kMkxldixcblx0dXJsUGFyc2UsXG5cdGdldFF1ZXJ5UGFyYW1zRnJvbVVybCxcblx0cmVwbGFjZU51bWJlckNoYXJCeVBhdGgsXG5cdGpzb25TdHJpbmdpZnksXG5cdGdldFN0YXR1c0dyb3VwLFxufSBmcm9tICcuLi8uLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBSdW1FdmVudFR5cGUgfSBmcm9tICcuLi8uLi9oZWxwZXIvZW51bXMnXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRSZXNvdXJjZUNvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdGxpZmVDeWNsZS5zdWJzY3JpYmUoTGlmZUN5Y2xlRXZlbnRUeXBlLlJFUVVFU1RfQ09NUExFVEVELCBmdW5jdGlvbiAocmVxdWVzdCkge1xuXHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUkFXX1JVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0XHRwcm9jZXNzUmVxdWVzdChyZXF1ZXN0KSxcblx0XHQpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NSZXF1ZXN0KHJlcXVlc3QpIHtcblx0dmFyIHR5cGUgPSByZXF1ZXN0LnR5cGVcblx0dmFyIHRpbWluZyA9IHJlcXVlc3QucGVyZm9ybWFuY2Vcblx0dmFyIGNvcnJlc3BvbmRpbmdUaW1pbmdPdmVycmlkZXMgPSB0aW1pbmdcblx0XHQ/IGNvbXB1dGVQZXJmb3JtYW5jZUVudHJ5TWV0cmljcyh0aW1pbmcpXG5cdFx0OiB1bmRlZmluZWRcblx0dmFyIHVybE9iaiA9IHVybFBhcnNlKHJlcXVlc3QudXJsKS5nZXRQYXJzZSgpXG5cdHZhciBzdGFydFRpbWUgPSByZXF1ZXN0LnN0YXJ0VGltZVxuXHR2YXIgcmVzb3VyY2VFdmVudCA9IGV4dGVuZDJMZXYoXG5cdFx0e1xuXHRcdFx0ZGF0ZTogc3RhcnRUaW1lLFxuXHRcdFx0cmVzb3VyY2U6IHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0ZHVyYXRpb246IG1zVG9OcyhyZXF1ZXN0LmR1cmF0aW9uKSxcblx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0c3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcblx0XHRcdFx0c3RhdHVzR3JvdXA6IGdldFN0YXR1c0dyb3VwKHJlcXVlc3Quc3RhdHVzKSxcblx0XHRcdFx0dXJsOiByZXF1ZXN0LnVybCxcblx0XHRcdFx0dXJsSG9zdDogdXJsT2JqLkhvc3QsXG5cdFx0XHRcdHVybFBhdGg6IHVybE9iai5QYXRoLFxuXHRcdFx0XHR1cmxQYXRoR3JvdXA6IHJlcGxhY2VOdW1iZXJDaGFyQnlQYXRoKHVybE9iai5QYXRoKSxcblx0XHRcdFx0dXJsUXVlcnk6IGpzb25TdHJpbmdpZnkoZ2V0UXVlcnlQYXJhbXNGcm9tVXJsKHJlcXVlc3QudXJsKSksXG5cdFx0XHR9LFxuXHRcdFx0dHlwZTogUnVtRXZlbnRUeXBlLlJFU09VUkNFLFxuXHRcdH0sXG5cdFx0Y29ycmVzcG9uZGluZ1RpbWluZ092ZXJyaWRlcyxcblx0KVxuXHRyZXR1cm4geyBzdGFydFRpbWU6IHN0YXJ0VGltZSwgcmF3UnVtRXZlbnQ6IHJlc291cmNlRXZlbnQgfVxufVxuZnVuY3Rpb24gY29tcHV0ZVBlcmZvcm1hbmNlRW50cnlNZXRyaWNzKHRpbWluZykge1xuXHRyZXR1cm4ge1xuXHRcdHJlc291cmNlOiBleHRlbmQyTGV2KFxuXHRcdFx0e30sXG5cdFx0XHR7XG5cdFx0XHRcdGxvYWQ6IGNvbXB1dGVQZXJmb3JtYW5jZVJlc291cmNlRHVyYXRpb24odGltaW5nKSxcblx0XHRcdFx0c2l6ZTogY29tcHV0ZVNpemUodGltaW5nKSxcblx0XHRcdH0sXG5cdFx0XHRjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZURldGFpbHModGltaW5nKSxcblx0XHQpLFxuXHR9XG59XG4iLCJpbXBvcnQgeyBtc1RvTnMsIHRvQXJyYXksIGV4dGVuZCB9IGZyb20gJy4uLy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IGlzSW50YWtlUmVxdWVzdCB9IGZyb20gJy4uLy4uL2NvcmUvY29uZmlndXJhdGlvbidcblxuZnVuY3Rpb24gYXJlSW5PcmRlcigpIHtcblx0dmFyIG51bWJlcnMgPSB0b0FycmF5KGFyZ3VtZW50cylcblx0Zm9yICh2YXIgaSA9IDE7IGkgPCBudW1iZXJzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKG51bWJlcnNbaSAtIDFdID4gbnVtYmVyc1tpXSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZUR1cmF0aW9uKGVudHJ5KSB7XG5cdC8vIFNhZmFyaSBkdXJhdGlvbiBpcyBhbHdheXMgMCBvbiB0aW1pbmdzIGJsb2NrZWQgYnkgY3Jvc3Mgb3JpZ2luIHBvbGljaWVzLlxuXHRpZiAoZW50cnkuc3RhcnRUaW1lIDwgZW50cnkucmVzcG9uc2VFbmQpIHtcblx0XHRyZXR1cm4gbXNUb05zKGVudHJ5LnJlc3BvbnNlRW5kIC0gZW50cnkuc3RhcnRUaW1lKVxuXHR9XG59XG5cbi8vICBpbnRlcmZhY2UgUGVyZm9ybWFuY2VSZXNvdXJjZURldGFpbHMge1xuLy8gICByZWRpcmVjdD86IFBlcmZvcm1hbmNlUmVzb3VyY2VEZXRhaWxzRWxlbWVudFxuLy8gICBkbnM/OiBQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlsc0VsZW1lbnRcbi8vICAgY29ubmVjdD86IFBlcmZvcm1hbmNlUmVzb3VyY2VEZXRhaWxzRWxlbWVudFxuLy8gICBzc2w/OiBQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlsc0VsZW1lbnRcbi8vICAgZmlyc3RCeXRlOiBQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlsc0VsZW1lbnRcbi8vICAgZG93bmxvYWQ6IFBlcmZvcm1hbmNlUmVzb3VyY2VEZXRhaWxzRWxlbWVudFxuLy8gICBmbXA6XG4vLyB9XG4vLyBwYWdlX2ZtcFx0ZmxvYXRcdFx06aaW5bGP5pe26Ze0KOeUqOS6juihoemHj+eUqOaIt+S7gOS5iOaXtuWAmeeci+WIsOmhtemdoueahOS4u+imgeWGheWuuSnvvIzot59GQ1DnmoTml7bplb/pnZ7luLjmjqXov5HvvIzov5nph4zmiJHku6zlsLHnlKhGQ1DnmoTml7bpl7TkvZzkuLrpppblsY/ml7bpl7RcdGZpcnN0UGFpbnRDb250ZW50RW5kIC0gZmlyc3RQYWludENvbnRlbnRTdGFydFxuLy8gcGFnZV9mcHRcdGZsb2F0XHRcdOmmluasoea4suafk+aXtumXtO+8jOWNs+eZveWxj+aXtumXtCjku47or7fmsYLlvIDlp4vliLDmtY/op4jlmajlvIDlp4vop6PmnpDnrKzkuIDmiblIVE1M5paH5qGj5a2X6IqC55qE5pe26Ze05beu44CCKVx0cmVzcG9uc2VFbmQgLSBmZXRjaFN0YXJ0XG4vLyBwYWdlX3R0aVx0ZmxvYXRcdFx06aaW5qyh5Y+v5Lqk5LqS5pe26Ze0KOa1j+iniOWZqOWujOaIkOaJgOaciUhUTUzop6PmnpDlubbkuJTlrozmiJBET03mnoTlu7rvvIzmraTml7bmtY/op4jlmajlvIDlp4vliqDovb3otYTmupDjgIIpXHRkb21JbnRlcmFjdGl2ZSAtIGZldGNoU3RhcnRcbi8vIHBhZ2VfZmlyc3RieXRlXHRmbG9hdFx0XHTpppbljIXml7bpl7RcdHJlc3BvbnNlU3RhcnQgLSBkb21haW5Mb29rdXBTdGFydFxuLy8gcGFnZV9kb21fcmVhZHlcdGZsb2F0XHRcdERPTSBSZWFkeeaXtumXtCjlpoLmnpzpobXpnaLmnInlkIzmraXmiafooYznmoRKU++8jOWImeWQjOatpUpT5omn6KGM5pe26Ze0PXJlYWR5LXR0aeOAgilcdGRvbUNvbnRlbnRMb2FkRXZlbnRFbmQgLSBmZXRjaFN0YXJ0XG4vLyBwYWdlX2xvYWRcdGZsb2F0XHRcdOmhtemdouWujOWFqOWKoOi9veaXtumXtChsb2FkPemmluasoea4suafk+aXtumXtCtET03op6PmnpDogJfml7Yr5ZCM5q2lSlPmiafooYwr6LWE5rqQ5Yqg6L296ICX5pe244CCKVx0bG9hZEV2ZW50U3RhcnQgLSBmZXRjaFN0YXJ0XG4vLyBwYWdlX2Ruc1x0ZmxvYXRcdFx0ZG5z6Kej5p6Q5pe26Ze0XHRkb21haW5Mb29rdXBFbmQgLSBkb21haW5Mb29rdXBTdGFydFxuLy8gcGFnZV90Y3BcdGZsb2F0XHRcdHRjcOi/nuaOpeaXtumXtFx0Y29ubmVjdEVuZCAtIGNvbm5lY3RTdGFydFxuLy8gcGFnZV9zc2xcdGZsb2F0XHRcdHNzbOWuieWFqOi/nuaOpeaXtumXtCjku4XpgILnlKjkuo5odHRwcylcdGNvbm5lY3RFbmQgLSBzZWN1cmVDb25uZWN0aW9uU3RhcnRcbi8vIHBhZ2VfdHRmYlx0ZmxvYXRcdFx06K+35rGC5ZON5bqU6ICX5pe2XHRyZXNwb25zZVN0YXJ0IC0gcmVxdWVzdFN0YXJ0XG4vLyBwYWdlX3RyYW5zXHRmbG9hdFx0XHTlhoXlrrnkvKDovpPml7bpl7RcdHJlc3BvbnNlRW5kIC0gcmVzcG9uc2VTdGFydFxuLy8gcGFnZV9kb21cdGZsb2F0XHRcdERPTeino+aekOiAl+aXtlx0ZG9tSW50ZXJhY3RpdmUgLSByZXNwb25zZUVuZFxuLy8gcGFnZV9yZXNvdXJjZV9sb2FkX3RpbWVcdGZsb2F0XHRcdOi1hOa6kOWKoOi9veaXtumXtFx0bG9hZEV2ZW50U3RhcnQgLSBkb21Db250ZW50TG9hZGVkRXZlbnRFbmRcblxuLy8gIG5hdmlnYXRpb25TdGFydO+8muW9k+WJjea1j+iniOWZqOeql+WPo+eahOWJjeS4gOS4que9kemhteWFs+mXre+8jOWPkeeUn3VubG9hZOS6i+S7tuaXtueahFVuaXjmr6vnp5Lml7bpl7TmiLPjgILlpoLmnpzmsqHmnInliY3kuIDkuKrnvZHpobXvvIzliJnnrYnkuo5mZXRjaFN0YXJ05bGe5oCn44CCXG5cbi8vIMK3ICAgdW5sb2FkRXZlbnRTdGFydO+8muWmguaenOWJjeS4gOS4que9kemhteS4juW9k+WJjee9kemhteWxnuS6juWQjOS4gOS4quWfn+WQje+8jOWImei/lOWbnuWJjeS4gOS4que9kemhteeahHVubG9hZOS6i+S7tuWPkeeUn+aXtueahFVuaXjmr6vnp5Lml7bpl7TmiLPjgILlpoLmnpzmsqHmnInliY3kuIDkuKrnvZHpobXvvIzmiJbogIXkuYvliY3nmoTnvZHpobXot7PovazkuI3mmK/lnKjlkIzkuIDkuKrln5/lkI3lhoXvvIzliJnov5Tlm57lgLzkuLow44CCXG5cbi8vIMK3ICAgdW5sb2FkRXZlbnRFbmTvvJrlpoLmnpzliY3kuIDkuKrnvZHpobXkuI7lvZPliY3nvZHpobXlsZ7kuo7lkIzkuIDkuKrln5/lkI3vvIzliJnov5Tlm57liY3kuIDkuKrnvZHpobV1bmxvYWTkuovku7bnmoTlm57osIPlh73mlbDnu5PmnZ/ml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5rKh5pyJ5YmN5LiA5Liq572R6aG177yM5oiW6ICF5LmL5YmN55qE572R6aG16Lez6L2s5LiN5piv5Zyo5ZCM5LiA5Liq5Z+f5ZCN5YaF77yM5YiZ6L+U5Zue5YC85Li6MOOAglxuXG4vLyDCtyAgIHJlZGlyZWN0U3RhcnTvvJrov5Tlm57nrKzkuIDkuKpIVFRQ6Lez6L2s5byA5aeL5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAguWmguaenOayoeaciei3s+i9rO+8jOaIluiAheS4jeaYr+WQjOS4gOS4quWfn+WQjeWGhemDqOeahOi3s+i9rO+8jOWImei/lOWbnuWAvOS4ujDjgIJcblxuLy8gwrcgICByZWRpcmVjdEVuZO+8mui/lOWbnuacgOWQjuS4gOS4qkhUVFDot7Povaznu5PmnZ/ml7bvvIjljbPot7Povazlm57lupTnmoTmnIDlkI7kuIDkuKrlrZfoioLmjqXlj5flrozmiJDml7bvvInnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5rKh5pyJ6Lez6L2s77yM5oiW6ICF5LiN5piv5ZCM5LiA5Liq5Z+f5ZCN5YaF6YOo55qE6Lez6L2s77yM5YiZ6L+U5Zue5YC85Li6MOOAglxuXG4vLyDCtyAgIGZldGNoU3RhcnTvvJrov5Tlm57mtY/op4jlmajlh4blpIfkvb/nlKhIVFRQ6K+35rGC6K+75Y+W5paH5qGj5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAguivpeS6i+S7tuWcqOe9kemhteafpeivouacrOWcsOe8k+WtmOS5i+WJjeWPkeeUn+OAglxuXG4vLyDCtyAgIGRvbWFpbkxvb2t1cFN0YXJ077ya6L+U5Zue5Z+f5ZCN5p+l6K+i5byA5aeL5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAguWmguaenOS9v+eUqOaMgeS5hei/nuaOpe+8jOaIluiAheS/oeaBr+aYr+S7juacrOWcsOe8k+WtmOiOt+WPlueahO+8jOWImei/lOWbnuWAvOetieWQjOS6jmZldGNoU3RhcnTlsZ7mgKfnmoTlgLzjgIJcblxuLy8gwrcgICBkb21haW5Mb29rdXBFbmTvvJrov5Tlm57ln5/lkI3mn6Xor6Lnu5PmnZ/ml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5L2/55So5oyB5LmF6L+e5o6l77yM5oiW6ICF5L+h5oGv5piv5LuO5pys5Zyw57yT5a2Y6I635Y+W55qE77yM5YiZ6L+U5Zue5YC8562J5ZCM5LqOZmV0Y2hTdGFydOWxnuaAp+eahOWAvOOAglxuXG4vLyDCtyAgIGNvbm5lY3RTdGFydO+8mui/lOWbnkhUVFDor7fmsYLlvIDlp4vlkJHmnI3liqHlmajlj5HpgIHml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5L2/55So5oyB5LmF6L+e5o6l77yIcGVyc2lzdGVudCBjb25uZWN0aW9u77yJ77yM5YiZ6L+U5Zue5YC8562J5ZCM5LqOZmV0Y2hTdGFydOWxnuaAp+eahOWAvOOAglxuXG4vLyDCtyAgIGNvbm5lY3RFbmTvvJrov5Tlm57mtY/op4jlmajkuI7mnI3liqHlmajkuYvpl7TnmoTov57mjqXlu7rnq4vml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5bu656uL55qE5piv5oyB5LmF6L+e5o6l77yM5YiZ6L+U5Zue5YC8562J5ZCM5LqOZmV0Y2hTdGFydOWxnuaAp+eahOWAvOOAgui/nuaOpeW7uueri+aMh+eahOaYr+aJgOacieaPoeaJi+WSjOiupOivgei/h+eoi+WFqOmDqOe7k+adn+OAglxuXG4vLyDCtyAgIHNlY3VyZUNvbm5lY3Rpb25TdGFydO+8mui/lOWbnua1j+iniOWZqOS4juacjeWKoeWZqOW8gOWni+WuieWFqOmTvuaOpeeahOaPoeaJi+aXtueahFVuaXjmr6vnp5Lml7bpl7TmiLPjgILlpoLmnpzlvZPliY3nvZHpobXkuI3opoHmsYLlronlhajov57mjqXvvIzliJnov5Tlm54w44CCXG5cbi8vIMK3ICAgcmVxdWVzdFN0YXJ077ya6L+U5Zue5rWP6KeI5Zmo5ZCR5pyN5Yqh5Zmo5Y+R5Ye6SFRUUOivt+axguaXtu+8iOaIluW8gOWni+ivu+WPluacrOWcsOe8k+WtmOaXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICByZXNwb25zZVN0YXJ077ya6L+U5Zue5rWP6KeI5Zmo5LuO5pyN5Yqh5Zmo5pS25Yiw77yI5oiW5LuO5pys5Zyw57yT5a2Y6K+75Y+W77yJ56ys5LiA5Liq5a2X6IqC5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAglxuXG4vLyDCtyAgIHJlc3BvbnNlRW5k77ya6L+U5Zue5rWP6KeI5Zmo5LuO5pyN5Yqh5Zmo5pS25Yiw77yI5oiW5LuO5pys5Zyw57yT5a2Y6K+75Y+W77yJ5pyA5ZCO5LiA5Liq5a2X6IqC5pe277yI5aaC5p6c5Zyo5q2k5LmL5YmNSFRUUOi/nuaOpeW3sue7j+WFs+mXre+8jOWImei/lOWbnuWFs+mXreaXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICBkb21Mb2FkaW5n77ya6L+U5Zue5b2T5YmN572R6aG1RE9N57uT5p6E5byA5aeL6Kej5p6Q5pe277yI5Y2zRG9jdW1lbnQucmVhZHlTdGF0ZeWxnuaAp+WPmOS4uuKAnGxvYWRpbmfigJ3jgIHnm7jlupTnmoRyZWFkeXN0YXRlY2hhbmdl5LqL5Lu26Kem5Y+R5pe277yJ55qEVW5peOavq+enkuaXtumXtOaIs+OAglxuXG4vLyDCtyAgIGRvbUludGVyYWN0aXZl77ya6L+U5Zue5b2T5YmN572R6aG1RE9N57uT5p6E57uT5p2f6Kej5p6Q44CB5byA5aeL5Yqg6L295YaF5bWM6LWE5rqQ5pe277yI5Y2zRG9jdW1lbnQucmVhZHlTdGF0ZeWxnuaAp+WPmOS4uuKAnGludGVyYWN0aXZl4oCd44CB55u45bqU55qEcmVhZHlzdGF0ZWNoYW5nZeS6i+S7tuinpuWPkeaXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICBkb21Db250ZW50TG9hZGVkRXZlbnRTdGFydO+8mui/lOWbnuW9k+WJjee9kemhtURPTUNvbnRlbnRMb2FkZWTkuovku7blj5HnlJ/ml7bvvIjljbNET03nu5PmnoTop6PmnpDlrozmr5XjgIHmiYDmnInohJrmnKzlvIDlp4vov5DooYzml7bvvInnmoRVbml45q+r56eS5pe26Ze05oiz44CCXG5cbi8vIMK3ICAgZG9tQ29udGVudExvYWRlZEV2ZW50RW5k77ya6L+U5Zue5b2T5YmN572R6aG15omA5pyJ6ZyA6KaB5omn6KGM55qE6ISa5pys5omn6KGM5a6M5oiQ5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAglxuXG4vLyDCtyAgIGRvbUNvbXBsZXRl77ya6L+U5Zue5b2T5YmN572R6aG1RE9N57uT5p6E55Sf5oiQ5pe277yI5Y2zRG9jdW1lbnQucmVhZHlTdGF0ZeWxnuaAp+WPmOS4uuKAnGNvbXBsZXRl4oCd77yM5Lul5Y+K55u45bqU55qEcmVhZHlzdGF0ZWNoYW5nZeS6i+S7tuWPkeeUn+aXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICBsb2FkRXZlbnRTdGFydO+8mui/lOWbnuW9k+WJjee9kemhtWxvYWTkuovku7bnmoTlm57osIPlh73mlbDlvIDlp4vml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c6K+l5LqL5Lu26L+Y5rKh5pyJ5Y+R55Sf77yM6L+U5ZueMOOAglxuXG4vLyDCtyAgIGxvYWRFdmVudEVuZO+8mui/lOWbnuW9k+WJjee9kemhtWxvYWTkuovku7bnmoTlm57osIPlh73mlbDov5DooYznu5PmnZ/ml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c6K+l5LqL5Lu26L+Y5rKh5pyJ5Y+R55Sf77yM6L+U5ZueMFxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlscyhlbnRyeSkge1xuXHR2YXIgdmFsaWRFbnRyeSA9IHRvVmFsaWRFbnRyeShlbnRyeSlcblxuXHRpZiAoIXZhbGlkRW50cnkpIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdH1cblxuXHR2YXIgc3RhcnRUaW1lID0gdmFsaWRFbnRyeS5zdGFydFRpbWUsXG5cdFx0ZmV0Y2hTdGFydCA9IHZhbGlkRW50cnkuZmV0Y2hTdGFydCxcblx0XHRyZWRpcmVjdFN0YXJ0ID0gdmFsaWRFbnRyeS5yZWRpcmVjdFN0YXJ0LFxuXHRcdHJlZGlyZWN0RW5kID0gdmFsaWRFbnRyeS5yZWRpcmVjdEVuZCxcblx0XHRkb21haW5Mb29rdXBTdGFydCA9XG5cdFx0XHR2YWxpZEVudHJ5LmRvbWFpbkxvb2t1cFN0YXJ0IHx8IHZhbGlkRW50cnkuZG9tYWluTG9va1VwU3RhcnQsXG5cdFx0ZG9tYWluTG9va3VwRW5kID0gdmFsaWRFbnRyeS5kb21haW5Mb29rdXBFbmQgfHwgdmFsaWRFbnRyeS5kb21haW5Mb29rVXBFbmQsXG5cdFx0Y29ubmVjdFN0YXJ0ID0gdmFsaWRFbnRyeS5jb25uZWN0U3RhcnQsXG5cdFx0U1NMY29ubmVjdGlvblN0YXJ0ID0gdmFsaWRFbnRyeS5TU0xjb25uZWN0aW9uU3RhcnQsXG5cdFx0U1NMY29ubmVjdGlvbkVuZCA9IHZhbGlkRW50cnkuU1NMY29ubmVjdGlvbkVuZCxcblx0XHRjb25uZWN0RW5kID0gdmFsaWRFbnRyeS5jb25uZWN0RW5kLFxuXHRcdHJlcXVlc3RTdGFydCA9IHZhbGlkRW50cnkucmVxdWVzdFN0YXJ0LFxuXHRcdHJlc3BvbnNlU3RhcnQgPSB2YWxpZEVudHJ5LnJlc3BvbnNlU3RhcnQsXG5cdFx0cmVzcG9uc2VFbmQgPSB2YWxpZEVudHJ5LnJlc3BvbnNlRW5kXG5cdHZhciBkZXRhaWxzID0ge1xuXHRcdGZpcnN0Ynl0ZTogZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgZG9tYWluTG9va3VwU3RhcnQsIHJlc3BvbnNlU3RhcnQpLFxuXHRcdHRyYW5zOiBmb3JtYXRUaW1pbmcoc3RhcnRUaW1lLCByZXNwb25zZVN0YXJ0LCByZXNwb25zZUVuZCksXG5cdFx0dHRmYjogZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgcmVxdWVzdFN0YXJ0LCByZXNwb25zZVN0YXJ0KSxcblx0fVxuXHQvLyBNYWtlIHN1cmUgYSBjb25uZWN0aW9uIG9jY3VycmVkXG5cdGlmIChjb25uZWN0RW5kICE9PSBmZXRjaFN0YXJ0KSB7XG5cdFx0ZGV0YWlscy50Y3AgPSBmb3JtYXRUaW1pbmcoc3RhcnRUaW1lLCBjb25uZWN0U3RhcnQsIGNvbm5lY3RFbmQpXG5cblx0XHQvLyBNYWtlIHN1cmUgYSBzZWN1cmUgY29ubmVjdGlvbiBvY2N1cnJlZFxuXHRcdGlmIChhcmVJbk9yZGVyKGNvbm5lY3RTdGFydCwgU1NMY29ubmVjdGlvblN0YXJ0LCBTU0xjb25uZWN0aW9uRW5kKSkge1xuXHRcdFx0ZGV0YWlscy5zc2wgPSBmb3JtYXRUaW1pbmcoXG5cdFx0XHRcdHN0YXJ0VGltZSxcblx0XHRcdFx0U1NMY29ubmVjdGlvblN0YXJ0LFxuXHRcdFx0XHRTU0xjb25uZWN0aW9uRW5kLFxuXHRcdFx0KVxuXHRcdH1cblx0fVxuXG5cdC8vIE1ha2Ugc3VyZSBhIGRvbWFpbiBsb29rdXAgb2NjdXJyZWRcblx0aWYgKGRvbWFpbkxvb2t1cEVuZCAhPT0gZmV0Y2hTdGFydCkge1xuXHRcdGRldGFpbHMuZG5zID0gZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgZG9tYWluTG9va3VwU3RhcnQsIGRvbWFpbkxvb2t1cEVuZClcblx0fVxuXG5cdGlmIChoYXNSZWRpcmVjdGlvbihlbnRyeSkpIHtcblx0XHRkZXRhaWxzLnJlZGlyZWN0ID0gZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgcmVkaXJlY3RTdGFydCwgcmVkaXJlY3RFbmQpXG5cdH1cblxuXHRyZXR1cm4gZGV0YWlsc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9WYWxpZEVudHJ5KGVudHJ5KSB7XG5cdC8vIEVuc3VyZSB0aW1pbmdzIGFyZSBpbiB0aGUgcmlnaHQgb3JkZXIuIE9uIHRvcCBvZiBmaWx0ZXJpbmcgb3V0IHBvdGVudGlhbCBpbnZhbGlkXG5cdC8vIFJ1bVBlcmZvcm1hbmNlUmVzb3VyY2VUaW1pbmcsIGl0IHdpbGwgaWdub3JlIGVudHJpZXMgZnJvbSByZXF1ZXN0cyB3aGVyZSB0aW1pbmdzIGNhbm5vdCBiZVxuXHQvLyBjb2xsZWN0ZWQsIGZvciBleGFtcGxlIGNyb3NzIG9yaWdpbiByZXF1ZXN0cyB3aXRob3V0IGEgXCJUaW1pbmctQWxsb3ctT3JpZ2luXCIgaGVhZGVyIGFsbG93aW5nXG5cdC8vIGl0LlxuXHQvLyBwYWdlX2ZtcFx0ZmxvYXRcdFx06aaW5bGP5pe26Ze0KOeUqOS6juihoemHj+eUqOaIt+S7gOS5iOaXtuWAmeeci+WIsOmhtemdoueahOS4u+imgeWGheWuuSnvvIzot59GQ1DnmoTml7bplb/pnZ7luLjmjqXov5HvvIzov5nph4zmiJHku6zlsLHnlKhGQ1DnmoTml7bpl7TkvZzkuLrpppblsY/ml7bpl7RcdGZpcnN0UGFpbnRDb250ZW50RW5kIC0gZmlyc3RQYWludENvbnRlbnRTdGFydFxuXHQvLyBwYWdlX2ZwdFx0ZmxvYXRcdFx06aaW5qyh5riy5p+T5pe26Ze077yM5Y2z55m95bGP5pe26Ze0KOS7juivt+axguW8gOWni+WIsOa1j+iniOWZqOW8gOWni+ino+aekOesrOS4gOaJuUhUTUzmlofmoaPlrZfoioLnmoTml7bpl7Tlt67jgIIpXHRyZXNwb25zZUVuZCAtIGZldGNoU3RhcnRcblx0Ly8gcGFnZV90dGlcdGZsb2F0XHRcdOmmluasoeWPr+S6pOS6kuaXtumXtCjmtY/op4jlmajlrozmiJDmiYDmnIlIVE1M6Kej5p6Q5bm25LiU5a6M5oiQRE9N5p6E5bu677yM5q2k5pe25rWP6KeI5Zmo5byA5aeL5Yqg6L296LWE5rqQ44CCKVx0ZG9tSW50ZXJhY3RpdmUgLSBmZXRjaFN0YXJ0XG5cdC8vIHBhZ2VfZmlyc3RieXRlXHRmbG9hdFx0XHTpppbljIXml7bpl7RcdHJlc3BvbnNlU3RhcnQgLSBkb21haW5Mb29rdXBTdGFydFxuXHQvLyBwYWdlX2RvbV9yZWFkeVx0ZmxvYXRcdFx0RE9NIFJlYWR55pe26Ze0KOWmguaenOmhtemdouacieWQjOatpeaJp+ihjOeahEpT77yM5YiZ5ZCM5q2lSlPmiafooYzml7bpl7Q9cmVhZHktdHRp44CCKVx0ZG9tQ29udGVudExvYWRFdmVudEVuZCAtIGZldGNoU3RhcnRcblx0Ly8gcGFnZV9sb2FkXHRmbG9hdFx0XHTpobXpnaLlrozlhajliqDovb3ml7bpl7QobG9hZD3pppbmrKHmuLLmn5Pml7bpl7QrRE9N6Kej5p6Q6ICX5pe2K+WQjOatpUpT5omn6KGMK+i1hOa6kOWKoOi9veiAl+aXtuOAgilcdGxvYWRFdmVudFN0YXJ0IC0gZmV0Y2hTdGFydFxuXHQvLyBwYWdlX2Ruc1x0ZmxvYXRcdFx0ZG5z6Kej5p6Q5pe26Ze0XHRkb21haW5Mb29rdXBFbmQgLSBkb21haW5Mb29rdXBTdGFydFxuXHQvLyBwYWdlX3RjcFx0ZmxvYXRcdFx0dGNw6L+e5o6l5pe26Ze0XHRjb25uZWN0RW5kIC0gY29ubmVjdFN0YXJ0XG5cdC8vIHBhZ2Vfc3NsXHRmbG9hdFx0XHRzc2zlronlhajov57mjqXml7bpl7Qo5LuF6YCC55So5LqOaHR0cHMpXHRjb25uZWN0RW5kIC0gc2VjdXJlQ29ubmVjdGlvblN0YXJ0XG5cdC8vIHBhZ2VfdHRmYlx0ZmxvYXRcdFx06K+35rGC5ZON5bqU6ICX5pe2XHRyZXNwb25zZVN0YXJ0IC0gcmVxdWVzdFN0YXJ0XG5cdC8vIHBhZ2VfdHJhbnNcdGZsb2F0XHRcdOWGheWuueS8oOi+k+aXtumXtFx0cmVzcG9uc2VFbmQgLSByZXNwb25zZVN0YXJ0XG5cdC8vIHBhZ2VfZG9tXHRmbG9hdFx0XHRET03op6PmnpDogJfml7ZcdGRvbUludGVyYWN0aXZlIC0gcmVzcG9uc2VFbmRcblx0Ly8gcGFnZV9yZXNvdXJjZV9sb2FkX3RpbWVcdGZsb2F0XHRcdOi1hOa6kOWKoOi9veaXtumXtFx0bG9hZEV2ZW50U3RhcnQgLSBkb21Db250ZW50TG9hZGVkRXZlbnRFbmRcblx0aWYgKFxuXHRcdCFhcmVJbk9yZGVyKFxuXHRcdFx0ZW50cnkuc3RhcnRUaW1lLFxuXHRcdFx0ZW50cnkuZmV0Y2hTdGFydCxcblx0XHRcdGVudHJ5LmRvbWFpbkxvb2t1cFN0YXJ0LFxuXHRcdFx0ZW50cnkuZG9tYWluTG9va3VwRW5kLFxuXHRcdFx0ZW50cnkuY29ubmVjdFN0YXJ0LFxuXHRcdFx0ZW50cnkuY29ubmVjdEVuZCxcblx0XHRcdGVudHJ5LnJlcXVlc3RTdGFydCxcblx0XHRcdGVudHJ5LnJlc3BvbnNlU3RhcnQsXG5cdFx0XHRlbnRyeS5yZXNwb25zZUVuZCxcblx0XHQpXG5cdCkge1xuXHRcdHJldHVybiB1bmRlZmluZWRcblx0fVxuXG5cdGlmICghaGFzUmVkaXJlY3Rpb24oZW50cnkpKSB7XG5cdFx0cmV0dXJuIGVudHJ5XG5cdH1cblxuXHR2YXIgcmVkaXJlY3RTdGFydCA9IGVudHJ5LnJlZGlyZWN0U3RhcnRcblx0dmFyIHJlZGlyZWN0RW5kID0gZW50cnkucmVkaXJlY3RFbmRcblx0Ly8gRmlyZWZveCBkb2Vzbid0IHByb3ZpZGUgcmVkaXJlY3QgdGltaW5ncyBvbiBjcm9zcyBvcmlnaW4gcmVxdWVzdHMuXG5cdC8vIFByb3ZpZGUgYSBkZWZhdWx0IGZvciB0aG9zZS5cblx0aWYgKHJlZGlyZWN0U3RhcnQgPCBlbnRyeS5zdGFydFRpbWUpIHtcblx0XHRyZWRpcmVjdFN0YXJ0ID0gZW50cnkuc3RhcnRUaW1lXG5cdH1cblx0aWYgKHJlZGlyZWN0RW5kIDwgZW50cnkuc3RhcnRUaW1lKSB7XG5cdFx0cmVkaXJlY3RFbmQgPSBlbnRyeS5mZXRjaFN0YXJ0XG5cdH1cblxuXHQvLyBNYWtlIHN1cmUgcmVkaXJlY3QgdGltaW5ncyBhcmUgaW4gb3JkZXJcblx0aWYgKFxuXHRcdCFhcmVJbk9yZGVyKGVudHJ5LnN0YXJ0VGltZSwgcmVkaXJlY3RTdGFydCwgcmVkaXJlY3RFbmQsIGVudHJ5LmZldGNoU3RhcnQpXG5cdCkge1xuXHRcdHJldHVybiB1bmRlZmluZWRcblx0fVxuXHRyZXR1cm4gZXh0ZW5kKHt9LCBlbnRyeSwge1xuXHRcdHJlZGlyZWN0RW5kOiByZWRpcmVjdEVuZCxcblx0XHRyZWRpcmVjdFN0YXJ0OiByZWRpcmVjdFN0YXJ0LFxuXHR9KVxuXHQvLyByZXR1cm4ge1xuXHQvLyAgIC4uLmVudHJ5LFxuXHQvLyAgIHJlZGlyZWN0RW5kLFxuXHQvLyAgIHJlZGlyZWN0U3RhcnRcblx0Ly8gfVxufVxuXG5mdW5jdGlvbiBoYXNSZWRpcmVjdGlvbihlbnRyeSkge1xuXHQvLyBUaGUgb25seSB0aW1lIGZldGNoU3RhcnQgaXMgZGlmZmVyZW50IHRoYW4gc3RhcnRUaW1lIGlzIGlmIGEgcmVkaXJlY3Rpb24gb2NjdXJyZWQuXG5cdHJldHVybiBlbnRyeS5mZXRjaFN0YXJ0ICE9PSBlbnRyeS5zdGFydFRpbWVcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltaW5nKG9yaWdpbiwgc3RhcnQsIGVuZCkge1xuXHRyZXR1cm4gbXNUb05zKGVuZCAtIHN0YXJ0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNpemUoZW50cnkpIHtcblx0Ly8gTWFrZSBzdXJlIGEgcmVxdWVzdCBhY3R1YWxseSBvY2N1cnJlZFxuXHRpZiAoZW50cnkuc3RhcnRUaW1lIDwgZW50cnkucmVzcG9uc2VTdGFydCkge1xuXHRcdHJldHVybiBlbnRyeS5yZWNlaXZlZEJ5dGVkQ291bnRcblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FsbG93ZWRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHVybCkge1xuXHRyZXR1cm4gdXJsICYmICFpc0ludGFrZVJlcXVlc3QodXJsLCBjb25maWd1cmF0aW9uKVxufVxuIiwiaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29yZS9saWZlQ3ljbGUnXG5pbXBvcnQgeyBub3cgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5mdW5jdGlvbiByZXNldFNldERhdGEoZGF0YSwgY2FsbGJhY2ssIGxpZmVDeWNsZSwgbXBJbnN0YW5jZSkge1xuXHR2YXIgcGVuZGluZ1N0YXJ0VGltZXN0YW1wID0gbm93KClcblx0dmFyIF9jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcblx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5QQUdFX1NFVF9EQVRBX1VQREFURSwge1xuXHRcdFx0cGVuZGluZ1N0YXJ0VGltZXN0YW1wOiBwZW5kaW5nU3RhcnRUaW1lc3RhbXAsXG5cdFx0XHR1cGRhdGVFbmRUaW1lc3RhbXA6IG5vdygpLFxuXHRcdH0pXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y2FsbGJhY2suY2FsbChtcEluc3RhbmNlKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gX2NhbGxiYWNrXG59XG5leHBvcnQgZnVuY3Rpb24gc3RhcnRTZXREYXRhQ29sbG9jdGlvbihsaWZlQ3ljbGUsIFZ1ZSkge1xuXHR2YXIgb3JpZ2luVnVlRXh0ZW5kID0gVnVlLmV4dGVuZFxuXG5cdFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAodnVlT3B0aW9ucykge1xuXHRcdGNvbnN0IHVzZXJEZWZpbmVkTWV0aG9kID0gdnVlT3B0aW9uc1snb25Mb2FkJ11cblx0XHR2dWVPcHRpb25zWydvbkxvYWQnXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBtcEluc3RhbmNlID0gdGhpcy4kc2NvcGVcblx0XHRcdHZhciBzZXREYXRhID0gbXBJbnN0YW5jZS5zZXREYXRhXG5cblx0XHRcdC8vIOmHjeWGmXNldERhdGFcblx0XHRcdGlmICh0eXBlb2Ygc2V0RGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobXBJbnN0YW5jZS5fX3Byb3RvX18sICdzZXREYXRhJywge1xuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldERhdGEuY2FsbChcblx0XHRcdFx0XHRcdFx0bXBJbnN0YW5jZSxcblx0XHRcdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHRcdFx0cmVzZXRTZXREYXRhKGRhdGEsIGNhbGxiYWNrLCBsaWZlQ3ljbGUsIG1wSW5zdGFuY2UpLFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC8vIOi/memHjOaaguaXtui/meS5iOWkhOeQhlxuXHRcdFx0XHRtcEluc3RhbmNlLnNldERhdGEgPSBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcblx0XHRcdFx0XHRyZXR1cm4gc2V0RGF0YS5jYWxsKFxuXHRcdFx0XHRcdFx0bXBJbnN0YW5jZSxcblx0XHRcdFx0XHRcdGRhdGEsXG5cdFx0XHRcdFx0XHRyZXNldFNldERhdGEoZGF0YSwgY2FsbGJhY2ssIGxpZmVDeWNsZSwgbXBJbnN0YW5jZSksXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1c2VyRGVmaW5lZE1ldGhvZCAmJiB1c2VyRGVmaW5lZE1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdFx0fVxuXHRcdHJldHVybiBvcmlnaW5WdWVFeHRlbmQuY2FsbCh0aGlzLCB2dWVPcHRpb25zKVxuXHR9XG59XG4iLCJpbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29yZS9saWZlQ3ljbGUnXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFja0V2ZW50Q291bnRzKGxpZmVDeWNsZSwgY2FsbGJhY2spIHtcblx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRjYWxsYmFjayA9IG5vb3Bcblx0fVxuXHR2YXIgZXZlbnRDb3VudHMgPSB7XG5cdFx0ZXJyb3JDb3VudDogMCxcblx0XHRyZXNvdXJjZUNvdW50OiAwLFxuXHRcdGxvbmdUYXNrQ291bnQ6IDAsXG5cdFx0dXNlckFjdGlvbkNvdW50OiAwLFxuXHR9XG5cblx0dmFyIHN1YnNjcmlwdGlvbiA9IGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJBV19SVU1fRVZFTlRfQ09MTEVDVEVELFxuXHRcdGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHR2YXIgcmF3UnVtRXZlbnQgPSBkYXRhLnJhd1J1bUV2ZW50XG5cdFx0XHRzd2l0Y2ggKHJhd1J1bUV2ZW50LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBSdW1FdmVudFR5cGUuRVJST1I6XG5cdFx0XHRcdFx0ZXZlbnRDb3VudHMuZXJyb3JDb3VudCArPSAxXG5cdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnRDb3VudHMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBSdW1FdmVudFR5cGUuUkVTT1VSQ0U6XG5cdFx0XHRcdFx0ZXZlbnRDb3VudHMucmVzb3VyY2VDb3VudCArPSAxXG5cdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnRDb3VudHMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBSdW1FdmVudFR5cGUuQUNUSU9OOlxuXHRcdFx0XHRcdGV2ZW50Q291bnRzLnVzZXJBY3Rpb25Db3VudCArPSAxXG5cdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnRDb3VudHMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9LFxuXHQpXG5cblx0cmV0dXJuIHtcblx0XHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxuXHRcdH0sXG5cdFx0ZXZlbnRDb3VudHM6IGV2ZW50Q291bnRzLFxuXHR9XG59XG4iLCJpbXBvcnQgeyBlYWNoLCBub3cgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9jb3JlL29ic2VydmFibGUnXG4vLyBEZWxheSB0byB3YWl0IGZvciBhIHBhZ2UgYWN0aXZpdHkgdG8gdmFsaWRhdGUgdGhlIHRyYWNraW5nIHByb2Nlc3NcbmV4cG9ydCB2YXIgUEFHRV9BQ1RJVklUWV9WQUxJREFUSU9OX0RFTEFZID0gMTAwXG4vLyBEZWxheSB0byB3YWl0IGFmdGVyIGEgcGFnZSBhY3Rpdml0eSB0byBlbmQgdGhlIHRyYWNraW5nIHByb2Nlc3NcbmV4cG9ydCB2YXIgUEFHRV9BQ1RJVklUWV9FTkRfREVMQVkgPSAxMDBcbi8vIE1heGltdW0gZHVyYXRpb24gb2YgdGhlIHRyYWNraW5nIHByb2Nlc3NcbmV4cG9ydCB2YXIgUEFHRV9BQ1RJVklUWV9NQVhfRFVSQVRJT04gPSAxMDAwMFxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdElkbGVQYWdlQWN0aXZpdHkobGlmZUN5Y2xlLCBjb21wbGV0aW9uQ2FsbGJhY2spIHtcblx0dmFyIF90cmFja1BhZ2VBY3Rpdml0aWVzID0gdHJhY2tQYWdlQWN0aXZpdGllcyhsaWZlQ3ljbGUpXG5cdHZhciBwYWdlQWN0aXZpdGllc09ic2VydmFibGUgPSBfdHJhY2tQYWdlQWN0aXZpdGllcy5vYnNlcnZhYmxlXG5cdHZhciBzdG9wUGFnZUFjdGl2aXRpZXNUcmFja2luZyA9IF90cmFja1BhZ2VBY3Rpdml0aWVzLnN0b3Bcblx0dmFyIF93YWl0UGFnZUFjdGl2aXRpZXNDb21wbGV0aW9uID0gd2FpdFBhZ2VBY3Rpdml0aWVzQ29tcGxldGlvbihcblx0XHRwYWdlQWN0aXZpdGllc09ic2VydmFibGUsXG5cdFx0c3RvcFBhZ2VBY3Rpdml0aWVzVHJhY2tpbmcsXG5cdFx0Y29tcGxldGlvbkNhbGxiYWNrLFxuXHQpXG5cblx0dmFyIHN0b3BXYWl0UGFnZUFjdGl2aXRpZXNDb21wbGV0aW9uID0gX3dhaXRQYWdlQWN0aXZpdGllc0NvbXBsZXRpb24uc3RvcFxuXHRmdW5jdGlvbiBzdG9wKCkge1xuXHRcdHN0b3BXYWl0UGFnZUFjdGl2aXRpZXNDb21wbGV0aW9uKClcblx0XHRzdG9wUGFnZUFjdGl2aXRpZXNUcmFja2luZygpXG5cdH1cblxuXHRyZXR1cm4geyBzdG9wOiBzdG9wIH1cbn1cblxuLy8gQXV0b21hdGljIGFjdGlvbiBjb2xsZWN0aW9uIGxpZmVjeWNsZSBvdmVydmlldzpcbi8vICAgICAgICAgICAgICAgICAgICAgIChTdGFydCBuZXcgdHJhY2tQYWdlQWN0aXZpdGllcylcbi8vICAgICAgICAgICAgICAuLS0tLS0tLS0tLS0tLS0tLS0tLSctLS0tLS0tLS0tLS0tLS0tLS0tLS5cbi8vICAgICAgICAgICAgICB2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZcbi8vICAgICBbV2FpdCBmb3IgYSBwYWdlIGFjdGl2aXR5IF0gICAgICAgICAgW1dhaXQgZm9yIGEgbWF4aW11bSBkdXJhdGlvbl1cbi8vICAgICBbdGltZW91dDogVkFMSURBVElPTl9ERUxBWV0gICAgICAgICAgWyAgdGltZW91dDogTUFYX0RVUkFUSU9OICAgIF1cbi8vICAgICAgICAgIC8gICAgICAgICAgICAgICAgICBcXCAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbi8vICAgICAgICAgdiAgICAgICAgICAgICAgICAgICAgdiAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuLy8gIFtObyBwYWdlIGFjdGl2aXR5XSAgIFtQYWdlIGFjdGl2aXR5XSAgICAgICAgICAgICAgICAgICB8XG4vLyAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgfCwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLiAgIHxcbi8vICAgICAgICAgdiAgICAgICAgICAgICAgICAgICB2ICAgICAgICAgICAgICAgICAgICAgICB8ICAgfFxuLy8gICAgIChEaXNjYXJkKSAgICAgW1dhaXQgZm9yIGEgcGFnZSBhY3Rpdml0eV0gICAgICAgIHwgICB8XG4vLyAgICAgICAgICAgICAgICAgICBbICAgdGltZW91dDogRU5EX0RFTEFZICAgXSAgICAgICAgfCAgIHxcbi8vICAgICAgICAgICAgICAgICAgICAgICAvICAgICAgICAgICAgICAgIFxcICAgICAgICAgICAgfCAgIHxcbi8vICAgICAgICAgICAgICAgICAgICAgIHYgICAgICAgICAgICAgICAgICB2ICAgICAgICAgICB8ICAgfFxuLy8gICAgICAgICAgICAgW05vIHBhZ2UgYWN0aXZpdHldICAgIFtQYWdlIGFjdGl2aXR5XSAgIHwgICB8XG4vLyAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgfCAgIHxcbi8vICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICctLS0tLS0tLS0tLS0nICAgfFxuLy8gICAgICAgICAgICAgICAgICAgICAgJy0tLS0tLS0tLS0tLiAsLS0tLS0tLS0tLS0tLS0tLS0tLS0nXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoRW5kKVxuLy9cbi8vIE5vdGU6IGJlY2F1c2UgTUFYX0RVUkFUSU9OID4gVkFMSURBVElPTl9ERUxBWSwgd2UgYXJlIHN1cmUgdGhhdCBpZiB0aGUgcHJvY2VzcyBpcyBzdGlsbCBhbGl2ZVxuLy8gYWZ0ZXIgTUFYX0RVUkFUSU9OLCBpdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG5leHBvcnQgZnVuY3Rpb24gdHJhY2tQYWdlQWN0aXZpdGllcyhsaWZlQ3ljbGUpIHtcblx0dmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpXG5cdHZhciBzdWJzY3JpcHRpb25zID0gW11cblx0dmFyIGZpcnN0UmVxdWVzdEluZGV4XG5cdHZhciBwZW5kaW5nUmVxdWVzdHNDb3VudCA9IDBcblxuXHRzdWJzY3JpcHRpb25zLnB1c2goXG5cdFx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9TRVRfREFUQV9VUERBVEUsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5vdGlmeVBhZ2VBY3Rpdml0eSgpXG5cdFx0fSksXG5cdFx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9BTElBU19BQ1RJT04sIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5vdGlmeVBhZ2VBY3Rpdml0eSgpXG5cdFx0fSksXG5cdClcblxuXHRzdWJzY3JpcHRpb25zLnB1c2goXG5cdFx0bGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRcdExpZmVDeWNsZUV2ZW50VHlwZS5SRVFVRVNUX1NUQVJURUQsXG5cdFx0XHRmdW5jdGlvbiAoc3RhcnRFdmVudCkge1xuXHRcdFx0XHRpZiAoZmlyc3RSZXF1ZXN0SW5kZXggPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGZpcnN0UmVxdWVzdEluZGV4ID0gc3RhcnRFdmVudC5yZXF1ZXN0SW5kZXhcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBlbmRpbmdSZXF1ZXN0c0NvdW50ICs9IDFcblx0XHRcdFx0bm90aWZ5UGFnZUFjdGl2aXR5KClcblx0XHRcdH0sXG5cdFx0KSxcblx0KVxuXG5cdHN1YnNjcmlwdGlvbnMucHVzaChcblx0XHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJFUVVFU1RfQ09NUExFVEVELFxuXHRcdFx0ZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIHJlcXVlc3Qgc3RhcnRlZCBiZWZvcmUgdGhlIHRyYWNraW5nIHN0YXJ0LCBpZ25vcmUgaXRcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGZpcnN0UmVxdWVzdEluZGV4ID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHRyZXF1ZXN0LnJlcXVlc3RJbmRleCA8IGZpcnN0UmVxdWVzdEluZGV4XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHRcdHBlbmRpbmdSZXF1ZXN0c0NvdW50IC09IDFcblx0XHRcdFx0bm90aWZ5UGFnZUFjdGl2aXR5KClcblx0XHRcdH0sXG5cdFx0KSxcblx0KVxuXG5cdGZ1bmN0aW9uIG5vdGlmeVBhZ2VBY3Rpdml0eSgpIHtcblx0XHRvYnNlcnZhYmxlLm5vdGlmeSh7IGlzQnVzeTogcGVuZGluZ1JlcXVlc3RzQ291bnQgPiAwIH0pXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG9ic2VydmFibGU6IG9ic2VydmFibGUsXG5cdFx0c3RvcDogZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWFjaChzdWJzY3JpcHRpb25zLCBmdW5jdGlvbiAoc3ViKSB7XG5cdFx0XHRcdHN1Yi51bnN1YnNjcmliZSgpXG5cdFx0XHR9KVxuXHRcdH0sXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRQYWdlQWN0aXZpdGllc0NvbXBsZXRpb24oXG5cdHBhZ2VBY3Rpdml0aWVzT2JzZXJ2YWJsZSxcblx0c3RvcFBhZ2VBY3Rpdml0aWVzVHJhY2tpbmcsXG5cdGNvbXBsZXRpb25DYWxsYmFjayxcbikge1xuXHR2YXIgaWRsZVRpbWVvdXRJZFxuXHR2YXIgaGFzQ29tcGxldGVkID0gZmFsc2VcblxuXHR2YXIgdmFsaWRhdGlvblRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdGNvbXBsZXRlKHsgaGFkQWN0aXZpdHk6IGZhbHNlIH0pXG5cdH0sIFBBR0VfQUNUSVZJVFlfVkFMSURBVElPTl9ERUxBWSlcblx0dmFyIG1heER1cmF0aW9uVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0Y29tcGxldGUoeyBoYWRBY3Rpdml0eTogdHJ1ZSwgZW5kVGltZTogbm93KCkgfSlcblx0fSwgUEFHRV9BQ1RJVklUWV9NQVhfRFVSQVRJT04pXG5cdHBhZ2VBY3Rpdml0aWVzT2JzZXJ2YWJsZS5zdWJzY3JpYmUoZnVuY3Rpb24gKGRhdGEpIHtcblx0XHR2YXIgaXNCdXN5ID0gZGF0YS5pc0J1c3lcblx0XHRjbGVhclRpbWVvdXQodmFsaWRhdGlvblRpbWVvdXRJZClcblx0XHRjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXRJZClcblx0XHR2YXIgbGFzdENoYW5nZVRpbWUgPSBub3coKVxuXHRcdGlmICghaXNCdXN5KSB7XG5cdFx0XHRpZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNvbXBsZXRlKHsgaGFkQWN0aXZpdHk6IHRydWUsIGVuZFRpbWU6IGxhc3RDaGFuZ2VUaW1lIH0pXG5cdFx0XHR9LCBQQUdFX0FDVElWSVRZX0VORF9ERUxBWSlcblx0XHR9XG5cdH0pXG5cblx0ZnVuY3Rpb24gc3RvcCgpIHtcblx0XHRoYXNDb21wbGV0ZWQgPSB0cnVlXG5cdFx0Y2xlYXJUaW1lb3V0KHZhbGlkYXRpb25UaW1lb3V0SWQpXG5cdFx0Y2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0SWQpXG5cdFx0Y2xlYXJUaW1lb3V0KG1heER1cmF0aW9uVGltZW91dElkKVxuXHRcdHN0b3BQYWdlQWN0aXZpdGllc1RyYWNraW5nKClcblx0fVxuXG5cdGZ1bmN0aW9uIGNvbXBsZXRlKHBhcmFtcykge1xuXHRcdGlmIChoYXNDb21wbGV0ZWQpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRzdG9wKClcblx0XHRjb21wbGV0aW9uQ2FsbGJhY2socGFyYW1zKVxuXHR9XG5cblx0cmV0dXJuIHsgc3RvcDogc3RvcCB9XG59XG4iLCJpbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IEJhdGNoLCBIdHRwUmVxdWVzdCB9IGZyb20gJy4uLy4uL2NvcmUvdHJhbnNwb3J0J1xuaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2VudW1zJ1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UnVtQmF0Y2goY29uZmlndXJhdGlvbiwgbGlmZUN5Y2xlKSB7XG5cdHZhciBiYXRjaCA9IG1ha2VSdW1CYXRjaChjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUpXG5cdGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0ZnVuY3Rpb24gKHNlcnZlclJ1bUV2ZW50KSB7XG5cdFx0XHRpZiAoc2VydmVyUnVtRXZlbnQudHlwZSA9PT0gUnVtRXZlbnRUeXBlLlZJRVcpIHtcblx0XHRcdFx0YmF0Y2gudXBzZXJ0KHNlcnZlclJ1bUV2ZW50LCBzZXJ2ZXJSdW1FdmVudC5wYWdlLmlkKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YmF0Y2guYWRkKHNlcnZlclJ1bUV2ZW50KVxuXHRcdFx0fVxuXHRcdH0sXG5cdClcblx0cmV0dXJuIHtcblx0XHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRiYXRjaC5zdG9wKClcblx0XHR9LFxuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VSdW1CYXRjaChjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUpIHtcblx0dmFyIHByaW1hcnlCYXRjaCA9IGNyZWF0ZVJ1bUJhdGNoKGNvbmZpZ3VyYXRpb24uZGF0YWtpdFVybCwgbGlmZUN5Y2xlKVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVJ1bUJhdGNoKGVuZHBvaW50VXJsLCBsaWZlQ3ljbGUpIHtcblx0XHRyZXR1cm4gbmV3IEJhdGNoKFxuXHRcdFx0bmV3IEh0dHBSZXF1ZXN0KGVuZHBvaW50VXJsLCBjb25maWd1cmF0aW9uLmJhdGNoQnl0ZXNMaW1pdCksXG5cdFx0XHRjb25maWd1cmF0aW9uLm1heEJhdGNoU2l6ZSxcblx0XHRcdGNvbmZpZ3VyYXRpb24uYmF0Y2hCeXRlc0xpbWl0LFxuXHRcdFx0Y29uZmlndXJhdGlvbi5tYXhNZXNzYWdlU2l6ZSxcblx0XHRcdGNvbmZpZ3VyYXRpb24uZmx1c2hUaW1lb3V0LFxuXHRcdFx0bGlmZUN5Y2xlLFxuXHRcdClcblx0fVxuXG5cdHZhciBzdG9wcGVkID0gZmFsc2Vcblx0cmV0dXJuIHtcblx0XHRhZGQ6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0XHRpZiAoc3RvcHBlZCkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHByaW1hcnlCYXRjaC5hZGQobWVzc2FnZSlcblx0XHR9LFxuXHRcdHN0b3A6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN0b3BwZWQgPSB0cnVlXG5cdFx0fSxcblx0XHR1cHNlcnQ6IGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0XHRcdGlmIChzdG9wcGVkKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0cHJpbWFyeUJhdGNoLnVwc2VydChtZXNzYWdlLCBrZXkpXG5cdFx0fSxcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgeyBkYXRhZmx1eFJ1bSB9IGZyb20gJy4vYm9vdC9ydW0uZW50cnknXG4iXSwic291cmNlUm9vdCI6IiJ9