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
import DemoUnbindViewNavigatorActions from './DemoUnbindViewNavigatorActions'

class Demo1Screen extends React.Component {
    render() {
        console.log("------recent screen")
        // console.dir(this.props.navigation)

        return (
            <View>
                <Text>List of recent chats: {this.props.demo1Title}</Text>
                <Button
                    onPress = { () => this.props.navigation.navigate('Demo2', {age: 18}) }
                    title = { "To all contacts screen" }
                />
                <DemoUnbindViewNavigatorActions />
            </View>
        )
    }
}

export default ConnectWrapper(Demo1Screen, (state)=> {
    return {
        demo1Title: state.demo1.text
    }
})