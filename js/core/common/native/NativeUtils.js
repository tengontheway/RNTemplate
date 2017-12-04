
/**
 * Created by Tzt on 8/31/16.

 OS下的通用函数
 */
'use strict';
import {
    NativeModules,
    Platform,
    NativeAppEventEmitter,
    Alert
} from 'react-native';

var RC_OCUitls = NativeModules.OCUtils;
var AndroidTools =NativeModules.AndroidTools
const { InAppUtils } = NativeModules

class NativeUtils
{
    /**
     * 获得图片库的文件的信息
     * @param al_imgage_path
     * eg.'assets-library://asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG';
     * @param cb (ret, data) => {}
     * 成功 ret=1
     * 失败 ret=0
     */
    getALImageData(al_imgage_path, cb) {
        if (Platform.OS==='android') {
            AndroidTools.getALImageData(al_imgage_path, cb);
        }else{
            RC_OCUitls.getALImageData(al_imgage_path, cb);
        };
    }

    /**
     * gif处理成image
     * @param image_path
     * @param cb
     */
    getStaticImageData(image_path, cb) {
        if (Platform.OS==='android') {

        }else{
            RC_OCUitls.getStaticImageData(image_path, cb)
        }
        
    }

    /**
     * 地址反编码
     * @param latitude
     * @param longitude
     * @param cb
     */
    getPlaceNameFromLatitude(latitude, longitude, cb) {
        if (Platform.OS==='android') {

        }else{
            RC_OCUitls.getPlaceNameFromLatitude(latitude, longitude, cb)
        }
        
    }

    getDataFromFile(file_path, cb) {
        if (Platform.OS==='android') {
            AndroidTools.getDataFromFile(file_path,cb);
        }else{
            RC_OCUitls.getDataFromFile(file_path, cb)
        }
    }

    /**
     * 获得设备UUID，升级系统等都不会丢失
     * @param cb
     */
    uuidForDevice(cb) {
        if (Platform.OS==='android') {
            AndroidTools.uuidForDevice(cb)
        }else{
            RC_OCUitls.uuidForDevice(cb)
        }
    }

    showAlert(title,content,btn,cb){
        if (Platform.OS === 'android') {
            AndroidTools.showAlert(title,content,btn,cb)
        }
    }

    dismissAlert(){
        if (Platform.OS === 'android') {
            AndroidTools.dismissAlert()
        }
    }

    openUrl(url){
        if (Platform.OS === 'android') {
            AndroidTools.openUrl(url)
        }
    }


    /**
     * 在应用中跳转到AppStore的应用下载链接
     * @param url 传入的地址 eg.https://itunes.apple.com/cn/app/jie-zou-da-shi/id493901993?mt=8 替换https =>itms-apps
     * WARNNING: 必须真机测试才有效果
     */
    openAppStore (url) {
        if (Platform.OS === 'ios') {
            RC_OCUitls.openAppStore(url)
        }
    }

    /**
     * 根据android手机的安卓系统版本判断是否支持沉浸式状态栏
     */
    getPhoneSDKVersion(cb){

        if (Platform.OS === 'android') {

            AndroidTools.getPhoneSDKVersion(cb)

        }else{
            // do nothing.
        }
    }

    // ios
    /**
     * 添加屏幕截屏观察者
     */
    addObserverScreenshot() {
        if (Platform.OS === 'android') {

        }else{
           RC_OCUitls.addObserverScreenshot() 
        }
        
    }

    /**
     * 监听截屏事件
     * @returns {*}
     */
    eventScreenshot(value) {
       if (Platform.OS === 'ios') {
            this.screenshot = NativeAppEventEmitter.addListener(
                'userDidTakeScreenShotNotification',
                () => {
                    if (!value) {
                        value = '本系统具备完整的查询日志记录，并向公安部门及纪检部门实时推送，请确保只用于工作查询，请勿在应用外传播查询内容!'
                    }

                    Alert.alert("提示", value, [{
                        text: '确定', onPress: () => {
                        }
                    }])
                }
            )
            return this.screenshot
        } 
    }

    /**
     * 移除截屏观察者
     */
    removeObserverScreenshot() {
        if (Platform.OS === 'android') {

        }else{
           RC_OCUitls.removeObserverScreenshot()
           this.screenshot && this.screenshot.remove() 
        }
        
    }

    /**
     * 查看权限是否可用 cb返回一个boolean参数 true-可用 false-不可用
     * permissionName 在Constan.ANDROID_PERMISSION
     */
    checkAndroidPermission(permissionName,cb){  
        if (Platform.OS === 'android') {
            AndroidTools.checkAndroidPermission(permissionName,cb)
        }
    }

    /**
     * 设置是否可以截图 true-可截图 false-不可截图
     */

     setIsCanScreenShot(boolean){
        if (Platform.OS === 'android') {
            AndroidTools.setIsCanScreenShot(boolean)
        }
     }

     /**
     * 设置键盘弹出模式
     */

     setWindowSoftInputMode(mode){
        if (Platform.OS === 'android') {
            AndroidTools.setWindowSoftInputMode(mode)
        }
     }
     // 友盟 自定义事件,数量统计
    umengEventId(eventId, label = '') {

        if (__DEV__) {
            return
        }

         if (Platform.OS === 'ios') {
             RC_OCUitls.umengEventId(eventId, label)
         }else{
            AndroidTools.setMobclickAgent(eventId)
         }
    }

    // 统计点击行为各属性被触发的次数
    umengEventIdAddAttributes(eventId, attributes) {
        
        if (__DEV__) {
            return
        }

        if (Platform.OS === 'ios') {
            RC_OCUitls.umengEventIdAddAttributes(eventId, attributes)
        }else{
            AndroidTools.umengEventIdAddAttributes(eventId,attributes)
        }
    }

    // 友盟统计 计算事件
    umengEventValue(eventId, attributes, num) {
        
        if (__DEV__) {
            return
        }

        if (Platform.OS === 'ios') {
            RC_OCUitls.umengEventValue(eventId,attributes,num)
        }else{
            AndroidTools.umengEventValue(eventId,attributes,num)
        }
    }

    /** 自动页面时长统计, 开始记录某个页面展示时长.
     使用方法：必须配对调用beginLogPageView:和endLogPageView:两个函数来完成自动统计，若只调用某一个函数不会生成有效数据。
     在该页面展示时调用beginLogPageView:，当退出该页面时调用endLogPageView:
     @param pageName 统计的页面名称.
     @return void.
     */
    umengBeginLogPageView(pageName) {

        if (__DEV__) {
            return
        }

        if (Platform.OS === 'ios') {
            RC_OCUitls.umengBeginLogPageView(pageName)
        }else{
            AndroidTools.setOnPageStart(pageName)
        }
    }

    umengEndLogPageView(pageName) {

        if (__DEV__) {
            return
        }

        if (Platform.OS === 'ios') {
            RC_OCUitls.umengEndLogPageView(pageName)
        }else{
            AndroidTools.setOnPageEnd(pageName)
        }

    }
}


var native_utils = new NativeUtils();

export default native_utils;


