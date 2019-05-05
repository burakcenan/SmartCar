import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Router, Scene, Drawer } from 'react-native-router-flux'

import Main from '../screen/Main'
import ControllerPage from '../screen/ControllerPage'


export default class Root extends Component {
    render() {
        return (
            <Router navigationBarStyle={styles.navBar} renderRightButton>
                <Scene key='Root'>
                    <Scene key='Main' initial component={Main} hideNavBar />
                    <Scene key='ControllerPage' component={ControllerPage} hideNavBar />
                </Scene>
            </Router>
        )
    }
}
const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#D8DFE6',
    }
})