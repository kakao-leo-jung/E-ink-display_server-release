const mqtt = require('mqtt');
const topic_weather = require('../routes_mqtt/mqtt_weather');
const topic_news = require('../routes_mqtt/mqtt_news');
const topic_calendar = require('../routes_mqtt/mqtt_calendar');
const topic_todo = require('../routes_mqtt/mqtt_todo');

const connectOptions = {
    host: '127.0.0.1',
    port: '1883',
}

/*

    FIXME: 임시 토픽 설정으로 하드웨어와 의논한 후 수정해야 함
    구독하는 것으로 요청 받는 경로를 설정.

*/
const topic_subscribe_list = [
    "/server/weather",
    "/server/news",
    "/server/calendar",
    "/server/todo",
];

/*

    MQTT broker 에 연결해주는 커스텀 mqtt 커넥션 모듈

*/
module.exports = () => {

    const client = mqtt.connect(connectOptions);

    client.on("connect", () => {
        console.log("MQTT broker server connected : " + client.connected);
        client.subscribe(topic_subscribe_list, {qos : 1});
    });

    client.on("error", (error) => {
        console.log("Can't connect" + error);
    });

    client.on("message", (topic, message, packet) =>{
        /* routing */
        switch(topic){
            case topic_subscribe_list[0]:
                topic_weather(message, client);
                break;
            case topic_subscribe_list[1]:
                topic_news(message, client);
                break;
            case topic_subscribe_list[2]:
                topic_calendar(message, client);
                break;
            case topic_subscribe_list[3]:
                topic_todo(message, client);
                break;
            default:
                break;
        }

    });

}