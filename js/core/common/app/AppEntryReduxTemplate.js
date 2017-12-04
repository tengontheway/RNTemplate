/**
 * 应用启动模板类
 * 从AppEntryReduxBase派生的应用启动模板
 * Created by EvilCode.T on 17/10/2016.
 */
import React, {Component} from 'react';
import {
    AsyncStorage,
    NativeModules,
    NativeEventEmitter,
    PixelRatio,
    Dimensions,
    BackAndroid,
    AppState,
    Platform
} from 'react-native';


// redux related book keeping
import {NavMgr, PageContainer} from '../navbar'


// 全局初始化
import utils from '../utils/Utils';
import Storage from 'react-native-storage';
import {CommonStyles, GameStyles} from '../common';

import config from '../config/GlobalConfig';
import gfuncs from '../config/GlobalFuncs';
import Toast from '../components/Toast';
import NetCore from '../network/NetCore';

var PushNotification = require('react-native-push-notification');
import oss from '../oss/AliOSS';
import nativeUtils from '../common/native/NativeUtils';
var RNFS = require('react-native-fs');

var SQLite = require('react-native-sqlite-storage');

import AppEntryReduxBase from '../common/app/AppEntryReduxBase'

// notice that this is just a simple class, it's not a React component
export default class AppEntryReduxTemplate extends AppEntryReduxBase {
    constructor(props) {
        super(props)
    }

    onConstructorInit() {
        super.onConstructorInit()

        var storage = new Storage({
            // maximum capacity, default 1000
            size: 1000,

            // Use AsyncStorage for RN, or window.localStorage for web.
            // If not set, data would be lost after reload.
            storageBackend: AsyncStorage,

            // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
            // can be null, which means never expire.
            // defaultExpires: 1000 * 3600 * 24,

            // cache data in the memory. default is true.
            enableCache: true,

            // if data was not found in storage or expired,
            // the corresponding sync method will be invoked and return
            // the latest data.
            sync: {
                // we'll talk about the details later.
            }
        })

        // console.log (Date.now() + '🍎🍎');
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            },

            // ANDROID ONLY: (optional) GCM Sender ID.
            senderID: "YOUR GCM SENDER ID",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        });

        global.clone_config = utils.clone(config)

        global.storage = storage;
        global.utils = utils;
        global.GS = GameStyles;
        global.CS = CommonStyles;
        global.RNFS = RNFS;

        global.config = config;
        global.gfuncs = gfuncs;
        global.toast = Toast
        global.netcore = new NetCore();
        global.oss = oss;

        global.oss_evt_mgr = new NativeEventEmitter(NativeModules.AliOSS);
        global.nativeUtils = nativeUtils;
    }
}

