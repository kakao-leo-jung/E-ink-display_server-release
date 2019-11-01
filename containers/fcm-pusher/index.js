var dbConnect = require('./dbConnect');
var alarm_pusher = require('./alarm_push');
var medicine_pusher = require('./medicine_push');

dbConnect('user_auth');
/* TODO: Author 정근화 */
/*

    Express 서버의 이벤트루프에 영향받지 않고
    따로 이벤트루프를 돌아야 더 정확한 시간 캐치가능.

    1. 초단위로 Interval 을 돌면서 현재 시간 확인
    2. 분이 바뀌었을 때를 캐치
    3. DB에 아직 push 되지 않았고 현재 시간보다 이전의 시간 -5분까지 조회
     - 5분까지만 조회하는 이유는 어떠한 오류에 따라서 DB에 push 완료처리까지 로직이
     - 돌아가지 않았을 때 FCM 을 발송해야 하는 데이터가 갈수록 증가하는 것을 방지.
     - 일정시간(5분)이 지날때 까지 FCM 발송이 되지 않았다면 그냥 버림
    4. 해당되는 DB 리스트 모두 FCM Push 발송
    5. 발송이 완료되었으면 DB 에 push 완료 처리

*/

const dayString = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
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
        console.log("Minute changed! Check DB to Push! [" + dayString[day] + " / " + curHours + " / " + curMinute + "]");

        /* target minute change */
        targetMinute = (targetMinute + 1) % 60;
        if (targetMinute == 0) {
            targetHour = (targetHour + 1) % 24;
        }

        /* push alarm */
        alarm_pusher(curHours, curMinute, day);

        /* push medicine */
        medicine_pusher(curHours, curMinute, day);

    }

}

setInterval(intervalFunc, 1000);