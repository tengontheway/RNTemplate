/**
 * Created by Evil.Teng on 16/4/16.
 */
import pinyin from 'pinyin';

/**
 * 将数组所有首字母按拼音排序
 * @param arr
 * @returns {a: [], b: [], ..., z: [], zz: [] }
 */
function PinYinSort(arr, key){
    let data = {};
    for (let i = 0, length = arr.length; i < length; i++) {

        let first = pinyin(arr[i][key], {style: pinyin.STYLE_NORMAL})[0][0].substring(0, 1)

        if (first) {
            first = first.toLowerCase()
        }

        if (first >= 'a' && first <= 'z') {
            data[first] = data[first] || [];
            data[first].push(arr[i]);
        } else {
            data["#"] = data["#"] || [];
            data["#"].push(arr[i]);
        }

    }
    return data;
}

/**
 * 拼音数组 [{..., pinyin: "pinyin", ...}, ...]
 * @param py_arr，拼音数组，主要用到下面的pinyin的key
 * @param key
 * @returns {{}}
 * @constructor
 */
function PinYinSortEx(py_arr, key){
    let data = {};
    for (let i = 0, length = py_arr.length; i < length; i++) {
        let py = py_arr[i]

        let first = py[key][0][0]
        if (first) {
            first = first.toLowerCase()
        }

        if (first >= 'a' && first <= 'z') {
            data[first] = data[first] || [];
            data[first].push(py_arr[i]);
        } else {
            data["#"] = data["#"] || [];
            data["#"].push(py_arr[i]);
        }
    }
    return data;
}

export {
    PinYinSort,
    PinYinSortEx,
}