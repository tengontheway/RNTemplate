/**
 * OSS图片浏览
 */
import React, {Component, PropTypes} from 'react';
import
{
    View,
    StyleSheet,
    Dimensions,
    InteractionManager,
    Image,
} from 'react-native';

var {width, height} = Dimensions.get('window')

import ImageBrowseBase from './ImageBrowseBase'
import OssImgLowToHigh from '../../views/OssImgLowToHigh'

export default class ImageBrowseOSS extends ImageBrowseBase {

    static defaultProps = {
        ...ImageBrowseBase.defaultProps,
        ossLowCmd: `image/resize,m_lfit,w_${width},h_${height}`
    }

    static propTypes = {
        ...ImageBrowseBase.propTypes,
        ossLowCmd: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    /**
     * 重载渲染图片
     */
    onRenderCustomImg(item) {
        let img = <OssImgLowToHigh
            style={{resizeMode:'contain', width:width, height:height}}
            ossBucket={constant.OSS_BUCKET}
            ossFilePath={item.ossName}
            ossProcessLowCmd={this.props.ossLowCmd}
            width={width}
            height={height}
        />

        return img
    }
}