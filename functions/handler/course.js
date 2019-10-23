const admin = require('firebase-admin');

exports.getCourse = (req, res) => {
    let course_db = admin.firestore().collection('course');
    course_db.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                res.status(200).json(doc.data());
            })
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.status(400).json(err);
        });
};
