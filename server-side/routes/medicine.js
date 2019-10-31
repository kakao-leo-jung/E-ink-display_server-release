var express = require('express');
var Medicine = require('../model/medicine');
var authentication = require('../auth/authentication');
var errorSet = require('../utill/errorSet');
var router = express.Router();

/**

    @api {get} /medicine GetMedicine
    @apiName GetMedicine
    @apiGroup Medicine
    @apiDescription
    유저의 투약 정보를 배열로 받아옵니다.

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {null} No Parameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter/



*/

router.get('/', async (req, res, next) => {

    try {

        var decoded = authentication.verifyJwt(req);

        var medicineLists = await Medicine.find({
            userId: decoded.userId
        }).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        })

        var retObj = new Object();
        retObj.medicineLists = new Array();
        for (medicine of medicineLists) {
            var obj = {
                _id: medicine._id,
                yakname: medicine.yakname,
                hour: medicine.hour,
                minute: medicine.minute,
                ampm: medicine.ampm,
                selected: medicine.selected
            };
            retObj.medicineLists.push(obj);
        }
        next(retObj);

    } catch (err) {
        next(err);
    }

});


/**
      @api {post} /medicine InsertMedicine
      @apiName PostMedicine
      @apiGroup Medicine
      @apiDescription
      새로운 medicine 목록을 저장합니다.

      @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
      @apiHeaderExample {form} 헤더 예제
      {
          // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
          "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
      }
      @apiParam {String} yakname 투약할 약의 이름
      @apiParam {Number} hour    시간
      @apiParam {Number} minute  분
      @apiParam {Boolean} selected 체크되었는지의 여부
      @apiParamExample {json} 파라미터(body) 예제
      {
        "yakname": "head",
        "hour": 12,
        "minute": 24,
        "ampm": "AM",
        "selected": false

      }

      @apiSuccess {String}    _id          해당 알람의 고유 id값, put, delete 호출 때 사용.
      @apiSuccess {String}    yakname      투약 정보
      @apiSuccess {Number}    hour         알람 시, 범위는 0~23.
      @apiSuccess {Number}    minute       알람 분, 범위는 0~59.
      @apiSuccess {String}    ampm         오전/오후 여부를 "AM", "PM" 으로 나타냅니다.</br>
                                                    ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br>
      @apiSuccess {boolean} selected        체크 되었는지 여부

      @apiSuccesExample 성공 시 응답:
      {
        "_id": "5daffsdifivssssdb",
        "yakname": "head",
        "hour": 12,
        "minute": 24,
        "ampm": "AM",
        "selected": false
      }
*/


router.post('/', async (req, res, next) => {

    try {


        var decoded = authentication.verifyJwt(req);



        var newMedicine = new Medicine({
            userId: decoded.userId,
            yakname: req.body.yakname,
            hour: req.body.hour,
            minute: req.body.minute,
            ampm: (req.body.hour > 12) ? "PM" : "AM",
            selected: req.body.selected
        });

        if (newMedicine.hour > 23 || newMedicine.hour < 0 || newMedicine.minute > 59 || newMedicine.minute < 0) {
            throw (errorSet.createError(errorSet.es.INVALID_TIME, new Error().stack));
        }

        var savedMedicine = await newMedicine.save()
            .catch(err => {
                throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
            });

        var resObj = {
            _id: savedMedicine._id,
            yakname: savedMedicine.yakname,
            hour: savedMedicine.hour,
            minute: savedMedicine.minute,
            ampm: savedMedicine.ampm,
            selected: savedMedicine.selected
        }

        next(resObj);

    } catch (err) {

        next(err);
    }

});

/*_id 값은 해당 medicine 모델의 고유 값*/
/**
    @api {put} /medicine/:_id UpdateMedicine
    @apiName PutMedicine
    @apiGroup Medicine
    @apiDescription
    jwt 토큰과 medicine의 _id 값을 통해 해당 medicine 을 요청받은 body의 내용으로 업데이트 합니다.
    url parameter에 넣는 _id 값은 GET을 통해 medicineLists를 호출 했을 때 </br>
    각 medicine 객체가 지니고 있는 "_id"의 value값. </br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String} yakname 요청 바디의 medicine 약 이름
    @apiParam {Number} hour 알람을 울릴 시간
    @apiParam {Number} minute 알람을 울릴 분
    @apiParam {Boolean} selected 요청 바디의 medicine 체크 여부
    @apiParamExample {json} 파라미터(body) 예제
    {
      "yakname": "head",
      "hour": 12,
      "minute": 24,
      "ampm": "AM",
      "selected": false
    }

    @apiSuccess {String} _id   DB에 저장된 medicine의 고유값 - put,delete 요청시 필요
    @apiParam {Number} hour 알람을 울릴 시간
    @apiParam {Number} minute 알람을 울릴 분
    @apiParam {Boolean} selected 요청 바디의 medicine 체크 여부
    @apiSuccessExample 성공 시 응답:
    {
      "_id": "5daf0530f7dcec27842bd671",
      "yakname": "def",
      "hour": 12,
      "minute": 24,
      "ampm": "AM",
      "selected": false
   }



*/

router.put('/:_id', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        var changedMedicine = {
            yakname: req.body.yakname,
            hour: req.body.hour,
            minute: req.body.minute,
            ampm: (req.body.hour > 12) ? "PM" : "AM",
            selected: req.body.selected
        }

        if (changedMedicine.hour > 23 || changedMedicine.hour < 0 || changedMedicine.minute > 59 || changedMedicine.minute < 0) {
            throw (errorSet.createError(errorSet.es.INVALID_TIME, new Error().stack));
        }

        var document = await Medicine.findOneAndUpdate({
            userId: decoded.userId,
            _id:req.params._id
        }, changedMedicine).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var resObj = {
            _id: document._id,
            yakname: changedMedicine.yakname,
            hour: changedMedicine.hour,
            minute: changedMedicine.minute,
            ampm: changedMedicine.ampm,
            selected: changedMedicine.selected
        };

        next(resObj);

    } catch (err) {
        next(err);
    }

});


/**

      @api {delete} /medicine/:id  DeleteMedicine
      @apiName DeleteMedicine
      @apiGroup Medicine
      @apiDescription
      jwt 토큰과 medicine의 _id값을 통해 현재 유저의 해당 meidicine 알림을 삭제합니다. </br>
      url parameter에 넣는 _id 값은 GET을 통해 medicine Lists를 호출했을 때 </br>
      각 medicine 객체가 지니고 있는 "_id"의 value값 입니다. </br>

      @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
      @apiHeaderExample {form} 헤더 예제
      {
          // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
          "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
      }

      @apiParam {String} :_id URL에 지울 todo 정보의 고유 아이디 값을 넣습니다.
      @apiParamExample {path} 파라미터(url) 예제
      URL : http://169.56.98.117/todo/5d9ed8a64d73a91bcc4526d7

      @apiSuccess {String} message       삭제 완료 메세지
      @apiSuccess {Number} status        성공 상태 200
      @apiSuccessExample 성공 시 응답 :
      HTTP/1.1 200 OK
      {
          "message": "medicine info delete success".
          "status": 200
      }


*/
router.delete('/:_id', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        var document = await Medicine.findOneAndDelete({
            _id: req.params._id,
            userId: decoded.userId
        }).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var resObj = {
            message: "medicine info delete success!",
            status: 200
        }

        next(resObj);

    } catch (err) {
        next(err);
    }
})

/**

    @api {put} /medicine/onoff/:_id UpdateMedicineOnoff
    @apiName UpdateMedicineOnoff
    @apiGroup Medicine
    @apiDescription
    유저의 투약정보의 ON/OFF 정보만 수정합니다. </br>
    투약이 ON 상태여야만 매일 정해진 hour, minute 에 푸시를 받을 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String}      :_id              투약의 id 값, /medicine/:_id 로 해당 투약의 put, delete 를 호출합니다.
    @apiSuccess {boolean}   selected          현재 투약이 켜져있는지 여부를 나타냅니다.
    @apiParamExample {json} 파라미터(body) 예제
    {
        "selected": true
    }
    @apiParamExample {path} 파라미터(url) 예제
    URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a

    @apiSuccess {String}    _id               해당 투약의 고유 id값, put, delete 호출 때 사용.
    @apiSuccess {String}    title             투약 제목
    @apiSuccess {Number}    hour              투약 시, 범위는 0~23.
    @apiSuccess {Number}    minute            투약 분, 범위는 0~59.
    @apiSuccess {String}    ampm              오전/오후 여부를 "AM", "PM" 으로 나타냅니다.</br>
                                              ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br>
    @apiSuccess {boolean}   selected          현재 투약이 켜져있는지 여부를 나타냅니다.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "_id": "5da6bee89d02807cd9288a5a",
        "title": "투약테스트3 - modified",
        "hour": 10,
        "minute": 20,
        "ampm": "AM",
        "selected"": true
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
            selected : req.body.selected
        }

        var document = await Medicine.findOneAndUpdate({
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
            selected: changedOnOff.selected
        }

        next(resObj);

    }catch(err){
        next(err);
    }

});

module.exports = router;