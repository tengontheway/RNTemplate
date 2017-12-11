/**
 * Created by evilcode on 2017/12/6.
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { ConnectWrapper } from '../core/common'

class RegistScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {

        return (
            <View>
                <Text>This is Regist screen</Text>
                <Button
                    onPress = { () => this.props.navigation.goBack() }
                    title = { "Submit regist info!" }
                />
            </View>
        )
    }
}

export default ConnectWrapper(RegistScreen, (state)=> {
    return {

    }
})