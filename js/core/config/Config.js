/**
 * Created by tzt on 6/27/16.
 * 随着断线重连，里面的数据会被重置
 * bigbuff
 */

let Config = {
    SANDBOX_MODE: false,         // 沙盒模式，仅当DEV_MODE下有效
    TEST_MODE: false,                     // 测试模式
    TEST_VIEW: 'views.TestFaceIn',   // 测试界面

    TEST_VIEW_PROPS: {
        type: 'phone'
    },

    SERVER_PUB_KEY : 0,            // intrio64 服务器传来的seed,用来加密
    SERVER_PRIVATE_KEY : '',        // String 秘钥
    SERVER_AES_SERECT: null,          // Buffer md5(config.SERVER_PRIVATE_KEY, {"asBytes": true})
    SERVER_AES_IV: null,              // Buffer AES加密需要的IV: md5(config.SERVER_AES_SERECT)

    COLOR: {
        RED: 1,
        BLUE: 2,
    },

    CHAT_RECORDS: {                  // 所有人的聊天记录 key: id, value: []聊天记录

    },

    IS_LOGINED: false,    // 是否已登录到MsgServer(`重连时,直接登录到消息服务器)
    UNLOGINED_USER_TYPE: 0,    // 0：普通未登陆的用户   1：被拒绝的用户
    IS_KICKED: false,        // 已经被其他玩家踢下线
    HEART_BEAT_CD: 60,   // 心跳间隔
    HEART_BEAT_COUNTER: 0, // 心跳计时器
    IS_INITED_LOCAL_RESOURCES: false,    // 用户第一次登录(用于初始化)，用户退出就重置为false


    CIPHER: null,
    DECIPHER: null,     //解密

    IP: '',
    PORT: '8888',


    // 登录后信息
    SIP: '',
    SPORT: '',
    STOKEN: '',
    SUID: '', // 用户唯一ID
    MD5_SUID: '', //MD5后的SUID
    CHECKNUM:'', //审核编码

    USERNAME: 'user1',
    PWD: '110',
    NAME: '',
    ID: '',     //身份证
    PHONE: '',  //电话号码
    EMAIL: '',
    PROVINCE: '', //省份: 山东
    CITY: '',     //市: 烟台
    TOWN: '',     //镇: 招远
    UNIT: '',     //单位地址
    KIND: '',     //警种

    PHOTO1_NAME: '',    //上传证件正面的OSS名字(不包含bucketname, eg.bucket_name/15900010002路径就是15900010002)
    PHOTO2_NAME: '',    //上传证件正面的OSS名字

    // 截图
    IS_FRONT: true,     //截前屏
    IS_FRONT_UPLOADED: false,       // 上传身份图片(正面)成功
    IS_BACK_UPLOADED: false,        // 上传身份图片(背面)成功

    SESSIONGING_DATA: null,         // 附加数据


    //找回密码
    FEMAIL:'',

    // 数据库
    CUR_DB_P2P_TABLE: '',               // 当前打开的点对点表格

    POSITIONS: null,                  // 位置列表
    POSITION_LIST: null,             // 已经处理过的位置列表[ {name, pinyin, obj, index}, ... ]

    INITED_FRIEND_DB: false,         // 已经初始化FRIEND_DB
    DB_VERSIONS: {},                 // 所有数据库表格的版本保存，用于数据库升级

    MAINDB: {
        FIRSTLOGIN: true,           // 第一次登陆
        FIRSTINTOAPP: true,         // 第一次进入app
        ISMEMORYPASSWORD:true,        //记住密码
    },                      // 全局数据库内容
}


// 发布模式下强制关闭【沙盒模式】
Config.SANDBOX_MODE = __DEV__ ? Config.SANDBOX_MODE : false


// 发布模式下强制关闭【测试模式】
Config.TEST_MODE = __DEV__ ? Config.TEST_MODE : false


Config.SENDED_INFOS = []




//'192.168.0.102'//'182.139.182.248',//'www.cisiondata.com', 120.76.47.147 'www.jyt110.com'
Config.IP = __DEV__ ? '192.168.0.99' : 'www.cisiondata.com'//'www.cisiondata.com'           // app.cisiondata.com:8888 外网测试服务器

function _getVersionFlag() {
    if (__DEV__) {
        if (Config.IP.startsWith('192')) {
            return "DEV_IN"
        } else if (Config.IP.indexOf('jyt110') >= 0) {
            return "DEV_TEST_OUT"
        } else {
            return "DEV_OUT"
        }
    } else {
        if (Config.IP.startsWith('192')) {
            return "DIS_IN"
        } else if (Config.IP.indexOf('jyt110') >= 0) {
            return "DIS_TEST_OUT"
        } else {
            return ""
        }
    }

    return ''
}

Config.addSendedInfos = function (obj) {

    let flag = false   //没有重复的searchID

    this.SENDED_INFOS.map ((o , index) => {
        if (o.searchId === obj.searchId) {
            flag = true
        }

        if (o.times < obj.times) {
            o.times = obj.times
        }
    })

    if (!flag) {
        this.SENDED_INFOS.push(obj)
    }

    let new_arr = []
    this.SENDED_INFOS.map((o , index) => {
        if (o.times > 0) {
            new_arr.push(o)
        }
    })
    this.SENDED_INFOS = new_arr
}


Config.deletSendedInfos = function(obj) {
    let new_sendedInfoArr = []
    this.SENDED_INFOS.map((o, index) => {
        if (o.searchId !== obj.searchId) {
            new_sendedInfoArr.push(o)
        }
    })
    this.SENDED_INFOS = new_sendedInfoArr

}


// 版本标记，用来区分发布不同版本时，此应用属于什么版本
Config.VER_FLAG = _getVersionFlag()

Config.isOutIP = function() {
    if (Config.IP.startsWith('192'))
        return false

    return true
}

export default Config