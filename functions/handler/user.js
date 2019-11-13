const admin = require('firebase-admin');

function validParam(id) {
    if (id == "" || typeof(id) != typeof("abc")) {
        return false;
    }
    return true
}

exports.getUser = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }

    admin.firestore().collection('users').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            res.status(200).json(doc.data());
        } else {
            res.status(400).json({"Error": "User not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};


exports.modifyUser = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }

    admin.firestore().collection('users').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('users').doc(req.body.id).update(req.body.fields);
            res.status(200).json({"Success": "User modified"});
        } else {
            res.status(400).json({"Error": "User not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};


exports.removeUser = (req, res) => {
    if (!validParam(req.body.id)) {
        res.status(400).json({"Error": "Invalid ID"});
    }

    admin.firestore().collection('users').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
           admin.firestore().collection('users').doc(req.body.id).delete();
            res.status(200).json({"Success": "User removed"});
        } else {
            res.status(400).json({"Error": "User not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};
