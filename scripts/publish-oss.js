const OSS = require('ali-oss')
const fs = require('fs')
const path = require('path')
const packageJSON = require('../package.json')

let sdkVersion = packageJSON.version
const client = new OSS({
	region: 'oss-cn-hangzhou',
	accessKeyId: 'LTAI4G4gbes6qQggKs8rntiW',
	accessKeySecret: 'SIQ8eXXJPb6uf02YpC7JdJHh3GwJm8',
	bucket: 'zhuyun-static-files-production',
})
const rumjs = fs.readFileSync(
	path.join(__dirname, '..', 'demo/miniprogram/dataflux-rum-uniapp.js'),
)
const buildTest = process.argv[2]
// 获取大版本信息
const versionMajor = `v${sdkVersion.split('.')[0]}`
let objectName = `miniapp-sdk/${versionMajor}/dataflux-rum-uniapp.js`

if (buildTest) {
	objectName = `miniapp-sdk/${versionMajor}/dataflux-rum-uniapp-${buildTest}.js`
}
console.log(objectName, 'objectNameobjectNameobjectName')
client
	.put(objectName, rumjs, {
		mime: 'application/javascript;charset=UTF-8',
	})
	.then((result) => {
		// flushCdn()
	})
