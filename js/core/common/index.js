/**
 * 用来存放所有公共信息
 * eg.公用样式、公共颜色 etc
 * Added by tzt.
 */
import CommonStyles from './CommonStyles'
import GameStyles from './GameStyles'
import {
    Utils,
    CalendarUtils,
    CityCodeUtils,
    IDCardNoUtils,
    PxToDp,
    ConnectWrapper,
    // 拼音
    PinYinUtil,
    PinYinSortEx,
} from './utils'

import {
    CMSearchBar,
    CMSearchBarBtn,
    SearchBar,
} from './ui'


import px2rem from './resolution/Px2Rem'
import getRemByDimensions from './resolution/Resolution'
import EStyleSheet from 'react-native-extended-stylesheet'
import Log from './log/Log'

// import {
//     AppEntryBase,
//     AppEntryReduxBase
// } from './app'

function GlobalInit() {
    // 全局初始化
    if (!global.log) {

        global.P2D = PxToDp
        global.PxToDp = PxToDp
        global.glog = Log

        glog.defaultInit()

        console.log("-----------------global init")
    }
}

/**
 * 初始化日志系统
 * 在运行打好了离线包的应用时，控制台打印语句可能会极大地拖累JavaScript线程
 * @param isForceShowLog
 */
function GlobalInitLogSystem(isForceShowLog = false) {
    if (isForceShowLog)
        return

    // if (!__DEV__) {
    //     global.console = {
    //         info: () => {},
    //         log: () => {},
    //         warn: () => {},
    //         error: () => {},
    //     }
    // }
}

GlobalInit()
GlobalInitLogSystem()

export {
    // // 应用启动入口
    // AppEntryBase,
    // AppEntryReduxBase,

    GlobalInit,
    GlobalInitLogSystem,

    // 通用
    Utils,
    IDCardNoUtils,
    CalendarUtils,
    CityCodeUtils,
    PxToDp,
    ConnectWrapper,
    PinYinUtil,
    PinYinSortEx,

    CommonStyles,
    GameStyles,
    CMSearchBar,
    CMSearchBarBtn,
    SearchBar,

    // 适配屏幕分辨率
    px2rem,
    getRemByDimensions,
    EStyleSheet
}