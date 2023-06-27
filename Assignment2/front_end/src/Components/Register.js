import React, { useState } from 'react';
import './style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCyog4VGas1-bFrxn1kTPWJ2btYxQrDZ1s",
    authDomain: "serverless-389521.firebaseapp.com",
    projectId: "serverless-389521",
    storageBucket: "serverless-389521.appspot.com",
    messagingSenderId: "612059124414",
    appId: "1:612059124414:web:e40766e0151be231f244ef",
    measurementId: "G-X0R2688VY7"
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const Registration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            // Store registration details in Firestore
            const registrationData = {
                name,
                password,
                email,
                location,
            };

            // Add a new document to the "Reg" collection in Firestore
            await firestore.collection('Reg').add(registrationData);

            // Reset the form fields
            setName('');
            setPassword('');
            setEmail('');
            setLocation('');

            console.log('Registration successful!');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="container">
            <div className="center">
                <h1>Registration</h1>
                <form onSubmit={handleRegistration}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
