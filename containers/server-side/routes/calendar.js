var express = require('express');
var calendar_call = require('../utill/calendar_call');
var authentication = require('../auth/authentication');
var errorSet = require('../utill/errorSet');
var router = express.Router();

/* TODO: Author : 정근화 */
/* /calendar */

/**

    @api {get} /calendar/next/:nextCount?calendarId=:calendarId GetNextEvents
    @apiName GetNextLists
    @apiGroup Calendar
    @apiDescription
    현재 시간으로부터 다음 :nextCount 개의 일정을 가져옵니다.</br>
    달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br>
    JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br>
    post 로 들어온 유저의 JWT 값을 인증하고</br>
    userId 값으로 DB를 조회하여 googleToken을 조회한 후</br>
    구글 Calendar api 를 호출한다.</br>
    다음 primary calendar의 다음 10일 일정을 받아서</br>
    반환한다.</br></br>
    ** 10일 이 아닐 경우 body 에 nextCount : 12 이런식으로</br>
    불러올 리스트의 개수를 parameter로 넣어서 호출한다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam (params) {Number}        :nextCount   URL에 가져올 일정의 최대 개수를 적습니다.(Max 2500)
    @apiParam (query string) {String}  :calendarId  불러올 캘린더의 id 를 적습니다. (기본 : primary)
    @apiParamExample {path} 파라미터(url) 예제
    http://169.56.98.117/calendar/next/5?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com

    @apiSuccess {String}  _id                       현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.
    @apiSuccess {Number}  day                       몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.
    @apiSuccess {String}  title                     일정의 제목
    @apiSuccess {String}  memo                      일정의 메모, 내용
    @apiSuccess {Date}    startTime                 일정의 시작 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {Date}    endTime                   일정의 종료 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {String}  location                  일정의 장소
    @apiSuccess {People[]}people                    이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br>
                                                    기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br>
                                                    만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br>
                                                    자신의 계정에서도 해당 일정이 GET 됩니다.
    @apiSuccess {String}  people-email              참여자의 이메일을 나타냅니다.</br>
                                                    일정을 등록할 때 참여자의 email 정보는 필수입니다.
    @apiSuccess {Boolean} people-self               참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.
    @apiSuccess {String}  people-organizer          이 일정을 생성한 사람입니다. </br>
                                                    생성한 사람의 정보에만 organizer : true 가 표시됩니다.
    @apiSuccess {String}  people-responseStatus     해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br>
                                                    needsAction : 아직 응답 안함</br>
                                                    declined : 일정 거절됨</br>
                                                    accepted : 일정 수락함</br>
                                                    tentative : 일정 잠정적 수</br>락
                                                    이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br>
                                                    만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    [
        // List<Calendar> 형태로 바로 Calendar의 배열 형태로 응답합니다.
        // 현재 이 Calendar 객체는 10월 15일의 일정이며
        // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)
        // 아직 조회한 본인은 이 일정에 대해 수락도 거절도 하지 않았습니다.
        // 이 일정을 처음 만들고 초대한 사람은 thals_7@naver.com 입니다(organizer:true 확인)
        {
            "_id": "0sbudc844ukmn2eg8csfstnkvf",
            "day": 15,
            "title": "참여자기능테스트",
            "memo": "충정로에서 참여자기능을 테스트한다.",
            "startTime": "2019-10-15",
            "endTime": "2019-10-16",
            "location": "충정로역, 대한민국 서울특별시 중림동",
            "people":
            [
                {
                    "email": "dfjung4254@gmail.com",
                    "self": true,
                    "responseStatus": "needsAction"
                },
                {
                    "email": "zohizohi@naver.com",
                    "responseStatus": "needsAction"
                },
                {
                    "email": "thals_7@naver.com",
                    "organizer": true,
                    "responseStatus": "accepted"
                }
            ]
        },
        {"_id": "5i5em46bmqeecm644dhnkf31t4", "day": 16, "title": "", "memo": "",…},
        {"_id": "9jthsj3ueleqirjm3ita1e2ja8", "day": 17, "title": "초대하기 완성", "memo": "내용이 추가된다",…},
        {"_id": "n79l2km1du62q1ml8ifbqd7bpo", "day": 20, "title": "최종 달력 추가?", "memo": "내용이 추가된다",…},
        {"_id": "tnqgdoqmona5uu41vap5j81nok", "day": 21, "title": "최종 달력 추가1111?", "memo": "내용이 추가된다",…}
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
router.get('/next/:nextCount', async (req, res, next) => {

    try {

        /* 요청에서 jwt 를 추출한 다음 veryfy 및 decoding 한다. */
        var decoded = authentication.verifyJwt(req);

        /* 달력의 일정리스트 호출 개수의 디폴트값은 10이다. */
        var maxCount = req.params.nextCount;

        var calendarId = req.query.calendarId;
        if(!calendarId) calendarId = 'primary';

        /*

            userId 값을 통해 db의 AuthCode 값을 조회한다.
            authCode 조회 성공 후 인증된 auth클라이언트를 이용해
            원하는 함수를 호출한다. (listEvents 실행)

        */
        var authInfo = await authentication.getAuthCode(decoded.userId);
        var authClient = authInfo.oAuth2Client;
        var resObj = await calendar_call.listEvents(authClient, calendarId, new Date(), null, maxCount);

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {get} /calendar/certainday/:year/:month/:day?calendarId=:calendarId GetCertainDay
    @apiName GetCertainDay
    @apiGroup Calendar
    @apiDescription
    요청받은 년(yyyy), 월(mm), 일(dd) 에 따라 해당 일에 등록된 일정들을 리턴합니다</br>
    달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br>
    JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br>
    요청 들어온 유저의 JWT 값을 인증하고</br>
    userId 값으로 DB를 조회하여 googleToken을 조회한다.</br></br>

     - yyyy (4자리 int)</br>
     - m or mm (1 또는 2자리 int)</br>
     - d or dd (1 또는 2자리 int)</br></br>

    또한 요청 body 의 값을 통해 특정 년, 월, 일을 추출한다.</br></br>

    구글 Calendar api 를 호출한다.</br>
    해당 년, 월, 일의 제목과 내용을 호출하여 반환한다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam (params)       {Number}  :year        URL에 가져올 일정의 날짜의 년도를 적습니다. (yyyy)
    @apiParam (params)       {Number}  :month       URL에 가져올 일정의 날짜의 월을 적습니다. (m 또는 mm)
    @apiParam (params)       {Number}  :day         URL에 가져올 일정의 날짜의 일을 적습니다. (d 또는 dd)
    @apiParam (query string) {String}  :calendarId  불러올 캘린더의 id 를 적습니다. (기본 : primary)
    @apiParamExample {path} 파라미터(url) 예제
    http://169.56.98.117/calendar/certainday/2019/8/29?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com

    @apiSuccess {String}  _id                       현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.
    @apiSuccess {Number}  day                       몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.
    @apiSuccess {String}  title                     일정의 제목
    @apiSuccess {String}  memo                      일정의 메모, 내용
    @apiSuccess {Date}    startTime                 일정의 시작 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {Date}    endTime                   일정의 종료 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {String}  location                  일정의 장소
    @apiSuccess {People[]}people                    이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br>
                                                    기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br>
                                                    만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br>
                                                    자신의 계정에서도 해당 일정이 GET 됩니다.
    @apiSuccess {String}  people-email              참여자의 이메일을 나타냅니다.</br>
                                                    일정을 등록할 때 참여자의 email 정보는 필수입니다.
    @apiSuccess {Boolean} people-self               참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.
    @apiSuccess {String}  people-organizer          이 일정을 생성한 사람입니다. </br>
                                                    생성한 사람의 정보에만 organizer : true 가 표시됩니다.
    @apiSuccess {String}  people-responseStatus     해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br>
                                                    needsAction : 아직 응답 안함</br>
                                                    declined : 일정 거절됨</br>
                                                    accepted : 일정 수락함</br>
                                                    tentative : 일정 잠정적 수</br>락
                                                    이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br>
                                                    만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    [
        // 2019년 8월 29 일의 일정들이 Array 형태로 리턴됩니다.
        {
            "_id": "0qs3g68igdd8gmnddri9hhk171",
            "day": 29,
            "title": "코딩테스트 공부",
            "memo": "",
            "startTime": "2019-08-29",
            "endTime": "2019-08-30",
            "location": "",
            "people":[]
        },
        {
            "_id": "49n80mkp9he93ftr9vt532g0tq",
            "day": 29,
            "title": "혼자 공부하기 ㅋ",
            "memo": "",
            "startTime": "2019-08-29",
            "endTime": "2019-08-30",
            "location": "",
            "people":[]
        },
        {
            "_id": "5ac3ec1rvfnsft12cjm1sa3pmu",
            "day": 29,
            "title": "네이버 오픈클래스 1시",
            "memo": "",
            "startTime": "2019-08-29T17:00:00+09:00",
            "endTime": "2019-08-29T18:00:00+09:00",
            "location": "",
            "people":[]
        }
    ]

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError FAILED_GOOGLE Google API 를 호출하는데 실패하였습니다.
    @apiError INVALID_DATE URL Path 에서 요청한 날짜가 유효하지 않습니다.

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
    @apiErrorExample 실패 : INVALID_DATE
    HTTP/1.1 400 Bad Request
    {
        "name" : "FAILED_GOOGLE",
        "message": "You input invalid date, check url parameter again!",
        "status": 400
    }

*/
router.get('/certainday/:year/:month/:day', async (req, res, next) => {

    try {

        var decoded = authentication.verifyJwt(req);

        var _year = req.params.year;
        var _month = req.params.month;
        var _day = req.params.day;

        var calendarId = req.query.calendarId;
        if(!calendarId) calendarId = 'primary';

        /* 날짜 유효성 검사 */
        if (_month > 12 || _month < 1 || _day > 31 || _day < 1) {
            throw (errorSet.createError(errorSet.es.INVALID_DATE, new Error().stack));
        }

        /* 시간 설정 */
        var _minDate = new Date(_year, _month - 1, _day, 0, 0, 0);
        var _maxDate = new Date(_year, _month - 1, _day, 24, 0, 0);

        var authInfo = await authentication.getAuthCode(decoded.userId);
        var authClient = authInfo.oAuth2Client;
        var resObj = await calendar_call.listEvents(authClient, calendarId, _minDate, _maxDate, null);

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {get} /calendar/certainmonth/:year/:month?calendarId=:calendarId GetCertainMonth
    @apiName GetCertainMonth
    @apiGroup Calendar
    @apiDescription
    요청받은 년(yyyy), 월(mm) 따라 해당 월에 등록된 모든 일정들을 리턴합니다</br>
    달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br>
    JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br></br>

    사용자의 달력의 해당 년,월에 해당하는 한달 짜리 달력 이벤트 객체를 반환한다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam (params)       {Number}  :year        URL에 가져올 일정의 날짜의 년도를 적습니다. (yyyy)
    @apiParam (params)       {Number}  :month       URL에 가져올 일정의 날짜의 월을 적습니다. (m 또는 mm)
    @apiParam (query string) {String}  :calendarId  불러올 캘린더의 id 를 적습니다. (기본 : primary)
    @apiParamExample {path} 파라미터(url) 예제
    http://169.56.98.117/calendar/certainmonth/2019/8?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com

    @apiSuccess {String}  _id                       현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.
    @apiSuccess {Number}  day                       몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.
    @apiSuccess {String}  title                     일정의 제목
    @apiSuccess {String}  memo                      일정의 메모, 내용
    @apiSuccess {Date}    startTime                 일정의 시작 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {Date}    endTime                   일정의 종료 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {String}  location                  일정의 장소
    @apiSuccess {People[]}people                    이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br>
                                                    기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br>
                                                    만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br>
                                                    자신의 계정에서도 해당 일정이 GET 됩니다.
    @apiSuccess {String}  people-email              참여자의 이메일을 나타냅니다.</br>
                                                    일정을 등록할 때 참여자의 email 정보는 필수입니다.
    @apiSuccess {Boolean} people-self               참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.
    @apiSuccess {String}  people-organizer          이 일정을 생성한 사람입니다. </br>
                                                    생성한 사람의 정보에만 organizer : true 가 표시됩니다.
    @apiSuccess {String}  people-responseStatus     해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br>
                                                    needsAction : 아직 응답 안함</br>
                                                    declined : 일정 거절됨</br>
                                                    accepted : 일정 수락함</br>
                                                    tentative : 일정 잠정적 수</br>락
                                                    이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br>
                                                    만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    [
        // List<Calendar> 형태로 바로 Calendar의 배열 형태로 응답합니다.
        // 현재 이 Calendar 객체는 8월 1일의 일정이며
        // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)
        // 아직 조회한 본인은 이 일정에 대해 수락도 거절도 하지 않았습니다.
        // 이 일정을 처음 만들고 초대한 사람은 thals_7@naver.com 입니다(organizer:true 확인)
        {
            "_id": "32imkacocdposb9lqhndghihs7",
            "day": 1,
            "title": "엣지테스트 8월 1일",
            "memo": "",
            "startTime": "2019-08-01",
            "endTime": "2019-08-02",
            "location": "",
            "people":
            [
                {
                    "email": "dfjung4254@gmail.com",
                    "self": true,
                    "responseStatus": "needsAction"
                },
                {
                    "email": "zohizohi@naver.com",
                    "responseStatus": "needsAction"
                },
                {
                    "email": "thals_7@naver.com",
                    "organizer": true,
                    "responseStatus": "accepted"
                }
            ]
        },
        {"_id": "5o7s20cg1urrkhbercs74jn1i3", "day": 13, "title": "SK 회식있음", "memo": "",…},
        {"_id": "hasarvvng5nblt34pt6f7soo10", "day": 13, "title": "새로운 달력추가 테스트", "memo": "내용이 추가된다",…},
        {"_id": "578om28da3n7mb7omnn4a497as", "day": 14, "title": "SK 인턴 프로젝트 스터디", "memo": "",…},
        {"_id": "66rlqqjq460vq4noslke5kvlvs", "day": 15, "title": "SK 인턴 프로젝트 마무리", "memo": "",…},
        {"_id": "5496736sul96hfnj1vu75hff76", "day": 17, "title": "구글", "memo": "",…},
        {"_id": "jgak5v3ft7m7gismh8ei19sfm0", "day": 24, "title": "새로운 일정임 ㅋ", "memo": "",…},
        {"_id": "3et0gc1kv1u7fafdt22kh47unc", "day": 25, "title": "오늘은 노는날", "memo": "",…},
        {"_id": "40ltp06usjbq7i4k3g5ikilmph", "day": 28, "title": "청각장애졸업프로젝트HereHear", "memo": "",…},
        {"_id": "0qs3g68igdd8gmnddri9hhk171", "day": 29, "title": "코딩테스트 공부", "memo": "",…},
        {"_id": "49n80mkp9he93ftr9vt532g0tq", "day": 29, "title": "혼자 공부하기 ㅋ", "memo": "",…},
        {"_id": "5ac3ec1rvfnsft12cjm1sa3pmu", "day": 29, "title": "네이버 오픈클래스 1시", "memo": "",…},
        {"_id": "7dmtil6117eb01avsv5ev51rkd", "day": 31, "title": "엣지테스트 8월 31일", "memo": "",…},
        {"_id": "363cb88pk7i3evn2tbi3esdocf", "day": 31, "title": "오늘은 열심히 노는날 ㅋ", "memo": "",…}
    ]

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError FAILED_GOOGLE Google API 를 호출하는데 실패하였습니다.
    @apiError INVALID_DATE URL Path 에서 요청한 날짜가 유효하지 않습니다.

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
    @apiErrorExample 실패 : INVALID_DATE
    HTTP/1.1 400 Bad Request
    {
        "name" : "FAILED_GOOGLE",
        "message": "You input invalid date, check url parameter again!",
        "status": 400
    }

*/
router.get('/certainmonth/:year/:month', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);
        var _year = req.params.year;
        var _month = req.params.month;

        var calendarId = req.query.calendarId;
        if(!calendarId) calendarId = 'primary';

        if (_month > 12 || _month < 1) {
            throw (errorSet.createError(errorSet.es.INVALID_DATE, new Error().stack));
        }

        var _minDate = new Date(_year, _month - 1, 1, 0, 0, 0);
        var _maxDate = new Date(_year, _month, 1, 0, 0, 0);

        var authInfo = await authentication.getAuthCode(decoded.userId);
        var authClient = authInfo.oAuth2Client;
        var resObj = await calendar_call.listEvents(authClient, calendarId, _minDate, _maxDate, null);

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {post} /calendar?calendarId=:calendarId InsertCalendar
    @apiName InsertCalendar
    @apiGroup Calendar
    @apiDescription
    새로운 캘린더 일정을 삽입합니다.</br>
    함께 넘어온 body parameter 값에 맞게 GoogleCalendar 에</br>
    일정에 등록됩니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam (query string) {String}  :calendarId      불러올 캘린더의 id 를 적습니다. (기본 : primary)
    @apiParam (body)         {String}  title            달력 일정의 타이틀
    @apiParam (body)         {String}  memo             달력 일정의 메모
    @apiParam (body)         {Date}    startTime        달력 일정의 시작시간</br>
                                                        ISOString 형태로 전달이 됩니다.</br>
                                                        RFC3339 표준 시간 형식을 사용하며</br>
                                                        JAVA 에서는 new Date().toISOString()</br>
                                                        "2019-08-14T09:25:50.136Z" 의 형식으로 request 하면될겁니다</br>
                                                        (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br>
                                                        new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br>
                                                        ISOString() 화 하여 바디에 startTime 에 넣어주시면 될겁니다.</br>
    @apiParam (body)         {Date}    endTime          달력 일정의 종료시간</br>
                                                        ISOString 형태로 전달이 됩니다.</br>
                                                        RFC3339 표준 시간 형식을 사용하며</br>
                                                        JAVA 에서는 new Date().toISOString()</br>
                                                        "2019-08-14T09:25:50.136Z" 의 형식으로 request 하면될겁니다</br>
                                                        (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br>
                                                        new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br>
                                                        ISOString() 화 하여 바디에 endTime 에 넣어주시면 될겁니다.</br>
    @apiParam (body)         {String}    location       달력 일정의 장소
    @apiParam (body)         {People[]}  people         다른 참여자가 있을 경우 people배열에 이메일을 포함해주시면 됩니다.
    @apiParam (body)         {String}    people-email   각 people 객체에 email 값만 추가해주면 해당 참여자에게도 일정이 표시됩니다.</br>
                                                        단 이때, 타인의 이메일만 넣기만 하면 되고 자기 자신은 추가하지 않습니다.</br>
                                                        다른 사람의 email만 배열에 추가하여 요청하면 자동으로 자기자신도 people에 추가됨.</br>
    @apiParamExample {json} 파라미터(body) 예제
    {
    	"title": "POST 달력 등록 테스트",
	    "memo": "내용이 추가된다",
    	"startTime": "2019-10-8T04:00:00+09:00",
	    "endTime": "2019-10-8T05:00:00+09:00",
	    "location": "장소는 우리집 ㅋ",
        "people":
        [
            // 자기 자신은 people 에 넣지 않습니다(자동으로 추가됨)
            {
                // 초대할 참가자 이메일 1
                "email":"zohizohi@naver.com"
            },
            {
                // 초대할 참가자 이메일 2
                "email":"thals_7@naver.com" 
            }
        ]
    }
    @apiParamExample {path} 파라미터(url) 예제
    http://169.56.98.117/calendar?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com

    @apiSuccess {String}  _id                       현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.
    @apiSuccess {Number}  day                       몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.
    @apiSuccess {String}  title                     일정의 제목
    @apiSuccess {String}  memo                      일정의 메모, 내용
    @apiSuccess {Date}    startTime                 일정의 시작 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {Date}    endTime                   일정의 종료 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {String}  location                  일정의 장소
    @apiSuccess {People[]}people                    이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br>
                                                    기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br>
                                                    만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br>
                                                    자신의 계정에서도 해당 일정이 GET 됩니다.
    @apiSuccess {String}  people-email              참여자의 이메일을 나타냅니다.</br>
                                                    일정을 등록할 때 참여자의 email 정보는 필수입니다.
    @apiSuccess {Boolean} people-self               참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.
    @apiSuccess {String}  people-organizer          이 일정을 생성한 사람입니다. </br>
                                                    생성한 사람의 정보에만 organizer : true 가 표시됩니다.
    @apiSuccess {String}  people-responseStatus     해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br>
                                                    needsAction : 아직 응답 안함</br>
                                                    declined : 일정 거절됨</br>
                                                    accepted : 일정 수락함</br>
                                                    tentative : 일정 잠정적 수</br>락
                                                    이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br>
                                                    만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        // 현재 이 Calendar 객체는 8월 1일의 일정이며
        // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)
        // 아직 조회한 본인이 이 일정을 만들었기 때문에 (responseStatus 는 accepted 입니다.)
        // 이 일정을 처음 만들고 초대한 사람 역시 조회하고 있는 주체입니다(organizer:true 확인)
        "_id": "b25dtstnmhjk4rploc5gl2vvks",
        "day": 8,
        "title": "POST 달력 등록 테스트",
        "memo": "내용이 추가된다",
        "startTime": "2019-10-08T04:00:00+09:00",
        "endTime": "2019-10-08T05:00:00+09:00",
        "location": "장소는 우리집 ㅋ",
        "people":
        [
            {
                "email": "thals_7@naver.com",
                "responseStatus": "needsAction"
            },
            // 요청 파라미터에서 본인의 정보는 추가 하지 않았지만
            // 자동으로 추가됩니다.
            {
                "email": "dfjung4254@gmail.com",
                "organizer": true,
                "self": true,
                "responseStatus": "accepted"
            },
            {
                "email": "zohizohi@naver.com",
                "responseStatus": "needsAction"
            }
        ]
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError FAILED_GOOGLE Google API 를 호출하는데 실패하였습니다.
    @apiError NO_CALENDARBODY 요청 body 정보가 없습니다.

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
    @apiErrorExample 실패 : NO_CALENDARBODY
    HTTP/1.1 400 Bad Request
    {
        "name" : "NO_CALENDARBODY",
        "message": "You did not input calendar body, check request body again!",
        "status": 400
    }

*/
router.post('/', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);
        var reqCalendar = req.body;

        var calendarId = req.query.calendarId;
        if(!calendarId) calendarId = 'primary';

        /* FIXME: body 에 대한 예외 처리 더 다양하게! */
        if (!reqCalendar) {
            throw (errorSet.createError(errorSet.es.NO_CALENDARBODY, new Error().stack));
        }

        var authInfo = await authentication.getAuthCode(decoded.userId);
        /* FIXME: 현재는 달력을 'primary' 에서만 처리하는데 안드로이드와 협의 후 다양한 달력list 사용하도록. */
        var resObj = await calendar_call.postEvents(authInfo, calendarId, reqCalendar);

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {put} /calendar/:_id?calendarId=:calendarId UpdateCalendar
    @apiName UpdateCalendar
    @apiGroup Calendar
    @apiDescription
    기존의 캘린더의 일정 정보를 업데이트합니다.</br>
    함께 넘어온 body parameter 값에 맞게 GoogleCalendar 에</br>
    일정이 변경됩니다.</br></br>

    _id 값은 GET 을 통해 넘어온 calendar 의 _id 값이며,</br>
    URL 을 통해 업데이트하고자 하는 특정 calendar 일정을 지정할 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam (query string) {String}    :calendarId      불러올 캘린더의 id 를 적습니다. (기본 : primary)   
    @apiParam (params)       {String}    :_id             URL 의 path 에 올려야 하는 해당 일정의 고유번호입니다.
    @apiParam (body)         {String}    title            달력 일정의 타이틀
    @apiParam (body)         {String}    memo             달력 일정의 메모
    @apiParam (body)         {Date}      startTime        달력 일정의 시작시간</br>
                                                          ISOString 형태로 전달이 됩니다.</br>
                                                          RFC3339 표준 시간 형식을 사용하며</br>
                                                          JAVA 에서는 new Date().toISOString()</br>
                                                          "2019-08-14T09:25:50.136Z" 의 형식으로 request 하면될겁니다</br>
                                                          (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br>
                                                          new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br>
                                                          ISOString() 화 하여 바디에 startTime 에 넣어주시면 될겁니다.</br>
    @apiParam (body)         {Date}      endTime          달력 일정의 종료시간</br>
                                                          ISOString 형태로 전달이 됩니다.</br>
                                                          RFC3339 표준 시간 형식을 사용하며</br>
                                                          JAVA 에서는 new Date().toISOString()</br>
                                                          "2019-08-14T09:25:50.136Z" 의 형식으로 request 하면될겁니다</br>
                                                          (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br>
                                                          new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br>
                                                          ISOString() 화 하여 바디에 endTime 에 넣어주시면 될겁니다.</br>
    @apiParam (body)         {String}    location         달력 일정의 장소
    @apiParam (body)         {People[]}  people           다른 참여자가 있을 경우 people배열에 이메일을 포함해주시면 됩니다.
    @apiParam (body)         {String}    people-email     각 people 객체에 email 값만 추가해주면 해당 참여자에게도 일정이 표시됩니다.</br>
                                                          단 이때, 타인의 이메일만 넣기만 하면 되고 자기 자신은 추가하지 않습니다.</br>
                                                          다른 사람의 email만 배열에 추가하여 요청하면 자동으로 자기자신도 people에 추가됨.</br>

    @apiParamExample {json} 파라미터(body) 예제
    {
        // title과 memo, Time, location 을 바꾸고,
        // 본인(self)의 responseStatus를 "accepted" 로 바꾸었습니다.
        // people 의 self:true(본인) 의 참여여부만 변경할 수 있습니다.
        // organizer 와 self 는 변경안됨.
        "title": "PUT 달력 변경 테스트",
        "memo": "내용이 변경된다",
        "startTime": "2019-10-08T04:00:00+09:00",
        "endTime": "2019-10-08T05:00:00+09:00",
        "location": "장소는 너희집 ㅋ",
        "people":
        [
            {
                "email": "thals_7@naver.com",
                "organizer": true,
                "responseStatus": "accepted"
            },
            {
                "email": "dfjung4254@gmail.com",
                "self": true,
                // needsAction -> accepted
                "responseStatus": "accepted"
            },
            {
                "email": "zohizohi@naver.com",
                "responseStatus": "needsAction"
            }
        ]
    }
    @apiParamExample {path} 파라미터(url) 예제
    URL : http://169.56.98.117/calendar/b25dtstnmhjk4rploc5gl2vvks?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com

    @apiSuccess {String}  _id                       현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.
    @apiSuccess {Number}  day                       몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.
    @apiSuccess {String}  title                     일정의 제목
    @apiSuccess {String}  memo                      일정의 메모, 내용
    @apiSuccess {Date}    startTime                 일정의 시작 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {Date}    endTime                   일정의 종료 시간을 뜻합니다.</br>
                                                    yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br>
                                                    [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]
    @apiSuccess {String}  location                  일정의 장소
    @apiSuccess {People[]}people                    이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br>
                                                    기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br>
                                                    만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br>
                                                    자신의 계정에서도 해당 일정이 GET 됩니다.
    @apiSuccess {String}  people-email              참여자의 이메일을 나타냅니다.</br>
                                                    일정을 등록할 때 참여자의 email 정보는 필수입니다.
    @apiSuccess {Boolean} people-self               참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.
    @apiSuccess {String}  people-organizer          이 일정을 생성한 사람입니다. </br>
                                                    생성한 사람의 정보에만 organizer : true 가 표시됩니다.
    @apiSuccess {String}  people-responseStatus     해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br>
                                                    needsAction : 아직 응답 안함</br>
                                                    declined : 일정 거절됨</br>
                                                    accepted : 일정 수락함</br>
                                                    tentative : 일정 잠정적 수</br>락
                                                    이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br>
                                                    만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "_id": "b25dtstnmhjk4rploc5gl2vvks",
        "day": 8,
        "title": "PUT 달력 변경 테스트",
        "memo": "내용이 변경된다",
        "startTime": "2019-10-08T04:00:00+09:00",
        "endTime": "2019-10-08T05:00:00+09:00",
        "location": "장소는 너희집 ㅋ",
        "people":
        [
            {
                "email": "thals_7@naver.com",
                "organizer": true,
                "responseStatus": "accepted"
            },
            {
                "email": "dfjung4254@gmail.com",
                "self": true,
                "responseStatus": "accepted"
            },
            {
                "email": "zohizohi@naver.com",
                "responseStatus": "needsAction"
            }
        ]
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError FAILED_GOOGLE Google API 를 호출하는데 실패하였습니다.
    @apiError NO_CALENDARBODY 요청 body 정보가 없습니다.

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
    @apiErrorExample 실패 : NO_CALENDARBODY
    HTTP/1.1 400 Bad Request
    {
        "name" : "NO_CALENDARBODY",
        "message": "You did not input calendar body, check request body again!",
        "status": 400
    }

*/
router.put('/:_id', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);
        var reqCalendar = req.body;
        var _id = req.params._id;

        var calendarId = req.query.calendarId;
        if(!calendarId) calendarId = 'primary';

        /* FIXME: body 에 대한 예외 처리 더 다양하게! */
        if (!reqCalendar) {
            throw (errorSet.createError(errorSet.es.NO_CALENDARBODY, new Error().stack));
        }

        var authInfo = await authentication.getAuthCode(decoded.userId);
        var resObj = await calendar_call.putEvents(authInfo, calendarId, _id, reqCalendar);

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {delete} /calendar/:_id?calendarId=:calendarId DeleteCalendar
    @apiName DeleteCalendar
    @apiGroup Calendar
    @apiDescription
    기존의 캘린더 일정을 삭제합니다.</br>

    _id 값은 GET 을 통해 넘어온 calendar 의 _id 값이며,</br>
    URL 을 통해 삭제하고자 하는 특정 calendar 일정을 지정할 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam (query string) {String}    :calendarId      불러올 캘린더의 id 를 적습니다. (기본 : primary)    
    @apiParam (params)       {String}    :_id             URL 의 path 에 올려야 하는 해당 일정의 고유번호입니다.
    @apiParamExample {path} 파라미터(url) 예제
    URL : http://169.56.98.117/calendar/b25dtstnmhjk4rploc5gl2vvks?l8162nkuj54205lks5fmkotqtk@group.calendar.google.com

    @apiSuccess {String}  message           캘린더 삭제에 성공 메세지가 담겨있습니다.
    @apiSuccess {Number}  status            캘린더 삭제 api 통신 상태는 200 입니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "message": "Calendar Event [b25dtstnmhjk4rploc5gl2vvks] delete Success!",
        "status": 200
    }

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
router.delete('/:_id', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);
        var _id = req.params._id;

        var calendarId = req.query.calendarId;
        if(!calendarId) calendarId = 'primary';

        var authInfo = await authentication.getAuthCode(decoded.userId);
        var resObj = await calendar_call.deleteEvents(authInfo, calendarId, _id);

        next(resObj);

    } catch (err) {
        next(err);
    }

});

module.exports = router;