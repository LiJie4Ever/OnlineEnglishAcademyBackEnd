
const admin = require('firebase-admin');
/**
 * author: Vito
 * cart module.
 * */

/**
 * add a course into cart
 *
 * */
exports.addCourseIntoCart = (req, res) => {

    let currentUser = admin.firestore().collection("student").doc("abc");  //TODO: change to the current uid
    // get current course json from front-end
    let currentCourseId = JSON.parse(req.body.toString());
    console.log(currentCourseId.courseID);
    // check the currentCourse is owned or not, if owned, alert massage, else add into cart
    currentUser.update({
        courseArrayCart: admin.firestore.FieldValue.arrayUnion(currentCourseId)
    });

};

/**
 * delete a course from cart
 *
 * */
exports.deleteCourseFromCart = (req, res) => {

    let currentUser = admin.firestore().collection("student").doc("abc");  //TODO: change to the current uid
    // get current course json from front-end
    let currentCourseId = JSON.parse(req.body.toString());
    console.log(currentCourseId.courseID);
    currentUser.update({
        courseArrayCart: admin.firestore.FieldValue.arrayRemove(currentCourseId)
    });

};

/**
 * add a live tutoring request into cart
 *
 * */
exports.addLiveTutorRequestIntoCart = (req, res) => {

    let currentUser = admin.firestore().collection("student").doc("abc");  //TODO: change to the current uid
    // get current course json from front-end
    let currentTuorRequestId = JSON.parse(req.body.toString());
    console.log(currentTuorRequestId.requestID);
    // check the currentCourse is owned or not, if owned, alert massage, else add into cart
    currentUser.update({
        onlineTutorArrayCart: admin.firestore.FieldValue.arrayUnion(currentTuorRequestId)
    });

};

/**
 * delete a live tutoring request from cart
 *
 * */
exports.deleteLiveTutorRequestFromCart = (req, res) => {

    let currentUser = admin.firestore().collection("student").doc("abc");  //TODO: change to the current uid
    // get current course json from front-end
    let currentTuorRequestId = JSON.parse(req.body.toString());
    console.log(currentTuorRequestId.requestID);
    currentUser.update({
        onlineTutorArrayCart: admin.firestore.FieldValue.arrayRemove(currentTuorRequestId)
    });

};

/**
 * display cart info (including course video info & live tutoring request info)
 *
 * */
exports.displayCartInfo = (req, res) => {

    let currentUser = admin.firestore().collection("student").doc("abc");   //TODO: change to the current uid
    let courseIndexArray = [];
    let liveTutorIndexArray = [];
    let cartInfo = [];
    currentUser.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let courseArrayCart = doc.data().courseArrayCart;
                let liveTutorArrayCart = doc.data().onlineTutorArrayCart;
                for (let i = 0; i < courseArrayCart.length; i++) {
                    courseIndexArray.push(courseArrayCart[i].courseID);
                }
                // console.log(courseIndexArray);      // e.g. courseIndexArray: [ 'courseID_1', 'courseID_20' ]
                for (let i = 0; i < liveTutorArrayCart.length; i++) {
                    liveTutorIndexArray.push(liveTutorArrayCart[i].requestID);
                }
                // console.log(liveTutorIndexArray);   // e.g. liveTutorIndexArray: [ 'requestID_1', 'requestID_20' ]
                return [courseIndexArray, liveTutorIndexArray];
            }
        })
        .then(([courseIndexArray, liveTutorIndexArray]) => {        // get all course info from db
            let courseTempArray = [];
            let liveTutorTempArray = [];
            let finalPromise = new Promise(resolve => {
                let coursePromise = new Promise(resolve => {
                    for (let i = 0; i < courseIndexArray.length; i++) {
                        let currentCourse = admin.firestore().collection("course").doc(courseIndexArray[i]);
                        let currentCourseInfo = currentCourse.get()
                            .then(doc => {
                                return doc.data();
                            })
                            .catch(err => {
                                console.log('Error getting document', err);
                            });
                        Promise.all([currentCourseInfo]).then(data => {
                            courseTempArray.push(data);
                            if (i === courseIndexArray.length - 1) {
                                resolve();
                            }
                        });
                    }
                });
                coursePromise.then(function () {
                    //  console.log(courseTempArray);
                    //  return courseTempArray;
                    for (let i = 0; i < courseTempArray.length; i++) {
                        cartInfo.push(courseTempArray[i]);
                    }
                });
                let liveTutorPromise = new Promise(resolve => {
                    for (let i = 0; i < liveTutorIndexArray.length; i++) {
                        let currentLiveTutor = admin.firestore().collection("request").doc(liveTutorIndexArray[i]);
                        let currentLiveTutorInfo = currentLiveTutor.get()
                            .then(doc => {
                                return doc.data();
                            })
                            .catch(err => {
                                console.log('Error getting document', err);
                            });
                        Promise.all([currentLiveTutorInfo]).then(data => {
                            liveTutorTempArray.push(data);
                            if (i === liveTutorIndexArray.length - 1) {
                                resolve();
                            }
                        });
                    }
                });
                liveTutorPromise.then(function () {
                    //  console.log(liveTutorTempArray);
                    //  return liveTutorTempArray;
                    for (let i = 0; i < liveTutorTempArray.length; i++) {
                        cartInfo.push(liveTutorTempArray[i]);
                    }
                });
                Promise.all([coursePromise, liveTutorPromise])
                    .then(() => {
                        resolve();
                    });
            });
            finalPromise.then(function () {
                console.log(cartInfo);
                return res.status(200).json({ content: cartInfo});
            });
    })
        .catch(err => {
            console.log('Error getting document', err);
        });

};
