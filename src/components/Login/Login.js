import  * as firebase from "firebase/app";
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
 
const Login = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    //console.log(watch("example"));

    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const {displayName, email} = result.user;
                const signInUser = {name: displayName, email}
                setLoggedInUser(signInUser);
                storeAuthToken();
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    const storeAuthToken =()=>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken);
            history.replace(from);
          }).catch(function(error) {
            // Handle error
          });
    }

    return (
        < form className="login-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" ref={register({ required: true })} placeholder="Your name" />
            { errors.name && <span className="error">Name is required</span>}

            < input name="email" ref={register({ required: true })} placeholder="Your email" />
            { errors.email && <span className="error">Email is required</span>}

            < input name="password" ref={register({ required: true })} placeholder="Your password" />
            { errors.password && <span className="error">Password is required</span>}

            <input type="submit" />

            <div>
                <button onClick={handleGoogleSignIn} >Sign In With Google</button>
                <button>Sign In With Facebook</button>
                <button>Sign In With Twitter</button>
            </div>

        </form >
    );
};

export default Login;