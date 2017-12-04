

const initialState = {
    count: 0
}


/**
 * 定义如何更新state
 * Reducer: (previousState, action) => state
 * 纯函数: 接收OldState和Action,返回NewState
 * 1.Reducer是数据的处理中心。编写完成后，它应该作为一种黑盒的存在。
 * 2.永远不要在cloneState之前修改state
 */
function login(state = initialState, action = {}) {
  switch (action.type) {
      case "reset":       //所有的reducer必须默认实现的类型,用于重置数据(TODO优化)
          return initialState;


        case "INCREMENT":
          return {
            ...state,
            count: state.count + 1,
          }

        default:
          return state;
      }
}

export default login