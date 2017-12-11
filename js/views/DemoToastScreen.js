/**
 * Created by evilcode on 2017/12/6.
 */
import React, { Component } from 'react'
import { ConnectWrapper } from '../core/common'
import {
    View,
    Text,
    Button
} from 'react-native'

const DELTA = 15

class DemoToastScreen extends React.Component {
    render() {
        return (
            <View>

                <Button
                    onPress={() => this.onPressShow(0)}
                    title={"Show top short"}
                />

                <Button
                    onPress={() => this.onPressShow(1)}
                    title={`Show top short +${DELTA}`}
                />

                <Button
                    onPress={() => this.onPressShow(2)}
                    title={`Show top short -${DELTA}`}
                />

                <Button
                    onPress={() => this.onPressShow(3)}
                    title={"Show center long"}
                />

                <Button
                    onPress={() => this.onPressShow(4)}
                    title={`Show center long +${DELTA}`}
                />

                <Button
                    onPress={() => this.onPressShow(5)}
                    title={`Show center long -${DELTA}`}
                />


                <Button
                    onPress={() => this.onPressShow(6)}
                    title={"Show bottom short"}
                />

                <Button
                    onPress={() => this.onPressShow(7)}
                    title={`Show bottom short +${DELTA}`}
                />

                <Button
                    onPress={() => this.onPressShow(8)}
                    title={`Show bottom short -${DELTA}`}
                />

                <Button
                    onPress={() => this.onPressShow(9)}
                    title={"定制版"}
                />
            </View>
        )
    }

    onPressShow = (idx) => {


        switch(idx)
        {
            case 0:
                toast.showTopShort("bbbb")
                break
            case 1:
                toast.showTopShort("bbbb", DELTA)
                break
            case 2:
                toast.showTopShort("bbbb", -DELTA)
                break

            case 3:
                toast.showCenterLong("bbbb")
                break
            case 4:
                toast.showCenterLong("bbbb", DELTA)
                break
            case 5:
                toast.showCenterLong("bbbb", -DELTA)
                break

            case 6:
                toast.showBottomShort("bbbb")
                break
            case 7:
                toast.showBottomShort("bbbb", DELTA)
                break
            case 8:
                toast.showBottomShort("bbbb", -DELTA)
                break
            case 9:
                toast.showBottomShort("bbbb", 0, {
                    shadow: 'yellow',
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: 'red',
                    delay: 0,
                    onShow: () => {
                        // calls on toast\`s appear animation start
                    },
                    onShown: () => {
                        // calls on toast\`s appear animation end.
                    },
                    onHide: () => {
                        // calls on toast\`s hide animation start.
                    },
                    onHidden: () => {
                        // calls on toast\`s hide animation end.
                    }
                })
                break
        }
    }
}

export default ConnectWrapper(DemoToastScreen, (state)=> {
    return {

    }
})