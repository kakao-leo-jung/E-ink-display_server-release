const Jwt = require('jsonwebtoken');
const config = require('/root/config/config');
const User = require('../model/user');
const {
    google
} = require('googleapis');
const util = require('util');
const errorSet = require('../utill/errorSet');

/* TODO: Author : 정근화 */

/*

    본 모듈은 커스텀 JWT 에 관한 처리를 담당한다.
    JWT 생성과 인증에 관한 작업을 처리한다.

*/

/* JWT 인증을 위한 secret 키 */
const JWT_SECRET = config.JWT_SECRET;
const JWT_EXP = config.JWT_EXP;
const JWT_ISS = config.JWT_ISS;
const JWT_SUB = config.JWT_SUB;

/* google API 호출을 위한 credential 인증 정보 */
const CLIENT_ID = config.WEB_CLIENT_ID;
const CLIENT_SECRET = config.WEB_CLIENT_SECRET;
const CLIENT_REDIRECT_URIS = config.WEB_REDIRECT_URIS;

/*

    Request 받은 헤더에서
    해당 JWT 토큰을 입증하고 디코딩 된 값에서
    userId 를 추출할 수 있다.

*/
exports.verifyJwt = (req) => {

    /* 헤더로 부터 JWT 를 수신한다. */
    var reqJwt = req.headers.jwt;

    if (!reqJwt) {
        throw (errorSet.createError(errorSet.es.NO_JWT, new Error().stack));
    }

    try {
        var decoded = Jwt.verify(reqJwt, JWT_SECRET, {
            /* verify options */
            expiresIn: JWT_EXP,
            issuer: JWT_ISS,
            subject: JWT_SUB
        });

        if(decoded.jti == 'refresh'){
            throw(errorSet.createError(errorSet.es.NOT_JWT_REFRESH, new Error().stack));
        }

        return decoded;
    } catch (err) {
        throw (errorSet.createError(errorSet.es.INVALID_JWT, err.stack));
    }

}

/*

    User DB 에서 user_id 를 사용하여 해당 유저의
    access_Token 을 반환한다.

*/
exports.getAuthCode = async (user_id) => {

    var resultUser = await User.findOne({
        userId: user_id
    }).catch(err => {
        throw (errorSet.createError(errorSet.es.NOUSER_DB, err.stack));
    });

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT_URIS);

    oAuth2Client.setCredentials(resultUser.tokens);

    await this.refreshToken(oAuth2Client, resultUser)
        .catch(err => {
            throw (errorSet.createError(errorSet.es.ERR_REFRESH, err.stack));
        });
    
    return {
        oAuth2Client: oAuth2Client,
        resultUser: resultUser
    };

}

/*

    Google token
    accessToken 은 기한이 만료된다.
    oAuthClient.on 으로 기한이 만료되면 다음 refreshToken 을
    보급한다. 이때 토큰을 DB 에 갱신하여 저장해준다.

    FIXME: Refresh 가 항시 작동하지 않아서 추후에 제대로 DB 에 갱신되는지 테스트 해봐야함.
    -> 테스트 확인함, 정상작동

    FIXME: 여기서 만약 ERR_REFRESH 오류가 발생한다면 google refreshtoken 이 만료된 것이므로
    아예 로그아웃 해야 함.

*/
exports.refreshToken = async (authClient, resultUser) => {

    console.log("Trying refreshToken User : " + resultUser.userId);

    authClient.on('tokens', async (tokens) => {

        var objToken = {
            access_token: tokens.access_token,
            refresh_token: resultUser.tokens.refresh_token,
            scope: tokens.scope,
            token_type: tokens.token_type,
            id_token: tokens.id_token,
            expiry_date: tokens.expiry_date
        };

        if (tokens.refresh_token) {
            objToken.refresh_token = tokens.refresh_token;
        }

        resultUser.tokens = objToken;
        resultUser = await resultUser.save();
        console.log("Updated User.tokens DB : " + resultUser.userId);

    });

}