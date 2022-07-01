const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: "consumer_key",
    consumer_secret: "consumer_secret",
    access_token_key: "access_token_key",
    access_token_secret: "access_token_secret"

});


exports.getUserTweets = async function (req, res) { //전체 타임라인
    try {
        let data = client.get('statuses/user_timeline', req.params, function (error, tweets, response) { //트위터 api에서 유저의 타임라인을 가져옴 req.params에 유저 아이디가 들어있음
            if (!error) {

                console.log(tweets); //가져온 타임라인 내용 콘솔창에 출력
                res.render('timeline.html', { timeline: tweets }); //timeline.html 화면에 뿌려줌 그리고 tweets값을 저 페이지로 보냄
            }
            else {
                let msg = ""
                if (response.statusCode === 404)
                    msg = "User not found."
                else {
                    try {
                        msg = error[0].message
                    }
                    catch {
                    }
                }

                res.render('error.html', { statusCode: response.statusCode, msg: msg });

            }
        }); //아이디를 토대로 타임라인 가져오기


    } catch (err) { //에러 발생하면 실행
        res.render('error.html', { statusCode: 500, msg: String(err) });
        console.log(err);
        res.sendStatus(500);
    }
}

exports.getUserTweetsForSearch = async function (req, res) { //검색
    try {
        let data = client.get('statuses/user_timeline', req.params, function (error, tweets, response) { //트위터 api에서 유저의 타임라인을 가져옴 req.params에 유저 아이디가 들어있음
            if (!error) {
                res.render('search.html', { timeline: tweets, keyword: req.params.keyword }); //timeline.html 화면에 뿌려줌 그리고 tweets값을 저 페이지로 보냄

                console.log(req.params);
            }
            else {
                let msg = ""
                if (response.statusCode === 404)
                    msg = "User not found."
                else {
                    try {
                        msg = error[0].message
                    }
                    catch {
                    }
                }

                res.render('error.html', { statusCode: response.statusCode, msg: msg });
            }
        }); //아이디를 토대로 타임라인 가져오기

    } catch (err) { //에러 발생하면 실행
        console.log(err);
        res.render('error.html', { statusCode: 500, msg: String(err) });

        res.sendStatus(500);
    }
}


exports.getUserRetweet = async function (req, res) { //인기있는 글
    try {
        let retweetdata = client.get('statuses/user_timeline', req.params, function (error, tweets, response) {//리트윗 
            if (!error) {
                tweets.sort(function (a, b) {
                    return b.retweet_count - a.retweet_count;
                });//리트윗 data 내림차순로 정렬(?)
                console.log(tweets);
                res.render('popular.html', { timeline: tweets });
            }
            else {
                let msg = ""
                if (response.statusCode === 404)
                    msg = "User not found."
                else {
                    try {
                        msg = error[0].message
                    }
                    catch {
                    }
                }

                res.render('error.html', { statusCode: response.statusCode, msg: msg });
            }

        });
    } catch (err) {
        console.log(err);
        res.render('error.html', { statusCode: 500, msg: String(err) });
        res.sendStatus(500);
    }
}


