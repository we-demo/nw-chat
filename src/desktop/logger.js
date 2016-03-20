
import log4js from 'log4js'
import fs from 'fs-extra'
import { isError } from 'util'

const date = new Date()
const dstr = new Date(
  date.getTime() - date.getTimezoneOffset() * 60000 // 加上时区
  )
  .toJSON().replace(/T.+$/, '')
const logFile = `log/${dstr}.log` // log/2016-03-16.log
fs.ensureFileSync(logFile)

// https://github.com/nomiddlename/log4js-node
log4js.configure({
  appenders: [
    // 取消默认的coloredLayout nw支持不完善
    // https://github.com/nomiddlename/log4js-node/blob/master/examples%2FpatternLayout-tokens.js
    { type: 'console', layout: { type: 'basic' } },
    { type: 'file', filename: logFile },
  ],
  // replaceConsole: true, // todo: 需要进一步整合窗口console
})
const logger = log4js.getLogger()

// todo: 关键节点 需要补充log
export function log(...args) {
  if (console !== global.mConsole) {
    global.mConsole.log(...args)
  }
  logger.log(...args)
}

export function logError(...args) {
  // 跨console显示 需要err转stack
  args = args.map((o) => isError(o) ? getErrorStack(o) : o) 
  if (console !== global.mConsole) {
    global.mConsole.error(...args)
  }
  logger.error(...args)
}

function getErrorStack(err) {
  const stack = err && err.stack || String(err) // 容错 包括null
  return stack//.replace(/webpack:\/\/\//g, '') // for devtool: eval
}
