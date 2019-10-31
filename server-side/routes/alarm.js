var express = require('express');
var router = express.Router();
var authentication = require('../auth/authentication');
var Alarm = require('../model/alarm');
var errorSet = require('../utill/errorSet');

/* TODO: Author : 정근화 */

/**

    @api {get} /alarm GetAlarm
    @apiName GetAlarm
    @apiGroup Alarm
    @apiDescription
    유저의 알람 리스트를 배열로 받아옵니다.</br>
    Call <List<Alarm>> 형식으로 자바에서 retrofit 인터페이스를 구축할 수 있습니다.
    서버에서 시간을 체크 한 뒤 isAlarmOn 이 켜있는 상태에서 해당 시간에 푸시를 줍니다.

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {null} No Parameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter

    @apiSuccess {String}    _id               해당 알람의 고유 id값, put, delete 호출 때 사용.
    @apiSuccess {String}    title             알람 제목
    @apiSuccess {Number}    hour              알람 시, 범위는 0~23.
    @apiSuccess {Number}    minute            알람 분, 범위는 0~59.
    @apiSuccess {String}    ampm              오전/오후 여부를 "AM", "PM" 으로 나타냅니다.</br>
                                              ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br>
    @apiSuccess {boolean[]} day_selected      각 요일에 알람이 on 상태인지 여부를 나타냅니다</br>
                                              배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br>
    @apiSuccess {boolean}   isAlarmOn         현재 알람이 켜져있는지 여부를 나타냅니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    [
        {
            "_id": "5da6bee89d02807cd9288a5a",
            "title": "알람테스트0",
            "hour": 23,
            "minute": 0,
            "ampm": "PM",
            "day_selected":[true, false, false, false, true, true, false],
            "isAlarmOn": true
        },
        {
            "_id": "5da6bf319d02807cd9288a5d",
            "title": "알람테스트1",
            "hour": 23,
            "minute": 59,
            "ampm": "PM",
            "day_selected":[false, false, false, false, true, true, false],
            "isAlarmOn": false
        },
        {
            "_id": "5da6bf429d02807cd9288a5e",
            "title": "알람테스트2",
            "hour": 0,
            "minute": 1,
            "ampm": "AM",
            "day_selected":[false, false, false, false, true, true, false],
            "isAlarmOn": true
        }
    ]

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.

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
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your Todo in database!",
        "status": 400
    }   

*/
router.get('/', async (req, res, next) => {

    try {

        var decoded = authentication.verifyJwt(req);

        var alarmList = await Alarm.find({
            userId: decoded.userId
        }).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var resObj = new Array();
        for (alarm of alarmList) {
            var obj = {
                _id: alarm._id,
                title: alarm.title,
                hour: alarm.hour,
                minute: alarm.minute,
                ampm: alarm.ampm,
                day_selected: alarm.day_selected,
                isAlarmOn: alarm.isAlarmOn
            }
            resObj.push(obj);
        }

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {post} /alarm InsertAlarm
    @apiName InsertAlarm
    @apiGroup Alarm
    @apiDescription
    유저의 알람을 추가합니다. </br>
    알람이 등록되면 등록된 요일(day_selected[] = true) 의 hour, minute 에 푸시를 받을 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String}    title             알람 제목
    @apiParam {Number}    hour              알람 시, 범위는 0~23
    @apiParam {Number}    minute            알람 분, 범위는 0~59
    @apiParam {boolean[]} day_selected      각 요일에 알람여부를 뜻합니다. 배열의 사이즈는 반드시 7이여야 하고</br>
                                            [0 - 6] 까지의 인덱스는 각각 [일, 월, 화, 수, 목, 금, 토]을 나타냅니다</br>
    @apiSuccess {boolean}   isAlarmOn       현재 알람이 켜져있는지 여부를 나타냅니다.
    @apiParamExample {json} 파라미터(body) 예제
    {
        "title": "알람테스트3",
        "hour":11,
        "minute":45,
        "day_selected":[true, true, false, false, true, true, false],
        "isAlarmOn": true
    }

    @apiSuccess {String}    _id               해당 알람의 고유 id값, put, delete 호출 때 사용.
    @apiSuccess {String}    title             알람 제목
    @apiSuccess {Number}    hour              알람 시, 범위는 0~23.
    @apiSuccess {Number}    minute            알람 분, 범위는 0~59.
    @apiSuccess {String}    ampm              오전/오후 여부를 "AM", "PM" 으로 나타냅니다.</br>
                                              ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br>
    @apiSuccess {boolean[]} day_selected      각 요일에 알람이 on 상태인지 여부를 나타냅니다</br>
                                              배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br>
    @apiSuccess {boolean}   isAlarmOn         현재 알람이 켜져있는지 여부를 나타냅니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "_id": "5da6c1fea3c4697d4765b6b7",
        "title": "알람테스트3",
        "hour": 11,
        "minute": 45,
        "ampm": "AM",
        "day_selected":[true, true, false, false, true, true, false],
        "isAlarmOn": true
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.
    @apiError INVALID_TIME 시간 값이 유효하지 않습니다 hour(0-23), minute(0-59)
    @apiError LENGTH_ARRAY day_selected 배열의 사이즈가 7이 아닙니다.

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
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your Todo in database!",
        "status": 400
    }   
    @apiErrorExample 실패 : INVALID_TIME
    HTTP/1.1 400 Bad Request
    {
        "name" : "INVALID_TIME",
        "message": "You input invalide hour or minute, please check range of your request hour(0-23) and minute(0-59)!",
        "status": 400
    }   
    @apiErrorExample 실패 : LENGTH_ARRAY
    HTTP/1.1 400 Bad Request
    {
        "name" : "LENGTH_ARRAY",
        "message": "Your request day_selected[] array size is not 7.",
        "status": 400
    }   

*/
router.post('/', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        var newAlarm = new Alarm({
            userId: decoded.userId,
            title: req.body.title,
            hour: req.body.hour,
            minute: req.body.minute,
            ampm : (req.body.hour >= 12) ? "PM" : "AM",
            day_selected: req.body.day_selected,
            isAlarmOn: req.body.isAlarmOn
        });

        if(newAlarm.hour > 23 || newAlarm.hour < 0 || newAlarm.minute > 59 || newAlarm.minute < 0){
            throw(errorSet.createError(errorSet.es.INVALID_TIME, new Error().stack));
        }

        if(newAlarm.day_selected.length != 7){
            throw(errorSet.createError(errorSet.es.LENGTH_ARRAY, new Error().stack));
        }

        var savedAlarm = await newAlarm.save()
            .catch(err => {
                throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
            });

        var resObj = {
            _id: savedAlarm._id,
            title: savedAlarm.title,
            hour: savedAlarm.hour,
            minute: savedAlarm.minute,
            ampm : savedAlarm.ampm,
            day_selected: savedAlarm.day_selected,
            isAlarmOn: savedAlarm.isAlarmOn
        };

        next(resObj);

    } catch (err) {
        next(err);
    }

});


/**

    @api {put} /alarm/onoff/:_id UpdateAlarmOnoff
    @apiName UpdateAlarmOnoff
    @apiGroup Alarm
    @apiDescription
    유저의 알람정보의 ON/OFF 정보만 수정합니다. </br>
    알람이 ON 상태여야만 요일(day_selected[] = true) 의 hour, minute 에 푸시를 받을 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String}      :_id              알람의 id 값, /alarm/:_id 로 해당 알람의 put, delete 를 호출합니다.
    @apiSuccess {boolean}   isAlarmOn         현재 알람이 켜져있는지 여부를 나타냅니다.
    @apiParamExample {json} 파라미터(body) 예제
    {
        "isAlarmOn": true
    }
    @apiParamExample {path} 파라미터(url) 예제
    URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a

    @apiSuccess {String}    _id               해당 알람의 고유 id값, put, delete 호출 때 사용.
    @apiSuccess {String}    title             알람 제목
    @apiSuccess {Number}    hour              알람 시, 범위는 0~23.
    @apiSuccess {Number}    minute            알람 분, 범위는 0~59.
    @apiSuccess {String}    ampm              오전/오후 여부를 "AM", "PM" 으로 나타냅니다.</br>
                                              ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br>
    @apiSuccess {boolean[]} day_selected      각 요일에 알람이 on 상태인지 여부를 나타냅니다</br>
                                              배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br>
    @apiSuccess {boolean}   isAlarmOn         현재 알람이 켜져있는지 여부를 나타냅니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "_id": "5da6bee89d02807cd9288a5a",
        "title": "알람테스트3 - modified",
        "hour": 10,
        "minute": 20,
        "ampm": "AM",
        "day_selected":[true, true, false, true, false, false, true],
        "isAlarmOn": true
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.
    @apiError INVALID_TIME 시간 값이 유효하지 않습니다 hour(0-23), minute(0-59)
    @apiError LENGTH_ARRAY day_selected 배열의 사이즈가 7이 아닙니다.

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
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your Todo in database!",
        "status": 400
    }   
    
*/
router.put('/onoff/:_id', async (req, res, next) => {

    try{
        var decoded = authentication.verifyJwt(req);

        var changedOnOff = {
            isAlarmOn : req.body.isAlarmOn
        }

        var document = await Alarm.findOneAndUpdate({
            userId : decoded.userId,
            _id : req.params._id
        }, changedOnOff).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var resObj = {
            _id: document._id,
            title: document.title,
            hour: document.hour,
            minute: document.minute,
            ampm: document.ampm,
            day_selected: document.day_selected,
            isAlarmOn: changedOnOff.isAlarmOn
        }

        next(resObj);

    }catch(err){
        next(err);
    }

});

/**

    @api {put} /alarm/:_id UpdateAlarm
    @apiName UpdateAlarm
    @apiGroup Alarm
    @apiDescription
    유저의 알람정보를 수정합니다. </br>
    알람이 수정되면 수정된 요일(day_selected[] = true) 의 hour, minute 에 푸시를 받을 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String}    :_id              알람의 id 값, /alarm/:_id 로 해당 알람의 put, delete 를 호출합니다.
    @apiParam {String}    title             알람 제목
    @apiParam {Number}    hour              알람 시, 범위는 0~23
    @apiParam {Number}    minute            알람 분, 범위는 0~59
    @apiParam {boolean[]} day_selected      각 요일에 알람여부를 뜻합니다. 배열의 사이즈는 반드시 7이여야 하고</br>
                                            [0 - 6] 까지의 인덱스는 각각 [일, 월, 화, 수, 목, 금, 토]을 나타냅니다</br>
    @apiSuccess {boolean}   isAlarmOn         현재 알람이 켜져있는지 여부를 나타냅니다.
    @apiParamExample {json} 파라미터(body) 예제
    {
        "title": "알람테스트3 - modified",
        "hour":10,
        "minute":20,
        "day_selected":[true, true, false, true, false, false, true],
        "isAlarmOn": true
    }
    @apiParamExample {path} 파라미터(url) 예제
    URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a

    @apiSuccess {String}    _id               해당 알람의 고유 id값, put, delete 호출 때 사용.
    @apiSuccess {String}    title             알람 제목
    @apiSuccess {Number}    hour              알람 시, 범위는 0~23.
    @apiSuccess {Number}    minute            알람 분, 범위는 0~59.
    @apiSuccess {String}    ampm              오전/오후 여부를 "AM", "PM" 으로 나타냅니다.</br>
                                              ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br>
    @apiSuccess {boolean[]} day_selected      각 요일에 알람이 on 상태인지 여부를 나타냅니다</br>
                                              배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br>
    @apiSuccess {boolean}   isAlarmOn         현재 알람이 켜져있는지 여부를 나타냅니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "_id": "5da6bee89d02807cd9288a5a",
        "title": "알람테스트3 - modified",
        "hour": 10,
        "minute": 20,
        "ampm": "AM",
        "day_selected":[true, true, false, true, false, false, true],
        "isAlarmOn": true
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.
    @apiError INVALID_TIME 시간 값이 유효하지 않습니다 hour(0-23), minute(0-59)
    @apiError LENGTH_ARRAY day_selected 배열의 사이즈가 7이 아닙니다.

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
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your Todo in database!",
        "status": 400
    }   
    @apiErrorExample 실패 : INVALID_TIME
    HTTP/1.1 400 Bad Request
    {
        "name" : "INVALID_TIME",
        "message": "You input invalide hour or minute, please check range of your request hour(0-23) and minute(0-59)!",
        "status": 400
    }   
    @apiErrorExample 실패 : LENGTH_ARRAY
    HTTP/1.1 400 Bad Request
    {
        "name" : "LENGTH_ARRAY",
        "message": "Your request day_selected[] array size is not 7.",
        "status": 400
    }   

*/
router.put('/:_id', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        var changedAlarm = {
            title: req.body.title,
            hour: req.body.hour,
            minute: req.body.minute,
            ampm : (req.body.hour > 12) ? "PM" : "AM",
            day_selected: req.body.day_selected,
            isAlarmOn: req.body.isAlarmOn
        }

        if(changedAlarm.hour > 23 || changedAlarm.hour < 0 || changedAlarm.minute > 59 || changedAlarm.minute < 0){
            throw(errorSet.createError(errorSet.es.INVALID_TIME, new Error().stack));
        }

        if(changedAlarm.day_selected.length != 7){
            throw(errorSet.createError(errorSet.es.LENGTH_ARRAY, new Error().stack));
        }

        /* 현재 로그인된 jwt 의 유저와 alarm 등록한 userId 가 일치해야 함. */
        var document = await Alarm.findOneAndUpdate({
            _id: req.params._id,
            userId: decoded.userId
        }, changedAlarm).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var resObj = {
            _id: document._id,
            title: changedAlarm.title,
            hour: changedAlarm.hour,
            minute: changedAlarm.minute,
            ampm: changedAlarm.ampm,
            day_selected: changedAlarm.day_selected,
            isAlarmOn: changedAlarm.isAlarmOn
        };

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {delete} /alarm/:_id DeleteAlarm
    @apiName DeleteAlarm
    @apiGroup Alarm
    @apiDescription
    유저의 알람정보를 삭제합니다. </br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String}    :_id              알람의 id 값, /alarm/:_id 로 해당 알람의 put, delete 를 호출합니다.
    @apiParamExample {path} 파라미터(url) 예제
    URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a

    @apiSuccess {String}    message         삭제 성공 메세지
    @apiSuccess {String}    status          삭제 성공 상태 200.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "message": "Alarm delete success!",
        "status": 200
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.

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
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your Todo in database!",
        "status": 400
    }

*/
router.delete('/:_id', async (req, res, next) => {

    try{
        var decoded = authentication.verifyJwt(req);

        var document = await Alarm.findOneAndDelete({
            _id: req.params._id,
            userId: decoded.userId
        }).catch(err => {
            throw(errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var resObj = {
            message: "Alarm delete success!",
            status: 200
        }

        next(resObj);

    }catch(err){
        next(err);
    }

});

module.exports = router;