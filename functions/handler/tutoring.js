const admin = require('firebase-admin');

var appURL = "https://onlineenglishacademy-eddb3.firebaseapp.com";
const myappredirect = appURL + "/meetings/getToken";

let zoomclientid = "";
let zoomclientsec = "";

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

    admin.firestore().collection('tutors').doc(req.body.uid).get()
    .then(function(doc) {
        if (doc.exists) {
            zoomclientsecret = doc.data()['zoomclientsecret'];
            zoomclientid = doc.data()['zoomclientid'];
            const myappredirect = appURL + "/meeting/getToken"; 
            const zoomauth = "https://zoom.us/oauth/authorize" + "?response_type=code&client_id=" + zoomclientid + "&redirect_uri=" + myappredirect;         
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
                console.log("Error when getting Zoom token: " + error);
                return;
            }
            body = JSON.parse(body);

            if (body.access_token) {
                accessToken = body.access_token;
				refreshToken = body.refresh_token;
				console.log("Access Token: " + accessToken);
                // Process and securely store these tokens here- TO BE IMPLEMENTED
				res.redirect("/tutorClassroom"); 
				
            } else {
                console.log("FATAL - could not get zoom token");
            }
            return;
        });

    } else {
        console.log("Missing auth code from Zoom");
    }
};
