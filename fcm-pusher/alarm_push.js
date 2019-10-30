var fcm_admin = require('./fcm_pusher_admin');
var Alarm = require('./alarmModel');
var User = require('./userModel');

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

    console.log('pushAlarmList : ' + JSON.stringify(pushAlarmList));

    var pushInfo = new Object();
    var userIdArray = new Array();
    for (var alarm of pushAlarmList) {
        console.log('alarm : ' + JSON.stringify(alarm));
        pushInfo[alarm.userId] = {
            userId: alarm.userId,
            title: alarm.title,
            hour: alarm.hour,
            minute: alarm.minute
        }
        userIdArray.push(alarm.userId);
    }

    console.log('pushAlarmInfo(noToken) : ' + JSON.stringify(pushInfo));

    var pushUserList = await User.find({
        userId: userIdArray
    }).catch(err => {
        console.log(err);
    })

    for (var user of pushUserList) {
        pushInfo[user.userId].token = user.fcm_token;
    }

    /* fcm push */
    console.log('pushAlarmInfo : ' + JSON.stringify(pushInfo));
    var messageArray = new Array();
    for (var uid of userIdArray) {
        var pushObj = pushInfo[uid];
        var message = {
            data: {
                type: 'alarm',
                title: pushObj.title,
                hour: pushObj.hour,
                minute: pushObj.minute
            },
            token: pushObj.token
        };
        messageArray.push(message);
    }

    /* Error Catch 해야 함 - token 이 없을 수도 있음. */
    console.log('AlarmMessage : ' + JSON.stringify(messageArray));
    var messaging = fcm_admin.messaging();
    var response = await messaging.sendAll(messageArray)
        .catch(err => {
            console.log('Error sending message : ' + err);
        });

    console.log('Successfully sent message:', response);

};