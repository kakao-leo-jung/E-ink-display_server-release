const mqtt = require('mqtt');
const topic_weather = require('../routes_mqtt/mqtt_weather');
const topic_news = require('../routes_mqtt/mqtt_news');
const topic_calendar = require('../routes_mqtt/mqtt_calendar');
const topic_todo = require('../routes_mqtt/mqtt_todo');

const subscribe_connection = {
    host: process.env.MQTT_HOST,
    port: '1883',
}

const publish_connection = {
    host: 'mosquitto',
    port: 1883,
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

    const client_sub = mqtt.connect(subscribe_connection);
    const client_pub = mqtt.connect(publish_connection);

    client_sub.on("connect", () => {
        console.log("MQTT broker server connected : " + client_sub.connected);
        client_sub.subscribe(topic_subscribe_list, {qos : 1});
    });

    client_sub.on("error", (error) => {
        console.log("Can't connect" + error);
    });

    client_sub.on("message", (topic, message, packet) =>{
        /* routing */
        switch(topic){
            case topic_subscribe_list[0]:
                topic_weather(message, client_pub);
                break;
            case topic_subscribe_list[1]:
                topic_news(message, client_pub);
                break;
            case topic_subscribe_list[2]:
                topic_calendar(message, client_pub);
                break;
            case topic_subscribe_list[3]:
                topic_todo(message, client_pub);
                break;
            default:
                break;
        }

    });

}