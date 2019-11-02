var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* TODO: Author : 정근화 */
/*
    스키마 구조
    url(url)                : 뉴스 URL
    title(string)           : 뉴스 제목
    summary(string)         : 뉴스 요약
    contents(string)        : 뉴스 본문
    imageUrl(string)        : 뉴스 이미지 URL
    crawl_time(Date)        : 뉴스 크롤링된 시간

*/

var newsScheme = new Schema({

    url: String,
    title: String,
    summary: String,
    contents: String,
    imageUrl: String,
    crawl_time: Date

});

module.exports = mongoose.model('new', newsScheme);