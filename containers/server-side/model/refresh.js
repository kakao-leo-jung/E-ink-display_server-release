var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* TODO: Author : 정근화 */
/*

    커스텀 JWT 가 만료되었을 때 refresh token을
    같이 발급한다, refresh token을 발급할 때 DB에 저장해놓았다가

    커스텀 JWT 를 갱신할 때 해당 스키마에서 refresh token을 대조하여
    1차적으로 인증한다.

    refresh token 은 기본적으로 로그인 절차가 이루어 질 때 새로 발급된다.
    만약 다른 기기에서 로그인 하였다면 refresh token 이 갱신되었기 때문에
    커스텀 JWT 가 만료되면 refresh token 이 일치하지 않아 로그아웃 된다.

*/
/*

    스키마 구조
    userId(string)          : 유저 토큰 아이디 숫자 값(token 의 sub 값),primary 해야 함.
    refresh(string)         : 유저 refresh 토큰 값.

*/
var refreshSchema = new Schema({

    userId : {
        type: String,
        unique: true
    },
    refresh : String

});

module.exports = mongoose.model('refresh', refreshSchema);