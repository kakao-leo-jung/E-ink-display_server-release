var express = require('express');
var router = express.Router();
var calendar_call = require('../utill/calendar_call');
var authentication = require('../auth/authentication');

/* TODO: Author : 정근화 */
/* /calendarList */

/**

    @api {get} /calendarList GetCalendarLists
    @apiName GetCalendarLists
    @apiGroup CalendarList
    @apiDescription
    해당 계정이 보유한 캘린더 리스트의 종류를 가져옵니다.</br>

    _id 값을 통해 어떠한 캘린더의 정보를 CRUD 할 것인지 다른 api 호출을 쿼리스트링으로 지정할 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {null} No Parameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter    

    @apiSuccess {String}  _id           각 캘린더 종류의 고유 id 값을 나타냅니다</br>
                                        캘린더 이벤트의 CRUD api 를 호출할 때 ?calendarId=_id 로 </br>
                                        어떤 캘린더의 이벤트를 조작할 것인지 선택할 수 있습니다.
    @apiSuccess {String}  summary       해당 캘린더의 제목
    @apiSuccess {String}  description   해당 캘린더의 설명
    @apiSuccess {String}  timeZone      해당 캘린더의 타임존 - IANA Timezone database 형식을 따릅니다.
    @apiSuccess {Boolean} primary       계정의 기본 캘린더를 의미합니다.</br>
                                        다른 api 를 호출할때 쿼리스트링을 지정하지 않으면 </br>
                                        primary=true 로 지정된 캘린더 id 가 자동으로 지정됩니다. </br>
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    [
        {
            "_id": "l8162nkuj54205lks5fmkotqtk@group.calendar.google.com",
            "summary": "Us",
            "description": "ㅇ",
            "timeZone": "Asia/Seoul"
        },
        {
            "_id": "dfjung4254@gmail.com",
            "summary": "dfjung4254@gmail.com",
            "timeZone": "Asia/Seoul",
            "primary": true
        },
        {
            "_id": "addressbook#contacts@group.v.calendar.google.com",
            "summary": "Contacts",
            "timeZone": "Asia/Seoul"
        },
        {
            "_id": "ko.south_korea#holiday@group.v.calendar.google.com",
            "summary": "대한민국의 휴일",
            "timeZone": "Asia/Seoul"
        }
    ]

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError FAILED_GOOGLE Google API 를 호출하는데 실패하였습니다.

    @apiErrorExample 실패 : NO_JWT
    HTTP/1.1 401 Unauthorized
    {
        "name" : "NO_JWT",
        "message": "Please put JWT in your request header!",
        "status": 401
    }
    @apiErrorExample 실패 : INAVLID_JWT
    HTTP/1.1 401 Unauthorized
    {
        "name" : "INVALID_JWT",
        "message": "Your JWT is invalid!",
        "status": 401
    }
    @apiErrorExample 실패 : NOUSER_DB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "NOUSER_DB",
        "message": "Cannot find userId in database!",
        "status": 500
    }
    @apiErrorExample 실패 : FAILED_GOOGLE
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "FAILED_GOOGLE",
        "message": "Failed to GET google calendar api!",
        "status": 500
    }

*/
router.get('/', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        var authInfo = await authentication.getAuthCode(decoded.userId);
        var authClient = authInfo.oAuth2Client;
        var resObj = await calendar_call.listCalendars(authClient);

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/* POST /calendarList/ */
/*

    FIXME: 이거 apidoc 작성할 것.
    request body
    -> summary, description, timeZone(IANA database)

*/
router.post('/', async (req, res, next) => {

    try{
        var decoded = authentication.verifyJwt(req);

        var authInfo = await authentication.getAuthCode(decoded.userId);
        var authClient = authInfo.oAuth2Client;
        var resObj = await calendar_call.addCalendarList(authClient, req.body);

        next(resObj);

    }catch(err){
        next(err);
    } 

});

module.exports = router;