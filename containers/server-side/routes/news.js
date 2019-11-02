var express = require('express');
var router = express.Router();
var errorSet = require('../utill/errorSet');
var News = require('../model/news');

const NEWS_BASIC_COUNT = 5;

/* TODO: Author : 정근화 */
/* /news */

/**

    @api {get} /news?count=:count GetNews
    @apiName GetNews
    @apiGroup News
    @apiDescription
    headline-news-naver 모듈을 활용하여 서버는 계속에서 네이버 헤드라인뉴스 정보를 보관한다.</br>
    네이버 뉴스의 누적해서 추출한 헤드라인뉴스 정보를 반환한다.</br>
    MODULE INFO : https://github.com/dfjung4254/headline-news-naver</br>

    @apiHeader {null} NoHeader 필요한 헤더값 없음(jwt X)
    @apiHeaderExample {null} 헤더(x) 예제
    No JWT and other Header type

    @apiParam (query string) {String}  :count  불러올 뉴스정보의 개수를 적습니다. (기본 : 10)
    @apiParamExample {path} 파라미터(url) 예제
    http://169.56.98.117/news?count=5

    @apiSuccess {News[]}  news_array      JSONArray<News> 의 형태로 News 의 리스트를 가짐. 
    @apiSuccess {String}  url             뉴스 URL
    @apiSuccess {String}  title           뉴스 제목
    @apiSuccess {String}  summary         뉴스 소제목
    @apiSuccess {String}  contents        뉴스 본문
    @apiSuccess {String}  imgaeUrl        뉴스 섬네일 이미지 URL
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "news_array":
            [
                {
                    "url": "https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=102&oid=025&aid=0002949762",
                    "title": "총수 지분 높을수록 대기업 ‘내부 거래’ 많았다",
                    "summary": "SK 46조4000억원, 현대차 33조1000억원, 삼성 25조...",
                    "contents": "공정위 ‘대기업 내부거래 현황’199조원 중 10대 그룹이 151조원SK 46조원...",
                    "imageUrl": "https://imgnews.pstatic.net/image/025/2019/10/15/0002944698_001_20191015001220252.jpg"
                },
                {"title": "노벨경제학상 빈곤 퇴치 3인…바네르지·뒤플로는 부부", "summary": "2019년 노벨 경제학상은 빈곤 연구를 전문으로...",…},
                {"title": "황교안 “송구스럽다로 넘어갈 일 아니다” 홍익표 “개혁 마무리 못하고 사퇴 아쉽다”", "summary": "황교안 자유한국당...",…},
                {"title": "삼성SDI 2000억원 들여 ESS 화재 막는다", "summary": "삼성SDI가 또 불거진 에너지저장장치(ESS) 화재 논란에 선제적...",…},
                {"title": "남북축구 생중계 결국 무산…“평양 상부서 홍보말라 지시”", "summary": "15일 평양에서 열리는 카타르 월드컵 2차 예선 남북...",…}
            ]
    }

    @apiError FAILED_NEWS 서버에서 네이버뉴스DB를 가져오는데 실패했습니다.

    @apiErrorExample 실패 : FAILED_NEWS
    HTTP/1.1 500 Internal Server Error
    {
        "name" : "FAILED_NEWS",
        "message": "Failed to crawl naver headline news!",
        "status": 500
    }

*/
router.get('/', async (req, res, next) => {

    try {

        var newsCount = req.query.count || NEWS_BASIC_COUNT;
        var newsFindResults = await News.find().sort({
            crawl_time: -1
        }).limit(parseInt(newsCount)).catch(err => {
            throw errorSet.createError(errorSet.es.FAILED_NEWS, err.stack);
        });

        var resObj = new Object();
        var news_array = new Array();
        for(news of newsFindResults){
            var obj = {
                url: news.url,
                title: news.title,
                summary: news.summary,
                contents: news.contents,
                imageUrl: news.imageUrl
            }
            news_array.push(obj);
        }
        resObj.news_array = news_array;
        
        next(resObj);

    } catch (err) {
        next(err);
    }

});

module.exports = router;