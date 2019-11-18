const admin = require('firebase-admin');

function validParam(id) {
    if (id == "" || typeof (id) != typeof ("abc")) {
        return false;
    }
    return true;
}


// TUTOR RELATED FUNCTIONS

exports.addTutor = (req, res) => {
    admin.firestore().collection('tutors').add(req.body.fields)
        .then((docRef) => {
            res.status(200).send({ "Success": docRef.id });
        })
        .catch((err) => {
            res.status(400).send({ "Error": err.message });
        });
};

exports.modifyTutor = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('tutors').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('tutors').doc(req.body.id).update(req.body.fields);
                res.status(200).json({ "Success": "Tutor modified" });
            } else {
                res.status(404).json({ "Error": "Tutor not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

exports.removeTutor = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('tutors').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('tutors').doc(req.body.id).delete();
                admin.firestore().collection('users').doc(req.body.id).delete();
                res.status(200).json({ "Success": "Tutor removed" });
            } else {
                res.status(404).json({ "Error": "Tutor not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
}


// BLOG RELATED FUNCTIONS

exports.addBlog = (req, res) => {
    admin.firestore().collection('blog').add(req.body.fields)
        .then((docRef) => {
            docRef.update({
                date: admin.firestore.FieldValue.serverTimestamp()
            });
            res.status(200).json({ "Success": docRef.id });
        })
        .catch((err) => {
            res.status(400).json({ "Error": err.message });
        });
};

exports.modifyBlog = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('blog').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('blog').doc(req.body.id).update(req.body.fields);
                res.status(200).json({ "Success": "Blog modified" });
            } else {
                res.status(404).json({ "Error": "Blog not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};


exports.removeBlog = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('blog').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('blog').doc(req.body.id).delete();
                res.status(200).json({ "Success": "Blog removed" });
            } else {
                res.status(404).json({ "Error": "Blog not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};


// COURSE RELATED FUNCTIONS

exports.addCourse = (req, res) => {
    admin.firestore().collection('course').add(req.body.fields)
        .then((docRef) => {
            res.status(200).json({ "Success": docRef.id });
        })
        .catch((err) => {
            res.status(400).json({ "Error": err.message });
        });
};

exports.modifyCourse = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('course').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('course').doc(req.body.id).update(req.body.fields);
                res.status(200).json({ "Success": "Course modified" });
            } else {
                res.status(404).json({ "Error": "Course not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

exports.removeCourse = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('course').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('course').doc(req.body.id).delete();
                res.status(200).json({ "Success": "Course removed" });
            } else {
                res.status(404).json({ "Error": "Course not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

// LESSON RELATED FUNCTIONS

exports.addLesson = (req, res) => {
    admin.firestore().collection('lesson').add(req.body.fields)
        .then((docRef) => {
            res.status(200).json({ "Success": docRef.id });
        })
        .catch((err) => {
            res.status(400).json({ "Error": err.message });
        });
};

exports.modifyLesson = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('lesson').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('lesson').doc(req.body.id).update(req.body.fields);
                res.status(200).json({ "Success": "Lesson modified" });
            } else {
                res.status(404).json({ "Error": "Lesson not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

exports.removeLesson = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({ "Error": "Invalid ID" });
    }
    admin.firestore().collection('lesson').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('lesson').doc(req.body.id).delete();
                res.status(200).json({ "Success": "Lesson removed" });
            } else {
                res.status(404).json({ "Error": "Lesson not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

