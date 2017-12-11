/**
 * Created by evilcode on 2017/12/6.
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Styles
} from 'react-native'
import { ConnectWrapper } from '../core/common'

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {

        return (
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <Text>This is login screen</Text>
                <Button
                    onPress = { () => this.props.navigation.navigate('Main') }
                    title = { "Login" }
                />
                <Button
                    onPress = { () => this.props.navigation.navigate('Regist') }
                    title = { "Regist" }
                />
            </View>
        )
    }
}

export default ConnectWrapper(LoginScreen, (state)=> {
    return {

    }
})