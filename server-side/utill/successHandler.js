/* TODO: Author : 정근화 */

/*

    LogHandler를 거쳐 SuccessHandler 또는 ErrorHandler 에서
    처리한다.

    SuccessHandler 에서 성공이면 response 하고
    에러이면 다음 errorHandler 로 넘김

*/

module.exports = (obj, req, res, next) => {
    if (obj instanceof Error) {
        /* 실패 일 때 errorHandler 처리 */
        next(obj);
    } else {
        /* 성공 일때 객체 응답 */
        res.status(200).json(obj);
    }
};