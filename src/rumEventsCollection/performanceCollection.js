import { LifeCycleEventType } from '../core/lifeCycle'
import { tracker } from '../core/sdk'
export function startPagePerformanceObservable(lifeCycle, configuration) {
	if (!!tracker.getPerformance) {
		const performance = tracker.getPerformance()
		if (!performance || typeof performance.createObserver !== 'function') return
		const observer = performance.createObserver((entryList) => {
			lifeCycle.notify(
				LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
				entryList.getEntries(),
			)
		})
		observer.observe({ entryTypes: ['render', 'script', 'navigation'] })
	}
}
