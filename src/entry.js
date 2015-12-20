
import 'babel-polyfill'

// hack: 解除babel-polyfill单例限制
// nw环境有别 global唯一 各页面独立
delete global._babelPolyfill


if (location.hash === '#/main') {
  require('./entryMain')
} else {
  require('./entryWeb')
}
