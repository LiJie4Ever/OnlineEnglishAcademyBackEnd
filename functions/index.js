//export GOOGLE_APPLICATION_CREDENTIALS=/Users/davidxuan/Desktop/USC/577A/OnlineEnglishLearningAcadamyBackEnd/functions/service-account-file.json

const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const app = require('express')();
const cors = require('cors');
app.use(cors());

admin.initializeApp(functions.config().firebase);

const { getUser, modifyUser, removeUser } = require('./handler/user');

const { addTutor, modifyTutor, removeTutor } = require('./handler/admin');
const { addBlog, modifyBlog, removeBlog } = require('./handler/admin');
const { addCourse, modifyCourse, removeCourse } = require('./handler/admin');
const { addLesson, modifyLesson, removeLesson } = require('./handler/admin');

const { getBlogComments, postComment } = require('./handler/blog');

const { sendConfirmation } = require('./handler/tutoring');
const {retrieveBlog} = require('./handler/blog');
const {getCourse} = require('./handler/course');
// const {getLesson} = require('./handler/lesson');
const {addUser, getUser, modifyUser} = require('./handler/user');
const {retrieveTeacherInfo} = require('./handler/teacher');
// cart module
const {addCourseIntoCart} = require('./handler/cart');
const {deleteCourseFromCart} = require('./handler/cart');
const {displayCartInfo} = require('./handler/cart');
const {addLiveTutorRequestIntoCart} = require('./handler/cart');
const {deleteLiveTutorRequestFromCart} = require('./handler/cart');
// payment
const {payment} = require('./handler/pay');
const {paid} = require('./handler/pay');


app.get('/blog', retrieveBlog);
app.get('/course', getCourse);
// app.get('/lesson', getLesson);
app.post('/addUser', addUser);
app.post('/getUser', getUser);
app.post('/modifyUser', modifyUser);
app.get('/teacher', retrieveTeacherInfo);
app.get('/addCourseIntoCart', addCourseIntoCart);
app.get('/deleteCourseFromCart', deleteCourseFromCart);
app.get('/addLiveTutorRequestIntoCart', addLiveTutorRequestIntoCart);
app.get('/deleteTutorRequestFromCart', deleteLiveTutorRequestFromCart);
app.get('/cart', displayCartInfo);
app.post('/pay', payment);
app.get('/classList', paid);

// user module
app.get('/user/get', getUser);
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

app.get('/blog/comments', getBlogComments);
app.post('/blog/post_comment', postComment);

app.post('/meeting/sendConfirmation', sendConfirmation);

exports.api = functions.https.onRequest(app);
