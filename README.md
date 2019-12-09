# Online English Academy Backend

### USC Fall 2019 CSCI 577A Team02

#### How to get started

1. Clone this repository

    ```bash
    git clone https://github.com/LiJie4Ever/OnlineEnglishAcademyBackEnd.git
    ```

2. Navigate to the repository folder

    ```bash
    cd OnlineEnglishAcademyBackEnd
    ```

3. Install dependencies

    ```bash
    npm install
    ```

4. Local testing

    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS=functions/service-account-file.json
    firebase serve
    ```

5. Deploy to Firebase

    ```bash
    firebase deploy
    ```

    Function logs can be viewed in Firebase Console -> Functions -> Logs

##### Other things

* Need to hide environment variables in code
* When testing locally, modify gmail info in [functions/handler/request.js](functions/handler/request.js) and [functions/handler/schedule.js](functions/handler/schedule.js). (See code comments)
* Integrate PayPal to existing checkout process
* Improve backend API speed
* Integrate video conferencing to the web app
