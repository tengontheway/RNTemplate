/**
 * 图片浏览，类似于微信中的图片预览。
 * 点击图片后，显示要预览的图片列表，左右滑动预览.
 */
import React, {Component, PropTypes} from 'react';
import
{
    View,
    StyleSheet,
    Dimensions,
    InteractionManager,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

var {width, height} = Dimensions.get('window')

import Swiper from 'react-native-swiper'
import ImageZoom from 'react-native-image-pan-zoom'


export default class ImageBrowseBase extends Component {

    static defaultProps = {
        imageData: [],
        showPage: true,  // 默认展示
        index: 0,
    }

    static propTypes = {
        imageData: PropTypes.array, // 图片数组源
        onClick: PropTypes.func,    // 单击
        onDoubleClick: PropTypes.func, // 双击 问题：双击时也会触发单击
        onMomentumScrollEnd: PropTypes.func, // 滚动结束触发 index第几张从0开始  total总共
        showPage: PropTypes.bool, // 展示页面
        index: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this)  //需要在回调函数中使用this,必须使用bind(this)来绑定
        this._onDoubleClick = this._onDoubleClick.bind(this)
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this)
    }

    _onClick() {

        if (this.props.onClick) {
            this.props.onClick()
        }

    }
    _onDoubleClick() {

        if (this.props.onDoubleClick) {
            this.props.onDoubleClick()
        }

    }
    _onMomentumScrollEnd(e, state, context) {

        if (this.props.onMomentumScrollEnd) {
            this.props.onMomentumScrollEnd(context.state.index, context.state.total)
        }

    }

    /**
     * 重载渲染图片 override
     */
    onRenderCustomImg(item) {
        let img = <TouchableWithoutFeedback onPress={() => this._onClick()}>
            <Image
                style={{resizeMode:'contain', width:width, height:height}}
                source={{uri: item.uri}}/>
            </TouchableWithoutFeedback>

        return img
    }


    renderChildren() {
        let items = this.props.imageData.map((item, idx) => {

            return (
                <ImageZoom
                    key={idx}
                    cropWidth={width}
                    cropHeight={height}
                    imageWidth={width}
                    imageHeight={height}
                    maxOverflow={0}
                    onClick={() => this._onClick()}
                    onDoubleClick={() => this._onDoubleClick()}>

                    {this.onRenderCustomImg(item)}

                </ImageZoom>
            )

        })
        return items
    }

    render() {

        return (
            <Swiper style={styles.wrapper}
                    index={this.props.index}
                    bounces = {true}
                    loop = {false}
                    showsPagination={this.props.showPage}
                    dot = {
                        <View style={styles.dot} />
                    }
                    activeDot={
                        <View style={styles.activeDot} />
                    }
                    onMomentumScrollEnd = {(e, state, context)=>this._onMomentumScrollEnd(e, state, context)}>

                {this.renderChildren()}

            </Swiper>
        )

    }

}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'black'
    },
    dot: {
        backgroundColor:'white',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    },
    activeDot: {
        backgroundColor: '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    }
})