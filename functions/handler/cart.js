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
                return res.status(200).json({"Success": "add course successfully"});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return res.status(404).json({"Error": "error"});
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
                return res.status(200).json({"Success": "delete course successfully"});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return res.status(404).json({"Error": "error"});
        });
};

/**
 * add a live tutoring request into cart
 *
 * */
exports.addLiveTutorRequestIntoCart = (req, res) => {
    let studentID = req.body.studentID;
    let currentTutorId = req.body.requestID;
    let currentUser = admin.firestore().collection("students").doc(studentID).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                let temp = doc.data().onlineTutorArrayCart;
                temp.push(currentTutorId);
                admin.firestore().collection("students").doc(studentID).update({"onlineTutorArrayCart": temp});
                return res.status(200).json({"Success": "add request successfully"});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return res.status(404).json({"Error": "error"});
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
                return res.status(200).json({"Success": "delete request successfully"});
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return res.status(404).json({"Error": "error"});
        });
};

/**
 * display cart info (including course video info & live tutoring request info)
 *
 * */
exports.displayCartInfo = async (req, res) => {
    let studentID = req.body.studentID;
    let r = await admin.firestore().collection("students").doc(studentID)
        .get()
        .then(doc => {
            if (!doc.exists) {
                console.log("No such document!");
                return "";
            } else {
                return [doc.data().courseArrayCart, doc.data().onlineTutorArrayCart];
            }
        })
        .catch(() => {
            return "";
        });
    // r[0]: courseArrayCart, r[1]: onlineTutorArrayCart
    if (r === "") {
        res.status(400).json({"Error": "error"});
        return;
    }
    let cartInfo = [];
    for (let i = 0; i < r[0].length; i++) {
        let returnedCourseDetail = await admin.firestore().collection("course").doc(r[0][i])
            .get()
            .then(doc => {
                let tem = doc.data();
                tem.id = doc.id;
                return tem;
            });
        cartInfo.push(returnedCourseDetail);
    }
    for (let i = 0; i < r[1].length; i++) {
        let returnedOnlineTutorDetail = await admin.firestore().collection("request").doc(r[1][i])
            .get()
            .then(doc => {
                let tem = doc.data();
                tem.id = doc.id;
                return tem;
            });
        cartInfo.push(returnedOnlineTutorDetail);
    }
    console.log(cartInfo);
    return res.status(200).json({ content: cartInfo});
};
/*
exports.displayCartInfo = (req, res) => {

    let studentID = req.body.studentID;
    console.log(req.body);
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

};*/

exports.moveToBought = async (req, res) => {
    let bought_course = await admin.firestore().collection("students").doc(req.body.studentID).get()
    .then((doc) =>{
        if (!doc.exists) {
            return "";
        } else {
            tmp = doc.data().courseArrayCart;
            admin.firestore().collection("students").doc(req.body.studentID).update({"courseArrayCart": []});
            return tmp;
        }
    })
    .catch(()=>{
        return "";
    });
    if (bought_course !== "") {
        let old = await admin.firestore().collection("students").doc(req.body.studentID).get()
        .then((doc)=>{
            return doc.data().courseArrayBought;
        })
        let new_bought = old.concat(bought_course);
        admin.firestore().collection("students").doc(req.body.studentID).update({"courseArrayBought": new_bought})
        .then(()=>{
            res.status(200).json({"Success": "Updated"});
        })
        .catch((err)=>{
            res.status(400).json({"Error": err.message});
        });
    } else {
        res.status(400).json({"Error": "Error"});
    }
}
