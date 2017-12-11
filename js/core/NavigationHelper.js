/**
 * Created by evilcode on 2017/11/30.
 */

const NavigationHelper = {
    /**
     * Gets the current screen from navigation state
     * @param navigationState
     * @returns {*}
     */
    getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null
        }
        const route = navigationState.routes[navigationState.index]
        // dive into nested navigators
        if (route.routes) {
            return this.getCurrentRouteName(route)
        }
        return route.routeName
    }
}

export default NavigationHelper