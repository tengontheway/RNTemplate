/**
 * Created by evilcode on 2017/12/6.
 * 登录模块
 */
import storage from './data/Storage'
import request from './network/Request'
// import { TOKEN_STORAGE_KEY } from '../data/constants'


export default {
    /**
     * 是否已经登录
     */
    isLogined() {
        return storage.load({ key: constant.TOKEN_STORAGE_KEY })
    },

    /**
     * 获取tokens
     *
     * @returns
     */
    getTokens() {
        return this.isLogined()
    },

    /**
     * 登录
     */
    login(username, password, success = () => { }, fail = () => { }) {
        let loginRequest = request.post({
            url: '/api/oauth/token',
            data: {
                username,
                password,
                grant_type: 'password',
                client_id: 3,
                client_secret: 's4lNya2ez9w3BkWkzmvrxcKd7usXIi6wjkjyYOAl'
            }
        })
        loginRequest.then(res => {
            const { access_token, refresh_token, expires_in } = res.data
            storage.save({
                key: constant.TOKEN_STORAGE_KEY,
                data: {
                    access_token,
                    refresh_token
                },
                expires: expires_in * 1000
            })
            success(res)
            PubSub.publish('login')
        }).catch(fail)

        return loginRequest
    },

    /**
     * 退出登录
     */
    logout() {
        // PubSub.publish('logout')
        return storage.remove({ key: TOKEN_STORAGE_KEY })
    },

}