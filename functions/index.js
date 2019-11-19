const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');



admin.initializeApp(functions.config().firebase);

const {retrieveBlog} = require('./handler/blog');
const {getCourses} = require('./handler/course');
const {retrieveTeacherInfo} = require('./handler/teacher');

//request related
const {getRequestList} = require('./handler/request')
const {createRequest} = require('./handler/request')
const {setRequestPrice} = require('./handler/request')
const {confirmRequest} = require('./handler/request')
const {cancelRequest} = require('./handler/request')
const {setRequestStatus} = require('./handler/request')

//schedule related
const {getScheduleList} = require('./handler/schedule')
const {getStuSchedule}  = require('./handler/schedule')
const {getTuSchedule}   = require('./handler/schedule')

//app.post('/create_meeting', signUp);

app.get('/blog', retrieveBlog);
//app.get('/course', getCourses);
app.get('/teacher', retrieveTeacherInfo);
//request related
app.get('/request/getList', getRequestList);
app.post('/request/create', createRequest);
app.post('/request/setPrice', setRequestPrice);
app.post('/request/confirm', confirmRequest);
app.post('/request/cancel', cancelRequest);
app.post('/request/setStatus', setRequestStatus);
//schedule related
app.get('/schedule/getList', getScheduleList);
app.get('/schedule/getStu', getStuSchedule);
app.get('/schedule/getTu', getTuSchedule);

exports.api = functions.https.onRequest(app);
