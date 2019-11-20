//export GOOGLE_APPLICATION_CREDENTIALS=/Users/davidxuan/Desktop/USC/577A/OnlineEnglishAcademyBackEnd/functions/service-account-file.json

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
admin.initializeApp(functions.config().firebase);
app.use(cors());

const { getUser, modifyUser, removeUser } = require('./handler/user');

const { addTutor, modifyTutor, removeTutor } = require('./handler/admin');
const { addBlog, modifyBlog, removeBlog } = require('./handler/admin');
const { addCourse, modifyCourse, removeCourse } = require('./handler/admin');
const { addLesson, modifyLesson, removeLesson } = require('./handler/admin');

const { getBlogComments, postComment } = require('./handler/blog');

const { sendConfirmation, getMeetingList, setMeetingLink } = require('./handler/meeting');

const { retrieveBlog } = require('./handler/blog');
const { getCourse } = require('./handler/course');
const { retrieveTeacherInfo } = require('./handler/teacher');
// cart module
const { addCourseIntoCart, deleteCourseFromCart,displayCartInfo } = require('./handler/cart');
const { addLiveTutorRequestIntoCart, deleteLiveTutorRequestFromCart } = require('./handler/cart');
// payment
const { payment, paid} = require('./handler/pay');

app.get('/blog', retrieveBlog);
app.get('/course', getCourse);
app.get('/teacher', retrieveTeacherInfo);

// cart module
app.get('/cart/course/add', addCourseIntoCart);
app.get('/cart/course/delete', deleteCourseFromCart);
app.get('/cart/tutor/add', addLiveTutorRequestIntoCart);
app.get('/cart/tutor/delete', deleteLiveTutorRequestFromCart);
app.get('/cart', displayCartInfo);

// payment module
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
app.get('/meeting/get', getMeetingList);
app.post('/meeting/set_link', setMeetingLink);

app.get('/blog', retrieveBlog);
app.get('/course', getCourse);
app.get('/teacher', retrieveTeacherInfo);


exports.api = functions.https.onRequest(app);
