// firebase functions:config:set gmail.email="team2eola@gmail.com" gmail.password="CsCi577a"

const admin = require('firebase-admin');
const APP_NAME = 'Online English Learning Academy';
const nodemailer = require('nodemailer');

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
                            mailOptions.text = `Hey ${student_info['userName'] || ''}!, your have an upcoming tutoring session with ${tutor_info['userName']} from ${req.body.start_time} to ${req.body.end_time}.`;
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

exports.getMeetingList = async (req, res) => {
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
        query_field = "student_id";
    } else {
        query_field = "tutor_id";
    }
    var id = req.body.id;
    admin.firestore().collection('meeting').where(query_field, "==", id).
    orderBy('start_time').get()
    .then(snapshot => {
        res.status(200).json(snapshot.docs.map(doc => [doc.id, doc.data()]));
    }).catch(function(err) {
        res.status(400).json({"Error": err.message});
    });
};

exports.setMeetingLink = (req, res) => {
    admin.firestore().collection('meeting').doc(req.body.id).get()
        .then(function (doc) {
            if (doc.exists) {
                admin.firestore().collection('meeting').doc(req.body.id).update(req.body.fields);
                res.status(200).json({ "Success": "Meeting link set" });
            } else {
                res.status(400).json({ "Error": "Meeting not found" });
            }
        }).catch(function (err) {
            res.status(400).json({ "Error": err.message });
        });
};

exports.createMeeting = (req, res) => {
    admin.firestore().collection('meeting').add(req.body.fields)
        .then((docRef) => {
            res.status(200).send({ "Success": docRef.id });
        })
        .catch((err) => {
            res.status(400).send({ "Error": err.message });
        });
};
