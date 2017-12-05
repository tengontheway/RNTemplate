/**
 * Created by evilcode on 2017/12/4.
 * 创建Store，可以绑定middleware
 */
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from '../reducers'
import nav_reducer from "./NavigationReducer"


/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
const logger = store => next => action => {
    // console.group(action.type)
    console.info('dispatching', action)

    let result = next(action)

    console.log('next state', store.getState())
    // console.groupEnd(action.type)
    return result
}

/**
 * 在 state 更新完成和 listener 被通知之后发送崩溃报告
 */
const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        throw err
    }
}


let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

let creducers = combineReducers({
    ...reducers,
    nav: nav_reducer
})

let store = createStoreWithMiddleware(creducers)
// console.dir(store.getState())

export default store