import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native'

import Button from '../common/Button'
import Input from '../common/Input'
import Title from '../common/Title'

import { loginUser } from '../../actions/AuthActions'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errorLoging: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: this.props.loading,
                errorLoging: this.props.errorLoging,
            })
        }
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

    onPressLogin = () => {
        const { email, password } = this.state
        this.props.loginUser(email, password)
    }

    onPressSignUp = () => {
        Actions.signUp()
    }

    renderButtons() {
        const { loading } = this.state
        if (loading) {
            return <ActivityIndicator />
        } else {
            return (
                <View>
                    <Button text='Login' onPress={this.onPressLogin.bind(this)} />
                    <Button text='Sign Up' onPress={this.onPressSignUp.bind(this)} />
                </View>
            )
        }
    }

    render() {
        const { email, password, errorLoging } = this.state

        return (
            <View style={styles.container}>
                <Title title='Remember Me' />
                <Input placeholder='Email' onChange={this.onChangeEmail.bind(this)} value={email} />
                <Input placeholder='Password' secureTextEntry onChange={this.onChangePassword.bind(this)} value={password} />
                {this.renderButtons()}
                <Text style={styles.errorText}>{errorLoging}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.authReducer.loading,
    errorLoging: state.authReducer.errorLoging
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login)