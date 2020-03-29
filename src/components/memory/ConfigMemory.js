import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux'
import { addMemory } from '../../actions/MemoryActions'
import { upload } from '../../actions/UploadActions'
import { Actions } from 'react-native-router-flux'

import Input from '../common/Input'
import Button from '../common/Button'
import Header from '../common/Header'


class ConfigMemory extends Component {

    state = {
        description: '',
        location: '',
        uploading: false,
        uploadingImage: false,
        uploadError: '',
        url: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props.fromGallery && prevProps !== this.props) {
            this.setState({
                uploadingImage: this.props.uploading,
                uploadError: this.props.uploadError,
                url: this.props.url
            })
        }

        const { uploading, uploadingImage, url } = this.state

        if (uploading && !uploadingImage && url) {
            const { location, description } = this.state
            this.props.addMemory(url, location, description)

            this.setState({
                uploading: false
            })
        }
    }

    onChangeDescription = text => {
        this.setState({
            description: text
        })
    }

    onChangeLocation = text => {
        this.setState({
            location: text
        })
    }

    onAddMemory = () => {
        const { description, location } = this.state
        const { imageUri, fromGallery } = this.props
        if (fromGallery) {
            const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            this.props.upload(imageUri, id)
            this.setState({
                uploading: true
            })
        } else {
            this.props.addMemory(imageUri, location, description)
        }
    }

    renderImage() {
        const { uploadingImage } = this.state
        const { imageUri } = this.props

        if (uploadingImage) {
            return <ActivityIndicator style={styles.image} />
        } else {
            return <Image source={imageUri ? { uri: imageUri } : null} style={styles.image} />
        }
    }

    render() {
        const { description, location } = this.state

        return (
            <View style={styles.container}>
                <Header title='Configurate Memory' />
                {this.renderImage()}
                <View style={styles.propContainer}>
                    <Text>Enter a description for the picture!</Text>
                    <Input
                        placeholder='Description...'
                        value={description}
                        onChange={this.onChangeDescription.bind(this)}
                    />
                </View>
                <View style={styles.propContainer}>
                    <Text>Where it was taken?</Text>
                    <Input
                        placeholder='Location...'
                        value={location}
                        onChange={this.onChangeLocation.bind(this)}
                    />
                </View>
                <Button text="Add memory" onPress={this.onAddMemory.bind(this)} />

                <TouchableOpacity onPress={() => Actions.pop()}>
                    <View>
                        <Text style={{ margin: 15 }}>Go back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    imageUri: state.memoryReducer.imageUri,
    fromGallery: state.memoryReducer.fromGallery,
    uploading: state.uploadReducer.uploading,
    uploadError: state.uploadReducer.uploadError,
    url: state.uploadReducer.url
})

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 15
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 50
    },
    propContainer: {
        justifyContent: 'flex-start',
        margin: 10
    }
})

export default connect(
    mapStateToProps,
    { addMemory, upload }
)(ConfigMemory)