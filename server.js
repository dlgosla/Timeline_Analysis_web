var express = require('express'); //express 모듈 불러오기
var app = express();
const tweetsController = require('./twitter-controller');

var router = require('./router/main')(app);// 라우터 모듈인 main.js 를 불러와서 app 에 전달해줍니다.
app.set('views', __dirname + '/views');  //서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
app.set('view engine', 'ejs'); //서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정합니다.
app.engine('html', require('ejs').renderFile);

app.get('/timeline/:screen_name', tweetsController.getUserTweets); // '/timeline/:screen_name'형식의 url이 들어오면 뒤의 함수를 실행시킴
app.get('/timeline/:screen_name/:keyword', tweetsController.getUserTweetsForSearch);
app.get('/popular/:screen_name', tweetsController.getUserRetweet);//'/hot/:screen_name'형식의 url이 들어오면 뒤의 함수를 실행시킴
var server = app.listen(3000, function () { //3000 포트 사용
    console.log("Express server has started on port 3000");
})

app.use(express.static('public')); 
