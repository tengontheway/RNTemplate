/**
 * Created by evilcode on 21/02/2017.
 * 参考链接:https://gist.github.com/sukima/5613286
 *
 * 优化:
 * 1.加密/解密的key原来只能传字符串，现在可以传字符串和数组
 * 2.原来加密无法加密中文，现在处理:
 * string => uint8array => encrypt => encrypted string => decrypt => uint8array => string
 */
// XORCipher - Super simple encryption using XOR and Base64
//
// Depends on [Underscore](http://underscorejs.org/).
//
// As a warning, this is **not** a secure encryption algorythm. It uses a very
// simplistic keystore and will be easy to crack.
//
// The Base64 algorythm is a modification of the one used in phpjs.org
// * http://phpjs.org/functions/base64_encode/
// * http://phpjs.org/functions/base64_decode/
//
// Examples
// --------
//
//     XORCipher.cipher("test", "foobar");   // => "EgocFhUX"
//     XORCipher.decipher("test", "EgocFhUX"); // => "foobar"
//
/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, strict:true,
 undef:true, unused:true, curly:true, browser:true, indent:2, maxerr:50 */
/* global _ */

"use strict";


var b64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function b64_encode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = "";
    if (!data) { return data; }
    do {
        o1 = data[i++];
        o2 = data[i++];
        o3 = data[i++];
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        enc += b64_table.charAt(h1) + b64_table.charAt(h2) + b64_table.charAt(h3) + b64_table.charAt(h4);
    } while (i < data.length);
    r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
}

function b64_decode(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
    if (!data) { return data; }
    data += "";
    do {
        h1 = b64_table.indexOf(data.charAt(i++));
        h2 = b64_table.indexOf(data.charAt(i++));
        h3 = b64_table.indexOf(data.charAt(i++));
        h4 = b64_table.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        result.push(o1);
        if (h3 !== 64) {
            result.push(o2);
            if (h4 !== 64) {
                result.push(o3);
            }
        }
    } while (i < data.length);
    return result;
}

function keyCharAt(key, i, str_key) {
    if (str_key) {
        return key.charCodeAt( Math.floor(i % key.length) )
    } else {
        return key[i]
    }
}

/**
 * @param key {Array/String}
 * @param data {String} 要加密的字符串
 * @returns {Array}
 */
function xor_encrypt(key, data) {
    // return _.map(data, function(c, i) {
    //     return c.charCodeAt(0) ^ keyCharAt(key, i);
    // });

    let skey = typeof key == 'string'
    let arr = utils.stringToUint8Array(data)

    let a = []
    for (let i = 0; i < arr.length; ++i) {
        a.push(arr[i] ^ keyCharAt(key, i, skey))
    }
    return a
}

/**
 * @param key {Array/String}
 * @param data {String} 要解密的字符串
 * @returns {Array}
 */
function xor_decrypt(key, data) {
    // return _.map(data, function(c, i) {
    //     return String.fromCharCode( c ^ keyCharAt(key, i) );
    // }).join("");


    let skey = typeof key == 'string'

    let arr = []
    for (let i = 0; i < data.length; ++i) {
        arr.push(data[i] ^ keyCharAt(key, i, skey))
    }

    // return utils.uint8ArrayToString(arr)   // TODO 字符表情问题
    return utils.utf8ArrayToStr(arr)
}

var XORCipher = {
    cipher: function(key, data) {
        data = xor_encrypt(key, data);
        return b64_encode(data);
    },
    decipher: function(key, data) {
        data = b64_decode(data);
        return xor_decrypt(key, data);
    }
};

export default XORCipher