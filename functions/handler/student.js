const admin = require('firebase-admin');


exports.getStudent = (req, res) => {
    admin.firestore().collection("students").doc(req.body.id).get()
        .then(doc => {
            if (doc.exists) {
                res.status(200).json(doc.data());
            } else {
                res.status(404).json({"Error": "Student not found"});
            }
        })
        .catch(err => {
            res.status(400).json({'Error': err.message});
        });
};