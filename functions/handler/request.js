//export GOOGLE_APPLICATION_CREDENTIALS=/home/horace/aela/OnlineEnglishAcademyBackEnd/functions/service-account-file.json

const admin = require('firebase-admin');


exports.getRequestList = async (req, res) => {
    var userm = new Map();
    await admin.firestore().collection('users').get().then(snapshot=>{
        snapshot.forEach(doc=>{
          //console.log(doc.data().userName);
           userm.set(doc.id, [doc.data().userName, doc.data().email]);
        });
    });


    //console.log(userm.toString());
    // let db = admin.firestore().collection("request");
    // let list = [];
    // let query = db.get()
    //     .then(snapshot => {
    //         snapshot.forEach(doc =>{
    //             let reqObject = {id:doc.id, student:doc.data().student, availableTime:doc.data().availableTime, status:doc.data().status,
    //                 numOfS:doc.data().numOfS, note:doc.data().note, preferredT1:doc.data().preferredT1, email:doc.data().email,
    //                 preferredT2:doc.data().preferredT2, preferredT3:doc.data().preferredT3, price:doc.data().price, timezone:doc.data().timezone};
    //             list.push(reqObject);
    //         });
    //         return res.status(200).json({content: list});
    //     })
    //     .catch(err => {
    //         console.log('Error getting documents', err);
    //         res.status(400).json(err);
    //     });
    list = [];
    admin.firestore().collection('request').get()
    .then((snapshot) => {
        snapshot.docs.map(doc => {

          //console.log(userm.get("lDdWNayBTCWXTXrYnEbODADOLr02")+"----");
          let obj = doc.data();
          //console.log(doc.data().studentId);
          //console.log(userm.get(doc.data().studentId)+"===");

          if(userm.has(obj.studentId)){
            obj.studentName=userm.get(obj.studentId)[0];
            obj.studentEmail=userm.get(obj.studentId)[1];
          }
          else {
            obj.studentName="UNKNOWN";
          }
          if(userm.has(obj.preferredT1)){
            obj.preferredT1=userm.get(obj.preferredT1)[0];
          }
          else {
            obj.preferredT1="UNKNOWN";
          }
          if(userm.has(obj.preferredT2)){
            obj.preferredT2=userm.get(obj.preferredT2)[0];
          }
          else {
            obj.preferredT2="UNKNOWN";
          }
          if(userm.has(obj.preferredT3)){
            obj.preferredT3=userm.get(obj.preferredT3)[0];
          }
          else {
            obj.preferredT3="UNKNOWN";
          }
          obj.id = doc.id;
          list.push(obj);
        });
        res.status(200).json({"content": list});
    })
    .catch((err) => {
        res.status(400).json({"Error": err.message});
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
