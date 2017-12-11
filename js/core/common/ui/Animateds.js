/**
 * 封装所有的基本动画
 * Created by evilcode.cjp on 11/28/16.
 */


import React, {Component , Children} from  'react'

import {
    Animated,
    View,
    Text,
    Image,
}from 'react-native'

import coalesceNonElementChildren from './CoalesceNonElementChildren';

 class FadeAnimated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeOpacity: new Animated.Value(0),
        }
    }

    componentDidMount() {
        Animated.timing( this.state.fadeOpacity,  {
            toValue: 1,
            duration: 1000,
        }).start();
    }

    render() {

        let children = coalesceNonElementChildren(this.props.children, (child, index) => {
            return (
                <View key={index} >
                    {child}
                </View>
            );
        });


        return(
            <Animated.View style={[ {opacity: this.state.fadeOpacity} , this.props.style ? this.props.style : null]}>
                {children}
            </Animated.View>
        )
    }
}






const styles = {
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    },
    flex: {
        flex: 1,
    }
}

export {FadeAnimated}

























