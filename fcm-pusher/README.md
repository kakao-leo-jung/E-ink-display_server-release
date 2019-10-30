# E-ink-Display_fcm-pusher
서버의 DB에서 매 분마다 알람과 투약 푸시를 보내야 할 

```

# auto build in docker hub
$ git push -u origin master

$ docker pull dfjung4254/e-ink-display_fcm-pusher
$ docker run -d -e "TZ=Asia/Seoul" --name fcm --add-host=db:172.17.0.1 -v /root/fcm_config:/root/fcm_config ${MY_IMAGE_ID}


```

