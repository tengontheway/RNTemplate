/**
 * Created by evilcode on 16/03/2017.
 * 屏幕分辨率的适配
 *
 * 参考:
 * 移动web适配利器-rem: http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/#prettyPhoto
 * 30行js让你的rem弹性布局适配所有分辨率(含竖屏适配) http://www.tuicool.com/articles/yA7BfaZ
 * rem实现等比例适配所有屏幕 https://segmentfault.com/a/1190000005073196
 *
 圆的处理:
 let style = EStyleSheet.create({
    $headImgSize: px2rem(80),
    heaImg: {
            height: '$headImgSize',
            width: '$headImgSize',
            borderRadius: '0.5 * $headImgSize',
        }
 })

 */
import
{
    Dimensions,
    Platform
} from 'react-native';

let {height, width} = Dimensions.get('window')

/**
 * 根据屏幕尺寸初始化rem
 * 适配参考: http://www.cnblogs.com/lijiageng/p/6423347.html
 *
    @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
      iphone 6
    }

    @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
        iphone 6 plus
    }

 * @returns {number}
 */
function getRemByDimensions() {
    return 16

    if (Platform.OS == 'android') {
        if (width < 340)
            return 16

        if (width > 400)
            return 18

        return 16
    } else {
        return 16
    }
}

export default getRemByDimensions
