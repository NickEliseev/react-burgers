import React from "react";
import Login from "./Login";
import firebase from "firebase/app";
import { firebaseApp } from '../../base';

class SignIn extends React.Component {

    state = {
        user: ''
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user })
            }
        })
    };

    authHandler = async (authData) => {
        console.log(authData)
        const { email } = authData.user;
        this.setState({ user: email })
    };

    authenticate = () => {
        const authProvider = new firebase.auth['GithubAuthProvider']();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
    }

    render() {
        if (!this.state.user) {
            return <Login authenticate={this.authenticate} />
        }
        return this.props.children;
    }
}

export default SignIn