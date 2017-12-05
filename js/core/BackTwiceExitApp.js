import React, { Component } from 'react'

import { BackHandler } from 'react-native'

import NavigationUtils from "./NavigationUtils"

export default class extends Component {
  
  shouldExit = false

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    if (!NavigationUtils.getState()) {
      return false
    }
    if (NavigationUtils.getState().nav.routes.length !== 1) {
      return false
    }
    if (this.shouldExit) {
      BackHandler.exitApp()
      return true
    }
    this.timeout = setTimeout(function () {
      this.shouldExit = false
    }, 2000)

    Toast.show('再按一次返回退出应用', 2000)
    this.shouldExit = true
    return true
  }

  render() {
    return null
  }
}