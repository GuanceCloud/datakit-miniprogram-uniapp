import { LifeCycleEventType } from '../core/lifeCycle';
export function startSetDataColloction(lifeCycle) {
  var originPage = Page;
  var originComponent = Component;

  Page = function Page(page) {
    var originPageOnLoad = page['onLoad'];

    page['onLoad'] = function () {
      this.setUpdatePerformanceListener && this.setUpdatePerformanceListener({
        withDataPaths: true
      }, res => {
        lifeCycle.notify(LifeCycleEventType.PAGE_SET_DATA_UPDATE, res);
      });
      return originPageOnLoad.apply(this, arguments);
    };

    return originPage(page);
  };

  Component = function Component(component) {
    var originComponentAttached = component['attached'];

    component['attached'] = function () {
      this.setUpdatePerformanceListener && this.setUpdatePerformanceListener({
        withDataPaths: true
      }, res => {
        lifeCycle.notify(LifeCycleEventType.PAGE_SET_DATA_UPDATE, res);
      });
      return originComponentAttached.apply(this, arguments);
    };

    return originComponent(component);
  };
}