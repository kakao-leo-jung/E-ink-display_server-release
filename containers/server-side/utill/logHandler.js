var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

/* TODO: Author : 정근화 */

/*

    LogHandler를 거쳐 SuccessHandler 또는 ErrorHandler 에서
    처리한다.

    로그 핸들러에서 에러와 정상을 분기하여 로그하고 처리.

*/

module.exports = (obj, req, res, next) => {

    if (obj instanceof Error) {
        /* 실패 일 때 로그 반환 */
        console.log('\n\x1b[31m%s', '\n[ERROR!][' + new Date() + ']');
        console.log('%s\x1b[0m', ' : (' + obj.name + ')' + obj.message + '\n');
        console.log(obj.stack);
        next(obj);
    } else {
        /* 성공 일때 로그 반환 */
        console.log('\n\x1b[36m%s', '\n[OK!][' + new Date() + ']');
        console.log('%s\x1b[0m', ' : ' + JSON.stringify(obj, null, 2) + '\n');
        next(obj);
    }
};