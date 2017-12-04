/**
 * 简单的封装下，解决android下release日志输出的问题
 * Created by evilcode on 27/03/2017.
 */

var Log = {}

Log.enableLog = true

Log.log = function(...params) {
    if (this.enableLog) {
        console.log(...params)
    }
}

Log.warn = function(...params) {
    if (this.enableLog) {
        console.warn(...params)
    }
}

Log.error = function(...params) {
    if (this.enableLog) {
        console.error(...params)
    }
}

/**
 * 默认开启Log，release时自动关闭
 */
Log.defaultInit = function () {
    if (__DEV__) {
        this.enableLog = true
    } else {
        this.enableLog = false
    }
}


export default Log