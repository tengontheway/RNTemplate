/**
 * Created by EvilCode.T on 11/11/2016.
 */
/**
 * 播放视频的基类
 * Created by EvilCode.Tzt
 */
'use strict';
import React, { Component, PropTypes } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Video from 'react-native-video';

export default class VideoPlayPreview extends Component {
    constructor(props) {
        super(props);

        this.onLoad = this.onLoad.bind(this)
        this.onProgress = this.onProgress.bind(this)
        this.onEnd = this.onEnd.bind(this)


        /**
         rate={1.0}                     // 0 is paused, 1 is normal.
         volume={1.0}                   // 0 is muted, 1 is normal.
         muted={false}                  // Mutes the audio entirely.
         paused={false}                 // Pauses playback entirely.
         resizeMode="cover"             // Fill the whole screen at aspect ratio. eg.'cover'、'contain'、'stretch'
         repeat={true}                  // Repeat forever.
         playInBackground={false}       // Audio continues to play when app entering background.
         playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
         progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
         onLoadStart={this.loadStart}   // Callback when video starts to load
         onLoad={this.setDuration}      // Callback when video loads
         onProgress={this.setTime}      // Callback every ~250ms with currentTime
         onEnd={this.onEnd}             // Callback when playback finishes
         onError={this.videoError}      // Callback when video cannot be loaded
         */
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            paused: true,
            skin: 'custom',

            firstPlayEnded: false,      // 第一次播放结束
        }
    }

    static propTypes = {
        isShowEndedText: PropTypes.bool,          // 第一遍播放结束后，下方显示"轻点退出",仅当"contain"模式有效
    }

    static defaultProps = {
        isShowEndedText: true
    }

    onLoad(data) {
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    onEnd(data) {
        this.setState({firstPlayEnded: true})

        if (this.props.onEnded()) {
            this.props.onEnded()
        }
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    renderNativeSkin() {
        return (
            <View style={styles.container}>
                <View style={styles.fullScreen}>
                    <Video
                        source={{uri: "killer"}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        repeat={true}
                        controls={this.state.controls}
                    />
                </View>
            </View>
        );
    }

    render() {
        return this.renderNativeSkin()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 44,
        left: 4,
        right: 4,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
    },
    skinControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    nativeVideoControls: {
        top: 184,
        height: 300
    }
});