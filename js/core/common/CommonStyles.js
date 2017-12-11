/**
 * 通用样式 CommonStyles
 * 基本上和应用无关的样式,和应用相关的样式基本在CommonStyles中
 */
'use strict';
var React   = require('react-native');
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';

var cell_w = Dimensions.get('window').width;
var CommonStyles = StyleSheet.create({
    bgColor: {
        backgroundColor: '#F5FCFF'
    },
    justAlign: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    hcenter: {
        alignItems: 'center',
    },
    vcenter: {
        justifyContent: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_nobg: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexCol: {
        flexDirection: 'column',
    },
    flex1: {
        flex: 1,
    },
    wid: {
        width:cell_w,
    },
    flex_white: {
        flex: 1,
        backgroundColor:'white'
    }
});

export default CommonStyles;