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
* Integrate blog comments and course comments
* Change request confirmation workflow

#### API Documentation

**Admin**

| Endpoint       | Description                                                     | Method | Prameter   | Return                                               |
| -------------- | --------------------------------------------------------------- | ------ | ---------- | ---------------------------------------------------- |
| /tutor/add     | Add a tutor to the database                                     | POST   | fields     | Status: 200, 400; Success: tutor id, Error: message  |
| /tutor/modify  | Modify a tutor in the database                                  | POST   | id, fields | Status: 200, 40X; Success: message, Error: message   |
| /tutor/remove  | Remove a tutor from the database                                | POST   | id         | Status: 200, 40X; Success: message, Error: message   |
| /student/get   | Retrieve a student from the database                            | GET    | id         | Status: 200, 40X; Success: message, Error: message   |
| /blog/add      | Add a blog to the database                                      | POST   | fields     | Status: 200, 40x; Success: blog id, Error: message   |
| /blog/modify   | Modify a blog in the database                                   | POST   | id, fields | Status: 200, 40x; Success: message, Error: message   |
| /blog/remove   | Remove a blog from the database                                 | POST   | id         | Status: 200, 40x; Success: message, Error: message   |
| /course/add    | Add a course to the database                                    | POST   | fields     | Status: 200, 400; Success: course id, Error: message |
| /course/modify | Modify a course in the database                                 | POST   | id, fields | Status: 200, 40x; Success: message, Error: message   |
| /course/remove | Remove a course from the database                               | POST   | id         | Status: 200, 40x; Success: message, Error: message   |
| /lesson/get    | Retrieve a lesson from the database                             | POST   | id         | Status: 200, 40x; Success: message, Error: message   |
| /lesson/add    | Add a lesson to the database, and its course's lesson list      | POST   | fields     | Status: 200, 400; Success: message, Error: message   |
| /lesson/modify | Modify a lesson in the database                                 | POST   | id, fields | Status: 200, 40x; Success: message, Error: message   |
| /lesson/remove | Remove a lesson from the database, and its course's lesson list | POST   | id         | Status: 200, 40x; Success: message, Error: message   |

**User**

| Endpoint     | Description                       | Method | Prameter   | Return                                             |
| ------------ | --------------------------------- | ------ | ---------- | -------------------------------------------------- |
| /user/get    | Retrieve a user from the database | POST   | id         | Status: 200, 400; Success: message, Error: message |
| /user/modify | Modify a user in the database     | POST   | id, fields | Status: 200, 40X; Success: message, Error: message |
| /user/remove | Remove a user from the database   | POST   | id         | Status: 200, 40X; Success: message, Error: message |

**Blog**

| Endpoint           | Description                     | Method | Prameter | Return                                                |
| ------------------ | ------------------------------- | ------ | -------- | ----------------------------------------------------- |
| /blog/comments     | Retrieve the comments of a blog | POST   | blog_id  | Status: 200, 400; Comment data, Error: message        |
| /blog/post_comment | Post a comment to a blog        | POST   | fields   | Status: 200, 40X; Success: comment id, Error: message |

**Cart**

| Endpoint            | Description | Method | Prameter | Return |
| ------------------- | ----------- | ------ | -------- | ------ |
| /cart               |             |        |          |        |
| /cart/course/add    |             |        |          |        |
| /cart/course/delete |             |        |          |        |
| /cart/tutor/add     |             |        |          |        |
| /cart/tutor/delete  |             |        |          |        |
| /cart/update_bought |             |        |          |        |

**Pay**

| Endpoint   | Description | Method | Prameter | Return |
| ---------- | ----------- | ------ | -------- | ------ |
| /pay       |             |        |          |        |
| /classList |             |        |          |        |

**Request**

| Endpoint             | Description | Method | Prameter | Return |
| -------------------- | ----------- | ------ | -------- | ------ |
| /request/getList     |             |        |          |        |
| /request/create      |             |        |          |        |
| /request/setPrice    |             |        |          |        |
| /request/confirm     |             |        |          |        |
| /request/sendConfirm |             |        |          |        |
| /request/cancel      |             |        |          |        |
| /request/setStatus   |             |        |          |        |

**Schedule**

| Endpoint                   | Description | Method | Prameter | Return |
| -------------------------- | ----------- | ------ | -------- | ------ |
| /schedule/getList          |             |        |          |        |
| /schedule/getStu           |             |        |          |        |
| /schedule/getTu            |             |        |          |        |
| /schedule/delete           |             |        |          |        |
| /schedule/add              |             |        |          |        |
| /schedule/history          |             |        |          |        |
| /schedule/sendConfirmation |             |        |          |        |
| /schedule/setScheduleLink  |             |        |          |        |
