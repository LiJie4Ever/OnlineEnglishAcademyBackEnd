const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', // TODO: sandbox or live
    'client_id': 'AcaR9gMIK191LA6hjxHuGwWFkme-bpqw3WI48K9X1NwleLLpuptifhClL6_TCHr1PAwVLlX4iblm2qRs',
    'client_secret': 'ECskqR0_7iwmiWDyTQtcT9fvK1B-2E5gouXa9E7jLgNqm2WbuZlYBKLJ4D5H6jJpbetPilJHbcyNNBjS'
});

const admin = require('firebase-admin');

exports.payment = (req, res) => {

    // get courseArrayCart & onlineTutorArrayCart from db
    let studentID = req.body.studentID;
    let currentUser = admin.firestore().collection("students").doc(studentID);
    // define totalCoursePrice & totalOnlineTutorPrice
    let totalCoursePrice = 0;
    let totalLiveTutorPrice = 0;
    let courseIndexArray = [];
    let liveTutorIndexArray = [];
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
            let tempCoursePrice = 0;
            let tempLiveTotorPrice = 0;
            let finalPrice = 0;
            let finalPromise = new Promise(resolve => {
                let coursePromise = new Promise(resolve => {
                    for (let i = 0; i < courseIndexArray.length; i++) {
                        let currentCourse = admin.firestore().collection("course").doc(courseIndexArray[i]);
                        let currentCoursePrice = currentCourse.get()
                            .then(doc => {
                                let currentPrice = parseFloat(doc.data().price);
                                return currentPrice;
                            })
                            .catch(err => {
                                console.log('Error getting document', err);
                            });
                        Promise.all([currentCoursePrice]).then(price => {
                            tempCoursePrice += parseFloat(price);
                            if (i === courseIndexArray.length - 1) {
                                resolve();
                            }
                        })
                    }
                });
                coursePromise.then(function () {
                    totalCoursePrice = tempCoursePrice;
                    //  console.log("final course price is:" + totalCoursePrice);
                });
                let liveTutorPromise = new Promise(resolve => {
                   for (let i = 0; i < liveTutorIndexArray.length; i++) {
                       let currentLiveTutor = admin.firestore().collection("request").doc(liveTutorIndexArray[i]);
                       let currentLiveTutorInfo = currentLiveTutor.get()
                           .then(doc => {
                               let currentPrice = parseFloat(doc.data().price);
                               return currentPrice;
                           })
                           .catch(err => {
                               console.log('Error getting document', err);
                           });
                       Promise.all([currentLiveTutorInfo]).then(price => {
                           tempLiveTotorPrice += parseFloat(price);
                           if (i === liveTutorIndexArray.length - 1) {
                               resolve();
                           }
                       })
                   }
                });
                liveTutorPromise.then(() => {
                   totalLiveTutorPrice = tempLiveTotorPrice;
                   //   console.log("total liveTutor price is:" + totalLiveTutorPrice);
                });
                Promise.all([coursePromise, liveTutorPromise])
                    .then(() => {
                        resolve();
                    });
            });
            finalPromise.then(function () {
                // console.log(totalCoursePrice);
                // console.log(totalLiveTutorPrice);
                finalPrice = totalCoursePrice + totalLiveTutorPrice;
                // call PayPal API
                console.log("final Price is:" + finalPrice);
                console.log("((((((((((");
                const create_payment_json = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "https://onlineenglishacademy-eddb3.web.app/classList?totalPrice=" + finalPrice,
                        "cancel_url": "https://onlineenglishacademy-eddb3.web.app/cart"
                    },
                    "transactions": [{
                        "item_list": {
                            "items": [{
                                "name": "item",
                                "sku": "item",
                                "price": finalPrice,
                                "currency": "USD",
                                "quantity": 1
                            }]
                        },
                        "amount": {
                            "currency": "USD",
                            "total": finalPrice
                        },
                        "description": "This is the payment description."
                    }]
                };

                paypal.payment.create(create_payment_json, function (error, payment) {
                    if (error) {
                        throw error;
                    } else {
                        console.log("Create Payment Response:");
                        console.log(payment);
                        for (let i = 0; i < payment.links.length; i++) {
                            if(payment.links[i].rel === 'approval_url') {
                                res.redirect(payment.links[i].href);
                            }
                        }
                    }
                });
            });
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

};

exports.paid = (req, res) => {
    const price = req.query.totalPrice;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": price
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send("success!");
        }
    });

};