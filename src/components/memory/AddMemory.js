import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native'

import Header from '../common/Header'
import Button from '../common/Button'

import { Actions } from 'react-native-router-flux'
import * as ImagePicker from 'expo-image-picker';

import * as data from './images/data.json'
import { connect } from 'react-redux'
import { selectImage } from '../../actions/MemoryActions'

class AddMemory extends Component {

    state = {
        image: '',
        imageSelected: false,
        fromGallery: false
    }

    onSelectImage = selected => {
        this.setState({
            image: selected.url,
            imageSelected: true
        })
    }

    onSelectFromGalery = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let response = await ImagePicker.launchImageLibraryAsync();
        if (response.uri) {
            this.setState({
                image: response.uri,
                imageSelected: true,
                fromGallery: true
            })
        }
    }

    onPressNext = () => {
        const { image, fromGallery } = this.state
        this.props.selectImage(image, fromGallery)

        Actions.configMemory()
    }

    onPressCancel = () => {
        Actions.pop()
    }

    renderHeader = () => {
        const { imageSelected } = this.state
        if (imageSelected) {
            return <Header title='Add Memory' onNext={this.onPressNext.bind(this)} onCancel={this.onPressCancel.bind(this)} />
        }
        return <Header title='Add Memory' onCancel={this.onPressCancel.bind(this)} />
    }

    renderImage = () => {
        const { image, imageSelected } = this.state

        if (!imageSelected) {
            return (
                <View style={styles.mainImageContainer}>
                    <Text>Select an image</Text>
                </View>
            )
        }

        return (
            <View style={styles.mainImageContainer}>
                <Image source={image ? { uri: image } : null} style={styles.mainImage} />
            </View>
        )
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.miniImageContainer} onPress={() => this.onSelectImage(item)}>
            <View>
                <Image source={{ uri: item.url }} style={styles.miniImage} />
            </View>
        </TouchableOpacity>
    )

    keyExtractor = (item, _) => item.name

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <FlatList
                    ListHeaderComponent={this.renderImage()}
                    data={data.images}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    numColumns={3}
                />
                <Button
                    text='From Gallery'
                    onPress={this.onSelectFromGalery.bind(this)}
                />
            </View>
        )
    }
}

export default connect(
    null,
    { selectImage }
)(AddMemory)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 10
    },
    mainImageContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainImage: {
        width: '100%',
        height: '100%',
        margin: 5
    },
    miniImageContainer: {
        width: 100,
        height: 100,
        margin: 5
    },
    miniImage: {
        width: 100,
        height: 100
    }
})