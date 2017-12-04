/**
 * 通用的搜索点击栏
 * 组成: 一个类似于输入框的点击按钮 + 居中的搜索图片+搜索文本
 * 功能:
 * 1.可定制背景色和样式
 * 2.可定制文本的样式
 * 3.可获得点击事件
 * Created by tzt on 9/19/16.

 eg.
 <CMSearchBarBtn
     text="查找"
     bgSearchStyleEx={{backgroundColor:'#eee', height: 20, marginLeft: 20, marginRight: 20}}
     textStyleEx={{color: 'green'}}
     onPress={
        () => {
            alert("click")
        }
    }
 />
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import
{
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

export default class CMSearchBarBtn extends Component {
    static propTypes = {
        text: PropTypes.string,           // 默认文本
        onPress: PropTypes.func,          // 点击按钮

        bgSearchStyleEx: PropTypes.any,   // 背景风格
        textStyleEx: PropTypes.any,       // 文本风格
    }

    static defaultProps = {
        text: '搜索',
        onPress: ()=>{},

        bgSearchStyleEx: {},
        textStyleEx: {}
    }

    constructor(props) {
        super(props)
    }

    onPressedSearch() {

    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={[styles.bgSearch, this.props.bgSearchStyleEx]} onPress={() => this.props.onPress() }>
                <View style={styles.searchBar}>
                    <Image style={styles.searchImg} source={require('./../img/search.png') }/>
                    <Text style={[styles.searchText, this.props.textStyleEx]}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
    },
    bgSearch: {
        backgroundColor: '#fff',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 5,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchText: {
        //color: '#eee'
    },
    searchImg: {
        width: 17,
        height: 17,
    },
})