var express = require('express');
var User = require('../model/user');
var authentication = require('../auth/authentication');
var errorSet = require('../utill/errorSet');
var router = express.Router();

/* TODO: Author : 정근화 */
/* /users */

/**

    @api {get} /users GetUserInfo
    @apiName GetUser
    @apiGroup User
    @apiDescription
    헤더에 JWT 를 실어 /users 로 GET 요청을 해주세요.</br>
    서버는 해당 JWT를 통해 현재 구글 로그인된 계정의 개인정보를 반환합니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {null} No Parameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter

    @apiSuccess {String} userId      유저 고유 번호 값(구글)
    @apiSuccess {String} email       유저 이메일 값
    @apiSuccess {String} name        유저 풀네임
    @apiSuccess {String} picture     유저 구글 사진 URL
    @apiSuccess {String} given_name  유저 이름
    @apiSuccess {String} family_name 유저 이름(성)
    @apiSuccess {String} locale      유저 지역 정보
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "userId": "100828347037604660700",
        "email": "dfjung4254@gmail.com",
        "name": "KH J",
        "picture": "https://lh4.googleusercontent.com/-3WsHZ5SaYco/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reBRCZFXpXnux85nyxUAdlQxv6rVw/s96-c/photo.jpg",
        "given_name": "KH",
        "family_name": "J",
        "locale": "ko"
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.

    @apiErrorExample 실패 : NO_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Please put JWT in your request header!",
        "status": 401
    }
    @apiErrorExample 실패 : INAVLID_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Your JWT is invalid!",
        "status": 401
    }
    @apiErrorExample 실패 : NOUSER_DB
    HTTP/1.1 500 Internal Server Error
    {
        "message": "Cannot find userId in database!",
        "status": 500
    }

*/
router.get('/', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        var resultUser = await User.findOne({
            userId: decoded.userId
        }).catch(err => {
            throw (errorSet.createError(errorSet.es.NOUSER_DB, err.stack));
        });

        var retObj = {
            userId: resultUser.userId,
            email: resultUser.email,
            name: resultUser.name,
            picture: resultUser.picture,
            given_name: resultUser.given_name,
            family_name: resultUser.family_name,
            locale: resultUser.locale
        };
        next(retObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {post} /users/fcm UpdateUserFcm
    @apiName UpdateUserFcm
    @apiGroup User
    @apiDescription
    안드로이드 기기 등록 </br>
    해당 api 를 통해 안드로이드 Firebase SDK 를 통해 얻은 기기 토큰을 서버에 저장합니다.</br>
    해당 기기의 토큰이 저장 또는 업데이트 되면 해당 기기로 알람이나 투약 푸시가 전송됩니다.</br>
    로그인 후, 또는 기기 토큰이 변경되었을 때 업데이트 해주세요</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam (Body) {String} fcm_token FCM을 위한 기기의 고유 토큰
    @apiParamExample {json} 파라미터(body) 예제
    {
        "fcm_token": "cyejeyJfaWQiOiI1ZDUxODRjMWU5ZDM..."
    }

    @apiSuccess {String} userId      유저 고유 번호 값(구글)
    @apiSuccess {String} email       유저 이메일 값
    @apiSuccess {String} name        유저 풀네임
    @apiSuccess {String} picture     유저 구글 사진 URL
    @apiSuccess {String} given_name  유저 이름
    @apiSuccess {String} family_name 유저 이름(성)
    @apiSuccess {String} locale      유저 지역 정보
    @apiSuccess {String} fcm_token   유저 현재 기기 토큰 값
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "userId": "100828347037604660700",
        "email": "dfjung4254@gmail.com",
        "name": "KH J",
        "picture": "https://lh4.googleusercontent.com/-3WsHZ5SaYco/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reBRCZFXpXnux85nyxUAdlQxv6rVw/s96-c/photo.jpg",
        "given_name": "KH",
        "family_name": "J",
        "locale": "ko",
        "fcm_token": "cyejeyJfaWQiOiI1ZDUxODRjMWU5ZDM..."
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.

    @apiErrorExample 실패 : NO_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Please put JWT in your request header!",
        "status": 401
    }
    @apiErrorExample 실패 : INAVLID_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Your JWT is invalid!",
        "status": 401
    }
    @apiErrorExample 실패 : NOUSER_DB
    HTTP/1.1 500 Internal Server Error
    {
        "message": "Cannot find userId in database!",
        "status": 500
    }
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your Todo in database!",
        "status": 400
    }

*/
router.post('/fcm', async (req, res, next) => {

    try {

        var decoded = await authentication.verifyJwt(req);

        var resultUser = await User.findOneAndUpdate({
                userId: decoded.userId
            }, {
                fcm_token: req.body.fcm_token
            }, {
                new: true
            })
            .catch(err => {
                throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
            });

        var retObj = {
            userId: resultUser.userId,
            email: resultUser.email,
            name: resultUser.name,
            picture: resultUser.picture,
            given_name: resultUser.given_name,
            family_name: resultUser.family_name,
            locale: resultUser.locale,
            fcm_token: resultUser.fcm_token
        };

        next(retObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {delete} /users/fcm DeleteUserFcm
    @apiName DeleteUserFcm
    @apiGroup User
    @apiDescription
    서버에 저장된 해당 계정의 안드로이드 기기 FCM 토큰을 삭제합니다.</br>
    더 이상 해당 기기로 알람이나 투약이 전송되지 않습니다.</br>
    로그아웃 후, 알람, 투약 수신의 일괄 on/off 설정기능이 있다면 해당 api 를 통해 off 시킬 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {null} No Parameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter

    @apiSuccess {String} userId      유저 고유 번호 값(구글)
    @apiSuccess {String} email       유저 이메일 값
    @apiSuccess {String} name        유저 풀네임
    @apiSuccess {String} picture     유저 구글 사진 URL
    @apiSuccess {String} given_name  유저 이름
    @apiSuccess {String} family_name 유저 이름(성)
    @apiSuccess {String} locale      유저 지역 정보
    @apiSuccess {String} fcm_token   유저 현재 기기 토큰 값
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "userId": "100828347037604660700",
        "email": "dfjung4254@gmail.com",
        "name": "KH J",
        "picture": "https://lh4.googleusercontent.com/-3WsHZ5SaYco/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reBRCZFXpXnux85nyxUAdlQxv6rVw/s96-c/photo.jpg",
        "given_name": "KH",
        "family_name": "J",
        "locale": "ko",
        // fcm_token 값이 사라진 것을 확인 할 수 있음.
        "fcm_token": ""
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.

    @apiErrorExample 실패 : NO_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Please put JWT in your request header!",
        "status": 401
    }
    @apiErrorExample 실패 : INAVLID_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Your JWT is invalid!",
        "status": 401
    }
    @apiErrorExample 실패 : NOUSER_DB
    HTTP/1.1 500 Internal Server Error
    {
        "message": "Cannot find userId in database!",
        "status": 500
    }
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your Todo in database!",
        "status": 400
    }

*/
router.delete('/fcm', async (req, res, next) => {

    try {

        var decoded = await authentication.verifyJwt(req);

        var resultUser = await User.findOneAndUpdate({
            userId: decoded.userId
        }, {
            fcm_token: ""
        }, {
            new: true
        }).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var retObj = {
            userId: resultUser.userId,
            email: resultUser.email,
            name: resultUser.name,
            picture: resultUser.picture,
            given_name: resultUser.given_name,
            family_name: resultUser.family_name,
            locale: resultUser.locale,
            fcm_token: resultUser.fcm_token
        };

        next(retObj);

    } catch (err) {
        next(err);
    }

})

module.exports = router;