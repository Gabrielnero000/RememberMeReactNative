import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import Header from '../common/Header'
import Input from '../common/Input'

import { Actions } from 'react-native-router-flux'
import { onSaveChanges } from '../../actions/ProfileActions'
import { upload } from '../../actions/UploadActions'

import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'

class EditProfile extends Component {
    state = {
        userpic: '',
        username: '',
        bio: '',
        uploading: false,
        updating: false,
        uploadError: '',
        url: ''
    }

    componentDidMount() {
        this.setState({
            username: this.props.username,
            userpic: this.props.userpic,
            bio: this.props.bio,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                uploading: this.props.uploading,
                uploadError: this.props.uploadError,
                url: this.props.url
            })
        }

        const { updating, uploading, url } = this.state

        if (updating && !uploading && url) {
            this.setState({
                updating: false,
                userpic: url
            })
        }
    }

    cancelEdit = () => {
        if (this.state.userpic != this.props.userpic){
            this.props.onSaveChanges(this.state.userpic, this.props.username, this.props.bio)
        }

        Actions.pop()
    }

    onChangeUsername = text => {
        this.setState({
            username: text
        })
    }

    onChangeBio = text => {
        this.setState({
            bio: text
        })
    }

    onSelectPhoto = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let response = await ImagePicker.launchImageLibraryAsync();
        if (response.uri) {
            this.props.upload(response.uri, 'profile_pic')
            this.setState({
                updating: true
            })
        }
    }

    onSaveChanges = () => {
        const { userpic, username, bio } = this.state
        this.props.onSaveChanges(userpic, username, bio)
    }

    renderHeader = () => {
        const { uploading, userpic } = this.state

        if (uploading) {
            return <Header title="Edit profile" onCancel={this.cancelEdit.bind(this)}/>

        } else {
            return <Header title="Edit profile" onNext={this.onSaveChanges.bind(this)} onCancel={this.cancelEdit.bind(this)} />
        }
    }

    renderUserpic = () => {
        const { userpic, uploading } = this.state

        if (uploading) {
            return (
                <View style={styles.pic}>
                    <ActivityIndicator style={{ width: 300, height: 300 }} />
                </View>
            )
        }

        if (userpic) {
            return (
                <View style={styles.pic}>
                    <TouchableOpacity style={{ margin: 5 }} onPress={this.onSelectPhoto.bind(this)}>
                        <Image source={{ uri: userpic }} style={{ width: 300, height: 300, borderRadius: 150 }} />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        const { username, bio } = this.state
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <ScrollView>
                    {this.renderUserpic()}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.propContainer}>
                            <Text>Username</Text>
                            <Input
                                placeholder='Username...'
                                value={username}
                                onChange={this.onChangeUsername.bind(this)}
                            />
                        </View>
                        <View style={styles.propContainer}>
                            <Text>Biography</Text>
                            <Input
                                placeholder='Bio...'
                                value={bio}
                                onChange={this.onChangeBio.bind(this)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    username: state.profileReducer.profile.username,
    userpic: state.profileReducer.profile.userpic,
    bio: state.profileReducer.profile.bio,
    uploading: state.uploadReducer.uploading,
    uploadError: state.uploadReducer.uploadError,
    url: state.uploadReducer.url
});

export default connect(
    mapStateToProps,
    { onSaveChanges, upload }
)(EditProfile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    pic: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    propContainer: {
        justifyContent: 'flex-start',
        margin: 10
    },
})