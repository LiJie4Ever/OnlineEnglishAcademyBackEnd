const admin = require('firebase-admin');

exports.getLesson = (req, res) => {
    let lesson_db = admin.firestore().collection('lesson');
    lesson_db.get()
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
