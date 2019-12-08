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

exports.getScheduleList = async (req, res) => {
    var userm = new Map();
    await admin.firestore().collection('users').get().then(snapshot=>{
        snapshot.forEach(doc=>{
          //console.log(doc.data().userName);
           userm.set(doc.id, doc.data().userName);
        });
    });
    // let db = admin.firestore().collection("schedule");
    // let list = [];
    // let query = db.get()
    //     .then(snapshot => {
    //         snapshot.forEach(doc =>{
    //             let reqObject = {id:doc.id, createTime:doc.data().createTime, duration:doc.data().duration, link:doc.data().link,
    //                 meetingStartTime:doc.data().meetingStartTime, offset:doc.data().offset, student:doc.data().student, tutor:doc.data().tutor, status:doc.data().status};
    //             list.push(reqObject);
    //         });
    //         return res.status(200).json({content: list});
    //     })
    //     .catch(err => {
    //         res.status(400).json(err);
    //     });
    list = [];
    admin.firestore().collection('schedule').get()
    .then((snapshot) => {
        snapshot.docs.map(doc => {
          var obj = doc.data();

          if(userm.has(obj.student)){
            obj.student=userm.get(obj.student);
          }
          else {
            obj.student="UNKNOWN";
          }
          if(userm.has(obj.tutor)){
            obj.tutor=userm.get(obj.tutor);
          }
          else {
            obj.tutor="UNKNOWN";
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

//parameters input: body:{studentID:"XXXX"}
exports.getStuSchedule = (req, res) => {
    let db = admin.firestore().collection("schedule");
    let list = [];
    let query = db.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let reqObject = {
                    createTime: doc.data().createTime, duration: doc.data().duration, link: doc.data().link,
                    meetingStartTime: doc.data().meetingStartTime, offset: doc.data().offset, student: doc.data().student, tutor: doc.data().tutor, status: doc.data().status
                };
                if (doc.data().student == req.body.studentID) {
                    list.push(reqObject);
                }
            });
            return res.status(200).json({ content: list });
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

//parameters input: body:{tutorID:"XXXX"}
exports.getTuSchedule = (req, res) => {
    let db = admin.firestore().collection("schedule");
    let list = [];
    let query = db.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let reqObject = {
                    createTime: doc.data().createTime, duration: doc.data().duration, link: doc.data().link,
                    meetingStartTime: doc.data().meetingStartTime, offset: doc.data().offset, student: doc.data().student, tutor: doc.data().tutor, status: doc.data().status
                };
                if (doc.data().tutor == req.body.tutorID) {
                    list.push(reqObject);
                }
            });
            return res.status(200).json({ content: list });
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

exports.addSchedule = (req, res) => {
    admin.firestore().collection('schedule').add(req.body.fields)
        .then((docRef) => {
            res.status(200).send({ "Success": docRef.id });
        })
        .catch((err) => {
            res.status(400).send({ "Error": err.message });
        });
};

exports.deleteSchedule = (req, res) => {
    admin.firestore().collection('schedule').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('schedule').doc(req.body.id).delete();
                res.status(200).json({ "Success": "schedule deleted successfully!" });
            } else {
                res.status(404).json({ "Error": "schedule not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

exports.getScheduleHistory = async (req, res) => {
    let role = await admin.firestore().collection('users').doc(req.body.id).get()
        .then(doc => {
            if (doc.exists) {
                if ("STUDENT" in doc.data().roles) {
                    return "student";
                } else if ("TUTOR" in doc.data().roles) {
                    return "tutor";
                } else {
                    return "User is admin";
                }
            } else {
                return "User is not found";
            }
        })
        .catch(err => {
            return err.message;
        });
    if (role != "student" && role != "tutor") {
        res.status(400).json({ "Error": role });
        return;
    }

    query_field = "";
    if (role == "student") {
        query_field = "student";
    } else {
        query_field = "tutor";
    }
    var id = req.body.id;
    admin.firestore().collection('schedule').where(query_field, "==", id).
        orderBy('meetingStartTime').get()
        .then(snapshot => {
            res.status(200).json(snapshot.docs.map(doc => [doc.id, doc.data()]));
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

exports.setScheduleLink = (req, res) => {
    admin.firestore().collection('schedule').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('schedule').doc(req.body.id).update(req.body.fields);
                res.status(200).json({ "Success": "Schedule link set" });
            } else {
                res.status(400).json({ "Error": "Schedule not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

exports.sendConfirmation = (req, res) => {
    admin.firestore().collection('users').doc(req.body.student_uid).get()
        .then(function (doc) {
            if (doc.exists) {
                student_info = doc.data();
                admin.firestore().collection('tutors').doc(req.body.tutor_uid).get()
                    .then(function (doc) {
                        if (doc.exists) {
                            tutor_info = doc.data();
                            const mailOptions = {
                                from: `${APP_NAME} <noreply@firebase.com>`,
                                to: student_info['email'],
                            };
                            mailOptions.subject = `Your upcoming tutoring session!`;
                            mailOptions.text = `Hey ${student_info['userName'] || ''}!, your have an upcoming tutoring session with ${tutor_info['userName']} at ${req.body.start_time}.`;
                            mailTransport.sendMail(mailOptions);
                            res.status(200).json({ "Success": "Email sent successfully" });
                        } else {
                            res.status(400).json({ "Error": "Tutor not found" });
                        }
                    }).catch(function (err) {
                        res.status(400).json({ "Error": "When fetching tutor " + err.message });
                    });
            } else {
                res.status(400).json({ "Error": "Student not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": "When fetching student " + err.message });
        });
};