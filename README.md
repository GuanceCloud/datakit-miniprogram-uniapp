# 基于uniapp开发框架 兼容各平台小程序 DataFlux RUM 数据采集SDK
通过引入sdk文件，监控小程序性能指标，错误log，以及资源请求情况数据，上报到DataFlux 平台datakit

## 使用方法
### 在uniapp项目入口文件`main.js`文件头部位置以如下方式引入代码
### npm 引入(可参考uniapp官方[npm引入方式](https://uniapp.dcloud.net.cn/frame?id=npm%e6%94%af%e6%8c%81))
```javascript
//#ifndef H5 || APP-PLUS || APP-NVUE || APP-PLUS-NVUE
const { datafluxRum } = require('@cloudcare/rum-uniapp')
// 初始化 Rum
datafluxRum.init({
	datakitOrigin: 'https://datakit.xxx.com/',// 必填，Datakit域名地址 需要在微信小程序管理后台加上域名白名单
	applicationId: 'appid_xxxxxxx', // 必填，dataflux 平台生成的应用ID
	env: 'testing', // 选填，小程序的环境
	version: '1.0.0', // 选填，小程序版本
	trackInteractions: true, // 用户行为数据
})
//#endif
```
### CDN 下载文件本地方式引入([下载地址](https://static.dataflux.cn/miniapp-sdk/v1/dataflux-rum-uniapp.js))

```javascript
//#ifndef H5 || APP-PLUS || APP-NVUE || APP-PLUS-NVUE
const { datafluxRum } = require('@cloudcare/rum-uniapp')
// 初始化 Rum
datafluxRum.init({
	datakitOrigin: 'https://datakit.xxx.com/',// 必填，Datakit域名地址 需要在微信小程序管理后台加上域名白名单
	applicationId: 'appid_xxxxxxx', // 必填，dataflux 平台生成的应用ID
	env: 'testing', // 选填，小程序的环境
	version: '1.0.0', // 选填，小程序版本
	trackInteractions: true, // 用户行为数据
})
//#endif
```

## 配置

### 初始化参数

| 参数                | 类型    | 是否必须 | 默认值  | 描述                                                                                                         |
| ------------------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `applicationId`     | String  | 是       |         | 从 dataflux 创建的应用 ID                                                                                    |
| `datakitOrigin`     | String  | 是       |         | datakit 数据上报 Origin;`注意：需要在小程序管理后台加上request白名单`                                        |
| `env`               | String  | 否       |         | 小程序 应用当前环境， 如 prod：线上环境；gray：灰度环境；pre：预发布环境 common：日常环境；local：本地环境； |
| `version`           | String  | 否       |         | 小程序 应用的版本号                                                                                          |
| `sampleRate`        | Number  | 否       | `100`   | 指标数据收集百分比: `100`表示全收集，`0`表示不收集                                                           |
| `trackInteractions` | Boolean | 否       | `false` | 是否开启用户行为采集                                                                                         |

## 注意事项

1. `datakitOrigin` 所对应的datakit域名必须在小程序管理后台加上request白名单
2. 目前各平台小程序在性能数据api暴露这块，并没有完善统一，所以导致一些性能数据并不能完善收集，比如`小程序启动`、`小程序包下载`、`脚本注入` 等一些数据除微信平台外，都有可能会存在缺失的情况。
3. 目前各平台小程序请求资源API`uni.request`、`uni.downloadFile`返回数据中`profile`字段目前只有微信小程序ios系统不支持返回，所以会导致收集的资源信息中和timing相关的数据收集不全。目前暂无解决方案，[request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html), [downloadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/wx.downloadFile.html) ;[API支持情况](https://developers.weixin.qq.com/community/develop/doc/000ecaa8b580c80601cac8e6f56000?highLine=%2520request%2520profile)
3. `trackInteractions` 用户行为采集开启后，因为微信小程序的限制，无法采集到控件的内容和结构数据，所以在小程序 SDK 里面我们采取的是声明式编程，通过在 模版 里面设置 data-name 属性，可以给 交互元素 添加名称，方便后续统计是定位操作记录， 例如：
```js
 <button bindtap="bindSetData" data-name="setData">setData</button>
```

    