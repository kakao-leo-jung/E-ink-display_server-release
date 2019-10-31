### 개발 가이드
ip          | 169.56.98.117
http port   | 80
인증 DB      | user_auth | collection = "users"

#### 로컬에서 개발하기
1. 깃랩 e-ink-display/server-side 레포지토리에서 fork -> 깃랩 개인레포지토리에서 개발 후 MergeRequest 주세요

$ git clone {your GitLab individual server-side repository url}
$ npm install // dependency 모두 설치
$ sudo node ./bin/www //관리자 권한에서 실행

만약 새로운 npm module 을 설치할때 꼭
npm install --save 옵션을 붙여주세요.

2. 개발 이후 커밋
$ git add .
$ git commit -m "커밋 메세지"
$ git push -u origin master

3. 개인 레포지토리 머지
- 깃랩 브라우저에서 레포지토리의 커밋사항을 확인합니다.
- 좌측의 MergeRequest 에서 new MergeRequest
- 개인레포지토리(포크)의 master 에서 프로젝트레포지토리(원본e-ink)의 master
- assign 은 저(정근화)로 주세요!

#### 서버에서 실행 , 재실행
forever 사용x -> screen 사용.
server-side 디렉토리 접근

##### 스크린 접근법
우분투에서는 가상의 스크린을 생성하여 유지할 수 있습니다.
가상의 스크린을 띄워서 그 위에서 서버를 run 하면
ssh 세션에서 나가더라도 계속 서버가 돌아가게 됩니다.

##### 스크린 리스트 확인
$ screen -list
There is a screen on:
	20570.server	(10/16/19 17:34:18)	(Detached)
1 Socket in /var/run/screen/S-root.

##### 20570.server
20570.server 라는 가상스크린을 생성해놓고 그 위에서 node 가 run 되고 있습니다.

$ screen -r server
--> server 가상스크린으로 이동합니다. 아마 node 로그일부가 보일 겁니다.

##### server 스크린에서 서버 중단
server 스크린 상태에서 ctrl + c

##### server 임시 실행(로그를 텍스트로 남기지 않고 눈으로 확인)
server 스크린 상태에서
$ node ./bin/www

##### server 항시 실행(리다이렉션을 사용해 로그를 log.txt 에 쌓음, 다른 작업 후 이 상황을 유지해놔야 함)
server 스크린 상태에서
$ node ./bin/www >> log.txt

##### server 스크린에서 탈출
server 스크린 상태(node 서버 running)에서 ctrl + (shift) + a + d

###### 현재 서버가 돌아가고 있는지 간단하게 확인하는 방법
인터넷 브라우저에 들어가서 169.56.98.117 친다.
MagicCalendar API 페이지가 뜨면 서버가 돌아가고 있는 것.

#### 서버 DB 접속
/* db 접속 */
$ mongo
/* 현재 db 확인 */
$ > db
/* 전체 db 확인 */
$ > show dbs
/* 현재 db 전환 */
$ > use user_auth
/* 현재 db 의 콜렉션 확인 */
$ > show collections
/* 현재 db 의 콜렉션의 하위 Document 확인 */
$ > db.users.find().pretty()

#### user_auth > user 콜렉션 구조
users -> 유저정보 보관
todos -> todo 정보 보관
alarms -> alarm 정보 보관

#### APIDOC 변경 및 생성
$ apidoc -i routes/ -o docs/