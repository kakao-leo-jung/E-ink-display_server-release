var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* TODO: Author : 정근화 */
/*
    스키마 구조
    crawl_time(date)      : 뉴스를 크롤링 한 시간
    news_array([News])    : 뉴스를 담은 배열

    News 구조
    title(string)           : 뉴스 제목
    summary(string)         : 뉴스 요약
    contents(string)        : 뉴스 본문
    imageUrl(string)        : 뉴스 이미지 URL

*/

var newsScheme = new Schema({

    crawl_time: Date,    
    news_array: [Object]

});

module.exports = mongoose.model('new', newsScheme);