/**
 * Created by evilcode on 2017/12/6.
 */
import React, { Component } from 'react'
import {
    Button
} from 'react-native'
import NavigatorUtils from '../core/NavigationUtils'

export default class extends Component {
    render() {
        return (
            <Button
                onPress = { () => {
                    NavigatorUtils.navigate("Demo1Screen")
                } }
                title = {"click me"}
            />
        )
    }
}