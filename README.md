# MagicCalendar : server-release
- URL : http://169.56.98.117
- Application : (private) https://lab.hanium.or.kr/e-display-calendar/android
- Test Application : https://github.com/dfjung4254/E-ink-Display_android-application
- 테스트용 JWT 발급( /debug/webjwt)
  - (로컬테스트) http://localhost/debug/webjwt

</br>

본 레포지토리는
1. 개발환경과 **배포환경**을 통일
2. 원래 개발 중이던 **메인 앱**(Express.js) 외에 **알람 메시지 푸셔**와 **뉴스 크롤러 앱**도 병행 배포
3. **스케일아웃(Scale-out)** 고려

의 목적을 위해 기존 개발중이던 [server-side repository](https://github.com/dfjung4254/E-ink-Display_server-side) 와 [fcm-pusher repository](https://github.com/dfjung4254/E-ink-display_Fcm-pusher) 와 새로운 앱을 합쳐 도커라이징(Dockerizing) 한 배포 환경입니다.

**만약 윈도우에서 Docker 환경에서 개발 및 테스트가 안될 시, 기존 [repo](https://lab.hanium.or.kr/e-display-calendar/server-side) 에서 계속 작업하시고 MergeRequest 주시면 됩니다**

**궁금한거 있으시면 저(근화) 한테 연락주세요**

</br>

## About
**This is for E-ink-display project organized by Hanium**
- **Mento** : 장기숭(IBM Korea)
- **Mentee** : 김지은(Leader, hardware), 정근화(server), 조수빈(server), 류하영(android), 모영보(android)

</br>

## API Specification
#### REST API : [Our API REFERENCE!](http://169.56.98.117) <- apidoc 으로 이전
#### MQTT API : 작업중

</br>

## Server System Map
![system map](server-map.png)
**Server System Map using docker-compose.yml**</br>
Docker-compose 를 통해 배포된 서버 구조입니다.
</br>

- **REST API 통신 (모바일 -> 서버 -> 모바일)**
  - **Basic** : 모바일(`Android`) --> 웹서버(`Nginx`) --> Express-n(`Nodejs`)
  - **CRUD** : 모바일(`Android`) --> 웹서버(`Nginx`) --> Express-n(`Nodejs`) --> DB(`Mongodb`)
  - **OpenAPI** : 모바일(`Android`) --> 웹서버(`Nginx`) --> Express-n(`Nodejs`) --> 외부API(`OpenWeatherMap`)
  - **API with OAuth2** : 모바일(`Android`) --> 웹서버(`Nginx`) --> Express-n(`Nodejs`) --> DB(`Mongodb`) --> 외부API(`GoogleCalendarAPI`)

- **MQTT 통신 (하드웨어 -> 서버 -> 하드웨어)**
  - **Basic** : 하드웨어(`Raspberry`) --> 웹서버(`Nginx`) --> Mqttbroker-n(`Mosquitto`) --> Express-n(`Nodejs`) --> Mqttbroker0(`Mosquitto`)
  - **CRUD, API** : REST API 통신과 같이 Express-n 에서 처리
  
- **모바일에서 하드웨어 제어 - REST API + MQTT (모바일 -> 서버 -> 하드웨어)**
  - **Basic** : 모바일(`Android`) --> 웹서버(`Nginx`) --> Express-n(`Nodejs`) --> Mqttbroker0(`Mosquitto`)

### External Ports
- **21** : FTP
```
// config 설정 값 옮길 때 사용합니다.
// Github 상에 여러 api 키값이나 config 값을 올릴 수 없기 때문에 ftp로 전송
$ ftp 169.56.98.117
```
- **80** : REST API 호출
```
// cURL 예제
$ curl -X GET \
  'http://169.56.98.117/news?count=20' \
  -H 'Cache-Control: no-cache' \
```
- **443** : REST API 호출(작업예정)
- **1883** : MQTT publish - `요청`
```
// Mosquitto client - publish 요청 예제
$ mosquitto_pub -h 169.56.98.117 \
> -p 1883 \
> -t /server/weather \
> -m "{jwt: exjeO...}"
```
- **1884** : MQTT subscribe - `수신`
```
// Mosquitto client - subscribe 수신 예제
$ mosquitto_sub -h 169.56.98.117 -p 1884 -t /server/weather

{
    날씨정보 반환
}
```

## Developer Guide
### Directory tree
```
// Lv 3 까지의 디렉토리 구조
$ tree -d -L 3
.
├── References
├── conf
│   └── proxy
│       └── conf.d
├── config
├── containers
│   ├── fcm-pusher
│   │   ├── connect
│   │   ├── model
│   │   ├── node_modules
│   │   └── pusher
│   ├── news-crawler
│   │   ├── connect
│   │   ├── crawler
│   │   ├── model
│   │   └── node_modules
│   └── server-side
│       ├── auth
│       ├── bin
│       ├── connect
│       ├── docs
│       ├── model
│       ├── node_modules
│       ├── public
│       ├── routes
│       ├── routes_mqtt
│       └── utill
└── docker
    └── data
        ├── diagnostic.data
        └── journal

```
- **./References** : 구현 중 참고 레퍼런스를 보관합니다.
  
- **./conf** : Docker 에서 실행하는 컨테이너의 설정 파일 -volume 공유 형식으로 운용합니다.
  - **proxy** : Nginx의 설정 값 저장 폴더입니다.
    - **conf.d** : `express.conf`, `mqtt.conf` 파일에서 각 앱의 로드밸런서 설정 값을 정의합니다.
  - **ginx.conf** : Nginx 의 메인 설정 파일입니다.
- **./config** : 보안상 깃헙에 올려지지 않은 **`config.js`** 와 **`magic_config.json`** 파일을 보관해야 합니다. `docker-compose.yml` 을 확인해보시면 각 Nodejs 앱을 실행할 때 ./config/ 의 디렉토리 -volume을 공유합니다.
- **./containers** : 개발한 각 Nodejs 앱을 보관하는 디렉토리입니다.
  - **fcm-pusher** : 매 분마다 알람 푸시가 필요한 계정을 조회하고 등록된 기기로 FCM 서버에 푸시를 요청하는 앱입니다.
  - **news-crawler** : 일정 시간마다 뉴스정보를 크롤링하고 DB에 업데이트하는 앱입니다.
  - **server-side** : 메인 개발 앱, [server-side repository](https://github.com/dfjung4254/E-ink-Display_server-side)
    - Nginx를 통해 들어온 http 요청을 Express.js 프레임워크를 통해 처리합니다.
    - `docker-compose.yml` 에서는 `api-express1` 이런 식으로 정의합니다.
    - `사용자 인증`, `DB 조회`, `외부API(Google OAuth2)` 를 호출합니다.
    - 각 api-express 앱은 같은 번호의 mqtt broker 컨테이너를 `subscribe` 합니다.
      - `api-express1 -- api-mosquitto1`
      - `api-express2 -- api-mosquitto2`
    - 구독한 broker 서버에서 메시지가 오면 토픽에 따라 처리하고 Proxy 역할을 하는 mosquitto 서버에 `publish` 합니다.
- **./docker** : Docker 컨테이너를 구동하면서 발생하는 데이터를 저장합니다.
  - **data** : `mongodb` 를 실행하며 생성된 데이터를 -volume 을 통해 보관합니다.

</br>

### Install
본 환경은 리눅스(Ubuntu 18.04) 에서 Docker 기반으로 개발하였습니다.</br>
윈도우와는 Docker 환경이 다를 수 있으니 아래 명령어들을 기반으로 **`Docker for windows`** 를 기반으로 테스트 해보세요.
</br>
1. **Clone Repository, Commit and Push**
- Git 관리는 메인 레포지토리를 fork 하여 개발한 후 Merge Request 해주시면 됩니다.
```
// 원본 레포지토리 기준 클론
$ git clone https://lab.hanium.or.kr/e-display-calendar/E-ink-display_server-release.git
// 포크 레포지토리 remote 등록
$ git remote add mystream https://github.com/포크한 개인 레포지토리/E-ink-display_server-release.git

// 개발 후 --> fork 한 레포지토리에 push 합니다. (origin 바로 push x)
$ git add .
$ git commit -m "write commit message!"
$ git push -u mystream master
> 깃랩 페이지에서 MergeRequest : 개인레포지토리 : master --> 메인레포지토리 : master

// 원본 레포지토리에서 pull
$ git pull origin master
```
2. **Install Docker and Docker-compose**
- Docker 와 Docker-compose 환경은 OS에 따라 다를 수 있습니다.
```
// 레퍼런스 참고
// 윈도우 설치 : https://docs.docker.com/docker-for-windows/install/
// Docker-compose : https://docs.docker.com/compose/install/

// Linux - install docker
$ curl -fsSL https://get.docker.com/ | sudo sh
$ sudo usermod -aG docker $USER
$ docker version // 설치확인

// Linux - install docker-compose
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
$ docker-compose --version // 설치확인
```
3. **Copy configs in project directory**
- config 파일은 보안상 Github에 올리지 않았습니다.
- 본 레포지토리 디렉토리의 `config/` 폴더에 `config.js` 와 `magic_config.json` 파일을 붙여넣으세요.

4. **Build and Run**
- `docker-compose.yml` 의 내용에 따라 각 컨테이너들을 순차적으로 빌드하고 run 합니다.
```
// 빌드 후 실행, 로그를 확인하지 않고 background 에서 실행 시 -d 옵션 추가
$ docker-compose up --build

// Log 확인, 실시간 로그 흐름 확인 시 -f 옵션 추가
$ docker-compose logs

// Docker containers 확인
$ docker-compose ps
```

</br>

### Running Containers
- 자세한 컨테이너 정보는 `docker-compose.yml` 와 `server-map.png` 구성도를 확인하세요.
- 현재 총 9개의 컨테이너를 사용 중.
</br>

|Container Name|Container Image|Description|
|:------:|:------:|:------:|
|**`nginx`**|nginx:1.17.5|웹서버 및 Reverse proxy 용도|
|**`db`**|mongo:4.2.1|데이터베이스|
|**`fcm`**|./container/fcm-pusher|알람 및 투약 메세지 푸시|
|**`news-crawler`**|./containers/news-crawler|뉴스 크롤러|
|**`mosquitto`**|eclipse-mosquitto:1.6.7|중계용 mqtt broker, port : 1884</br> 하드웨어는 1884포트로 본 브로커서버를 구독합니다.</br> 각 express 앱에서는 본 브로커서버를 발행하여 하드웨어에 메시지를 전달합니다.|
|**`api-server1`**|./containers/server-side|Express 서버1, Http 요청과 mqtt 요청을 처리합니다.|
|**`api-mosquitto1`**|eclipse-mosquitto:1.6.7|Express 서버1 과 연결된 수신용 mqtt broker </br> Express 서버1은 Nginx에 의해 분산 처리된 본 브로커를 구독 함으로써 하드웨어의 요청을 감지합니다.|
|**`api-server2`**|./containers/server-side|Express 서버2, Http 요청과 mqtt 요청을 처리합니다.|
|**`api-mosquitto2`**|eclipse-mosquitto:1.6.7|Express 서버2 과 연결된 수신용 mqtt broker </br> Express 서버2은 Nginx에 의해 분산 처리된 본 브로커를 구독 함으로써 하드웨어의 요청을 감지합니다.|

`api-server` 와 `api-mosquitto` 는 한 세트로 작동하며 scalable 합니다.</br>
`Healthcheck` 와 **backup server** 는 구현 예정입니다. 

</br>

### Developing and Testing Rest API Guide
*작성예정목록*
- 테스트용 웹 JsonWebToken 발급
- `Jwt` 인증 절차
- Log Handling 구조 및 `errorset` catch
- apidoc 문서화

### Developing Mqtt API Guide
*작성예정목록*
- mqtt 처리흐름 설명
- Log Handling
- 하드웨어-안드로이드(구글계정) 간 인증절차
