import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

import Header from '../common/Header'

import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/ProfileActions';
import { fetchMemories } from '../../actions/MemoryActions';


class Profile extends Component {
    state = {
        username: this.props.username,
        userpic: this.props.userpic,
        bio: this.props.bio,
        memoriesCount: this.props.memoriesCount,
        fetching: this.props.fetching,
        fetchError: this.props.fetchError,
        memoriesKeys: Object.keys(this.props.memories),
        memoriesArray: Object.values(this.props.memories)
    }

    componentDidMount() {
        this.props.fetchProfile()
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            this.setState({
                username: this.props.username,
                userpic: this.props.userpic,
                bio: this.props.bio,
                memoriesCount: this.props.memoriesCount,
                fetching: this.props.fetching,
                fetchError: this.props.fetchError,
                memoriesKeys: Object.keys(this.props.memories),
                memoriesArray: Object.values(this.props.memories)
            })
        }
    }

    renderPosts() {
        const { memoriesArray, memoriesKeys } = this.state

        if (memoriesArray) {
            return memoriesArray.map((memory, i) => {
                return (
                    <View key={memoriesKeys[i]}>
                        <Image source={{ uri: memory.image }} style={styles.memory} />
                    </View>
                );
            });
        }
    }

    goToEdit() {
        Actions.editProfile(this.props.profile);
    }

    render() {
        const { username, userpic, memoriesCount, bio, fetching, fetchError } = this.state

        if (fetching) {
            return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Header title={username} />
                    <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                        <View style={styles.picAndBio}>
                            <TouchableOpacity onPress={this.goToEdit.bind(this)}>
                                <Image style={styles.userpic} source={userpic ? { uri: userpic } : null} />
                            </TouchableOpacity>
                            <View style={styles.userBio}>
                                <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{bio}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.errorText}>{fetchError}</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{memoriesCount} memories</Text>
                        </View>
                        <View style={styles.memoriesContainer}>{this.renderPosts()}</View>
                    </ScrollView>
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    username: state.profileReducer.profile.username,
    userpic: state.profileReducer.profile.userpic,
    bio: state.profileReducer.profile.bio,
    memoriesCount: state.profileReducer.profile.memoriesCount,
    fetching: state.profileReducer.fetching,
    fetchError: state.profileReducer.fetchError,
    memories: state.memoryReducer.memories
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userpic: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    memory: {
        width: 122.5,
        height: 122.5,
        margin: 1
    },
    picAndBio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 15
    },
    userBio: {
        width: '60%',
        flexDirection: 'column',
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        marginTop: 5,
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
    memoriesContainer: {
        paddingTop: 10,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderTopColor: '#dcdde1',
        borderTopWidth: 1
    }
});

export default connect(
    mapStateToProps,
    { fetchProfile, fetchMemories }
)(Profile);