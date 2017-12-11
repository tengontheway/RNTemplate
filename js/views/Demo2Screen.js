/**
 * Created by evilcode on 2017/12/6.
 */
import React, { Component } from 'react'
import { ConnectWrapper } from '../core/common'
import {
    View,
    Text
} from 'react-native'

class Demo2Screen extends React.Component {
    render() {
        console.log("------recent AllContactsScreen")
        // console.dir(this.props.navigation)
        return (
            <View>
                <Text>List of all contacts: {this.props.demo2Title}</Text>

            </View>
        )
    }
}

export default ConnectWrapper(Demo2Screen, (state)=> {
    return {
        demo2Title: state.demo2.text
    }
})