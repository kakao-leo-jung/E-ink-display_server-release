var dbConnect = require('./connect/dbConnect');
var newsCrawler = require('./crawler/news');

dbConnect('user_auth');
/* TODO: Author 정근화 */
/*

    Express 서버의 이벤트루프에 영향받지 않고
    따로 이벤트루프를 돌아야 더 정확한 시간 캐치가능.

    매 PERIOD_MINUTE 분 주기로 뉴스정보를 수집 - DB에 업데이트 해놓는다.

    TODO: 차후에 RSS 피드를 통한 뉴스 수집 앱으로 전환.

*/

/* 주기 설정 */
const PERIOD_MINUTE = 1;

const initialDate = new Date();
var targetMinute = initialDate.getMinutes() + 1;
var targetHour = initialDate.getHours();

intervalFunc = async () => {

    /* get current time */
    const now = new Date();

    /* get current day */
    const day = now.getDay();
    const curMinute = now.getMinutes();
    const curHours = now.getHours();

    /* catch minute changed */
    if (curMinute == targetMinute && curHours == targetHour) {

        /* target minute change */
        targetMinute = (targetMinute + 1) % 60;
        if (targetMinute == 0) {
            targetHour = (targetHour + 1) % 24;
        }

        /* if current time corrects minute period, go crawling */
        if(curMinute % PERIOD_MINUTE == 0){
            newsCrawler();
        }

    }

}

setInterval(intervalFunc, 1000);