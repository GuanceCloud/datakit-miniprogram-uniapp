import { LifeCycleEventType } from '../core/lifeCycle';
import { tracker } from '../core/sdk';
export function startPagePerformanceObservable(lifeCycle, configuration) {
  if (!!tracker.getPerformance) {
    var performance = tracker.getPerformance();
    if (!performance || typeof performance.createObserver !== 'function') return;
    var observer = performance.createObserver(entryList => {
      lifeCycle.notify(LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED, entryList.getEntries());
    });
    observer.observe({
      entryTypes: ['render', 'script', 'navigation']
    });
  }
}