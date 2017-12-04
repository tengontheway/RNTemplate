/**
 * Created by evilcode on 2017/12/4.
 */
var LoginErrInfo = {};


var CheckUserDenyReason ={}




// 手机运营商
var PhoneOP= {
    cardNo: '卡号ID',
    phone: '手机号',
    rcall: '登记电话号码',
    name: '用户名',
    sex: '性别',
    birthday: '出生日期',
    userType: '用户类型卡类型',
    serviceCode: '服务码',
    address: '使用人的联系地址',
    balance: '手机余额',
    Province: '手机注册号的省',
    city: '手机注册号的市/县',
    brand: '手机品牌',
    phoneModel: '手机型号',
    phonePrice: '手机价格',
    idCard: '身份证号码',
    operatorName: '运营商名称',
    operatorType: '运营商类型',
    operatorBrand: '运营商品牌',
    nationality: '国籍',
    zipCode: '注册邮编',
    networkModel: '网络模式',
    registerBusiness: '注册营业厅',
    remarks: '备注',
    phonePackage: '手机套餐',
    phoneState: '卡号状态',
    credit: '信用度',
    email: '注册时邮箱',
    areaCode: '区号',
    totalConsumption: '总消费',
    expirationDate: '失效日期',
    imsiNumber: 'IMSI号',
    cmccIdentification: 'cmcc运营公司标识',
    region: '手机注册区域',
    companyName: '在职公司',
    registerDate: '卡号注册日期',
    userName: '用户名',
    password: '密码',
    account: '账号',
    carBrand: '汽车商标',
    licensePlate: '车牌',
    insuredMoney: '投保金额',
};


var Constant = {
    // 数据中心的数据来源提示
    IM_DATACENTER_TIPS:  "• 警友通所调用的所有数据源均来自互联网，不涉及任何专网数据。\n\n• 警友通所调用的所有数据源均来自互联网，因互联网部分数据的真实性无法核查，使用之前请再次核实，数之星科技不保证数据的全部有效性和真实性，并不因此承担相应的法律责任。\n\n• 警友通提供的数据查询、人脸识别、即时通信等功能仅限于用户群体的侦查、破案、协作等工作使用。若因个人原因非法或非以上原因使用警友通的应用功能所导致的后果由使用人自己承担，数之星科技不承担相应法律责任。若警友通用户在使用该应用的过程中调离原侦查单位或不再进行相应的侦查、破案、协作等工作，请使用人主动退出应用系统不再使用相关的功能并即时注销警友通账号，因未即时退出或注销而继续使用相关服务而导致的一切后果由其本人承担，数之星科技不承担相应法律责任。\n\n• 本系统具备完整的查询日志记录，并向公安部门及纪检部门实时推送，请确保只用于工作查询，请勿在应用外传播查询内容!\n\n",

    IM_APP_VISIN_TIP: '• 本应用仅为试用版，正式版可能会删除用户数据\n\n',

    IM_APP_VISIN_TIP_FREE: '• 本软件免费\n',

    IM_ACCOUNT_LOCKED: "账号被冻结!",

    IM_LOGIN_FAILED_AND_RETRY: '登录异常,请重试',

    IM_ERRCODE_RETRY_MAX_TIMES_SEARCH : '查询超时, 请重试!',

    IM_ERRCODE_RETRY_MAX_TIMES: '查询超时，请重试!',

    IM_ERRCODE_WRITE_TIMEOUT: '处理超时，请重试!',

    IM_ERRCODE_WRITE_UNKNOWNERR: '未知错误，请重试!',

    IM_ERRCODE_TIMEOUT: '处理超时!',

    IM_ERRCODE_CIPHER_LIST: '处理超时!'
}



// 奖励系统 群体列表

export { LoginErrInfo, CheckUserDenyReason, PhoneOP, Constant } ;


