const admin = require('firebase-admin');


exports.getScheduleList = (req, res) => {
    let db = admin.firestore().collection("schedule");
    let list = [];
    let query = db.get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                let reqObject = {id:doc.id, createTime:doc.data().createTime, duration:doc.data().duration, link:doc.data().link,
                    meetingStartTime:doc.data().meetingStartTime, offset:doc.data().offset, student:doc.data().student, tutor:doc.data().tutor, status:doc.data().status};
                list.push(reqObject);
            });
            return res.status(200).json({content: list});
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

//parameters input: body:{studentID:"XXXX"}
exports.getStuSchedule = (req, res) => {
  let db = admin.firestore().collection("schedule");
  let list = [];
  let query = db.get()
      .then(snapshot => {
          snapshot.forEach(doc =>{
              let reqObject = {createTime:doc.data().createTime, duration:doc.data().duration, link:doc.data().link,
                  meetingStartTime:doc.data().meetingStartTime, offset:doc.data().offset, student:doc.data().student, tutor:doc.data().tutor, status:doc.data().status};
              if(doc.data().student == req.body.studentID){
                  list.push(reqObject);
                }
          });
          return res.status(200).json({content: list});
      })
      .catch(err => {
          res.status(400).json(err);
      });
};

//parameters input: body:{tutorID:"XXXX"}
exports.getTuSchedule = (req, res) =>{
  let db = admin.firestore().collection("schedule");
  let list = [];
  let query = db.get()
      .then(snapshot => {
          snapshot.forEach(doc =>{
              let reqObject = {createTime:doc.data().createTime, duration:doc.data().duration, link:doc.data().link,
                  meetingStartTime:doc.data().meetingStartTime, offset:doc.data().offset, student:doc.data().student, tutor:doc.data().tutor, status:doc.data().status};
              if(doc.data().tutor == req.body.tutorID){
                  list.push(reqObject);
                }
          });
          return res.status(200).json({content: list});
      })
      .catch(err => {
          res.status(400).json(err);
      });
};

exports.addSchedule = (req, res) =>{
  admin.firestore().collection('schedule').add(req.body.fields)
  .then((docRef) =>{
      res.status(200).send({"Success": docRef.id});
  })
  .catch((err) =>{
      res.status(400).send({"Error": err.message});
  });
};

exports.deleteSchedule = (req, res) =>{
  admin.firestore().collection('schedule').doc(req.body.id).get()
  .then(function(doc) {
      if (doc.exists) {
          admin.firestore().collection('schedule').doc(req.body.id).delete();
          res.status(200).json({"Success": "schedule deleted successfully!"});
      } else {
          res.status(404).json({"Error": "schedule not found"});
      }
  }).catch(function(err) {
      res.status(400).json({"Error": err.message});
  });
};
