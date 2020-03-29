import React from 'react'
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux'

import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Icon from 'react-native-vector-icons/FontAwesome'

import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/home/Home'
import AddMemory from './components/memory/AddMemory'
import ConfigMemory from './components/memory/ConfigMemory'
import Profile from './components/profile/Profile'
import EditProFile from './components/profile/EditProfile'

const HomeIcon = () => <Ionicons name='md-home' size={25} />
const AddMemoryIcon = () => <EvilIcons name='plus' size={25} />
const ProfileIcon = () => <Icon name='user' size={25} />

const RouterComponent = () => (
    <Router>
        <Stack key='root'>
            <Stack key='auth' hideNavBar>
                <Scene key='login' component={Login} />
                <Scene key='signUp' component={SignUp} />
            </Stack>
            <Stack key='app' hideNavBar panHandlers={null} >
                <Tabs showLabel={false}>
                    <Scene key='home' component={Home} icon={HomeIcon} title='Home' />
                    <Scene key='addMemory' component={AddMemory} icon={AddMemoryIcon} hideNavBar hideTabBar />
                    <Scene key='profile' component={Profile} icon={ProfileIcon} hideNavBar />
                </Tabs>
                <Scene key='configMemory' component={ConfigMemory} />
                <Scene key='editProfile' component={EditProFile} />
            </Stack>
        </Stack>
    </Router>
)

export default RouterComponent
