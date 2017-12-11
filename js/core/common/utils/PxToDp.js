/**
 * 按照设计分辨率转换PT
 * 美术提供的效果图按照的是设计分辨率 eg.iPhone5 960*640
 * 应用中按照的是DP单位 = 分辨率 / pixelRatio = (1334/2) * (750/2) = 667 * 350
 * 参考链接: https://segmentfault.com/a/1190000004878644
 *
 * dp转像素：getPixelSizeForLayoutSize(layoutSize: number)
 *
 * * Created by Tzt on 9/18/16.
 */
import {Dimensions} from 'react-native';

// app 只有竖屏模式，所以可以只获取一次 width
// iphone 6 分辨率= 1334*750, dp=(1334/2) * (750/2) = 667 * 350
const deviceWidthDp = Dimensions.get('window').width;

// UI 默认给图是 640
const uiWidthPx = 640;

function pxToDp(uiElementPx) {
    return uiElementPx *  deviceWidthDp / uiWidthPx;
}

export default pxToDp;