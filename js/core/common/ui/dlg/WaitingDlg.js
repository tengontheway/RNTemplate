/**
 * 加载显示器
 * Created by evilcode.cjp on 11/24/16.
 */
import React,{Component} from 'react'
import {FadeAnimated} from '../Animateds'
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
}from 'react-native'


/**
 * 显示加载结束时的dlg
 * 可自定义图片和文字
 * title (require)
 * iamgeSource (option)
 * isAnimate 是否开始动画 默认false
 */
class EndDlg extends Component {

    static defaultProps = {
        isAnimate: false,
        isStartTimer: false,
        lastScreen: '',
        title: '',
    };

    static propTypes = {
        isAnimate: React.PropTypes.bool,
        isStartTimer: React.PropTypes.bool,
        lastScreen: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    componentWillMount () {

        if (this.props.isStartTimer) {
            this.timer = setTimeout(() => {
                // console.log ('时间结束当前路由===', this.props.navigator.getCurRoute ().screen);
                // let index
                // var routes = this.props.navigator.getCurrentRoutes();
                // for (let i = 0; i < routes.length; i++) {
                //     if (routes[i].screen == this.props.lastScreen) {
                //         index = i;
                //         break;
                //     }
                // }
                // this.props.navigator.popToRoute(routes[index]);
                this.props.navigator.pop();
            } , 300)
        }
    }

    componentWillUnmount () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        let imgSource = this.props.imgSource ? this.props.imgSource :  require('../../../views/img/complete.png')
        let AnimatedView = this.props.isAnimate  ? FadeAnimated : View;

        return (
            <View style={[styles.center]}>
                <AnimatedView style={[styles.ret]}>
                    <View style={styles.img_con}>
                        <Image style={[styles.end_img ]} source={imgSource}></Image>
                    </View>
                    <View style={[styles.img_con , {marginTop: 20}]}>
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </AnimatedView>
            </View>
        );
    }
}


/**
 * 显示系统ActivityIndicator菊花
 * 用于加载过程中
 * title （require）
 */
class WaitingDlg extends Component {

    static defaultProps = {
        isAnimate: false,
        isStartTimer: false,
        lastScreen: '',
        title: '',
    };

    static propTypes = {
        isAnimate: React.PropTypes.bool,
        isStartTimer: React.PropTypes.bool,
        lastScreen: React.PropTypes.string,
        title: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    componentWillMount () {

        if (this.props.isStartTimer) {
            this.timer = setTimeout(() => {
                // console.log ('时间结束当前路由===', this.props.navigator.getCurRoute ().screen);
                // let index
                // var routes = this.props.navigator.getCurrentRoutes();
                // for (let i = 0; i < routes.length; i++) {
                //     if (routes[i].screen == this.props.lastScreen) {
                //         index = i;
                //         break;
                //     }
                // }
                // this.props.navigator.popToRoute(routes[index]);
                this.props.navigator.pop();
            } , 10000)
        }
    }

    componentWillUnmount () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        let AnimatedView = this.props.isAnimate  ? FadeAnimated : View;
        let tex =  this.props.title ?
            <View style={styles.texcon}>
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
            :
            null
        return (
            <View style={[styles.center]}>
                <AnimatedView style={styles.ret}>
                    <ActivityIndicator
                        animating={true}
                        style={[styles.centering, {height: 80}]}
                        size="large"
                        color="white"
                    />
                    {tex}
                </AnimatedView>
            </View>
        );
    }
}

/**
 * 只显示文字
 * title (require)
 */

class remindDlg extends Component {
    static propTypes = {
        isAnimate: React.PropTypes.bool,
        isStartTimer: React.PropTypes.bool,
        lastScreen: React.PropTypes.string,
    }
    static defaultProps = {
        isAnimate: false,
        isStartTimer: false,
        lastScreen: '',
    };

    constructor(props) {
        super(props);
    }

    componentWillMount () {

        if (this.props.isStartTimer) {
            this.timer = setTimeout(() => {
                // console.log ('时间结束当前路由===', this.props.navigator.getCurRoute ().screen);
                // let index
                // var routes = this.props.navigator.getCurrentRoutes();
                // for (let i = 0; i < routes.length; i++) {
                //     if (routes[i].screen == this.props.lastScreen) {
                //         index = i;
                //         break;
                //     }
                // }
                // this.props.navigator.popToRoute(routes[index]);
                this.props.navigator.pop();
            } , 10000)
        }
    }

    componentWillUnmount () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        let AnimatedView = this.props.isAnimate  ? FadeAnimated : View;
        return (
            <View style={[styles.center]}>
                <AnimatedView style={[styles.ret , {alignItems: 'center'}]}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </AnimatedView>
            </View>
        );
    }
}


/**
 * 中间的菊花部分
 * @param tex菊花下面的文字
 * @returns {XML}
 */
var waitingActiv =function (tex) {
    return (
        <View style={[styles.center]}>
            <View style={styles.ret}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering, {height: 80}]}
                    size="large"
                    color="white"
                />
                <View style={styles.texcon}>
                    <Text style={styles.text}>{tex}</Text>
                </View>
            </View>
        </View>
    )
}


/**
 * 自定义Dlg （默认居中）
 * customDlg (require)
 */

class CustomWaitingDlg extends Component {
    render() {
        return (
            <View style={[styles.center]}>
                {this.props.customDlg()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        // marginTop: -15,
    },
    img_con: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    end_img: {
        height: 32,
        width: 32,
        tintColor: 'white',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // top: 70,
        // height: 300,
        // width: 300,
        // top: 200,
        // backgroundColor: 'white'
    },

    texcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -5,
    },
    text: {
        color: 'white',
        fontSize: 12,
    },
    ret: {
        backgroundColor: 'rgba(5,6,6,0.5)',
        height: 110,
        width: 110,
        justifyContent: 'center',
        borderRadius: 6,

    },

    gray: {
        backgroundColor: '#cccccc',
        opacity: 0.8,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
    },
})

export {EndDlg ,CustomWaitingDlg, WaitingDlg , remindDlg , waitingActiv}

