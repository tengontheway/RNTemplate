/**
 * Created by evilcode on 2017/12/5.
 */
import { NavigationActions, StackNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { View, Button, Text, Easing, Animated  } from 'react-native'
import NavigatorUtils from './NavigationUtils'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

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



class BackTwice extends Component {


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        console.log("-----------BackTwice")
        // Console.dir(this.props.navigator)
        return (
            <Button
                onPress = { () => {
                    NavigatorUtils.navigate("AllContactsScreen")
                } }
                title = {"click me"}
            />
        )
    }
}



class RecentChatsScreen extends React.Component {
    render() {
        console.log("------recent screen")
        // console.dir(this.props.navigation)
        return (
            <View>
                <Text>List of recent chats</Text>
                <Button
                    onPress = { () => this.props.navigation.navigate('AllContactsScreen', {age: 18}) }
                    title = { "To all contacts screen" }
                />
                <BackTwice />
            </View>
        )
    }
}

class AllContactsScreen extends React.Component {
    render() {
        console.log("------recent AllContactsScreen")
        // console.dir(this.props.navigation)
        return (
            <View>
                <Text>List of all contacts</Text>

            </View>
        )
    }
}

const Routes = StackNavigator({
    // Splash: {
    //     screen: Splash
    // },
    // Signup: {
    //     screen: SignUp
    // },
    // Login: {
    //     screen: SignIn
    // },
    // ForgottenPassword: {
    //     screen: ForgottenPassword
    // },
    // WeLoggedIn: {
    //     screen: WeLoggedIn  // Notice how the screen is a StackNavigator
    // },                       // now you understand how it works!

    RecentChatsScreen: {
        screen: RecentChatsScreen,
    },
    AllContactsScreen: {
        screen: AllContactsScreen,
    },
}, {
    ...defaultNavigatorSettings,
    transitionConfig: defaultTransitionConfig
})

export default Routes