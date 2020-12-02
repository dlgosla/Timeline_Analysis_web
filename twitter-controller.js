const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: 'Q4xyL4HBupStqkUf3FaKeDlSL',
    consumer_secret: 'xB9ROWLAPlPW7tntBUsFgVZd9qcaCSDDAo5fFCH1qWg7oAwJLO',
    access_token_key: '1330868660072660992-0l3jauBmdEP16hXPviH5W1DMS46X9B',
    access_token_secret: 'jx5xtDHam5SUTSndp7uVqsTpbSJiD4OIKL8IYKg1ZtTSZ'

});


exports.getUserTweets = async function(req, res){
    try{
        let data = client.get('statuses/user_timeline', req.params, function(error,tweets,response){ //트위터 api에서 유저의 타임라인을 가져옴 req.params에 유저 아이디가 들어있음
            if(!error){
                console.log(tweets); //가져온 타임라인 내용 콘솔창에 출력
                res.render('timeline.html',tweets); //timeline.html 화면에 뿌려줌 그리고 tweets값을 저 페이지로 보냄
            }
        }); //아이디를 토대로 타임라인 가져오기
    

    }catch(err){ //에러 발생하면 실행
        console.log(err);
        res.sendStatus(500);
    }
}