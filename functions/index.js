//export GOOGLE_APPLICATION_CREDENTIALS=/Users/davidxuan/Desktop/USC/577A/OnlineEnglishLearningAcadamyBackEnd/functions/service-account-file.json

const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const {getCourse} = require('./handler/course');
const {getLesson} = require('./handler/lesson');
const {addUser, getUser, modifyUser} = require('./handler/user');

app.get('/course', getCourse);
app.get('/lesson', getLesson);
app.post('/addUser', addUser);
app.post('/getUser', getUser);
app.post('/modifyUser', modifyUser);

exports.api = functions.https.onRequest(app);