import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import Button from '../common/Button'
import Input from '../common/Input'
import Title from '../common/Title'

import { connect } from 'react-redux'
import { createUser } from '../../actions/AuthActions'
import { Actions } from 'react-native-router-flux'

class SignUp extends Component {
    state = {
        email: '',
        password: ''
    }

    onChangeEmail = text => {
        this.setState({
            email: text
        })
    }

    onChangePassword = text => {
        this.setState({
            password: text
        })
    }

    onPressSignUp = () => {
        const { email, password } = this.state
        this.props.createUser(email, password)
    }

    onGoBack = () => {
        Actions.pop()
    }

    renderButtons() {
        if (this.props.auth.loading) {
            return <ActivityIndicator />
        } else {
            return (
                <View>
                    <Button text='Sign Up' onPress={this.onPressSignUp.bind(this)} />
                    <TouchableOpacity onPress={this.onGoBack.bind(this)}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Already got an account, take me back!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        const { email, password } = this.state

        return (
            <View style={styles.container}>
                <Title title='Remember Me' />
                <Input placeholder='Email' onChange={this.onChangeEmail.bind(this)} value={email} />
                <Input placeholder='Password' secureTextEntry onChange={this.onChangePassword.bind(this)} value={password} />
                <Text>{this.props.auth.errorCreating}</Text>
                {this.renderButtons()}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(
    mapStateToProps,
    { createUser }
)(SignUp)