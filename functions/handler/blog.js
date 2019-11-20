const admin = require('firebase-admin');

exports.getBlogComments = (req, res) => {
    var blog_id = req.body.blog_id;
    admin.firestore().collection('blog_comments').where("blog_id", "==", blog_id).
    orderBy('date', 'desc').get()
    .then(snapshot => {
        r = [];
        snapshot.forEach(doc => {
            r.push(doc.data());
        });
        res.status(200).json(r);
    }).catch(function(err) {
        res.status(400).json({"Error": err.message});
    });
};


exports.postComment = (req, res) => {
    admin.firestore().collection('blog_comments').add(req.body.fields)
    .then((docRef) =>{
        docRef.update({
            date: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({"Success": docRef.id});
    })
    .catch((err) =>{
        res.status(400).json({"Error": err.message});
    });
};


exports.retrieveBlog = (req, res) => {
    admin.firestore().collection('blog').get()
    .then((snapshot) => {
        res.json(snapshot.docs.map(doc => doc.data()));
    })
    .catch((err) => {
        res.status(400).json({"Error": err.message});
    });
};
