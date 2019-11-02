var headline = require('headline-news-naver');
var News = require('../model/newsModel');

/* New 개수를 DB에 저장 할 최대치 */
const MAX_DOCUMENTS = 10;

module.exports = async () => {

    /* TODO: 헤드라인 크롤러 에러발생 시 catch 해야함. */
    var newsObj = await headline.getNaverNews()
        .catch(err => {
            throw (errorSet.createError(errorSet.es.FAILED_NEWS, err.stack));
        });

    var newNewsCrawl = new News({
        crawl_time: new Date(),
        news_array: newsObj.news_array
    });

    var savedNews = await newNewsCrawl.save()
        .catch(err => {
            console.log(JSON.stringify(err));
        });

    console.log("News crawled save success at : " + savedNews.crawl_time);

    /* News 의 저장은 최대 10개 까지 가능 - 초과하면 오래된 News 부터 지운다 */
    var delDocuments = await News.find().sort({
        crawl_time: -1
    }).skip(MAX_DOCUMENTS).catch(err => {
        console.log(err);
    });

    var delDocIds = delDocuments.map(docs => {
        return docs._id;
    });

    console.log("Delete Target NewsId : " + JSON.stringify(delDocIds));

    await News.deleteMany({
        _id: {
            $in: delDocIds
        }
    }).catch(err => {
        console.log(err);
    });





}