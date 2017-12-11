/**
 * 应用启动的基类
 * Created by EvilCode.T on 17/10/2016.
 */
import React, {Component} from 'react';
import {
    NativeModules,
    NativeEventEmitter,
    PixelRatio,
    Dimensions,
    BackAndroid,
    AppState,
    Platform,
    View,
    StatusBar
} from 'react-native';

import {NavMgr, PageContainer, CustomPushFromRight} from '../index'
import utils from '../utils/Utils';
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
// screen related book keepi
import {registerScreens} from '../../views_register';
registerScreens();

import NavigationExperimental from 'react-native-deprecated-custom-components';

// notice that this is just a simple class, it's not a React component
export default class AppEntryBase extends Component {
    constructor(props) {
        super(props)

        // require('ErrorUtils').setGlobalHandler(function (e) {
        //     //alert('Error: ' + e.message + ', stack:\n' + e.stack);
        //     if (e.message === 'Error in connect() function') {
        //         alert("连接失败,请重启!");
        //     } else {
        //         console.warn('Error: ' + e.message + ', stack:\n' + e.stack);
        //     }
        // });

        this.onConstructorInit();
    }

    /**
     * 构造函数的重载 override
     */
    onConstructorInit() {
        global.utils = utils;
        global.nav_mgr = new NavMgr()

        utils.polyfill()
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            RCTDeviceEventEmitter.addListener('hardwareBackPress', this.onBackAndroid)
        }
        this.lastAppState = AppState.currentState
        // AppState.addEventListener('change', this.onAppStatechange)
    }

    componentWillUnMount() {
        if (Platform.OS === 'android') {
            RCTDeviceEventEmitter.removeListener('hardwareBackPress', this.onBackAndroid)
        }
        // AppState.removeEventListener('change', this.onAppStatechange)
    }

    onBackAndroid() {

        const nav = _global_nav
        const routers = nav.getCurrentRoutes()

        if (routers.length > 1) {
            // 按下back键时回退到上一界面
            nav.pop()
        }

        return true
    }

    renderNavigator() {
        return (
            <View style={{flex: 1}}>

                <NavigationExperimental.Navigator
                    ref={nav => global._global_nav = nav}
                    initialRoute={{
                        screen: 'views.App',
                        navBarHidden: true,
                        statusBarHidden: true,
                        navBarStyle: {
                            title: '首页',
                            isShowLeft: false,
                            isShowRight: false,

                            ...constant.NAVBAR_REG_STYLE
                        }
                    }}
                    configureScene={(route) => {

                        // 无右滑返回
                        if (route.sceneConfig == true) {
                            var conf = NavigationExperimental.Navigator.SceneConfigs.PushFromRight
                            conf.gestures = null;
                            return conf;
                        }

                        if (route.animType) {
                            // 替换原有的转场动画PushFromRight
                            if (route.animType ==  NavigationExperimental.Navigator.SceneConfigs.PushFromRight) {
                                return CustomPushFromRight
                            }
                            return route.animType
                        }

                        let anim = nav_mgr.getAnimMgr().getAnim(route.animName)

                        if (anim && anim === NavigationExperimental.Navigator.SceneConfigs.PushFromRight) {
                            return CustomPushFromRight
                        }
                        return anim || CustomPushFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        return <PageContainer ref={(container)=>route.container = container} {...route} route={route} navigator={navigator}/>
                    }}
                    />
            </View>
        )
    }

    render() {
        this.renderNavigator()
    }
}

