const admin = require("firebase-admin");

function validParam(id) {
  if (id == "" || typeof id != typeof "abc") {
    return false;
  }
  return true;
}

/*
add a tutor to the database
req: {id: <some-id>, fields: <fields-to-be-added>}
ret: 200 if successful, otherwise 400
*/
exports.addTutor = (req, res) => {
  admin
    .firestore()
    .collection("tutors")
    .add(req.body.fields)
    .then(docRef => {
      res.status(200).send({ Success: docRef.id });
    })
    .catch(err => {
      res.status(400).send({ Error: err.message });
    });
};

/*
modify a tutor in the database
req: {id: <some-id>, fields: <fields-to-be-modified>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.modifyTutor = (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  admin
    .firestore()
    .collection("tutors")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        admin
          .firestore()
          .collection("tutors")
          .doc(req.body.id)
          .update(req.body.fields);
        res.status(200).json({ Success: "Tutor modified" });
      } else {
        res.status(404).json({ Error: "Tutor not found" });
      }
    })
    .catch(function(err) {
      res.status(400).json({ Error: err.message });
    });
};

/*
remove a tutor in the database
req: {id: <some-id>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.removeTutor = (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  admin
    .firestore()
    .collection("tutors")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        admin
          .firestore()
          .collection("tutors")
          .doc(req.body.id)
          .delete();
        admin
          .firestore()
          .collection("users")
          .doc(req.body.id)
          .delete();
        res.status(200).json({ Success: "Tutor removed" });
      } else {
        res.status(404).json({ Error: "Tutor not found" });
      }
    })
    .catch(function(err) {
      res.status(400).json({ Error: err.message });
    });
};

// BLOG RELATED FUNCTIONS

/*
add a blog in the database
req: {id: <some-id>, fields: <fields-to-be-added>}
ret: 200 if successful, otherwise 400
*/
exports.addBlog = (req, res) => {
  admin
    .firestore()
    .collection("blog")
    .add(req.body.fields)
    .then(docRef => {
      docRef.update({
        date: admin.firestore.FieldValue.serverTimestamp()
      });
      res.status(200).json({ Success: docRef.id });
    })
    .catch(err => {
      res.status(400).json({ Error: err.message });
    });
};


/*
modify a blog in the database
req: {id: <some-id>, fields: <fields-to-be-modified>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.modifyBlog = (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  admin
    .firestore()
    .collection("blog")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        admin
          .firestore()
          .collection("blog")
          .doc(req.body.id)
          .update(req.body.fields);
        res.status(200).json({ Success: "Blog modified" });
      } else {
        res.status(404).json({ Error: "Blog not found" });
      }
    })
    .catch(function(err) {
      res.status(400).json({ Error: err.message });
    });
};

/*
remove a blog in the database
req: {id: <some-id>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.removeBlog = (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  admin
    .firestore()
    .collection("blog")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        admin
          .firestore()
          .collection("blog")
          .doc(req.body.id)
          .delete();
        res.status(200).json({ Success: "Blog removed" });
      } else {
        res.status(404).json({ Error: "Blog not found" });
      }
    })
    .catch(function(err) {
      res.status(400).json({ Error: err.message });
    });
};

// COURSE RELATED FUNCTIONS
/*
add a course in the database
req: {id: <some-id>, fields: <fields-to-be-added>}
ret: 200 if successful, otherwise 400
*/
exports.addCourse = (req, res) => {
  admin
    .firestore()
    .collection("course")
    .add(req.body.fields)
    .then(docRef => {
      res.status(200).json({ Success: docRef.id });
    })
    .catch(err => {
      res.status(400).json({ Error: err.message });
    });
};

/*
modify a course in the database
req: {id: <some-id>, fields: <fields-to-be-modified>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.modifyCourse = (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  admin
    .firestore()
    .collection("course")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        admin
          .firestore()
          .collection("course")
          .doc(req.body.id)
          .update(req.body.fields);
        res.status(200).json({ Success: "Course modified" });
      } else {
        res.status(404).json({ Error: "Course not found" });
      }
    })
    .catch(function(err) {
      res.status(400).json({ Error: err.message });
    });
};

/*
remove a course in the database
req: {id: <some-id>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.removeCourse = (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  admin
    .firestore()
    .collection("course")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        admin
          .firestore()
          .collection("course")
          .doc(req.body.id)
          .delete();
        res.status(200).json({ Success: "Course removed" });
      } else {
        res.status(404).json({ Error: "Course not found" });
      }
    })
    .catch(function(err) {
      res.status(400).json({ Error: err.message });
    });
};

// LESSON RELATED FUNCTIONS

/*
add a lesson in the database, then update its course
req: {id: <some-id>, fields: <fields-to-be-added>}
ret: 200 if successful, otherwise 400
*/
exports.addLesson = async (req, res) => {
  let id = await admin
    .firestore()
    .collection("lesson")
    .add(req.body.fields)
    .then(docRef => {
      return docRef.id;
    })
    .catch(err => {
      res.status(400).json({ Error: err.message });
      return "";
    });
  if (id === "") {
    return;
  }
  let old = await admin
    .firestore()
    .collection("course")
    .doc(req.body.fields.course_id)
    .get()
    .then(doc => {
      return doc.data().lessonArray;
    })
    .catch(err => {
      res.status(400).json({ Error: err.message });
      return "";
    });
  if (old === "") {
    return;
  }
  old.push(id);
  admin
    .firestore()
    .collection("course")
    .doc(req.body.fields.course_id)
    .update({ lessonArray: old })
    .then(() => {
      res.status(200).json({ Success: "Lesson added" });
    })
    .catch(err => {
      res.status(400).json({ Error: err.message });
    });
};

/*
modify a lesson in the database
req: {id: <some-id>, fields: <fields-to-be-modified>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.modifyLesson = (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  admin
    .firestore()
    .collection("lesson")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        admin
          .firestore()
          .collection("lesson")
          .doc(req.body.id)
          .update(req.body.fields);
        res.status(200).json({ Success: "Lesson modified" });
      } else {
        res.status(404).json({ Error: "Lesson not found" });
      }
    })
    .catch(function(err) {
      res.status(400).json({ Error: err.message });
    });
};

/*
remove a lesson in the database, then update its course
req: {id: <some-id>}
ret: 200 if successful, 404 if not found, otherwise 400
*/
exports.removeLesson = async (req, res) => {
  if (!validParam(req.body.id)) {
    res.status(400).json({ Error: "Invalid ID" });
  }
  let courseID = await admin
    .firestore()
    .collection("lesson")
    .doc(req.body.id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        tmp = doc.data().course_id;
        admin
          .firestore()
          .collection("lesson")
          .doc(req.body.id)
          .delete();
        return tmp;
      }
    });
  let updated = await admin
    .firestore()
    .collection("course")
    .doc(courseID)
    .get()
    .then(doc => {
      tmp = doc.data().lessonArray;
      idx = tmp.indexOf(req.body.id);
      tmp.splice(idx, 1);
      return tmp;
    });
  admin
    .firestore()
    .collection("course")
    .doc(courseID)
    .update({ lessonArray: updated })
    .then(doc => {
      res.status(200).json({ Success: "Lesson removed" });
    })
    .catch(err => {
      res.status(400).json({ Error: err.message });
    });
};
