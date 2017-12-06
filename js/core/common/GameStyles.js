/**
* 和游戏相关的样式 GameStyles
* 基本上和应用相关的样式,和应用无关的样式基本在CommonStyles中
*
* 下划线命名规则:
* btn_*
* btn_login_ok_*
*/
'use strict';

var React   = require('react-native');
import {
    StyleSheet,
    PixelRatio,
    Dimensions,
} from 'react-native';
import {Constant} from '../config/CoreConstant';
var cell_w = Dimensions.get('window').width;
var GameStyles = StyleSheet.create({
    // 所有注册的根节点
    reg_root: {
        flex: 1,
        flexDirection: 'column'
    },
    reg_input_scrollview: {         // 所有注册的ScrollView样式
        backgroundColor: '#F3F3F3'
    },
    bg_color: {
        backgroundColor: '#F3F3F3'
    },
    pwd_bg: {
         backgroundColor: '#ED952A',
    },
    reg_bg: {
        backgroundColor: '#5786bb'
    },
    bas_but_con: {
        flex: 1,
        padding: 0,//Constant.DEFAULT_BUT_PADDING,
        overflow: 'hidden',
    },
    bas_but: {
        fontSize: 0,//Constant.FT_DEFAULT_TITLE,
        color: '#FFF',
        fontWeight: 'bold',
    },
    reg_input_image:{
        height:17.5,
        width:14,
        resizeMode: 'contain',
    },

});

export default GameStyles;