# MagicCalendar - Serverside

- URL						: http://169.56.98.117
- Application           : https://lab.hanium.or.kr/e-display-calendar/android
- TEST Application  : https://github.com/dfjung4254/E-ink-Display_android-application
- 테스트용 JWT 발급
  - (로컬테스트) : http://localhost/debug/webjwt
  - (운영테스트) : http://169.56.98.117/debug/webjwt



## About

- **This is for E-ink-display project organized by Hanium**
- **Mento :** 장기숭(IBM Korea)
- **Mentee :** 김지은(Leader, hardware), 정근화(server), 조수빈(server), 모영보(android), 류하영(android)





## API Specification

#### REST API : [Our API REFERENCE!](http://169.56.98.117/) <- apidoc 으로 이전

#### MQTT API : 작업중



## 개발 가이드

- IP : 169.56.98.117
- DB : user_auth 데이터베이스에서 show collections 로 확인



#### 로컬에서 개발하기

1. **깃랩 e-ink-display/server-side 레포지토리에서**

   **fork -> 깃랩 개인레포지토리에서 개발 후 MergeRequest 주세요**

```
// 개인레포지토리에 포크한 프로젝트에서 작업해주세요
$ git clone {your GitLab individual server-side repository url}

// dependency 모두 설치
$ npm install

// 관리자 권한에서 실행
$ sudo node ./bin/www
```

만약 새로운 npm module 을 설치할때 꼭 npm install **--save** 옵션을 붙여주세요.



2. **개발 이후 커밋**

```
$ git add .
$ git commit -m "커밋 메세지"
$ git push -u origin master
```



3. **개인 레포지토리 머지**
   - 깃랩 브라우저에서 레포지토리의 커밋사항을 확인합니다.
   - 깃랩 브라우저 좌측의 MergeRequest 에서 new MergeRequest
   - 개인레포지토리(포크)의 master 에서 프로젝트레포지토리(원본e-ink)의 master
   - assign 은 저(정근화)로 주세요!



4. **JWT 발급받기**
   - 로컬서버가 실행된 상태(node ./bin/www)
   - 브라우저에서 http://localhost/debug/webjwt 입력
   - JWT 발급 - 구글로그인 후 뜨는 페이지의 코드 값이 custom JWT 값
   - 해당 jwt는 로그인 한 구글 계정을 의미합니다.
   - 만약 처음 브라우저에서 구글로그인하시면 로컬DB의 users 에 본인 계정정보 추가됨.



#### 서버에서 실행 , 재실행

기존에 사용하던 forever 모듈을 사용하지 않고 linux screen 을 사용합니다.

https://linuxize.com/post/how-to-use-linux-screen/



- ##### 스크린 접근법

  - 우분투에서는 가상의 스크린을 생성하여 유지할 수 있습니다.

  - 가상의 스크린을 띄워서 그 위에서 서버를 run 하면

    ssh 세션에서 나가더라도 계속 서버가 돌아가게 됩니다.



- ##### 스크린 리스트 확인

```
$ screen -list

There is a screen on:

​    20570.server    (10/16/19 17:34:18) (Detached)

1 Socket in /var/run/screen/S-root.

--> 20570.server 라는 가상스크린을 생성해놓고 그 위에서 node 가 run 되고 있습니다.
```



- ##### 가상 스크린 이동

```
$ screen -r server

--> server 가상스크린으로 이동합니다. 아마 node 로그일부가 보일 겁니다.
```

- ##### server 스크린에서 서버 중단

  - server 스크린 상태에서 ctrl + c



- ##### server 임시 실행(로그를 텍스트로 남기지 않고 눈으로 확인)

```
(server 스크린 상태에서)
$ node ./bin/www

(node:30411) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:30411) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Express server listening on port 80
Connected to MongoDB server : user_auth
MQTT broker server connected : true

[콘솔화면에서 로그 실시간으로 확인 가능 - 텍스트로 저장은x 디버깅용]
```



- ##### server 항시 실행(리다이렉션을 사용해 로그를 log.txt 에 쌓음, 다른 작업 후 이 상황을 유지해놔야 함)

```
(server 스크린 상태에서)

$ node ./bin/www >> log.txt

(node:30411) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:30411) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.

[이 상태에서 log.txt 파일에 로그를 이어쓰기중임. 평상시 server스크린은 이상태를 유지]
```

- ##### 서버에서 실시간 log 확인
```
$ screen -r log

(로그가 꺼져 있을 시)
$ tail -f log.txt

(log screen 이 따로 있습니다.)
```


- ##### server 스크린에서 탈출

  - server/log 스크린 진입 상태(node 서버 running)에서 **ctrl + (shift) + a + d**



- ##### 현재 서버가 돌아가고 있는지 간단하게 확인하는 방법

  - 인터넷 브라우저에 들어가서 169.56.98.117 친다.
  - MagicCalendar API 페이지가 뜨면 서버가 돌아가고 있는 것.



- ##### APIDOC 변경 및 생성

```
$ apidoc -i routes/ -o docs/

{"message":"Please create an apidoc.json configuration file.","level":"warn"}
{"message":"Done.","level":"info"}

[doc/ 디렉토리에 api 문서를 위한 html 파일 등이 업데이트 됩니다.]
```

