import { rewriteApp } from './index'
import { LifeCycleEventType } from '../../core/lifeCycle'
import { RumEventType } from '../../helper/enums'
import { msToNs } from '../../helper/utils'
export function startAppCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(LifeCycleEventType.APP_UPDATE, function (appinfo) {
		lifeCycle.notify(
			LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processAppUpdate(appinfo),
		)
	})

	return rewriteApp(configuration, lifeCycle)
}

function processAppUpdate(appinfo) {
	var appEvent = {
		date: appinfo.startTime,
		type: RumEventType.APP,
		app: {
			type: appinfo.type,
			name: appinfo.name,
			id: appinfo.id,
			duration: msToNs(appinfo.duration),
		},
	}
	console.log(appEvent, 'appEvent====')
	return {
		rawRumEvent: appEvent,
		startTime: appinfo.startTime,
	}
}
