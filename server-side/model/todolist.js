var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* TODO: Author : 김수빈 */
/*
    스키마 구조
    userId(string)          : 유저 토큰 아이디 숫자 값(token 의 sub 값)
    title(string)           : ToDo Title
    selected(Boolean)       : Todo 선택
*/

var todoScheme = new Schema({

    userId: String,
    title: String,
    selected: Boolean,

});

module.exports = mongoose.model('todo', todoScheme);