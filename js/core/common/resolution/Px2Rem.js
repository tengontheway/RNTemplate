/**
 * Created by evilcode on 16/03/2017.
 * 像素转换成rem单位,主要用来解决适配屏幕分辨率
 *
 * 假设根rem: pixel_per_rem = 16ppr = 1rem = 16pixel
 * 设计分辨率 = 美术效果图 = iPhone5s = 1136 * 640
 * RN获得屏幕Dimensions = 568 * 320, PixelRatio = 2
 * 美术效果图 间隔margin = 20pixel = 20pixel / (16ppr * PixelRatio) = 20 / 16 * 2 = 20 / 32 = px2rem(20)
 * 这样就可以保证美术的效果图标注的是多少像素，就可以直接填写多少
 *
 * 1.width、height、margin、font_size，都可以统一标注为像素
 * 2.flex无需修改
 * 3.border无需使用px2rem，否则会出现虚边的bug
 * 4.所有在代码中直接写死的style, 如果需要rem等写法，必须写到EStyleSheet.create中，否则会出现无法识别的情况(默认是用StyleSheet识别)
 * 5.圆角的时候有问题(未解决，像素/32后产生小数情况)
 *
 * 参考文章:
 * 移动web适配利器-rem: http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/#prettyPhoto
 * 30行js让你的rem弹性布局适配所有分辨率(含竖屏适配) http://www.tuicool.com/articles/yA7BfaZ
 * rem实现等比例适配所有屏幕 https://segmentfault.com/a/1190000005073196
 */

 /**
 * 像素转换成rem单位,主要用来解决适配屏幕分辨率
 * @param px 美术标注的设计分辨率下对应的px,不需要额外处理PixelRatio
 * @returns {string} eg.'1.5rem'
 */
function px2rem(px) {
    return px/32 + 'rem'
}

export default px2rem

