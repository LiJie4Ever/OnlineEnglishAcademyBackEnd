const admin = require('firebase-admin');

/**
<<<<<<< HEAD
 * author: Vito
=======
 *
>>>>>>> 12258d4f6bc84e1a762a25efc12e08e4b004db7b
 * retrieve all fields in each document.
 *
 * */
exports.retrieveTeacherInfo = (req, res) => {

    let db = admin.firestore().collection("teacher");

    let allTeachers = [];
    let query = db.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                allTeachers.push(doc.data());
            });
            console.log("all Teachers are:");
            console.log(allTeachers);
            res.status(200).json({ content: allTeachers});
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(400).json(err);
        });

};