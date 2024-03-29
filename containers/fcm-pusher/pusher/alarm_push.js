var fcm_admin = require('./fcm_pusher_admin');
var Alarm = require('../model/alarmModel');
var User = require('../model/userModel');

module.exports = async (curHours, curMinute, day) => {

    /* find db and get Token list */
    var query = {
        isAlarmOn: true,
        hour: curHours,
        minute: curMinute
    };
    var day_selected_query = "day_selected." + day;
    query[day_selected_query] = true;

    var pushAlarmList = await Alarm.find(query)
        .catch(err => {
            console.log(err);
        });

    var pushInfo = new Object();
    var userIdArray = new Array();
    for (var alarm of pushAlarmList) {
        pushInfo[alarm.userId] = {
            userId: alarm.userId,
            title: alarm.title,
            hour: alarm.hour,
            minute: alarm.minute
        }
        userIdArray.push(alarm.userId);
    }

    var pushUserList = await User.find({
        userId: userIdArray
    }).catch(err => {
        console.log(err);
    })

    for (var user of pushUserList) {
        pushInfo[user.userId].token = user.fcm_token;
    }

    /* fcm push */
    var messageArray = new Array();
    for (var uid of userIdArray) {
        var pushObj = pushInfo[uid];
        var message = {
            data: {
                type: 'alarm',
                title: pushObj.title,
                hour: String(pushObj.hour),
                minute: String(pushObj.minute)
            },
            token: pushObj.token
        };
        messageArray.push(message);
    }

    /* Error Catch 해야 함 - token 이 없을 수도 있음. */
    console.log('AlarmMessage : ' + JSON.stringify(messageArray));
    if(messageArray && messageArray.length){
        var messaging = fcm_admin.messaging();
        var response = await messaging.sendAll(messageArray)
            .catch(err => {
                console.log('Error sending message : ' + err);
            });
        console.log('Successfully sent message[' + new Date() + '] :' + response);
    }

};