const admin = require("firebase-admin");

/*
retrieve a student in the database
req: {id: <some-id>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.getStudent = (req, res) => {
  console.log(req.body);
  console.log(req.data);
  admin
    .firestore()
    .collection("students")
    .doc(req.body.id)
    .get()
    .then(doc => {
      if (doc.exists) {
        res.status(200).json(doc.data());
      } else {
        res.status(404).json({ Error: "Student not found" });
      }
    })
    .catch(err => {
      res.status(400).json({ Error: err.message });
    });
};
