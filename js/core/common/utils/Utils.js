/**
 * 全局公用函数
 *
 * 调用:
    import utils from './Util';
    utils.callFunc(...);
 */

import deepDiffer from 'deepDiffer'
import React from 'react'
import {
    Text,
    Platform
} from 'react-native'

import md5 from 'md5'
import iSort from './IntelligentSort'
import XORCipher from '../crypto/XORCipher'
import UtilsNetwork  from './UtilsNetwork'
import IDCardNoUtils from './IDCardNoUtils'
import CityCodeUtils from './CityCodeUtils'
import CalendarUtils from './CalendarUtils'
import DeviceInfo from 'react-native-device-info'


var Utils = UtilsNetwork || {}

Utils.idutils = IDCardNoUtils

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt)
{
    let o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    }

    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length))

    for(let k in o) {
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
    }

    return fmt
}



/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern=function(fmt) {
    let o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    }

    let week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    }

    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length))
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""])
    }

    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
        }
    }
    return fmt
}

// Date.prototype.formatex = function(mask) {
//
//     var d = this;
//
//     var zeroize = function (value, length) {
//
//         if (!length) length = 2;
//
//         value = String(value);
//
//         for (var i = 0, zeros = ''; i < (length - value.length); i++) {
//
//             zeros += '0';
//
//         }
//
//         return zeros + value;
//
//     };
//
//     return mask.replace(/"[^"]*"|'[^']*'|/b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])/1?|[lLZ])/b/g, function($0) {
//
//         switch($0) {
//
//             case 'd':   return d.getDate();
//
//             case 'dd':  return zeroize(d.getDate());
//
//             case 'ddd': return ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'][d.getDay()];
//
//             case 'dddd':    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
//
//             case 'M':   return d.getMonth() + 1;
//
//             case 'MM':  return zeroize(d.getMonth() + 1);
//
//             case 'MMM': return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
//
//             case 'MMMM':    return ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()];
//
//             case 'yy':  return String(d.getFullYear()).substr(2);
//
//             case 'yyyy':    return d.getFullYear();
//
//             case 'h':   return d.getHours() % 12 || 12;
//
//             case 'hh':  return zeroize(d.getHours() % 12 || 12);
//
//             case 'H':   return d.getHours();
//
//             case 'HH':  return zeroize(d.getHours());
//
//             case 'm':   return d.getMinutes();
//
//             case 'mm':  return zeroize(d.getMinutes());
//
//             case 's':   return d.getSeconds();
//
//             case 'ss':  return zeroize(d.getSeconds());
//
//             case 'l':   return zeroize(d.getMilliseconds(), 3);
//
//             case 'L':   var m = d.getMilliseconds();
//
//                 if (m > 99) m = Math.round(m / 10);
//
//                 return zeroize(m);
//
//             case 'tt':  return d.getHours() < 12 ? 'am' : 'pm';
//
//             case 'TT':  return d.getHours() < 12 ? 'AM' : 'PM';
//
//             case 'Z':   return d.toUTCString().match(/[A-Z]+$/);
//
//             // Return quoted strings with the surrounding quotes removed
//
//             default:    return $0.substr(1, $0.length - 2);
//
//         }
//
//     });
//
// }

/**
 trim() method for String

 var s = "   __haha sss  fff___   \t   ".trim();
 alert("aaa" + s + "bbb");
 * */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};

/**
 * 检索是否和数组中的某一个成员匹配
 * @param arr_keys 字符串数组
 */
String.prototype.includesOneOf = function(arr_keys) {
    for (let i = 0; i < arr_keys.length; ++i) {
        if (this.includes(arr_keys[i]))
            return true
    }

    return false
}

/**
 * 填充的公用函数
 * @param len 当期字符串的长度
 * @param target_len 目标长度
 * @param str_pad 填充的字符串
 * @private
 */
function _paddingBeginOrEnd(len, target_len, str_pad) {
    if (!str_pad || typeof str_pad !== 'string') {
        alert('String padding function has invalid param!')
        return
    }

    if (target_len <= len) {
        return
    }

    let pad_len = str_pad.length

    let delta = target_len - len
    let cnt = Math.floor(delta / pad_len)

    let t = str_pad.repeat(cnt)
    if (delta > cnt * pad_len) {
        t += str_pad.substring(0, delta - cnt * pad_len)
    }
    return t
}

/**
 *  未达到自定长度时，自动填充str_pad
 *  "2".padBegin(5, "abc") => "abca2"
 */
String.prototype.padBegin = String.prototype.padStart = function(target_len, str_pad) {
    let fill = _paddingBeginOrEnd(this.length, target_len, str_pad)
    if (fill) {
        return fill + this
    }

    return this
}

/**
 * 填充   "2".padEnd(5, "abc") => "2abca"
 * @param target_len
 * @param str_pad
 * @returns {*}
 */
String.prototype.padEnd = function(target_len, str_pad) {
    let fill = _paddingBeginOrEnd(this.length, target_len, str_pad)
    if (fill) {
        return this + fill
    }

    return this
}

/**
 * 将所有的key替换成val
 * @param key
 * @param val
 * @param ex_params 额外参数 'g'、'i'、'm'
     i	执行对大小写不敏感的匹配。
     g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
     m	执行多行匹配。
 */
String.prototype.replaceAll = function(key, val, ex_params = 'g') {
    return this.replace(new RegExp(key, ex_params), val)
}

/**
 * 返回匹配到key的索引列表
 * @param key
 */
String.prototype.indexOfAll = function (key) {
    if (!key || key.length <= 0 || this.length <= 0)
        return []

    let kl = key.length
    let arr = []
    let idx = 0
    while ((idx = this.indexOf(key, idx)) >= 0) {
        arr.push(idx)

        idx += kl
    }

    return arr
}



/**
 * 判断一个字符串是否是json
 * 在线检测: http://www.sojson.com/
 * @param str
 * @returns {boolean}
 */
Utils.isValidJson = function(str) {
    if (typeof str !== 'string')
        return false

    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

/**
 * 通过key
 * @param arr
 * @param key_name
 * @param key_value
 * @returns {number}
 */
Utils.getIndexByValue = function (arr, key_name, key_value) {
    for (let i = 0; i < arr.length; ++i) {
        let item = arr[i]
        if (item[key_name] == key_value)
            return i
    }

    return -1
}

/**
 * 直接修改原数组数据
 * @param arr
 * @param key_name
 * @param key_value
 * @returns {number}
 */
Utils.arrDelByIdx = function (arr, idx=0, cnt=1) {
    let removed_data = arr.splice(idx, cnt)
    return arr
}

/**
 * 根据值删除数组元素,只删除第一个遇到的
 * @param val
 */
Utils.arrDelByVal = function(arr, val) {
    for(let i= 0; i < arr.length; i++) {
        if(arr[i] === val) {
            arr.splice(i, 1)
            break
        }
    }
}


Utils.longToByteArray = function(/*long*/long) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = long & 0xff;
        byteArray [ index ] = byte;
        long = (long - byte) / 256 ;
    }

    return byteArray;
};

Utils.byteArrayToLong = function(/*byte[]*/byteArray) {
    var value = 0;
    for ( var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    }

    return value;
};

// @return bytes []
Utils.stringToByteArray = function(str) {
    var bytes = [];

    for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}

// string => uint8array
Utils.stringToUint8Array = function(str) {
    // return new TextEncoder('utf8').encode(str);
    // var string = btoa(unescape(encodeURIComponent(string))),
    //     charList = string.split(''),
    //     uintArray = [];
    // for (var i = 0; i < charList.length; i++) {
    //     uintArray.push(charList[i].charCodeAt(0));
    // }
    // return new Uint8Array(uintArray);
    var arr =  new Uint8Array(Buffer.from(str));
    return arr;
}

/**
 * http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript
 * uint8Array => string
 */
Utils.utf8ArrayToStr = (function () {
    var charCache = new Array(128);  // Preallocate the cache for the common single byte chars
    var charFromCodePt = String.fromCodePoint || String.fromCharCode;
    var result = [];

    return function (array) {
        var codePt, byte1;
        var buffLen = array.length;

        result.length = 0;

        for (var i = 0; i < buffLen;) {
            byte1 = array[i++];

            if (byte1 <= 0x7F) {
                codePt = byte1;
            } else if (byte1 <= 0xDF) {
                codePt = ((byte1 & 0x1F) << 6) | (array[i++] & 0x3F);
            } else if (byte1 <= 0xEF) {
                codePt = ((byte1 & 0x0F) << 12) | ((array[i++] & 0x3F) << 6) | (array[i++] & 0x3F);
            } else if (String.fromCodePoint) {
                codePt = ((byte1 & 0x07) << 18) | ((array[i++] & 0x3F) << 12) | ((array[i++] & 0x3F) << 6) | (array[i++] & 0x3F);
            } else {
                codePt = 63;    // Cannot convert four byte code points, so use "?" instead
                i += 3;
            }

            result.push(charCache[codePt] || (charCache[codePt] = charFromCodePt(codePt)));
        }

        return result.join('');
    };
})();

// 参考网址:http://ourcodeworld.com/articles/read/164/how-to-convert-an-uint8array-to-string-in-javascript
Utils.uint8ArrayToString = function(uint8array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = uint8array.length;

    i = 0;
    while(i < len) {
        c = uint8array[i++];
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = uint8array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = uint8array[i++];
                char3 = uint8array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}


/**
 * 检测身份证有效性
 * @param str
 * @returns {boolean}
 */
Utils.isCardID =  function (str) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(str);
}

/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
    出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
15位校验规则 6位地址编码+6位出生日期+3位顺序号
18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
公式(1)中：
i----表示号码字符从由至左包括校验码在内的位置序号；
ai----表示第i位置上的号码字符值；
Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
// 额外补充: 1.时间不能超过当前时间 2.校验日期是否有效，eg.19850230 2月份的30号
Utils.isValidID = function(code, cb_failed) {
    code = code.toUpperCase()

    let stm = code.substring(6, 14)
    let y = stm.substring(0, 4)
    let m = stm.substring(4, 6)
    let d = stm.substring(6, 8)

    // 1.检测时间的有效性
    let verify_stm = new Date(Date.parse(`${y}-${m}-${d}`))
    if (verify_stm.format("yyyyMMdd") != stm) {
        if (cb_failed) {
            cb_failed("非法的身份证!")        // 日期不合法 eg.0231
        }
        return false
    }

    // 2.小于当前时间
    if (Date.parse(verify_stm) >= new Date()) {
        if (cb_failed) {
            cb_failed("提前超生的身份证!")        // 日期不合法 eg.0231
        }
        return false
    }

    let city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    let tip = "";
    let pass= true;

    if(!code || !/^[1-9]\d{5}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "身份证号地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }

            let last = parity[sum % 11];
            if(last != code[17]){
                tip = "身份证号校验位错误";
                pass =false;
            }
        }
    }

    if(!pass) {
        if (cb_failed)
            cb_failed(tip)
    }
    return pass
}

/**
 * 解析身份证获得基本信息，有些信息获得的值可能为空
 * @param id 身份证 eg.420281198610291639
 */
Utils.parseID = function(id) {
    // 解析基本信息
    let ret = utils.idutils.getIdCardInfo(id)

    // 解析地址
    let addr = CityCodeUtils.getInfoByCode(ret.code)

    // 解析时间
    let born = `${ret.year}-${ret.month.toString().padStart(2, '0')}-${ret.day.toString().padStart(2, '0')}`
    let t = new Date(Date.parse(born))

    // 阳历转阴历
    let dt = CalendarUtils.solar2lunar(t)

    let sdt = `${dt.sYear}-${dt.sMonth.toString().padStart(2, '0')}-${dt.sDay.toString().padStart(2, '0')}`
    let ldt = `${dt.lYear}-${dt.lMonth.toString().padStart(2, '0')}-${dt.lDay.toString().padStart(2, '0')}`

    let result = {
        '18位身份证': utils.idutils.getID18(id),
        '性别': ret.gender,
        '行政区划代码': ret.code,
        '省': addr.length > 0 ? addr[0].name : '',
        '市': addr.length > 1 ? addr[1].name : '',
        '区': addr.length > 2 ? addr[2].name : '',
        '星座': ret.star,
        '年龄': dt.age,
        '阳历生日': sdt,
        '阴历生日': ldt,
        '阴历': dt.lunarMonth + '月' + dt.lunarDay,
        '星期': '星期' + dt.week,
        '属相': dt.lunarYear,
        '闰月': dt.isLeap ? "是" : '否',
        '年柱': dt.cYear,
        '月柱': dt.cMonth,
        '日柱': dt.cDay,
        '阳历节日': dt.solarFestival,
        '农历节日': dt.lunarFestival,
        '节气': dt.solarTerms,
    }

    return result
}

/**
 * 18位身份证转15位身份证
 * @param idCardNo
 * @returns {*}
 */
Utils.getID15 = function(idCardNo) {
    if(idCardNo.length==15){
        return idCardNo
    }else if(idCardNo.length==18){
        return idCardNo.substring(0,6) + idCardNo.substring(8,17)
    }

    return null
}

/*15位转18位*/
Utils.getID18 = function(idCardNo){
    if(idCardNo.length == 15){
        let id17 = idCardNo.substring(0,6) + '19' + idCardNo.substring(6);
        let parityBit = IDCardNoUtil.getParityBit(id17)
        return id17 + parityBit
    }else if(idCardNo.length==18){
        return idCardNo
    }

    return null
}

/**
 * 通过值查找对象
 var test = {
    key1: 42,
    key2: 'foo'
    };

 test.getKeyByValue( 42 );  // returns 'key1'
 * @param object 要查找的对象
 * @param value
 * @returns {string}
 */
Utils.getKeyByValue = function(object, value) {
    for( let prop in object ) {
        if( object.hasOwnProperty( prop ) ) {
            if( object[ prop ] === value )
                return prop;
        }
    }
}

////////////////////////////////////////正则表达式 start////////////////////////////////////////////////////////

/**
 * 检测字符串是否是合法的网站
 * @param str
 * @returns {boolean}
 */
Utils.isURL = function (str) {
    let reg = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$/;
    return reg.test(str);
}

/**
 * 检测字符串是否是合法的邮箱
 * @param str
 */
Utils.isEmail = function(str) {
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(str);
}

/**
 * 检测是不是正确的ip地址
 * @param str
 * @returns {boolean}
 */
Utils.isIpAdress = function (str) {
    var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return re.test(str);
}

/**
 * 判断是否是正确的车架号
 * @param str
 * @returns {boolean}
 */
Utils.isVIN = function (str) {
    var re = /^[a-zA-Z0-9]{17}$/
    return re.test(str)
}


/**
 检测是否是正确的电话号码
 (1)必须全为数字;
 (2)必须是11位.(有人说还有10位的手机号,这里先不考虑);
 (3)必须以1开头(有人见过以2开头的手机号吗?)
 (4)第2位是34578中的一个.
 * @param str
 * @returns {boolean}
 */
Utils.isPhone =function (str) {
    let reg = /^1[34578]\d{9}$/;
    return reg.test(str);
}

/**
 *  检测是否是5-6位的验证码
 * @param str
 * @returns {boolean}
 */
Utils.isVerifyCode = function (str) {
    let reg = /^\d{5,6}$/;
    return reg.test(str)
}

/**
 * 检查是否含有非法字符/<>
 * @param str
 * @returns {boolean}
 */
Utils.isIllegalChat = function (str) {
    let reg = /[<>/]+/g;
    return reg.test(str)
}
/**
 *  检查是否含有字符表情
 * @param str
 * @returns {boolean}
 */
Utils.isEmojiCharacter = function (str) {

    for (let i = 0; i < str.length; i ++) {

        let hs = str.charCodeAt(i)
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (str.length> 1){
                let  ls = str.charCodeAt(i + 1);
                let  uc =((hs-0xd800)* 0x400)+(ls-0xdc00)+ 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true ;
                }
            }
        } else if (str.length > 1) {

            let ls = str.charCodeAt(i + 1)
            if (ls == 0x20e3) {
                return true
            }
        } else {

            if (0x2100 <= hs && hs <= 0x27ff) {
                return true
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                return true
            }
        }
    }
    return false
}

/**
 * 是否是QQ
 * @param str
 * @returns {boolean}
 */
Utils.isQQ = function(str) {
    let reg = /^[1-9][0-9]{4,10}$/;
    return reg.test(str);
}

/**
 * 检查字符串是否是整数
 * @param {String} 字符串
 * @return {bool} 是否是整数
 */
Utils.isInteger = function(s) {
    let isInteger = /^[0-9]+$/;
    return (isInteger.test(s));
}

/**
 * 是否是有效的查询内容
 * 简体中文、繁体中文，英文，数字，空格, 邮箱(tzt@163.com)
 * 地址: 山东烟台（家里）
 *
     str = "你好"                // ok
     str = "龍的傳人"            // ok
     str = "发财發財123Abcd"     // ok
     str = "a b"                // ok
     teng_ontheway@163.com 发财發財123Abcd（家里）(是么)_-  //ok
 *
 * @param str 检测的字符串
 */
Utils.isValidSearch = function(str) {
    var reg = /^[\d|A-z|\u4E00-\u9FFF| @.（）()-_]+$/
    return reg.test(str)
}

/**
 * 检测是否是有效的中文名字
 * WARNING：不检测长度，只检测简体中文 包含 ·
 * @param str
 * @returns {boolean}
 */
Utils.isSimplifiedChineseName = function(str) {
    var reg = /^[\u4e00-\u9fa5]+$/
    return reg.test(str)
}

/**
 * 检测是否是有效的中文名字和点
 * WARNING：不检测长度，只检测简体中文 包含 ·
 * @param str
 * @returns {boolean}
 */
Utils.isSimplifiedChineseAddPointName = function (str) {
    var reg = /^[\u4e00-\u9fa5|·]+$/
    return reg.test(str)
}

/**
 * 判断是否是银行卡号
 * 16位的是信用卡
 * 19位是借记卡
 * @param str
 * @returns {boolean}
 */
Utils.isBankID = function (str) {
    var reg = /^(\d{16}|\d{19})$/
    return reg.test(str)
}
////////////////////////////////////////正则表达式 end////////////////////////////////////////////////////////

/**
 * 修正查询内容
 * 主要将查询内容中的【全角空格】替换成【半角空格】
 * @param str
 */
Utils.adjustSearchContent = function(str) {
    return str.replaceAll(' ', ' ')
}

/*
 判断字符类型
 */
Utils.CharMode = function(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 3;
    else
        return 4; //特殊字符
}

Utils.isCorectAccount = function(str) {
    var reg = /^[a-zA-Z0-9_\s]*$/;
    return reg.test(str);
}
/*
 统计字符类型
 */
Utils.bitTotal = function(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

/**
 * 判断字符串里面是否包含中文
 */

Utils.isCtainChinese = function(str) {
    var reg = /^[\u4e00-\u9fa5]$/;
    return reg.test(reg)
}
/*
 返回密码的强度级别
 */
Utils.checkStrong = function(sPW) {
    if (sPW.length <= 4)
        return 0; //密码太短
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

/**
 * 递归打印对象 优化了Object Array function 空字符串 null
 * @param o
 * @param lvl
 * @param go 要遍历的对象
 * @returns {string}
 */
Utils.recursiveToString = function(o, lvl, go, maxLvl = 10){
    if (lvl >= maxLvl) {
        return s = s + "\r\nmore...\r\n"
    }

    var space = '';
    for (let i = 0; i < lvl; ++i) {
        space += '\t';
    }

    var s = "";
    for (var property in o) {
        var val = o[property];

        if (val === go && lvl > 0) {
            val = 'self';
            s = s + "\r\n" + space + property  + ": "  + val + space;
        }
        else if (typeof(val) === 'object') {
            if (val == null) {
                val = 'null';
                s = s + "\r\n" + space + property  + ": "  + val + space;
                continue;
            }
            else if (val.constructor == Date) {
                s = s + "\r\n" + space + property  + ": "  + gfuncs.formatdate ('yyyy年mm月dd日hh时nn分ss秒', val); + " Local:" + val.toLocaleString()+ space;
                continue
            }
            else if (val.constructor == Object)
            {
                flag_start = "{";
                flag_end = "}";

            } else if (val.constructor == Array) {
                flag_start = '[';
                flag_end = ']';
            }

            s = s + "\r\n" + space + property  + ": " + flag_start + this.recursiveToString(val, lvl+1, go) + "\r\n" + space + flag_end;
        } else {
            if (typeof val === 'function') {
                let str = val.toString();
                let idx = str.indexOf('{');
                str = str.substring(0, idx);

                val =  str + " { ... }"
            } else if (typeof val === 'string') {
                let tmp = val;
                if (tmp.trim() === '') {
                    val = "'" + tmp + "'";
                }
            }
            s = s + "\r\n" + space + property +": " + val ;
        }
    }
    return s;
}

Utils.toString = function(data, alias="data", maxLvl = 10) {
    if (!__DEV__) return ''

    let t = {}
    t[alias] = data
    return Utils.recursiveToString(t, 0, data, maxLvl);
}

/**
 * Unix时间戳转JS的Date
 * @param timestamp unix时间戳 eg.
 * @returns {Date}
 */
Utils.getDate = function getDate(timestamp) {
    return new Date(parseInt(timestamp) * 1000)
}

/**
 * 时间戳转字符串
 */

Utils.getDateStr = function (stamp) {
    var newDate = utils.getDate(stamp);
    var dateStr = newDate.toDateString();
    return dateStr;
}




Utils.getTimestamp = function getDate(date) {
    return Date.parse(date)/1000;
}


/**
 * 生成32位消息的uuid，缺点是消息比较长
 * uuid生成规则 selfid_milltime
 * 为了避免同一毫秒发送多条信息，记录最后一条聊天信息的发送时间，如果相同，则前移一毫秒
 */
Utils.getMsgUUID = function getMsgUUID(self_id) {
    let d = new Date()
    let t = d.getTime()
    if (Utils._lastUUIDChatTime && t == Utils._lastUUIDChatTime) {
        t = Utils._lastUUIDChatTime + 1
    }
    Utils._lastUUIDChatTime = t

    let s = `${self_id}_${t}`
    return md5(s)
}

/**--------------------------------连接字符串 {
/**
 * 将一个字符串和一个数组的字符串组合
 * @param s eg.'a'
 * @param arr ['1', '2']
 * @returns {Array} ['a1', 'a2']
 */
Utils.concatArr = function(s, arr) {
    let ret = []
    for (let i = 0; i < arr.length; ++i) {
        ret[i] = s + arr[i]
    }

    return ret
}

/**
 * 将一个字符串数组和另外一个数组组合
 * @param str_arr 字符串数组  eg.['a', 'b']
 * @param arr 另外一个字符串数组 eg.['1', '2']
 * @returns {Array} eg.['a1', 'a2', 'a3', 'a4']
 */
Utils.concatArrs = function(str_arr, arr) {
    let ret = []

    for (let i = 0; i< str_arr.length; ++i) {
        let result = Utils.concatArr(str_arr[i], arr)
        ret = ret.concat(result)
    }

    return ret
}

/**
 * 将一个child为字符串数组的数组，遍历组合
 * @param arr [['a', 'b], ['1', '2']]
 * @return {Array} eg.['a1', 'a2', 'a3', 'a4']
 */
Utils.concatAllChildrens = function(arr) {
    arr = arr.filter((item) => {
        return Array.isArray(item) && item.length > 0
    })

    let ret = ['']
    for (let i = 0; i < arr.length; ++i) {
        let py_arr = arr[i]
        ret = Utils.concatArrs(ret, py_arr)
    }
    return ret
}

/** 连接字符串 } --------------------------------

/**
 * 克隆JS对象(深度拷贝)
 * @param obj 要克隆的对象
 * @returns {Clone}
 */
Utils.clone = function clone(obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

/**
 * 判断两个对象是否相等(深度对比,非指针对比)
 * @param a
 * @param b
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/differ/deepDiffer.js
 */
Utils.isEqual = function (a, b) {
    return !deepDiffer(a, b);
}

/**
 * 数字转字符串自动补全(格式化)
 * @param num 要补全的数值
 * @param n 总长度
 * @param pad_str 要不全的字符
 * @returns {*}

 pad(20, 1) => '20'
 pad(20, 4) => '0020'
 pad(20, 4, '1') => '1120'
 */
Utils.pad = function(num, n, pad_str='0') {
    var len = num.toString().length;
    while(len < n) {
        num = pad_str + num;
        len++;
    }
    return num;
}


// -----------------------------------测试模式-----------------------------------
/**
 * 生成随机姓名
 * @returns {string}
 */
Utils.sandboxName = function() {
    let familyNames = [
        "赵",  "钱",  "孙",  "李",  "周",  "吴",  "郑",  "王",  "冯",  "陈",
        "褚",  "卫",  "蒋",  "沈",  "韩",  "杨",  "朱",  "秦",  "尤",  "许",
        "何",  "吕",  "施",  "张",  "孔",  "曹",  "严",  "华",  "金",  "魏",
        "陶",  "姜",  "戚",  "谢",  "邹",  "喻",  "柏",  "水",  "窦",  "章",
        "云",  "苏",  "潘",  "葛",  "奚",  "范",  "彭",  "郎",  "鲁",  "韦",
        "昌",  "马",  "苗",  "凤",  "花",  "方",  "俞",  "任",  "袁",  "柳",
        "酆",  "鲍",  "史",  "唐",  "费",  "廉",  "岑",  "薛",  "雷",  "贺",
        "倪",  "汤",  "滕",  "殷",  "罗",  "毕",  "郝",  "邬",  "安",  "常",
        "乐",  "于",  "时",  "傅",  "皮",  "卞",  "齐",  "康",  "伍",  "余",
        "元",  "卜",  "顾",  "孟",  "平",  "黄",  "和",  "穆",  "萧",  "尹"
    ]
    let givenNames = [
        "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
        "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
        "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
        "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
        "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
        "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
        "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
        "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
        "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    ]

    let i = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
    let familyName = familyNames[i];

    let j = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
    let givenName = givenNames[i];

    let name = familyName + givenName;
    return name
}

/**
 * 模拟手机号码
 * @returns {string}
 */
Utils.sandboxPhone = function() {
    let prefixArray = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"]
    let i = parseInt(prefixArray.length * Math.random());
    let prefix = prefixArray[i];

    for (let j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix
}

Utils.sandboxBankAccount = function() {
    let prefix = "";
    switch (bank_no) {
        case "0102":
            prefix = "622202";
            break;
        case "0103":
            prefix = "622848";
            break;
        case "0105":
            prefix = "622700";
            break;
        case "0301":
            prefix = "622262";
            break;
        case "104":
            prefix = "621661";
            break;
        case "0303":
            prefix = "622666";
            break;
        case "305":
            prefix = "622622";
            break;
        case "0306":
            prefix = "622556";
            break;
        case "0308":
            prefix = "622588";
            break;
        case "0410":
            prefix = "622155";
            break;
        case "302":
            prefix = "622689";
            break;
        case "304":
            prefix = "622630";
            break;
        case "309":
            prefix = "622908";
            break;
        case "310":
            prefix = "621717";
            break;
        case "315":
            prefix = "622323";
            break;
        case "316":
            prefix = "622309";
            break;
        default:
    }

    for (let j = 0; j < 13; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }

    return prefix
}

/**
 * 沙盒身份证
 * @returns {string}
 */
Utils.sandboxID = function() {
    let coefficientArray = [ "7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];// 加权因子
    let lastNumberArray = [ "1","0","X","9","8","7","6","5","4","3","2"];// 校验码
    let address = "420101"; // 住址
    let birthday = "19810101"; // 生日
    let s = Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString();
    let array = (address + birthday + s).split("");
    let total = 0;
    for(let i in array){
        total = total + parseInt(array[i])*parseInt(coefficientArray[i]);
    }
    let lastNumber = lastNumberArray[parseInt(total%11)];
    let id_no_String = address + birthday + s + lastNumber;

    return id_no_String
}

/**
 * 沙盒邮箱
 * @returns {string}
 */
Utils.sandboxEmail = function() {
    return Math.floor(Math.random() * 99999999999) + "@qq.com"
}

/**
 * 解析路径
 * @param file_path 传入的路径 如下:
  [
 '/Users/qx/Library/Developer/CoreSimulator/1.png_low',
 '1.png',
 '/Users/tzt/aaa',
 'aaa'
 ]

 eg.
 data: [
 0: {
		full_path: /Users/qx/Library/Developer/CoreSimulator/1.png_low
		path: /Users/qx/Library/Developer/CoreSimulator/
		name: 1.png_low
		name_no_ext: 1
		ext: png_low
		ext_point: .png_low
	}
 1: {
		full_path: 1.png
		path: ''
		name: 1.png
		name_no_ext: 1
		ext: png
		ext_point: .png
	}
 2: {
		full_path: /Users/tzt/aaa
		path: /Users/tzt/
		name: aaa
		name_no_ext: aaa
		ext: ''
		ext_point: ''
	}
 3: {
		full_path: aaa
		path: ''
		name: aaa
		name_no_ext: aaa
		ext: ''
		ext_point: ''
	}
 ]
 */
Utils.parsePath = function(file_path) {
    let full_path = file_path
    let name = ''
    let name_no_ext = ''    // 不带后缀的文件名
    let path = ''      // 不带文件名,最后以'/'结束
    let ext = ''       // 后缀
    let ext_point = ''

    let s = file_path
    let idx = s.lastIndexOf('/')
    if (idx >= 0) {
        name = s.slice(idx+1)
        path = s.slice(0, idx+1)
    } else {
        name = s
    }

    let lidx = name.lastIndexOf('.')
    if (lidx >= 0) {
        ext = name.slice(lidx+1)
        name_no_ext = name.slice(0, lidx)
        ext_point = '.' + ext
    } else {
        ext = ''
        name_no_ext = name
        ext_point = ''
    }

    return {
        full_path,      // 原来的全路径(路径+文件名+扩展名)
        path,           // 不带文件名的路径，以'/'结束 eg. /Users/tzt/a.png => /Users/tzt/
        name,           // 文件名(带扩展名 eg. 'a.png')
        name_no_ext,    // 不带后缀名的文件名
        ext,            // 不带点的扩展名 eg. a.png => png
        ext_point,      // 带点的扩展名 eg. a.png => .png
    }
}

/**
 *计算聊天时间
 * @param startTime 目标时间 JS 下的Date数据
 * @param endTime  当前时间 JS 下的Date数据
 * @param dateFormate   显示时间的时间格式  年：yyyy 月：mm 日：dd 时：hh 分：nn 秒: ss
 * @returns {*} 字符串
 *
 * 今天 上午 hh:mm
 * 昨天 下午 hh:mm
 * 星期- 上午 hh:mm
 * 2016年10月28日 上午 hh:mm
 *
 */
Utils.convertToChatTime = function (startTime, endTime ) {
    let arrySpace = [0, 1, 5];
    let allShowKey = ['今天', '昨天', '星期'];
    let chinenseWeek = ['天', '一', '二', '三', '四', '五', '六'];
    let ret;
    let cutTime = gfuncs.formatdate('hh:nn', startTime);
    let delta_day = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24);

    if (delta_day === arrySpace[0]) {
        if (startTime.getHours() <= 12) {
            ret = (allShowKey[0] + ' 上午 ' + cutTime);
        } else {
            ret = (allShowKey[0] + ' 下午 ' + cutTime);
        }
    } else if (delta_day > arrySpace[0] && delta_day <= arrySpace[1]) {
        if (startTime.getHours() <= 12) {
            ret = (allShowKey[1] + ' 上午 ' + cutTime);
        } else {
            ret = (allShowKey[1] + ' 下午 ' + cutTime);
        }
    } else if (delta_day > arrySpace[1] && delta_day <= arrySpace[2]) {
        if (startTime.getHours() <= 12) {
            ret = (allShowKey[2] + chinenseWeek[startTime.getDay()] + ' 上午 ' + cutTime);
        } else {
            ret = (allShowKey[2] + chinenseWeek[startTime.getDay()] + ' 下午 ' + cutTime);
        }
    } else {
        if (startTime.getHours() <= 12) {
            ret = (gfuncs.formatdate("yyyy年mm月dd日", startTime) + ' 上午 ' + cutTime);
        } else {
            ret = (gfuncs.formatdate("yyyy年mm月dd日", startTime) + ' 下午 ' + cutTime);
        }
    }

    return ret;
}

/**
 * 聊天历史时间
 * @param startTime 目标时间 JS 下的Date数据
 * @param endTime  当前时间 JS 下的Date数据
 * @param dateFormate   显示时间的时间格式  年：yyyy 月：mm 日：dd 时：hh 分：nn 秒: ss
 * @returns {*} 字符串
 *
 * 上午 hh:mm
 * 昨天
 * 星期-
 * 2016年10月28日 上午 hh:mm
 *
 */

Utils.chatHis = function (startTime, endTime ) {
    let arrySpace = [0, 1, 5];
    let allShowKey = ['今天', '昨天', '星期'];
    let chinenseWeek = ['天', '一', '二', '三', '四', '五', '六'];
    let ret;
    let delta_day = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24);

    if (delta_day === arrySpace[0]) {
            let cutTime = gfuncs.formatdate('hh:nn', startTime);
        if (startTime.getHours() <= 12) {
            ret = ('上午 ' + cutTime);
        } else {
            startTime.setHours(startTime.getHours() - 12);
            let afternoon = gfuncs.formatdate('hh:nn',startTime);
            ret = ('下午 ' + afternoon);
        }
    } else if (delta_day > arrySpace[0] && delta_day <= arrySpace[1]) {
        ret = (allShowKey[1]);
    } else if (delta_day > arrySpace[1] && delta_day <= arrySpace[2]) {
        ret = (allShowKey[2] + chinenseWeek[startTime.getDay()] );
    } else {
        ret = (gfuncs.formatdate('yyyy/mm/dd', startTime));
    }

    return ret;
}


/**
 * 朋友圈的发布时间
 * @param start_time
 * @param end_time
 * @returns {*}
 */
Utils.convertToFriendCircleTime = function (start_time, end_time) {
    let today = new Date()

    let ty = today.getFullYear()
    let tm = today.getMonth()
    let td = today.getDate()

    let ey = end_time.getFullYear()
    let em = end_time.getMonth()
    let ed = end_time.getDate()
    let eh = end_time.getHours()
    let emm = end_time.getMinutes()
    let es = end_time.getSeconds()

    let yestertday = new Date(ty, tm, td-1)
    let pre_day = new Date(ty, tm, td-2)
    let pre_hour = new Date(ey, em, ed, eh - 1, emm, es);
    let pre_month = new Date(ey, em - 1, ed);
    let delta_min = Math.floor((end_time.getTime() - start_time.getTime()) / (60 * 1000));

    let arr_times = ['刚刚', '分钟前', '小时前', '昨天', '天前'];

    let ret;
    if (delta_min === 0) {
        ret = arr_times[0];
    } else if (delta_min > 0 && start_time > pre_hour) {
        ret = delta_min + arr_times[1]
    } else if (start_time > yestertday && start_time < pre_hour) {
        ret = Math.floor(delta_min / 60) + arr_times[2];
    } else if (start_time < yestertday && start_time > pre_day) {
        ret = arr_times[3];
    } else if (start_time < pre_day && start_time > pre_month) {
        ret = Math.floor(delta_min / 60 / 24) + arr_times[4];
    } else {
        ret = gfuncs.formatdate('yyyy年mm月dd日', start_time);
    }
    return ret;
}


/**
 * 调整朋友圈图片的大小(进行缩放)
 * 参考: 微信朋友圈图片处理策略: http://blog.csdn.net/jaycee110905/article/details/50600566
 * @param width
 * @param height
 */
Utils.adjustFriendCircleImgSize = function (width, height) {
    let w = width
    let h = height

    let wmax = width >= height
    let ratio = wmax ? (width / height) : (height/width)

    const LIMIT = 1280
    if (width <= LIMIT && height <= LIMIT) {
        // do nothing...
    } else if (width > LIMIT || height > LIMIT) {
        if (ratio <= 2) {
            // 宽或者高大于1280，但是图片宽度高度比小于等于2，则将图片宽或者高取大的等比压缩至1280
            if (wmax) {
                w = LIMIT
                h = (LIMIT * height) / width
            } else {
                h = LIMIT
                w = (LIMIT * width) / height
            }
        } else {
            // c，宽或者高大于1280，但是图片宽高比大于2时，并且宽以及高均大于1280，则宽或者高取小的等比压缩至1280
            // d，宽或者高大于1280，但是图片宽高比大于2时，并且宽或者高其中一个小于1280，则压缩至同尺寸的小文件图片
            if (width > LIMIT && height > LIMIT) {
                if (wmax) {
                    h = LIMIT
                    w = (LIMIT * width) / height
                } else {
                    w = LIMIT
                    h = (LIMIT * height) / width
                }
            } else if (width < LIMIT || height < LIMIT) {
                w = LIMIT
                h = LIMIT
            }
        }
    }

    return {
        width: Math.floor(w),
        height: Math.floor(h)
    }
}

//////////////////////////////////////////////////////标签/////////////////////////////////////////////////////////////
/**
 * 根据指定的索引列表切分字符串
 * eg."aabbaadd" 切分索引[0, 4], 长度 "aa".length = 2
 * @param str 要切分的字符串
 * @param arr_idxes 切分索引[0, 4]
 * @param len 切分的字符串的长度
 * @returns {Array} ["aa", "bb", "aa", "dd"]
 */
function split(str, arr_idxes, len) {
    let tlen = str.length
    let idx = 0

    let arr = []
    for (let i = 0; i < arr_idxes.length; ++i) {
        let v = arr_idxes[i]

        // console.log("v:" + v + " idx:" + idx)
        if (idx == v) {
            arr.push({
                idx: idx,
                len: len,
            })

            idx = v + len
        } else if (idx < v) {
            arr.push({
                idx: idx,
                len: v - idx,
            })

            arr.push({
                idx: v,
                len: len,
            })

            idx = v + len
        } else {
            arr.push({
                idx: idx,
                len: len
            })

            idx = v + len
        }
    }

    if (idx < tlen) {
        arr.push({
            idx: idx,
            len: tlen - idx
        })
    }

    let arrs = []
    arr.map((item, idx) => {
        let s = str.substring(item.idx, item.idx + item.len)
        arrs.push(s)
    })

    return arrs
}

/**
 * 根据key切分，并且保留key
 * @param str
 * @param key
 * @returns {Array} 切分后的字符串数组
 */
function _splitStringToArray(str, key) {
    let indexes = str.indexOfAll(key)
    let arrs = split(str, indexes, key.length)
    return arrs
}

/**
 * 一个字符数组,将匹配到的字符串再次细分成数组
 * @param arr_str 字符串数组
 * @param key 要查找的key
 * @returns {Array}
 */
function _splitStringArray(arr_str, key) {
    let arrs = []
    for (let i = 0; i < arr_str.length; ++i) {
        if (typeof arr_str[i] == 'string') {
            let arr = _splitStringToArray(arr_str[i], key)
            arrs = arrs.concat(arr)
        } else {
            arrs.push(arr_str[i])
        }
    }

    return arrs
}

/**
 * 根据keys列表来切分字符串
 * 根据第一个key，切分成数组。再根据第二个key，在切分的数组中再次查找并切分...
 * @param str
 * @param keys
 * @returns {Array.<*>}
 */
Utils.splitAllByKeys = function(str, keys) {
    let str_arr = [].concat(str)

    for (let i = 0; i < keys.length; ++i) {
        str_arr = _splitStringArray(str_arr, keys[i])
    }

    return str_arr
}

/**
 * 遍历一个字符串数组，将完全匹配的Key变成指定对象
 * @param arr_str
 * @param key
 * @param value
 * @returns {*}
 */
function _replaceLabel(arr_str, key, value) {
    for (let i = 0; i < arr_str.length; ++i) {
        let k = arr_str[i]
        if (typeof k == 'string' && k == key) {
            arr_str[i] = value
        }
    }

    return arr_str
}

/**
 * 将一个数组字符串遍历查找key并替换成value
 * @param arr_str
 * @param keys
 * @param values
 * @returns {*}
 */
function replaceAllLabels(arr_str, keys, values) {
    for (let i = 0; i < keys.length; ++i) {
        arr_str = _replaceLabel(arr_str, keys[i], values[i])
    }

    return arr_str
}

/**
 * 将一个字符串中所有匹配到的字符串替换成指定对象
 * @param str
 * @param keys
 * @param values
 */
Utils.replaceStringToAllLabels = function(str, keys, values) {
    let key_list = this.clone(keys)

    let arr = this.splitAllByKeys(str, key_list)
    let datas = replaceAllLabels(arr, key_list, values)
    return <Text>{datas}</Text>
}

/**
 *
 * @param str
 * @param keys
 * @param colors
 */
Utils.replaceStringToAllColorLabels = function(str, keys, colors) {
    let vals = []
    for (let i = 0; i < colors.length; ++i) {
        vals.push( <Text key={"cl" + i} style={{color: `${colors[i]}`}}>{keys[i]}</Text>)
    }
    return this.replaceStringToAllLabels(str, keys, vals)
}

/**
 * 替换字符串中所有匹配的key,并附加上颜色
 * @param str 要检索的字符串
 * @param keys 检索的key列表
 * @param def_color 默认颜色
 *
 * eg.
     let s = '四川成都高新区158号'
     let keys = ['成都', '158']
     let arrs1 = utils.replaceStringToDefColorLabels(s, keys, 'red')

     返回结果:
     <Text>
        四川
        <Text style={{color: 'red'}}>成都</Text>
        高新区
        <Text style={{color: 'red'}}>158</Text>
        号
     </Text>
 */
Utils.replaceStringToDefColorLabels = function(str, keys, def_color = 'red') {
    if (!keys || keys.length == 0)
        return str

    if (typeof keys === 'string')
        keys = [keys]

    let vals = new Array(keys.length).fill(def_color)
    return this.replaceStringToAllColorLabels(str, keys, vals)
}

/**
 * 调用指定函数
 * 如果是经过Redux wrapper后的对象，调用 this.core_component.getWrappedInstance().func(...)
 * @param params
 */
Utils.callReduxComponentFunc = function (component, func_name, ...params) {
    if (component) {
        if (component.getWrappedInstance)
        {
            let inst = component.getWrappedInstance()
            if (inst && inst[func_name] && typeof inst[func_name] === 'function') {
                if (inst[func_name](...params))
                    return true
            }
        } else if (component[func_name] && typeof component[func_name] === 'function') {
            if (component[func_name](...params))
                return true
        }
    }

    return false
}

//-------------------------------------------排序模块--------------------------------------------------------

/**
 * 智能排序，将打乱的数组排序按照指定需求进行排序
 * 主要用于搜索
 ** 会修改原来的数组
 * @param {Array} arr [{k: '手机', v: '15800000002', ...}, ...]
 * @param {Array} filters
 eg. [
 {
   equals: [
    '发件人',
    '发件人电话',
    '发件人地址',
    ],
    contains: [
    '发件人',
    ],
 }
 {
    equals: [
        '收件人',
        '收件人电话',
        '收件人地址',
    ],
    contains: [
        '收件人',
    ]
  }
  ...
 ]
 * @returns {*}
 */
Utils.iSort = function(arr, filters) {
    return iSort(arr, filters)
}

//-------------------------------------------加密/解密--------------------------------------------------------

/**
 * AES加密
 *
    必须在应用启动部分创建cipher和decipher

     global.gcrypto = {
        cipher : crypto.createCipheriv('aes-128-cfb', constant.CPW_KEY,constant.CPW_IV),
        decipher : crypto.createDecipheriv('aes-128-cfb', constant.CPW_KEY,constant.CPW_IV),
    }
 *
 * @param data
 */
Utils.aesEncrypt = function(data) {
    let crypted = gcrypto.cipher.update(data, 'utf8', 'hex')
    crypted += gcrypto.cipher.final('hex')
    return crypted
}

/**
 * 解密
 * @param encrypted
 */
Utils.aesDecrypt = function(encrypted) {
    let decrypted = gcrypto.decipher.update(encrypted, 'hex', 'utf8')
    decrypted += gcrypto.decipher.final('utf8')
    return decrypted
}

/**
 * 异或加密
 * 因为本地加密使用DES/AES必须匹配有序加密
 * @param data 要加密的字符串
 * @param pwd 密码
 * @returns {base64String} 加密后的字符串
 */
Utils.xorEncrypt = function(data, pwd = constant.CPW) {
    return XORCipher.cipher(pwd, data)
}

/**
 * 异或解密
 * 因为本地加密使用DES/AES必须匹配有序加密
 * @param data 要解密的字符串
 * @param pwd 密码
 */
Utils.xorDecrypt = function(data, pwd = constant.CPW) {
    return XORCipher.decipher(pwd, data)
}


/**
 * typedarray-polyfill
 * 因为出现过Uint8Array无法识别slice的情况，现在也未解
 * 采用的临时方法是把丢失的数组方法找回来
 * Polyfill to make sure that TypedArrays have complete methods
 * 参考链接:https://github.com/Financial-Times/polyfill-service/issues/714#event-677836640
 */
Utils.polyfill = function() {
    let methods = ['values', 'sort', 'some', 'slice', 'reverse', 'reduceRight', 'reduce', 'map', 'keys', 'lastIndexOf', 'join', 'indexOf', 'includes', 'forEach', 'find', 'findIndex', 'copyWithin', 'filter', 'entries', 'every', 'fill'];

    if (typeof Int8Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Int8Array.prototype[method]) Int8Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Uint8Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Uint8Array.prototype[method]) Uint8Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Uint8ClampedArray !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Uint8ClampedArray.prototype[method]) Uint8ClampedArray.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Int16Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Int16Array.prototype[method]) Int16Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Uint16Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Uint16Array.prototype[method]) Uint16Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Int32Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Int32Array.prototype[method]) Int32Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Uint32Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Uint32Array.prototype[method]) Uint32Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Float32Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Float32Array.prototype[method]) Float32Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof Float64Array !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!Float64Array.prototype[method]) Float64Array.prototype[method] = Array.prototype[method];
        }
    }
    if (typeof TypedArray !== 'undefined') {
        for (let i = methods.length; i--;) {
            let method = methods[i];
            if (!TypedArray.prototype[method]) TypedArray.prototype[method] = Array.prototype[method];
        }
    }
}

///////////////////////////////////////
/**
 *
 * @param type 键盘类型
    'number'                        纯数字
    'point_number'                  数字 + 小数点
 * @param default_keyboard
 * @returns {string}
 */
Utils.getKeyboardType = function(type, default_keyboard = 'default') {
    switch(type)
    {
        case "number":
        {
            if (Platform.OS == 'ios') {
                return 'number-pad'
            } else {
                return 'numeric'
            }
        }
        case 'point_number':
        {
            if (Platform.OS == 'ios') {
                return 'decimal-pad'
            } else {
                return 'numeric'
            }
        }
        default:
        {
            let t = ['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search']
            if (t.includes(default_keyboard)) {
                return default_keyboard
            }

            return 'default'
        }
    }
}

/**
 *  获得设备信息
 */
Utils.getDeviceInfo = function() {

    let manufacturer = DeviceInfo.getManufacturer()         // e.g. Apple
    let model = DeviceInfo.getModel()                       // e.g. iPhone 6
    let deviceId = DeviceInfo.getDeviceId()                 // e.g. iPhone7,2 / or the board on Android e.g. goldfish
    let systemName = DeviceInfo.getSystemName()             // e.g. iPhone OS
    let systemVersion = DeviceInfo.getSystemVersion()       // e.g. 9.0
    let bundleId = DeviceInfo.getBundleId()                 // e.g. com.learnium.mobile
    let buildNumber = DeviceInfo.getBuildNumber()           // e.g. 89
    let appVersion = DeviceInfo.getVersion()                // e.g. 1.1.0
    let appVersionReadable = DeviceInfo.getReadableVersion()// e.g. 1.1.0.89
    let deviceName = DeviceInfo.getDeviceName()             // e.g. Becca's iPhone 6
    let userAgent = DeviceInfo.getUserAgent()               // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
    let deviceLocale = DeviceInfo.getDeviceLocale()         // e.g en-US
    let deviceCountry = DeviceInfo.getDeviceCountry()       // e.g US

    let deviceInfo = {
        manufacturer,
        model,
        deviceId,
        systemName,
        systemVersion,
        bundleId,
        buildNumber,
        appVersion,
        appVersionReadable,
        deviceName,
        userAgent,
        deviceLocale,
        deviceCountry
    }
    console.log('device info: '+ utils.toString(deviceInfo))

    return deviceInfo

}

/**
 * 所有计算时间的地方都调用此函数
 * @param desc
 */
Utils.tlog = function(desc) {
    if (!Utils.__startTime) {
        Utils.__startTime = new Date()

        if (desc) {
            console.log("timeLog >> --------------- startTime")
        }
        return
    }

    let now = new Date()
    let dt = new Date() - Utils.__startTime

    Utils.__startTime = now

    if (!desc)
        desc = "time"
    console.log(`timeLog >> --------------- ${desc}:${dt}`)
}

//判断字符串是否包换数字和字母
Utils.passwordFrom = function(pwd){
    let zimu = /[a-zA-Z]/i
    let shuzi = /[0-9]/i
    if (zimu.test(pwd)) {
        if (shuzi.test(pwd)) {
            return true
        }
    }
    return false
}

/**
 *
 * 查找数组，返回匹配到的第一个index
 *
 * @param array 被查找的数组
 * @param feature 查找特征 或者为一个具体值，用于匹配数组遍历的值，或者为一个对象，表明所有希望被匹配的key-value
 * @param or boolean 希望命中feature全部特征或者只需命中一个特征，默认true
 *
 * @return 数组下标  查找不到返回-1
 */
Utils.findArray = function (array, feature, all = true) {
    for(let index in array){
        let cur = array[index];
        if(feature instanceof Object){
            let allRight = true;
            for(let key in feature){
                let value = feature[key];
                if(cur[key] == value && !all) return index;
                if(all && cur[key] != value){
                    allRight = false;
                    break;
                }
            }
            if(allRight) return index;
        }else{
            if(cur == feature){
                return index;
            }
        }
    }
    return -1;
}

/**
 * 遍历一个字符串数组，只要其中有一个元素是以 指定key开始的，返回true, 否则false
 * @param strArr
 * @param key
 * @returns {boolean}
 */
Utils.stringArrayStartsWith = function(strArr, key) {
    for (let m = 0; m < strArr.length; ++m) {
        if (strArr[m].startsWith(key)) {
            return true
        }
    }

    return false
}

/**
 *  time分钟向上取整 分钟时间 -> t天h小时m分钟
 * @param min_time
 * @returns {string}
 */
Utils.getMinutesCeilFromMinTime = function (min_time) {
    let min = min_time      // 分钟
    let hour                // 小时
    let day                 // 天
    let time = ''           // 几天几小时几分钟

    if (min_time > 60) {
        min = min_time % 60
        hour = parseInt(min_time / 60)

        if (hour > 24) {
            hour = parseInt(min_time /60) % 24
            day = parseInt(min_time / 60 / 24)
        }
    }

    if (day) {
        time = day + '天'
    }
    if (hour) {
        time += hour+'小时'
    }
    if (min) {
        //TODO min 向上取整
        time += Math.ceil(min)+'分钟'
    }

    return time
}


export default Utils;








































