/**
 * Created by EvilCode.T on 11/01/2017.
 */


/**
 * 如果数组没有使用使用的元素中查找指定的
 * @param arr
 * @param eq_key
 * @returns {*}
 */
function equalFilt(arr, eq_key) {
    for (let idx in arr) {
        let item  = arr[idx]
        if (!item.__isUsed) {
            if (item.k == eq_key) {
                item.__isUsed = true
                return item
            }
        }
    }

    return null
}

/**
 * 从数组中筛选等于指定key的元素
 * @param arr
 * @param eq_key_arrs
 * @returns {Array}
 */
function equalFiltByArrs(arr, eq_key_arrs) {
    let t = []
    for (let i = 0; i < eq_key_arrs.length; ++i) {
        let item = equalFilt(arr, eq_key_arrs[i])
        if (item) {
            t.push(item)

            if (t.length == arr.length)
                break
        }
    }

    return t
}

function containFilt(arr, contain_key) {
    let t = []
    for (let idx in arr) {
        let item = arr[idx]

        if (!item.__isUsed) {
            if (item.k.includes(contain_key)) {
                item.__isUsed = true
                t.push(item)
            }
        }
    }

    return t
}

/**
 * 从数组中筛选包含指定key的元素
 * @param arr
 * @param contain_key_arrs
 * @returns {Array}
 */
function containFiltByArrs(arr, contain_key_arrs) {
    let t = []
    for (let i = 0; i < contain_key_arrs.length; ++i) {
        let items = containFilt(arr, contain_key_arrs[i])
        t = t.concat(items)

        if (t.length == arr.length)
            break
    }

    return t
}

/**
 * 总结没有过滤的对象
 * @param arr
 * @returns {Array}
 */
function otherFilt(arr) {
    let t = []
    for (let i = 0; i < arr.length; ++i) {
        if (!arr[i].__isUsed)
            t.push(arr[i])
    }

    return t
}


/**
 * 智能排序，根据过滤条件排序
 * @param arr
 * @param filter_arrs
 * @returns {*}
 */
function sSort(arr, filter_arrs) {
    let t = []
    for (let i = 0; i < filter_arrs.length; ++i) {
        let filter = filter_arrs[i]

        t = t.concat(equalFiltByArrs(arr, filter.equals))
        if (t == arr.length)
            return t

        t = t.concat(containFiltByArrs(arr, filter.contains))
        if (t == arr.length)
            return t
    }

    return t.concat(otherFilt(arr))
}


function testIntelligentSort() {
    let arr = [
        {
            k: '电话',
            v: '15811024484',
        },

        {
            k: '姓名',
            v: '滕正涛',
        },

        {
            k: '收件人地址',
            v: '软件园D7',
        },

        {
            k: '发件人',
            v: '滕正涛',
        },

        {
            k: '发件人电话',
            v: '15811024484',
        },

        {
            k: '发件人地址',
            v: '15811024484',
        },

        {
            k: '收件人电话',
            v: '15756357821',
        },

        {
            k: '收件人',
            v: '蔡静萍',
        },

        {
            k: '发件人邮箱',
            v: 'caijingping@163.com',
        },

        {
            k: '收件人邮箱',
            v: 'teng_ontheway@163.com',
        },

        {
            k: 'QQ',
            v: '404012456',
        },

        {
            k: '详细地址',
            v: '山东烟台招远',
        },
    ]

    let filter1 = {
        equals: [
            '姓名',
            '电话',
        ],
        contains: [
        ],
    }

    let filterSender = {
        equals: [
            '发件人',
            '发件人电话',
            '发件人地址',
        ],
        contains: [
            '发件人',
        ],
    }

    let filterReceiver = {
        equals: [
            '收件人',
            '收件人电话',
            '收件人地址',
        ],
        contains: [
            '收件人',
        ],
    }


    let t = sSort(arr, [filter1, filterSender, filterReceiver])
    console.log("--------------------------t:" + JSON.stringify(t))

    // 打印结果
    let result = {
        0: {
            k: '姓名',
            v: '滕正涛',
        },
        1: {
            k: '电话',
            v: '15811024484',
        },
        2: {
            k: '发件人',
            v: '滕正涛',
        },
        3: {
            k: '发件人电话',
            v: '15811024484',
        },
        4: {
            k: '发件人地址',
            v: '15811024484',
        },
        5: {
            k: '发件人邮箱',
            v: 'caijingping@163.com',
        },
        6: {
            k: '收件人',
            v: '蔡静萍',
        },
        7: {
            k: '收件人电话',
            v: '15756357821',
        },
        8: {
            k: '收件人地址',
            v: '软件园D7',
        },
        9: {
            k: '收件人邮箱',
            v: 'teng_ontheway@163.com',
        },
        10: {
            k: 'QQ',
            v: '404012456',
        },
        11: {
            k: '详细地址',
            v: '山东烟台招远',
        }

    }
}

export default sSort