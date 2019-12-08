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

const { retrieveBlog, getBlogComments, postComment } = require('./handler/blog');

const { getCourse } = require('./handler/course');
const { retrieveTeacherInfo } = require('./handler/teacher');

const { getStudent } = require('./handler/student');
// cart module
const { addCourseIntoCart, deleteCourseFromCart, displayCartInfo } = require('./handler/cart');
const { addLiveTutorRequestIntoCart, deleteLiveTutorRequestFromCart, moveToBought } = require('./handler/cart');
// payment module
const { payment, paid } = require('./handler/pay');

//request module
const { getRequestList, sendRequestConfirmation } = require('./handler/request');
const { createRequest, confirmRequest, cancelRequest, setRequestStatus, setRequestPrice } = require('./handler/request');

//schedule related
const { getScheduleList, getStuSchedule, getTuSchedule, getScheduleHistory } = require('./handler/schedule');
const { addSchedule, deleteSchedule, sendConfirmation, setScheduleLink } = require('./handler/schedule');

const { getLesson } = require('./handler/lesson');


app.get('/blog', retrieveBlog);
app.get('/course', getCourse);
app.get('/teacher', retrieveTeacherInfo);

// cart module
app.post('/cart/course/add', addCourseIntoCart);
app.post('/cart/course/delete', deleteCourseFromCart);
app.post('/cart/tutor/add', addLiveTutorRequestIntoCart);
app.post('/cart/tutor/delete', deleteLiveTutorRequestFromCart);
app.post('/cart/update_bought', moveToBought);
app.post('/cart', displayCartInfo);

// payment module

// TODO: add payment when clicking on checkout
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

app.get('/student/get', getStudent);

app.post('/blog/add', addBlog);
app.post('/blog/modify', modifyBlog);
app.post('/blog/remove', removeBlog);

app.post('/course/add', addCourse);
app.post('/course/modify', modifyCourse);
app.post('/course/remove', removeCourse);

app.post('/lesson/get', getLesson);

app.post('/lesson/add', addLesson);
app.post('/lesson/modify', modifyLesson);
app.post('/lesson/remove', removeLesson);

app.get('/blog/comments', getBlogComments);
app.post('/blog/post_comment', postComment);

//request module
app.get('/request/getList', getRequestList);
app.post('/request/create', createRequest);
app.post('/request/setPrice', setRequestPrice);
app.post('/request/confirm', confirmRequest);
app.post('/request/sendConfirm', sendRequestConfirmation);
app.post('/request/cancel', cancelRequest);
app.post('/request/setStatus', setRequestStatus);
//schedule related
app.get('/schedule/getList', getScheduleList);
app.get('/schedule/getStu', getStuSchedule);
app.get('/schedule/getTu', getTuSchedule);
app.post('/schedule/delete', deleteSchedule);
app.post('/schedule/add', addSchedule);
app.post('/schedule/history', getScheduleHistory);
app.post('/schedule/sendConfirmation', sendConfirmation);
app.post('/schedule/setScheduleLink', setScheduleLink);

exports.api = functions.https.onRequest(app);
