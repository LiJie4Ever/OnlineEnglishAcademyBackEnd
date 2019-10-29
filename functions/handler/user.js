const admin = require('firebase-admin');

exports.addUser = (req, res) => {
    idToken = req.body.token;
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
        let uid = decodedToken.uid;
        admin.firestore().collection('user').doc(uid).set(req.body.fields);
        res.status(200).json('success');
    })
    .catch((err) => {
        res.status(400).json('failed' + err);
    });
};


exports.getUser = (req, res) => {
    let uid = req.body.uid;
    admin.firestore().collection('user').doc(uid).get()
    .then((doc) => {
        res.status(200).json(doc.data());
    })
    .catch((err) => {
        res.status(400).json({"error": err});
    })
};


exports.modifyUser = (req, res) => {
    let userRef = admin.firestore().collection('user').doc(req.body.uid);
    userRef.set(req.body.fields)
};
