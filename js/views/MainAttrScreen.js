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


class MainAttrScreen extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '我的',
    }

    render() {

        return (
            <View>
                <Text>This is  main attr screen</Text>
                <Button
                    onPress = { () => this.props.navigation.navigate('Demo2') }
                    title = { "demo2" }
                />
            </View>
        )
    }
}

export default ConnectWrapper(MainAttrScreen, (state)=> {
    return {

    }
})