/**
 * 本地图片浏览
 */
import React, {Component, PropTypes} from 'react';
import
{
    Dimensions,
    Image,
} from 'react-native';

var {width, height} = Dimensions.get('window')
import ImageBrowseBase from './ImageBrowseBase'

export default class ImageBrowseLocal extends ImageBrowseBase {

    static defaultProps = {
        ...ImageBrowseBase.defaultProps
    }

    static propTypes = {
        ...ImageBrowseBase.propTypes
    };

    constructor(props) {
        super(props);
    }

    /**
     * 重载渲染图片
     */
    onRenderCustomImg(item) {
        let img = <Image
            style={{resizeMode: 'contain', width: width, height: height}}
            source={{uri: item.uri}}/>

        return img
    }
}