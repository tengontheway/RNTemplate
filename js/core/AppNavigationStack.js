/**
 * Created by evilcode on 2017/12/5.
 */
import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import Routes from './Routes'
import NavigatorUtils from './NavigationUtils'

// import { GlobalInit, GlobalInitLogSystem } from './common'
// GlobalInit()
// GlobalInitLogSystem(false)      // true强制显示日志，false关闭

// import {Constant} from './js/config/Constant'
// import AppConfig from './js/config/AppConfig'
// global.constant = Constant
// global.appconfig = AppConfig

// import { EStyleSheet, getRemByDimensions } from './common';
// EStyleSheet.build({
//     rem: getRemByDimensions(),
// })

class AppWithNavigationState extends React.Component {

    componentWillMount() {
        // if (Platform.OS !== 'android') return
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     const { dispatch } = this.props
        //     dispatch({ type: 'Navigation/BACK' })
        //     return true
        // })
    }

    componentWillUnmount() {
        // if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress')
    }

    render() {
        const { dispatch, nav } = this.props
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        })

        return (
            <Routes
                navigation={navigation}
                ref = {
                    (e) => NavigatorUtils.setContainer(navigation)
                }
            />
        )
    }
}

const mapStateToProps = state => ({nav: state.nav})
let AppNavigationStack = connect(mapStateToProps)(AppWithNavigationState)

export default AppNavigationStack