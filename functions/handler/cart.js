const admin = require('firebase-admin');
/**
 * author: Vito
 * cart module.
 * */

function validParam(id) {
    if (id === "" || typeof (id) !== typeof ("abc")) {
        return false;
    }
    return true;
}
/**
 * add a course into cart
 *
 * */
exports.addCourseIntoCart = (req, res) => {
    let studentID = req.body.studentID;
    console.log(studentID);
    if(!validParam(studentID)) {
        res.json({"Error": "Student does not exist"});
    }
    console.log(req.body.courseID);
    let currentUser = admin.firestore().collection("students").doc(studentID).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let temp = doc.data().courseArrayCart;
                temp.push(req.body.courseID);
                admin.firestore().collection("students").doc(studentID).update({"courseArrayCart": temp});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
};

/**
 * delete a course from cart
 *
 * */
exports.deleteCourseFromCart = (req, res) => {
    let studentID = req.body.studentID;
    if(!validParam(studentID)) {
        res.json({"Error": "Student does not exist"});
    }
    let currentCourseId = req.body.courseID;
    let currentUser = admin.firestore().collection("students").doc(studentID).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let temp = doc.data().courseArrayCart;
                let toBeUpdate = [];
                for (let j = 0; j < temp.length; j++) {
                    if (temp[j] === currentCourseId) {
                        continue;
                    } else {
                        toBeUpdate.push(temp[j]);
                    }
                }
                admin.firestore().collection("students").doc(studentID).update({"courseArrayCart": toBeUpdate});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
};

/**
 * add a live tutoring request into cart
 *
 * */
exports.addLiveTutorRequestIntoCart = (req, res) => {
    let studentID = req.body.studentID;
    console.log(studentID);
    let currentUser = admin.firestore().collection("students").doc(studentID).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let temp = doc.data().onlineTutorArrayCart;
                temp.push(req.body.courseID);
                admin.firestore().collection("students").doc(studentID).update({"onlineTutorArrayCart": temp});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
};

/**
 * delete a live tutoring request from cart
 *
 * */
exports.deleteLiveTutorRequestFromCart = (req, res) => {
    let studentID = req.body.studentID;
    let currentCourseId = req.body.requestID;
    let currentUser = admin.firestore().collection("students").doc(studentID).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let temp = doc.data().onlineTutorArrayCart;
                let toBeUpdate = [];
                for (let j = 0; j < temp.length; j++) {
                    if (temp[j] === currentCourseId) {
                        continue;
                    } else {
                        toBeUpdate.push(temp[j]);
                    }
                }
                admin.firestore().collection("students").doc(studentID).update({"onlineTutorArrayCart": toBeUpdate});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });


};

/**
 * display cart info (including course video info & live tutoring request info)
 *
 * */
exports.displayCartInfo = (req, res) => {

    let studentID = req.body.studentID;
    let currentUser = admin.firestore().collection("students").doc(studentID);
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
                    courseIndexArray.push(courseArrayCart[i]);
                }
                // console.log(courseIndexArray);      // e.g. courseIndexArray: [ 'courseID_1', 'courseID_20' ]
                for (let i = 0; i < liveTutorArrayCart.length; i++) {
                    liveTutorIndexArray.push(liveTutorArrayCart[i]);
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
                                let tem = doc.data();
                                tem.id = doc.id;
                                console.log(tem);
                                return tem;
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
                                let tem = doc.data();
                                tem.id = doc.id;
                                console.log(tem);
                                return tem;
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