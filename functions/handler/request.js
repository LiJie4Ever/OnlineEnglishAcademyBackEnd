//export GOOGLE_APPLICATION_CREDENTIALS=/home/horace/aela/OnlineEnglishAcademyBackEnd/functions/service-account-file.json

const admin = require('firebase-admin');
const APP_NAME = 'Online English Academy';
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

// use when testing other functions locally
const gmailEmail = "";
const gmailPassword = "";

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.getRequestList = async (req, res) => {
    var userm = new Map();
    await admin.firestore().collection('users').get().then(snapshot=>{
        snapshot.forEach(doc=>{
          //console.log(doc.data().userName);
           userm.set(doc.id, [doc.data().userName, doc.data().email]);
        });
    });

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

exports.sendRequestConfirmation = (req, res) => {
    admin.firestore().collection('users').doc(req.body.student_uid).get()
        .then(function (doc) {
            if (doc.exists) {
                student_info = doc.data();
                const mailOptions = {
                    from: `${APP_NAME} <noreply@firebase.com>`,
                    to: student_info['email'],
                };
                mailOptions.subject = `Your upcoming tutoring session!`;
                mailOptions.text = req.body.content;
                mailTransport.sendMail(mailOptions);
                res.status(200).json({ "Success": "Email sent successfully" });
            } else {
                res.status(400).json({ "Error": "Student not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": "When fetching student " + err.message });
        });
};
