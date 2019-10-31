const {
    google
} = require('googleapis');
var errorSet = require('./errorSet');

/* TODO: Author : 정근화 */
/*

    Google Calendar API 를 호출하여 대신 response 해주는 유틸 클래스.
    calendar.js 에서 호출받으면 현재 클래스의 함수를 활용하여 처리한다.

*/

/*

    현재 시간으로부터 다음 count개의 이벤트를 유저의 primary 달력에서 가져온다.

    Lists the next 10 events on the user's primary calendar.
    @param {google.auth.OAuth2} auth An authorized OAuth2 client.

*/
exports.listEvents = async (auth, calendarId, minDate, maxDate, maxCount) => {

    const calendar = google.calendar({
        version: 'v3',
        auth
    });

    var params = new Object();
    params.calendarId = calendarId;
    minDate ? params.timeMin = minDate.toISOString() : null;
    maxDate ? params.timeMax = maxDate.toISOString() : null;
    maxCount ? params.maxResults = maxCount : null;
    params.singleEvents = true;
    params.orderBy = 'startTime';
    params.timeZone = 'Asia/Seoul';

    var res = await calendar.events.list(params)
        .catch(err => {
            throw (errorSet.createError(errorSet.es.FAILED_GOOGLE, err.stack));
        });

    const events = res.data.items;

    return eventsToCustomObj(events);

}

/*

    요청받은 calendarBody 정보를 바탕으로
    google Calendar 에 insert 한다.

*/
exports.postEvents = async (authInfo, calendarId, calendarBody) => {

    var auth = authInfo.oAuth2Client;
    const calendar = google.calendar({
        version: 'v3',
        auth
    });

    var params = new Object();
    params.calendarId = calendarId;

    /* attendee self자신 추가 */
    if (calendarBody.people.length > 0) {
        calendarBody.people.push({
            "email": authInfo.resultUser.email,
            "responseStatus": "accepted"
        });
    }


    params.requestBody = {
        start: {
            dateTime: calendarBody.startTime
        },
        end: {
            dateTime: calendarBody.endTime
        },
        summary: calendarBody.title,
        description: calendarBody.memo,
        location: calendarBody.location,
        attendees: calendarBody.people
    };

    var res = await calendar.events.insert(params)
        .catch(err => {
            throw (errorSet.createError(errorSet.es.FAILED_GOOGLE, err.stack));
        });

    return eventToCustomObj(res.data);

};

/*

    요청받은 이벤트id 와 캘린더 정보를 바탕으로
    google calendar 에 내용을 수정한다.

*/
exports.putEvents = async (authInfo, calendarId, eventId, calendarBody) => {

    var auth = authInfo.oAuth2Client;
    const calendar = google.calendar({
        version: 'v3',
        auth
    });

    var params = new Object();
    params.calendarId = calendarId;
    params.eventId = eventId;
    params.requestBody = {
        start: {
            dateTime: calendarBody.startTime
        },
        end: {
            dateTime: calendarBody.endTime
        },
        summary: calendarBody.title,
        description: calendarBody.memo,
        location: calendarBody.location,
        attendees: calendarBody.people
    };

    var res = await calendar.events.update(params)
        .catch(err => {
            throw (errorSet.createError(errorSet.es.FAILED_GOOGLE, err.stack));
        });

    return eventToCustomObj(res.data);

};

/*

    요청받은 이벤트 id 값을 가진 google calendar
    이벤트를 삭제한다.

*/
exports.deleteEvents = async (authInfo, calendarId, eventId) => {

    var auth = authInfo.oAuth2Client;
    const calendar = google.calendar({
        version: 'v3',
        auth
    });

    var params = new Object();
    params.calendarId = calendarId;
    params.eventId = eventId;

    await calendar.events.delete(params)
        .catch(err => {
            throw (errorSet.createError(errorSet.es.FAILED_GOOGLE, err.stack));
        });

    var res = {
        message: "Calendar Event [" + eventId + "] delete Success!",
        status: 200
    }

    return res;

};

/*

    사용자의 캘린더 리스트들을 가져온다.
    리스트들을 캘린더[] 배열형태로 반환한다.

*/
exports.listCalendars = async (auth) => {
    const calendar = google.calendar('v3');

    var calendarList = await calendar.calendarList.list({
        auth: auth,
        maxResults: 10
    }).catch(err => {
        throw (errorSet.createError(errorSet.es.FAILED_GOOGLE, err.stack));
    });

    retObjArray = new Array();
    for (const curItem of calendarList.data.items) {

        var retObj = {
            _id: curItem.id,
            summary: curItem.summary,
            description: curItem.description,
            timeZone: curItem.timeZone,
            primary: curItem.primary
        }
        retObjArray.push(retObj);
    }

    return retObjArray;

}

/*

    사용자의 새로운 캘린더 리스트를 추가한다.
    추가한 리스트의 정보를 반환한다.

*/
exports.addCalendarList = async (auth, calendarListBody) => {

    const calendar = google.calendar({
        version: 'v3',
        auth
    });

    var params = new Object();

    params.requestBody = {
        summary: calendarListBody.summary,
        description: calendarListBody.description,
        timeZone: calendarListBody.timeZone
    }

    var res = await calendar.calendars.insert(params)
        .catch(err => {
            throw (errorSet.createError(errorSet.es.FAILED_GOOGLE, err.stack));
        });

    var retObj = {
        _id: res.data.id,
        summary: res.data.summary,
        description: res.data.description,
        timeZone: res.data.timeZone
    }

    return retObj;

}


/*

    events reference : https://developers.google.com/calendar/v3/reference/events#resource

    GoogleAPI 호출을 통해 받은 events 객체를
    안드로이드에서 알맞게 사용할 수 있도록 커스터마이징 객체로 바꾸어 리턴한다.
    @params _id       : String
    @params day       : Date
    @params title     : String
    @params memo      : String
    @params startTime : Date
    @params endTime   : Date
    @params location  : String
    @params people    : Attendees[]

*/
eventToCustomObj = (event) => {

    var obj = {
        _id: event.id,
        day: "",
        title: event.summary ? event.summary : "",
        memo: event.description ? event.description : "",
        startTime: event.start.date ? event.start.date : event.start.dateTime,
        endTime: event.end.date ? event.end.date : event.end.dateTime,
        location: event.location ? event.location : "",
        people: event.attendees ? event.attendees : [],
    }
    obj.day = new Date(obj.startTime).getDate();

    return obj;
}

eventsToCustomObj = (events) => {

    var retObjArr = new Array();
    for (var event of events) {
        retObjArr.push(eventToCustomObj(event));
    }
    return retObjArr;
};