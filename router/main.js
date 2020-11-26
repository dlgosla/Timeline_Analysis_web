module.exports = function(app)
{
     app.get('/',function(req,res){ //index.html 가져오기
        res.render('index.html')
     });

}
