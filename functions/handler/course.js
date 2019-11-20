const admin = require('firebase-admin');

exports.getCourse = (req, res) => {
    admin.firestore().collection('course').get()
    .then((snapshot) => {
        res.json(snapshot.docs.map(doc => [doc.id, doc.data()]));
    })
    .catch((err) => {
        res.status(400).json({"Error": err.message});
    });
};
