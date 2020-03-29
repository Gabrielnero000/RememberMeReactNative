import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux'

import { fetchMemories } from '../../actions/MemoryActions'

import Memory from '../memory/Memory'


class Home extends Component {
    state = {
        memories: [],
        fetching: false,
        errorFetching: ''
    }

    componentDidMount() {
        this.props.fetchMemories()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                memories: this.props.memories,
                fetching: this.props.fetching,
                errorFetching: this.props.errorFetching
            })
        }
    }

    renderMemories(memories) {
        const arrayMemories = Object.values(memories)
        const keysMemories = Object.keys(memories)

        return arrayMemories.map((memory, i) => {
            return <Memory {...memory} key={keysMemories[i]} memoryKey={keysMemories[i]} />
        })
    }

    render() {
        const { memories, fetching, errorFetching } = this.state

        if (fetching) {
            return (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator />
                </View>
            )
        }

        if (memories === undefined || memories.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Looks like you don't have{"\n"}any memory yet :)</Text>
                    <Text style={styles.errorText}>{errorFetching}</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>{this.renderMemories(memories)}</ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    memories: state.memoryReducer.memories,
    fetching: state.memoryReducer.fetching,
    errorFetching: state.memoryReducer.errorFetching
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 24,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    errorText: {
        marginTop: 5,
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(
    mapStateToProps,
    { fetchMemories }
)(Home)