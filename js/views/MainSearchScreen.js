/**
 * Created by evilcode on 2017/12/7.
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { ConnectWrapper } from '../core/common'


class MainSearchScreen extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '首页',
    }

    render() {

        return (
            <View>
                <Text>This is main search screen</Text>
                <Button
                    onPress = { () => this.props.navigation.navigate('Demo1', {age: 18}) }
                    title = { "demo1" }
                />
            </View>
        )
    }
}

export default ConnectWrapper(MainSearchScreen, (state)=> {
    return {

    }
})