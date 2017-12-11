/**
 * 检测网络状态
 *
     //、、、
     import NetworkState from '../../utils/NetworkState'
     //、、、
     handleMethod(isConnected){
           console.log('test', (isConnected ? 'online' : 'offline'));
       }
     //、、、
     constructor(props) {
        super(props);
        NetworkState.checkNetworkState((isConnected)=>{
              if(!isConnected){
                    Toast.show(NetworkState.NOT_NETWORK);
              }
            });
      }

     componentWillMount() {
           NetworkState.removeEventListener(NetworkState.TAG_NETWORK_CHANGE,this.handleMethod);
       }

     componentWillUnmount() {
          NetworkState.removeEventListener(NetworkState.TAG_NETWORK_CHANGE,this.handleMethod);
          }
 //、、、
 */
import React,{
    NetInfo
} from 'react-native';

const NOT_NETWORK = "网络不可用，请检查网络";
const TAG_NETWORK_CHANGE = "NetworkChange";

/***
 * 检查网络链接状态
 * @param callback
 */
const checkNetworkState = (callback) =>{
    NetInfo.isConnected.fetch().done(
        (isConnected) => {
            callback(isConnected);
        }
    );
}

/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const removeEventListener = (tag,handler) => {
    NetInfo.isConnected.removeEventListener(tag, handler);
}

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const addEventListener = (tag,handler)=>{
    NetInfo.isConnected.addEventListener(tag, handler);
}

export default{
    checkNetworkState,
    addEventListener,
    removeEventListener,
    NOT_NETWORK,
    TAG_NETWORK_CHANGE
}
