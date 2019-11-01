/* TODO: Author : 정근화 */

/*

    여기서 라우팅 한다.
    app.use('/원하는받을URL경로', 변수);

*/
module.exports = (app) => {

    /* 로그인 '/loginToken' 라우팅 */
    var login = require('../routes/login');
    app.use('/loginToken', login);

    /* JWT 디버깅웹 '/debug/webjwt' 라우팅 */
    var webjwt = require('../routes/webjwt');
    app.use('/debug/webjwt', webjwt);

    /* 유저 정보 '/users' 라우팅 */
    var users = require('../routes/users');
    app.use('/users', users);

    /* 달력 리스트 정보 '/calendarList' 라우팅 */
    var calendarList = require('../routes/calendarList');
    app.use('/calendarList', calendarList);

    /* 달력 정보 '/calendar' 라우팅 */
    var calendar = require('../routes/calendar');
    app.use('/calendar', calendar);

    /* Todo 정보 '/Todo' 라우팅 */
    var todo = require('../routes/todo');
    app.use('/todo', todo);

    /* News 정보 '/news' 라우팅 */
    var news = require('../routes/news');
    app.use('/news', news);

    /* Weather 정보 '/weather' 라우팅 */
    var weather = require('../routes/weather');
    app.use('/weather', weather);

    /* Alarm 정보 '/alarm' 라우팅 */
    var alarm = require('../routes/alarm');
    app.use('/alarm', alarm);

    /* Medicine 정보 '/medicine' 라우팅 */
    var medicine = require('../routes/medicine');
    app.use('/medicine',medicine)


}
