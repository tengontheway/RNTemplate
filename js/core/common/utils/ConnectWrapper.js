/**
 * Redux的connect函数的简单封装，保证最后一个参数withRef: true
 * Created by EvilCode.T on 10/6/16.
 */
import {connect} from 'react-redux';

/**

 优点:
 1.所有的connect引用没有必要
 2.所有第四个参数options={withRef: true}参数内部封装

 react-redux的connect封装，因为react-redux的特殊性
 如LoginView的onExit函数，在正常情况下是存在的
 在connect(mapStateToProps....)(LoginView)后，对原有对象进行了封装，是无法查看到onExit函数的
 只能通过封装后的ProcessedComponent.getWrappedInstance()获得原有对象后才能获得

 获得getWrappedInstance()前提是connect的时候，第四个参数options={withRef: true}
 详情参考connect源代码

 connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

 // which props do we want to inject, given the global state?
 function mapStateToProps(state) {
            return {
                login: state.login
            };
        }

 export default connect(mapStateToProps)(LoginView);
 **/
export default function ConnectWrapper(componet, mapStateToProps, mapDispatchToProps=null, mergeProps= null, options={withRef: true}) {
    return connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(componet)
}

