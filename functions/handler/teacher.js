const admin = require('firebase-admin');


exports.retrieveTeacherInfo = (req, res) => {
    admin.firestore().collection('tutors').get()
    .then((snapshot) => {
        res.json(snapshot.docs.map(doc => doc.data()));
    })
    .catch((err) => {
        res.status(400).json({"Error": err.message});
    });
};
