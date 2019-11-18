//export GOOGLE_APPLICATION_CREDENTIALS=/Users/davidxuan/Desktop/USC/577A/OnlineEnglishLearningAcadamyBackEnd/functions/service-account-file.json

const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const app = require('express')();
const cors = require('cors');
app.use(cors());

const { getUser, modifyUser, removeUser } = require('./handler/user');

const { addTutor, modifyTutor, removeTutor } = require('./handler/admin');
const { addBlog, modifyBlog, removeBlog } = require('./handler/admin');
const { addCourse, modifyCourse, removeCourse } = require('./handler/admin');
const { addLesson, modifyLesson, removeLesson } = require('./handler/admin');

const { getBlogComments, postComment } = require('./handler/blog');

const { sendConfirmation } = require('./handler/tutoring');

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

function validParam(id) {
    if (id == "" || typeof (id) != typeof ("abc")) {
        return false;
    }
    return true;
}
exports.modifyBlog = functions.https.onRequest((req, res) => {
    if (!validParam(req.body.id)) {
        res.json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('blog').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('blog').doc(req.body.id).update(req.body.fields);
                res.json({ "Success": "Blog modified" });
            } else {
                res.json({ "Error": "Blog not found" });
            }
        }).catch(function (err) {
            res.json({ "Error": err.message });
        });
});