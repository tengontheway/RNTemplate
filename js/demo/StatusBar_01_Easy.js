/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import StatusBarStyles from '../core/StatusBarStyles'

StatusBarStyles.setDefaultOptions({
    defaultStyle: 'dark',
    excludeScreens: ['Home', 'Other'],
    initialStyle: 'light'
})


import { StackNavigator } from 'react-navigation';

const HomeScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
            onPress = { () => {
                navigation.navigate('Details')
            } }
            title = "Set dark status bar style!"
        />
    </View>
)

const DetailsScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
            onPress = { () => {
                navigation.navigate('Other')
            } }
            title = "Go to other screen!"
        />

        <Button
            onPress = { () => navigation.goBack() }
            title = "Go back!"
        />
    </View>
);

const OtherScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Other Screen</Text>
        <Button
            onPress = { () => navigation.goBack() }
            title = "Go back"
        />
    </View>
);

const RootNavigator = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
    Other: {
        screen: OtherScreen,
    },
});

export default () => (
    <RootNavigator
        onNavigationStateChange={(prevState, currentState) => {
            console.log("onNavigationStateChange:" + JSON.stringify(currentState))

            StatusBarStyles.setByNavigationState(currentState)
        }}
    />
)


//
// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
