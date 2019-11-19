const admin = require('firebase-admin');


exports.getRequestList = (req, res) => {
    let db = admin.firestore().collection("request");
    let list = [];
    let query = db.get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                let reqObject = {student:doc.data().student, availableTime:doc.data().availableTime, status:doc.data().status,
                    numOfS:doc.data().numOfS, note:doc.data().note, preferredT1:doc.data().preferredT1, email:doc.data().email,
                    preferredT2:doc.data().preferredT2, preferredT3:doc.data().preferredT3, price:doc.data().price, timezone:doc.data().timezone};
                list.push(reqObject);
            });
            return res.status(200).json({content: list});
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(400).json(err);
        });
};

// no use
exports.createRequest = (req, res) => {
    //console.log(JSON.stringify(req.body));
    //let rdata = JSON.parse(JSON.stringify(req.body));
    //console.log(rdata);
    //console.log("hihihiii");
    admin.firestore().collection('request').add(req.body.fields)
    .then((docRef) =>{
        res.status(200).send({"Success": docRef.id});
    })
    .catch((err) =>{
        res.status(400).send({"Error": err.message});
    });
};

exports.setRequestPrice = (req, res) => {
    admin.firestore().collection('request').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('request').doc(req.body.id).update({
                price:req.body.price,
            });
            res.status(200).json({"Success": "Price modified"});
        } else {
            res.status(404).json({"Error": "Request not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err.message});
    });
};

// status 0: unconfirmed, 1: unpaid, 2: paid
// set status to 1
exports.confirmRequest =(req, res) => {
    admin.firestore().collection('request').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('request').doc(req.body.id).update({
                status:"1",
            });
            res.status(200).json({"Success": "Request comfirmed"});
        } else {
            res.status(404).json({"Error": "Request not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err.message});
    });
};

// delete the request
exports.cancelRequest = (req, res) => {
    admin.firestore().collection('request').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('request').doc(req.body.id).delete();
            res.status(200).json({"Success": "Request Canceled"});
        } else {
            res.status(404).json({"Error": "Request not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err.message});
    });
};

// set status to 2
exports.setRequestStatus = (req, res) => {
    admin.firestore().collection('request').doc(req.body.id).get()
    .then(function(doc) {
        if (doc.exists) {
            admin.firestore().collection('request').doc(req.body.id).update({
                status:2,
            });
            res.status(200).json({"Success": "Set request status successfully to paid"});
        } else {
            res.status(404).json({"Error": "Request not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err.message});
    });
};
