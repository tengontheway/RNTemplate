/**
 * Created by evilcode on 2017/12/6.
 * 测试存贮
 */
import React, { Component } from 'react'
import { ConnectWrapper } from '../core/common'
import {
    View,
    Text,
    Button
} from 'react-native'

const USER_RECORD = "UserRecord"

const DEF_DATA  = [
    {
        username: 'tzt',
        password: '123456'
    },
    {
        username: 'cjp',
        password: 'abcd'
    },
]

class DemoStorageScreen extends React.Component {

    state = {
        username: '',
        password: '',
        checked: true
    }


    render() {
        const { username, password } = this.state
        return (
            <View>
                <Text>账号: {username}</Text>
                <Text>密码: {password}</Text>

                <Button
                    onPress={() => this.onPressLoadStorage()}
                    title={"Load"}
                />

                <Button
                    onPress={() => this.onPressSaveStorage(0)}
                    title={`Save ${DEF_DATA[0].username}:${DEF_DATA[0].password}`}
                />
                <Button
                    onPress={() => this.onPressSaveStorage(1)}
                    title={`Save ${DEF_DATA[1].username}:${DEF_DATA[1].password}`}
                />

                <Button
                    onPress={() => this.onPressRemove()}
                    title={`Remove record`}
                />
            </View>
        )
    }

    onPressSaveStorage = (idx) => {
        const data = DEF_DATA[idx]

        const { checked } = this.state

        if (checked) {
            const expires_time_from_svr = 30 * 24 * 3600

            storage.save({
                key: USER_RECORD,
                data: {
                    username: data.username,
                    password: data.password
                },
                expires: expires_time_from_svr * 1000
            })
        } else {
            storage.remove({ key: USER_RECORD })
        }
    }

    onPressLoadStorage = () => {
        storage.load({ key: USER_RECORD })
            .then(({ username, password }) => {
                this.setState({
                    username,
                    password,
                })
            })
            .catch(() => {
                alert("记录不存在,请先保存！")
            })
    }

    onPressRemove = () => {
        storage.remove({ key: USER_RECORD })
            .then(() => {
                this.setState({
                    username: '',
                    password: ''
                })
            })
            .catch(() => { })
    }

}

export default ConnectWrapper(DemoStorageScreen, (state)=> {
    return {

    }
})