var express = require('express');
var Todo = require('../model/todolist');
var authentication = require('../auth/authentication');
var errorSet = require('../utill/errorSet');
var router = express.Router();

/** JSON Structure
 * {
 *   todoId : String, => 굳이 필요없이 save() 하게 되면 자동을 _id 변수에 어떠한 고유값이 저장됩니다.
 *   userId : string, => 안드로이드에서 보내준 커스텀 JWT 를 파싱하면 얻을 수 있는 id값입니다. 이걸로 해당 todo의 주인을 판별합니다.
 *   email : string  => 필요없는 것 같아 삭제했습니다..
 *   userName : String, => 필요없는 것 같아 삭제했습니다..
 *   title : String,  => 타이틀, Todo 의 내용이 들어가야 하는 곳.
 *   selected : Boolean => Todo 가 완료되었는지 여부.
 * }
 */

/*

    FIXME: Todo 구현에 관해.
    todolist.js 스키마에 의해 user_auth db의 todos Collection에 Todo 들이 저장이 되면 됩니다.
  
    userId 변수는 구글에서 받아와 users Collection 에 저장한 유저정보의 id 숫자값이 들어가야 합니다.
    그리고 userId 를 알 수 있는 것은 JWT를 파싱하여 얻은 decoded 값에 userId 값이 들어가있습니다.
    [자세한 것은 authentication.js 의 veryfyJWT 함수를 참고.]

    오직 안드로이드가 누구의 요청인지 인증하는 방식은 헤더에 실린 JWT로 하므로 다른 id 나 title값은 없어도 무방할겁니다.
    안드로이드쪽 요청사항이 정확하지 않은데 영보님과 하영님이 만들고 계신 어플 구조를 보고, Issue 에 업로드한 안드로이드_요구사항.txt
    를 참고하면 좋습니다.
    [단, userid 말씀하시는 거는 하영님이 잘못이해하셨는데 url에 싫는게 아니라 header 값에 싣는 jwt 를 말합니다.
    안드로이드_요구사항.txt 의 userid는 무시하고진행 ]

*/
/* FIXME: post 예시 구현 */
/*

    FIXME: 또한 API 의 문서화를 위해서 apidoc 을 사용하고 있습니다.
    이에 맞게 api 주석을 작성해주시면 됩니다.

    url : http://apidocjs.com/

*/

/**

    @api {post} /todo InsertTodo
    @apiName PostTodo
    @apiGroup Todo
    @apiDescription
    새로운 todo 목록을 저장합니다.

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String} title Todo 제목
    @apiParam {boolean} selected Todo 체크 여부
    @apiParamExample {json} 파라미터(body) 예제
    {
        "title": "MagicCalender 만들기 테스트",
        "selected": false
    }

    @apiSuccess {String}  _id             DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용
    @apiSuccess {String}  title           Todo 의 제목
    @apiSuccess {boolean} selected        Todo 체크되었는지 여부.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "_id": "5da46cff9ea01463ba5c2eca",
        "title": "MagicCalendar 만들기 테스트",
        "selected": false
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
router.post('/', async (req, res, next) => {

    try {

        /* 보낸 주체가 누구인지 구분하기 위해서는 무조건 JWT 디코딩부터 해야합니다. */
        var decoded = authentication.verifyJwt(req);

        var _title = req.body.title;
        var _selected = req.body.selected;

        /*

            body 는 userId 빼고
            title : String
            selected : Boolean
            값만 받음.

            userId 값은 decoded 에서 userId 값 채워야함.

        */
        var newTodo = new Todo({
            userId: decoded.userId,
            title: _title,
            selected: _selected
        });

        var savedTodo = await newTodo.save()
            .catch(err => {
                throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
            });

        var resTodo = {
            _id: savedTodo._id,
            title: savedTodo.title,
            selected: savedTodo.selected
        }

        next(resTodo);

    } catch (err) {
        /*

            next 함수는 express 에서 다음 use로 등록한 다음 라우터로 보냅니다.
            로그관리를 위해 에러를 보내든 정상적으로 응답을 하든 next 함수를 통해
            logHandler로 보내야 합니다. 예외처리가 된 부분은 모두 throw 하여
            여기 catch 부분의 err로 보냅니다.

        */
        next(err);
    }

});



/* FIXME: get 예시 구현 */
/**

    @api {get} /todo GetTodoList
    @apiName GetTodo
    @apiGroup Todo
    @apiDescription
    현재 유저가 등록한 Todo 리스트를 반환합니다.</br>
    반환받을 때 각 todo 의 _id 값으로 put, delete 요청을 할 수 있습니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {null} No Parameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter

    @apiSuccess {Todo[]}  todoLists       JSONArray<Todo> 의 모양으로 Todo 의 리스트를 가짐
    @apiSuccess {String}  _id             DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용
    @apiSuccess {String}  title           Todo 의 제목
    @apiSuccess {boolean} selected        Todo 체크되었는지 여부.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "todoLists":
            [
                {
                    "_id": "5d9ed8a64d73a91bcc4526d7",
                    "title": "MagicCalender 만들기2",
                    "selected": true
                },
                {"_id": "5d9ed8aa4d73a91bcc4526d8", "title": "MagicCalender 만들기3", "selected": true},
                {"_id": "5d9efdeaec5df242401dd1a7", "title": "새로운 post modified!!", "selected": false},
                {"_id": "5d9efe6b21e6cb42d3071cde", "title": "새로운 post 테스트2", "selected": false},
                {"_id": "5d9f00a421e6cb42d3071cdf", "title": "Android post test", "selected": false},
                {"_id": "5da309dd93968368d2266635", "title": "New Post Test good!", "selected": false}
            ]
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
router.get('/', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        var todoLists = await Todo.find({
            userId: decoded.userId
        }).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        })

        var retObj = new Object();
        retObj.todoLists = new Array();
        for (var todo of todoLists) {
            var todoObj = {
                "_id": todo._id,
                "title": todo.title,
                "selected": todo.selected
            };
            retObj.todoLists.push(todoObj);
        }

        next(retObj);

    } catch (err) {
        next(err);
    }

});

/* FIXME: put 예시 구현 */
/* _id 값은 해당 todo 모델의 고유 값 */
/**

    @api {put} /todo/:_id UpdateTodo
    @apiName PutTodo
    @apiGroup Todo
    @apiDescription
    jwt 토큰과 todo 의 _id 값을 통해 현재 유저의 해당 todo 를 요청받은 body 의내용으로 업데이트합니다.</br>
    url parameter 에 넣는 _id 값은 GET 을 통해 todolist 를 호출 했을 때</br>
    각 todo 객에가 지니고 있는 "_id" 의 value 값 입니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {String} title 요청 바디의 Todo 제목
    @apiParam {boolean} selected 요청 바디의 Todo 체크 여부
    @apiParamExample {json} 파라미터(body) 예제
    {
        "title": "MagicCalender 만들기 수정하기",
        "selected": true
    }
    @apiParam {String} :_id URL에 고칠 todo 정보의 고유 아이디 값을 적습니다.
    @apiParamExample {path} 파라미터(url) 예제
    URL : http://169.56.98.117/todo/5d9ed8a64d73a91bcc4526d7

    @apiSuccess {String}  _id             DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용
    @apiSuccess {String}  title           Todo 의 제목
    @apiSuccess {boolean} selected        Todo 체크되었는지 여부.
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "_id": "5d9ed8a64d73a91bcc4526d7",
        "title": "MagicCalendar 만들기 수정하기",
        "selected": true
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.
    @apiError ERR_CRUDDB 내부 DB 작업에 실패하였습니다.
    @apiError INVALID_TODOBODYKEY Body 값에 userId 값은 들어있으면 안됩니다.

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
    @apiErrorExample 실패 : INVALID_TODOBODYKEY
    HTTP/1.1 400 Bad Request
    {
        "name" : "INVALID_TODOBODYKEY",
        "message": "Invalid body property is included! : userId",
        "status": 400
    }

*/
router.put('/:_id', async (req, res, next) => {

    try {
        var decoded = authentication.verifyJwt(req);

        /* userId, 값은 수정 불가능 req.body 에 있으면 안됨 */
        if (req.body.hasOwnProperty('userId')) {
            throw (errorSet.createError(errorSet.es.INVALID_TODOBODYKEY, new Error().stack));
        }

        /* body 예외 처리 */
        var _title = req.body.title;
        var _selected = req.body.selected;

        /* 

            _id 특정 글의 objectId 값과 해당 글의 userId 값이 요청한 측의 userId 값과 일치해야함.
            그렇지 않을 경우 다른 계정의 _id 값을 알기만 하면 남의 글도 지울 수가 있음.
            내가 올린 글만 수정할 수 있어야 함

        */
        /* _id 값은 update 안함 */
        var updateBody = {
            title: _title,
            selected: _selected
        }

        var document = await Todo.findOneAndUpdate({
            _id: req.params._id,
            userId: decoded.userId
        }, updateBody).catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        });

        var resTodo = {
            _id: document._id,
            title: updateBody.title,
            selected: updateBody.selected
        }

        next(resTodo);

    } catch (err) {
        next(err);
    }

});

/* FIXME: delete 예시 구현 */
/**

    @api {delete} /todo/:id DeleteTodo
    @apiName DeleteTodo
    @apiGroup Todo
    @apiDescription
    jwt 토큰과 todo 의 _id 값을 통해 현재 유저의 해당 todo 를 삭제합니다.</br>
    url parameter 에 넣는 _id 값은 GET 을 통해 todolist 를 호출 했을 때</br>
    각 todo 객에가 지니고 있는 "_id" 의 value 값 입니다.</br>

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
        "message": "Todo delete success!",
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

    try {
        var decoded = authentication.verifyJwt(req);

        /* PUT 과 마찬가지, userId 값이 동일한 사람인지 확인 */
        var document = await Todo.findOneAndDelete({
            _id: req.params._id,
            userId: decoded.userId
        }).catch(err => {
            throw(errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack));
        })

        var resObj = {
            message: "Todo delete success!",
            status: 200
        }

        next(resObj);

    } catch (err) {
        next(err);
    }

});

module.exports = router;