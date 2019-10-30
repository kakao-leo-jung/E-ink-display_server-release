var fcm_admin = require('./fcm_pusher_admin');
var Medicine = require('./medicineModel');
var User = require('./userModel');

module.exports = async (curHours, curMinute) => {

    /* find db and get Token list */
    var query = {
        selected: true,
        hour: curHours,
        minute: curMinute
    };

    var pushMedicineList = await Medicine.find(query)
        .catch(err => {
            console.log(err);
        });

    console.log('pushMedicineList : ' + JSON.stringify(pushMedicineList));

    var pushInfo = new Object();
    var userIdArray = new Array();
    for (var medicine of pushMedicineList) {
        console.log('medicine : ' + JSON.stringify(medicine));
        pushInfo[medicine.userId] = {
            userId: medicine.userId,
            yakname: medicine.yakname,
            hour: medicine.hour,
            minute: medicine.minute
        }
        userIdArray.push(yakname.userId);
    }

    console.log('pushMedicineInfo(noToken) : ' + JSON.stringify(pushInfo));

    var pushUserList = await User.find({
        userId: userIdArray
    }).catch(err => {
        console.log(err);
    })

    for (var user of pushUserList) {
        pushInfo[user.userId].token = user.fcm_token;
    }

    /* fcm push */
    console.log('pushMedicineInfo : ' + JSON.stringify(pushInfo));
    var messageArray = new Array();
    for (var uid of userIdArray) {
        var pushObj = pushInfo[uid];
        var message = {
            data: {
                type: 'medicine',
                title: pushObj.yakname,
                hour: pushObj.hour,
                minute: pushObj.minute
            },
            token: pushObj.token
        };
        messageArray.push(message);
    }

    /* Error Catch 해야 함 - token 이 없을 수도 있음. */
    console.log('MedicineMessage : ' + JSON.stringify(messageArray));
    var messaging = fcm_admin.messaging();
    var response = await messaging.sendAll(messageArray)
        .catch(err => {
            console.log('Error sending message : ' + err);
        })

    console.log('Successfully sent message:', response);

};