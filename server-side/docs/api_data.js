define({ "api": [
  {
    "type": "delete",
    "url": "/alarm/:_id",
    "title": "DeleteAlarm",
    "name": "DeleteAlarm",
    "group": "Alarm",
    "description": "<p>유저의 알람정보를 삭제합니다. </br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>알람의 id 값, /alarm/:_id 로 해당 알람의 put, delete 를 호출합니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>삭제 성공 메세지</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>삭제 성공 상태 200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Alarm delete success!\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/alarm.js",
    "groupTitle": "Alarm"
  },
  {
    "type": "get",
    "url": "/alarm",
    "title": "GetAlarm",
    "name": "GetAlarm",
    "group": "Alarm",
    "description": "<p>유저의 알람 리스트를 배열로 받아옵니다.</br> Call &lt;List<Alarm>&gt; 형식으로 자바에서 retrofit 인터페이스를 구축할 수 있습니다. 서버에서 시간을 체크 한 뒤 isAlarmOn 이 켜있는 상태에서 해당 시간에 푸시를 줍니다.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>해당 알람의 고유 id값, put, delete 호출 때 사용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>알람 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람 시, 범위는 0~23.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람 분, 범위는 0~59.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ampm",
            "description": "<p>오전/오후 여부를 &quot;AM&quot;, &quot;PM&quot; 으로 나타냅니다.</br> ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br></p>"
          },
          {
            "group": "Success 200",
            "type": "boolean[]",
            "optional": false,
            "field": "day_selected",
            "description": "<p>각 요일에 알람이 on 상태인지 여부를 나타냅니다</br> 배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br></p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isAlarmOn",
            "description": "<p>현재 알람이 켜져있는지 여부를 나타냅니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5da6bee89d02807cd9288a5a\",\n        \"title\": \"알람테스트0\",\n        \"hour\": 23,\n        \"minute\": 0,\n        \"ampm\": \"PM\",\n        \"day_selected\":[true, false, false, false, true, true, false],\n        \"isAlarmOn\": true\n    },\n    {\n        \"_id\": \"5da6bf319d02807cd9288a5d\",\n        \"title\": \"알람테스트1\",\n        \"hour\": 23,\n        \"minute\": 59,\n        \"ampm\": \"PM\",\n        \"day_selected\":[false, false, false, false, true, true, false],\n        \"isAlarmOn\": false\n    },\n    {\n        \"_id\": \"5da6bf429d02807cd9288a5e\",\n        \"title\": \"알람테스트2\",\n        \"hour\": 0,\n        \"minute\": 1,\n        \"ampm\": \"AM\",\n        \"day_selected\":[false, false, false, false, true, true, false],\n        \"isAlarmOn\": true\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/alarm.js",
    "groupTitle": "Alarm"
  },
  {
    "type": "post",
    "url": "/alarm",
    "title": "InsertAlarm",
    "name": "InsertAlarm",
    "group": "Alarm",
    "description": "<p>유저의 알람을 추가합니다. </br> 알람이 등록되면 등록된 요일(day_selected[] = true) 의 hour, minute 에 푸시를 받을 수 있습니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>알람 제목</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람 시, 범위는 0~23</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람 분, 범위는 0~59</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean[]",
            "optional": false,
            "field": "day_selected",
            "description": "<p>각 요일에 알람여부를 뜻합니다. 배열의 사이즈는 반드시 7이여야 하고</br> [0 - 6] 까지의 인덱스는 각각 [일, 월, 화, 수, 목, 금, 토]을 나타냅니다</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"title\": \"알람테스트3\",\n    \"hour\":11,\n    \"minute\":45,\n    \"day_selected\":[true, true, false, false, true, true, false],\n    \"isAlarmOn\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isAlarmOn",
            "description": "<p>현재 알람이 켜져있는지 여부를 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>해당 알람의 고유 id값, put, delete 호출 때 사용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>알람 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람 시, 범위는 0~23.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람 분, 범위는 0~59.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ampm",
            "description": "<p>오전/오후 여부를 &quot;AM&quot;, &quot;PM&quot; 으로 나타냅니다.</br> ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br></p>"
          },
          {
            "group": "Success 200",
            "type": "boolean[]",
            "optional": false,
            "field": "day_selected",
            "description": "<p>각 요일에 알람이 on 상태인지 여부를 나타냅니다</br> 배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5da6c1fea3c4697d4765b6b7\",\n    \"title\": \"알람테스트3\",\n    \"hour\": 11,\n    \"minute\": 45,\n    \"ampm\": \"AM\",\n    \"day_selected\":[true, true, false, false, true, true, false],\n    \"isAlarmOn\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_TIME",
            "description": "<p>시간 값이 유효하지 않습니다 hour(0-23), minute(0-59)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LENGTH_ARRAY",
            "description": "<p>day_selected 배열의 사이즈가 7이 아닙니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_TIME",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"INVALID_TIME\",\n    \"message\": \"You input invalide hour or minute, please check range of your request hour(0-23) and minute(0-59)!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : LENGTH_ARRAY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"LENGTH_ARRAY\",\n    \"message\": \"Your request day_selected[] array size is not 7.\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/alarm.js",
    "groupTitle": "Alarm"
  },
  {
    "type": "put",
    "url": "/alarm/:_id",
    "title": "UpdateAlarm",
    "name": "UpdateAlarm",
    "group": "Alarm",
    "description": "<p>유저의 알람정보를 수정합니다. </br> 알람이 수정되면 수정된 요일(day_selected[] = true) 의 hour, minute 에 푸시를 받을 수 있습니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>알람의 id 값, /alarm/:_id 로 해당 알람의 put, delete 를 호출합니다.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>알람 제목</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람 시, 범위는 0~23</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람 분, 범위는 0~59</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean[]",
            "optional": false,
            "field": "day_selected",
            "description": "<p>각 요일에 알람여부를 뜻합니다. 배열의 사이즈는 반드시 7이여야 하고</br> [0 - 6] 까지의 인덱스는 각각 [일, 월, 화, 수, 목, 금, 토]을 나타냅니다</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"title\": \"알람테스트3 - modified\",\n    \"hour\":10,\n    \"minute\":20,\n    \"day_selected\":[true, true, false, true, false, false, true],\n    \"isAlarmOn\": true\n}",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isAlarmOn",
            "description": "<p>현재 알람이 켜져있는지 여부를 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>해당 알람의 고유 id값, put, delete 호출 때 사용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>알람 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람 시, 범위는 0~23.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람 분, 범위는 0~59.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ampm",
            "description": "<p>오전/오후 여부를 &quot;AM&quot;, &quot;PM&quot; 으로 나타냅니다.</br> ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br></p>"
          },
          {
            "group": "Success 200",
            "type": "boolean[]",
            "optional": false,
            "field": "day_selected",
            "description": "<p>각 요일에 알람이 on 상태인지 여부를 나타냅니다</br> 배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5da6bee89d02807cd9288a5a\",\n    \"title\": \"알람테스트3 - modified\",\n    \"hour\": 10,\n    \"minute\": 20,\n    \"ampm\": \"AM\",\n    \"day_selected\":[true, true, false, true, false, false, true],\n    \"isAlarmOn\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_TIME",
            "description": "<p>시간 값이 유효하지 않습니다 hour(0-23), minute(0-59)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LENGTH_ARRAY",
            "description": "<p>day_selected 배열의 사이즈가 7이 아닙니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_TIME",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"INVALID_TIME\",\n    \"message\": \"You input invalide hour or minute, please check range of your request hour(0-23) and minute(0-59)!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : LENGTH_ARRAY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"LENGTH_ARRAY\",\n    \"message\": \"Your request day_selected[] array size is not 7.\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/alarm.js",
    "groupTitle": "Alarm"
  },
  {
    "type": "put",
    "url": "/alarm/onoff/:_id",
    "title": "UpdateAlarmOnoff",
    "name": "UpdateAlarmOnoff",
    "group": "Alarm",
    "description": "<p>유저의 알람정보의 ON/OFF 정보만 수정합니다. </br> 알람이 ON 상태여야만 요일(day_selected[] = true) 의 hour, minute 에 푸시를 받을 수 있습니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>알람의 id 값, /alarm/:_id 로 해당 알람의 put, delete 를 호출합니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"isAlarmOn\": true\n}",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isAlarmOn",
            "description": "<p>현재 알람이 켜져있는지 여부를 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>해당 알람의 고유 id값, put, delete 호출 때 사용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>알람 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람 시, 범위는 0~23.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람 분, 범위는 0~59.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ampm",
            "description": "<p>오전/오후 여부를 &quot;AM&quot;, &quot;PM&quot; 으로 나타냅니다.</br> ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br></p>"
          },
          {
            "group": "Success 200",
            "type": "boolean[]",
            "optional": false,
            "field": "day_selected",
            "description": "<p>각 요일에 알람이 on 상태인지 여부를 나타냅니다</br> 배열의 사이즈는 7이며 [0-6] 인덱스는 [일, 월, 화, 수, 목, 금, 토] 을 표시합니다.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5da6bee89d02807cd9288a5a\",\n    \"title\": \"알람테스트3 - modified\",\n    \"hour\": 10,\n    \"minute\": 20,\n    \"ampm\": \"AM\",\n    \"day_selected\":[true, true, false, true, false, false, true],\n    \"isAlarmOn\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_TIME",
            "description": "<p>시간 값이 유효하지 않습니다 hour(0-23), minute(0-59)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LENGTH_ARRAY",
            "description": "<p>day_selected 배열의 사이즈가 7이 아닙니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/alarm.js",
    "groupTitle": "Alarm"
  },
  {
    "type": "delete",
    "url": "/calendar/:_id?calendarId=:calendarId",
    "title": "DeleteCalendar",
    "name": "DeleteCalendar",
    "group": "Calendar",
    "description": "<p>기존의 캘린더 일정을 삭제합니다.</br></p> <pre><code>_id 값은 GET 을 통해 넘어온 calendar 의 _id 값이며,&lt;/br&gt; URL 을 통해 삭제하고자 하는 특정 calendar 일정을 지정할 수 있습니다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "query string": [
          {
            "group": "query string",
            "type": "String",
            "optional": false,
            "field": ":calendarId",
            "description": "<p>불러올 캘린더의 id 를 적습니다. (기본 : primary)</p>"
          }
        ],
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL 의 path 에 올려야 하는 해당 일정의 고유번호입니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/calendar/b25dtstnmhjk4rploc5gl2vvks?l8162nkuj54205lks5fmkotqtk@group.calendar.google.com",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>캘린더 삭제에 성공 메세지가 담겨있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>캘린더 삭제 api 통신 상태는 200 입니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Calendar Event [b25dtstnmhjk4rploc5gl2vvks] delete Success!\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/calendar/certainday/:year/:month/:day?calendarId=:calendarId",
    "title": "GetCertainDay",
    "name": "GetCertainDay",
    "group": "Calendar",
    "description": "<p>요청받은 년(yyyy), 월(mm), 일(dd) 에 따라 해당 일에 등록된 일정들을 리턴합니다</br> 달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br> JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br> 요청 들어온 유저의 JWT 값을 인증하고</br> userId 값으로 DB를 조회하여 googleToken을 조회한다.</br></br></p> <pre><code> - yyyy (4자리 int)&lt;/br&gt;  - m or mm (1 또는 2자리 int)&lt;/br&gt;  - d or dd (1 또는 2자리 int)&lt;/br&gt;&lt;/br&gt;  또한 요청 body 의 값을 통해 특정 년, 월, 일을 추출한다.&lt;/br&gt;&lt;/br&gt;  구글 Calendar api 를 호출한다.&lt;/br&gt; 해당 년, 월, 일의 제목과 내용을 호출하여 반환한다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>URL에 가져올 일정의 날짜의 년도를 적습니다. (yyyy)</p>"
          },
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>URL에 가져올 일정의 날짜의 월을 적습니다. (m 또는 mm)</p>"
          },
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": ":day",
            "description": "<p>URL에 가져올 일정의 날짜의 일을 적습니다. (d 또는 dd)</p>"
          }
        ],
        "query string": [
          {
            "group": "query string",
            "type": "String",
            "optional": false,
            "field": ":calendarId",
            "description": "<p>불러올 캘린더의 id 를 적습니다. (기본 : primary)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "http://169.56.98.117/calendar/certainday/2019/8/29?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    // 2019년 8월 29 일의 일정들이 Array 형태로 리턴됩니다.\n    {\n        \"_id\": \"0qs3g68igdd8gmnddri9hhk171\",\n        \"day\": 29,\n        \"title\": \"코딩테스트 공부\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-29\",\n        \"endTime\": \"2019-08-30\",\n        \"location\": \"\",\n        \"people\":[]\n    },\n    {\n        \"_id\": \"49n80mkp9he93ftr9vt532g0tq\",\n        \"day\": 29,\n        \"title\": \"혼자 공부하기 ㅋ\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-29\",\n        \"endTime\": \"2019-08-30\",\n        \"location\": \"\",\n        \"people\":[]\n    },\n    {\n        \"_id\": \"5ac3ec1rvfnsft12cjm1sa3pmu\",\n        \"day\": 29,\n        \"title\": \"네이버 오픈클래스 1시\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-29T17:00:00+09:00\",\n        \"endTime\": \"2019-08-29T18:00:00+09:00\",\n        \"location\": \"\",\n        \"people\":[]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_DATE",
            "description": "<p>URL Path 에서 요청한 날짜가 유효하지 않습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_DATE",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"You input invalid date, check url parameter again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/calendar/certainmonth/:year/:month?calendarId=:calendarId",
    "title": "GetCertainMonth",
    "name": "GetCertainMonth",
    "group": "Calendar",
    "description": "<p>요청받은 년(yyyy), 월(mm) 따라 해당 월에 등록된 모든 일정들을 리턴합니다</br> 달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br> JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br></br></p> <pre><code>사용자의 달력의 해당 년,월에 해당하는 한달 짜리 달력 이벤트 객체를 반환한다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>URL에 가져올 일정의 날짜의 년도를 적습니다. (yyyy)</p>"
          },
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>URL에 가져올 일정의 날짜의 월을 적습니다. (m 또는 mm)</p>"
          }
        ],
        "query string": [
          {
            "group": "query string",
            "type": "String",
            "optional": false,
            "field": ":calendarId",
            "description": "<p>불러올 캘린더의 id 를 적습니다. (기본 : primary)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "http://169.56.98.117/calendar/certainmonth/2019/8?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    // List<Calendar> 형태로 바로 Calendar의 배열 형태로 응답합니다.\n    // 현재 이 Calendar 객체는 8월 1일의 일정이며\n    // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)\n    // 아직 조회한 본인은 이 일정에 대해 수락도 거절도 하지 않았습니다.\n    // 이 일정을 처음 만들고 초대한 사람은 thals_7@naver.com 입니다(organizer:true 확인)\n    {\n        \"_id\": \"32imkacocdposb9lqhndghihs7\",\n        \"day\": 1,\n        \"title\": \"엣지테스트 8월 1일\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-01\",\n        \"endTime\": \"2019-08-02\",\n        \"location\": \"\",\n        \"people\":\n        [\n            {\n                \"email\": \"dfjung4254@gmail.com\",\n                \"self\": true,\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"zohizohi@naver.com\",\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"thals_7@naver.com\",\n                \"organizer\": true,\n                \"responseStatus\": \"accepted\"\n            }\n        ]\n    },\n    {\"_id\": \"5o7s20cg1urrkhbercs74jn1i3\", \"day\": 13, \"title\": \"SK 회식있음\", \"memo\": \"\",…},\n    {\"_id\": \"hasarvvng5nblt34pt6f7soo10\", \"day\": 13, \"title\": \"새로운 달력추가 테스트\", \"memo\": \"내용이 추가된다\",…},\n    {\"_id\": \"578om28da3n7mb7omnn4a497as\", \"day\": 14, \"title\": \"SK 인턴 프로젝트 스터디\", \"memo\": \"\",…},\n    {\"_id\": \"66rlqqjq460vq4noslke5kvlvs\", \"day\": 15, \"title\": \"SK 인턴 프로젝트 마무리\", \"memo\": \"\",…},\n    {\"_id\": \"5496736sul96hfnj1vu75hff76\", \"day\": 17, \"title\": \"구글\", \"memo\": \"\",…},\n    {\"_id\": \"jgak5v3ft7m7gismh8ei19sfm0\", \"day\": 24, \"title\": \"새로운 일정임 ㅋ\", \"memo\": \"\",…},\n    {\"_id\": \"3et0gc1kv1u7fafdt22kh47unc\", \"day\": 25, \"title\": \"오늘은 노는날\", \"memo\": \"\",…},\n    {\"_id\": \"40ltp06usjbq7i4k3g5ikilmph\", \"day\": 28, \"title\": \"청각장애졸업프로젝트HereHear\", \"memo\": \"\",…},\n    {\"_id\": \"0qs3g68igdd8gmnddri9hhk171\", \"day\": 29, \"title\": \"코딩테스트 공부\", \"memo\": \"\",…},\n    {\"_id\": \"49n80mkp9he93ftr9vt532g0tq\", \"day\": 29, \"title\": \"혼자 공부하기 ㅋ\", \"memo\": \"\",…},\n    {\"_id\": \"5ac3ec1rvfnsft12cjm1sa3pmu\", \"day\": 29, \"title\": \"네이버 오픈클래스 1시\", \"memo\": \"\",…},\n    {\"_id\": \"7dmtil6117eb01avsv5ev51rkd\", \"day\": 31, \"title\": \"엣지테스트 8월 31일\", \"memo\": \"\",…},\n    {\"_id\": \"363cb88pk7i3evn2tbi3esdocf\", \"day\": 31, \"title\": \"오늘은 열심히 노는날 ㅋ\", \"memo\": \"\",…}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_DATE",
            "description": "<p>URL Path 에서 요청한 날짜가 유효하지 않습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_DATE",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"You input invalid date, check url parameter again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/calendar/next/:nextCount?calendarId=:calendarId",
    "title": "GetNextEvents",
    "name": "GetNextLists",
    "group": "Calendar",
    "description": "<p>현재 시간으로부터 다음 :nextCount 개의 일정을 가져옵니다.</br> 달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br> JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br> post 로 들어온 유저의 JWT 값을 인증하고</br> userId 값으로 DB를 조회하여 googleToken을 조회한 후</br> 구글 Calendar api 를 호출한다.</br> 다음 primary calendar의 다음 10일 일정을 받아서</br> 반환한다.</br></br></p> <ul> <li>10일 이 아닐 경우 body 에 nextCount : 12 이런식으로</br> 불러올 리스트의 개수를 parameter로 넣어서 호출한다.</br></li> </ul>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "Number",
            "optional": false,
            "field": ":nextCount",
            "description": "<p>URL에 가져올 일정의 최대 개수를 적습니다.(Max 2500)</p>"
          }
        ],
        "query string": [
          {
            "group": "query string",
            "type": "String",
            "optional": false,
            "field": ":calendarId",
            "description": "<p>불러올 캘린더의 id 를 적습니다. (기본 : primary)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "http://169.56.98.117/calendar/next/5?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    // List<Calendar> 형태로 바로 Calendar의 배열 형태로 응답합니다.\n    // 현재 이 Calendar 객체는 10월 15일의 일정이며\n    // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)\n    // 아직 조회한 본인은 이 일정에 대해 수락도 거절도 하지 않았습니다.\n    // 이 일정을 처음 만들고 초대한 사람은 thals_7@naver.com 입니다(organizer:true 확인)\n    {\n        \"_id\": \"0sbudc844ukmn2eg8csfstnkvf\",\n        \"day\": 15,\n        \"title\": \"참여자기능테스트\",\n        \"memo\": \"충정로에서 참여자기능을 테스트한다.\",\n        \"startTime\": \"2019-10-15\",\n        \"endTime\": \"2019-10-16\",\n        \"location\": \"충정로역, 대한민국 서울특별시 중림동\",\n        \"people\":\n        [\n            {\n                \"email\": \"dfjung4254@gmail.com\",\n                \"self\": true,\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"zohizohi@naver.com\",\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"thals_7@naver.com\",\n                \"organizer\": true,\n                \"responseStatus\": \"accepted\"\n            }\n        ]\n    },\n    {\"_id\": \"5i5em46bmqeecm644dhnkf31t4\", \"day\": 16, \"title\": \"\", \"memo\": \"\",…},\n    {\"_id\": \"9jthsj3ueleqirjm3ita1e2ja8\", \"day\": 17, \"title\": \"초대하기 완성\", \"memo\": \"내용이 추가된다\",…},\n    {\"_id\": \"n79l2km1du62q1ml8ifbqd7bpo\", \"day\": 20, \"title\": \"최종 달력 추가?\", \"memo\": \"내용이 추가된다\",…},\n    {\"_id\": \"tnqgdoqmona5uu41vap5j81nok\", \"day\": 21, \"title\": \"최종 달력 추가1111?\", \"memo\": \"내용이 추가된다\",…}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "post",
    "url": "/calendar?calendarId=:calendarId",
    "title": "InsertCalendar",
    "name": "InsertCalendar",
    "group": "Calendar",
    "description": "<p>새로운 캘린더 일정을 삽입합니다.</br> 함께 넘어온 body parameter 값에 맞게 GoogleCalendar 에</br> 일정에 등록됩니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "query string": [
          {
            "group": "query string",
            "type": "String",
            "optional": false,
            "field": ":calendarId",
            "description": "<p>불러올 캘린더의 id 를 적습니다. (기본 : primary)</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>달력 일정의 타이틀</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>달력 일정의 메모</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>달력 일정의 시작시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 startTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>달력 일정의 종료시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 endTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>달력 일정의 장소</p>"
          },
          {
            "group": "body",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>다른 참여자가 있을 경우 people배열에 이메일을 포함해주시면 됩니다.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>각 people 객체에 email 값만 추가해주면 해당 참여자에게도 일정이 표시됩니다.</br> 단 이때, 타인의 이메일만 넣기만 하면 되고 자기 자신은 추가하지 않습니다.</br> 다른 사람의 email만 배열에 추가하여 요청하면 자동으로 자기자신도 people에 추가됨.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "    {\n    \t\"title\": \"POST 달력 등록 테스트\",\n\t    \"memo\": \"내용이 추가된다\",\n    \t\"startTime\": \"2019-10-8T04:00:00+09:00\",\n\t    \"endTime\": \"2019-10-8T05:00:00+09:00\",\n\t    \"location\": \"장소는 우리집 ㅋ\",\n        \"people\":\n        [\n            // 자기 자신은 people 에 넣지 않습니다(자동으로 추가됨)\n            {\n                // 초대할 참가자 이메일 1\n                \"email\":\"zohizohi@naver.com\"\n            },\n            {\n                // 초대할 참가자 이메일 2\n                \"email\":\"thals_7@naver.com\" \n            }\n        ]\n    }",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "http://169.56.98.117/calendar?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    // 현재 이 Calendar 객체는 8월 1일의 일정이며\n    // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)\n    // 아직 조회한 본인이 이 일정을 만들었기 때문에 (responseStatus 는 accepted 입니다.)\n    // 이 일정을 처음 만들고 초대한 사람 역시 조회하고 있는 주체입니다(organizer:true 확인)\n    \"_id\": \"b25dtstnmhjk4rploc5gl2vvks\",\n    \"day\": 8,\n    \"title\": \"POST 달력 등록 테스트\",\n    \"memo\": \"내용이 추가된다\",\n    \"startTime\": \"2019-10-08T04:00:00+09:00\",\n    \"endTime\": \"2019-10-08T05:00:00+09:00\",\n    \"location\": \"장소는 우리집 ㅋ\",\n    \"people\":\n    [\n        {\n            \"email\": \"thals_7@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        },\n        // 요청 파라미터에서 본인의 정보는 추가 하지 않았지만\n        // 자동으로 추가됩니다.\n        {\n            \"email\": \"dfjung4254@gmail.com\",\n            \"organizer\": true,\n            \"self\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"zohizohi@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_CALENDARBODY",
            "description": "<p>요청 body 정보가 없습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : NO_CALENDARBODY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"NO_CALENDARBODY\",\n    \"message\": \"You did not input calendar body, check request body again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/calendarList",
    "title": "GetCalendarLists",
    "name": "GetCalendarLists",
    "group": "CalendarList",
    "description": "<p>해당 계정이 보유한 캘린더 리스트의 종류를 가져옵니다.</br></p> <pre><code>_id 값을 통해 어떠한 캘린더의 정보를 CRUD 할 것인지 다른 api 호출을 쿼리스트링으로 지정할 수 있습니다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>각 캘린더 종류의 고유 id 값을 나타냅니다</br> 캘린더 이벤트의 CRUD api 를 호출할 때 ?calendarId=_id 로 </br> 어떤 캘린더의 이벤트를 조작할 것인지 선택할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>해당 캘린더의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>해당 캘린더의 설명</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "timeZone",
            "description": "<p>해당 캘린더의 타임존 - IANA Timezone database 형식을 따릅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "primary",
            "description": "<p>계정의 기본 캘린더를 의미합니다.</br> 다른 api 를 호출할때 쿼리스트링을 지정하지 않으면 </br> primary=true 로 지정된 캘린더 id 가 자동으로 지정됩니다. </br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"l8162nkuj54205lks5fmkotqtk@group.calendar.google.com\",\n        \"summary\": \"Us\",\n        \"description\": \"ㅇ\",\n        \"timeZone\": \"Asia/Seoul\"\n    },\n    {\n        \"_id\": \"dfjung4254@gmail.com\",\n        \"summary\": \"dfjung4254@gmail.com\",\n        \"timeZone\": \"Asia/Seoul\",\n        \"primary\": true\n    },\n    {\n        \"_id\": \"addressbook#contacts@group.v.calendar.google.com\",\n        \"summary\": \"Contacts\",\n        \"timeZone\": \"Asia/Seoul\"\n    },\n    {\n        \"_id\": \"ko.south_korea#holiday@group.v.calendar.google.com\",\n        \"summary\": \"대한민국의 휴일\",\n        \"timeZone\": \"Asia/Seoul\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendarList.js",
    "groupTitle": "CalendarList"
  },
  {
    "type": "put",
    "url": "/calendar/:_id?calendarId=:calendarId",
    "title": "UpdateCalendar",
    "name": "UpdateCalendar",
    "group": "Calendar",
    "description": "<p>기존의 캘린더의 일정 정보를 업데이트합니다.</br> 함께 넘어온 body parameter 값에 맞게 GoogleCalendar 에</br> 일정이 변경됩니다.</br></br></p> <pre><code>_id 값은 GET 을 통해 넘어온 calendar 의 _id 값이며,&lt;/br&gt; URL 을 통해 업데이트하고자 하는 특정 calendar 일정을 지정할 수 있습니다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "query string": [
          {
            "group": "query string",
            "type": "String",
            "optional": false,
            "field": ":calendarId",
            "description": "<p>불러올 캘린더의 id 를 적습니다. (기본 : primary)</p>"
          }
        ],
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL 의 path 에 올려야 하는 해당 일정의 고유번호입니다.</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>달력 일정의 타이틀</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>달력 일정의 메모</p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>달력 일정의 시작시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 startTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "body",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>달력 일정의 종료시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 endTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>달력 일정의 장소</p>"
          },
          {
            "group": "body",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>다른 참여자가 있을 경우 people배열에 이메일을 포함해주시면 됩니다.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>각 people 객체에 email 값만 추가해주면 해당 참여자에게도 일정이 표시됩니다.</br> 단 이때, 타인의 이메일만 넣기만 하면 되고 자기 자신은 추가하지 않습니다.</br> 다른 사람의 email만 배열에 추가하여 요청하면 자동으로 자기자신도 people에 추가됨.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    // title과 memo, Time, location 을 바꾸고,\n    // 본인(self)의 responseStatus를 \"accepted\" 로 바꾸었습니다.\n    // people 의 self:true(본인) 의 참여여부만 변경할 수 있습니다.\n    // organizer 와 self 는 변경안됨.\n    \"title\": \"PUT 달력 변경 테스트\",\n    \"memo\": \"내용이 변경된다\",\n    \"startTime\": \"2019-10-08T04:00:00+09:00\",\n    \"endTime\": \"2019-10-08T05:00:00+09:00\",\n    \"location\": \"장소는 너희집 ㅋ\",\n    \"people\":\n    [\n        {\n            \"email\": \"thals_7@naver.com\",\n            \"organizer\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"dfjung4254@gmail.com\",\n            \"self\": true,\n            // needsAction -> accepted\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"zohizohi@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/calendar/b25dtstnmhjk4rploc5gl2vvks?calendarId=l8162nkuj54205lks5fmkotqtk@group.calendar.google.com",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"b25dtstnmhjk4rploc5gl2vvks\",\n    \"day\": 8,\n    \"title\": \"PUT 달력 변경 테스트\",\n    \"memo\": \"내용이 변경된다\",\n    \"startTime\": \"2019-10-08T04:00:00+09:00\",\n    \"endTime\": \"2019-10-08T05:00:00+09:00\",\n    \"location\": \"장소는 너희집 ㅋ\",\n    \"people\":\n    [\n        {\n            \"email\": \"thals_7@naver.com\",\n            \"organizer\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"dfjung4254@gmail.com\",\n            \"self\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"zohizohi@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_CALENDARBODY",
            "description": "<p>요청 body 정보가 없습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : NO_CALENDARBODY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"NO_CALENDARBODY\",\n    \"message\": \"You did not input calendar body, check request body again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/loginToken/refresh",
    "title": "GetJWTRefresh",
    "name": "GetJWTRefresh",
    "group": "LoginToken",
    "description": "<p>RefreshToken 을 통해 AccessToken을 재발급 합니다.</br> 서버에서 API를 요청하기 전에 항상 클라이언트에서 가진 JWT 의 유효성(만료여부)을</br> 검증하고 만료되었을 경우 먼저 해당 요청을 통해 AccessToken(JWT)을 재발급 받습니다.</br></br> 1. header 에 jwt_refresh(refresh token) 을 가져옴.</br> 2. jwt_refresh verify</br> 3. decoded.userId 와 jwt_refresh 가 일치하는 정보가 db에서 찾아야 함.</br> 4. 모든 단계를 통과했다면 new jwt 발급.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt_refresh",
            "description": "<p>RefreshToken 을 헤더에 넣어 요청</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    jwt_refresh : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter/",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>본 서버의 AccessToken, 주기는 5분이며,</br> 클라이언트의 메모리영역에 보관해놓고 API 호출 시 헤더에 넣어 활용한다.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"jwt\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT_REFRESH",
            "description": "<p>헤더에서 jwt_refresh 를 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>데이터베이스 CRUD 작업에 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT_REFRESH",
            "description": "<p>RefreshToken이 만료되었습니다. 이 경우 다시 로그인 하여 토큰을 발급받아야 합니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT_JWT",
            "description": "<p>요청 헤더에 AccessToken 이 들어왔습니다.</br> 엑세스토큰을 갱신하기 위해서는 RefreshToken 이 필요합니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT_REFRESH",
          "content": "HTTP/1.1 401 Authentication\n{\n    \"name\" : \"NO_JWT_REFRESH\",\n    \"message\": \"Please put JWT_REFRESH in your request header to refresh your token!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your request in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_JWT_REFRESH",
          "content": "HTTP/1.1 401 Authentication\n{\n    \"name\" : \"INVALID_JWT_REFRESH\",\n    \"message\": \"Your JWT_REFRESH is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOT_JWT",
          "content": "HTTP/1.1 400 Authentication\n{\n    \"name\" : \"NOT_JWT\",\n    \"message\": \"This is JWT AccessToken, to refresh JWT, you should request with RefreshToken\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "LoginToken"
  },
  {
    "type": "get",
    "url": "/loginToken",
    "title": "GetJWTSignIn",
    "name": "GetJWTSignIn",
    "group": "LoginToken",
    "description": "<p>LoginToken 구글 로그인 받은 AuthCode을 분석해서 처리한다.</br> 구글로그인을 하고 AuthCode를 이곳으로 요청하여 jwt를 받아 로그인 구현</br> 구현할 로직은 다음과 같다.</br></br> 0. authCode 를 받아 accessToken, refreshToken, idToken 으로 분리한다.</br> 1. 받은 아이디 토큰의 유효성을 검사하고 Payload를 불러온다.</br> 2. userID 값을 이용해 DB를 조회한다.</br> - DB에 존재안함 : 새 user를 등록 한다.</br> 3. Google Token과 함께 user를 DB에 등록(업데이트) 한다.</br> 4. 새로운 jwt와 jwt_refresh 를 생성하여 refresh token은 DB에 저장한 후</br> 리턴한다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "null",
            "optional": false,
            "field": "NoHeader",
            "description": "<p>필요한 헤더값 없음(jwt X)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더(x) 예제",
          "content": "No JWT and other Header type",
          "type": "null"
        }
      ]
    },
    "parameter": {
      "fields": {
        "query string": [
          {
            "group": "query string",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>구글 로그인 후 받은 AuthCode 값</br> 단 scope 에 openId, profile, email, calendar 가 추가된 상태여야 한다</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "(GET) http://169.56.98.117/loginToken?code={$Google Auth Code}",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>본 서버의 AccessToken, 주기는 5분이며,</br> 클라이언트의 메모리영역에 보관해놓고 API 호출 시 헤더에 넣어 활용한다.</br></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt_refresh",
            "description": "<p>본 서버의 RefreshToken, 주기는 14일이며,</br> SharedPreference 같은 보안영역에 저장해놓고 jwt 만료시 갱신한다.</br> (GET)/loginToken/refresh 로 요청</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"jwt\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n    \"jwt_refresh\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLEAUTH",
            "description": "<p>구글 인증서버에서 Authcode를 파싱하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>데이터베이스 CRUD 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : FAILED_GOOGLEAUTH",
          "content": "HTTP/1.1 401 Authentication\n{\n    \"name\" : \"FAILED_GOOGLEAUTH\",\n    \"message\": \"Failed to decode your Google Auth-code!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your request in database!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "LoginToken"
  },
  {
    "type": "delete",
    "url": "/medicine/:id",
    "title": "DeleteMedicine",
    "name": "DeleteMedicine",
    "group": "Medicine",
    "description": "<p>jwt 토큰과 medicine의 _id값을 통해 현재 유저의 해당 meidicine 알림을 삭제합니다. </br> url parameter에 넣는 _id 값은 GET을 통해 medicine Lists를 호출했을 때 </br> 각 medicine 객체가 지니고 있는 &quot;_id&quot;의 value값 입니다. </br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL에 지울 todo 정보의 고유 아이디 값을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/todo/5d9ed8a64d73a91bcc4526d7",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>삭제 완료 메세지</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>성공 상태 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"medicine info delete success\".\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/medicine.js",
    "groupTitle": "Medicine"
  },
  {
    "type": "get",
    "url": "/medicine",
    "title": "GetMedicine",
    "name": "GetMedicine",
    "group": "Medicine",
    "description": "<p>유저의 투약 정보를 배열로 받아옵니다.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter/",
          "type": "null"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/medicine.js",
    "groupTitle": "Medicine"
  },
  {
    "type": "post",
    "url": "/medicine",
    "title": "InsertMedicine",
    "name": "PostMedicine",
    "group": "Medicine",
    "description": "<p>새로운 medicine 목록을 저장합니다.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "yakname",
            "description": "<p>투약할 약의 이름</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>시간</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>분</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>체크되었는지의 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n  \"yakname\": \"head\",\n  \"hour\": 12,\n  \"minute\": 24,\n  \"ampm\": \"AM\",\n  \"selected\": false\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>해당 알람의 고유 id값, put, delete 호출 때 사용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "yakname",
            "description": "<p>투약 정보</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람 시, 범위는 0~23.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람 분, 범위는 0~59.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ampm",
            "description": "<p>오전/오후 여부를 &quot;AM&quot;, &quot;PM&quot; 으로 나타냅니다.</br> ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br></p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>체크 되었는지 여부</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/medicine.js",
    "groupTitle": "Medicine"
  },
  {
    "type": "put",
    "url": "/medicine/:_id",
    "title": "UpdateMedicine",
    "name": "PutMedicine",
    "group": "Medicine",
    "description": "<p>jwt 토큰과 medicine의 _id 값을 통해 해당 medicine 을 요청받은 body의 내용으로 업데이트 합니다. url parameter에 넣는 _id 값은 GET을 통해 medicineLists를 호출 했을 때 </br> 각 medicine 객체가 지니고 있는 &quot;_id&quot;의 value값. </br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "yakname",
            "description": "<p>요청 바디의 medicine 약 이름</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>알람을 울릴 시간</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>알람을 울릴 분</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>요청 바디의 medicine 체크 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n  \"yakname\": \"head\",\n  \"hour\": 12,\n  \"minute\": 24,\n  \"ampm\": \"AM\",\n  \"selected\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>DB에 저장된 medicine의 고유값 - put,delete 요청시 필요</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답:",
          "content": " {\n   \"_id\": \"5daf0530f7dcec27842bd671\",\n   \"yakname\": \"def\",\n   \"hour\": 12,\n   \"minute\": 24,\n   \"ampm\": \"AM\",\n   \"selected\": false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/medicine.js",
    "groupTitle": "Medicine"
  },
  {
    "type": "put",
    "url": "/medicine/onoff/:_id",
    "title": "UpdateMedicineOnoff",
    "name": "UpdateMedicineOnoff",
    "group": "Medicine",
    "description": "<p>유저의 투약정보의 ON/OFF 정보만 수정합니다. </br> 투약이 ON 상태여야만 매일 정해진 hour, minute 에 푸시를 받을 수 있습니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>투약의 id 값, /medicine/:_id 로 해당 투약의 put, delete 를 호출합니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"selected\": true\n}",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "URL Http://169.56.98.117/alarm/5da6bee89d02807cd9288a5a",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>현재 투약이 켜져있는지 여부를 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>해당 투약의 고유 id값, put, delete 호출 때 사용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>투약 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hour",
            "description": "<p>투약 시, 범위는 0~23.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "minute",
            "description": "<p>투약 분, 범위는 0~59.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ampm",
            "description": "<p>오전/오후 여부를 &quot;AM&quot;, &quot;PM&quot; 으로 나타냅니다.</br> ampm 은 hour, minute 에 의해 자동으로 세팅됩니다.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5da6bee89d02807cd9288a5a\",\n    \"title\": \"투약테스트3 - modified\",\n    \"hour\": 10,\n    \"minute\": 20,\n    \"ampm\": \"AM\",\n    \"selected\"\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_TIME",
            "description": "<p>시간 값이 유효하지 않습니다 hour(0-23), minute(0-59)</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LENGTH_ARRAY",
            "description": "<p>day_selected 배열의 사이즈가 7이 아닙니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/medicine.js",
    "groupTitle": "Medicine"
  },
  {
    "type": "get",
    "url": "/news",
    "title": "GetNews",
    "name": "GetNews",
    "group": "News",
    "description": "<p>headline-news-naver 모듈을 활용하여</br> 네이버 뉴스의 헤드라인뉴스 5개를 추출 및 반환한다.</br> MODULE INFO : https://github.com/dfjung4254/headline-news-naver</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "null",
            "optional": false,
            "field": "NoHeader",
            "description": "<p>필요한 헤더값 없음(jwt X)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더(x) 예제",
          "content": "No JWT and other Header type",
          "type": "null"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "NoParameter",
            "description": "<p>요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "News[]",
            "optional": false,
            "field": "news_array",
            "description": "<p>JSONArray<News> 의 형태로 News 의 리스트를 가짐.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>뉴스 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>뉴스 소제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contents",
            "description": "<p>뉴스 본문</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imgaeUrl",
            "description": "<p>뉴스 섬네일 이미지 URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"news_array\":\n        [\n            {\n                \"title\": \"총수 지분 높을수록 대기업 ‘내부 거래’ 많았다\",\n                \"summary\": \"SK 46조4000억원, 현대차 33조1000억원, 삼성 25조...\",\n                \"contents\": \"공정위 ‘대기업 내부거래 현황’199조원 중 10대 그룹이 151조원SK 46조원...\",\n                \"imageUrl\": \"https://imgnews.pstatic.net/image/025/2019/10/15/0002944698_001_20191015001220252.jpg\"\n            },\n            {\"title\": \"노벨경제학상 빈곤 퇴치 3인…바네르지·뒤플로는 부부\", \"summary\": \"2019년 노벨 경제학상은 빈곤 연구를 전문으로...\",…},\n            {\"title\": \"황교안 “송구스럽다로 넘어갈 일 아니다” 홍익표 “개혁 마무리 못하고 사퇴 아쉽다”\", \"summary\": \"황교안 자유한국당...\",…},\n            {\"title\": \"삼성SDI 2000억원 들여 ESS 화재 막는다\", \"summary\": \"삼성SDI가 또 불거진 에너지저장장치(ESS) 화재 논란에 선제적...\",…},\n            {\"title\": \"남북축구 생중계 결국 무산…“평양 상부서 홍보말라 지시”\", \"summary\": \"15일 평양에서 열리는 카타르 월드컵 2차 예선 남북...\",…}\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_NEWS",
            "description": "<p>서버에서 네이버뉴스를 크롤링하는데 실패했습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : FAILED_NEWS",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_NEWS\",\n    \"message\": \"Failed to crawl naver headline news!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/news.js",
    "groupTitle": "News"
  },
  {
    "type": "delete",
    "url": "/todo/:id",
    "title": "DeleteTodo",
    "name": "DeleteTodo",
    "group": "Todo",
    "description": "<p>jwt 토큰과 todo 의 _id 값을 통해 현재 유저의 해당 todo 를 삭제합니다.</br> url parameter 에 넣는 _id 값은 GET 을 통해 todolist 를 호출 했을 때</br> 각 todo 객에가 지니고 있는 &quot;_id&quot; 의 value 값 입니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL에 지울 todo 정보의 고유 아이디 값을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/todo/5d9ed8a64d73a91bcc4526d7",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>삭제 완료 메세지</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>성공 상태 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Todo delete success!\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "get",
    "url": "/todo",
    "title": "GetTodoList",
    "name": "GetTodo",
    "group": "Todo",
    "description": "<p>현재 유저가 등록한 Todo 리스트를 반환합니다.</br> 반환받을 때 각 todo 의 _id 값으로 put, delete 요청을 할 수 있습니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Todo[]",
            "optional": false,
            "field": "todoLists",
            "description": "<p>JSONArray<Todo> 의 모양으로 Todo 의 리스트를 가짐</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크되었는지 여부.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"todoLists\":\n        [\n            {\n                \"_id\": \"5d9ed8a64d73a91bcc4526d7\",\n                \"title\": \"MagicCalender 만들기2\",\n                \"selected\": true\n            },\n            {\"_id\": \"5d9ed8aa4d73a91bcc4526d8\", \"title\": \"MagicCalender 만들기3\", \"selected\": true},\n            {\"_id\": \"5d9efdeaec5df242401dd1a7\", \"title\": \"새로운 post modified!!\", \"selected\": false},\n            {\"_id\": \"5d9efe6b21e6cb42d3071cde\", \"title\": \"새로운 post 테스트2\", \"selected\": false},\n            {\"_id\": \"5d9f00a421e6cb42d3071cdf\", \"title\": \"Android post test\", \"selected\": false},\n            {\"_id\": \"5da309dd93968368d2266635\", \"title\": \"New Post Test good!\", \"selected\": false}\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "post",
    "url": "/todo",
    "title": "InsertTodo",
    "name": "PostTodo",
    "group": "Todo",
    "description": "<p>새로운 todo 목록을 저장합니다.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 제목</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"title\": \"MagicCalender 만들기 테스트\",\n    \"selected\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크되었는지 여부.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5da46cff9ea01463ba5c2eca\",\n    \"title\": \"MagicCalendar 만들기 테스트\",\n    \"selected\": false\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "put",
    "url": "/todo/:_id",
    "title": "UpdateTodo",
    "name": "PutTodo",
    "group": "Todo",
    "description": "<p>jwt 토큰과 todo 의 _id 값을 통해 현재 유저의 해당 todo 를 요청받은 body 의내용으로 업데이트합니다.</br> url parameter 에 넣는 _id 값은 GET 을 통해 todolist 를 호출 했을 때</br> 각 todo 객에가 지니고 있는 &quot;_id&quot; 의 value 값 입니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>요청 바디의 Todo 제목</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>요청 바디의 Todo 체크 여부</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL에 고칠 todo 정보의 고유 아이디 값을 적습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"title\": \"MagicCalender 만들기 수정하기\",\n    \"selected\": true\n}",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/todo/5d9ed8a64d73a91bcc4526d7",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크되었는지 여부.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5d9ed8a64d73a91bcc4526d7\",\n    \"title\": \"MagicCalendar 만들기 수정하기\",\n    \"selected\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_TODOBODYKEY",
            "description": "<p>Body 값에 userId 값은 들어있으면 안됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_TODOBODYKEY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"INVALID_TODOBODYKEY\",\n    \"message\": \"Invalid body property is included! : userId\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "delete",
    "url": "/users/fcm",
    "title": "DeleteUserFcm",
    "name": "DeleteUserFcm",
    "group": "User",
    "description": "<p>서버에 저장된 해당 계정의 안드로이드 기기 FCM 토큰을 삭제합니다.</br> 더 이상 해당 기기로 알람이나 투약이 전송되지 않습니다.</br> 로그아웃 후, 알람, 투약 수신의 일괄 on/off 설정기능이 있다면 해당 api 를 통해 off 시킬 수 있습니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>유저 고유 번호 값(구글)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>유저 이메일 값</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>유저 풀네임</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>유저 구글 사진 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "given_name",
            "description": "<p>유저 이름</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family_name",
            "description": "<p>유저 이름(성)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locale",
            "description": "<p>유저 지역 정보</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fcm_token",
            "description": "<p>유저 현재 기기 토큰 값</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": \"100828347037604660700\",\n    \"email\": \"dfjung4254@gmail.com\",\n    \"name\": \"KH J\",\n    \"picture\": \"https://lh4.googleusercontent.com/-3WsHZ5SaYco/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reBRCZFXpXnux85nyxUAdlQxv6rVw/s96-c/photo.jpg\",\n    \"given_name\": \"KH\",\n    \"family_name\": \"J\",\n    \"locale\": \"ko\",\n    // fcm_token 값이 사라진 것을 확인 할 수 있음.\n    \"fcm_token\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "GetUserInfo",
    "name": "GetUser",
    "group": "User",
    "description": "<p>헤더에 JWT 를 실어 /users 로 GET 요청을 해주세요.</br> 서버는 해당 JWT를 통해 현재 구글 로그인된 계정의 개인정보를 반환합니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>유저 고유 번호 값(구글)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>유저 이메일 값</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>유저 풀네임</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>유저 구글 사진 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "given_name",
            "description": "<p>유저 이름</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family_name",
            "description": "<p>유저 이름(성)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locale",
            "description": "<p>유저 지역 정보</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": \"100828347037604660700\",\n    \"email\": \"dfjung4254@gmail.com\",\n    \"name\": \"KH J\",\n    \"picture\": \"https://lh4.googleusercontent.com/-3WsHZ5SaYco/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reBRCZFXpXnux85nyxUAdlQxv6rVw/s96-c/photo.jpg\",\n    \"given_name\": \"KH\",\n    \"family_name\": \"J\",\n    \"locale\": \"ko\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/fcm",
    "title": "UpdateUserFcm",
    "name": "UpdateUserFcm",
    "group": "User",
    "description": "<p>안드로이드 기기 등록 </br> 해당 api 를 통해 안드로이드 Firebase SDK 를 통해 얻은 기기 토큰을 서버에 저장합니다.</br> 해당 기기의 토큰이 저장 또는 업데이트 되면 해당 기기로 알람이나 투약 푸시가 전송됩니다.</br> 로그인 후, 또는 기기 토큰이 변경되었을 때 업데이트 해주세요</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "fcm_token",
            "description": "<p>FCM을 위한 기기의 고유 토큰</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"fcm_token\": \"cyejeyJfaWQiOiI1ZDUxODRjMWU5ZDM...\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>유저 고유 번호 값(구글)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>유저 이메일 값</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>유저 풀네임</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>유저 구글 사진 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "given_name",
            "description": "<p>유저 이름</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family_name",
            "description": "<p>유저 이름(성)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locale",
            "description": "<p>유저 지역 정보</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fcm_token",
            "description": "<p>유저 현재 기기 토큰 값</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": \"100828347037604660700\",\n    \"email\": \"dfjung4254@gmail.com\",\n    \"name\": \"KH J\",\n    \"picture\": \"https://lh4.googleusercontent.com/-3WsHZ5SaYco/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reBRCZFXpXnux85nyxUAdlQxv6rVw/s96-c/photo.jpg\",\n    \"given_name\": \"KH\",\n    \"family_name\": \"J\",\n    \"locale\": \"ko\",\n    \"fcm_token\": \"cyejeyJfaWQiOiI1ZDUxODRjMWU5ZDM...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/weather/:latitude/:longitude",
    "title": "GetWeatherInfo",
    "name": "GetWeather",
    "group": "Weather",
    "description": "<p>OpenWeatherMap API 를 호출하여 날씨 정보를 대신 호출하고 반환합니다.</br> 안드로이드 어플리케이션에서 위도와 경도 값, 그리고 jwt를 통해 인증 절차를 거쳐야 합니다.</br> jwt 인증을 거치는 이유는 OpenWeatherMap free티어(분당 60회)를 사용하고 있는데</br> 오픈소스로 공개할 경우 jwt 인증 없이 외부에서 무분별하게 호출이 가능하기 때문입니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "latitude",
            "description": "<p>알고자 하는 날씨의 지역 위도 정보</p>"
          },
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "longitude",
            "description": "<p>알고자 하는 날씨의 지역 경도 정보</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/weather/37.564/127.001",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>해당 위도, 경도의 도시 이름</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather",
            "description": "<p>날씨 정보</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather_description",
            "description": "<p>날씨 정보 설명</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "temperature",
            "description": "<p>평균 온도(F)</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "temperature_max",
            "description": "<p>최고 온도(F)</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "temperature_min",
            "description": "<p>최저 온도(F)</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "pressure",
            "description": "<p>기압</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "humidity",
            "description": "<p>습도</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "wind_speed",
            "description": "<p>풍속</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "clouds",
            "description": "<p>운량</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"city\": \"Kwanghŭi-dong\",\n    \"weather\": \"Clouds\",\n    \"weather_description\": \"overcast clouds\",\n    \"temperature\": 297.27,\n    \"temperature_max\": 298.71,\n    \"temperature_min\": 295.93,\n    \"pressure\": 1019,\n    \"humidity\": 51,\n    \"wind_speed\": 0.45,\n    \"clouds\": 100\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_LONANDLAT",
            "description": "<p>위도, 경도 좌표가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_OWM",
            "description": "<p>OpenWeatherMap 호출에 실패했습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : NO_LONANDLAT",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Please put latitude and longitude in your request parameter!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_OWM",
          "content": "HTTP/1.1 500 Bad Request\n{\n    \"message\": \"Failed to GET openweathermap!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/weather.js",
    "groupTitle": "Weather"
  }
] });
