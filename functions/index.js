const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');



admin.initializeApp(functions.config().firebase);

const {retrieveBlog} = require('./handler/blog');
const {getCourses} = require('./handler/course');
const {retrieveTeacherInfo} = require('./handler/teacher');

//app.post('/create_meeting', signUp);

app.get('/blog', retrieveBlog);
app.get('/course', getCourses);
app.get('/teacher', retrieveTeacherInfo);


exports.api = functions.https.onRequest(app);