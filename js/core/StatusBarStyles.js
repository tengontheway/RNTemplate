/**
 * Created by evilcode on 2017/11/30.
 * 状态栏样式管理
 *
 * 1.setDefaultOptions init
 * 2. watch onNavigationStateChange auto change status bar style.
 */
import {
    StatusBar,
    Platform
} from 'react-native';
import NavigationHelper from './NavigationHelper'

const StatusBarStylesMgr = {

    defaultOptions : {
        defaultStyle: "dark",          // 默认样式
        excludeScreens: [],            // 非默认样式的界面
        initialStyle: 'dark',          // 初始化第一个界面的样式
    },

    /**
     * 设置默认样式
     * @param options
     */
    setDefaultOptions(options) {
        this.defaultOptions = {
            ...this.defaultOptions,
            ...options
        }

        if (this.defaultOptions.initialStyle === 'dark')
            this.dark()
        else
            this.light()

        return this.defaultOptions
    },

    // 深色样式
    dark() {
        StatusBar.setBarStyle('dark-content')
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setTranslucent(true)
        }
    },

    // 浅色样式
    light() {
        StatusBar.setBarStyle('light-content')
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setTranslucent(true)
        }
    },

    /**
     * 设置样式
     * @param {any} routeName 路由名字 eg.LoginScreen
     */
    set(routeName) {
        let f, rf
        if (this.defaultOptions.defaultStyle === "dark") {
            f = this.dark
            rf = this.light
        } else {
            f = this.light
            rf = this.dark
        }

        let excludeScreens = this.defaultOptions.excludeScreens
        if (routeName && excludeScreens && excludeScreens.includes(routeName)) {
            f = rf
        }

        f()
    },

    /**
     * 根据react-navigation的路由状态设置状态栏
     * @param navigationState
     */
    setByNavigationState(navigationState) {
        let route_name = NavigationHelper.getCurrentRouteName(navigationState)
        if (route_name)
            this.set(route_name)
    }
}

export default StatusBarStylesMgr