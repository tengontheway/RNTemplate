/**
 *
 * Created by evilcode.cjp on 17/1/7.
 */
/**
 通用的搜索栏
 样式: 左边是icon，其次是编辑框，最后是搜索按钮

 - 可以扩充样式
 - 可以定制右侧的按钮
 - 将this.props 全部传递给TextInput，父类的扩展性更强

 <CMSearchBar
 styleEx={{flex:1, backgroundColor: '#eee'}}
 btnStyleEx={{backgroundColor: 'red'}}
 headHeight={50}
 placeHolder= {placeholder}
 onPressBtn={(text)=> this.onPressedSearch(text)}
 customIcon={require('../common/img/close.png')}
 onCustomRight={
          () => {
              return (
                  <TouchableOpacity
                                         onPress={() => {
                                             alert("Click")
                                         }}>
                  <Text>点击</Text>
              </TouchableOpacity>)
          }
      }
 />
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import
{
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Dimensions,
    PixelRatio,
} from 'react-native';
import {Constant} from '../../config/CoreConstant';
let {height, width} = Dimensions.get('window');

import Button from 'react-native-button';

export default class SearchBar extends React.Component {
    static propTypes = {
        styleEx: PropTypes.object,                 // 整个CMSearchBar的样式补充
        btnStyleEx: PropTypes.object,              // 按钮样式补充

        headHeight: PropTypes.number,             // 定制搜索栏高度
        onChangeHeadHeight: PropTypes.func,

        placeholder: PropTypes.string,
        keyboardType: PropTypes.string,       // 定制键盘类型

        onPressBtn: PropTypes.func,          // 搜索按钮
        onPressIcon: PropTypes.func,      // 点击图标
        text: PropTypes.string,

        onCustomRight: PropTypes.func,    // 定制右侧按钮
        customIcon: PropTypes.any,     // 定制ICON

        onChangeText: PropTypes.func,
        iconType: PropTypes.string,     // 显示icon类型 "search" "close'

        textInEx: PropTypes.object,                 // 整个输入框补充的样式补充

        showLeftSearchImage: PropTypes.bool    // 是否显示左边搜索image
    };

    static defaultProps = {
        headHeight: 35,
        onCustomRight: null,
        customIcon: require('./../img/search_s.png'),  // {uri: 'https://facebook.github.io/react/img/logo_og.png'}
        text: '',
        showLeftSearchImage: false
    }

    constructor(props) {
        super(props);

        this.iconType = this.props.iconType || 'search';
        this.text = this.props.text

    };

    componentWillReceiveProps(nextProps) {
        this.text = nextProps.text
    }

    componentDidMount() {
        if (this.props.onChangeHeadHeight)
            this.props.onChangeHeadHeight(this.props.headHeight);
    };

    _onChangeText(text) {
        if (this.props.onChangeTextIn) {
            this.props.onChangeTextIn(text);
        }
    }

    getText() {
        return this.text
    }

    onPressIcon() {
        if (this.props.onPressIcon)
            this.props.onPressIcon(this.iconType);
    }

    onBlur () {
        this.refs.search_s.blur()
    }

    render() {

        var icon = this.props.customIcon ? this.props.customIcon : require('./../img/search_s.png')
        var placeholder = this.props.placeholder || '搜索';

        // 右侧按钮
        let btn =
            <Button
                containerStyle={[styles.btn_container, this.props.btnStyleEx]}
                style={[{flex: 0}]}
                onPress={() => {
                    if (this.props.onPressBtn)
                        this.props.onPressBtn(this.text)
                } }>
                <Text style={styles.textBtn}>搜索</Text>
            </Button>

        let right_btn = this.props.onCustomRight ? this.props.onCustomRight() : btn

        // 提供给上层的接口是不允许被覆盖的，可能内部做了其他处理
        const {onChangeText, onSubmitEditing, ...others} = this.props

        return (
            <View style={[styles.head, {height: this.props.headHeight}, this.props.styleEx ? this.props.styleEx : null]}>
                <View style={styles.searchBar}>
                    <View style={[styles.searchBG , this.props.textInEx?  this.props.textInEx : null]  }>

                        {
                            this.props.showLeftSearchImage ?
                                <View>
                                    <TouchableOpacity activeOpacity={1} style={styles.searchBtn}
                                                      onPress={() => {
                                                          this.onPressIcon()
                                                      }}>
                                        <Image style={styles.searchImg} source={icon}/>
                                    </TouchableOpacity>
                                </View>
                                :
                                null
                        }

                        <View  style={styles.center}>
                            <TextInput
                                ref="search_s"
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={[styles.search, {fontSize:Constant.FONT_SMALL, paddingLeft:  this.props.showLeftSearchImage ? 0 : 8}]}
                                keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                                placeholder={placeholder}
                                defaultValue={this.props.text}
                                clearButtonMode="while-editing"
                                {...others}
                                onChangeText={(text) => this._onChangeText(text) }
                                onSubmitEditing={
                                    (event) => {
                                        if (this.props.onPressBtn)
                                            this.props.onPressBtn(event.nativeEvent.text)
                                    } }
                                underlineColorAndroid={'transparent'}
                            />
                        </View>

                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn_container: {
        // marginRight: 10,
        width: 50,
        height: 28,
        overflow: 'hidden',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtn: {
        color: 'white',
    },
    center: {
        justifyContent: 'center',
        alignItems: Platform.OS==='android'? null:'center',
        flex: 1,
    },
    img: {
        width: 31,
        height: 31,
        marginRight: 9
    },
    head: {
        // flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
    searchBG: {
        backgroundColor: 'white',     //f5f5f5
        borderColor: '#ccc',
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 20/PixelRatio.get(),
        justifyContent: 'center',
    },
    search: {
        flex:1,
        height: Platform.OS==='android'?50:30,
        // backgroundColor: 'yellow',     //f5f5f5
        justifyContent:'center',
        alignItems:'center',
        paddingTop:0,
        paddingBottom:0,
    },

    searchImg: {
        width: 15,
        height: 15,
    },
    searchBtn: {
        // position: 'absolute',
        // top: 13,
        // right: -30,
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',

    }
});