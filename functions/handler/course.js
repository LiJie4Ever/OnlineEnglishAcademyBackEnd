const admin = require('firebase-admin');

exports.getAllCourse = (req, res) => {
    let course_db = admin.firestore().collection('course');
    let r = [];
    course_db.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                r.push(doc.data());
            })
            res.status(200).json(r);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.status(400).json(err);
        });
};
