import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'
import reducers from './reducers'
import RouterComponent from './Router'

var config = {
	apiKey: "AIzaSyADIWplAbBj1p9_jQqOojiNhY9KhCeqkuE",
	authDomain: "remembermereact.firebaseapp.com",
	databaseURL: "https://remembermereact.firebaseio.com",
	projectId: "remembermereact",
	storageBucket: "remembermereact.appspot.com",
	messagingSenderId: "685696318809",
	appId: "1:685696318809:web:afca98262872784066a048"
  };

!firebase.apps.length ? firebase.initializeApp(config) : null;

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <View style={{ flex: 1}}>
                    <RouterComponent />
                </View>
            </Provider>
        )
    }
}