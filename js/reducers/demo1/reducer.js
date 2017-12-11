import * as types from './actions'

const initialState = {
    text: 'demo1'
}

/**
 * 定义如何更新state
 * Reducer: (previousState, action) => state
 * 纯函数: 接收OldState和Action,返回NewState
 * 1.Reducer是数据的处理中心。编写完成后，它应该作为一种黑盒的存在。
 * 2.永远不要在cloneState之前修改state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
      case "reset":       //所有的reducer必须默认实现的类型,用于重置数据(TODO优化)
          return initialState;

      case types.SET_DEMO1_TITLE:
          return {
            ...state,
            text: action.text
          }

        default:
          return state;
      }
}