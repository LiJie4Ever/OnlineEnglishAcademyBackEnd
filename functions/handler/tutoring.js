const admin = require('firebase-admin');
const request = require("request");

var appURL = "https://us-central1-onlineenglishacademy-eddb3.cloudfunctions.net";
const myappredirect = appURL + "/api/meeting/getToken";

// var appURL = "https://onlineenglishacademy-eddb3.firebaseapp.com";
// var myappredirect = appURL;

const zoomclientid = "A2r731ERQheN0w2huAoMng"; //Client ID for team2eola@gmail.com Zoom account
const zoomclientsec = "UYUTDviTDJrTjR6kJaewku7Kdb2JKoG8"; //Security key for team2eola@gmail.com Zoom account
let uid = "";

function validParam(id) {
    if (id == "" || typeof(id) != typeof("abc")) {
        return false;
    }
    return true
}


exports.getCode = (req, res) => {
    if (!validParam(req.body.uid)) {
        res.status(400).json({"Error": "Invalid ID"});
    }
    uid = req.body.uid;
    admin.firestore().collection('tutors').doc(req.body.uid).get()
    .then(function(doc) {
        if (doc.exists) {
            // clear old access token and refresh token
            admin.firestore().collection('tutors').doc(req.body.uid).update({"access_token": "", "refresh_token": ""});
            const zoomauth = "https://zoom.us/oauth/authorize?response_type=code&client_id=" + zoomclientid + "&redirect_uri=" + myappredirect;
            res.status(200).json({"redirect": zoomauth});
        } else {
            res.status(400).json({"Error": "User not found"});
        }
    }).catch(function(err) {
        res.status(400).json({"Error": err});
    });
};

exports.getToken = (req, res) => {
    const zoomtokenep = "https://zoom.us/oauth/token";  
	
    if (req.query.code) {
		var auth = "Basic " + new Buffer(zoomclientid + ':' +
        zoomclientsec).toString('base64');
        console.log("Auth: ", auth);
        var url = zoomtokenep + '?grant_type=authorization_code&code=' +
            req.query.code + '&redirect_uri=' + myappredirect;
	
		//ZOOM authorization token API call
		request.post({
            url: url,
            headers: {
                "Authorization": auth
            }
        }, function(error, response, body) {
            if (error) {
                console.log(error);
            }
            console.log("Body: ", body);
            if (body) {
                body = JSON.parse(body);

                if (body.access_token) {
                    accessToken = body.access_token;
                    refreshToken = body.refresh_token;
                    admin.firestore().collection('tutors').doc(uid).update({"access_token": access_token, "refresh_token": refresh_token});
                    res.status(200).json({"Success": "Tokens updated"});
                    
                } else {
                    res.status(400).json({"Error": "Could not get zoom token"});
                }
            } else {
                res.status(400).json({"Error": "Body is not found"});
            }
        });

    } else {
        res.status(400).json({"Error": "Missing auth code from Zoomn"});
    }
};
