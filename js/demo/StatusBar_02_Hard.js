/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import StatusBarStyles from '../core/StatusBarStyles'

StatusBarStyles.setDefaultOptions({
    defaultStyle: 'dark',
    excludeScreens: ['Home', 'Other'],
    initialStyle: 'light'
})


import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

const HomeScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
            onPress = { () => {
                navigation.navigate('Details')
            } }
            title = "Set dark status bar style!"
        />
    </View>
)

const DetailsScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
            onPress = { () => {
                navigation.navigate('Other')
            } }
            title = "Go to other screen!"
        />

        <Button
            onPress = { () => navigation.goBack() }
            title = "Go back!"
        />
    </View>
);

const OtherScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Other Screen</Text>
        <Button
            onPress = { () => navigation.goBack() }
            title = "Go back"
        />
    </View>
);

const LoginNavigator = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
    Other: {
        screen: OtherScreen,
    },
}, {
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
});


//-------------------------------------------

class MyHomeScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./id1.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Home')}
                title="Go to notifications"
            />
        );
    }
}


class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./id2.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});

const HomeNavigator = TabNavigator({
    MHome: {
        screen: MyHomeScreen,
    },
    MNotifications: {
        screen: MyNotificationsScreen,
    },
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

const RootNavigator = StackNavigator({
    RHome: {
        screen: HomeNavigator,
    },
    RLogin: {
        screen: LoginNavigator,
    },

})




export default () => (
    <RootNavigator
        onNavigationStateChange={(prevState, currentState) => {
            console.log("onNavigationStateChange:" + JSON.stringify(currentState))

            StatusBarStyles.setByNavigationState(currentState)
        }}
    />
)


//
// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
