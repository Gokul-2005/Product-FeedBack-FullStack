const express = require('express');
const app = express(); //assigning express function to app variable
const database = require('mysql'); //This line contains mysql module
const ejs = require('ejs'); //This line contains ejs module
const bodyParser = require('body-parser'); //This line contains body-parser module
const path = require('path');
const port = 5678 ;


app.use(express.static('public'));



//This line give access to ejs files
app.set("view engine","ejs");

const urlencodedParser = bodyParser.urlencoded({extended : false});
app.use(bodyParser.json());

let connection = database.createConnection({
    host : 'localhost',
    user : 'root',
    password : "",
    database : 'Product_Feedback',
});

connection.connect((error) => {
    if(error){
    console.log(error);
    }
    else{
        
        }
});

app.post('/index',(req,response) => {
    let getQuery = `SELECT * FROM Feedback ORDER BY id`
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
           response.send(JSON.parse(JSON.stringify(res)))
        }
    })
})

app.get('/index', (req, response) => {
    let getQuery = `SELECT * FROM Feedback ORDER BY id` 
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
            const obj = {
                data : JSON.parse(JSON.stringify(res)),
                cssPath : 'CSS/index.css',
                jsPath : 'JS/index.js',
            }
            response.render('index',{obj})
        }
    })
    
});

app.post(('/roadMap'),(request,response)=>{
    let getQuery = `SELECT * FROM Feedback ORDER BY id`
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
           response.send(JSON.parse(JSON.stringify(res)))
        }
    })
})

app.get('/roadMap',(request,response)=>{
    let getQuery = `SELECT * FROM Feedback ORDER BY id` 
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
            const obj = {
                data : JSON.parse(JSON.stringify(res)),
                cssPath : 'CSS/roadMap.css',
                jsPath : 'JS/roadMap.js',
            }
            response.render('roadMap',{obj})
        }
    })
});

app.post('/showFeed',(request,response)=>{
    if(request.body.taskType==='newComment'){
    let getQuery = `SELECT comments FROM Feedback WHERE id = ${request.body.feedID}`;
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
            let commentArr = JSON.parse(JSON.parse(JSON.stringify(res))[0].comments);
            const propertyValues=Object.values((commentArr)); 
            var enc = new TextDecoder("utf-8");
            var array = new Uint8Array(propertyValues);
            let finalValue = enc.decode(array); 
            finalValue = JSON.parse(finalValue);
            let currID ;
            if(finalValue.length===0){
                currID = 1 ;
            }
            else{
                currID = finalValue[finalValue.length-1].id + 1;
            }
            
            const obj = {
                id : currID,
                content:request.body.newComment,
                user:{
                image: "/Assets/user-images/image-zena.jpg",
                name: "Zena Kelley",
                username: "velvetround"
                }
                }
                finalValue = [...finalValue,obj];
                const encoder = new TextEncoder();
                const arr = encoder.encode(JSON.stringify(finalValue));
                let setQuery = `UPDATE Feedback SET comments = '${JSON.stringify(arr)}' WHERE id = ${request.body.feedID}`
                connection.query(setQuery,(err,res)=>{
                    if(err) console.log(err);
                    else{
                        response.send("done");
                    }
                })
        }
    })
    }
    if(request.body.taskType==='newReply'){
        let newReply = request.body.newReply;
        let replyingTo = request.body.userNameReplied;
        let getQuery = `SELECT comments FROM Feedback WHERE id = ${request.body.feedID}`;
        connection.query(getQuery,(err,res)=>{
            if(err) console.log(err);
            else{
            let commentArr = JSON.parse(JSON.parse(JSON.stringify(res))[0].comments);
            const propertyValues=Object.values((commentArr)); 
            var enc = new TextDecoder("utf-8");
            var array = new Uint8Array(propertyValues);
            let finalValue = enc.decode(array);
            finalValue = JSON.parse(finalValue);
            finalValue.forEach((ele) => {
                if(ele.id === Number(request.body.commentID)){
                    if(ele.replies){
                        const obj = {
                            content: newReply,
                            replyingTo: replyingTo,
                            user: {
                                image: "/Assets/user-images/image-zena.jpg",
                                name: "Zena Kelley",
                                username: "velvetround"
                            }    
                        }
                        ele.replies = [...ele.replies,obj];
                    }
                    else{
                        const obj = {
                            content: newReply,
                            replyingTo: replyingTo,
                            user: {
                                image: "/Assets/user-images/image-zena.jpg",
                                name: "Zena Kelley",
                                username: "velvetround"
                            }    
                        }
                        ele.replies = [obj];
                    }
                }
            })
            const encoder = new TextEncoder();
                const arr = encoder.encode(JSON.stringify(finalValue));
                let setQuery = `UPDATE Feedback SET comments = '${JSON.stringify(arr)}' WHERE id = ${request.body.feedID}`
                connection.query(setQuery,(err,res)=>{
                    if(err) console.log(err);
                    else{
                        response.send("done");
                    }
                })
            }
        })
    }
    if(request.body.taskType==='getData'){
        let getQuery = `SELECT userVote FROM Feedback WHERE id = ${request.body.feedID}`;
        connection.query(getQuery,(err,res)=>{
            if(err) console.log(err);
            else{
                response.send(JSON.parse(JSON.stringify(res))[0])
            }
        })
    }
    if(request.body.taskType==='setUserVote'){
        let getQuery = `SELECT * FROM Feedback WHERE id = ${request.body.feedID}`;
        connection.query(getQuery,(err,res)=>{
            if(err) console.log(err);
            else{
                let dbValue = JSON.parse(JSON.stringify(res))[0]
                if(request.body.userVote===1){
                    let upvotes = dbValue.upvotes + 1
                    let setQuery = `UPDATE Feedback SET userVote = 1 , upVotes = ${upvotes} WHERE id = ${request.body.feedID}`
                    connection.query(setQuery,(err,res)=>{
                        if(err) console.log(err);
                        else{
                            response.send('done')
                        }
                    })
                }
                else{
                    let upvotes = dbValue.upvotes - 1
                    let setQuery = `UPDATE Feedback SET userVote = 0 , upVotes = ${upvotes} WHERE id = ${request.body.feedID}`
                    connection.query(setQuery,(err,res)=>{
                        if(err) console.log(err);
                        else{
                            response.send('done')
                        }
                    })
                }
            }
        })
        
    }
})

app.get('/showFeed',(request,response)=>{
    let getQuery = `SELECT * FROM Feedback WHERE id=${request.query.id}` 
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
            let wqobj = JSON.parse(JSON.parse(JSON.stringify(res))[0].comments);
        const propertyValues=Object.values(wqobj);  
        var enc = new TextDecoder("utf-8");
        var array = new Uint8Array(propertyValues);
        let finalValue = enc.decode(array); 
        let temp = JSON.parse(JSON.stringify(res));
        temp[0].comments = finalValue;
        JSON.parse(JSON.stringify(res))[0].comments = finalValue
            const obj = {
                comment:request.query.comment,
                data : temp,
                cssPath : 'CSS/showFeed.css',
                jsPath : 'JS/showFeed.js',
            }
            response.render('showFeed',{obj})
        }
    })
})

app.post('/addNewFeedBack',(request,response)=>{
    let getQuery = `SELECT * FROM Feedback ORDER BY id DESC`
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
            let currentID = JSON.parse(JSON.stringify(res))[0].id +1;
            let setQuery = `INSERT INTO Feedback(id, title, catogery, userVote, upvotes, status, description, comments) VALUES ('${currentID}','${request.body.feedTitle}','${request.body.feedType}','0','0','suggestion','${request.body.feedDesc}','{"0":91,"1":93}')`
            connection.query(setQuery,(err,res)=>{
                if(err) console.log(err);
                response.send("done");
            })
        }
    })
})

app.get('/addNewFeedBack',(request,response)=>{
    const obj = {
        cssPath : 'CSS/addNewFeedBack.css',
        jsPath : 'JS/addNewFeedBack.js',
    }
    response.render('addNewFeedBack',{obj})
})

app.post('/editFeedBack',(request,response)=>{
    if(request.body.taskType==='getData'){
        let SQLquery = `SELECT * FROM Feedback WHERE id='${request.body.feedID}'`
    connection.query(SQLquery, (err,res) => {
        if(err) console.log(err);
        else response.json(JSON.parse(JSON.stringify(res))[0]);
    })
    }
    if(request.body.taskType==='setData'){
        let setQuery = `UPDATE Feedback SET title='${request.body.feedTitle}',catogery='${request.body.feedType}',status='${(request.body.feedStatus).toLowerCase()}',description='${request.body.feedDesc}' WHERE id = ${request.body.feedID} `
        connection.query(setQuery, (err,res)=>{
            if(err) console.log(err);
            else{
                response.send('Done')
            }
        })
    }
    if(request.body.taskType==='deleteData'){
        let setQuery = `DELETE FROM Feedback WHERE id = ${request.body.feedID}`;
        connection.query(setQuery, (err,res)=>{
            if(err) console.log(err);
            else{
                response.send('Done')
            }
        })
    }
})

app.get('/editFeedBack',(request,response)=>{
    const obj = {
        cssPath : 'CSS/editFeedBack.css',
        jsPath : 'JS/editFeedBack.js',
    }
    response.render('editFeedBack',{obj})
})

app.listen(port, () => console.log(`listening to port, ${port}`))