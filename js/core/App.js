import React from 'react'
import { Provider } from 'react-redux'
import store from './Store'
import AppNavigationStack from './AppNavigationStack'

const App = () => (
    <Provider store={store}>
        <AppNavigationStack />
    </Provider>
)

export default App