var express = require('express');
var router = express.Router();
var config = require('/root/config/config');
var request_promise = require('request-promise');
var authentication = require('../auth/authentication');
var errorSet = require('../utill/errorSet');

/* TODO: Author : 정근화 */
/* /weather */

const API_URI = config.OPENWEATHERMAP_API_URI;
const API_KEY = config.OPENWEATHERMAP_API_KEY;

/**

    @api {get} /weather/:latitude/:longitude GetWeatherInfo
    @apiName GetWeather
    @apiGroup Weather
    @apiDescription
    OpenWeatherMap API 를 호출하여 날씨 정보를 대신 호출하고 반환합니다.</br>
    안드로이드 어플리케이션에서 위도와 경도 값, 그리고 jwt를 통해 인증 절차를 거쳐야 합니다.</br>
    jwt 인증을 거치는 이유는 OpenWeatherMap free티어(분당 60회)를 사용하고 있는데</br>
    오픈소스로 공개할 경우 jwt 인증 없이 외부에서 무분별하게 호출이 가능하기 때문입니다.</br>

    @apiHeader {String} jwt 헤더에 JWT 토큰을 넣습니다.
    @apiHeaderExample {form} 헤더 예제
    {
        // retrofit2 : HashMap 에 key값은 "jwt", value값은 "eyJ..." 로 설정
        "jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM"
    }

    @apiParam {double} latitude 알고자 하는 날씨의 지역 위도 정보
    @apiParam {double} longitude 알고자 하는 날씨의 지역 경도 정보
    @apiParamExample {path} 파라미터(url) 예제
    URL : http://169.56.98.117/weather/37.564/127.001

    @apiSuccess {String}  city                  해당 위도, 경도의 도시 이름
    @apiSuccess {String}  weather               날씨 정보
    @apiSuccess {String}  weather_description   날씨 정보 설명
    @apiSuccess {double}  temperature           평균 온도(F)
    @apiSuccess {double}  temperature_max       최고 온도(F)
    @apiSuccess {double}  temperature_min       최저 온도(F)
    @apiSuccess {integer} pressure              기압
    @apiSuccess {integer} humidity              습도
    @apiSuccess {double}  wind_speed            풍속
    @apiSuccess {integer} clouds                운량
    @apiSuccessExample 성공 시 응답 :
    HTTP/1.1 200 OK
    {
        "city": "Kwanghŭi-dong",
        "weather": "Clouds",
        "weather_description": "overcast clouds",
        "temperature": 297.27,
        "temperature_max": 298.71,
        "temperature_min": 295.93,
        "pressure": 1019,
        "humidity": 51,
        "wind_speed": 0.45,
        "clouds": 100
    }

    @apiError NO_JWT JWT 가 헤더에 실려있지 않습니다.
    @apiError INVALID_JWT JWT 가 유효하지 않습니다.
    @apiError NOUSER_DB 해당 유저의 정보가 DB에서 찾을 수 없습니다.    
    @apiError NO_LONANDLAT 위도, 경도 좌표가 유효하지 않습니다.
    @apiError FAILED_OWM OpenWeatherMap 호출에 실패했습니다.

    @apiErrorExample 실패 : NO_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Please put JWT in your request header!",
        "status": 401
    }
    @apiErrorExample 실패 : INAVLID_JWT
    HTTP/1.1 401 Unauthorized
    {
        "message": "Your JWT is invalid!",
        "status": 401
    }
    @apiErrorExample 실패 : NOUSER_DB
    HTTP/1.1 500 Internal Server Error
    {
        "message": "Cannot find userId in database!",
        "status": 500
    }
    @apiErrorExample 실패 : NO_LONANDLAT
    HTTP/1.1 400 Bad Request
    {
        "message": "Please put latitude and longitude in your request parameter!",
        "status": 400
    }
    @apiErrorExample 실패 : FAILED_OWM
    HTTP/1.1 500 Bad Request
    {
        "message": "Failed to GET openweathermap!",
        "status": 500
    }

*/
router.get('/:latitude/:longitude', async (req, res, next) => {

    try {
        authentication.verifyJwt(req);

        var latitude = req.params.latitude;
        var longitude = req.params.longitude;

        if (!latitude || !longitude) {
            throw (errorSet.createError(errorSet.es.NO_LONANDLAT, new Error().stack));
        }

        /* weathermap 호출 */
        var reqOption = {
            uri: API_URI,
            // uri: "error 처리 테스트",
            qs: {
                appid: API_KEY,
                lat: latitude,
                lon: longitude
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        var responseData = await request_promise.get(reqOption)
            .catch(err => {
                /* weather 수신 실패 */
                throw (errorSet.createError(errorSet.es.FAILED_OWM, err.stack));
            });

        /* weather 수신 성공 */
        var resObj = {
            "city": responseData.name,
            "weather": responseData.weather[0].main,
            "weather_description": responseData.weather[0].description,
            "temperature": responseData.main.temp,
            "temperature_max": responseData.main.temp_max,
            "temperature_min": responseData.main.temp_min,
            "pressure": responseData.main.pressure,
            "humidity": responseData.main.humidity,
            "wind_speed": responseData.wind.speed,
            "clouds": responseData.clouds.all
        };

        next(resObj);

    } catch (err) {
        next(err);
    }

});

module.exports = router;