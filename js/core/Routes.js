/**
 * Created by evilcode on 2017/12/5.
 */
import { NavigationActions, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import React, { Component } from 'react'
import { View, Button, Text, Easing, Animated  } from 'react-native'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'


import Demo1Screen from '../views/Demo1Screen'
import Demo2Screen from '../views/Demo2Screen'
import DemoStorageScreen from '../views/DemoStorageScreen'
import DemoToastScreen from '../views/DemoToastScreen'
import LoginScreen from '../views/LoginScreen'
import RegistScreen from '../views/RegistScreen'
import MainSearchScreen from '../views/MainSearchScreen'
import MainAttrScreen from '../views/MainAttrScreen'


const defaultTransitionConfig = () => {
    return {
        transitionSpec: {
            duration: 500,
            easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            return CardStackStyleInterpolator.forHorizontal(sceneProps)
        }
    }
}

// 默认navigator设置
const defaultNavigatorSettings = {
    headerMode: 'screen',
    navigationOptions: {
        gesturesEnabled: true,
        headerStyle: {
            backgroundColor: '#fff',
            height: 75
        },
        headerTitleStyle: {
            color: '#464646',
            fontSize: 18
        },
        headerTintColor: '#999',
        headerBackTitleStyle: {
            color: '#999'
        }
    }
}


const LoginNavigator = StackNavigator({
    Login: {
        screen: LoginScreen
    },
    Regist: {
        screen: RegistScreen
    }
}, {
    ...defaultNavigatorSettings,
    transitionConfig: defaultTransitionConfig,
})


// 首页tab路由
const MainNavigator = TabNavigator({
    MainSearch: {
        screen: MainSearchScreen
    },
    MainAttr: {
        screen: MainAttrScreen
    }
}, {
    // 懒加载
    lazy: true,
    navigationOptions: {
        // 首页没有后退按钮
        headerLeft: null
    },
    animationEnabled: false,
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#2ba09d',
        inactiveTintColor: '#929292',
        labelStyle: {
            fontSize: 12,
            paddingBottom: 3
        },
        iconStyle: {
            height: 20,
            width: 20
        },
        style: {
            backgroundColor: '#f7f7f7',
            height: 50
        },
        inactiveBackgroundColor: '#f7f7f7',
        activeBackgroundColor: '#f7f7f7'
    }
})



// TODO: 优化
const DEMO_MODE = false

let Routes
if (DEMO_MODE) {
    Routes = StackNavigator({
        Demo1Screen: {
            screen: Demo1Screen,
        },
        Demo2Screen: {
            screen: Demo2Screen,
        },
        DemoStorageScreen: {
            screen: DemoStorageScreen,
        },
        DemoToastScreen: {
            screen: DemoToastScreen,
        }
    }, {
        ...defaultNavigatorSettings,
        transitionConfig: defaultTransitionConfig,
        initialRouteName: 'Demo1Screen'
    })
} else {
    Routes = StackNavigator({
        Login: {
            screen: LoginNavigator,
        },
        Main: {
            screen: MainNavigator,
        },
        Demo1: {
            screen: Demo1Screen,
        },
        Demo2: {
            screen: Demo2Screen,
        }
    }, {
        ...defaultNavigatorSettings,
        transitionConfig: defaultTransitionConfig
    })

}



export default Routes