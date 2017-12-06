import React from 'react'
import { Provider } from 'react-redux'
import store from './Store'
import AppNavigationStack from './AppNavigationStack'

global.store = store

const App = () => (
    <Provider store={store}>
        <AppNavigationStack />
    </Provider>
)

export default App