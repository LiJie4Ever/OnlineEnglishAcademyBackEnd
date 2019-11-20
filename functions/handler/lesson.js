const admin = require('firebase-admin');

exports.getLesson = (req, res) => {
    admin.firestore().collection('lesson').doc(req.body.lessonID).get()
    .then((doc) => {
        res.status(200).json(doc.data());
    })
    .catch((err) => {
        res.status(400).json({"Error": err.message});
    });
};
