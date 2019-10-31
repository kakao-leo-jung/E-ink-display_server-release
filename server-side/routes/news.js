var express = require('express');
var router = express.Router();
var headline = require('headline-news-naver');
var errorSet = require('../utill/errorSet');

/* TODO: Author : 정근화 */
/* /news */

/*

    TODO: 
    요청이 들어왔을 때 크롤링 하고 리턴하는 방식은
    지연율이 높음. 서버에서 주기적(예, 1분마다)으로
    headline-news-naver 를 실행시켜 파일을 가지고 있다가
    요청 시 바로 해당 파일을 리턴하는 방식으로 구현해 볼 것.

*/


/**

    @api {get} /news GetNews
    @apiName GetNews
    @apiGroup News
    @apiDescription
    headline-news-naver 모듈을 활용하여</br>
    네이버 뉴스의 헤드라인뉴스 5개를 추출 및 반환한다.</br>
    MODULE INFO : https://github.com/dfjung4254/headline-news-naver</br>

    @apiHeader {null} NoHeader 필요한 헤더값 없음(jwt X)
    @apiHeaderExample {null} 헤더(x) 예제
    No JWT and other Header type

    @apiParam {null} NoParameter 요청 파라미터 없음.
    @apiParamExample {null} 파라미터(x) 예제
    No Parameter

    @apiSuccess {News[]}  news_array      JSONArray<News> 의 형태로 News 의 리스트를 가짐. 
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

    @apiError FAILED_NEWS 서버에서 네이버뉴스를 크롤링하는데 실패했습니다.

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
        var resObj = await getNews();
        next(resObj);
    } catch (err) {
        next(err);
    }

});

async function getNews() {

    /* FIXME: 만약 headline 모듈에서 예외처리 섬세하게 */
    /* TODO: 헤드라인 크롤러 에러발생 시 catch 해야함. */
    var newsObj = await headline.getNaverNews()
        .catch(err => {
            throw (errorSet.createError(errorSet.es.FAILED_NEWS, err.stack));
        });

    return newsObj;
}

module.exports = router;