const admin = require('firebase-admin');

/**
 *
 * retrieve all fields in each document.
 *
 * */
exports.retrieveBlog = (req, res) => {

    let db = admin.firestore().collection("blog");

    let allBlogs = [];
    let query = db.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                allBlogs.push(doc.data());
            });
            console.log("all blogs are:");
            console.log(allBlogs);
            return res.status(200).json({ content: allBlogs});
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(400).json(err);
        });

};