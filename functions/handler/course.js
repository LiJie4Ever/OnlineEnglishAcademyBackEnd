const admin = require('firebase-admin');

exports.getCourse = (req, res) => {
    let course_db = admin.firestore().collection('course');
    let allcourses = [];
    course_db.get()
        .then((snapshot) => {
            if(snapshot.empty) {
                console.log("No matching documents");
                return;
            }
            snapshot.forEach((doc) => {
                allcourses.push(doc.data());
            });
            console.log("all courses are:");
            console.log(allcourses);
            return res.status(200).json({content: allcourses});
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.status(400).json(err);
        });
};