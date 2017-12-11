/**
 * 测试加密
 * Created by evilcode on 17/01/2017.
 */
import React, {Component} from 'react';
import {ConnectWrapper} from '../common'
import {PinYinSort} from '../common'
import pinyin from 'pinyin'
import * as docsActions from '../reducers/docs/actions';
import * as friendsActions from '../reducers/friends/actions';
import NewFriend from  './NewFriend';
import PinYinUtil from '../common/utils/PinYinUtil'
let width = Dimensions.get('window').width
import {PinYinSortEx} from '../common'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    PixelRatio,
    TouchableOpacity,
    ImageStore,
    ListView,
    Dimensions,
    Image,
    TouchableHighlight,
} from 'react-native';
import {Constant} from '../config/Constant';
import MainListView from '../components/MainListView'
var onePT = 1 / PixelRatio.get();
var Contacts = require('react-native-contacts');
import md5 from 'md5';
import ImageResizer from 'react-native-image-resizer';
var BigNumber = require('../common/utils/BigNumber');
var crypto = require('crypto');

import BN from 'bn.js'

class TestView extends Component {
    // 构造
    constructor(props) {
        super(props);



        // let alice = crypto.createDiffieHellman("2147483587", )
        //
        // var alice = crypto.getDiffieHellman('modp5');
        // var bob = crypto.getDiffieHellman('modp5');
        //
        // alice.generateKeys();
        // bob.generateKeys();
        //
        // var alice_secret = alice.computeSecret(bob.getPublicKey(), 'binary', 'hex');
        // var bob_secret = bob.computeSecret(alice.getPublicKey(), 'binary', 'hex');
        //
        // if (alice_secret == bob_secret) {
        //     console.log("----------equal!")
        // } else {
        //     console.log("----------not equal!")
        // }

        this.state = {
            time: 0
        }
    }

    test1() {
        console.log("----------------test1")

        // https://nodejs.org/api/crypto.html#crypto_class_diffiehellman
        const dh1 = crypto.getDiffieHellman('modp14')
        const dh2 = crypto.getDiffieHellman('modp14')

        if (dh1.getPrime().toString('hex') == dh2.getPrime().toString('hex')) {
            console.log("equal primes")        // 打印
        }

        if (dh1.getGenerator().toString('hex') == dh2.getGenerator().toString('hex')) {
            console.log("equal getGenerator")  // 打印
        }

        dh1.generateKeys()
        dh2.generateKeys()

        const dh1_secret = dh1.computeSecret(dh2.getPublicKey())
        const dh2_secret = dh2.computeSecret(dh1.getPublicKey())


        if (dh1_secret == dh2_secret) {
            console.log("is equal")
        } else {
            console.log("is not equal")         // 打印
        }

        if (dh1_secret.toString('hex') == dh2_secret.toString('hex')) {
            console.log("secret tostring is equal")         // 打印
        } else {
            console.log("secret tostring is not equal")
        }
    }

    test2() {
        console.log("----------------test2")

        // https://nodejs.org/api/crypto.html#crypto_class_diffiehellman
        var server = crypto.createDiffieHellman(32, '3');
        var prime = server.getPrime();
        console.log("prime:"+prime.toString('hex'))

        const dh1 = crypto.createDiffieHellman(prime)
        const dh2 = crypto.createDiffieHellman(prime)

        if (dh1.getPrime().toString('hex') == dh2.getPrime().toString('hex')) {
            console.log("equal primes")        // 打印
        }

        if (dh1.getGenerator().toString('hex') == dh2.getGenerator().toString('hex')) {
            console.log("equal getGenerator")  // 打印
        }

        dh1.generateKeys()
        dh2.generateKeys()

        const dh1_secret = dh1.computeSecret(dh2.getPublicKey())
        const dh2_secret = dh2.computeSecret(dh1.getPublicKey())

        if (dh1_secret == dh2_secret) {
            console.log("is equal")
        } else {
            console.log("is not equal")         // 打印
        }

        if (dh1_secret.toString('hex') == dh2_secret.toString('hex')) {
            console.log("secret tostring is equal")         // 打印
        } else {
            console.log("secret tostring is not equal")
        }
    }

    test3() {
        // console.log("----------------test3")

        // https://nodejs.org/api/crypto.html#crypto_class_diffiehellman
        var server = crypto.createDiffieHellman(32, "2");
        var prime = server.getPrime('hex');
        console.log("prime:"+prime.toString('hex'))

        const dh1 = crypto.createDiffieHellman('eab2115f', 'hex')
        const dh2 = crypto.createDiffieHellman('eab2115f', 'hex')

        // if (dh1.getPrime().toString('hex') == dh2.getPrime().toString('hex')) {
        //     console.log("equal primes")        // 打印
        // }
        //
        // if (dh1.getGenerator().toString('hex') == dh2.getGenerator().toString('hex')) {
        //     console.log("equal getGenerator")  // 打印
        // }

        dh1.generateKeys()
        dh2.generateKeys()

        const dh1_secret = dh1.computeSecret(dh2.getPublicKey())
        const dh2_secret = dh2.computeSecret(dh1.getPublicKey())

        // if (dh1_secret == dh2_secret) {
        //     console.log("is equal")
        // } else {
        //     console.log("is not equal")         // 打印
        // }
        //
        // if (dh1_secret.toString('hex') == dh2_secret.toString('hex')) {
        //     console.log("secret tostring is equal")         // 打印
        // } else {
        //     console.log("secret tostring is not equal")
        // }
    }

    test4() {
        let st = new Date()
        for (let i = 0; i < 10; ++i) {
            this.test2()
        }
        let et = new Date()

        this.setState({
            time: (et - st)/10
        })
    }

    test5() {

        const dh = crypto.createDiffieHellman('7fffffc3', 'hex', new Buffer([3]))
        let prime = dh.getPrime('hex')

        let generator = dh.getGenerator()
        console.log("-----------------------prime:" + prime + " generator:" + generator.toString())

        dh.generateKeys()
    }


    render() {
        // {
        //     let key = md5('123', {'asBytes':true})
        //     key = new Buffer(key)
        //     console.log("------key:" + JSON.stringify(key))
        //     //
        //     // let cipherEncoding = 'base64'
        //     //
        //     let iv = md5(key, {'asBytes': true})
        //     iv = new Buffer(iv)
        //     console.log("------iv:" + JSON.stringify(iv))
        //
        //     let data = "helloworld"
        //     data = utils.stringToUint8Array(data)
        //     console.log("------content:" + JSON.stringify(data))
        //
        //     let cipher = crypto.createCipheriv('aes-128-cfb', key, iv)
        //     let decipher = crypto.createCipheriv('aes-128-cfb', key, iv)
        //
        //     let dt = cipher.update(data)
        //     console.log("dt:" + JSON.stringify(dt))
        //
        //     let data1 = decipher.update(dt)
        //     console.log("typeof data1:" + typeof data1)
        //     console.log("---------------------data1:" + JSON.stringify(data1))
        // }

        //
        // let serect = '1689940469'
        // serect = md5(serect, {'asBytes':true})
        // console.log("serect:" + serect)
        // config.SERVER_AES_SERECT = new Buffer(serect)
        //
        // let iv = md5(config.SERVER_AES_SERECT, {'asBytes':true})
        // console.log("iv:" + iv)
        // config.SERVER_AES_IV = new Buffer(iv)
        //
        // config.CIPHER = crypto.createCipheriv('aes-128-cfb', config.SERVER_AES_SERECT, config.SERVER_AES_IV)
        // config.DECIPHER = crypto.createDecipheriv('aes-128-cfb', config.SERVER_AES_SERECT, config.SERVER_AES_IV)
        //
        // let data = new Uint8Array(2)
        // data[0] = 32
        // data[1] = 3
        //
        // let crypts = config.CIPHER.update(data)
        // // let decrypts = config.DECIPHER.update(crypts)
        // // console.log("--crypts:" + JSON.stringify(crypts))
        // // console.log("--decrypts:" + JSON.stringify(decrypts))
        //
        //
        // let dt = new Buffer(new Uint8Array([58, 111]))
        // let dec1 = config.DECIPHER.update(dt)
        // let dec2 = config.DECIPHER.update(dt)
        // console.log("--decrypts:" + JSON.stringify(dec1))
        // console.log("--decrypts:" + JSON.stringify(dec2))


        let hex = 'ffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffff'
        let ret = new BN(hex, 16)
        console.log("------------ret:" + ret.toString())


        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>平均时间:{this.state.time}</Text>
                <Text onPress = {() => this.test4()}>重新计算10次</Text>
            </View>)
    }
}


const styles = StyleSheet.create({
    headerView: {
        paddingBottom: 10,
        marginTop: -350,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
    },
    imgTouch: {
        borderColor: '#F3F3F3',
        height: 55,
        width: 55,
        marginTop: 10,
        marginRight: 10,
    },
    grid: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imgsty: {
        height: 55,
        width: 55,
        resizeMode: 'stretch',
    },
    textInpusty: {
        fontSize: Constant.FONT_SMALL,
        color: '#797878',
        height: 100,
        marginTop: 360,
    },
    tou: {
        height: 40,
        width: width,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },


})

function mapStateToProps(state) {
    return {
        login: state.login,
        docs: state.docs,
        friends: state.friends.friends,
    }
}

export default ConnectWrapper(TestView, mapStateToProps)
// console.log ('gggggg='+ utils.toString(this.sectionIDs))
