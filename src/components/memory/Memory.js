import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'

import { connect } from 'react-redux'

class Memory extends Component {
    render() {
        const { userpic, username, location, image, title } = this.props
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                   <Image source={userpic ? { uri: userpic } : null} style={styles.userPic} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.usernameTop}>{username}</Text>
                        <Text style={styles.location}>{location}</Text>
                    </View>
                </View>
                <Image source={image ? { uri: image } : null} style={styles.image} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </View>
        )
    }
}

export default connect(
    null,
    null
)(Memory)

const styles = StyleSheet.create({
    container: {
        margin: 10,
        elevation: 3,
        backgroundColor: 'white',
    },
    image: {
        width: 380,
        height: 300,
        marginTop: 10,
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 1,
        marginTop: 1,
        marginLeft: 15
    },
    text: {
        fontSize: 18,
        margin: 15,
        marginTop: 1,
        marginLeft: 5,
        marginBottom: 1,
        fontStyle: 'italic'
    },
    usernameTop: {
        margin: 15,
        marginLeft: 5,
        marginBottom: 2,
        fontWeight: 'bold'
    },
    userPic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 15,
        marginLeft: 15,
        marginBottom: 3,
        marginRight: 2,
    },
    location: {
        marginLeft: 5,
    },

})