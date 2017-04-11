
var express = require('express');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')

//bodyParser as middleware
app.use(bodyParser.json());

//load JSON data (articles , user and private key)
var articles = JSON.parse(fs.readFileSync('db/articles.json', 'utf8'));
var user = JSON.parse(fs.readFileSync('db/user.json', 'utf8'));
var key = JSON.parse(fs.readFileSync('configs/secret_key.json', 'utf8'));

//check if node run in debug mode
var debug = typeof v8debug === 'object';

//configure multer storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

//map static resources
app.use('/public', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/public/js'));

// set the view engine, ejs
app.set('view engine', 'ejs');

//upload
app.post('/upload', upload.single('img'), function (req, res, next) {
    console.log("succede qualcosa");
    res.render('pages/edit');
})

// index page 
app.get('/', function (req, res) {
    res.render('pages/index', {
        articles: articles
    });
});

//get article by id
app.get('/article/:articleId', function (req, res) {
    console.log("tagId is set to " + req.params.articleId);

    //get matching artile ( as array but id is unique )
    var tmp = articles.filter(function (obj) {
        return obj.id == req.params.articleId;
    });
    if (tmp.length <= 0) {
        res.send("articles not found");
    }
    else {
        res.render('pages/article', {
            article: tmp[0]
        });
    }
});

//post an article
app.post('/article', function (req, res) {

    console.log("[INFO] Post a new article");
    var token = req.body.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, key.secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {

                if (decoded.name == user.name && decoded.uid == user.uid) {
                    var tmp = req.body.article;
                    var exit = false;
                    var isFound = false;
                    var i = 0;
                    while (!isFound && !exit) {
                        if (tmp.id == articles[i].id)
                            isFound = true;
                        if (articles.length == i-1)
                            exit = true;
                        i++;
                    }
                    if (!isFound) {
                        articles.push(tmp);
                    }
                    else
                        articles[i-1] = tmp;

                    var r = fs.writeFile("db/articles.json", JSON.stringify(articles), function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });
                    return res.json({ success: true, message: 'Saved' });
                }
                else
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
        });
    }
    else {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
    }

});

//edit page
app.get('/edit', function (req, res) {
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token = req.query.token;
    console.log("[INFO] new article ");
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, key.secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                var tmp = { title: "" }

                // if everything is good, save to request for use in other routes
                if (decoded.name == user.name && decoded.uid == user.uid)
                    res.render('pages/edit', { article: { id: articles.length, title: "TITLE", include: "INCLUDE", description: "DESCRIPTION", content: "CONTENT" } });
                else
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
        });
    }
    else {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
    }
});

//edit page
app.get('/edit/:articleId', function (req, res) {
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token = req.query.token;
    console.log("[INFO] Edit article " + req.params.articleId);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, key.secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                var tmp = articles.filter(function (obj) {
                    return obj.id == req.params.articleId;
                });
                if (tmp.length <= 0) {
                    res.send("articles not found");
                }
                else {
                    // if everything is good, save to request for use in other routes
                    if (decoded.name == user.name && decoded.uid == user.uid)
                        res.render('pages/edit', { article: tmp[0] });
                    else
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
            }
        });
    }
    else {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
    }
});

// about page 
app.get('/about', function (req, res) {
    res.render('pages/about');
});

//if debug, enable /token endpoint 
if (debug) {
    //create token from db/user.json
    app.get('/token', function (req, res) {
        var tmp = user;
        var token = jwt.sign(tmp, key.secret);
        //responce
        res.json({
            token: token
        });
    });
}

app.listen(8080);
console.log('[INFO] Blog server is running on port 80');