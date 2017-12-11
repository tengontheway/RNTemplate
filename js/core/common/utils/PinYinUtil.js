/**
 * 拼音的通用函数
 * Created by EvilCode.Teng on 9/26/16.
 */

export default {}
//
// import pinyin from 'pinyin'
//
// import pinyinlite from 'pinyinlite/index_full'
//
// class PinYinUtil
// {
//     /**
//      * 解析成字符串数组
//      * @param str
//      * @return {Array}
//
//         安宁 拼音:anning
//         parseToArray("安宁") => [
//             0: [ 0: an ],
//             1: [ 1: ning ]
//         ]
//      */
//     static parseToArray(str) {
//         let py = pinyin(str, {style: pinyin.STYLE_NORMAL})
//         return py
//     }
//
//     /**
//      * 匹配字符串
//      * @param source_str
//      * @param key_str
//      * @returns {boolean}
//      */
//     static isMatchStr(source_str, key_str) {
//
//         let arr = PinYinUtil.parseToArray(source_str)
//
//         let str = arr.join("")
//
//         // TODO 特殊字符
//         let reg = /[*()]+/g
//
//         if (reg.test(key_str)) {
//             return false
//         }
//
//         let re = new RegExp(key_str+".*")
//
//         console.log('RegExp = '+ re)
//
//         if (key_str != '' && str.match(re) != null  || source_str.match(re) != null) {
//
//             return true
//
//         }
//         return false
//
//     }
//
//     /**
//      * 解析拼音成为字符串 数组
//      * 默认情况下，数组只有一个元素，多音字除外
//      * @param str
//      * @returns {string}
//
//         安宁 返回: anning
//         "招远" => ['zhaoyuan']
//         "重庆" => ["chognqing", "zhongqing"]
//      */
//     // TODO '嗯嗯'... 解析出来是空的
//     static parseToPinYinList(str) {
//         // 去掉空的数组 eg."重,庆" => [["chong", "zhong"], [], ['qing']]
//
//         let py = pinyinlite(str).filter(p => p.length > 0)
//
//         let arrs = utils.concatAllChildrens(py)
//         return arrs
//     }
//
//     /**
//      * 拼音检索匹配
//      * 匹配规则参考【美团】
//      * 以开头匹配，而非中间包含
//      * @param source_str 源字符串 eg."安宁"
//      * @param str_key 匹配的字符串 eg."ann"
//      * @returns {boolean} 返回是否能拼音检索到
//
//         安宁 an,ning
//          PinYinUtil.isMatch("安宁", "a")      ✔️
//          PinYinUtil.isMatch("安宁", "an")     ✔️
//          PinYinUtil.isMatch("安宁", "ann")    ✔️
//          PinYinUtil.isMatch("安宁", "anning") ✔️
//          PinYinUtil.isMatch("安宁", "ning")   false
//          PinYinUtil.isMatch("安宁", "nn")     false
//          PinYinUtil.isMatch("安宁", "anw")    false
//      */
//     static isMatch(source_str, str_key) {
//         let arr = PinYinUtil.parseToArray(source_str)
//         let s = ''
//         arr.map((item, idx)=>{
//             s += item[0]
//         })
//
//         return s.startsWith(str_key)
//     }
//
//     // 纠正多音字拼音
//     static AdjustedPinyin = {
//         "重庆" : "chongqing",
//         "重庆市" : "chongqingshi",
//     }
//
//     /**
//      * 获得修正后的拼音
//      * 没有找到返回null
//      */
//     static getAdjustPinyin(str) {
//         if (PinYinUtil.AdjustedPinyin[str]) {
//             return PinYinUtil.AdjustedPinyin[str]
//         }
//
//         return null
//     }
// }
//
// export default PinYinUtil
