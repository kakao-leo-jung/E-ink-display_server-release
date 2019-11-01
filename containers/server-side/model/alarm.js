var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* TODO: Author : 정근화 */
/*
    스키마 구조
    userId(string)          : 유저 토큰 아이디 숫자 값(token 의 sub 값)
    title(string)           : 알람 제목
    hour(Number)            : 알람 시(00 - 23)
    minute(Number)          : 알람 분(00 - 59)
    ampm(string)            : 오전/오후, "AM", "PM" 값을 가지며 자동으로 세팅.
    day_selected(boolean[]) : 요일 선택여부
    isAlarmOn               : 알람 켜져 있는 여부

*/
var alarmScheme = new Schema({

    userId: String,
    title: String,
    hour: Number,
    minute: Number,
    ampm: String,
    day_selected: [Boolean],
    isAlarmOn: Boolean

});

module.exports = mongoose.model('alarm', alarmScheme);