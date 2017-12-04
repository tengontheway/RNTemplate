/**
 * Created by EvilCode.T on 17/10/2016.
 */
import React from 'react';
import {
    AsyncStorage,
} from 'react-native';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '../../reducers';

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import AppEntryBase from './AppEntryBase'

export default class AppEntryReduxBase extends AppEntryBase {
    constructor(props) {
        super(props)
    }

    onConstructorInit() {
        super.onConstructorInit()

        global.store = store
    }

    render() {
        return (
            <Provider store={store}>
                {this.renderNavigator()}
            </Provider>
        );
    }
}

