/**
 * 身份证解析  身份证 => 所有跟身份有关信息
 * Created by evilcode on 31/03/2017.
 */
var IDCardNoUtils = {
    /*省,直辖市代码表*/
    provinceAndCitys: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
        31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
        45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
        65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

    /*每位加权因子*/
    powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],

    /*第18位校检码*/
    parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],

    /*性别*/
    genders: {male:"男",female:"女"},

    /*校验地址码*/
    checkAddressCode: function(addressCode){
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if(!check) return false;
        if(IDCardNoUtils.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
            return true;
        }else{
            return false;
        }
    },

    /*校验日期码*/
    checkBirthDayCode: function(birDayCode){
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if(!check) return false;
        var yyyy = parseInt(birDayCode.substring(0,4),10);
        var mm = parseInt(birDayCode.substring(4,6),10);
        var dd = parseInt(birDayCode.substring(6),10);
        var xdata = new Date(yyyy,mm-1,dd);
        if(xdata > new Date()){
            return false;//生日不能大于当前日期
        }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
            return true;
        }else{
            return false;
        }
    },

    /*计算校检码*/
    getParityBit: function(idCardNo){
        var id17 = idCardNo.substring(0,17);
        /*加权 */
        var power = 0;
        for(var i=0;i<17;i++){
            power += parseInt(id17.charAt(i),10) * parseInt(IDCardNoUtils.powers[i]);
        }
        /*取模*/
        var mod = power % 11;
        return IDCardNoUtils.parityBit[mod];
    },

    /*验证校检码*/
    checkParityBit: function(idCardNo){
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if(IDCardNoUtils.getParityBit(idCardNo) == parityBit){
            return true;
        }else{
            return false;
        }
    },

    /*校验15位或18位的身份证号码*/
    checkIdCardNo: function(idCardNo){
        //15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if(!check) return false;
        //判断长度为15位或18位
        if(idCardNo.length==15){
            return IDCardNoUtils.check15IdCardNo(idCardNo);
        }else if(idCardNo.length==18){
            return IDCardNoUtils.check18IdCardNo(idCardNo);
        }else{
            return false;
        }
    },

    //校验15位的身份证号码
    check15IdCardNo: function(idCardNo){
        //15位身份证号码的基本校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if(!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0,6);
        check = IDCardNoUtils.checkAddressCode(addressCode);
        if(!check) return false;
        var birDayCode = '19' + idCardNo.substring(6,12);
        //校验日期码
        return IDCardNoUtils.checkBirthDayCode(birDayCode);
    },

    //校验18位的身份证号码
    check18IdCardNo: function(idCardNo){
        //18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if(!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0,6);
        check = IDCardNoUtils.checkAddressCode(addressCode);
        if(!check) return false;
        //校验日期码
        var birDayCode = idCardNo.substring(6,14);
        check = IDCardNoUtils.checkBirthDayCode(birDayCode);
        if(!check) return false;
        //验证校检码
        return IDCardNoUtils.checkParityBit(idCardNo);
    },

    formateDateCN: function(day){
        var yyyy =day.substring(0,4);
        var mm = day.substring(4,6);
        var dd = day.substring(6);
        return yyyy + '-' + mm +'-' + dd;
    },



    //获取信息
    getIdCardInfo: function(idCardNo){
        var idCardInfo = {
            gender:"",   //性别
            birthday:"", // 出生日期(yyyy-mm-dd)
            year: 1990,
            month: 1,
            day: 1,
            age: 0,
            code: idCardNo.substring(0, 6),     //行政区划代码
            star: '水平座'
        }

        if(idCardNo.length == 15){
            idCardNo = IDCardNoUtils.getID18(idCardNo)
            if (!idCardNo)
                return null
        }

        if(idCardNo.length == 18){
            let aday = idCardNo.substring(6,14)
            idCardInfo.birthday = aday//IDCardNoUtils.formateDateCN(aday)
            if(parseInt(idCardNo.charAt(16)) % 2 == 0){
                idCardInfo.gender = IDCardNoUtils.genders.female
            }else{
                idCardInfo.gender = IDCardNoUtils.genders.male
            }

            // 年龄
            idCardInfo.year = parseInt(aday.substring(0, 4))
            idCardInfo.month = parseInt(aday.substring(4, 6))
            idCardInfo.day = parseInt(aday.substring(6, 8))

            idCardInfo.age = (new Date).getFullYear() - idCardInfo.year

            // 星座
            idCardInfo.star = IDCardNoUtils.getStar(idCardInfo.month, idCardInfo.day)
        }
        return idCardInfo
    },

    /**
     * 18位身份证转15位
     * @param idCardNo
     * @returns {*}

     15位的号码：
     a a b b c c y y m m d d x x s
     18位的号码：
     a a b b c c y y y y m m d d x x s p

     eg. 610203198401266361 => 610203840126636
     130406198903018347 => 130406890301834

     */
    getID15: function(idCardNo){
        if(idCardNo.length==15){
            return idCardNo;
        }else if(idCardNo.length==18){
            return idCardNo.substring(0,6) + idCardNo.substring(8,17);
        }

        return null
    },

    /**
     * 15位身份证转18位
     * @param idCardNo
     * @returns {*}

     15位的号码：
     a a b b c c y y m m d d x x s
     18位的号码：
     a a b b c c y y y y m m d d x x s p

     eg. 610203840126636 => 610203198401266361
     130406890301834 => 130406198903018347
     */
    getID18: function(idCardNo){
        if(idCardNo.length==15){
            let id17 = idCardNo.substring(0,6) + '19' + idCardNo.substring(6);
            let parityBit = IDCardNoUtils.getParityBit(id17);
            return id17 + parityBit
        }else if(idCardNo.length==18){
            return idCardNo
        }

        return null
    },

    /**
     * 获得星座
     */
    getStar: function(month, day) {
        let value
        if (month == 1 && day >=20 || month == 2 && day <=18) {value = "水瓶座";}
        if (month == 2 && day >=19 || month == 3 && day <=20) {value = "双鱼座";}
        if (month == 3 && day >=21 || month == 4 && day <=19) {value = "白羊座";}
        if (month == 4 && day >=20 || month == 5 && day <=20) {value = "金牛座";}
        if (month == 5 && day >=21 || month == 6 && day <=21) {value = "双子座";}
        if (month == 6 && day >=22 || month == 7 && day <=22) {value = "巨蟹座";}
        if (month == 7 && day >=23 || month == 8 && day <=22) {value = "狮子座";}
        if (month == 8 && day >=23 || month == 9 && day <=22) {value = "处女座";}
        if (month == 9 && day >=23 || month == 10 && day <=22) {value = "天秤座";}
        if (month == 10 && day >=23 || month == 11 && day <=21) {value = "天蝎座";}
        if (month == 11 && day >=22 || month == 12 && day <=21) {value = "人马座";}
        if (month == 12 && day >=22 || month == 1 && day <=19) {value = "摩羯座";}
        return value || ''
    },


}

export default IDCardNoUtils