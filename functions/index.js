//export GOOGLE_APPLICATION_CREDENTIALS=/Users/davidxuan/Desktop/USC/577A/OnlineEnglishLearningAcadamyBackEnd/functions/service-account-file.json

const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const {getUser, modifyUser, removeUser} = require('./handler/user');

const {addTutor, modifyTutor, removeTutor} = require('./handler/admin');
const {addBlog, modifyBlog, removeBlog} = require('./handler/admin');
const {addCourse, modifyCourse, removeCourse} = require('./handler/admin');
const {addLesson, modifyLesson, removeLesson} = require('./handler/admin');

// user module
app.post('/user/get', getUser);
app.post('/user/modify', modifyUser);
app.post('/user/remove', removeUser);

// admin module
app.post('/tutor/add', addTutor);
app.post('/tutor/modify', modifyTutor);
app.post('/tutor/remove', removeTutor);

app.post('/blog/add', addBlog);
app.post('/blog/modify', modifyBlog);
app.post('/blog/remove', removeBlog);

app.post('/course/add', addCourse);
app.post('/course/modify', modifyCourse);
app.post('/course/remove', removeCourse);

app.post('/lesson/add', addLesson);
app.post('/lesson/modify', modifyLesson);
app.post('/lesson/remove', removeLesson);

exports.api = functions.https.onRequest(app);
