const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');



admin.initializeApp(functions.config().firebase);

const {retrieveBlog} = require('./handler/blog');
const {getCourse} = require('./handler/course');
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
app.get('/teacher', retrieveTeacherInfo);
app.get('/addCourseIntoCart', addCourseIntoCart);
app.get('/deleteCourseFromCart', deleteCourseFromCart);
app.get('/addLiveTutorRequestIntoCart', addLiveTutorRequestIntoCart);
app.get('/deleteTutorRequestFromCart', deleteLiveTutorRequestFromCart);
app.get('/cart', displayCartInfo);
app.post('/pay', payment);
app.get('/classList', paid);

exports.api = functions.https.onRequest(app);