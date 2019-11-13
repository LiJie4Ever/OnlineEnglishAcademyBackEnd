const admin = require('firebase-admin');

function validParam(id) {
    if (id == "" || typeof(id) != typeof("abc")) {
        return false;
    }
    return true;
}


// TUTOR RELATED FUNCTIONS

exports.addTutor = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).send({"Error": "Invalid ID"});
    }
    let userRef = admin.firestore().collection('tutors').doc(req.body.id);
    userRef.set(req.body.fields)
    .then(() =>{
        res.status(200).send({"Success": "Tutor added"});
    })
    .catch((err) =>{
        res.status(400).send({"Error": err.message});
    });
};

exports.modifyTutor = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('tutors').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('tutors').doc(req.body.id).update(req.body.fields)
            res.status(200).json({"Success": "Tutor modified"});
        } else {
            res.status(404).json({"Error": "Tutor not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};

exports.removeTutor = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('tutors').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('tutors').doc(req.body.id).delete();
            admin.firestore().collection('users').doc(req.body.id).delete();
            res.status(200).json({"Success": "Tutor removed"});
        } else {
            res.status(404).json({"Error": "Tutor not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
}


// BLOG RELATED FUNCTIONS

exports.addBlog = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    let userRef = admin.firestore().collection('blog').doc(req.body.id);
    userRef.set(req.body.fields)
    .then(() =>{
        res.status(200).json({"Success": "Blog added"});
    })
    .catch((err) =>{
        res.status(400).json({"Error": err});
    });
};

exports.modifyBlog = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('blog').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('blog').doc(req.body.id).update(req.body.fields);
            res.status(200).json({"Success": "Blog modified"});
        } else {
            res.status(404).json({"Error": "Blog not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};

exports.removeBlog = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('blog').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('blog').doc(req.body.id).delete();
            res.status(200).json({"Success": "Blog removed"});
        } else {
            res.status(404).json({"Error": "Blog not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};


// COURSE RELATED FUNCTIONS

exports.addCourse = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    let userRef = admin.firestore().collection('course').doc(req.body.id);
    userRef.set(req.body.fields)
    .then(() =>{
        res.status(200).json({"Success": "Course added"});
    })
    .catch((err) =>{
        res.status(400).json({"Error": err});
    });
};

exports.modifyCourse = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('course').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('course').doc(req.body.id).update(req.body.fields);
            res.status(200).json({"Success": "Course modified"});
        } else {
            res.status(404).json({"Error": "Course not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};

exports.removeCourse = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('course').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('course').doc(req.body.id).delete();
            res.status(200).json({"Success": "Course removed"});
        } else {
            res.status(404).json({"Error": "Course not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};

// LESSON RELATED FUNCTIONS

exports.addLesson = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    let userRef = admin.firestore().collection('lesson').doc(req.body.id);
    userRef.set(req.body.fields)
    .then(() =>{
        res.status(200).json({"Success": "Lesson added"});
    })
    .catch((err) =>{
        res.status(400).json({"Error": err});
    });
};

exports.modifyLesson = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('lesson').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('lesson').doc(req.body.id).update(req.body.fields);
            res.status(200).json({"Success": "Lesson modified"});
        } else {
            res.status(404).json({"Error": "Lesson not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};

exports.removeLesson = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    admin.firestore().collection('lesson').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('lesson').doc(req.body.id).delete();
            res.status(200).json({"Success": "Lesson removed"});
        } else {
            res.status(404).json({"Error": "Lesson not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};

