const functions = require('firebase-functions');
const app = require('express')();

const { logIn, signUp, editProfile } = require('./handlers/meeting');

app.post('/create_meeting', signUp);