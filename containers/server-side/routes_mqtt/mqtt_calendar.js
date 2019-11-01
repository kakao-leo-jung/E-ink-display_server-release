const responseTopic = "/hw/calendar";
/* TODO: Author : 정근화 */
/*

    HW 에서 mqtt를 통해 /server/calendar 로 들어온
    요청을 처리

    -> /hw/calendar 로 날씨 정보를 publish 한다.

*/
module.exports = (message, client) => {

    console.log("hw requested Weather! with message : " + message);
    client.publish(responseTopic, "calendar정보 반환");

};