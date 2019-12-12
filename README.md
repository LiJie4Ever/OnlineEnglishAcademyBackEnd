# Online English Academy Backend

## USC Fall 2019 CSCI 577A Team02

### How to get started

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

#### Other things

* Need to hide environment variables in code
* When testing locally, modify gmail info in [functions/handler/request.js](functions/handler/request.js) and [functions/handler/schedule.js](functions/handler/schedule.js). (See code comments)
* Integrate PayPal to existing checkout process
* Improve backend API speed
* Integrate video conferencing to the web app
* Integrate blog comments and course comments
* Change request confirmation workflow

### API Documentation

#### Admin

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

#### User

| Endpoint     | Description                       | Method | Prameter   | Return                                             |
| ------------ | --------------------------------- | ------ | ---------- | -------------------------------------------------- |
| /user/get    | Retrieve a user from the database | POST   | id         | Status: 200, 400; Success: message, Error: message |
| /user/modify | Modify a user in the database     | POST   | id, fields | Status: 200, 40X; Success: message, Error: message |
| /user/remove | Remove a user from the database   | POST   | id         | Status: 200, 40X; Success: message, Error: message |

#### Blog

| Endpoint           | Description                     | Method | Prameter | Return                                                |
| ------------------ | ------------------------------- | ------ | -------- | ----------------------------------------------------- |
| /blog/comments     | Retrieve the comments of a blog | POST   | blog_id  | Status: 200, 400; Comment data, Error: message        |
| /blog/post_comment | Post a comment to a blog        | POST   | fields   | Status: 200, 40X; Success: comment id, Error: message |

#### Cart

| Endpoint            | Description                                      | Method | Prameter       | Return |
| ------------------- | ----------- | ------ | -------- | ------ |
| /cart               |  display cart info                               |  POST  |  id            |  Status: 200, 400; Success: message, Error: message  |
| /cart/course/add    |  add a course into cart                          |  POST  |  id, courseID  |  Status: 200, 400; Success: message, Error: message  |
| /cart/course/delete |  delete a course from cart                       |  POST  |  id, courseID  |  Status: 200, 400; Success: message, Error: message  |
| /cart/tutor/add     |  add a live tutoring request into cart           |  POST  |  id, requestID |  Status: 200, 400; Success: message, Error: message  |
| /cart/tutor/delete  |  delete a live tutoring request from cart        |  POST  |  id, requestID |  Status: 200, 400; Success: message, Error: message  |
| /cart/update_bought |  move items intoto bought table after checkout   |  POST  |  id            |  Status: 200, 400; Success: message, Error: message  |

#### Pay

| Endpoint   | Description                              | Method | Prameter                         | Return |
| ---------- | ---------------------------------------- | ------ | -------------------------------- | ------ |
| /pay       | call PayPal API, create transaction      |  POST  |  id                              |  Status: 200, 400; Success: message, Error: message  |
| /classList | make the payment, complete transaction   |  GET   |  TotalPrice, PayerID, paymentId  |  Status: 200, 400; Success: message, Error: message  |

#### Request

| Endpoint             | Description                               | Method| Prameter          | Return |
| -------------------- | ----------------------------------------- | ----- | ----------------- | ------ |
| /request/getList     | get entire request list data              |  GET  |  none             |  Status: 200, 400; Success: Request list, Error: message |
| /request/create      | create a request                          |  POST |  request fields   |  Status: 200, 400; Success: id, Error: message        |
| /request/setPrice    | set the price of a request                |  POST |  request id, price|  Status: 200, 400; Success: message, Error: message |
| /request/confirm     | set the status of a request to "confirmed"|  POST |  request id       |  Status: 200, 400; Success: message, Error: message |
| /request/sendConfirm | send confirmation email to user           |  POST |  user id          |  Status: 200, 400; Success: message, Error: message |
| /request/cancel      | remove a request                          |  POST |  request id       |  Status: 200, 400; Success: message, Error: message |
| /request/setStatus   | set the status of a request to "paid"     |  POST |  request id       |  Status: 200, 400; Success: message, Error: message |


#### Schedule

| Endpoint                   | Description | Method | Prameter | Return |
| -------------------------- | --------------------------------------- | ----- | ------------ | ------------------------------------------------------------ |
| /schedule/getList          | get entire schedule list data           |  GET  |  none        |  Status: 200, 400; Success: Schedule list, Error: message |
| /schedule/getStu           | get schedule list data of a student user|  GET  |  student id  |  Status: 200, 400; Success: Schedule list, Error: message |
| /schedule/getTu            | get schedule list data of a tutor user  |  GET  |  tutor id    |  Status: 200, 400; Success: Schedule list, Error: message |   
| /schedule/delete           | remove a schedule                       |  POST |  schedule id |  Status: 200, 400; Success: message, Error: message       |
| /schedule/add              | create a schedule                       |  POST |schedule field|  Status: 200, 400; Success: schedule id, Error: message       |
| /schedule/history          | get schedule list data of a user        |  GET  |  user id     |  Status: 200, 400; Success: Schedule list, Error: message |
| /schedule/sendConfirmation | send confirmation email to user         |  POST |  user id     |  Status: 200, 400; Success: message, Error: message       |
| /schedule/setScheduleLink  | set the link to a schedule              |  POST |  schedule id |  Status: 200, 400; Success: message, Error: message       |
