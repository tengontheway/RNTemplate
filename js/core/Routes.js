/**
 * Created by evilcode on 2017/12/5.
 */
import { NavigationActions, StackNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { View, Button, Text, Easing, Animated  } from 'react-native'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

import Demo1Screen from '../views/Demo1Screen'
import Demo2Screen from '../views/Demo2Screen'
import DemoStorageScreen from '../views/DemoStorageScreen'
import DemoToastScreen from '../views/DemoToastScreen'



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

// TODO: 优化
const DEMO_MODE = true

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
        Demo1Screen: {
            screen: Demo1Screen,
        },
        Demo2Screen: {
            screen: Demo2Screen,
        },
    }, {
        ...defaultNavigatorSettings,
        transitionConfig: defaultTransitionConfig
    })

}



export default Routes