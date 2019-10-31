var express = require('express');
const {
    OAuth2Client
} = require('google-auth-library');
const {
    google
} = require('googleapis');
var User = require('../model/user');
var Refresh = require('../model/refresh');
const Jwt = require('jsonwebtoken');
const config = require('/root/config/config');
var errorSet = require('../utill/errorSet');
var User = require('../model/user');
var router = express.Router();

/* TODO: Author : 정근화 */

/*

    본 모듈은 /loginToken 으로 들어온 요청을 처리한다.
    loginToken/ 은 googleToken 을 받아 인증절차를 거치고
    새로 생성한 커스텀 JWT를 안드로이드와의 통신 인증 수단으로 발급한다.

*/
/* JWT 토큰의 유효성을 검증한다 - Google AccessToken 까지 유효성 확인 */
/* 

    Google refresh token 의 만료여부 확인

    A refresh token might stop working for one of these reasons:

    The user has revoked your app's access. -> 안드로이드 클라이언트 상에서 revoke 할 시 사용불가.
    The refresh token has not been used for six months. -> google refresh token의 재사용 주기는 6개월
    The user changed passwords and the refresh token contains Gmail scopes.
    The user account has exceeded a maximum number of granted (live) refresh tokens.

    https://developers.google.com/identity/protocols/OAuth2

    You can try to getAccessToken which will use refresh token for that purpose. If the call fails, that means refresh token is not valid.

*/
/* 구글 프로젝트에 등록한 안드로이드 어플리케이션의 웹 클라이언트ID 값 */
const CLIENT_ID = config.WEB_CLIENT_ID;
const CLIENT_SECRET = config.WEB_CLIENT_SECRET;
const CLIENT_REDIRECT_URIS = config.WEB_REDIRECT_URIS;
const client = new OAuth2Client(CLIENT_ID);

/* JWT 토큰 정보 */
const JWT_SECRET = config.JWT_SECRET;
const JWT_EXP = config.JWT_EXP;
const JWT_EXP_REFRESH = config.JWT_EXP_REFRESH;
const JWT_ISS = config.JWT_ISS;
const JWT_SUB = config.JWT_SUB;

/* authCode 를 분석하기 위한 credentials.json 을 사용하여 authclient를 생성. */
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_REDIRECT_URIS
);

/**

    @api {get} /loginToken GetJWTSignIn
    @apiName GetJWTSignIn
    @apiGroup LoginToken
    @apiDescription
    LoginToken 구글 로그인 받은 AuthCode을 분석해서 처리한다.</br>
    구글로그인을 하고 AuthCode를 이곳으로 요청하여 jwt를 받아 로그인 구현</br>
    구현할 로직은 다음과 같다.</br></br>
    0. authCode 를 받아 accessToken, refreshToken, idToken 으로 분리한다.</br>
    1. 받은 아이디 토큰의 유효성을 검사하고 Payload를 불러온다.</br>
    2. userID 값을 이용해 DB를 조회한다.</br>
        - DB에 존재안함 : 새 user를 등록 한다.</br>
    3. Google Token과 함께 user를 DB에 등록(업데이트) 한다.</br>
    4. 새로운 jwt와 jwt_refresh 를 생성하여 refresh token은 DB에 저장한 후</br>
       리턴한다.</br>

    @apiHeader {null} NoHeader 필요한 헤더값 없음(jwt X)
    @apiHeaderExample {null} 헤더(x) 예제
    No JWT and other Header type

    @apiParam (query string) {String} code      구글 로그인 후 받은 AuthCode 값</br>
                                                단 scope 에 openId, profile, email, calendar 가 추가된 상태여야 한다</br>
    @apiParamExample {path} 파라미터(url) 예제
    (GET) http://169.56.98.117/loginToken?code={$Google Auth Code}

    @apiSuccess {String}  jwt                   본 서버의 AccessToken, 주기는 5분이며,</br>
                                                클라이언트의 메모리영역에 보관해놓고 API 호출 시 헤더에 넣어 활용한다.</br>
    @apiSuccess {String}  jwt_refresh           본 서버의 RefreshToken, 주기는 14일이며,</br>
                                                SharedPreference 같은 보안영역에 저장해놓고 jwt 만료시 갱신한다.</br>
                                                (GET)/loginToken/refresh 로 요청</br>
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "jwt_refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }

    @apiError FAILED_GOOGLEAUTH 구글 인증서버에서 Authcode를 파싱하는데 실패하였습니다.
    @apiError ERR_CRUDDB 데이터베이스 CRUD 작업에 실패하였습니다.

    @apiErrorExample 실패 : FAILED_GOOGLEAUTH
    HTTP/1.1 401 Authentication
    {
        "name" : "FAILED_GOOGLEAUTH",
        "message": "Failed to decode your Google Auth-code!",
        "status": 401
    }
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your request in database!",
        "status": 500
    }

*/
router.get('/', async (req, res, next) => {

    try {

        const authCode = req.query.code;
        const {
            tokens
        } = await oAuth2Client.getToken(authCode).catch(err => {
            throw errorSet.createError(errorSet.es.FAILED_GOOGLEAUTH, err.stack);
        });

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID
        }).catch(err => {
            throw errorSet.createError(errorSet.es.FAILED_GOOGLEAUTH, err.stack);
        });

        const payload = ticket.getPayload();

        var resultUser = await User.findOne({
            userId: payload.sub
        }).catch(err => {
            throw errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack);
        });

        if (!resultUser) {
            const newUser = new User({
                userId: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                given_name: payload.given_name,
                family_name: payload.family_name,
                locale: payload.locale,
                tokens: "",
                fcm_token: ""
            });
            resultUser = await newUser.save().catch(err => {
                throw errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack);
            });
        }
        resultUser.tokens = tokens;
        await resultUser.save().catch(err => {
            throw errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack);
        });

        /* make jwt */
        const newJwt = Jwt.sign({
                _id: resultUser._id,
                userId: resultUser.userId
            },
            JWT_SECRET, {
                expiresIn: JWT_EXP,
                issuer: JWT_ISS,
                subject: JWT_SUB,
                jwtid: 'origin'
            }
        );

        /* make jwt_refresh and save db */
        const newJwtRefresh = Jwt.sign({
            _id: resultUser._id,
            userId: resultUser.userId
        }, JWT_SECRET, {
            expiresIn: JWT_EXP_REFRESH,
            issuer: JWT_ISS,
            subject: JWT_SUB,
            jwtid: 'refresh'
        });

        await Refresh.findOneAndUpdate({
            userId: resultUser.userId
        }, {
            userId: resultUser.userId,
            refresh: newJwtRefresh
        }, {
            upsert: true
        }).catch(err => {
            throw errorSet.createError(errorSet.es.ERR_CRUDDB, err.stack);
        });

        var resObj = {
            jwt: newJwt,
            jwt_refresh: newJwtRefresh
        }

        next(resObj);

    } catch (err) {
        next(err);
    }

});

/**

    @api {get} /loginToken/refresh GetJWTRefresh
    @apiName GetJWTRefresh
    @apiGroup LoginToken
    @apiDescription
    RefreshToken 을 통해 AccessToken을 재발급 합니다.</br>
    서버에서 API를 요청하기 전에 항상 클라이언트에서 가진 JWT 의 유효성(만료여부)을</br>
    검증하고 만료되었을 경우 먼저 해당 요청을 통해 AccessToken(JWT)을 재발급 받습니다.</br></br>
    1. header 에 jwt_refresh(refresh token) 을 가져옴.</br>
    2. jwt_refresh verify</br>
    3. decoded.userId 와 jwt_refresh 가 일치하는 정보가 db에서 찾아야 함.</br>
    4. 모든 단계를 통과했다면 new jwt 발급.</br>

    @apiHeader {String} jwt_refresh RefreshToken 을 헤더에 넣어 요청
    @apiHeaderExample {form} 헤더 예제
    {
        jwt_refresh : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }

    @apiParam {null} No Parameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter/

    @apiSuccess {String}  jwt                   본 서버의 AccessToken, 주기는 5분이며,</br>
                                                클라이언트의 메모리영역에 보관해놓고 API 호출 시 헤더에 넣어 활용한다.</br>
    
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }

    @apiError NO_JWT_REFRESH 헤더에서 jwt_refresh 를 찾을 수 없습니다.
    @apiError ERR_CRUDDB 데이터베이스 CRUD 작업에 실패하였습니다.
    @apiError INVALID_JWT_REFRESH RefreshToken이 만료되었습니다. 이 경우 다시 로그인 하여 토큰을 발급받아야 합니다.
    @apiError NOT_JWT 요청 헤더에 AccessToken 이 들어왔습니다.</br>
              엑세스토큰을 갱신하기 위해서는 RefreshToken 이 필요합니다.

    @apiErrorExample 실패 : NO_JWT_REFRESH
    HTTP/1.1 401 Authentication
    {
        "name" : "NO_JWT_REFRESH",
        "message": "Please put JWT_REFRESH in your request header to refresh your token!",
        "status": 401
    }
    @apiErrorExample 실패 : ERR_CRUDDB
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "ERR_CRUDDB",
        "message": "Cannot CRUD your request in database!",
        "status": 500
    }
    @apiErrorExample 실패 : INVALID_JWT_REFRESH
    HTTP/1.1 401 Authentication
    {
        "name" : "INVALID_JWT_REFRESH",
        "message": "Your JWT_REFRESH is invalid!",
        "status": 401
    }
    @apiErrorExample 실패 : NOT_JWT
    HTTP/1.1 400 Authentication
    {
        "name" : "NOT_JWT",
        "message": "This is JWT AccessToken, to refresh JWT, you should request with RefreshToken",
        "status": 400
    }

*/
router.get('/refresh', async (req, res, next) => {

    try {

        /* 1. header request */
        var jwt_refresh = req.headers.jwt_refresh;
        if (!jwt_refresh || jwt_refresh == 'undefined') {
            throw (errorSet.createError(errorSet.es.NO_JWT_REFRESH, new Error().stack));
        }

        /* 2. jwt_refresh verify */
        var decoded = Jwt.verify(jwt_refresh, JWT_SECRET, {
            expiresIn: JWT_EXP_REFRESH,
            issuer: JWT_ISS,
            subject: JWT_SUB
        });
        if (decoded.jti != 'refresh') {
            /* refresh token이 아니라 accesstoken 임 */
            throw (errorSet.createError(errorSet.es.NOT_JWT, new Error().stack));
        }

        /* 3. find refresh in database */
        var refreshModel = await Refresh.findOne({
            userId: decoded.userId,
            refresh: jwt_refresh
        }).catch(err => {
            throw err;
        });
        if (!refreshModel) {
            throw (errorSet.createError(errorSet.es.INVALID_JWT_REFRESH, new Error().stack));
        }

        /* 4. new jwt */
        const newJwt = Jwt.sign({
                _id: decoded._id,
                userId: decoded.userId
            },
            JWT_SECRET, {
                expiresIn: JWT_EXP,
                issuer: JWT_ISS,
                subject: JWT_SUB,
                jwtid: 'origin'
            }
        );

        /* response */
        var resObj = {
            jwt: newJwt
        }

        next(resObj);

    } catch (err) {
        next(err);
    }

});

module.exports = router;