const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');



admin.initializeApp(functions.config().firebase);

const {retrieveBlog} = require('./handler/blog');
const {getCourse} = require('./handler/course');
<<<<<<< HEAD
// const {getLesson} = require('./handler/lesson');
const {addUser, getUser, modifyUser} = require('./handler/user');
=======
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

>>>>>>> 19e72cd6936456902bdf131284279c19b7885b38

app.get('/blog', retrieveBlog);
app.get('/course', getCourse);
<<<<<<< HEAD
// app.get('/lesson', getLesson);
app.post('/addUser', addUser);
app.post('/getUser', getUser);
app.post('/modifyUser', modifyUser);
=======
app.get('/teacher', retrieveTeacherInfo);
app.get('/addCourseIntoCart', addCourseIntoCart);
app.get('/deleteCourseFromCart', deleteCourseFromCart);
app.get('/addLiveTutorRequestIntoCart', addLiveTutorRequestIntoCart);
app.get('/deleteTutorRequestFromCart', deleteLiveTutorRequestFromCart);
app.get('/cart', displayCartInfo);
app.post('/pay', payment);
app.get('/classList', paid);
>>>>>>> 19e72cd6936456902bdf131284279c19b7885b38

exports.api = functions.https.onRequest(app);