const functions = require('firebase-functions');
const app = require('express')();

const { create_meeting } = require('./handlers/meeting');

app.post('/create_meeting', create_meeting);