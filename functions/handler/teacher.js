const admin = require('firebase-admin');

/*
retrieve all tutors in the database
req: {}
ret: 200 if successful, otherwise 400
*/
exports.retrieveTeacherInfo = (req, res) => {
    admin.firestore().collection('tutors').get()
    .then((snapshot) => {
        res.json(snapshot.docs.map(doc => doc.data()));
    })
    .catch((err) => {
        res.status(400).json({"Error": err.message});
    });
};
